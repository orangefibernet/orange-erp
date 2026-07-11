import {
  Injectable,
  Logger,
} from '@nestjs/common';

import { PrismaService } from '../../database/prisma.service';
import { OltService } from '../../olt/olt.service';

import { DeviceConnection } from '../interfaces/device-connection.interface';
import { CardParser } from '../vendors/zte/parsers/card.parser';
import { ZteDriver } from '../vendors/zte/zte.driver';

@Injectable()
export class CardSyncService {
  private readonly logger = new Logger(CardSyncService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly oltService: OltService,
    private readonly zteDriver: ZteDriver,
  ) {}

  async syncCards(oltId: string) {
    try {
      this.logger.log('========== CARD SYNC START ==========');

      this.logger.log(`Finding OLT: ${oltId}`);
      const olt = await this.oltService.findOne(oltId);

      if (!olt) {
        throw new Error(`OLT ${oltId} not found`);
      }

      this.logger.log(`OLT Found: ${olt.name}`);

      const connection: DeviceConnection = {
        host: olt.managementIp,
        port: olt.telnetPort,
        username: olt.username,
        password: olt.password,
        timeout: olt.timeout,
      };

      this.logger.log('Connecting to ZTE...');
      const output = await this.zteDriver.showCards(connection);
      this.logger.log('===== RAW SHOW CARD OUTPUT =====');
      this.logger.log(output);
      this.logger.log('===== END SHOW CARD OUTPUT =====');

      this.logger.log(`Received ${output.length} characters from OLT`);

      const cards = CardParser.parse(output);

      this.logger.log(`Parsed ${cards.length} cards`);

      let inserted = 0;
      let updated = 0;

      for (const card of cards) {
        this.logger.log(
          `Processing Slot ${card.slot} (${card.realType})`,
        );

        const existing = await this.prisma.oltCard.findFirst({
          where: {
            oltId,
            rack: card.rack,
            shelf: card.shelf,
            slot: card.slot,
          },
        });

        if (!existing) {
          await this.prisma.oltCard.create({
            data: {
              oltId,
              rack: card.rack,
              shelf: card.shelf,
              slot: card.slot,
              configuredType: card.configuredType,
              realType: card.realType,
              portCount: card.portCount,
              hardwareVersion: card.hardwareVersion,
              softwareVersion: card.softwareVersion,
              status: card.status,
            },
          });

          inserted++;
        } else {
          await this.prisma.oltCard.update({
            where: {
              id: existing.id,
            },
            data: {
              configuredType: card.configuredType,
              realType: card.realType,
              portCount: card.portCount,
              hardwareVersion: card.hardwareVersion,
              softwareVersion: card.softwareVersion,
              status: card.status,
              lastSyncAt: new Date(),
            },
          });

          updated++;
        }
      }

      this.logger.log('========== CARD SYNC END ==========');

      return {
        success: true,
        olt: olt.name,
        cardsFound: cards.length,
        inserted,
        updated,
      };
    } catch (error) {
      this.logger.error('========== CARD SYNC FAILED ==========');
      this.logger.error(error);
      this.logger.error(error?.stack);
      throw error;
    }
  }
}