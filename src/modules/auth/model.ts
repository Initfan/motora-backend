// Model define the data structure and validation for the request and response
import { t, type UnwrapSchema } from "elysia";

export const AuthModel = {
  signUpBody: t.Object({
    username: t.String({ minLength: 4 }),
    email: t.String({ format: "email" }),
    password: t.String({ minLength: 8 }),
  }),
  signInBody: t.Object({
    email: t.String({ format: "email" }),
    password: t.String({ minLength: 8 }),
  }),
  signInResponse: t.Object({
    username: t.String(),
    token: t.String(),
  }),
  signInInvalid: t.Literal("Invalid username or password"),
} as const;

// Optional, cast all model to TypeScript type
export type AuthModel = {
  [k in keyof typeof AuthModel]: UnwrapSchema<(typeof AuthModel)[k]>;
};
