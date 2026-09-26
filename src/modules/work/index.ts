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
  .get(
    "/activity",
    ({ user_id, query }) =>
      WorkSession.getWorkActivities(user_id, query.from_date, query.to_date),
    {
      query: WorkModel["getQuery"],
    },
  )
  .get("/:work_session_id/incomes", ({ params }) =>
    WorkSession.getIncomes(Number(params.work_session_id)),
  )
  .post("/income", ({ body }) => WorkSession.addIncome(body), {
    body: WorkModel["income"],
  })
  .post("/expense", ({ body }) => WorkSession.addExpense(body), {
    body: WorkModel["expense"],
  })
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
