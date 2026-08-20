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
    try {
      const comp = await prisma.$transaction(async (tx) => {
        const motor = await tx.motorcycle.findFirstOrThrow({
          where: { id: data.motorcycle_id },
        });

        const maintenance = await tx.maintenanceComponent.findFirstOrThrow({
          where: { id: data.component_id },
        });

        const nextKm = data.last_service_km + maintenance.default_interval_km;
        const nextDate = addMonths(
          data.last_service_date,
          maintenance.default_interval_month,
        );

        const status = this.statusComponent(
          motor.kilometers,
          data.last_service_km,
          maintenance.default_interval_km,
        );

        return await tx.motorComponent.create({
          data: {
            ...data,
            status,
            next_schedule_date: nextDate,
            next_schedule_km: nextKm,
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
