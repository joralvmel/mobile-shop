import type { ProductListItem } from '@/types/product';
import ProductCard from './ProductCard';

interface ProductGridProps {
    products: ProductListItem[];
    onProductClick: (productId: string) => void;
}

function ProductGrid({ products, onProductClick }: ProductGridProps) {
    if (products.length === 0) {
        return <p className="no-results">No products found</p>;
    }

    return (
        <div className="products-grid">
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    product={product}
                    onClick={onProductClick}
                />
            ))}
        </div>
    );
}

export default ProductGrid;
