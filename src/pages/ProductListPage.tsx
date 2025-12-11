import { useNavigate } from 'react-router-dom';
import { useApi } from '@/hooks/useApi';
import { useProductSearch } from '@/hooks/useProductSearch';
import { productService } from '@/services/productService';
import SearchBox from '@/components/product/SearchBox';
import ProductGrid from '@/components/product/ProductGrid';

function ProductListPage() {
    const navigate = useNavigate();
    const { data: products, loading, error } = useApi(() => productService.getProducts());
    const { searchTerm, setSearchTerm, filteredProducts } = useProductSearch(products || []);

    const handleProductClick = (productId: string) => {
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

            <SearchBox
                value={searchTerm}
                onChange={setSearchTerm}
                placeholder="Search by brand or model..."
            />

            {filteredProducts.length === 0 && searchTerm ? (
                <p className="no-results">No products found matching "{searchTerm}"</p>
            ) : (
                <ProductGrid
                    products={filteredProducts}
                    onProductClick={handleProductClick}
                />
            )}
        </div>
    );
}

export default ProductListPage;
