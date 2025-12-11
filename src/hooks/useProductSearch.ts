import { useState, useEffect } from 'react';
import type { ProductListItem } from '@/types/product';

export function useProductSearch(products: ProductListItem[]) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState(products);

    useEffect(() => {
        if (searchTerm.trim() === '') {
            setFilteredProducts(products);
            return;
        }

        const filtered = products.filter(
            (product) =>
                product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.model.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProducts(filtered);
    }, [searchTerm, products]);

    return { searchTerm, setSearchTerm, filteredProducts };
}
