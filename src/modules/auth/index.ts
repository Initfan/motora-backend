import { Elysia, status } from "elysia";
import { Auth } from "./service";
import { AuthModel } from "./model";

const auth = new Elysia({ name: "auth" })
  .guard(
    {
      beforeHandle({ cookie }) {
        if (!cookie.access_token.value) throw status(401, "Unauthorized");
      },
    },
    (app) =>
      app.post("logout", ({ cookie }) => {
        cookie.access_token.remove();
        return status("Accepted", "Logout succeed");
      }),
  )
  .guard(
    {
      beforeHandle({ cookie }) {
        if (cookie.access_token.value) throw status(200, "Authorized");
      },
    },
    (app) =>
      app
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
        ),
  );

export default auth;
