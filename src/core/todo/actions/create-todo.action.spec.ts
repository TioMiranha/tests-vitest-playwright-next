import { revalidatePath } from "next/cache";
import { InvalidTodo, ValidTodo } from "../schemas/todo.contract";
import * as createTodoUseCaseMod from "../usecases/create-todo.usecase";

vi.mock('next/cache', () => {
  return {
    revalidatePath: vi.fn(),
  };
});

describe('createTodoAction (unit)', () => {
  test('should return the createTodoUseCase with correctly values', async () => { });

  test('should return the revalidatePath if the usecase returns success', async () => { });

  test('should return the same value from usecase  on success ', async () => { });

  test('should return the same value from usecase on error ', async () => { });
});


const makeMocks = () => {
  const succssesResult = {
    success: true,
    todo: {
      id: 'id',
      description: 'banana',
      createdAt: 'mamaco',
    },
  } as ValidTodo;

  const errorResult = {
    success: false,
    errors: ['any', 'error'],
  } as InvalidTodo;

  const createTodoUseCaseSpy = vi
    .spyOn(createTodoUseCaseMod, 'createTodoUseCase')
    .mockResolvedValue(succssesResult);

  return { succssesResult, errorResult, createTodoUseCaseSpy };
}; 