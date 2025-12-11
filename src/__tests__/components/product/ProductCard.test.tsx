import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductCard from '@/components/product/ProductCard';

describe('ProductCard', () => {
  const mockProduct = {
    id: '1',
    brand: 'Apple',
    model: 'iPhone 15',
    price: '999',
    imgUrl: 'https://example.com/iphone.jpg',
  };

  it('should render product information', () => {
    const mockOnClick = vi.fn();
    render(
      <ProductCard
        product={mockProduct}
        onClick={mockOnClick}
      />
    );

    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.getByText('iPhone 15')).toBeInTheDocument();
    expect(screen.getByText('999€')).toBeInTheDocument();
  });

  it('should render product image with alt text', () => {
    const mockOnClick = vi.fn();
    render(
      <ProductCard
        product={mockProduct}
        onClick={mockOnClick}
      />
    );

    const img = screen.getByAltText('Apple iPhone 15');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://example.com/iphone.jpg');
  });

  it('should call onClick when card is clicked', async () => {
    const mockOnClick = vi.fn();
    const user = userEvent.setup();

    render(
      <ProductCard
        product={mockProduct}
        onClick={mockOnClick}
      />
    );

    const card = screen.getByRole('button');
    await user.click(card);

    expect(mockOnClick).toHaveBeenCalledWith('1');
  });

  it('should handle keyboard Enter key', async () => {
    const mockOnClick = vi.fn();
    const user = userEvent.setup();

    render(
      <ProductCard
        product={mockProduct}
        onClick={mockOnClick}
      />
    );

    const card = screen.getByRole('button');
    card.focus();
    await user.keyboard('{Enter}');

    expect(mockOnClick).toHaveBeenCalledWith('1');
  });
});
