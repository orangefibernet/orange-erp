import { seedCompany } from './seeds/company.seed';
import { seedBranch } from './seeds/branch.seed';
import { seedOlt } from './seeds/olt.seed';
import { seedRoles } from './seeds/roles.seed';
import { seedPermissions } from './seeds/permissions.seed';
import { seedAdmin } from './seeds/admin.seed';

async function main() {
  console.log('🌱 Starting database seeding...');

  await seedCompany();

  await seedBranch();

  await seedOlt();

  await seedRoles();

  await seedPermissions();

  await seedAdmin();

  console.log('✅ Database seeding completed.');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });