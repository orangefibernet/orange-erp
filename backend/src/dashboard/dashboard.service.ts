import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getDashboard() {
    const [
      totalCustomers,
      activeCustomers,
      totalSubscriptions,
      activeSubscriptions,
      totalConnections,
      activeConnections,
      totalOlts,
      totalPonPorts,
      totalOnus,
      onlineOnus,
      offlineOnus,
      pendingBills,
    ] = await Promise.all([
      this.prisma.customer.count(),

      this.prisma.customer.count({
        where: {
          status: 'ACTIVE',
        },
      }),

      this.prisma.subscription.count(),

      this.prisma.subscription.count({
        where: {
          status: 'ACTIVE',
        },
      }),

      this.prisma.connection.count(),

      this.prisma.connection.count({
        where: {
          status: 'ACTIVE',
        },
      }),

      this.prisma.olt.count(),

      this.prisma.ponPort.count(),

      this.prisma.onu.count(),

      this.prisma.onu.count({
        where: {
          status: 'ONLINE',
        },
      }),

      this.prisma.onu.count({
        where: {
          status: 'OFFLINE',
        },
      }),

      this.prisma.billing.count({
        where: {
          status: 'PENDING',
        },
      }),
    ]);

    return {
      customers: {
        total: totalCustomers,
        active: activeCustomers,
      },

      subscriptions: {
        total: totalSubscriptions,
        active: activeSubscriptions,
      },

      connections: {
        total: totalConnections,
        active: activeConnections,
      },

      network: {
        olts: totalOlts,
        ponPorts: totalPonPorts,
        onus: totalOnus,
        onlineOnus: onlineOnus,
        offlineOnus: offlineOnus,
      },

      billing: {
        pendingBills,
      },
    };
  }
}