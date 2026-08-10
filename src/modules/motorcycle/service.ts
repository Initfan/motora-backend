import { prisma } from "@/utils/prisma";
import { MotorModel } from "./model";
import { UserModel } from "../user/model";
import { status } from "elysia";

export class MotorcycleService {
  static async CreateMotorcycle(
    data: MotorModel["create"],
    user_id: UserModel["user_id"],
  ) {
    const motor = await prisma.motorcycle.create({
      data: { ...data, user_id },
    });
    return status(201, { message: "Motorcycle create success", data: motor });
  }
}
