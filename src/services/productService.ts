import { cache } from '@/utils/cache';
import type { Product, ProductListItem } from '@/types/product';

const API_BASE = '/api';

export const productService = {
    async getProducts(): Promise<ProductListItem[]> {
        const cacheKey = 'products_list';
        const cached = cache.get<ProductListItem[]>(cacheKey);

        if (cached) {
            console.log('📦 Loading products from cache');
            return cached;
        }

        console.log('🌐 Fetching products from API');
        const response = await fetch(`${API_BASE}/product`);

        if (!response.ok) {
            throw new Error('Error fetching products');
        }

        const data = await response.json();
        cache.set(cacheKey, data);
        return data;
    },

    async getProductById(id: string): Promise<Product> {
        const cacheKey = `product_${id}`;
        const cached = cache.get<Product>(cacheKey);

        if (cached) {
            console.log(`📦 Loading product ${id} from cache`);
            return cached;
        }

        console.log(`🌐 Fetching product ${id} from API`);
        const response = await fetch(`${API_BASE}/product/${id}`);

        if (!response.ok) {
            throw new Error('Error fetching product');
        }

        const data = await response.json();
        cache.set(cacheKey, data);
        return data;
    }
};
