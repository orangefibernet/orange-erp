-- CreateTable
CREATE TABLE "RadiusServer" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "branchId" TEXT,
    "name" TEXT NOT NULL,
    "host" TEXT NOT NULL,
    "authPort" INTEGER NOT NULL DEFAULT 1812,
    "acctPort" INTEGER NOT NULL DEFAULT 1813,
    "coaPort" INTEGER NOT NULL DEFAULT 3799,
    "secret" TEXT NOT NULL,
    "timeout" INTEGER NOT NULL DEFAULT 30,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "version" TEXT,
    "description" TEXT,
    "remarks" TEXT,
    "createdBy" TEXT,
    "updatedBy" TEXT,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RadiusServer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "RadiusServer_companyId_idx" ON "RadiusServer"("companyId");

-- CreateIndex
CREATE INDEX "RadiusServer_branchId_idx" ON "RadiusServer"("branchId");

-- AddForeignKey
ALTER TABLE "RadiusServer" ADD CONSTRAINT "RadiusServer_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RadiusServer" ADD CONSTRAINT "RadiusServer_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;
