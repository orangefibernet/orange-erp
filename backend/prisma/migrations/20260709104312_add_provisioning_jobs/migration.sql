-- CreateTable
CREATE TABLE "ProvisioningJob" (
    "id" TEXT NOT NULL,
    "queueJobId" TEXT,
    "connectionId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "startedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "error" TEXT,
    "payload" JSONB,
    "response" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProvisioningJob_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProvisioningJob_queueJobId_key" ON "ProvisioningJob"("queueJobId");

-- CreateIndex
CREATE INDEX "ProvisioningJob_connectionId_idx" ON "ProvisioningJob"("connectionId");

-- CreateIndex
CREATE INDEX "ProvisioningJob_status_idx" ON "ProvisioningJob"("status");

-- CreateIndex
CREATE INDEX "ProvisioningJob_action_idx" ON "ProvisioningJob"("action");

-- AddForeignKey
ALTER TABLE "ProvisioningJob" ADD CONSTRAINT "ProvisioningJob_connectionId_fkey" FOREIGN KEY ("connectionId") REFERENCES "Connection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
