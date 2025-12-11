import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { useApi } from '@/hooks/useApi';
import { useProductSelections } from '@/hooks/useProductSelections';
import { productService } from '@/services/productService';
import ProductImage from '@/components/product/ProductImage';
import ProductSpecs from '@/components/product/ProductSpecs';
import ProductActions from '@/components/product/ProductActions';

function ProductDetailPage() {
    const { id } = useParams<{ id: string }>();
    const { addToCart } = useCart();
    const [isAddingToCart, setIsAddingToCart] = useState(false);

    const { data: product, loading, error } = useApi(() =>
        id ? productService.getProductById(id) : Promise.reject('No ID provided')
    );

    const {
        selectedColor,
        selectedStorage,
        setSelectedColor,
        setSelectedStorage,
        isSelectionValid
    } = useProductSelections(product);

    const handleAddToCart = async () => {
        if (!product || !selectedColor || !selectedStorage) {
            return;
        }

        setIsAddingToCart(true);

        try {
            await addToCart(product.id, selectedColor, selectedStorage);
            alert('Product added to cart successfully!');
        } catch {
            alert('Error adding product to cart. Please try again.');
        } finally {
            setIsAddingToCart(false);
        }
    };

    if (loading) {
        return (
            <div className="container">
                <p>Loading product...</p>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="container">
                <p>Error: {error || 'Product not found'}</p>
                <Link to="/">← Back to products</Link>
            </div>
        );
    }

    return (
        <div className="container">
            <Link to="/" className="back-link">← Back to products</Link>

            <div className="product-detail">
                <div className="product-detail__image">
                    <ProductImage product={product} />
                </div>

                <div className="product-detail__info">
                    <h1>{product.brand} {product.model}</h1>
                    <p className="product-detail__price">{product.price}€</p>

                    <ProductSpecs product={product} />

                    <ProductActions
                        product={product}
                        selectedColor={selectedColor}
                        selectedStorage={selectedStorage}
                        onColorChange={setSelectedColor}
                        onStorageChange={setSelectedStorage}
                        onAddToCart={handleAddToCart}
                        isAdding={isAddingToCart}
                        isDisabled={!isSelectionValid || isAddingToCart}
                    />
                </div>
            </div>
        </div>
    );
}

export default ProductDetailPage;
