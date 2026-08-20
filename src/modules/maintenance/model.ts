import { t, type UnwrapSchema } from "elysia";

export const MaintenanceModel = {
  component: t.Object({
    motorcycle_id: t.Integer(),
    component_id: t.Integer(),
    last_service_date: t.Date(),
    last_service_km: t.Integer(),
  }),
} as const;

export type MaintenanceModel = {
  [k in keyof typeof MaintenanceModel]: UnwrapSchema<
    (typeof MaintenanceModel)[k]
  >;
};
