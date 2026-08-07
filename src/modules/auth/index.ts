import { Elysia } from "elysia";
import { Auth } from "./service";
import { AuthModel } from "./model";

const auth = new Elysia({ name: "auth" })
  .post("register", ({ body }) => Auth.signUp(body), {
    body: AuthModel.signUpBody,
  })
  .post(
    "login",
    async ({ body, cookie }) => {
      const user = await Auth.signIn(body);

      cookie.access_token.set({
        value: user,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });

      return user;
    },
    {
      body: AuthModel.signInBody,
    },
  );

export default auth;
