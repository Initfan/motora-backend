/*
  Warnings:

  - You are about to drop the column `bonus` on the `Income` table. All the data in the column will be lost.
  - You are about to drop the column `incentive` on the `Income` table. All the data in the column will be lost.
  - You are about to drop the column `income` on the `Income` table. All the data in the column will be lost.
  - You are about to drop the column `net_income` on the `Income` table. All the data in the column will be lost.
  - You are about to drop the column `spending` on the `Income` table. All the data in the column will be lost.
  - You are about to drop the column `tip` on the `Income` table. All the data in the column will be lost.
  - Added the required column `amount` to the `Income` table without a default value. This is not possible if the table is not empty.
  - Added the required column `income_type` to the `Income` table without a default value. This is not possible if the table is not empty.
  - Added the required column `started_at` to the `WorkSession` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "INCOME_TYPE" AS ENUM ('ORDER', 'BONUS', 'TIP', 'INCENTIVE');

-- CreateEnum
CREATE TYPE "EXPENSE_TYPE" AS ENUM ('FUEL', 'PARKING', 'TOLL', 'OTHER');

-- DropIndex
DROP INDEX "Motorcycle_user_id_key";

-- AlterTable
ALTER TABLE "Income" DROP COLUMN "bonus",
DROP COLUMN "incentive",
DROP COLUMN "income",
DROP COLUMN "net_income",
DROP COLUMN "spending",
DROP COLUMN "tip",
ADD COLUMN     "amount" INTEGER NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "income_type" "INCOME_TYPE" NOT NULL;

-- AlterTable
ALTER TABLE "WorkSession" ADD COLUMN     "finished_at" TIMESTAMP(3),
ADD COLUMN     "started_at" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "Expense" (
    "id" SERIAL NOT NULL,
    "income_type" "EXPENSE_TYPE" NOT NULL,
    "amount" INTEGER NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "work_session_id" INTEGER NOT NULL,

    CONSTRAINT "Expense_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_work_session_id_fkey" FOREIGN KEY ("work_session_id") REFERENCES "WorkSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
