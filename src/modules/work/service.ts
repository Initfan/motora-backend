import { prisma } from "@/utils/prisma";
import { WorkModel } from "./model";
import { status } from "elysia";
import { HandleError, handlePrismaError } from "@/helper/error";

type FUND_METHOD = "FIXED_DAILY" | "PERCENTAGE" | "PER_KM" | "MONTHLY_TARGET";

export class WorkSession {
  static async getWorkSession(user_id: WorkModel["user_id"]) {
    try {
      const session = await prisma.workSession.findFirst({
        where: { status: "ACTIVE", AND: { user_id } },
        orderBy: { created_at: "desc" },
      });

      if (!session)
        throw new HandleError(404, "There is no work session in progress.");

      return status(200, {
        message: "Work session in progress",
        data: session,
      });
    } catch (error) {
      return handlePrismaError(
        error,
        "Failed to Get Work Session, Try again later",
      );
    }
  }

  static async startWorkSession(
    data: WorkModel["start"],
    user_id: WorkModel["user_id"],
  ) {
    try {
      const session = await prisma.$transaction(async (tx) => {
        const motor = await tx.motorcycle.findFirst({
          where: { id: data.motorcycle_id },
        });

        if (!motor) throw new HandleError(404, "Motorcycle not found.");

        const activeSession = await tx.workSession.findFirst({
          where: { status: "ACTIVE", AND: { user_id } },
          orderBy: { created_at: "desc" },
        });

        if (activeSession)
          throw new HandleError(400, "There is already a session in progress.");

        return await tx.workSession.create({
          data: { ...data, user_id },
        });
      });

      return status(201, { message: "Work Session Started", session });
    } catch (error: any) {
      return handlePrismaError(
        error,
        error.message ?? "Failed to Start Work Session, Try again later",
      );
    }
  }

  static async getIncomes(work_session_id: number) {
    try {
      const incomes = await prisma.income.findMany({
        where: { work_session_id },
      });

      return status(200, { message: "Work Incomes", data: incomes });
    } catch (error: any) {
      console.log(error);
      return handlePrismaError(
        error,
        error.message ?? "Failed to Get Incomes, Try again later",
      );
    }
  }

  static async addIncome(data: WorkModel["income"]) {
    try {
      const income = await prisma.$transaction(async (tx) => {
        await tx.workSession.findFirstOrThrow({
          where: { id: data.work_session_id, AND: { status: "ACTIVE" } },
        });

        return await tx.income.create({
          data,
        });
      });

      return status(201, { message: "Income was added", income });
    } catch (error: any) {
      console.log(error);

      return handlePrismaError(
        error,
        error.message ?? "Failed to Add Income, Try again later",
      );
    }
  }

  static async addExpense(data: WorkModel["expense"]) {
    try {
      const expense = await prisma.$transaction(async (tx) => {
        await tx.workSession.findFirstOrThrow({
          where: { id: data.work_session_id, AND: { status: "ACTIVE" } },
        });

        return await tx.expense.create({
          data,
        });
      });

      return status(201, { message: "Expense was added", expense });
    } catch (error: any) {
      console.log(error);

      return handlePrismaError(
        error,
        error.message ?? "Failed to Add Expense, Try again later",
      );
    }
  }

  private static calculateServiceFund(
    method: FUND_METHOD,
    value: number,
    income: number,
    km: number,
  ) {
    switch (method) {
      case "FIXED_DAILY":
        return value;
        break;
      // case "MONTHLY_TARGET":
      //   return value / 30;
      //   break;
      case "PERCENTAGE":
        return value / 100;
        break;
      case "PER_KM":
        return value;
        break;
      default:
        return 0;
    }
  }

  static async finishWorkSession(data: WorkModel["finish"]) {
    const { work_session_id, ...finish } = data;

    try {
      const { work, summary } = await prisma.$transaction(async (tx) => {
        const workSession = await tx.workSession.findFirst({
          where: { id: work_session_id, status: "ACTIVE" },
        });

        if (!workSession)
          throw new HandleError(404, "There's no active working progress");

        if (data.kilometers_finish <= workSession.kilometers_start)
          throw new HandleError(400, "You haven't taken the trip yet.");

        const work = await tx.workSession.update({
          where: { id: work_session_id },
          data: {
            ...finish,
            status: "COMPLETED",
            finished_at: new Date(Date.now()),
          },
          include: {
            incomes: { select: { amount: true } },
            expenses: { select: { amount: true } },
          },
        });

        const distance = work.kilometers_finish - work.kilometers_start;

        await tx.motorcycle.update({
          where: { id: work.motorcycle_id },
          data: {
            kilometers: data.kilometers_finish,
            avg_kilometers_per_day: distance,
          },
        });

        const fund = await tx.serviceFund.findFirstOrThrow({
          where: { user_id: work.user_id },
        });

        const income = work.incomes.reduce((a, b) => a + b.amount, 0);
        const expense = work.expenses.reduce((a, b) => a + b.amount, 0);
        const service_fund = this.calculateServiceFund(
          fund.method,
          fund.value,
          income,
          distance,
        );
        const net_profit = Number(income - expense - service_fund);

        const summary = await prisma.workSummary.create({
          data: {
            work_session_id: work.id,
            income,
            expense,
            service_fund,
            net_profit,
            distance,
            order: work.total_order,
            profit_per_km: net_profit / distance,
            goal_profit: work.goal_profit,
            achieved: income,
            status: income >= work.goal_profit ? "ACHIEVED" : "NOT_ACHIEVED",
          },
        });

        return { work, fund, summary };
      });

      return status(200, {
        message: "Work Session has Completed",
        summary: {
          income: summary.income,
          expense: summary.expense,
          service_fund: summary.service_fund,
          net_profit: summary.net_profit,
        },
        performance: {
          distance: summary.distance,
          order: work.total_order,
          profit_per_km: (summary.net_profit / summary.distance).toFixed(0),
          target: work.goal_profit,
          achieved: summary.income,
          status:
            summary.income >= work.goal_profit ? "ACHIEVED" : "NOT_ACHIEVED",
        },
      });
    } catch (error: any) {
      return handlePrismaError(
        error,
        error.message ?? "Failed to Finish Work Session, Try again later",
      );
    }
  }
}
