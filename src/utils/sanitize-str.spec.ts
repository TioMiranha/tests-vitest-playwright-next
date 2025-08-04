import { sanitizeStr } from "./sanitize-str";

describe('sanitizeStr (unit)', () => {
  test('retorna uma string vazia quando recebe um valor falsy', () => {
    // @ts-expect-error testando a função sem parâmetros
    expect(sanitizeStr()).toBe('');
  });

  test('retorna uma string vazia quando recebe um valor NÃO é uma string', () => {
    // @ts-expect-error testando a função com tipagem incorreta
    expect(sanitizeStr(123)).toBe('');
  });

  test('garante o trim da string enviada', () => {
    expect(sanitizeStr('       a      ')).toBe('a');
  });

  test('Garante que a String é normalizada com NFC', () => {
    //const original = 'e\u0301';
    //const expected = 'é';
    //expect(sanitizeStr(expected)).toBe(original);
  });
});