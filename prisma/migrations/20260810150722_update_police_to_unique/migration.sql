/*
  Warnings:

  - A unique constraint covering the columns `[police_number]` on the table `Motorcycle` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Motorcycle_police_number_key" ON "Motorcycle"("police_number");
