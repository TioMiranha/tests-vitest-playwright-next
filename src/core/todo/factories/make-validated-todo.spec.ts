import * as sanitizeStrMod from "@/utils/sanitize-str";
import { makeValidateTodo } from "./make-validated-todo";

describe('makeValidatedTodo (unit)', () => {
  test('deve chamar a função sanitizeStr com o valor correto', () => {
    // Mockar (mock) -> Substituir algo temporariamente
    // Arrange
    const description = 'abcd';
    const sanitizeStrSpy = vi
      .spyOn(sanitizeStrMod, 'sanitizeStr')
      .mockReturnValue(description);

    //Act
    makeValidateTodo(description);

    //Assert
    expect(sanitizeStrSpy).toHaveBeenCalledExactlyOnceWith(description);
    expect(sanitizeStrSpy).toHaveBeenCalledTimes(1);
    expect(sanitizeStrSpy).toHaveBeenCalledWith(description);
  });
  //test('deve chamar a função validateTodoDescription com o retorno de sanitizeStr', () => { });
  //test('deve chamar makeNewTodo se validateTodoDescription retornou sucesso', () => { });
  //test('deve retornar validateTodoDescription.error se a validação falhou', () => { });
});