import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedCompany() {
  console.log('🏢 Seeding Company...');

  const existing = await prisma.company.findUnique({
    where: {
      code: 'ORANGE',
    },
  });

  if (existing) {
    console.log('✅ Company already exists.');
    return existing;
  }

  const company = await prisma.company.create({
    data: {
      code: 'ORANGE',
      name: 'Orange Fibernet',
      email: 'info@orangefibernet.com',
      phone: '9989902368',
      isActive: true,
    },
  });

  console.log('✅ Company created.');

  return company;
}