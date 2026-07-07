/*
  Warnings:

  - You are about to drop the column `manager` on the `Branch` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Branch" DROP CONSTRAINT "Branch_companyId_fkey";

-- AlterTable
ALTER TABLE "Branch" DROP COLUMN "manager",
ADD COLUMN     "country" TEXT DEFAULT 'India',
ALTER COLUMN "companyId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Branch" ADD CONSTRAINT "Branch_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;
