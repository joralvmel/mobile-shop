import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductListPage.scss';

interface Product {
    id: string;
    brand:  string;
    model: string;
    price: string;
    imgUrl: string;
}

function ProductListPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('/api/product');

                if (!response.ok) {
                    throw new Error('Error fetching products');
                }

                const data = await response. json();
                setProducts(data);
                setFilteredProducts(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        if (searchTerm. trim() === '') {
            setFilteredProducts(products);
            return;
        }

        const filtered = products.filter(
            (product) =>
                product. brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.model.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProducts(filtered);
    }, [searchTerm, products]);

    const handleProductClick = (productId:  string) => {
        navigate(`/product/${productId}`);
    };

    if (loading) {
        return (
            <div className="container">
                <p>Loading products...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container">
                <p>Error: {error}</p>
            </div>
        );
    }

    return (
        <div className="container">
            <h1>All Products</h1>

            <div className="search-box">
                <input
                    type="text"
                    placeholder="Search by brand or model..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
            </div>

            {filteredProducts.length === 0 ? (
                <p className="no-results">No products found matching "{searchTerm}"</p>
            ) : (
                <div className="products-grid">
                    {filteredProducts.map((product) => (
                        <div
                            key={product.id}
                            className="product-card"
                            onClick={() => handleProductClick(product.id)}
                        >
                            <img src={product.imgUrl} alt={product.model} />
                            <h3>{product.brand}</h3>
                            <p>{product.model}</p>
                            <p className="price">{product.price}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ProductListPage;
