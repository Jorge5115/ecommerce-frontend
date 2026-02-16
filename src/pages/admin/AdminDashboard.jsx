import { useState, useEffect } from 'react';
import { adminApi } from '../../api/adminApi';
import AdminLayout from '../../components/layout/AdminLayout';
import { toast } from 'react-toastify';

export default function AdminDashboard() {
    const [stats, setStats] = useState(null);
    const [topProducts, setTopProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [statsRes, topRes] = await Promise.all([
                adminApi.getDashboard(),
                adminApi.getTopProducts(),
            ]);
            setStats(statsRes.data);
            setTopProducts(topRes.data);
        } catch (error) {
            toast.error('Error al cargar el dashboard');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return (
        <AdminLayout>
            <div className="text-center py-5">
                <div className="spinner-border text-primary"></div>
            </div>
        </AdminLayout>
    );

    const statCards = [
        { label: 'Usuarios', value: stats?.totalUsers, color: 'primary', icon: '👥' },
        { label: 'Productos', value: stats?.totalProducts, color: 'success', icon: '📦' },
        { label: 'Pedidos', value: stats?.totalOrders, color: 'info', icon: '📋' },
        { label: 'Pendientes', value: stats?.pendingOrders, color: 'warning', icon: '⏳' },
        { label: 'Entregados', value: stats?.completedOrders, color: 'success', icon: '✅' },
        { label: 'Resenas', value: stats?.totalReviews, color: 'secondary', icon: '⭐' },
    ];

    return (
        <AdminLayout>
            <h3 className="fw-bold mb-4">Dashboard</h3>

            <div className="row g-3 mb-4">
                {statCards.map(card => (
                    <div key={card.label} className="col-md-4 col-lg-2">
                        <div className={`card border-${card.color} shadow-sm`}>
                            <div className="card-body text-center">
                                <div className="fs-3">{card.icon}</div>
                                <h4 className={`fw-bold text-${card.color}`}>{card.value}</h4>
                                <small className="text-muted">{card.label}</small>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="row g-4">
                <div className="col-md-6">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h5 className="fw-bold mb-3">Ingresos</h5>
                            <div className="d-flex justify-content-between mb-2">
                                <span className="text-muted">Total ingresos</span>
                                <span className="fw-bold text-success">{stats?.totalRevenue}€</span>
                            </div>
                            <div className="d-flex justify-content-between">
                                <span className="text-muted">Ingresos este mes</span>
                                <span className="fw-bold text-primary">{stats?.revenueThisMonth}€</span>
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between">
                                <span className="text-muted">Valoracion media</span>
                                <span className="fw-bold text-warning">
                                    ★ {stats?.averageRating?.toFixed(1)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h5 className="fw-bold mb-3">Top 5 Productos</h5>
                            {topProducts.length === 0 ? (
                                <p className="text-muted">No hay datos todavia</p>
                            ) : (
                                topProducts.map((product, index) => (
                                    <div key={product.productId} className="d-flex justify-content-between mb-2">
                                        <span>
                                            <strong>#{index + 1}</strong> {product.productName}
                                        </span>
                                        <span className="text-muted small">
                                            {product.totalSold} uds
                                        </span>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}