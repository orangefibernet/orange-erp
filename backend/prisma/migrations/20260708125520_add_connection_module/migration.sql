-- CreateEnum
CREATE TYPE "ConnectionStatus" AS ENUM ('PENDING', 'ACTIVE', 'SUSPENDED', 'DISCONNECTED');

-- CreateTable
CREATE TABLE "Connection" (
    "id" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "subscriptionId" TEXT NOT NULL,
    "pppoeUsername" TEXT NOT NULL,
    "pppoePassword" TEXT NOT NULL,
    "oltName" TEXT,
    "ponPort" TEXT,
    "onuSerialNumber" TEXT,
    "vlanId" INTEGER,
    "staticIp" TEXT,
    "macAddress" TEXT,
    "installationDate" TIMESTAMP(3),
    "activationDate" TIMESTAMP(3),
    "status" "ConnectionStatus" NOT NULL DEFAULT 'PENDING',
    "remarks" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Connection_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Connection_pppoeUsername_key" ON "Connection"("pppoeUsername");

-- CreateIndex
CREATE INDEX "Connection_customerId_idx" ON "Connection"("customerId");

-- CreateIndex
CREATE INDEX "Connection_subscriptionId_idx" ON "Connection"("subscriptionId");

-- CreateIndex
CREATE INDEX "Connection_pppoeUsername_idx" ON "Connection"("pppoeUsername");

-- AddForeignKey
ALTER TABLE "Connection" ADD CONSTRAINT "Connection_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Connection" ADD CONSTRAINT "Connection_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "Subscription"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
