import { cookieModel } from "@/utils/model";
import verifyToken from "@/utils/verify-token";
import Elysia, { status } from "elysia";

const user = new Elysia({ prefix: "user", name: "user" }).guard(
  {
    cookie: cookieModel,
    beforeHandle: ({ cookie }) => {
      try {
        verifyToken(cookie.access_token.value);
      } catch (error) {
        throw status("Bad Request", "Invalid Token");
      }
    },
  },
  (app) =>
    app
      .resolve(async ({ cookie }) => {
        const user = await verifyToken(cookie.access_token.value);
        return {
          user,
        };
      })
      .get("/profile", ({ user }) => user),
);

export default user;
