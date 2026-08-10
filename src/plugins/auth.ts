import { Elysia, status, t } from "elysia";
import { cookieModel } from "@/utils/model";
import verifyToken from "@/utils/verify-token";

export const authPlugin = new Elysia({
  name: "auth-plugin",
})
  .guard({
    cookie: t.Cookie({
      access_token: t.Optional(t.String()),
    }),
  })
  .resolve({ as: "scoped" }, async ({ cookie }) => {
    const token = cookie.access_token.value;

    if (typeof token !== "string") {
      throw status(401, "Unauthorized");
    }

    const payload = await verifyToken(token);

    if (!payload?.sub) {
      throw status(401, "Invalid or expired token");
    }

    return {
      user: payload,
      user_id: Number(payload.sub),
    };
  });
