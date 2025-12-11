import type { Product } from '@/types/product';

interface ProductSpecsProps {
    product: Product;
}

function ProductSpecs({ product }: ProductSpecsProps) {
    const formatArrayField = (field: string[] | string | undefined): string | null => {
        if (!field) return null;
        if (Array.isArray(field)) {
            return field.join(', ');
        }
        return field;
    };

    return (
        <div className="product-specs">
            <h2>Specifications</h2>

            {product.cpu && (
                <div className="spec-item">
                    <strong>CPU:</strong> {product.cpu}
                </div>
            )}

            {product.ram && (
                <div className="spec-item">
                    <strong>RAM:</strong> {product.ram}
                </div>
            )}

            {product.os && (
                <div className="spec-item">
                    <strong>Operating System:</strong> {product.os}
                </div>
            )}

            {product.displaySize && (
                <div className="spec-item">
                    <strong>Screen Size:</strong> {product.displaySize}
                </div>
            )}

            {product.displayResolution && (
                <div className="spec-item">
                    <strong>Screen Resolution:</strong> {product.displayResolution}
                </div>
            )}

            {product.battery && (
                <div className="spec-item">
                    <strong>Battery:</strong> {product.battery}
                </div>
            )}

            {product.primaryCamera && (
                <div className="spec-item">
                    <strong>Primary Camera:</strong> {formatArrayField(product.primaryCamera)}
                </div>
            )}

            {product.secondaryCmera && (
                <div className="spec-item">
                    <strong>Secondary Camera:</strong> {formatArrayField(product.secondaryCmera)}
                </div>
            )}

            {product.dimentions && (
                <div className="spec-item">
                    <strong>Dimensions:</strong> {product.dimentions}
                </div>
            )}

            {product.weight && (
                <div className="spec-item">
                    <strong>Weight:</strong> {product.weight} g
                </div>
            )}
        </div>
    );
}

export default ProductSpecs;

