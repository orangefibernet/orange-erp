-- AlterTable
ALTER TABLE "Onu" ADD COLUMN     "adminState" TEXT,
ADD COLUMN     "authenticationMode" TEXT,
ADD COLUMN     "channel" TEXT,
ADD COLUMN     "configState" TEXT,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "interfaceName" TEXT,
ADD COLUMN     "lastSyncAt" TIMESTAMP(3),
ADD COLUMN     "omccState" TEXT,
ADD COLUMN     "onlineDuration" TEXT,
ADD COLUMN     "onuName" TEXT,
ADD COLUMN     "phaseState" TEXT;

-- CreateIndex
CREATE INDEX "Onu_status_idx" ON "Onu"("status");

-- CreateIndex
CREATE INDEX "Onu_phaseState_idx" ON "Onu"("phaseState");

-- CreateIndex
CREATE INDEX "Onu_serialNumber_idx" ON "Onu"("serialNumber");
