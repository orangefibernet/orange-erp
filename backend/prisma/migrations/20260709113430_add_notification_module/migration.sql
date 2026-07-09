-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('INFO', 'SUCCESS', 'WARNING', 'ERROR');

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "customerId" TEXT,
    "employeeId" TEXT,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "type" "NotificationType" NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Notification_customerId_idx" ON "Notification"("customerId");

-- CreateIndex
CREATE INDEX "Notification_isRead_idx" ON "Notification"("isRead");

-- CreateIndex
CREATE INDEX "Notification_type_idx" ON "Notification"("type");

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
