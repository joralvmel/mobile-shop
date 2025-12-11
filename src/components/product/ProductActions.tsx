import type { Product } from '@/types/product';

interface ProductActionsProps {
    product: Product;
    selectedColor: number | null;
    selectedStorage: number | null;
    onColorChange: (code: number) => void;
    onStorageChange: (code: number) => void;
    onAddToCart: () => void;
    isAdding: boolean;
    isDisabled: boolean;
}

function ProductActions({
    product,
    selectedColor,
    selectedStorage,
    onColorChange,
    onStorageChange,
    onAddToCart,
    isAdding,
    isDisabled
}: ProductActionsProps) {
    return (
        <div className="product-actions">
            {product.options?.colors && product.options.colors.length > 0 && (
                <div className="selector">
                    <label>Color:</label>
                    <div className="selector__options">
                        {product.options.colors.map((color) => (
                            <button
                                key={color.code}
                                className={`selector__option ${
                                    selectedColor === color.code ? 'selected' : ''
                                }`}
                                onClick={() => onColorChange(color.code)}
                            >
                                {color.name}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {product.options?.storages && product.options.storages.length > 0 && (
                <div className="selector">
                    <label>Storage:</label>
                    <div className="selector__options">
                        {product.options.storages.map((storage) => (
                            <button
                                key={storage.code}
                                className={`selector__option ${
                                    selectedStorage === storage.code ? 'selected' : ''
                                }`}
                                onClick={() => onStorageChange(storage.code)}
                            >
                                {storage.name}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            <button
                className="btn-add-to-cart"
                onClick={onAddToCart}
                disabled={isDisabled}
            >
                {isAdding ? 'Adding...' : 'Add to Cart'}
            </button>
        </div>
    );
}

export default ProductActions;
