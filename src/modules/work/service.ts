import { prisma } from "@/utils/prisma";
import { WorkModel } from "./model";
import { status } from "elysia";
import { handlePrismaError } from "@/helper/error";

export class WorkSession {
  static async startWorkSession(
    data: WorkModel["start"],
    user_id: WorkModel["user_id"],
  ) {
    try {
      const session = await prisma.$transaction(async (tx) => {
        const motor = await tx.motorcycle.findFirst({
          where: { user_id },
        });

        if (!motor) throw new Error("Add Motorcycle to Start Working");

        return await tx.workSession.create({
          data: { ...data, user_id },
        });
      });

      return status(201, { message: "Work Session Started", session });
    } catch (error: any) {
      return handlePrismaError(
        error,
        error.message ?? "Failed to Start Work Session, Try again later",
      );
    }
  }

  static async finishWorkSession(data: WorkModel["finish"]) {
    const { session_id, ...session } = data;

    try {
      const work = await prisma.workSession.update({
        where: { id: data.session_id },
        data: session,
      });
      return status(201, { message: "Work Session Finished", session });
    } catch (error) {
      return handlePrismaError(
        error,
        "Failed to Finish Work Session, Try again later",
      );
    }
  }
}
