import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { orderApi } from '../api/orderApi';
import Navbar from '../components/layout/Navbar';
import { toast } from 'react-toastify';

const STATUS_COLORS = {
    PENDING: 'warning',
    CONFIRMED: 'info',
    PROCESSING: 'primary',
    SHIPPED: 'primary',
    DELIVERED: 'success',
    CANCELLED: 'danger',
};

const STATUS_LABELS = {
    PENDING: 'Pendiente',
    CONFIRMED: 'Confirmado',
    PROCESSING: 'Procesando',
    SHIPPED: 'Enviado',
    DELIVERED: 'Entregado',
    CANCELLED: 'Cancelado',
};

export default function OrderDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrder();
    }, [id]);

    const fetchOrder = async () => {
        try {
            const response = await orderApi.getById(id);
            setOrder(response.data);
        } catch (error) {
            toast.error('Pedido no encontrado');
            navigate('/orders');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = async () => {
        try {
            await orderApi.cancel(id);
            toast.success('Pedido cancelado');
            fetchOrder();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error al cancelar');
        }
    };

    if (loading) return (
        <>
            <Navbar />
            <div className="text-center py-5">
                <div className="spinner-border text-primary"></div>
            </div>
        </>
    );

    if (!order) return null;

    return (
        <>
            <Navbar />
            <div className="container py-4">
                <button
                    className="btn btn-outline-secondary mb-4"
                    onClick={() => navigate('/orders')}
                >
                    Volver a mis pedidos
                </button>

                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="fw-bold mb-0">Pedido #{order.id}</h2>
                    <span className={`badge bg-${STATUS_COLORS[order.status]} fs-6`}>
                        {STATUS_LABELS[order.status]}
                    </span>
                </div>

                <div className="row g-4">
                    <div className="col-md-8">
                        <div className="card shadow-sm mb-3">
                            <div className="card-body">
                                <h6 className="fw-bold mb-3">Productos</h6>
                                {order.orderItems?.map(item => (
                                    <div key={item.id} className="d-flex align-items-center mb-3">
                                        <img
                                            src={item.productImage || 'https://via.placeholder.com/60'}
                                            alt={item.productName}
                                            className="rounded me-3"
                                            style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                                        />
                                        <div className="flex-grow-1">
                                            <h6 className="mb-0">{item.productName}</h6>
                                            <small className="text-muted">{item.price}€ x {item.quantity}</small>
                                        </div>
                                        <span className="fw-bold">{item.subtotal}€</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="card shadow-sm">
                            <div className="card-body">
                                <h6 className="fw-bold mb-3">Datos de envio</h6>
                                <p className="mb-1">{order.shippingAddress}</p>
                                <p className="mb-1">{order.shippingCity}, {order.shippingPostalCode}</p>
                                <p className="mb-1">{order.shippingCountry}</p>
                                <p className="mb-0 text-muted">
                                    Tracking: <strong>{order.trackingNumber}</strong>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card shadow-sm mb-3">
                            <div className="card-body">
                                <h6 className="fw-bold mb-3">Resumen</h6>
                                <div className="d-flex justify-content-between mb-2">
                                    <span>Subtotal</span>
                                    <span>{order.subtotal}€</span>
                                </div>
                                {order.discount > 0 && (
                                    <div className="d-flex justify-content-between mb-2 text-success">
                                        <span>Descuento</span>
                                        <span>-{order.discount}€</span>
                                    </div>
                                )}
                                <div className="d-flex justify-content-between mb-2">
                                    <span>IVA (21%)</span>
                                    <span>{order.tax}€</span>
                                </div>
                                <hr />
                                <div className="d-flex justify-content-between fw-bold fs-5">
                                    <span>Total</span>
                                    <span className="text-primary">{order.total}€</span>
                                </div>
                            </div>
                        </div>

                        <div className="card shadow-sm">
                            <div className="card-body">
                                <h6 className="fw-bold mb-3">Informacion</h6>
                                <p className="mb-1 small">
                                    <strong>Fecha:</strong> {new Date(order.createdAt).toLocaleDateString()}
                                </p>
                                <p className="mb-1 small">
                                    <strong>Pago:</strong> {order.paymentMethod}
                                </p>
                                {order.status === 'PENDING' && (
                                    <button
                                        className="btn btn-outline-danger w-100 mt-3"
                                        onClick={handleCancel}
                                    >
                                        Cancelar pedido
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}