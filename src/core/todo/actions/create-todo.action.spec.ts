import { revalidatePath } from "next/cache";
import { InvalidTodo, ValidTodo } from "../schemas/todo.contract";
import * as createTodoUseCaseMod from "../usecases/create-todo.usecase";
import { createTodoAction } from "./create-todo.action";

vi.mock('next/cache', () => {
  return {
    revalidatePath: vi.fn(),
  };
});

describe('createTodoAction (unit)', () => {
  test('should return the createTodoUseCase with correctly values', async () => {
    const { createTodoUseCaseSpy } = makeMocks();
    const expectedParamCall = 'Usecase should be called with this';
    await createTodoAction(expectedParamCall);

    expect(createTodoUseCaseSpy).toHaveBeenCalledExactlyOnceWith(
      expectedParamCall,
    );
  });

  test('should return the revalidatePath if the usecase returns success', async () => {
    const { revalidatePathMocked } = makeMocks();
    const description = 'Usecase should be called with this';
    await createTodoAction(description);

    expect(revalidatePathMocked).toHaveBeenCalledExactlyOnceWith(
      '/',
    );
  });

  test('should return the same value from usecase  on success ', async () => {
    const { createTodoUseCaseSpy, succssesResult } = makeMocks();
    const description = 'Usecase should be called with this';
    const result = await createTodoAction(description);

    expect(result).toStrictEqual(succssesResult);
  });

  test('should return the same value from usecase on error ', async () => {
    const { createTodoUseCaseSpy, errorResult } = makeMocks();

    createTodoUseCaseSpy.mockResolvedValue(errorResult);
    const description = 'Usecase should be called with this';
    const result = await createTodoAction(description);

    expect(result).toStrictEqual(errorResult);
  });
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

  const revalidatePathMocked = vi.mocked(revalidatePath);

  return { succssesResult, errorResult, createTodoUseCaseSpy, revalidatePathMocked };
}; 