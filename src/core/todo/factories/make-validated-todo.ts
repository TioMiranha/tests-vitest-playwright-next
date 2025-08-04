import { sanitizeStr } from "@/utils/sanitize-str";
import { validateTodoDescription } from "../schemas/validate-todo-description";
import { makeNewTodo } from "./make-new-todo";
import { Todo } from "../schemas/todo.contract";

type InvalidTodo = {
  success: false;
  errors: string[];
};

type ValidTodo = {
  success: true;
  data: Todo;
};

type MakeValidTodo = ValidTodo | InvalidTodo;

export function makeValidateTodo(description: string): MakeValidTodo {
  const cleanDescription = sanitizeStr(description);
  const validatedDescription = validateTodoDescription(cleanDescription);

  if (validatedDescription.sucsses) {
    return {
      success: true,
      data: makeNewTodo(cleanDescription),
    };
  }

  return {
    success: false,
    errors: validatedDescription.errors,
  }
}