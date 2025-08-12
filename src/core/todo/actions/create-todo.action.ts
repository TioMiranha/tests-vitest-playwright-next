import { revalidatePath } from "next/cache";
import { createTodoUseCase } from "../usecases/create-todo.usecase"
import { devOnlyDelay } from "@/utils/dev-only-delay";

export async function createTodoAction(description: string) {
  'use server'
  const createResult = await createTodoUseCase(description);

  await devOnlyDelay(100);
  if (createResult.success) {
    revalidatePath('/');
  }

  return createResult;
}

