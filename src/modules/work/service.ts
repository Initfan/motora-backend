import { prisma } from "@/utils/prisma";
import { WorkModel } from "./model";
import { status } from "elysia";
import { handlePrismaError } from "@/helper/error";

export class WorkSession {
  static async startWorkSession(
    data: WorkModel["start"],
    user_id: WorkModel["user_id"],
  ) {
    const session = await prisma.workSession.create({
      data: { ...data, user_id },
    });
    return status(201, { message: "Work Session Started", session });
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
