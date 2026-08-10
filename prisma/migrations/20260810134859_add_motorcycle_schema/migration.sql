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
    "last_service_date" TIMESTAMP(3),
    "status" TEXT,
    "driver_id" INTEGER NOT NULL,

    CONSTRAINT "Motorcycle_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Motorcycle_driver_id_key" ON "Motorcycle"("driver_id");

-- AddForeignKey
ALTER TABLE "Motorcycle" ADD CONSTRAINT "Motorcycle_driver_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "Driver"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
