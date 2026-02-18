import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
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

export default function OrdersPage() {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(0);

    useEffect(() => {
        if (!user) navigate('/login');
        else fetchOrders();
    }, [user, page]);

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const response = await orderApi.getAll(page);
            setOrders(response.data.content || []);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            toast.error('Error al cargar los pedidos');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = async (orderId) => {
        try {
            await orderApi.cancel(orderId);
            toast.success('Pedido cancelado correctamente');
            fetchOrders();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error al cancelar el pedido');
        }
    };

    return (
        <>
            <Navbar />
            <div className="container py-4">
                <h2 className="fw-bold mb-4">Mis Pedidos</h2>

                {loading ? (
                    <div className="text-center py-5">
                        <div className="spinner-border text-primary"></div>
                    </div>
                ) : orders.length === 0 ? (
                    <div className="text-center py-5">
                        <h5 className="text-muted">No tienes pedidos todavia</h5>
                        <button
                            className="btn btn-primary mt-3"
                            onClick={() => navigate('/products')}
                        >
                            Empezar a comprar
                        </button>
                    </div>
                ) : (
                    orders.map(order => (
                        <div key={order.id} className="card shadow-sm mb-3">
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-start">
                                    <div>
                                        <h6 className="fw-bold mb-1">
                                            Pedido #{order.id}
                                            <span className={`badge bg-${STATUS_COLORS[order.status]} ms-2`}>
                                                {STATUS_LABELS[order.status]}
                                            </span>
                                        </h6>
                                        <p className="text-muted small mb-1">
                                            {new Date(order.createdAt).toLocaleDateString()}
                                        </p>
                                        <p className="text-muted small mb-1">
                                            Tracking: {order.trackingNumber}
                                        </p>
                                        <p className="mb-0">
                                            {order.orderItems?.length} productos
                                        </p>
                                    </div>
                                    <div className="text-end">
                                        <h5 className="text-primary fw-bold">{order.total}€</h5>
                                        <button
                                            className="btn btn-outline-primary btn-sm me-2"
                                            onClick={() => navigate(`/orders/${order.id}`)}
                                        >
                                            Ver detalles
                                        </button>
                                        {order.status === 'PENDING' && (
                                            <button
                                                className="btn btn-outline-danger btn-sm"
                                                onClick={() => handleCancel(order.id)}
                                            >
                                                Cancelar
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}

                {totalPages > 1 && (
                    <nav className="mt-4">
                        <ul className="pagination justify-content-center">
                            <li className={`page-item ${page === 0 ? 'disabled' : ''}`}>
                                <button className="page-link" onClick={() => setPage(page - 1)}>
                                    Anterior
                                </button>
                            </li>
                            <li className={`page-item ${page === totalPages - 1 ? 'disabled' : ''}`}>
                                <button className="page-link" onClick={() => setPage(page + 1)}>
                                    Siguiente
                                </button>
                            </li>
                        </ul>
                    </nav>
                )}
            </div>
        </>
    );
}