import { status } from "elysia";
import bcrypt from "bcrypt";

import type { AuthModel } from "./model";
import { prisma } from "@/utils/prisma";
import { User } from "../user/service";
import { SignJWT } from "jose";

export class Auth {
  static async signIn({ email, password }: AuthModel["signInBody"]) {
    const user = await User.findUser(email);

    if (!user) throw status(404, "User not found");

    if (!(await bcrypt.compare(password, user.password)))
      throw status(400, "Invalid email or password");

    const token = await new SignJWT({ sub: String(user.id) })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("7d")
      .sign(new TextEncoder().encode(process.env.JWT_SECRET));

    return { user, token };
  }

  static async signUp(data: AuthModel["signUpBody"]) {
    let { email, password } = data;
    password = bcrypt.hashSync(password, 10);

    const registered = await User.findUser(email);

    if (registered) throw status(400, "Email already registered");

    try {
      let user = await prisma.user.create({
        data: { ...data, password, serviceFunds: { create: {} } },
        select: { username: true, email: true },
      });

      if (!user) throw status("Not Acceptable", "Failed create user");

      return status(201, {
        message: "user sign-up success",
        data: user,
      });
    } catch (error) {
      console.log(error);
      throw status(500, "Internal Server Error");
    }
  }
}
