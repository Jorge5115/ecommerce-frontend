import { useState, useEffect } from 'react';
import { adminApi } from '../../api/adminApi';
import AdminLayout from '../../components/layout/AdminLayout';
import { toast } from 'react-toastify';

const STATUS_LABELS = {
    PENDING: 'Pendiente',
    CONFIRMED: 'Confirmado',
    PROCESSING: 'Procesando',
    SHIPPED: 'Enviado',
    DELIVERED: 'Entregado',
    CANCELLED: 'Cancelado',
};

const STATUS_COLORS = {
    PENDING: 'warning',
    CONFIRMED: 'info',
    PROCESSING: 'primary',
    SHIPPED: 'primary',
    DELIVERED: 'success',
    CANCELLED: 'danger',
};

const STATUS_OPTIONS = ['PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'];

export default function AdminOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        fetchOrders();
    }, [page]);

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const response = await adminApi.getAllOrders(page);
            setOrders(response.data.content || []);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            toast.error('Error al cargar los pedidos');
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (orderId, status) => {
        try {
            await adminApi.updateOrderStatus(orderId, status);
            toast.success('Estado actualizado');
            fetchOrders();
        } catch (error) {
            toast.error('Error al actualizar el estado');
        }
    };

    return (
        <AdminLayout>
            <h3 className="fw-bold mb-4">Pedidos</h3>

            {loading ? (
                <div className="text-center py-5">
                    <div className="spinner-border text-primary"></div>
                </div>
            ) : (
                <div className="card shadow-sm">
                    <div className="table-responsive">
                        <table className="table table-hover mb-0">
                            <thead className="table-dark">
                                <tr>
                                    <th>ID</th>
                                    <th>Usuario</th>
                                    <th>Fecha</th>
                                    <th>Total</th>
                                    <th>Estado</th>
                                    <th>Cambiar estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map(order => (
                                    <tr key={order.id}>
                                        <td>#{order.id}</td>
                                        <td>{order.userEmail}</td>
                                        <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                        <td>{order.total}€</td>
                                        <td>
                                            <span className={`badge bg-${STATUS_COLORS[order.status]}`}>
                                                {STATUS_LABELS[order.status]}
                                            </span>
                                        </td>
                                        <td>
                                            <select
                                                className="form-select form-select-sm"
                                                style={{ width: '160px' }}
                                                value={order.status}
                                                onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                            >
                                                {STATUS_OPTIONS.map(s => (
                                                    <option key={s} value={s}>{STATUS_LABELS[s]}</option>
                                                ))}
                                            </select>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {totalPages > 1 && (
                <nav className="mt-4">
                    <ul className="pagination justify-content-center">
                        <li className={`page-item ${page === 0 ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={() => setPage(page - 1)}>Anterior</button>
                        </li>
                        <li className={`page-item ${page === totalPages - 1 ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={() => setPage(page + 1)}>Siguiente</button>
                        </li>
                    </ul>
                </nav>
            )}
        </AdminLayout>
    );
}