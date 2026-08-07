import { jwtVerify } from "jose";

const verifyToken = async (token: string) => {
  return (
    await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET))
  ).payload;
};

export default verifyToken;
