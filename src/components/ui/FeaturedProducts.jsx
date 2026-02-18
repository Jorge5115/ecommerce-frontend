import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { productApi } from '../../api/productApi';
import ProductCard from './ProductCard';
import Loading from './Loading';

export default function FeaturedProducts() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFeatured();
    }, []);

    const fetchFeatured = async () => {
        try {
            const response = await productApi.search({
                page: 0,
                size: 4,
                sortBy: 'createdAt',
                sortDir: 'desc',
            });
            setProducts(response.data.content || []);
        } catch (error) {
            console.error('Error fetching featured:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container py-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="fw-bold">Ultimos productos</h3>
                <button
                    className="btn btn-outline-dark btn-sm"
                    onClick={() => navigate('/products')}
                >
                    Ver todos
                </button>
            </div>

            {loading ? (
                <Loading />
            ) : (
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
                    {products.map(product => (
                        <div key={product.id} className="col">
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}