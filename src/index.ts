import cors from "@elysia/cors";
import { Elysia } from "elysia";
import auth from "./modules/auth";

const app = new Elysia({ prefix: "api" }).use(cors()).use(auth).listen(3001);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
