import { makeTestTodoRepository } from "@/core/__tests__/utils/make-test-todo-repository";

describe('DrizzleTodoRepository (integration)', () => {
  describe('findAll', () => {
    test('deve retornar um array vazio se a tabela estiver limpa', async () => {
      const { repository } = await makeTestTodoRepository();
      const result = await repository.findAll()

      expect(result).toStrictEqual([]);
      expect(result).toHaveLength(0);

    });

    test('deve retornar todos os todos em ordem decrescente', async () => { });
  });

  describe('create', () => {
    test('cria um todo se os dados estão válidos', async () => {

    });

    test('falha se houver uma descrição igual na tabela', async () => { });

    test('falha se houver um ID igual na tabela', async () => { });

  });

  describe('findAll', () => {
    test('apaga um todo se ele existir', async () => {

    });

    test('falha ao apagar o todo se não existir', async () => { });
  });


});