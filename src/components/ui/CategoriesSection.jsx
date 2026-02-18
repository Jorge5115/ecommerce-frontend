import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { categoryApi } from '../../api/categoryApi';

export default function CategoriesSection() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        categoryApi.getAll().then(res => setCategories(res.data)).catch(console.error);
    }, []);

    if (categories.length === 0) return null;

    return (
        <div className="container py-5">
            <h3 className="fw-bold mb-4">Explorar categorias</h3>
            <div className="row g-3">
                {categories.map(cat => (
                    <div key={cat.id} className="col-md-3 col-6">
                        <div
                            className="card shadow-sm text-center h-100"
                            style={{ cursor: 'pointer' }}
                            onClick={() => navigate(`/products?category=${cat.id}`)}
                        >
                            {cat.imageUrl ? (
                                <img
                                    src={cat.imageUrl}
                                    alt={cat.name}
                                    className="card-img-top"
                                    style={{ height: '120px', objectFit: 'cover' }}
                                />
                            ) : (
                                <div
                                    className="d-flex align-items-center justify-content-center"
                                    style={{
                                        height: '120px',
                                        backgroundColor: '#0a2a2a',
                                        fontSize: '2.5rem'
                                    }}
                                >
                                    🏷️
                                </div>
                            )}
                            <div className="card-body py-2">
                                <h6 className="fw-bold mb-0">{cat.name}</h6>
                                <small className="text-muted">{cat.productCount} {cat.productCount === 1 ? 'producto' : 'productos'}</small>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}