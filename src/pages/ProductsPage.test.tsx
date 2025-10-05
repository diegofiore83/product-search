import React from 'react';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ProductsPage from './ProductsPage';
import * as api from '../services/api';
import type { ProductsResponse } from '../types/product';
import { describe, it, expect, afterEach, vi, Mock } from 'vitest';

// Mock the API module so we fully control query states
vi.mock('../services/api');

function renderWithClient(ui: React.ReactElement) {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } }
  });
  return render(<QueryClientProvider client={client}>{ui}</QueryClientProvider>);
}

afterEach(() => {
  vi.clearAllMocks();
});

describe('<ProductsPage />', () => {
  it('renders a search input', () => {
    // Keep fetch pending so we can still assert on the input presence
    (api.fetchProducts as unknown as Mock).mockReturnValue(new Promise(() => {}));
    renderWithClient(<ProductsPage />);

    // Using placeholder text from the component
    expect(screen.getByPlaceholderText(/search products/i)).toBeInTheDocument();
  });

  it('shows loading spinner while fetching', () => {
    (api.fetchProducts as unknown as Mock).mockReturnValue(new Promise(() => {}));
    renderWithClient(<ProductsPage />);

    // CircularProgress has aria-label="loading"
    expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();
  });

  it('shows error alert on failure', async () => {
    (api.fetchProducts as unknown as Mock).mockRejectedValue(new Error('boom'));
    renderWithClient(<ProductsPage />);

    // Assert the alert is rendered
    const alert = await screen.findByRole('alert');
    expect(alert).toBeInTheDocument();
    // Assert it shows the error message
    expect(alert).toHaveTextContent(/boom/i);
  });

  it('renders product cards on success', async () => {
    const payload: ProductsResponse = {
      products: [
        { id: 1, title: 'Alpha', description: 'A', price: 10, brand: 'BrandA', category: 'cat', thumbnail: 't1' },
        { id: 2, title: 'Beta', description: 'B', price: 20, brand: 'BrandB', category: 'cat', thumbnail: 't2' }
      ],
      total: 2,
      skip: 0,
      limit: 100
    };
    (api.fetchProducts as unknown as Mock).mockResolvedValue(payload);

    renderWithClient(<ProductsPage />);

    // Titles render as CardHeader titles
    expect(await screen.findByText('Alpha')).toBeInTheDocument();
    expect(screen.getByText('Beta')).toBeInTheDocument();

    // Simple sanity check: both prices appear
    const prices = screen.getAllByText(/price:\s*\$/i);
    expect(prices).toHaveLength(2);
  });
});
