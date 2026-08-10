import { cookieModel } from "@/utils/model";
import verifyToken from "@/utils/verify-token";
import Elysia, { status } from "elysia";
import { User } from "./service";
import { UserModel } from "./model";

const user = new Elysia({ prefix: "user", name: "user" }).guard(
  {
    cookie: cookieModel,
  },
  (app) =>
    app
      .resolve(async ({ cookie }) => {
        const token = cookie.access_token.value;

        if (!token) {
          throw status(401, "Unauthorized");
        }

        const user = await verifyToken(token);

        if (!user) {
          throw status(401, "Invalid or expired token");
        }

        return {
          user,
        };
      })
      .group("/profile", (app) =>
        app
          .get("/", ({ user }) => User.DriverProfile(Number(user.sub)))
          .post(
            "/",
            ({ user, body }) => {
              User.CreateDriverProfile(body, Number(user.sub));
            },
            {
              body: UserModel["driver_profile"],
            },
          ),
      ),
);

export default user;
