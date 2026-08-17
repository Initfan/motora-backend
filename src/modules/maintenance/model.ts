import { t, type UnwrapSchema } from "elysia";

export const MaintenanceModel = {
  component: t.Object({
    motor_id: t.Integer(),
    component: t.String(),
    interval_km: t.Integer(),
    interval_month: t.Integer(),
    last_service_date: t.Date(),
    last_service_km: t.Integer(),
    next_schedule_date: t.Date(),
    next_schedule_km: t.Integer(),
    status: t.UnionEnum(["SAFE", "DUE_SOON", "OVERDUE", "UNKNOWN"]),
  }),
} as const;

export type MaintenanceModel = {
  [k in keyof typeof MaintenanceModel]: UnwrapSchema<
    (typeof MaintenanceModel)[k]
  >;
};
