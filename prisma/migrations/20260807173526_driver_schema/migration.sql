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

    CONSTRAINT "Driver_pkey" PRIMARY KEY ("id")
);
