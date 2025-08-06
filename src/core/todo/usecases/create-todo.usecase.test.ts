import { makeTestTodoRepository } from "@/core/__tests__/utils/make-test-todo-repository";
import { createTodoUseCase } from "./create-todo.usecase";
import { InvalidTodo } from "../schemas/todo.contract";

describe('createTodoUseCase (integration)', () => {
  beforeEach(async () => {
    const { deleteTodoNoWhere } = await makeTestTodoRepository();
    await deleteTodoNoWhere();
  });

  afterAll(async () => {
    const { deleteTodoNoWhere } = await makeTestTodoRepository();
    await deleteTodoNoWhere();
  });

  test('should return error if the validation fails', async () => {
    const result = await createTodoUseCase('') as InvalidTodo;

    expect(result.success).toBe(false);
    expect(result.errors).toHaveLength(1);
  });

  test
});