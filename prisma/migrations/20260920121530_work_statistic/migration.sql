-- AlterTable
ALTER TABLE "WorkSession" ADD COLUMN     "total_distance" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "total_expense" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "total_fuel" INTEGER NOT NULL DEFAULT 0;
