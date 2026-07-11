import {
  Injectable,
  Logger,
} from '@nestjs/common';

import {
  PonPortStatus,
} from '@prisma/client';

import { PrismaService } from '../../database/prisma.service';
import { OltService } from '../../olt/olt.service';

@Injectable()
export class PonPortSyncService {
  private readonly logger =
    new Logger(PonPortSyncService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly oltService: OltService,
  ) {}

  async syncPonPorts(
    oltId: string,
  ) {
    try {
      this.logger.log(
        '========== PON PORT SYNC START =========='
      );

      const olt =
        await this.oltService.findOne(oltId);

      if (!olt) {
        throw new Error('OLT not found.');
      }

      const cards =
        await this.prisma.oltCard.findMany({
          where: {
            oltId,
          },
          orderBy: {
            slot: 'asc',
          },
        });

      this.logger.log(
        `Found ${cards.length} card(s).`,
      );

      let inserted = 0;
      let updated = 0;
      let skipped = 0;

      for (const card of cards) {
        const type = (
          card.realType ??
          card.configuredType ??
          ''
        ).toUpperCase();

        // Only GPON service cards
        if (
          !type.startsWith('GTGH') &&
          !type.includes('GPON')
        ) {
          this.logger.log(
            `Skipping Slot ${card.slot} (${type})`,
          );

          skipped++;

          continue;
        }

        const totalPorts =
          card.portCount > 0
            ? card.portCount
            : 16;

        this.logger.log(
          `Processing Slot ${card.slot} (${totalPorts} ports)`,
        );

        for (
          let port = 1;
          port <= totalPorts;
          port++
        ) {
          const portName =
            `GPON-${card.rack}/${card.shelf}/${card.slot}:${port}`;

          const existing =
            await this.prisma.ponPort.findFirst({
              where: {
                oltId,
                rack: card.rack,
                shelf: card.shelf,
                slot: card.slot,
                portNumber: port,
              },
            });

          if (!existing) {
            await this.prisma.ponPort.create({
              data: {
                company: {
                  connect: {
                    id: olt.companyId,
                  },
                },

                ...(olt.branchId && {
                  branch: {
                    connect: {
                      id: olt.branchId,
                    },
                  },
                }),

                olt: {
                  connect: {
                    id: olt.id,
                  },
                },

                rack: card.rack,
                shelf: card.shelf,
                slot: card.slot,
                portNumber: port,

                name: portName,

                capacity: 64,

                configuredOnuCount: 0,
                onlineOnuCount: 0,

                status: PonPortStatus.ACTIVE,

                lastSyncAt: new Date(),
              },
            });

            inserted++;
          } else {
            await this.prisma.ponPort.update({
              where: {
                id: existing.id,
              },
              data: {
                name: portName,

                lastSyncAt: new Date(),

                status: PonPortStatus.ACTIVE,
              },
            });

            updated++;
          }
        }
      }

      this.logger.log(
        '========== PON PORT SYNC END =========='
      );

      this.logger.log(
        `Inserted : ${inserted}`,
      );

      this.logger.log(
        `Updated : ${updated}`,
      );

      this.logger.log(
        `Skipped : ${skipped}`,
      );

      return {
        success: true,
        cards: cards.length,
        inserted,
        updated,
        skipped,
      };
    } catch (error) {
      this.logger.error(
        '========== PON PORT SYNC FAILED =========='
      );

      if (error instanceof Error) {
        this.logger.error(error.message);
        this.logger.error(error.stack);
      } else {
        this.logger.error(String(error));
      }

      throw error;
    }
  }
}