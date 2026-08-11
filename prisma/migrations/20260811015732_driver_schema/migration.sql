-- CreateEnum
CREATE TYPE "JOB_TYPE" AS ENUM ('FULL_TIME', 'FREELANCE', 'PART_TIME');

-- CreateTable
CREATE TABLE "Driver" (
    "id" SERIAL NOT NULL,
    "driver_name" TEXT NOT NULL,
    "photo" TEXT,
    "platform" TEXT[],
    "profit_goal" INTEGER NOT NULL,
    "job_type" "JOB_TYPE" NOT NULL DEFAULT 'FULL_TIME',
    "avg_active_hours" INTEGER NOT NULL DEFAULT 0,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Driver_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Driver_user_id_key" ON "Driver"("user_id");

-- AddForeignKey
ALTER TABLE "Driver" ADD CONSTRAINT "Driver_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
