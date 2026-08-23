/*
  Warnings:

  - Added the required column `motorcycle_id` to the `WorkSession` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WorkSession" ADD COLUMN     "motorcycle_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "WorkSession" ADD CONSTRAINT "WorkSession_motorcycle_id_fkey" FOREIGN KEY ("motorcycle_id") REFERENCES "Motorcycle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
