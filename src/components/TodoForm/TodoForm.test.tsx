import userEvent from "@testing-library/user-event";
import { todo } from "node:test";
import { TodoForm } from ".";
import { render, screen } from "@testing-library/react";

const user = userEvent.setup();

describe('<TodoForm />', () => {

  test('deve renderizar todos os componentes do form', async () => {
    const { btn, input } = renderForm();

    expect(btn).toBeInTheDocument();
    expect(input).toBeInTheDocument();
  });

  test('deve chamar a action com os valores corretos', async () => { });

  test('deve cortar espaços do incio e fim da description (trim)', async () => { });

  test('deve limpar o input se o formulário retornar sucesso', async () => { });

  test('deve desativar o botão enquanto envia a action', async () => { });

  test('deve desativar o input enquanto envia a action', async () => { });

  test('deve trocar o texto do botão enquanto envia a action', async () => { });

  test('deve mostrar o erro quando a action retornar erro', async () => { });

  test('deve manter o texto digitado no input se a action retornar erro', async () => { });

});

type RenderForm = {
  delay?: number,
  success?: boolean
};

function renderForm({ delay = 0, success = true }: RenderForm = {}) {
  const actionSuccessResult = {
    success: true,
    todo: { id: 'id', description: 'description', createdAt: 'createdAt' }
  };

  const actionErrorResult = {
    success: false,
    errors: ['falha ao criar todo'],
  };

  const actionResult = success ? actionSuccessResult : actionErrorResult;

  const actionNoDelay = vi.fn().mockResolvedValue(actionResult);

  const actionDelayed = vi.fn().mockImplementation(async () => {
    await new Promise(r => setTimeout(r, delay));
    return actionResult;
  });

  const action = delay > 0 ? actionDelayed : actionNoDelay;

  render(<TodoForm action={action} />);

  const input = screen.getByLabelText('Tarefa');
  const btn = screen.getByRole('button');

  return { btn, input, action };
}