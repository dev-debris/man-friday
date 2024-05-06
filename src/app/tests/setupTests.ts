import { setupServer } from 'msw/node';
import { afterAll, beforeAll } from 'vitest';

import '@testing-library/jest-dom';

import { handlers } from '@/__mocks__/handlers';

export const server = setupServer(...handlers);

beforeAll(() => server.listen());

afterAll(() => server.close());
