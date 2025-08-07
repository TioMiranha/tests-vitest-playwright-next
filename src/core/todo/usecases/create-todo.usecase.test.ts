import { makeTestTodoRepository } from "@/core/__tests__/utils/make-test-todo-repository";
import { createTodoUseCase } from "./create-todo.usecase";
import { InvalidTodo, ValidTodo } from "../schemas/todo.contract";

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

  test('should return the whole if validation passes', async () => {
    const description = 'Isso deve funcionar'
    const result = (await createTodoUseCase(description)) as ValidTodo;

    expect(result.success).toBe(true);
    expect(result.todo).toStrictEqual({
      createdAt: expect.any(String),
      description,
      id: expect.any(String),
    });
  });

  test('should return error if the repository fails', async () => {
    // Creating a todo once 
    const description = 'Isso só funciona uma vez';
    (await createTodoUseCase(description)) as ValidTodo;

    // trying to recreate a todo should return an error
    const result = (await createTodoUseCase(description)) as InvalidTodo;

    expect(result.success).toBe(false);
    expect(result.errors).toStrictEqual([
      "Já existe um todo com o ID ou descrição enviados",
    ]);
  });
});