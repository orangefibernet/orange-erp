-- AlterTable
ALTER TABLE "IpAddress" ADD COLUMN     "assignedAt" TIMESTAMP(3),
ADD COLUMN     "assignedBy" TEXT,
ADD COLUMN     "leasedUntil" TIMESTAMP(3),
ADD COLUMN     "releasedAt" TIMESTAMP(3);
