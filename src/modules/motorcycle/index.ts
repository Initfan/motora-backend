import { Elysia } from "elysia";
import { authPlugin } from "@/plugins/auth";
import { MotorcycleService } from "./service";
import { MotorModel } from "./model";

const motorcycle = new Elysia({
  prefix: "/motorcycle",
  name: "motorcycle",
})
  .use(authPlugin)
  .post(
    "/",
    ({ body, user_id }) => MotorcycleService.CreateMotorcycle(body, user_id),
    { body: MotorModel["create"] },
  );

export default motorcycle;
