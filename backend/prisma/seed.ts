import { seedRoles } from './seeds/roles.seed';
import { seedPermissions } from './seeds/permissions.seed';
import { seedAdmin } from './seeds/admin.seed';

async function main() {
  console.log('🌱 Starting database seeding...');

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