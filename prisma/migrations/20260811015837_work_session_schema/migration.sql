-- CreateEnum
CREATE TYPE "WorkStatus" AS ENUM ('ACTIVE', 'COMPLETED');

-- CreateTable
CREATE TABLE "WorkSession" (
    "id" SERIAL NOT NULL,
    "kilometers_start" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "kilometers_finish" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "platform" TEXT NOT NULL,
    "goal_profit" INTEGER NOT NULL,
    "fuel_condition" TEXT NOT NULL,
    "total_order" INTEGER NOT NULL DEFAULT 0,
    "income" INTEGER NOT NULL DEFAULT 0,
    "bonus" INTEGER NOT NULL DEFAULT 0,
    "tip" INTEGER NOT NULL DEFAULT 0,
    "spending" INTEGER NOT NULL DEFAULT 0,
    "status" "WorkStatus" NOT NULL DEFAULT 'ACTIVE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "WorkSession_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WorkSession" ADD CONSTRAINT "WorkSession_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
