import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function seedAdmin() {
  console.log('👤 Seeding Super Admin...');

  const company = await prisma.company.findFirst({
    where: {
      code: 'ORANGE',
    },
  });

  if (!company) {
    throw new Error('Company not found.');
  }

  const role = await prisma.role.findFirst({
    where: {
      name: 'Super Admin',
    },
  });

  if (!role) {
    throw new Error('Super Admin role not found.');
  }

  const existing = await prisma.user.findFirst({
    where: {
      username: 'admin',
    },
  });

  if (existing) {
    console.log('✅ Admin user already exists.');
    return;
  }

  const passwordHash = await bcrypt.hash('Orange@123', 10);

  await prisma.user.create({
    data: {
      companyId: company.id,
      roleId: role.id,
      username: 'admin',
      fullName: 'System Administrator',
      email: 'admin@orangeerp.local',
      passwordHash,
      isActive: true,
    },
  });

  console.log('✅ Super Admin created.');
}