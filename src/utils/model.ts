import { t } from "elysia";

export const cookieModel = t.Cookie({
  access_token: t.Optional(t.String()),
});
