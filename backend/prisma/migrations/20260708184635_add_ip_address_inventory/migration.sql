-- CreateEnum
CREATE TYPE "IpAddressStatus" AS ENUM ('FREE', 'RESERVED', 'ASSIGNED');

-- CreateTable
CREATE TABLE "IpAddress" (
    "id" TEXT NOT NULL,
    "ipPoolId" TEXT NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "status" "IpAddressStatus" NOT NULL DEFAULT 'FREE',
    "customerId" TEXT,
    "connectionId" TEXT,
    "remarks" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "IpAddress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "IpAddress_status_idx" ON "IpAddress"("status");

-- CreateIndex
CREATE UNIQUE INDEX "IpAddress_ipPoolId_ipAddress_key" ON "IpAddress"("ipPoolId", "ipAddress");

-- AddForeignKey
ALTER TABLE "IpAddress" ADD CONSTRAINT "IpAddress_ipPoolId_fkey" FOREIGN KEY ("ipPoolId") REFERENCES "IpPool"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IpAddress" ADD CONSTRAINT "IpAddress_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IpAddress" ADD CONSTRAINT "IpAddress_connectionId_fkey" FOREIGN KEY ("connectionId") REFERENCES "Connection"("id") ON DELETE SET NULL ON UPDATE CASCADE;
