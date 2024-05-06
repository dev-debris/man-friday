import { describe, expect, it, vi } from 'vitest';
import { screen } from '@testing-library/react';

import MessageGenerator from '@/features/message-generators/MessageGenerator';
import render from '@/shared/tests/render';

describe('MessageGenerator', async () => {
  it('메시지 대상을 선택할 수 있다.', async () => {
    const { user } = await render(<MessageGenerator />);

    const select = screen.getByTestId('select-mode');

    await user.click(select);

    await user.selectOptions(select, 'family');

    expect(select).toHaveValue('family');
  });

  it('키워드 추가 버튼을 클릭하여 키워드 input을 추가할 수 있다.', async () => {
    const { user } = await render(<MessageGenerator />);

    const addButton = screen.getByTestId('add-keyword');

    await user.click(addButton);
    const inputs1 = screen.getAllByRole('textbox');
    expect(inputs1).toHaveLength(1);

    await user.click(addButton);
    const inputs2 = screen.getAllByRole('textbox');
    expect(inputs2).toHaveLength(2);
  });

  describe('키워드 input', async () => {
    it('키워드 input을 통해 키워드를 입력할 수 있다.', async () => {
      const { user } = await render(<MessageGenerator />);

      const addButton = screen.getByTestId('add-keyword');
      await user.click(addButton);

      const input = screen.getByTestId('keyword-input-0');

      await user.type(input, '행복');
      expect(input).toHaveValue('행복');
    });

    it('키워드 input을 통해 키워드를 수정할 수 있다.', async () => {
      const { user } = await render(<MessageGenerator />);

      const addButton = screen.getByTestId('add-keyword');
      await user.click(addButton);

      const input = screen.getByTestId('keyword-input-0');

      await user.type(input, '행복');
      expect(input).toHaveValue('행복');

      await user.clear(input);
      await user.type(input, '사랑');
      expect(input).toHaveValue('사랑');
    });
  });

  it('생성 버튼을 클릭하여 선택한 대상과 키워드들을 포함해서 함수를 호출할 수 있다.', async () => {
    const spy = vi.spyOn(global, 'fetch');
    const { user } = await render(<MessageGenerator />);

    const addButton = screen.getByTestId('add-keyword');
    await user.click(addButton);

    const input = screen.getByTestId('keyword-input-0');
    await user.type(input, '행복');

    const generateButton = screen.getByTestId('generate-button');
    await user.click(generateButton);

    // TODO: 구림 개선 필요
    expect(spy).toHaveBeenCalledWith('/api/openai', {
      body: JSON.stringify({ mode: 'friend', keywords: ['행복'] }),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    });
  });
});
