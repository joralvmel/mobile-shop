import type { Product } from '@/types/product';

interface ProductImageProps {
    product: Product;
}

function ProductImage({ product }: ProductImageProps) {
    return (
        <div className="product-image">
            <img src={product.imgUrl} alt={`${product.brand} ${product.model}`} />
        </div>
    );
}

export default ProductImage;
