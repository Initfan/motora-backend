import { Elysia, t } from "elysia";
import { authPlugin } from "@/plugins/auth";
import { MotorcycleService } from "./service";
import { MotorModel } from "./model";

const motorcycle = new Elysia({
  prefix: "/motorcycle",
  name: "motorcycle",
})
  .use(authPlugin)
  .get("/:id", ({ params }) =>
    MotorcycleService.GetMotorcycle(Number(params.id)),
  )

  .put("", ({ body }) => MotorcycleService.UpdateMotorcycle(body), {
    body: MotorModel["update"],
  })
  .post(
    "",
    ({ body, user_id }) => MotorcycleService.CreateMotorcycle(body, user_id),
    { body: MotorModel["create"] },
  )
  .delete(
    "/:id",
    ({ params }) => MotorcycleService.DeleteMotorcycle(Number(params.id)),
    {
      body: MotorModel["create"],
    },
  );

export default motorcycle;
