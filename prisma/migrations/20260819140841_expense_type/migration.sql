/*
  Warnings:

  - You are about to drop the column `income_type` on the `Expense` table. All the data in the column will be lost.
  - Added the required column `expense_type` to the `Expense` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Expense" DROP COLUMN "income_type",
ADD COLUMN     "expense_type" "EXPENSE_TYPE" NOT NULL;
