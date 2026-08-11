-- CreateEnum
CREATE TYPE "TRANSMISSION_TYPE" AS ENUM ('MATIC', 'MANUAL');

-- CreateTable
CREATE TABLE "Motorcycle" (
    "id" SERIAL NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "transmission" "TRANSMISSION_TYPE" NOT NULL DEFAULT 'MATIC',
    "police_number" TEXT NOT NULL,
    "kilometers" INTEGER NOT NULL,
    "avg_kilometers_per_day" INTEGER DEFAULT 0,
    "last_service_date" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Motorcycle_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Motorcycle_police_number_key" ON "Motorcycle"("police_number");

-- CreateIndex
CREATE UNIQUE INDEX "Motorcycle_user_id_key" ON "Motorcycle"("user_id");

-- AddForeignKey
ALTER TABLE "Motorcycle" ADD CONSTRAINT "Motorcycle_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
