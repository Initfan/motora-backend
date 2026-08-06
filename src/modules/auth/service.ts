// Service handles business logic, decoupled from Elysia controller
import { status } from "elysia";
import bcrypt from "bcrypt";

import type { AuthModel } from "./model";
import { prisma } from "@/utils/prisma";

export class Auth {
  static async signUp(data: AuthModel["signUpBody"]) {
    const { email, password } = data;

    try {
      const registered = await prisma.user.findFirst({ where: { email } });

      if (registered) return status(400, "Email already registered");

      const user = await prisma.user.create({
        data: { ...data, password: bcrypt.hashSync(password, 10) },
      });

      return {
        message: "user sign-up success",
        data: user,
      };
    } catch (error) {
      throw status(500, "Internal Server Error");
    }
  }
}
