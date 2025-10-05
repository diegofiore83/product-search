import { describe, it, expect, vi, afterEach } from 'vitest';
import { fetchProducts, searchProductsExactTitle } from './api';
import type { ProductsResponse } from '../types/product';

const mockFetch = vi.fn();
globalThis.fetch = mockFetch as unknown as typeof fetch;

afterEach(() => {
  vi.clearAllMocks();
});

describe('api: fetchProducts', () => {
  it('returns normalized data when response is ok', async () => {
    const payload: ProductsResponse = {
      products: [
        {
          id: 1,
          title: 'iPhone 9',
          description: 'An apple mobile',
          price: 549,
          brand: 'Apple',
          category: 'smartphones',
          thumbnail: 'https://dummy/img.jpg'
        }
      ],
      total: 1,
      skip: 0,
      limit: 100
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => payload
    } as Response);

    const res = await fetchProducts(100);
    expect(mockFetch).toHaveBeenCalledWith('https://dummyjson.com/products?limit=100');
    expect(res.products).toHaveLength(1);
    expect(res.products[0].title).toBe('iPhone 9');
    expect(res.total).toBe(1);
  });

  it('throws on non-ok response', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500
    } as Response);

    await expect(fetchProducts(50)).rejects.toThrow('HTTP 500');
  });
});

describe('api: searchProductsExactTitle', () => {
  it('filters to exact title match (case-insensitive)', async () => {
    const payload: ProductsResponse = {
      products: [
        { id: 1, title: 'iPhone 9', description: '', price: 1, brand: 'Apple', category: 'x', thumbnail: '' },
        { id: 2, title: 'IPHONE 9', description: '', price: 1, brand: 'Apple', category: 'x', thumbnail: '' },
        { id: 3, title: 'iPhone 10', description: '', price: 1, brand: 'Apple', category: 'x', thumbnail: '' }
      ],
      total: 3,
      skip: 0,
      limit: 20
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => payload
    } as Response);

    const results = await searchProductsExactTitle('iphone 9', 20);
    expect(mockFetch).toHaveBeenCalledWith('https://dummyjson.com/products/search?q=iphone%209&limit=20');
    // both variants that equal "iphone 9" when lowercased should remain
    expect(results.map(p => p.id)).toEqual([1, 2]);
  });

  it('throws on non-ok response', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404
    } as Response);

    await expect(searchProductsExactTitle('abc')).rejects.toThrow('HTTP 404');
  });
});
