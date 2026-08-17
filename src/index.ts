import cors from "@elysia/cors";
import { Elysia, status } from "elysia";
import auth from "./modules/auth";
import user from "./modules/user";
import motorcycle from "./modules/motorcycle";
import work from "./modules/work";
import maintenance from "./modules/maintenance";

const app = new Elysia({ prefix: "api" })
  .use(cors())
  .use(auth)
  .use(user)
  .use(motorcycle)
  .use(work)
  .use(maintenance)
  .listen(3001);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
