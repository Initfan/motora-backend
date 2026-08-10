import { Prisma } from "@/generated/prisma/client";
import { status } from "elysia";

export function handlePrismaError(error: any, message?: string) {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002":
        return status(409, {
          status: 409,
          message: "A record with this value already exists",
        });

      case "P2003":
        return status(400, {
          status: 400,
          message: "Invalid relation",
        });

      case "P2025":
        return status(404, {
          status: 404,
          message: "Record not found",
        });

      default:
        return status(500, {
          status: 500,
          message: "Database operation failed",
        });
    }
  }

  if (error instanceof Prisma.PrismaClientValidationError) {
    return status(400, {
      status: 400,
      message: "Invalid database request",
    });
  }

  return status(500, {
    status: 500,
    message: message ?? "Internal server error",
  });
}
