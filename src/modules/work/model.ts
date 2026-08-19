import { Prisma } from "@/generated/prisma/client";
import { t, type UnwrapSchema } from "elysia";

export const WorkModel = {
  user_id: t.Number(),
  start: t.Object({
    kilometers_start: t.Number(),
    platform: t.String(),
    goal_profit: t.Number(),
    fuel_condition: t.String(),
  }),
  income: t.Object({
    work_session_id: t.Number(),
    income_type: t.UnionEnum(["ORDER", "BONUS", "TIP", "INCENTIVE"]),
    amount: t.Number(),
    description: t.Optional(t.String()),
  }),
  expense: t.Object({
    work_session_id: t.Number(),
    expense_type: t.UnionEnum(["FUEL", "PARKING", "TOLL", "OTHER"]),
    amount: t.Number(),
    description: t.Optional(t.String()),
  }),
  finish: t.Object({
    work_session_id: t.Number(),
    kilometers_finish: t.Number(),
    total_order: t.Integer(),
    income: t.Object({
      income: t.Number(),
      bonus: t.Number(),
      tip: t.Number(),
      spending: t.Number(),
      incentive: t.Number(),
    }),
  }),
} as const;

export type WorkModel = {
  [k in keyof typeof WorkModel]: UnwrapSchema<(typeof WorkModel)[k]>;
};
