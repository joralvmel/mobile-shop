import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { cartService } from '@/services/cartService';

interface CartContextType {
    cartCount: number;
    addToCart: (id: string, colorCode: number, storageCode: number) => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cartCount, setCartCount] = useState(() => {
        const saved = localStorage.getItem('cartCount');
        return saved ? parseInt(saved, 10) : 0;
    });

    useEffect(() => {
        localStorage.setItem('cartCount', cartCount.toString());
    }, [cartCount]);

    const addToCart = async (id: string, colorCode: number, storageCode: number) => {
        try {
            const data = await cartService.addToCart({ id, colorCode, storageCode });
            setCartCount(data.count);
        } catch (error) {
            console.error('Error adding to cart:', error);
            throw error;
        }
    };

    return (
        <CartContext.Provider value={{ cartCount, addToCart }}>
            {children}
        </CartContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
