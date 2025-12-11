import type { ProductListItem } from '@/types/product';

interface ProductCardProps {
    product: ProductListItem;
    onClick: (productId: string) => void;
}

function ProductCard({ product, onClick }: ProductCardProps) {
    return (
        <div
            className="product-card"
            onClick={() => onClick(product.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    onClick(product.id);
                }
            }}
        >
            <img src={product.imgUrl} alt={`${product.brand} ${product.model}`} />
            <h3>{product.brand}</h3>
            <p>{product.model}</p>
            <p className="price">{product.price}€</p>
        </div>
    );
}

export default ProductCard;
