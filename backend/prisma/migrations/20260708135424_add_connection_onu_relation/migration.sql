/*
  Warnings:

  - You are about to drop the column `oltName` on the `Connection` table. All the data in the column will be lost.
  - You are about to drop the column `onuSerialNumber` on the `Connection` table. All the data in the column will be lost.
  - You are about to drop the column `ponPort` on the `Connection` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[connectionNumber]` on the table `Connection` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `connectionNumber` to the `Connection` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Connection" DROP COLUMN "oltName",
DROP COLUMN "onuSerialNumber",
DROP COLUMN "ponPort",
ADD COLUMN     "activatedBy" TEXT,
ADD COLUMN     "connectionNumber" TEXT NOT NULL,
ADD COLUMN     "disconnectedDate" TIMESTAMP(3),
ADD COLUMN     "installedBy" TEXT,
ADD COLUMN     "lastSyncAt" TIMESTAMP(3),
ADD COLUMN     "onuId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Connection_connectionNumber_key" ON "Connection"("connectionNumber");

-- CreateIndex
CREATE INDEX "Connection_onuId_idx" ON "Connection"("onuId");

-- CreateIndex
CREATE INDEX "Connection_connectionNumber_idx" ON "Connection"("connectionNumber");

-- AddForeignKey
ALTER TABLE "Connection" ADD CONSTRAINT "Connection_onuId_fkey" FOREIGN KEY ("onuId") REFERENCES "Onu"("id") ON DELETE SET NULL ON UPDATE CASCADE;
