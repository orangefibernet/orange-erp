-- CreateEnum
CREATE TYPE "BillingStatus" AS ENUM ('PENDING', 'GENERATED', 'PAID', 'OVERDUE', 'CANCELLED');

-- CreateEnum
CREATE TYPE "OltVendor" AS ENUM ('ZTE', 'HUAWEI', 'NOKIA', 'FIBERHOME', 'DASAN');

-- CreateEnum
CREATE TYPE "OltStatus" AS ENUM ('ACTIVE', 'MAINTENANCE', 'OFFLINE');

-- CreateTable
CREATE TABLE "Billing" (
    "id" TEXT NOT NULL,
    "subscriptionId" TEXT NOT NULL,
    "billingMonth" INTEGER NOT NULL,
    "billingYear" INTEGER NOT NULL,
    "invoiceNumber" TEXT NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "gstAmount" DECIMAL(10,2) NOT NULL,
    "totalAmount" DECIMAL(10,2) NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "paidDate" TIMESTAMP(3),
    "status" "BillingStatus" NOT NULL DEFAULT 'PENDING',
    "remarks" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Billing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Olt" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "branchId" TEXT,
    "name" TEXT NOT NULL,
    "vendor" "OltVendor" NOT NULL,
    "model" TEXT NOT NULL,
    "managementIp" TEXT NOT NULL,
    "snmpCommunity" TEXT,
    "sshPort" INTEGER NOT NULL DEFAULT 22,
    "location" TEXT,
    "status" "OltStatus" NOT NULL DEFAULT 'ACTIVE',
    "remarks" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Olt_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Billing_invoiceNumber_key" ON "Billing"("invoiceNumber");

-- CreateIndex
CREATE INDEX "Billing_status_idx" ON "Billing"("status");

-- CreateIndex
CREATE UNIQUE INDEX "Billing_subscriptionId_billingMonth_billingYear_key" ON "Billing"("subscriptionId", "billingMonth", "billingYear");

-- CreateIndex
CREATE INDEX "Olt_companyId_idx" ON "Olt"("companyId");

-- CreateIndex
CREATE INDEX "Olt_branchId_idx" ON "Olt"("branchId");

-- CreateIndex
CREATE UNIQUE INDEX "Olt_companyId_name_key" ON "Olt"("companyId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "Olt_companyId_managementIp_key" ON "Olt"("companyId", "managementIp");

-- AddForeignKey
ALTER TABLE "Billing" ADD CONSTRAINT "Billing_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "Subscription"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Olt" ADD CONSTRAINT "Olt_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Olt" ADD CONSTRAINT "Olt_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;
