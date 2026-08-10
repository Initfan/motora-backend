/*
  Warnings:

  - You are about to drop the column `driver_id` on the `Motorcycle` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `Motorcycle` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `Motorcycle` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Motorcycle" DROP CONSTRAINT "Motorcycle_driver_id_fkey";

-- DropIndex
DROP INDEX "Motorcycle_driver_id_key";

-- AlterTable
ALTER TABLE "Motorcycle" DROP COLUMN "driver_id",
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Motorcycle_user_id_key" ON "Motorcycle"("user_id");

-- AddForeignKey
ALTER TABLE "Motorcycle" ADD CONSTRAINT "Motorcycle_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
