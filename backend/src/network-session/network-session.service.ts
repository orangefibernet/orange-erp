import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { RouterOSAPI } from 'node-routeros';

import { PrismaService } from '../database/prisma.service';

@Injectable()
export class NetworkSessionService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async createMikrotikSession(
    nasId: string,
  ): Promise<RouterOSAPI> {
    const nas = await this.prisma.nas.findUnique({
      where: {
        id: nasId,
      },
    });

    if (!nas) {
      throw new NotFoundException(
        'NAS not found',
      );
    }

    if (!nas.isActive) {
      throw new Error(
        'NAS is inactive',
      );
    }

    const api = new RouterOSAPI({
      host: nas.ipAddress,
      user: nas.username,
      password: nas.password,
      port: nas.apiPort ?? 8728,
      timeout: nas.apiTimeout * 1000,
    });

    await api.connect();

    return api;
  }

  async disconnectPppoeUser(
    nasId: string,
    username: string,
  ) {
    const api =
      await this.createMikrotikSession(
        nasId,
      );

    try {
      const sessions = await api.write(
        '/ppp/active/print',
        [
          `?name=${username}`,
        ],
      );

      for (const session of sessions) {
        if (session['.id']) {
          await api.write(
            '/ppp/active/remove',
            [
              `=.id=${session['.id']}`,
            ],
          );
        }
      }

      return {
        success: true,
        username,
        disconnected: sessions.length,
      };
    } finally {
      await api.close();
    }
  }

  async disconnectHotspotUser(
    nasId: string,
    username: string,
  ) {
    const api =
      await this.createMikrotikSession(
        nasId,
      );

    try {
      const sessions = await api.write(
        '/ip/hotspot/active/print',
        [
          `?user=${username}`,
        ],
      );

      for (const session of sessions) {
        if (session['.id']) {
          await api.write(
            '/ip/hotspot/active/remove',
            [
              `=.id=${session['.id']}`,
            ],
          );
        }
      }

      return {
        success: true,
        username,
        disconnected: sessions.length,
      };
    } finally {
      await api.close();
    }
  }
  async getPppoeSession(
  nasId: string,
  username: string,
) {
  const api =
    await this.createMikrotikSession(
      nasId,
    );

  try {
    const sessions = await api.write(
      '/ppp/active/print',
      [
        `?name=${username}`,
      ],
    );

    if (sessions.length === 0) {
      return null;
    }

    return sessions[0];
  } finally {
    await api.close();
  }
}
async getHotspotSession(
  nasId: string,
  username: string,
) {
  const api =
    await this.createMikrotikSession(
      nasId,
    );

  try {
    const sessions = await api.write(
      '/ip/hotspot/active/print',
      [
        `?user=${username}`,
      ],
    );

    if (sessions.length === 0) {
      return null;
    }

    return sessions[0];
  } finally {
    await api.close();
  }
}
}