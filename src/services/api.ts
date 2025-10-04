import type { ProductsResponse, Product } from '../types/product';

export async function fetchProducts(limit = 100): Promise<ProductsResponse> {
  const url = `https://dummyjson.com/products?limit=${limit}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data: ProductsResponse = await res.json();
  return {
    products: Array.isArray(data.products) ? data.products : [],
    total: typeof data.total === 'number' ? data.total : 0,
    skip: typeof data.skip === 'number' ? data.skip : 0,
    limit: typeof data.limit === 'number' ? data.limit : limit
  };
}

export async function searchProductsExactTitle(q: string, limit = 20): Promise<Product[]> {
  const url = `https://dummyjson.com/products/search?q=${encodeURIComponent(q)}&limit=${limit}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data: ProductsResponse = await res.json();
  const qLower = q.trim().toLowerCase();
  return (data.products ?? []).filter(p => p.title.toLowerCase() === qLower);
}
