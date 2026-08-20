/*
  Warnings:

  - Added the required column `component_id` to the `MotorComponent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MotorComponent" ADD COLUMN     "component_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "FuelRecord" (
    "id" SERIAL NOT NULL,
    "odometer" INTEGER NOT NULL,
    "fuel_type" TEXT NOT NULL,
    "liters" DOUBLE PRECISION NOT NULL,
    "total_price" INTEGER NOT NULL,
    "price_per_liter" INTEGER NOT NULL,
    "full_tank" BOOLEAN NOT NULL,
    "station" TEXT NOT NULL DEFAULT 'Pertamina',
    "filled_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "work_session_id" INTEGER NOT NULL,
    "motorcycle_id" INTEGER NOT NULL,

    CONSTRAINT "FuelRecord_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MotorComponent" ADD CONSTRAINT "MotorComponent_component_id_fkey" FOREIGN KEY ("component_id") REFERENCES "MaintenanceComponent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FuelRecord" ADD CONSTRAINT "FuelRecord_work_session_id_fkey" FOREIGN KEY ("work_session_id") REFERENCES "WorkSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FuelRecord" ADD CONSTRAINT "FuelRecord_motorcycle_id_fkey" FOREIGN KEY ("motorcycle_id") REFERENCES "Motorcycle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
