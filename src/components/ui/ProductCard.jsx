import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../features/cart/cartSlice';
import { toast } from 'react-toastify';

export default function ProductCard({ product }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const handleAddToCart = async (e) => {
        e.stopPropagation();
        if (!user) {
            toast.warning('Debes iniciar sesion para añadir al carrito');
            navigate('/login');
            return;
        }
        const result = await dispatch(addToCart({ productId: product.id, quantity: 1 }));
        if (addToCart.fulfilled.match(result)) {
            toast.success('Producto añadido al carrito');
        } else {
            toast.error(result.payload || 'Error al añadir al carrito');
        }
    };

    return (
        <div
            className="card h-100 shadow-sm"
            style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column' }}
            onClick={() => navigate(`/products/${product.id}`)}
        >
            <img
                src={product.imageUrl || 'https://via.placeholder.com/300x200?text=Sin+imagen'}
                className="card-img-top"
                alt={product.name}
                loading="lazy"
                style={{ height: '200px', objectFit: 'cover' }}
            />
            <div className="card-body d-flex flex-column" style={{ flex: 1 }}>
                <span className="badge bg-secondary mb-2 align-self-start">{product.categoryName}</span>
                <h6 className="card-title fw-bold" style={{ minHeight: '48px' }}>{product.name}</h6>
                <p
                    className="card-text text-muted small"
                    style={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        minHeight: '40px',
                    }}
                >
                    {product.description}
                </p>
                <div className="mt-auto">
                    {product.averageRating > 0 && (
                        <div className="mb-2">
                            <span className="text-warning">
                                {'★'.repeat(Math.round(product.averageRating))}
                                {'☆'.repeat(5 - Math.round(product.averageRating))}
                            </span>
                            <span className="text-muted small ms-1">
                                ({product.reviewCount})
                            </span>
                        </div>
                    )}
                    <div className="d-flex justify-content-between align-items-center">
                        <span className="text-primary fw-bold fs-5">{product.price}€</span>
                        <button
                            className="btn btn-sm btn-primary"
                            onClick={handleAddToCart}
                            disabled={product.stock === 0}
                        >
                            {product.stock === 0 ? 'Sin stock' : 'Añadir'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}