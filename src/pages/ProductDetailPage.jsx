import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { productApi } from '../api/productApi';
import { reviewApi } from '../api/reviewApi';
import { addToCart } from '../features/cart/cartSlice';
import Navbar from '../components/layout/Navbar';
import { toast } from 'react-toastify';
import { wishlistApi } from '../api/wishlistApi';

export default function ProductDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const [product, setProduct] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [reviewForm, setReviewForm] = useState({ rating: 5, comment: '' });
    const [submittingReview, setSubmittingReview] = useState(false);

    const [inWishlist, setInWishlist] = useState(false);

    useEffect(() => {
        fetchProduct();
        fetchReviews();
    }, [id]);

    const fetchProduct = async () => {
        try {
            const response = await productApi.getById(id);
            setProduct(response.data);
        } catch (error) {
            toast.error('Producto no encontrado');
            navigate('/products');
        } finally {
            setLoading(false);
        }
    };

    const fetchReviews = async () => {
        try {
            const response = await reviewApi.getByProduct(id);
            setReviews(response.data.content || []);
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    };

    const handleAddToCart = async () => {
        if (!user) {
            toast.warning('Debes iniciar sesion para añadir al carrito');
            navigate('/login');
            return;
        }
        const result = await dispatch(addToCart({ productId: product.id, quantity }));
        if (addToCart.fulfilled.match(result)) {
            toast.success('Producto añadido al carrito');
        } else {
            toast.error(result.payload || 'Error al añadir al Carrito');
        }
    };

    const handleSubmitReview = async (e) => {
        e.preventDefault();
        if (!user) {
            toast.warning('Debes iniciar sesion para dejar una reseña');
            navigate('/login');
            return;
        }
        setSubmittingReview(true);
        try {
            await reviewApi.create({ ...reviewForm, productId: product.id });
            toast.success('Reseña publicada correctamente');
            setReviewForm({ rating: 5, comment: '' });
            fetchReviews();
            fetchProduct();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error al publicar la reseña');
        } finally {
            setSubmittingReview(false);
        }
    };

    const handleAddToWishlist = async () => {
        if (!user) {
            toast.warning('Debes iniciar sesion para ver tus favoritos');
            navigate('/login');
            return;
        }
        try {
            await wishlistApi.add(product.id);
            setInWishlist(true);
            toast.success('Producto añadido a favoritos');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error al añadir a Favoritos');
        }
    };

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="text-center py-5">
                    <div className="spinner-border text-primary"></div>
                </div>
            </>
        );
    }

    if (!product) return null;

    return (
        <>
            <Navbar />
            <div className="container py-4">
                <button
                    className="btn btn-outline-secondary mb-4"
                    onClick={() => navigate('/products')}
                >
                    Volver a Productos
                </button>

                <div className="row g-4">
                    <div className="col-md-5">
                        <img
                            src={product.imageUrl || 'https://via.placeholder.com/400x400?text=Sin+imagen'}
                            className="img-fluid rounded"
                            alt={product.name}
                            loading="lazy"
                            style={{ width: '100%', height: 'auto', objectFit: 'contain', maxHeight: '500px' }}
                            onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/400x400?text=Imagen+no+disponible';
                            }}
                        />
                    </div>

                    <div className="col-md-7">
                        <span className="badge bg-secondary mb-2">{product.categoryName}</span>
                        <h2 className="fw-bold">{product.name}</h2>

                        {product.averageRating > 0 && (
                            <div className="mb-2">
                                <span className="text-warning">
                                    {'★'.repeat(Math.round(product.averageRating))}
                                    {'☆'.repeat(5 - Math.round(product.averageRating))}
                                </span>
                                <span className="text-muted ms-2">
                                    {product.averageRating.toFixed(1)} ({product.reviewCount} reseñas)
                                </span>
                            </div>
                        )}

                        <h3 className="text-primary fw-bold my-3">{product.price}€</h3>

                        <p className="text-muted">{product.description}</p>

                        <p className="mb-3">
                            <span className={`badge ${product.stock > 0 ? 'bg-success' : 'bg-danger'}`}>
                                {product.stock > 0 ? `Stock: ${product.stock}` : 'Sin stock'}
                            </span>
                        </p>

                        {product.stock > 0 && (
                            <div className="d-flex align-items-center gap-3 mb-4">
                                <div className="input-group" style={{ width: '130px' }}>
                                    <button
                                        className="btn btn-outline-secondary"
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    >
                                        -
                                    </button>
                                    <input
                                        type="number"
                                        className="form-control text-center"
                                        value={quantity}
                                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                    />
                                    <button
                                        className="btn btn-outline-secondary"
                                        onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                                    >
                                        +
                                    </button>
                                </div>
                                <button
                                    className="btn btn-primary px-4"
                                    onClick={handleAddToCart}
                                >
                                    Añadir al Carrito
                                </button>

                                <button
                                    className="btn btn-outline-secondary px-4"
                                    onClick={handleAddToWishlist}
                                    disabled={inWishlist}
                                >
                                    {inWishlist ? 'En Favoritos' : 'Añadir a Favoritos'}
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Reseñas */}
                <div className="mt-5">
                    <h4 className="fw-bold mb-4">Reseñas de los clientes</h4>

                    {user && (
                        <div className="card shadow-sm mb-4">
                            <div className="card-body">
                                <h6 className="fw-bold mb-3">Deja tu reseña</h6>
                                <form onSubmit={handleSubmitReview}>
                                    <div className="mb-3">
                                        <label className="form-label">Valoración</label>
                                        <select
                                            className="form-select"
                                            value={reviewForm.rating}
                                            onChange={(e) => setReviewForm({ ...reviewForm, rating: parseInt(e.target.value) })}
                                        >
                                            <option value={5}>5 estrellas</option>
                                            <option value={4}>4 estrellas</option>
                                            <option value={3}>3 estrellas</option>
                                            <option value={2}>2 estrellas</option>
                                            <option value={1}>1 estrella</option>
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Comentario</label>
                                        <textarea
                                            className="form-control"
                                            rows={3}
                                            value={reviewForm.comment}
                                            onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={submittingReview}
                                    >
                                        {submittingReview ? 'Publicando...' : 'Publicar reseña'}
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}

                    {reviews.length === 0 ? (
                        <p className="text-muted">No hay reseñas todavia. Se el primero en opinar.</p>
                    ) : (
                        reviews.map(review => (
                            <div key={review.id} className="card shadow-sm mb-3">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between">
                                        <div>
                                            <strong>{review.userFirstName} {review.userLastName}</strong>
                                            {review.verifiedPurchase && (
                                                <span className="badge bg-success ms-2">Compra verificada</span>
                                            )}
                                        </div>
                                        <span className="text-muted small">
                                            {new Date(review.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <div className="text-warning my-1">
                                        {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                                    </div>
                                    <p className="mb-0">{review.comment}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
}