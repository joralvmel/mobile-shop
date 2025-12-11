const API_BASE = '/api';

export interface AddToCartRequest {
    id: string;
    colorCode: number;
    storageCode: number;
}

export interface AddToCartResponse {
    count: number;
}

export const cartService = {
    async addToCart(request: AddToCartRequest): Promise<AddToCartResponse> {
        const response = await fetch(`${API_BASE}/cart`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(request),
        });

        if (!response.ok) {
            throw new Error('Error adding to cart');
        }

        return response.json();
    }
};
