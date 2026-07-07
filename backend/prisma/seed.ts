import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding OrangeERP...');

  // ------------------------------------------------------------------
  // Company
  // ------------------------------------------------------------------

  const company = await prisma.company.upsert({
    where: {
      code: 'ORANGE',
    },
    update: {},
    create: {
      name: 'Orange Fibernet',
      code: 'ORANGE',
      email: 'admin@orangefibernet.in',
      phone: '9999999999',
      address: 'Anaparthy, Andhra Pradesh',
    },
  });

  // ------------------------------------------------------------------
  // Branch
  // ------------------------------------------------------------------

  const branch = await prisma.branch.upsert({
    where: {
      code: 'HEAD',
    },
    update: {},
    create: {
      name: 'Head Office',
      code: 'HEAD',
      address: 'Anaparthy',

      Company: {
  connect: {
    id: company.id,
  },
},
    },
  });

  // ------------------------------------------------------------------
  // Role
  // ------------------------------------------------------------------

  const role = await prisma.role.upsert({
    where: {
      name: 'Super Admin',
    },
    update: {},
    create: {
      name: 'Super Admin',
      description: 'Full system access',
    },
  });

  // ------------------------------------------------------------------
  // Password
  // ------------------------------------------------------------------

  const passwordHash = await bcrypt.hash('Orange@123', 10);

  // ------------------------------------------------------------------
  // Admin User
  // ------------------------------------------------------------------

  await prisma.user.upsert({
    where: {
      username: 'admin',
    },

    update: {},

    create: {
      username: 'admin',
      email: 'admin@orangefibernet.in',
      fullName: 'System Administrator',
      passwordHash,

      company: {
        connect: {
          id: company.id,
        },
      },

      branch: {
        connect: {
          id: branch.id,
        },
      },

      role: {
        connect: {
          id: role.id,
        },
      },
    },
  });

  console.log('✅ OrangeERP Seed Completed');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });