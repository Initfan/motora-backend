// Service handles business logic, decoupled from Elysia controller
import { Cookie, status } from "elysia";
import bcrypt from "bcrypt";

import type { AuthModel } from "./model";
import { prisma } from "@/utils/prisma";
import { UserGetPayload } from "@/generated/prisma/models";

export class Auth {
  static async signIn({ email, password }: AuthModel["signInBody"]) {
    const user = await prisma.user.findFirst({ where: { email } });

    if (!user) return status(404, "User not found");

    if (!(await bcrypt.compare(password, user?.password)))
      throw status(400, "Invalid email or password");

    return user;
  }

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
