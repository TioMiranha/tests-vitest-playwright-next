import { makeTestTodoMocks } from "@/core/__tests__/utils/make-test-todo-mocks";
import { deleteTodoAction } from "./delete-todo.action";

vi.mock('next/cache', () => {
  return {
    revalidatePath: vi.fn(),
  };
});

describe('deleteTodoAction (unit)', () => {
  test('should return the deleteTodoUseCase with correctly values', async () => {
    const { deleteTodoUseCaseSpy } = makeTestTodoMocks();
    const expectedParamCall = 'Usecase should be called with this';
    await deleteTodoAction(expectedParamCall);

    expect(deleteTodoUseCaseSpy).toHaveBeenCalledExactlyOnceWith(
      expectedParamCall,
    );
  });

  test('should return the revalidatePath if the usecase returns success', async () => {
    const { revalidatePathMocked } = makeTestTodoMocks();
    const description = 'Usecase should be called with this';
    await deleteTodoAction(description);

    expect(revalidatePathMocked).toHaveBeenCalledExactlyOnceWith(
      '/',
    );
  });

  test('should return the same value from usecase  on success ', async () => {
    const { successResult } = makeTestTodoMocks();
    const description = 'Usecase should be called with this';
    const result = await deleteTodoAction(description);

    expect(result).toStrictEqual(successResult);
  });

  test('should return the same value from usecase on error ', async () => {
    const { deleteTodoUseCaseSpy, errorResult } = makeTestTodoMocks();

    deleteTodoUseCaseSpy.mockResolvedValue(errorResult);
    const description = 'Usecase should be called with this';
    const result = await deleteTodoAction(description);

    expect(result).toStrictEqual(errorResult);
  });
});