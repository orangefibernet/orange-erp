-- CreateEnum
CREATE TYPE "ProvisioningStatus" AS ENUM ('PENDING', 'SUCCESS', 'FAILED');

-- CreateEnum
CREATE TYPE "ProvisioningAction" AS ENUM ('CREATE_CONNECTION', 'CREATE_RADIUS_USER', 'UPDATE_RADIUS_PASSWORD', 'DELETE_RADIUS_USER', 'ASSIGN_RADIUS_GROUP', 'REMOVE_RADIUS_GROUP', 'ALLOCATE_IP', 'RELEASE_IP', 'MIKROTIK_PROVISION', 'MIKROTIK_DISABLE', 'MIKROTIK_ENABLE', 'OLT_PROVISION', 'OLT_DEPROVISION');

-- CreateTable
CREATE TABLE "ProvisioningLog" (
    "id" TEXT NOT NULL,
    "customerId" TEXT,
    "connectionId" TEXT,
    "action" "ProvisioningAction" NOT NULL,
    "status" "ProvisioningStatus" NOT NULL,
    "message" TEXT,
    "executedBy" TEXT,
    "executedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProvisioningLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "radcheck" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "attribute" TEXT NOT NULL,
    "op" TEXT NOT NULL DEFAULT ':=',
    "value" TEXT NOT NULL,

    CONSTRAINT "radcheck_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "radreply" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "attribute" TEXT NOT NULL,
    "op" TEXT NOT NULL DEFAULT ':=',
    "value" TEXT NOT NULL,

    CONSTRAINT "radreply_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "radusergroup" (
    "username" TEXT NOT NULL,
    "groupname" TEXT NOT NULL,
    "priority" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "radusergroup_pkey" PRIMARY KEY ("username","groupname")
);

-- CreateTable
CREATE TABLE "radgroupreply" (
    "id" SERIAL NOT NULL,
    "groupname" TEXT NOT NULL,
    "attribute" TEXT NOT NULL,
    "op" TEXT NOT NULL DEFAULT ':=',
    "value" TEXT NOT NULL,

    CONSTRAINT "radgroupreply_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nas" (
    "id" SERIAL NOT NULL,
    "nasname" TEXT NOT NULL,
    "shortname" TEXT,
    "type" TEXT,
    "ports" INTEGER,
    "secret" TEXT NOT NULL,
    "server" TEXT,
    "community" TEXT,
    "description" TEXT,

    CONSTRAINT "nas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ProvisioningLog_customerId_idx" ON "ProvisioningLog"("customerId");

-- CreateIndex
CREATE INDEX "ProvisioningLog_connectionId_idx" ON "ProvisioningLog"("connectionId");

-- CreateIndex
CREATE INDEX "ProvisioningLog_executedAt_idx" ON "ProvisioningLog"("executedAt");

-- AddForeignKey
ALTER TABLE "ProvisioningLog" ADD CONSTRAINT "ProvisioningLog_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProvisioningLog" ADD CONSTRAINT "ProvisioningLog_connectionId_fkey" FOREIGN KEY ("connectionId") REFERENCES "Connection"("id") ON DELETE SET NULL ON UPDATE CASCADE;
