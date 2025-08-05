import { makeValidateTodo } from "./make-validated-todo";
import { InvalidTodo, ValidTodo } from "../schemas/todo.contract";
import * as sanitizeStrMod from "@/utils/sanitize-str";
import * as makeNewTodoMod from "./make-new-todo";
import * as validateTodoDescriptionMod from "../schemas/validate-todo-description";

describe('makeValidatedTodo (unit)', () => {
  test('deve chamar a função sanitizeStr com o valor correto', () => {
    // Mockar (mock) -> Substituir algo temporariamente
    // Arrange
    const { description, sanitizeStrSpy } = makeMocks();
    const result = makeValidateTodo(description);
    //Act
    console.log(result);
    //Assert
    expect(sanitizeStrSpy).toHaveBeenCalledExactlyOnceWith(description);

  });

  test('deve chamar a função validateTodoDescription com o retorno de sanitizeStr', () => {
    const { description, sanitizeStrSpy, validateTodoDescriptionSpy } = makeMocks();

    const sanitizeStrReturn = 'retorno da sanitizeStr';
    sanitizeStrSpy.mockReturnValue(sanitizeStrReturn);

    makeValidateTodo(description) as ValidTodo;

    expect(validateTodoDescriptionSpy).toHaveBeenCalledExactlyOnceWith(sanitizeStrReturn);
  });

  test('deve chamar a função makeNewTodo se validatedDescription retornou sucesso', () => {
    const { description } = makeMocks();
    const result = makeValidateTodo(description) as ValidTodo;

    expect(result.success).toBe(true);

    expect(result.todo.id).toBe('any-id');
    expect(result.todo.description).toBe('vasco');
    expect(result.todo.createdAt).toMatch('any-date');
  });

  test('deve chamar validatedDescription.error se a validação falhou', () => {
    const { errors, description, validateTodoDescriptionSpy } = makeMocks();

    validateTodoDescriptionSpy.mockReturnValue({
      errors,
      sucsses: false
    });
    const result = makeValidateTodo(description) as InvalidTodo;

    expect(result).toStrictEqual({
      errors,
      success: false,
    }
    )
  });

});

const makeMocks = (description = 'vasco') => {
  const errors = ['any', 'error'];
  const todo = {
    id: 'any-id',
    description,
    createdAt: 'any-date',
  }


  const sanitizeStrSpy = vi
    .spyOn(sanitizeStrMod, 'sanitizeStr')
    .mockReturnValue(description);


  const validateTodoDescriptionSpy = vi
    .spyOn(validateTodoDescriptionMod, 'validateTodoDescription')
    .mockReturnValue({
      errors: [],
      sucsses: true,
    });

  const makeNewTodoSpy = vi
    .spyOn(makeNewTodoMod, 'makeNewTodo')
    .mockReturnValue(todo);

  return {
    errors,
    todo,
    description,
    sanitizeStrSpy,
    validateTodoDescriptionSpy,
  };
}