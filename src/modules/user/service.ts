import { prisma } from "@/utils/prisma";
import { UserModel } from "./model";
import { status } from "elysia";

export class User {
  static async findUser(email: string) {
    const user = await prisma.user.findFirst({
      where: { email },
    });
    return user;
  }

  static async DriverProfile(user_id: UserModel["user_id"]) {
    try {
      const driver = await prisma.driver.findFirstOrThrow({
        where: { user_id },
      });

      return status(200, { message: "Driver profile", data: driver });
    } catch (error) {
      throw status(404, "Driver not found");
    }
  }

  static async CreateDriverProfile(
    data: UserModel["driver_profile"],
    user_id: UserModel["user_id"],
  ) {
    try {
      await prisma.driver.findFirstOrThrow({
        where: { user_id: 100 },
      });

      const create = await prisma.driver.create({
        data: { ...data, user_id: user_id },
      });

      return status("Created", {
        message: "Driver profile created",
        data: create,
      });
    } catch (error) {
      return status(500, "Create Driver Profile Failed, Try Again Later");
    }
  }
}
