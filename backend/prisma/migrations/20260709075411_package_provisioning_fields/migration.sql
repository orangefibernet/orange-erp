-- AlterTable
ALTER TABLE "Package" ADD COLUMN     "burstDownloadMbps" INTEGER,
ADD COLUMN     "burstUploadMbps" INTEGER,
ADD COLUMN     "ciscoPolicy" TEXT,
ADD COLUMN     "huaweiProfile" TEXT,
ADD COLUMN     "idleTimeout" INTEGER,
ADD COLUMN     "ipPool" TEXT,
ADD COLUMN     "mikrotikProfile" TEXT,
ADD COLUMN     "nokiaProfile" TEXT,
ADD COLUMN     "priority" INTEGER NOT NULL DEFAULT 8,
ADD COLUMN     "radiusGroup" TEXT,
ADD COLUMN     "sessionTimeout" INTEGER,
ADD COLUMN     "simultaneousUse" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "zteProfile" TEXT;

-- CreateIndex
CREATE INDEX "Package_radiusGroup_idx" ON "Package"("radiusGroup");

-- CreateIndex
CREATE INDEX "Package_isActive_idx" ON "Package"("isActive");
