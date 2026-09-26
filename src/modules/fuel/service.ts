import { handlePrismaError } from "@/helper/error";
import { FuelRecordModel } from "./model";
import { prisma } from "@/utils/prisma";
import { status } from "elysia";

export class FuelRecord {
  static async addFuel(data: FuelRecordModel["add"]) {
    try {
      const fuel = await prisma.$transaction(async (tx) => {
        await tx.workSession.findFirstOrThrow({
          where: {
            id: data.work_session_id,
            AND: { motorcycle_id: data.motorcycle_id },
          },
        });

        await tx.workSession.update({
          where: { id: data.work_session_id },
          data: {
            total_fuel: { increment: data.total_price },
            total_income: { decrement: data.total_price },
          },
        });

        const priceLiter = data.total_price / data.liters;

        return await tx.fuelRecord.create({
          data: { ...data, price_per_liter: priceLiter },
        });
      });

      return status(201, { message: "Added Fuel Record", data: fuel });
    } catch (error: any) {
      console.log(error);

      return handlePrismaError(error, "Failed to Record Fuel, Try again later");
    }
  }
}
