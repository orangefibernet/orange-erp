/*
  Warnings:

  - A unique constraint covering the columns `[oltId,rack,shelf,slot,portNumber]` on the table `PonPort` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `rack` to the `PonPort` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shelf` to the `PonPort` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slot` to the `PonPort` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."PonPort_oltId_portNumber_key";

-- AlterTable
ALTER TABLE "PonPort" ADD COLUMN     "configuredOnuCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "lastSyncAt" TIMESTAMP(3),
ADD COLUMN     "onlineOnuCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "rack" INTEGER NOT NULL,
ADD COLUMN     "shelf" INTEGER NOT NULL,
ADD COLUMN     "slot" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "PonPort_oltId_rack_shelf_slot_portNumber_key" ON "PonPort"("oltId", "rack", "shelf", "slot", "portNumber");
