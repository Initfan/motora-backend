import { prisma } from "@/utils/prisma";
import { MotorModel } from "./model";
import { UserModel } from "../user/model";
import { status } from "elysia";
import { handlePrismaError } from "@/helper/error";

export class MotorcycleService {
  static async GetMotorcycle(id: MotorModel["update"]["id"]) {
    try {
      const motor = await prisma.$transaction(async (tx) => {
        const motor = await tx.motorcycle.findFirstOrThrow({
          where: { id },
        });

        const lastWork = await tx.workSession.findFirst({
          where: { user_id: motor.user_id },
          orderBy: { created_at: "desc" },
        });

        return {
          ...motor,
          kilometers: lastWork?.kilometers_finish ?? motor.kilometers,
        };
      });

      return status(200, { message: "Motorcycle Data", data: motor });
    } catch (e: any) {
      return handlePrismaError(e, "Failed to Get Motorcycle, Try again later");
    }
  }

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

  static async UpdateMotorcycle(data: MotorModel["update"]) {
    try {
      const motor = await prisma.motorcycle.update({
        where: { id: data.id },
        data,
      });

      return status(200, { message: "Motorcycle Was Created", data: motor });
    } catch (e: any) {
      return handlePrismaError(
        e,
        "Failed to Update Motorcycle, Try again later",
      );
    }
  }

  static async DeleteMotorcycle(id: MotorModel["update"]["id"]) {
    try {
      const motor = await prisma.motorcycle.delete({
        where: { id },
      });

      return status(200, { message: "Motorcycle Was Deleted", data: motor });
    } catch (e: any) {
      return handlePrismaError(
        e,
        "Failed to Delete Motorcycle, Try again later",
      );
    }
  }
}
