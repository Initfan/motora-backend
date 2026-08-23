import { Elysia, status, t } from "elysia";
import { cookieModel } from "@/utils/model";
import verifyToken from "@/utils/verify-token";
import bearer from "@elysia/bearer";

export const authPlugin = new Elysia({
  name: "auth-plugin",
})
  .use(bearer())
  .guard({
    cookie: cookieModel,
    beforeHandle({ bearer, set, status }) {
      if (!bearer) {
        set.headers["WWW-Authenticate"] =
          `Bearer realm='sign', error="invalid_request"`;

        return status(400, "Unauthorized");
      }
    },
  })
  .resolve({ as: "scoped" }, async ({ bearer }) => {
    const token = bearer;

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
