import { useEffect, useState } from 'react';
import './ProductListPage.scss';

interface Product {
    id: string;
    brand:  string;
    model: string;
    price: string;
    imgUrl:  string;
}

function ProductListPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://itx-frontend-test.onrender.com/api/product');

                if (!response.ok) {
                    throw new Error('Error fetching products');
                }

                const data = await response. json();
                setProducts(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

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

            <div className="products-grid">
                {products.map((product) => (
                    <div key={product.id} className="product-card">
                        <img src={product.imgUrl} alt={product.model} />
                        <h3>{product.brand}</h3>
                        <p>{product. model}</p>
                        <p className="price">{product.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductListPage;
