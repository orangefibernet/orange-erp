import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../database/prisma.service';
import { NetworkSessionService } from '../network-session/network-session.service';

@Injectable()
export class SelfcareService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly networkSessionService: NetworkSessionService,
  
  ) {}

  async dashboard(customerId: string) {
    const customer =
      await this.prisma.customer.findUnique({
        where: {
          id: customerId,
        },
        include: {
          subscriptions: {
            where: {
              status: 'ACTIVE',
            },
            take: 1,
            include: {
              package: true,

              connections: {
                include: {
                  onu: true,
                  nas: true,
                },
              },

              billings: {
                orderBy: {
                  invoiceDate: 'desc',
                },
                take: 1,
                include: {
                  payments: {
                    orderBy: {
                      paymentDate: 'desc',
                    },
                    take: 1,
                  },
                },
              },
            },
          },
        },
      });

    if (!customer) {
      throw new NotFoundException(
        'Customer not found',
      );
    }

    const subscription =
      customer.subscriptions.length > 0
        ? customer.subscriptions[0]
        : null;

    const latestInvoice =
      subscription &&
      subscription.billings.length > 0
        ? subscription.billings[0]
        : null;

    const lastPayment =
      latestInvoice &&
      latestInvoice.payments.length > 0
        ? latestInvoice.payments[0]
        : null;

    const outstandingAmount = latestInvoice
      ? Number(latestInvoice.totalAmount) -
        latestInvoice.payments.reduce(
          (sum, payment) =>
            sum + Number(payment.amount),
          0,
        )
      : 0;

    return {
      customer,

      subscription,

      currentPackage:
        subscription?.package ?? null,

      connections:
        subscription?.connections ?? [],

      latestInvoice,

      lastPayment,

      outstandingAmount,

      onlineStatus: false,

      currentSession: null,

      notifications: [],

      tickets: [],
    };
  }
  async profile(customerId: string) {
  const customer =
    await this.prisma.customer.findUnique({
      where: {
        id: customerId,
      },
      include: {
        subscriptions: {
          include: {
            package: true,
            connections: {
              include: {
                onu: true,
                nas: true,
              },
            },
          },
        },
      },
    });

  if (!customer) {
    throw new NotFoundException(
      'Customer not found',
    );
  }

  return customer;
}
async invoices(customerId: string) {
  return this.prisma.billing.findMany({
    where: {
      subscription: {
        customerId,
      },
    },
    include: {
      payments: true,
      subscription: {
        include: {
          package: true,
        },
      },
    },
    orderBy: {
      invoiceDate: 'desc',
    },
  });
}

async payments(customerId: string) {
  return this.prisma.payment.findMany({
    where: {
      billing: {
        subscription: {
          customerId,
        },
      },
    },
    include: {
      billing: true,
    },
    orderBy: {
      paymentDate: 'desc',
    },
  });
}

async outstanding(customerId: string) {
  const bills = await this.prisma.billing.findMany({
    where: {
      subscription: {
        customerId,
      },
    },
    include: {
      payments: true,
    },
  });

  const outstanding = bills.reduce((sum, bill) => {
    const paid = bill.payments.reduce(
      (paymentSum, payment) =>
        paymentSum + Number(payment.amount),
      0,
    );

    return sum + (Number(bill.totalAmount) - paid);
  }, 0);

  return {
    outstandingAmount: outstanding,
    totalInvoices: bills.length,
  };
}
async session(customerId: string) {
  const connection =
    await this.prisma.connection.findFirst({
      where: {
        customerId,
        status: 'ACTIVE',
      },
      include: {
        nas: true,
      },
    });

  if (!connection) {
    throw new NotFoundException(
      'Active connection not found',
    );
  }

  if (!connection.nas) {
    throw new NotFoundException(
      'NAS not assigned',
    );
  }

  const session =
    await this.networkSessionService.getPppoeSession(
      connection.nas.id,
      connection.pppoeUsername,
    );

  if (!session) {
    return {
      online: false,
      connectionId: connection.id,
      username: connection.pppoeUsername,
      message: 'Customer is offline',
    };
  }

  return {
    online: true,
    connectionId: connection.id,
    username: connection.pppoeUsername,

    ipAddress: session.address ?? null,

    callerId: session['caller-id'] ?? null,

    uptime: session.uptime ?? null,

    service: session.service ?? null,

    interface: session.interface ?? null,

    rawSession: session,
  };
}
}