import { Injectable } from '@nestjs/common';

import { PrismaService } from '../database/prisma.service';

import { CreateOnuDto } from './dto/create-onu.dto';
import { UpdateOnuDto } from './dto/update-onu.dto';

@Injectable()
export class OnuService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  // =====================================================
  // CRUD
  // =====================================================

  create(dto: CreateOnuDto) {
    const {
      companyId,
      branchId,
      oltId,
      ponPortId,
      ...data
    } = dto;

    return this.prisma.onu.create({
      data: {
        ...data,

        company: {
          connect: {
            id: companyId,
          },
        },

        olt: {
          connect: {
            id: oltId,
          },
        },

        ponPort: {
          connect: {
            id: ponPortId,
          },
        },

        ...(branchId && {
          branch: {
            connect: {
              id: branchId,
            },
          },
        }),
      },
    });
  }

  findAll() {
    return this.prisma.onu.findMany({
      include: {
        company: true,
        branch: true,
        olt: true,
        ponPort: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  findOne(id: string) {
    return this.prisma.onu.findUnique({
      where: {
        id,
      },

      include: {
        company: true,
        branch: true,
        olt: true,
        ponPort: true,
      },
    });
  }

  update(
    id: string,
    dto: UpdateOnuDto,
  ) {
    const {
      companyId,
      branchId,
      oltId,
      ponPortId,
      ...data
    } = dto;

    return this.prisma.onu.update({
      where: {
        id,
      },

      data: {
        ...data,

        ...(companyId && {
          company: {
            connect: {
              id: companyId,
            },
          },
        }),

        ...(branchId && {
          branch: {
            connect: {
              id: branchId,
            },
          },
        }),

        ...(oltId && {
          olt: {
            connect: {
              id: oltId,
            },
          },
        }),

        ...(ponPortId && {
          ponPort: {
            connect: {
              id: ponPortId,
            },
          },
        }),
      },
    });
  }

  remove(id: string) {
    return this.prisma.onu.delete({
      where: {
        id,
      },
    });
  }

  // =====================================================
  // DISCOVERY
  // =====================================================

  findBySerial(
    serialNumber: string,
  ) {
    return this.prisma.onu.findUnique({
      where: {
        serialNumber,
      },
    });
  }

  findByPonPortAndOnuId(
    ponPortId: string,
    onuId: number,
  ) {
    return this.prisma.onu.findFirst({
      where: {
        ponPortId,
        onuId,
      },
    });
  }

  findByOlt(
    oltId: string,
  ) {
    return this.prisma.onu.findMany({
      where: {
        oltId,
      },

      orderBy: [
        {
          ponPortId: 'asc',
        },
        {
          onuId: 'asc',
        },
      ],
    });
  }
  async upsertFromDiscovery(params: {
  companyId: string;
  branchId?: string;
  oltId: string;
  ponPortId: string;

  onuId: number;

  interfaceName?: string;
  serialNumber?: string;

  vendor?: any;
  model?: string;

  adminState?: string;
  omccState?: string;
  phaseState?: string;
  channel?: string;
}) {
  const existing =
    await this.findByPonPortAndOnuId(
      params.ponPortId,
      params.onuId,
    );

  const status =
    params.phaseState?.toLowerCase() === 'working'
      ? 'ONLINE'
      : 'OFFLINE';

  if (!existing) {
    return this.prisma.onu.create({
      data: {
        company: {
          connect: {
            id: params.companyId,
          },
        },

        ...(params.branchId && {
          branch: {
            connect: {
              id: params.branchId,
            },
          },
        }),

        olt: {
          connect: {
            id: params.oltId,
          },
        },

        ponPort: {
          connect: {
            id: params.ponPortId,
          },
        },

        onuId: params.onuId,

        interfaceName: params.interfaceName,

        serialNumber:
          params.serialNumber ??
          `DISCOVERED-${params.onuId}`,

        vendor:
          params.vendor ?? 'ZTE',

        model:
          params.model ?? 'UNKNOWN',

        adminState:
          params.adminState,

        omccState:
          params.omccState,

        phaseState:
          params.phaseState,

        channel:
          params.channel,

        status,

        lastSyncAt: new Date(),
      },
    });
  }

  return this.prisma.onu.update({
    where: {
      id: existing.id,
    },

    data: {
      interfaceName:
        params.interfaceName,

      adminState:
        params.adminState,

      omccState:
        params.omccState,

      phaseState:
        params.phaseState,

      channel:
        params.channel,

      status,

      lastSyncAt: new Date(),
    },
  });
}
}