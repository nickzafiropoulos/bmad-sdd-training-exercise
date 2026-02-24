/**
 * @vitest-environment node
 */
import { afterEach, describe, expect, it } from "vitest";

import { createCaller } from "~/server/api/root";
import { createTRPCContext } from "~/server/api/trpc";
import { db } from "~/server/db";
import { todos } from "~/server/db/schema";
import { eq } from "drizzle-orm";

async function getCaller() {
  const ctx = await createTRPCContext({ headers: new Headers() });
  return createCaller(ctx);
}

describe("todo API", () => {
  let createdId: number | null = null;

  afterEach(async () => {
    if (createdId !== null) {
      await db.delete(todos).where(eq(todos.id, createdId));
      createdId = null;
    }
  });

  it("getAll returns empty array when no todos", async () => {
    const caller = await getCaller();
    const result = await caller.todo.getAll();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThanOrEqual(0);
  });

  it("create adds a todo and getAll includes it", async () => {
    const caller = await getCaller();
    const created = await caller.todo.create({ description: "integration test todo" });
    createdId = created.id;
    expect(created.description).toBe("integration test todo");
    expect(created.completed).toBe(false);
    expect(created.id).toBeGreaterThan(0);

    const all = await caller.todo.getAll();
    const found = all.find((t) => t.id === created.id);
    expect(found).toBeDefined();
    expect(found?.description).toBe("integration test todo");
  });

  it("toggle flips completed", async () => {
    const caller = await getCaller();
    const created = await caller.todo.create({ description: "toggle test" });
    createdId = created.id;
    expect(created.completed).toBe(false);

    const updated = await caller.todo.toggle({ id: created.id });
    expect(updated.completed).toBe(true);

    const updated2 = await caller.todo.toggle({ id: created.id });
    expect(updated2.completed).toBe(false);
  });

  it("delete removes the todo", async () => {
    const caller = await getCaller();
    const created = await caller.todo.create({ description: "delete test" });
    createdId = created.id;

    await caller.todo.delete({ id: created.id });
    createdId = null;

    const all = await caller.todo.getAll();
    expect(all.some((t) => t.id === created.id)).toBe(false);
  });

  it("create rejects empty description", async () => {
    const caller = await getCaller();
    await expect(caller.todo.create({ description: "" })).rejects.toThrow();
  });

  it("toggle throws NOT_FOUND for invalid id", async () => {
    const caller = await getCaller();
    await expect(caller.todo.toggle({ id: 999999 })).rejects.toMatchObject({
      code: "NOT_FOUND",
    });
  });

  it("delete throws NOT_FOUND for invalid id", async () => {
    const caller = await getCaller();
    await expect(caller.todo.delete({ id: 999999 })).rejects.toMatchObject({
      code: "NOT_FOUND",
    });
  });
});
