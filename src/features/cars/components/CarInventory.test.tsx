import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@/test/renderWithProviders';
import { CarInventory } from './CarInventory';
import { server } from '@/mocks/server';
import { db } from '@/mocks/db';
import { graphql, HttpResponse } from 'msw';

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  db.reset();
});
afterAll(() => server.close());

describe('CarInventory Feature Integration', () => {
  it('renders search controls and lists inventory models from mock API', async () => {
    renderWithProviders(<CarInventory />);

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'A3', level: 2 })).toBeInTheDocument();
    });
  });

  it('filters vehicles when user types in model search', async () => {
    const user = userEvent.setup();
    renderWithProviders(<CarInventory />);

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'A3', level: 2 })).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText(/e\.g\. Civic/i);
    await user.type(searchInput, 'e-tron');

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'e-tron GT', level: 2 })).toBeInTheDocument();
      expect(screen.queryByRole('heading', { name: 'A3', level: 2 })).not.toBeInTheDocument();
    });
  });

  it('displays user-friendly error banner if API query fails', async () => {
    server.use(
      graphql.query('GetCars', () => {
        return HttpResponse.json(
          { errors: [{ message: 'Database connection failed' }] }
        );
      })
    );

    renderWithProviders(<CarInventory />);

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument();
      expect(screen.getByText(/Failed to load car inventory/i)).toBeInTheDocument();
    });
  });
});