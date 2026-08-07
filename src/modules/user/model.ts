import { t, type UnwrapSchema } from "elysia";

export const UserModel = {
  token: t.Object({
    email: t.String({ format: "email" }),
    token: t.String(),
  }),
} as const;

export type UserModel = {
  [k in keyof typeof UserModel]: UnwrapSchema<(typeof UserModel)[k]>;
};
