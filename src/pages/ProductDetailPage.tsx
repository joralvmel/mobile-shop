import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { cache } from '../utils/cache';
import './ProductDetailPage.scss';

interface ProductOption {
    code: number;
    name: string;
}

interface Product {
    id: string;
    brand: string;
    model: string;
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
    const { addToCart } = useCart();
    const [product, setProduct] = useState<Product | null>(null);
    const [selectedColor, setSelectedColor] = useState<number | null>(null);
    const [selectedStorage, setSelectedStorage] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isAddingToCart, setIsAddingToCart] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            if (!id) return;

            const cacheKey = `product_${id}`;

            const cachedData = cache.get<Product>(cacheKey);

            if (cachedData) {
                console.log(`📦 Loading product ${id} from cache`);
                setProduct(cachedData);

                if (cachedData.options?.colors && cachedData.options.colors.length > 0) {
                    setSelectedColor(cachedData.options.colors[0]. code);
                }
                if (cachedData.options?.storages && cachedData.options. storages.length > 0) {
                    setSelectedStorage(cachedData.options.storages[0].code);
                }

                setLoading(false);
                return;
            }

            try {
                console. log(`🌐 Fetching product ${id} from API`);
                const response = await fetch(`/api/product/${id}`);

                if (!response.ok) {
                    throw new Error('Error fetching product');
                }

                const data = await response.json();

                cache.set(cacheKey, data);

                setProduct(data);

                if (data.options?.colors && data.options.colors.length > 0) {
                    setSelectedColor(data.options.colors[0].code);
                }
                if (data.options?.storages && data.options.storages.length > 0) {
                    setSelectedStorage(data.options.storages[0].code);
                }
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

    const handleAddToCart = async () => {
        if (!product || !selectedColor || !selectedStorage) {
            return;
        }

        setIsAddingToCart(true);

        try {
            await addToCart(product.id, selectedColor, selectedStorage);
            alert('Product added to cart successfully!');
        } catch (err) {
            alert('Error adding product to cart.  Please try again.');
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
                                <strong>RAM:</strong> {product.ram}
                            </div>
                        )}

                        {product.os && (
                            <div className="spec-item">
                                <strong>Operating System: </strong> {product.os}
                            </div>
                        )}

                        {product.displaySize && (
                            <div className="spec-item">
                                <strong>Screen Size: </strong> {product.displaySize}
                            </div>
                        )}

                        {product.displayResolution && (
                            <div className="spec-item">
                                <strong>Screen Resolution: </strong> {product.displayResolution}
                            </div>
                        )}

                        {product.battery && (
                            <div className="spec-item">
                                <strong>Battery: </strong> {product.battery}
                            </div>
                        )}

                        {product.primaryCamera && (
                            <div className="spec-item">
                                <strong>Primary Camera: </strong> {formatArrayField(product.primaryCamera)}
                            </div>
                        )}

                        {product.secondaryCmera && (
                            <div className="spec-item">
                                <strong>Secondary Camera: </strong> {formatArrayField(product.secondaryCmera)}
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

                    {product.options?.colors && product.options.colors.length > 0 && (
                        <div className="selector">
                            <label>Color: </label>
                            <div className="selector__options">
                                {product.options.colors.map((color) => (
                                    <button
                                        key={color. code}
                                        className={`selector__option ${
                                            selectedColor === color.code ? 'selected' : ''
                                        }`}
                                        onClick={() => setSelectedColor(color.code)}
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
                                            selectedStorage === storage.code ?  'selected' : ''
                                        }`}
                                        onClick={() => setSelectedStorage(storage.code)}
                                    >
                                        {storage.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    <button
                        className="btn-add-to-cart"
                        onClick={handleAddToCart}
                        disabled={!selectedColor || ! selectedStorage || isAddingToCart}
                    >
                        {isAddingToCart ? 'Adding...' :  'Add to Cart'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductDetailPage;
