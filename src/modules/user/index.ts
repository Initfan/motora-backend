import { Elysia } from "elysia";
import { authPlugin } from "@/plugins/auth";
import { User } from "./service";
import { UserModel } from "./model";
import motorcycle from "../motorcycle";

const user = new Elysia({
  prefix: "/user",
  name: "user",
})
  .use(authPlugin)
  .group("/profile", (app) =>
    app
      .get("/", ({ user_id }) => User.DriverProfile(user_id))
      .post(
        "/",
        ({ user_id, body }) => User.CreateDriverProfile(body, user_id),
        {
          body: UserModel.driver_profile,
        },
      ),
  );

export default user;
