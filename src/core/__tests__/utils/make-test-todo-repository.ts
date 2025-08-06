import { DrizzleTodoRepository } from "@/core/todo/repositories/drizzle-todo-repositorie";
import { Todo } from "@/core/todo/schemas/todo.contract";
import { drizzleDatabase } from "@/db/drizzle";

export async function makeTestTodoRepository() {
  const { db, todoTable } = drizzleDatabase;
  const repository = new DrizzleTodoRepository(db);

  const insertTodoDb = (todos: Todo[]) => db.insert(todoTable).values(todos);
  const deleteTodoNoWhere = () => db.delete(todoTable);
  const deleteTodoDb = (id: string) => db.delete(todoTable).where(eq(todoTable.id, id));

  return {
    repository,
    insertTodoDb,
    deleteTodoNoWhere,
    deleteTodoDb,
  };
}