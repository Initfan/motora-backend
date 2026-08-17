import { Elysia } from "elysia";
import { authPlugin } from "@/plugins/auth";
import { WorkSession } from "./service";
import { WorkModel } from "./model";

const work = new Elysia({
  prefix: "/work",
  name: "start-work",
})
  .use(authPlugin)
  .get("/", ({ user_id }) => WorkSession.getWorkSession(user_id))
  .post(
    "/start",
    ({ body, user_id }) => WorkSession.startWorkSession(body, user_id),
    {
      body: WorkModel["start"],
    },
  )
  .post("/finish", ({ body }) => WorkSession.finishWorkSession(body), {
    body: WorkModel["finish"],
  });

export default work;
