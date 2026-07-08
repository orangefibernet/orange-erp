import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedPermissions() {
  const permissions = [
    'Company.View',
    'Company.Create',
    'Company.Edit',
    'Company.Delete',

    'Branch.View',
    'Branch.Create',
    'Branch.Edit',
    'Branch.Delete',

    'Department.View',
    'Department.Create',
    'Department.Edit',
    'Department.Delete',

    'Designation.View',
    'Designation.Create',
    'Designation.Edit',
    'Designation.Delete',

    'Employee.View',
    'Employee.Create',
    'Employee.Edit',
    'Employee.Delete',

    'Role.Manage',
    'Permission.Manage',
    'Audit.View',
  ];

  for (const code of permissions) {
    await prisma.permission.upsert({
      where: { code },
      update: {},
      create: {
        code,
        name: code,
        description: code,
      },
    });
  }

  console.log('✅ Permissions Seeded');
}