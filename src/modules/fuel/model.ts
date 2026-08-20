import { t, type UnwrapSchema } from "elysia";

export const FuelRecordModel = {
  add: t.Object({
    work_session_id: t.Integer(),
    motorcycle_id: t.Integer(),
    odometer: t.Integer(),
    fuel_type: t.String(),
    liters: t.Number(),
    total_price: t.Number(),
    full_tank: t.Boolean(),
    station: t.Optional(t.String()),
    filled_at: t.Optional(t.Date()),
  }),
} as const;

export type FuelRecordModel = {
  [k in keyof typeof FuelRecordModel]: UnwrapSchema<
    (typeof FuelRecordModel)[k]
  >;
};
