/*
  Warnings:

  - You are about to drop the column `bonus` on the `WorkSession` table. All the data in the column will be lost.
  - You are about to drop the column `income` on the `WorkSession` table. All the data in the column will be lost.
  - You are about to drop the column `spending` on the `WorkSession` table. All the data in the column will be lost.
  - You are about to drop the column `tip` on the `WorkSession` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "WorkSession" DROP COLUMN "bonus",
DROP COLUMN "income",
DROP COLUMN "spending",
DROP COLUMN "tip";

-- CreateTable
CREATE TABLE "Income" (
    "id" SERIAL NOT NULL,
    "income" INTEGER NOT NULL DEFAULT 0,
    "bonus" INTEGER NOT NULL DEFAULT 0,
    "tip" INTEGER NOT NULL DEFAULT 0,
    "spending" INTEGER NOT NULL DEFAULT 0,
    "incentive" INTEGER NOT NULL DEFAULT 0,
    "work_session_id" INTEGER NOT NULL,

    CONSTRAINT "Income_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Income" ADD CONSTRAINT "Income_work_session_id_fkey" FOREIGN KEY ("work_session_id") REFERENCES "WorkSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
