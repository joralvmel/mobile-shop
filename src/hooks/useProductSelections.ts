import { useState, useEffect } from 'react';
import type { Product } from '@/types/product';

interface UseProductSelectionsReturn {
    selectedColor: number | null;
    selectedStorage: number | null;
    setSelectedColor: (code: number) => void;
    setSelectedStorage: (code: number) => void;
    isSelectionValid: boolean;
}

export function useProductSelections(product: Product | null): UseProductSelectionsReturn {
    const [selectedColor, setSelectedColor] = useState<number | null>(null);
    const [selectedStorage, setSelectedStorage] = useState<number | null>(null);

    useEffect(() => {
        if (!product) {
            setSelectedColor(null);
            setSelectedStorage(null);
            return;
        }

        // Auto-select first color if available
        const firstColor = product.options?.colors?.[0]?.code ?? null;
        setSelectedColor(firstColor);

        // Auto-select first storage if available
        const firstStorage = product.options?.storages?.[0]?.code ?? null;
        setSelectedStorage(firstStorage);
    }, [product]);

    const isSelectionValid = selectedColor !== null && selectedStorage !== null;

    return {
        selectedColor,
        selectedStorage,
        setSelectedColor,
        setSelectedStorage,
        isSelectionValid
    };
}
