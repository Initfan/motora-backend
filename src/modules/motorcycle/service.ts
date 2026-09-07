import { prisma } from "@/utils/prisma";
import { MotorModel } from "./model";
import { UserModel } from "../user/model";
import { status } from "elysia";
import { HandleError, handlePrismaError } from "@/helper/error";
import sharp from "sharp";
import { join } from "node:path";
import { log } from "node:console";

export class MotorcycleService {
  static async GetUserMotors(user_id: number) {
    try {
      const motor = await prisma.$transaction(async (tx) => {
        const motor = await tx.motorcycle.findMany({
          where: { user_id },
        });

        return {
          ...motor,
        };
      });

      return status(200, { message: "Motorcycle Data", data: motor });
    } catch (e: any) {
      return handlePrismaError(e, "Failed to Get Motorcycle, Try again later");
    }
  }

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
      let motor_url: string;
      if (data.motor instanceof File) {
        const inputBuffer = Buffer.from(await data.motor.arrayBuffer());

        const outputBuffer = await sharp(inputBuffer)
          .webp({
            quality: 80,
          })
          .toBuffer();

        const filename = `${crypto.randomUUID()}.webp`;
        const filepath = join(
          join(process.cwd(), "public", "motors"),
          filename,
        );

        await Bun.write(filepath, outputBuffer);
        motor_url = `motora/${filename}`;
      }

      let { kilometers, last_service_date, motor, ...cleanData } = data;
      const kilometer = Number(kilometers);
      const service = new Date(last_service_date);

      if (Number.isNaN(kilometer) || Number.isNaN(service.getTime()))
        throw new HandleError(401, "Data tidak sesuai");

      const addMotor = await prisma.$transaction(async (tx) => {
        tx.motorcycle.findFirstOrThrow({
          where: { police_number: data.police_number },
        });
        return await tx.motorcycle.create({
          data: {
            ...cleanData,
            user_id,
            motor_url,
            kilometers: kilometer,
            last_service_date: service,
          },
        });
      });

      return status(201, { message: "Motorcycle Was Created", data: addMotor });
    } catch (e: any) {
      console.log(e);

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
