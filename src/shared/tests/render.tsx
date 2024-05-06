import { render as rtlRender } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReactNode } from 'react';

export default async function render(component: ReactNode) {
  const user = userEvent.setup();
  return {
    user,
    ...rtlRender(component),
  };
}
