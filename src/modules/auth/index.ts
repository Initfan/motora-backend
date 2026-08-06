import { Elysia } from "elysia";
import { Auth } from "./service";
import { AuthModel } from "./model";

const auth = new Elysia().post("register", ({ body }) => Auth.signUp(body), {
  body: AuthModel.signUpBody,
});

export default auth;
