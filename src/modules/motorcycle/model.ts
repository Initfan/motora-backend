import { t, UnwrapSchema } from "elysia";

export const MotorModel = {
  create: t.Object({
    brand: t.String(),
    model: t.String(),
    year: t.String(),
    transmission: t.UnionEnum(["MATIC", "MANUAL"]),
    police_number: t.String(),
    kilometers: t.Number(),
    avg_kilometers_per_day: t.Optional(t.Number()),
    last_service_date: t.Optional(t.Date()),
    status: t.Optional(t.String()),
  }),
  update: t.Object({
    id: t.Number(),
    brand: t.Optional(t.String()),
    model: t.Optional(t.String()),
    year: t.Optional(t.String()),
    transmission: t.Optional(t.UnionEnum(["MATIC", "MANUAL"])),
    police_number: t.Optional(t.String()),
    kilometers: t.Optional(t.Number()),
    avg_kilometers_per_day: t.Optional(t.Number()),
    last_service_date: t.Optional(t.Date()),
    status: t.Optional(t.String()),
  }),
};

export type MotorModel = {
  [k in keyof typeof MotorModel]: UnwrapSchema<(typeof MotorModel)[k]>;
};
