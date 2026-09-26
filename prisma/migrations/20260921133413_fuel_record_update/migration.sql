-- AlterTable
ALTER TABLE "FuelRecord" ALTER COLUMN "fuel_type" DROP NOT NULL,
ALTER COLUMN "full_tank" DROP NOT NULL,
ALTER COLUMN "full_tank" SET DEFAULT false;
