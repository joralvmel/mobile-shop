import { useParams } from 'react-router-dom';

function ProductDetailPage() {
    const { id } = useParams();

    return (
        <div className="container">
            <h1>Product Detail</h1>
            <p>Product detail: {id}</p>
        </div>
    );
}

export default ProductDetailPage;