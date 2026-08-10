import { Prisma } from "@/generated/prisma/client";
import { t, type UnwrapSchema } from "elysia";

export const UserModel = {
  user_id: t.Number(),
  token: t.Object({
    email: t.String({ format: "email" }),
    token: t.String(),
  }),
  driver_profile: t.Object({
    driver_name: t.String(),
    photo: t.Optional(t.String()),
    platform: t.Array(t.String()),
    profit_goal: t.Number(),
    job_type: t.UnionEnum(["FULL_TIME", "FREELANCE", "PART_TIME"]),
  }),
} as const;

export type DriverModel = Prisma.DriverGetPayload<{}>;

export type UserSchema = Prisma.UserGetPayload<{}>;

export type UserModel = {
  [k in keyof typeof UserModel]: UnwrapSchema<(typeof UserModel)[k]>;
};
