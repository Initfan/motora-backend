import { handlePrismaError } from "@/helper/error";
import { MaintenanceModel } from "./model";
import { prisma } from "@/utils/prisma";
import { status } from "elysia";

export class Maintenance {
  static async addComponent(data: MaintenanceModel["component"]) {
    const { motor_id, ...component } = data;
    try {
      const comp = await prisma.$transaction(async (tx) => {
        const motor = await tx.motorcycle.findFirstOrThrow({
          where: { id: motor_id },
        });

        return await tx.motorComponent.create({
          data: { ...component, model: motor.model, motorcycle_id: motor.id },
        });
      });

      return status(201, {
        message: "Added Component Motorcycle",
        data: comp,
      });
    } catch (e: any) {
      console.log(e);

      return handlePrismaError(
        e,
        "Failed to Add Motor Component, Try again later",
      );
    }
  }
}
