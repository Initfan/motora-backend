-- CreateEnum
CREATE TYPE "ComponentStatus" AS ENUM ('SAFE', 'DUE_SOON', 'OVERDUE', 'UNKNOWN');

-- CreateTable
CREATE TABLE "MotorComponent" (
    "id" SERIAL NOT NULL,
    "model" TEXT NOT NULL,
    "component" TEXT NOT NULL,
    "interval_km" INTEGER NOT NULL,
    "interval_month" INTEGER NOT NULL,
    "last_service_date" TIMESTAMP(3) NOT NULL,
    "last_service_km" INTEGER NOT NULL,
    "next_schedule_date" TIMESTAMP(3) NOT NULL,
    "next_schedule_km" INTEGER NOT NULL,
    "status" "ComponentStatus" NOT NULL,
    "motorcycle_id" INTEGER NOT NULL,

    CONSTRAINT "MotorComponent_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MotorComponent" ADD CONSTRAINT "MotorComponent_motorcycle_id_fkey" FOREIGN KEY ("motorcycle_id") REFERENCES "Motorcycle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
