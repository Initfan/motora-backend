import { Prisma } from "@/generated/prisma/client";
import { status } from "elysia";

export interface ErrorResponse<T = unknown> {
  code: number;
  message: string;
  data?: T;
}

export class HandleError<T = unknown> extends Error {
  public code: number;
  public data?: T;

  constructor(code: number, message: string, data?: T) {
    super(message);

    this.name = "HandleError";
    this.code = code;
    this.data = data;

    Object.setPrototypeOf(this, new.target.prototype);
  }

  set() {
    return status(this.code, {
      code: this.code,
      message: this.message,
      ...(this.data !== undefined && {
        data: this.data,
      }),
    });
  }
}

export function handlePrismaError(error: any, message?: string) {
  if (error instanceof HandleError) {
    return error.set();
  }

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
