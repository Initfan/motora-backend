import { authPlugin } from "@/plugins/auth";
import Elysia from "elysia";
import { Maintenance } from "./service";
import { MaintenanceModel } from "./model";

const maintenance = new Elysia({
  prefix: "/maintenance",
  name: "maintenance",
})
  .use(authPlugin)
  .post("/", ({ body }) => Maintenance.addComponent(body), {
    body: MaintenanceModel.component,
  });

export default maintenance;
