import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './ProductDetailPage.scss';

interface ProductOption {
    code:  number;
    name:  string;
}

interface Product {
    id: string;
    brand: string;
    model:  string;
    price: string;
    imgUrl: string;
    cpu?: string;
    ram?: string;
    os?: string;
    displayResolution?: string;
    displaySize?: string;
    battery?: string;
    primaryCamera?: string[] | string;
    secondaryCmera?: string[] | string;
    dimentions?: string;
    weight?: string;
    networkTechnology?: string;
    colors?: string[];
    options?: {
        colors: ProductOption[];
        storages: ProductOption[];
    };
}

function ProductDetailPage() {
    const { id } = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(
                    `https://itx-frontend-test.onrender.com/api/product/${id}`
                );

                if (!response.ok) {
                    throw new Error('Error fetching product');
                }

                const data = await response.json();
                setProduct(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const formatArrayField = (field: string[] | string | undefined) => {
        if (!field) return null;
        if (Array.isArray(field)) {
            return field.join(', ');
        }
        return field;
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
                    <img src={product.imgUrl} alt={product.model} />
                </div>

                <div className="product-detail__info">
                    <h1>{product.brand} {product.model}</h1>
                    <p className="product-detail__price">{product.price}€</p>

                    <div className="product-detail__specs">
                        <h2>Specifications</h2>

                        {product.cpu && (
                            <div className="spec-item">
                                <strong>CPU:</strong> {product.cpu}
                            </div>
                        )}

                        {product.ram && (
                            <div className="spec-item">
                                <strong>RAM: </strong> {product.ram}
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

                        {product. secondaryCmera && (
                            <div className="spec-item">
                                <strong>Secondary Camera:</strong> {formatArrayField(product.secondaryCmera)}
                            </div>
                        )}

                        {product. dimentions && (
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

                    <button className="btn-add-to-cart">Add to Cart</button>
                </div>
            </div>
        </div>
    );
}

export default ProductDetailPage;
