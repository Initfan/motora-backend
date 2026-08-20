-- CreateEnum
CREATE TYPE "ServiceFundMethod" AS ENUM ('FIXED_DAILY', 'PERCENTAGE', 'PER_KM', 'MONTHLY_TARGET');

-- CreateTable
CREATE TABLE "ServiceFund" (
    "id" SERIAL NOT NULL,
    "method" "ServiceFundMethod" NOT NULL,
    "value" INTEGER NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "ServiceFund_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ServiceFund_user_id_key" ON "ServiceFund"("user_id");

-- AddForeignKey
ALTER TABLE "ServiceFund" ADD CONSTRAINT "ServiceFund_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
