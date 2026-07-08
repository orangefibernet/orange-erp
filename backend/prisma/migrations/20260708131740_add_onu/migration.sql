-- CreateEnum
CREATE TYPE "OnuStatus" AS ENUM ('ONLINE', 'OFFLINE', 'DISABLED');

-- CreateEnum
CREATE TYPE "OnuVendor" AS ENUM ('ZTE', 'HUAWEI', 'NOKIA', 'FIBERHOME', 'VSOL', 'TP_LINK', 'UFIBER', 'OTHER');

-- CreateTable
CREATE TABLE "Onu" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "branchId" TEXT,
    "oltId" TEXT NOT NULL,
    "serialNumber" TEXT NOT NULL,
    "vendor" "OnuVendor" NOT NULL,
    "model" TEXT NOT NULL,
    "ponPort" INTEGER NOT NULL,
    "onuId" INTEGER NOT NULL,
    "macAddress" TEXT,
    "status" "OnuStatus" NOT NULL DEFAULT 'OFFLINE',
    "rxPower" DOUBLE PRECISION,
    "txPower" DOUBLE PRECISION,
    "distance" DOUBLE PRECISION,
    "installedAt" TIMESTAMP(3),
    "remarks" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Onu_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Onu_serialNumber_key" ON "Onu"("serialNumber");

-- CreateIndex
CREATE INDEX "Onu_companyId_idx" ON "Onu"("companyId");

-- CreateIndex
CREATE INDEX "Onu_branchId_idx" ON "Onu"("branchId");

-- CreateIndex
CREATE INDEX "Onu_oltId_idx" ON "Onu"("oltId");

-- CreateIndex
CREATE UNIQUE INDEX "Onu_oltId_ponPort_onuId_key" ON "Onu"("oltId", "ponPort", "onuId");

-- AddForeignKey
ALTER TABLE "Onu" ADD CONSTRAINT "Onu_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Onu" ADD CONSTRAINT "Onu_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Onu" ADD CONSTRAINT "Onu_oltId_fkey" FOREIGN KEY ("oltId") REFERENCES "Olt"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
