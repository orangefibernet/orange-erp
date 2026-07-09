-- AlterTable
ALTER TABLE "Nas" ADD COLUMN     "defaultIpPoolId" TEXT;

-- AddForeignKey
ALTER TABLE "Nas" ADD CONSTRAINT "Nas_defaultIpPoolId_fkey" FOREIGN KEY ("defaultIpPoolId") REFERENCES "IpPool"("id") ON DELETE SET NULL ON UPDATE CASCADE;
