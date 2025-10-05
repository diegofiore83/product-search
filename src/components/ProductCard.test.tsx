import { render, screen } from '@testing-library/react';
import ProductCard from './ProductCard';
import type { Product } from '../types/product';

function makeProduct(overrides: Partial<Product> = {}): Product {
  return {
    id: 123,
    title: 'Test Phone',
    description: 'A very nice phone',
    price: 100,
    brand: 'BrandX',
    category: 'smartphones',
    thumbnail: 'https://dummy/image.jpg',
    ...overrides
  };
}

describe('<ProductCard />', () => {
  it('renders title, subtitle, price and image', () => {
    render(<ProductCard product={makeProduct()} />);

    expect(screen.getByText('Test Phone')).toBeInTheDocument();
    // subtitle combines brand • category
    expect(screen.getByText('BrandX • smartphones')).toBeInTheDocument();
    expect(screen.getByText(/Price:\s*\$100/i)).toBeInTheDocument();

    const img = screen.getByRole('img', { name: /test phone/i }) as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.src).toBe('https://dummy/image.jpg');
    // NOTE: jsdom appends trailing slash to absolute URLs
  });

  it('handles missing description gracefully', () => {
    render(<ProductCard product={makeProduct({ description: '' })} />);
    // description is conditional; not rendered if empty
    expect(screen.queryByText('A very nice phone')).not.toBeInTheDocument();
  });
});
