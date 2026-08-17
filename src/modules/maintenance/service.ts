import { handlePrismaError } from "@/helper/error";
import { MaintenanceModel } from "./model";
import { prisma } from "@/utils/prisma";
import { status } from "elysia";
import { addMonths } from "date-fns";

type STATUS = "SAFE" | "DUE_SOON" | "OVERDUE" | "UNKNOWN";

export class Maintenance {
  private static statusComponent(
    currentKm: number,
    lastKm: number,
    interval: number,
  ): STATUS {
    const nextKm = lastKm + interval;
    const percent = (currentKm / nextKm) * 100;
    if (percent >= 100) return "OVERDUE";
    else if (percent >= 50) return "DUE_SOON";
    else if (percent >= 0) return "SAFE";
    return "UNKNOWN";
  }

  static async addComponent(data: MaintenanceModel["component"]) {
    const { motor_id, ...component } = data;
    try {
      const comp = await prisma.$transaction(async (tx) => {
        const motor = await tx.motorcycle.findFirstOrThrow({
          where: { id: motor_id },
        });

        const nextKm = data.last_service_km + data.interval_km;
        const nextDate = addMonths(data.last_service_date, data.interval_month);
        const status: STATUS = this.statusComponent(
          motor.kilometers,
          data.last_service_km,
          data.interval_km,
        );

        return await tx.motorComponent.create({
          data: {
            ...component,
            model: motor.model,
            motorcycle_id: motor.id,
            next_schedule_date: nextDate,
            next_schedule_km: nextKm,
            status,
          },
        });
      });

      return status(201, {
        message: "Added Component Motorcycle",
        data: comp,
      });
    } catch (e: any) {
      return handlePrismaError(
        e,
        "Failed to Add Motor Component, Try again later",
      );
    }
  }
}
