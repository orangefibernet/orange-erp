/*
  Warnings:

  - You are about to drop the column `ponPort` on the `Onu` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[ponPortId,onuId]` on the table `Onu` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ponPortId` to the `Onu` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PonPortStatus" AS ENUM ('ACTIVE', 'DISABLED', 'MAINTENANCE');

-- DropIndex
DROP INDEX "public"."Onu_oltId_ponPort_onuId_key";

-- AlterTable
ALTER TABLE "Onu" DROP COLUMN "ponPort",
ADD COLUMN     "ponPortId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "PonPort" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "branchId" TEXT,
    "oltId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "portNumber" INTEGER NOT NULL,
    "splitter" TEXT,
    "capacity" INTEGER NOT NULL DEFAULT 64,
    "status" "PonPortStatus" NOT NULL DEFAULT 'ACTIVE',
    "remarks" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "PonPort_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PonPort_companyId_idx" ON "PonPort"("companyId");

-- CreateIndex
CREATE INDEX "PonPort_branchId_idx" ON "PonPort"("branchId");

-- CreateIndex
CREATE INDEX "PonPort_oltId_idx" ON "PonPort"("oltId");

-- CreateIndex
CREATE UNIQUE INDEX "PonPort_oltId_portNumber_key" ON "PonPort"("oltId", "portNumber");

-- CreateIndex
CREATE UNIQUE INDEX "PonPort_oltId_name_key" ON "PonPort"("oltId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "Onu_ponPortId_onuId_key" ON "Onu"("ponPortId", "onuId");

-- AddForeignKey
ALTER TABLE "Onu" ADD CONSTRAINT "Onu_ponPortId_fkey" FOREIGN KEY ("ponPortId") REFERENCES "PonPort"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PonPort" ADD CONSTRAINT "PonPort_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PonPort" ADD CONSTRAINT "PonPort_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PonPort" ADD CONSTRAINT "PonPort_oltId_fkey" FOREIGN KEY ("oltId") REFERENCES "Olt"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
