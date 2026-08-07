import { prisma } from "@/utils/prisma";
import { ElysiaCustomStatusResponse, status } from "elysia";
import { UserModel } from "./model";

export class User {
  static async findUser(email: string) {
    const user = await prisma.user.findFirst({
      where: { email },
    });
    return user;
  }
}
