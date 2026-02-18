import { useState, useEffect } from 'react';
import { adminApi } from '../../api/adminApi';
import AdminLayout from '../../components/layout/AdminLayout';
import { toast } from 'react-toastify';
import usersIcon from '../../assets/users.png';
import productsIcon from '../../assets/products.png';
import ordersIcon from '../../assets/orders.png';
import pendingIcon from '../../assets/pending.png';
import completedIcon from '../../assets/completed.png';
import reviewsIcon from '../../assets/reviews.png';

import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';

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
        { 
            label: stats?.totalUsers === 1 ? 'Usuario' : 'Usuarios', 
            value: stats?.totalUsers, 
            bgColor: '#e3f2fd',
            borderColor: '#2196f3',
            textColor: '#1976d2',
            icon: usersIcon 
        },
        { 
            label: stats?.totalProducts === 1 ? 'Producto' : 'Productos', 
            value: stats?.totalProducts, 
            bgColor: '#e8f5e9',
            borderColor: '#4caf50',
            textColor: '#388e3c',
            icon: productsIcon 
        },
        { 
            label: stats?.totalOrders === 1 ? 'Pedido' : 'Pedidos', 
            value: stats?.totalOrders, 
            bgColor: '#e1f5fe',
            borderColor: '#03a9f4',
            textColor: '#0288d1',
            icon: ordersIcon 
        },
        { 
            label: stats?.pendingOrders === 1 ? 'Pendiente' : 'Pendientes', 
            value: stats?.pendingOrders, 
            bgColor: '#fff3e0',
            borderColor: '#ff9800',
            textColor: '#f57c00',
            icon: pendingIcon 
        },
        { 
            label: stats?.completedOrders === 1 ? 'Entregado' : 'Entregados', 
            value: stats?.completedOrders, 
            bgColor: '#e0f2f1',
            borderColor: '#009688',
            textColor: '#00796b',
            icon: completedIcon 
        },
        { 
            label: stats?.totalReviews === 1 ? 'Reseña' : 'Reseñas', 
            value: stats?.totalReviews, 
            bgColor: '#f3e5f5',
            borderColor: '#9c27b0',
            textColor: '#7b1fa2',
            icon: reviewsIcon 
        },
    ];

    return (
        <AdminLayout>
            <h3 className="fw-bold mb-4">Dashboard</h3>

            <div className="row g-4 mb-4">
                {statCards.map(card => (
                    <div key={card.label} className="col-md-4 col-lg-2">
                        <div 
                            className="card"
                            style={{
                                backgroundColor: card.bgColor,
                                border: `3px solid ${card.borderColor}`,
                                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                transition: 'transform 0.2s',
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            <div className="card-body text-center py-4">
                                <div 
                                    style={{
                                        width: '60px',
                                        height: '60px',
                                        margin: '0 auto 12px',
                                        backgroundColor: 'white',
                                        borderRadius: '12px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                    }}
                                >
                                    <img 
                                        src={card.icon} 
                                        alt={card.label}
                                        style={{ 
                                            width: '40px', 
                                            height: '40px',
                                            filter: `brightness(0) saturate(100%) ${getColorFilter(card.borderColor)}`
                                        }}
                                    />
                                </div>
                                <h3 className="fw-bold mb-1" style={{ color: card.textColor }}>
                                    {card.value}
                                </h3>
                                <small className="fw-semibold" style={{ color: card.textColor, opacity: 0.8 }}>
                                    {card.label}
                                </small>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="row g-4">
                <div className="col-md-6">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h5 className="fw-bold mb-4">Resumen Financiero</h5>
                            <div className="row text-center g-3">
                                <div className="col-4">
                                    <div className="p-3 rounded" style={{ backgroundColor: '#e8f5e9' }}>
                                        <small className="text-muted d-block mb-1">Ingresos Totales</small>
                                        <span className="fw-bold fs-5" style={{ color: '#388e3c' }}>
                                            {stats?.totalRevenue}€
                                        </span>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="p-3 rounded" style={{ backgroundColor: '#e3f2fd' }}>
                                        <small className="text-muted d-block mb-1">Ingresos de este mes</small>
                                        <span className="fw-bold fs-5" style={{ color: '#1976d2' }}>
                                            {stats?.revenueThisMonth}€
                                        </span>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="p-3 rounded" style={{ backgroundColor: '#fff3e0' }}>
                                        <small className="text-muted d-block mb-1">Rating General</small>
                                        <span className="fw-bold fs-5" style={{ color: '#f57c00' }}>
                                            ★ {stats?.averageRating?.toFixed(1)}
                                        </span>
                                    </div>
                                </div>
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

// Función auxiliar para colorear los iconos (ponla fuera del componente)
function getColorFilter(hexColor) {
    const filters = {
        '#2196f3': 'invert(48%) sepia(79%) saturate(2476%) hue-rotate(189deg) brightness(103%) contrast(97%)',
        '#4caf50': 'invert(64%) sepia(57%) saturate(471%) hue-rotate(76deg) brightness(94%) contrast(87%)',
        '#03a9f4': 'invert(58%) sepia(93%) saturate(1396%) hue-rotate(169deg) brightness(98%) contrast(98%)',
        '#ff9800': 'invert(66%) sepia(82%) saturate(1774%) hue-rotate(359deg) brightness(101%) contrast(107%)',
        '#009688': 'invert(48%) sepia(68%) saturate(494%) hue-rotate(131deg) brightness(95%) contrast(101%)',
        '#9c27b0': 'invert(27%) sepia(89%) saturate(4084%) hue-rotate(285deg) brightness(82%) contrast(92%)',
    };
    return filters[hexColor] || '';
}