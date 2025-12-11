import { describe, it, expect, beforeEach, vi } from 'vitest';
import { productService } from '@/services/productService';
import { cache } from '@/utils/cache';

// Mock el cache
vi.mock('@/utils/cache', () => ({
    cache: {
        get: vi.fn(),
        set: vi.fn(),
    },
}));

describe('productService', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        globalThis.fetch = vi.fn();
    });

    describe('getProducts', () => {
        it('should return products from cache if available', async () => {
            const mockProducts = [
                { id: '1', brand: 'Apple', model: 'iPhone', price: '999', imgUrl: 'test.jpg' },
            ];

            vi.mocked(cache.get).mockReturnValue(mockProducts);

            const result = await productService.getProducts();

            expect(result).toEqual(mockProducts);
            expect(cache.get).toHaveBeenCalledWith('products_list');
        });

        it('should fetch products from API if not in cache', async () => {
            const mockProducts = [
                { id: '1', brand: 'Apple', model: 'iPhone', price: '999', imgUrl: 'test.jpg' },
            ];

            vi.mocked(cache.get).mockReturnValue(null);
            vi.mocked(globalThis.fetch).mockResolvedValue({
                ok: true,
                json: () => Promise.resolve(mockProducts),
            } as Response);

            const result = await productService.getProducts();

            expect(result).toEqual(mockProducts);
            expect(cache.set).toHaveBeenCalledWith('products_list', mockProducts);
        });

        it('should throw error if API call fails', async () => {
            vi.mocked(cache.get).mockReturnValue(null);
            vi.mocked(globalThis.fetch).mockResolvedValue({
                ok: false,
            } as Response);

            await expect(productService.getProducts()).rejects.toThrow('Error fetching products');
        });
    });

    describe('getProductById', () => {
        it('should return product from cache if available', async () => {
            const mockProduct = {
                id: '1',
                brand: 'Apple',
                model: 'iPhone',
                price: '999',
                imgUrl: 'test.jpg',
            };

            vi.mocked(cache.get).mockReturnValue(mockProduct);

            const result = await productService.getProductById('1');

            expect(result).toEqual(mockProduct);
            expect(cache.get).toHaveBeenCalledWith('product_1');
        });

        it('should fetch product from API if not in cache', async () => {
            const mockProduct = {
                id: '1',
                brand: 'Apple',
                model: 'iPhone',
                price: '999',
                imgUrl: 'test.jpg',
            };

            vi.mocked(cache.get).mockReturnValue(null);
            vi.mocked(globalThis.fetch).mockResolvedValue({
                ok: true,
                json: () => Promise.resolve(mockProduct),
            } as Response);

            const result = await productService.getProductById('1');

            expect(result).toEqual(mockProduct);
            expect(cache.set).toHaveBeenCalledWith('product_1', mockProduct);
        });
    });
});
