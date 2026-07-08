import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedRoles() {
  const roles = [
    'Super Admin',
    'Company Admin',
    'HR Manager',
    'Accountant',
    'Inventory Manager',
    'ISP Operator',
    'Support Engineer',
    'Employee',
  ];

  for (const name of roles) {
    await prisma.role.upsert({
      where: { name },
      update: {},
      create: {
        name,
        description: `${name} Role`,
      },
    });
  }

  console.log('✅ Roles Seeded');
}