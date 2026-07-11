-- CreateTable
CREATE TABLE "OltCard" (
    "id" TEXT NOT NULL,
    "oltId" TEXT NOT NULL,
    "rack" INTEGER NOT NULL,
    "shelf" INTEGER NOT NULL,
    "slot" INTEGER NOT NULL,
    "configuredType" TEXT NOT NULL,
    "realType" TEXT NOT NULL,
    "portCount" INTEGER NOT NULL,
    "hardwareVersion" TEXT,
    "softwareVersion" TEXT,
    "status" TEXT NOT NULL,
    "lastSyncAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OltCard_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "OltCard_oltId_idx" ON "OltCard"("oltId");

-- CreateIndex
CREATE INDEX "OltCard_status_idx" ON "OltCard"("status");

-- CreateIndex
CREATE UNIQUE INDEX "OltCard_oltId_rack_shelf_slot_key" ON "OltCard"("oltId", "rack", "shelf", "slot");

-- AddForeignKey
ALTER TABLE "OltCard" ADD CONSTRAINT "OltCard_oltId_fkey" FOREIGN KEY ("oltId") REFERENCES "Olt"("id") ON DELETE CASCADE ON UPDATE CASCADE;
