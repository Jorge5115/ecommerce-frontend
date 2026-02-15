import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../../features/cart/cartSlice';
import { toast } from 'react-toastify';

export default function ProductCard({ product }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    const handleAddToCart = async (e) => {
        e.stopPropagation();
        if (!user) {
            toast.warning('Debes iniciar sesión para añadir al carrito');
            navigate('/login');
            return;
        }
        const result = await dispatch(addToCart({
            productId: product.id,
            quantity: 1
        }));
        if (addToCart.fulfilled.match(result)) {
            toast.success('Producto añadido al carrito');
        } else {
            toast.error(result.payload || 'Error al añadir al carrito');
        }
    };

    return (
        <div
            className="card h-100 shadow-sm"
            style={{ cursor: 'pointer' }}
            onClick={() => navigate(`/products/${product.id}`)}
        >
            <img
                src={product.imageUrl || 'https://via.placeholder.com/300x200?text=Sin+imagen'}
                className="card-img-top"
                alt={product.name}
                style={{ height: '200px', objectFit: 'cover' }}
            />
            <div className="card-body d-flex flex-column">
                <h6 className="card-title fw-bold">{product.name}</h6>
                <p className="card-text text-muted small flex-grow-1">
                    {product.description?.substring(0, 80)}...
                </p>
                <div className="d-flex justify-content-between align-items-center mt-2">
                    <span className="fw-bold text-primary fs-5">
                        {product.price}€
                    </span>
                    {product.averageRating > 0 && (
                        <span className="text-warning small">
                            ⭐ {product.averageRating?.toFixed(1)}
                        </span>
                    )}
                </div>
                <span className="badge bg-secondary mb-2" style={{ width: 'fit-content' }}>
                    {product.categoryName}
                </span>
                <button
                    className="btn btn-primary btn-sm mt-auto"
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                >
                    {product.stock === 0 ? 'Sin stock' : '🛒 Añadir al carrito'}
                </button>
            </div>
        </div>
    );
}