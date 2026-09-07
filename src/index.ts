import cors from "@elysia/cors";
import { Elysia, status } from "elysia";
import auth from "./modules/auth";
import user from "./modules/user";
import motorcycle from "./modules/motorcycle";
import work from "./modules/work";
import maintenance from "./modules/maintenance";
import fuel from "./modules/fuel";
import staticPlugin from "@elysia/static";

const image = new Elysia()
  .use(
    staticPlugin({
      alwaysStatic: true,
      prefix: "motora",
      assets: "public/motors",
    }),
  )
  .listen(3002);

console.log(image.server?.hostname, image.server?.port);

const app = new Elysia({ prefix: "api" })
  .use(cors())
  .use(auth)
  .use(user)
  .use(motorcycle)
  .use(work)
  .use(maintenance)
  .use(fuel)
  .listen(3001);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
