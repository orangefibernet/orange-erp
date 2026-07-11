import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedBranch() {
  console.log('🏢 Seeding Branch...');

  const company = await prisma.company.findUnique({
    where: {
      code: 'ORANGE',
    },
  });

  if (!company) {
    throw new Error('Company not found.');
  }

  const existing = await prisma.branch.findFirst({
    where: {
      companyId: company.id,
      code: 'HO',
    },
  });

  if (existing) {
    console.log('✅ Branch already exists.');
    return existing;
  }

  const branch = await prisma.branch.create({
    data: {
      companyId: company.id,
      code: 'HO',
      name: 'Head Office',
      address: 'Anaparthy',
      phone: '9989902368',
      email: 'info@orangefibernet.com',
      isActive: true,
    },
  });

  console.log('✅ Branch created.');

  return branch;
}