-- CreateEnum
CREATE TYPE "SUMMARY_STATUS" AS ENUM ('ACHIEVED', 'NOT_ACHIEVED');

-- CreateTable
CREATE TABLE "WorkSummary" (
    "id" SERIAL NOT NULL,
    "income" INTEGER NOT NULL,
    "expense" INTEGER NOT NULL,
    "service_fund" INTEGER NOT NULL,
    "net_profit" INTEGER NOT NULL,
    "distance" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,
    "profit_per_km" INTEGER NOT NULL,
    "goal_profit" INTEGER NOT NULL,
    "achieved" INTEGER NOT NULL,
    "status" "SUMMARY_STATUS" NOT NULL,
    "work_session_id" INTEGER NOT NULL,

    CONSTRAINT "WorkSummary_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WorkSummary_work_session_id_key" ON "WorkSummary"("work_session_id");

-- AddForeignKey
ALTER TABLE "WorkSummary" ADD CONSTRAINT "WorkSummary_work_session_id_fkey" FOREIGN KEY ("work_session_id") REFERENCES "WorkSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
