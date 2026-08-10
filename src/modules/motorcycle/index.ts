import { Elysia } from "elysia";
import { authPlugin } from "@/plugins/auth";

const motorcycle = new Elysia({
  prefix: "/motorcycle",
  name: "motorcycle",
})
  .use(authPlugin)
  .get("/", ({ user_id }) => {
    return {
      message: "Motorcycle list",
      user_id,
    };
  });

export default motorcycle;
