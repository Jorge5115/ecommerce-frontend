import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { wishlistApi } from '../../api/wishlistApi';
import { fetchCart } from '../../features/cart/cartSlice';
import Navbar from '../../components/layout/Navbar';
import { toast } from 'react-toastify';

export default function WishlistPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) navigate('/login');
        else fetchWishlist();
    }, [user]);

    const fetchWishlist = async () => {
        try {
            const response = await wishlistApi.getAll();
            setWishlist(response.data);
        } catch (error) {
            toast.error('Error al cargar la wishlist');
        } finally {
            setLoading(false);
        }
    };

    const handleRemove = async (productId) => {
        try {
            await wishlistApi.remove(productId);
            toast.success('Producto eliminado de la wishlist');
            fetchWishlist();
        } catch (error) {
            toast.error('Error al eliminar el producto');
        }
    };

    const handleMoveToCart = async (productId) => {
        try {
            await wishlistApi.moveToCart(productId);
            dispatch(fetchCart());
            toast.success('Producto movido al carrito');
            fetchWishlist();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error al mover al carrito');
        }
    };

    return (
        <>
            <Navbar />
            <div className="container py-4">
                <h2 className="fw-bold mb-4">Mi Wishlist</h2>

                {loading ? (
                    <div className="text-center py-5">
                        <div className="spinner-border text-primary"></div>
                    </div>
                ) : wishlist.length === 0 ? (
                    <div className="text-center py-5">
                        <h5 className="text-muted">Tu wishlist esta vacia</h5>
                        <button
                            className="btn btn-primary mt-3"
                            onClick={() => navigate('/products')}
                        >
                            Ver productos
                        </button>
                    </div>
                ) : (
                    <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
                        {wishlist.map(item => (
                            <div key={item.id} className="col">
                                <div className="card h-100 shadow-sm" style={{ display: 'flex', flexDirection: 'column' }}>
                                    <img
                                        src={item.productImage || 'https://via.placeholder.com/300x200'}
                                        className="card-img-top"
                                        alt={item.productName}
                                        style={{ height: '200px', objectFit: 'cover', cursor: 'pointer' }}
                                        onClick={() => navigate(`/products/${item.productId}`)}
                                    />
                                    <div className="card-body d-flex flex-column" style={{ flex: 1 }}>
                                        <h6
                                            className="card-title fw-bold"
                                            style={{ cursor: 'pointer', minHeight: '48px' }}
                                            onClick={() => navigate(`/products/${item.productId}`)}
                                        >
                                            {item.productName}
                                        </h6>
                                        <p className="text-primary fw-bold fs-5">{item.productPrice}€</p>
                                        <span className={`badge ${item.productActive ? 'bg-success' : 'bg-danger'} mb-2 align-self-start`}>
                                            {item.productActive ? 'Disponible' : 'No disponible'}
                                        </span>
                                        <div className="mt-auto d-flex gap-2">
                                            <button
                                                className="btn btn-primary btn-sm flex-grow-1"
                                                onClick={() => handleMoveToCart(item.productId)}
                                                disabled={!item.productActive}
                                            >
                                                Mover al carrito
                                            </button>
                                            <button
                                                className="btn btn-outline-danger btn-sm"
                                                onClick={() => handleRemove(item.productId)}
                                            >
                                                X
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}