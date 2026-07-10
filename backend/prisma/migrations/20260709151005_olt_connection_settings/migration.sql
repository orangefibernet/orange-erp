/*
  Warnings:

  - Added the required column `password` to the `Olt` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `Olt` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "DeviceProtocol" AS ENUM ('TELNET', 'SSH');

-- AlterTable
ALTER TABLE "Olt" ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "protocol" "DeviceProtocol" NOT NULL DEFAULT 'TELNET',
ADD COLUMN     "telnetPort" INTEGER NOT NULL DEFAULT 23,
ADD COLUMN     "timeout" INTEGER NOT NULL DEFAULT 10000,
ADD COLUMN     "username" TEXT NOT NULL;
