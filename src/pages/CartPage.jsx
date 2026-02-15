import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchCart, removeFromCart, clearCart } from '../features/cart/cartSlice';
import Navbar from '../components/layout/Navbar';
import { toast } from 'react-toastify';
import axiosInstance from '../api/axios';

export default function CartPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { items, total, totalItems, loading } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        if (user) dispatch(fetchCart());
    }, [user]);

    const handleRemove = async (productId) => {
        const result = await dispatch(removeFromCart(productId));
        if (removeFromCart.fulfilled.match(result)) {
            toast.success('Producto eliminado del carrito');
        }
    };

    const handleClear = async () => {
        const result = await dispatch(clearCart());
        if (clearCart.fulfilled.match(result)) {
            toast.info('Carrito vaciado');
        }
    };

    const handleUpdateQuantity = async (productId, quantity) => {
        try {
            const response = await axiosInstance.put(`/cart/update/${productId}?quantity=${quantity}`);
            dispatch(fetchCart());
        } catch (error) {
            toast.error('Error al actualizar cantidad');
        }
    };

    if (!user) {
        return (
            <>
                <Navbar />
                <div className="container py-5 text-center">
                    <h4>Debes iniciar sesion para ver tu carrito</h4>
                    <button className="btn btn-primary mt-3" onClick={() => navigate('/login')}>
                        Iniciar Sesion
                    </button>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className="container py-4">
                <h2 className="fw-bold mb-4">Tu Carrito</h2>

                {items.length === 0 ? (
                    <div className="text-center py-5">
                        <h5 className="text-muted">Tu carrito esta vacio</h5>
                        <button
                            className="btn btn-primary mt-3"
                            onClick={() => navigate('/products')}
                        >
                            Ver productos
                        </button>
                    </div>
                ) : (
                    <div className="row g-4">
                        <div className="col-md-8">
                            {items.map(item => (
                                <div key={item.productId} className="card shadow-sm mb-3">
                                    <div className="card-body">
                                        <div className="row align-items-center">
                                            <div className="col-md-2">
                                                <img
                                                    src={item.productImage || 'https://via.placeholder.com/80'}
                                                    alt={item.productName}
                                                    className="img-fluid rounded"
                                                />
                                            </div>
                                            <div className="col-md-4">
                                                <h6 className="fw-bold mb-1">{item.productName}</h6>
                                                <span className="text-primary fw-bold">{item.price}€</span>
                                            </div>
                                            <div className="col-md-3">
                                                <div className="input-group input-group-sm">
                                                    <button
                                                        className="btn btn-outline-secondary"
                                                        onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)}
                                                    >
                                                        -
                                                    </button>
                                                    <input
                                                        type="number"
                                                        className="form-control text-center"
                                                        value={item.quantity}
                                                        readOnly
                                                    />
                                                    <button
                                                        className="btn btn-outline-secondary"
                                                        onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="col-md-2 text-center">
                                                <span className="fw-bold">{item.subtotal}€</span>
                                            </div>
                                            <div className="col-md-1 text-end">
                                                <button
                                                    className="btn btn-sm btn-outline-danger"
                                                    onClick={() => handleRemove(item.productId)}
                                                >
                                                    X
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <button
                                className="btn btn-outline-danger btn-sm"
                                onClick={handleClear}
                            >
                                Vaciar carrito
                            </button>
                        </div>

                        <div className="col-md-4">
                            <div className="card shadow-sm">
                                <div className="card-body">
                                    <h5 className="fw-bold mb-3">Resumen</h5>
                                    <div className="d-flex justify-content-between mb-2">
                                        <span>Productos ({totalItems})</span>
                                        <span>{total}€</span>
                                    </div>
                                    <hr />
                                    <div className="d-flex justify-content-between fw-bold fs-5">
                                        <span>Total</span>
                                        <span className="text-primary">{total}€</span>
                                    </div>
                                    <button
                                        className="btn btn-primary w-100 mt-3"
                                        onClick={() => navigate('/checkout')}
                                    >
                                        Proceder al pago
                                    </button>
                                    <button
                                        className="btn btn-outline-secondary w-100 mt-2"
                                        onClick={() => navigate('/products')}
                                    >
                                        Seguir comprando
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}