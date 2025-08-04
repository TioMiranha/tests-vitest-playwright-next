import { validateTodoDescription } from "./validate-todo-description";

describe('validateTodoDescription (unit)', () => {
  test('deve retornar erros quando a descrição tem menos que 4 caracteres', () => {
    const description = 'abc';
    const result = validateTodoDescription(description);
    expect(result.errors).toStrictEqual([
      'Descrição deve ter mais do que 3 caracteres',
    ]);
    expect(result.sucsses).toBe(false);
  });
  test('deve retornar sucesso quando a descrição tem mais de 3 caracteres', () => {
    const description = 'abcd';
    const result = validateTodoDescription(description);
    expect(result.errors).toStrictEqual([]);
    expect(result.sucsses).toBe(true);
  });
});