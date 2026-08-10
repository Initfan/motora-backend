import { prisma } from "@/utils/prisma";
import { MotorModel } from "./model";
import { UserModel } from "../user/model";
import { status } from "elysia";
import { Prisma } from "@/generated/prisma/client";
import { handlePrismaError } from "@/helper/error";

export class MotorcycleService {
  static async CreateMotorcycle(
    data: MotorModel["create"],
    user_id: UserModel["user_id"],
  ) {
    try {
      const motor = await prisma.$transaction(async (tx) => {
        tx.motorcycle.findFirstOrThrow({
          where: { police_number: data.police_number },
        });
        return await tx.motorcycle.create({
          data: { ...data, user_id },
        });
      });

      return status(201, { message: "Motorcycle Was Created", data: motor });
    } catch (e: any) {
      return handlePrismaError(
        e,
        "Failed to Create Motorcycle, Try again later",
      );
    }
  }
}
