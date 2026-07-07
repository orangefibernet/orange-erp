/*
  Warnings:

  - Made the column `companyId` on table `Branch` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."Branch" DROP CONSTRAINT "Branch_companyId_fkey";

-- AlterTable
ALTER TABLE "Branch" ALTER COLUMN "companyId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "city" TEXT,
ADD COLUMN     "country" TEXT DEFAULT 'India',
ADD COLUMN     "currency" TEXT NOT NULL DEFAULT 'INR',
ADD COLUMN     "gstin" TEXT,
ADD COLUMN     "legalName" TEXT,
ADD COLUMN     "logo" TEXT,
ADD COLUMN     "pan" TEXT,
ADD COLUMN     "postalCode" TEXT,
ADD COLUMN     "registrationNumber" TEXT,
ADD COLUMN     "state" TEXT,
ADD COLUMN     "timezone" TEXT NOT NULL DEFAULT 'Asia/Kolkata',
ADD COLUMN     "website" TEXT;

-- AddForeignKey
ALTER TABLE "Branch" ADD CONSTRAINT "Branch_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
