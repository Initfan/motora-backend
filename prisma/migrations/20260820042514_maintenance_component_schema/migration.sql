/*
  Warnings:

  - You are about to drop the column `component` on the `MotorComponent` table. All the data in the column will be lost.
  - You are about to drop the column `interval_km` on the `MotorComponent` table. All the data in the column will be lost.
  - You are about to drop the column `interval_month` on the `MotorComponent` table. All the data in the column will be lost.
  - You are about to drop the column `model` on the `MotorComponent` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "MotorComponent" DROP COLUMN "component",
DROP COLUMN "interval_km",
DROP COLUMN "interval_month",
DROP COLUMN "model",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "MaintenanceComponent" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "default_interval_km" INTEGER NOT NULL,
    "default_interval_month" INTEGER NOT NULL,
    "is_critical" BOOLEAN NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "MaintenanceComponent_pkey" PRIMARY KEY ("id")
);
