-- CreateEnum
CREATE TYPE "NasVendor" AS ENUM ('MIKROTIK', 'CISCO', 'JUNIPER', 'HUAWEI');

-- CreateEnum
CREATE TYPE "ServiceType" AS ENUM ('PPPOE', 'HOTSPOT', 'STATIC');

-- AlterTable
ALTER TABLE "Billing" ADD COLUMN     "invoiceDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Connection" ADD COLUMN     "nasId" TEXT,
ADD COLUMN     "serviceType" "ServiceType" NOT NULL DEFAULT 'PPPOE';

-- CreateTable
CREATE TABLE "Nas" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "branchId" TEXT,
    "name" TEXT NOT NULL,
    "vendor" "NasVendor" NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "apiPort" INTEGER,
    "sshPort" INTEGER NOT NULL DEFAULT 22,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "remarks" TEXT,
    "description" TEXT,
    "radiusEnabled" BOOLEAN NOT NULL DEFAULT false,
    "apiProtocol" TEXT,
    "apiTimeout" INTEGER NOT NULL DEFAULT 30,
    "location" TEXT,
    "lastSyncAt" TIMESTAMP(3),
    "createdBy" TEXT,
    "updatedBy" TEXT,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Nas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Nas_companyId_idx" ON "Nas"("companyId");

-- CreateIndex
CREATE INDEX "Connection_nasId_idx" ON "Connection"("nasId");

-- AddForeignKey
ALTER TABLE "Connection" ADD CONSTRAINT "Connection_nasId_fkey" FOREIGN KEY ("nasId") REFERENCES "Nas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Nas" ADD CONSTRAINT "Nas_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Nas" ADD CONSTRAINT "Nas_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;
