import { t, UnwrapSchema } from "elysia";

export const MotorModel = {
  create: t.Object({
    brand: t.String(),
    model: t.String(),
    year: t.String(),
    transmission: t.UnionEnum(["MATIC", "MANUAL"]),
    police_number: t.String(),
    kilometers: t.Number(),
    last_service_date: t.Optional(t.Date()),
    status: t.Optional(t.String()),
  }),
};

export type MotorModel = {
  [k in keyof typeof MotorModel]: UnwrapSchema<(typeof MotorModel)[k]>;
};
