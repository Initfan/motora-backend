import { status } from "elysia";
import { jwtVerify } from "jose";

const verifyToken = async (token: string) => {
  try {
    const verify = (
      await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET))
    ).payload;
    return verify;
  } catch (error) {
    throw status(500, "Failed to Verify Token, Try Again Later");
  }
};

export default verifyToken;
