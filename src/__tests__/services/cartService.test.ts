import { describe, it, expect, beforeEach, vi } from 'vitest';
import { cartService } from '@/services/cartService';

describe('cartService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    globalThis.fetch = vi.fn();
  });

  describe('addToCart', () => {
    it('should successfully add product to cart', async () => {
      const mockResponse = { count: 1 };

      vi.mocked(globalThis.fetch).mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      } as Response);

      const result = await cartService.addToCart({
        id: '1',
        colorCode: 1,
        storageCode: 2,
      });

      expect(result).toEqual(mockResponse);
      expect(globalThis.fetch).toHaveBeenCalledWith('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ id: '1', colorCode: 1, storageCode: 2 }),
      });
    });

    it('should throw error if API call fails', async () => {
      vi.mocked(globalThis.fetch).mockResolvedValue({
        ok: false,
      } as Response);

      await expect(
        cartService.addToCart({
          id: '1',
          colorCode: 1,
          storageCode: 2,
        })
      ).rejects.toThrow('Error adding to cart');
    });

    it('should send correct request data', async () => {
      vi.mocked(globalThis.fetch).mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ count: 5 }),
      } as Response);

      await cartService.addToCart({
        id: '0001',
        colorCode: 3,
        storageCode: 1,
      });

      const calls = vi.mocked(globalThis.fetch).mock.calls;
      const [, options] = calls[0] as [string, RequestInit];
      const body = JSON.parse(options.body as string);

      expect(body).toEqual({
        id: '0001',
        colorCode: 3,
        storageCode: 1,
      });
    });
  });
});
