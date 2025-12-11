import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useProductSearch } from '@/hooks/useProductSearch';

describe('useProductSearch', () => {
  const mockProducts = [
    { id: '1', brand: 'Apple', model: 'iPhone 15', price: '999', imgUrl: 'test.jpg' },
    { id: '2', brand: 'Samsung', model: 'Galaxy S24', price: '899', imgUrl: 'test.jpg' },
    { id: '3', brand: 'Apple', model: 'iPad', price: '599', imgUrl: 'test.jpg' },
  ];

  it('should return all products when search term is empty', () => {
    const { result } = renderHook(() => useProductSearch(mockProducts));

    expect(result.current.filteredProducts).toEqual(mockProducts);
    expect(result.current.searchTerm).toBe('');
  });

  it('should filter products by brand', () => {
    const { result } = renderHook(() => useProductSearch(mockProducts));

    act(() => {
      result.current.setSearchTerm('Apple');
    });

    expect(result.current.filteredProducts).toHaveLength(2);
    expect(result.current.filteredProducts[0].brand).toBe('Apple');
  });

  it('should filter products by model', () => {
    const { result } = renderHook(() => useProductSearch(mockProducts));

    act(() => {
      result.current.setSearchTerm('Galaxy');
    });

    expect(result.current.filteredProducts).toHaveLength(1);
    expect(result.current.filteredProducts[0].model).toBe('Galaxy S24');
  });

  it('should be case insensitive', () => {
    const { result } = renderHook(() => useProductSearch(mockProducts));

    act(() => {
      result.current.setSearchTerm('apple');
    });

    expect(result.current.filteredProducts).toHaveLength(2);
  });

  it('should return empty array when no matches found', () => {
    const { result } = renderHook(() => useProductSearch(mockProducts));

    act(() => {
      result.current.setSearchTerm('Nokia');
    });

    expect(result.current.filteredProducts).toHaveLength(0);
  });
});
