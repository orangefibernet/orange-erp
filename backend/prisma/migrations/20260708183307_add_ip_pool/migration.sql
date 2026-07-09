-- CreateTable
CREATE TABLE "IpPool" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "branchId" TEXT,
    "nasId" TEXT,
    "name" TEXT NOT NULL,
    "network" TEXT NOT NULL,
    "subnetMask" INTEGER NOT NULL,
    "gateway" TEXT NOT NULL,
    "startIp" TEXT NOT NULL,
    "endIp" TEXT NOT NULL,
    "dns1" TEXT,
    "dns2" TEXT,
    "vlanId" INTEGER,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "remarks" TEXT,
    "description" TEXT,
    "createdBy" TEXT,
    "updatedBy" TEXT,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "IpPool_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "IpPool_companyId_idx" ON "IpPool"("companyId");

-- CreateIndex
CREATE INDEX "IpPool_branchId_idx" ON "IpPool"("branchId");

-- CreateIndex
CREATE INDEX "IpPool_nasId_idx" ON "IpPool"("nasId");

-- AddForeignKey
ALTER TABLE "IpPool" ADD CONSTRAINT "IpPool_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IpPool" ADD CONSTRAINT "IpPool_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IpPool" ADD CONSTRAINT "IpPool_nasId_fkey" FOREIGN KEY ("nasId") REFERENCES "Nas"("id") ON DELETE SET NULL ON UPDATE CASCADE;
