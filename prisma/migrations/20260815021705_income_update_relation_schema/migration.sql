/*
  Warnings:

  - A unique constraint covering the columns `[work_session_id]` on the table `Income` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Income_work_session_id_key" ON "Income"("work_session_id");
