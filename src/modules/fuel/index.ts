import { authPlugin } from "@/plugins/auth";
import Elysia from "elysia";
import { FuelRecord } from "./service";
import { FuelRecordModel } from "./model";

const fuel = new Elysia({
  prefix: "/fuel",
  name: "fuel",
})
  .use(authPlugin)
  .post("/", ({ body }) => FuelRecord.addFuel(body), {
    body: FuelRecordModel.add,
  });

export default fuel;
