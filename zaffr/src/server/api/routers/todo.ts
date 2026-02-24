import { eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { todos } from "~/server/db/schema";

const createInput = z.object({
  description: z.string().min(1, "Description is required").max(2048),
});

export const todoRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    try {
      const rows = await ctx.db.query.todos.findMany({
        orderBy: (todos, { asc }) => [asc(todos.createdAt)],
      });
      return rows.map((row) => ({
        id: row.id,
        description: row.description,
        completed: row.completed,
        createdAt: row.createdAt,
      }));
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unknown database error";
      console.error("[todo.getAll] Database error:", err);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message:
          process.env.NODE_ENV === "development"
            ? `Failed to load todos: ${message}`
            : "Failed to load todos",
      });
    }
  }),

  create: publicProcedure.input(createInput).mutation(async ({ ctx, input }) => {
    const [inserted] = await ctx.db
      .insert(todos)
      .values({ description: input.description })
      .returning();
    if (!inserted) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to create todo",
      });
    }
    return {
      id: inserted.id,
      description: inserted.description,
      completed: inserted.completed,
      createdAt: inserted.createdAt,
    };
  }),

  toggle: publicProcedure
    .input(z.object({ id: z.number().int().positive() }))
    .mutation(async ({ ctx, input }) => {
      const [existing] = await ctx.db
        .select()
        .from(todos)
        .where(eq(todos.id, input.id))
        .limit(1);
      if (!existing) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Todo not found",
        });
      }
      const [updated] = await ctx.db
        .update(todos)
        .set({ completed: !existing.completed })
        .where(eq(todos.id, input.id))
        .returning();
      if (!updated) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to update todo",
        });
      }
      return {
        id: updated.id,
        description: updated.description,
        completed: updated.completed,
        createdAt: updated.createdAt,
      };
    }),

  delete: publicProcedure
    .input(z.object({ id: z.number().int().positive() }))
    .mutation(async ({ ctx, input }) => {
      const [existing] = await ctx.db
        .select()
        .from(todos)
        .where(eq(todos.id, input.id))
        .limit(1);
      if (!existing) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Todo not found",
        });
      }
      await ctx.db.delete(todos).where(eq(todos.id, input.id));
      return { id: input.id };
    }),
});
