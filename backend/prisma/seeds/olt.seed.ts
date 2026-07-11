import { PrismaClient, DeviceProtocol, OltStatus, OltVendor } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedOlt() {
  console.log('🌐 Seeding OLT...');

  const company = await prisma.company.findUnique({
    where: {
      code: 'ORANGE',
    },
  });

  if (!company) {
    throw new Error('Company not found.');
  }

  const branch = await prisma.branch.findFirst({
    where: {
      companyId: company.id,
      code: 'HO',
    },
  });

  if (!branch) {
    throw new Error('Branch not found.');
  }

  const existing = await prisma.olt.findFirst({
    where: {
      companyId: company.id,
      name: 'ZTE C300 Main',
    },
  });

  if (existing) {
    console.log('✅ OLT already exists.');
    return existing;
  }

  const olt = await prisma.olt.create({
    data: {
      companyId: company.id,
      branchId: branch.id,

      name: 'ZTE C300 Main',

      vendor: OltVendor.ZTE,

      model: 'C300',

      managementIp: '103.162.188.2',

      protocol: DeviceProtocol.TELNET,

      telnetPort: 2334,

      sshPort: 22,

      username: 'zte',

      password: 'zte',

      timeout: 10000,

      location: 'Head Office',

      status: OltStatus.ACTIVE,

      remarks: 'Default development OLT',
    },
  });

  console.log('✅ OLT created.');

  return olt;
}