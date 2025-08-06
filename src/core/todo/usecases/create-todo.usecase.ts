import { makeValidateTodo } from "../factories/make-validated-todo";
import { todoRepository } from "../repositories/default.repositorty";

export async function createTodoUseCase(description: string) {
  const validatedResult = makeValidateTodo(description);

  if (!validatedResult.success) {
    return validatedResult;
  }

  const createResult = await todoRepository.create(validatedResult.todo);

  return createResult;
}