import { prisma } from "@/utils/prisma";
import { WorkModel } from "./model";
import { status } from "elysia";
import { handlePrismaError } from "@/helper/error";

export class WorkSession {
  static async getWorkSession(user_id: WorkModel["user_id"]) {
    try {
      const session = await prisma.workSession.findFirst({
        where: { status: "ACTIVE", AND: { user_id } },
        orderBy: { created_at: "desc" },
      });

      return status(200, {
        message: "Work session in progress",
        data: session,
      });
    } catch (error) {
      return handlePrismaError(
        error,
        "Failed to Get Work Session, Try again later",
      );
    }
  }

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

        const activeSession = await tx.workSession.findFirst({
          where: { status: "ACTIVE" },
          orderBy: { created_at: "desc" },
        });

        if (activeSession)
          throw new Error("There is already a session in progress.");

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
    const { session_id, total_order, kilometers_finish, ...session } = data;

    try {
      const work = await prisma.$transaction(async (tx) => {
        const workSession = await tx.workSession.findFirst({
          where: { id: session_id, status: "ACTIVE" },
        });

        if (!workSession) throw new Error("There's no active working progress");

        return await tx.workSession.update({
          where: { id: session_id },
          data: {
            total_order,
            kilometers_finish,
            status: "COMPLETED",
            incomes: { create: { ...session.income } },
          },
          include: { incomes: true },
        });
      });

      return status(201, { message: "Work Session Finished", session: work });
    } catch (error: any) {
      console.log(error);

      return handlePrismaError(
        error,
        error.message ?? "Failed to Finish Work Session, Try again later",
      );
    }
  }
}
