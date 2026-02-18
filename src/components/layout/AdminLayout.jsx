import { useSelector } from 'react-redux';
import { Navigate, Link, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import dashboardIcon from '../../assets/dashboard.png';
import productsIcon from '../../assets/products-admin.png';
import categoriesIcon from '../../assets/categories-admin.png';
import ordersIcon from '../../assets/orders-admin.png';
import usersIcon from '../../assets/users-admin.png';
import couponsIcon from '../../assets/coupons-admin.png';
import homeIcon from '../../assets/home.png';

export default function AdminLayout({ children }) {
    const { user } = useSelector((state) => state.auth);
    const location = useLocation();

    if (!user || user.role !== 'ADMIN') {
        return <Navigate to="/products" />;
    }

    const menuItems = [
        { path: '/admin', label: 'Dashboard', icon: dashboardIcon },
        { path: '/admin/products', label: 'Productos', icon: productsIcon },
        { path: '/admin/categories', label: 'Categorias', icon: categoriesIcon },
        { path: '/admin/orders', label: 'Pedidos', icon: ordersIcon },
        { path: '/admin/users', label: 'Usuarios', icon: usersIcon },
        { path: '/admin/coupons', label: 'Cupones', icon: couponsIcon },
    ];

    return (
        <>
            <Navbar />
            <div className="container-fluid">
                <div className="row">
                    {/* Sidebar */}
                    <div 
                        className="col-md-2 p-3 text-white position-sticky"
                        style={{ 
                            backgroundColor: '#1a1a2e',
                            minHeight: 'calc(100vh - 56px)',
                            top: '56px',
                            boxShadow: '2px 0 10px rgba(0,0,0,0.1)'
                        }}
                    >
                        <div className="mb-4 pb-3 border-bottom" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                            <h5 className="fw-bold mb-0">Panel de Control</h5>
                        </div>
                        
                        <ul className="nav flex-column">
                            {menuItems.map(item => (
                                <li key={item.path} className="nav-item mb-1">
                                    <Link
                                        to={item.path}
                                        className="d-flex align-items-center gap-2 text-decoration-none"
                                        style={{
                                            backgroundColor: location.pathname === item.path ? '#20c997' : 'transparent',
                                            color: location.pathname === item.path ? '#1a1a2e' : 'white',
                                            borderRadius: '8px',
                                            transition: 'all 0.2s',
                                            padding: '10px 12px',
                                            fontWeight: location.pathname === item.path ? 'bold' : 'normal',
                                        }}
                                        onMouseEnter={(e) => {
                                            if (location.pathname !== item.path) {
                                                e.currentTarget.style.backgroundColor = 'rgba(32, 201, 151, 0.1)';
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            if (location.pathname !== item.path) {
                                                e.currentTarget.style.backgroundColor = 'transparent';
                                            }
                                        }}
                                    >
                                        <img 
                                            src={item.icon} 
                                            alt={item.label}
                                            style={{ 
                                                width: '20px', 
                                                height: '20px',
                                                filter: location.pathname === item.path 
                                                    ? 'brightness(0)' 
                                                    : 'brightness(0) invert(1)'
                                            }}
                                        />
                                        <span>{item.label}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>

                            <div className="border-top" style={{ borderColor: 'rgba(255,255,255,0.1)', marginTop: '20px', paddingTop: '16px' }}>                            <Link
                                to="/"
                                className="d-flex align-items-center gap-2 text-white text-decoration-none"
                                style={{ 
                                    transition: 'background-color 0.2s',
                                    borderRadius: '8px',
                                    padding: '10px 12px',
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(32, 201, 151, 0.1)'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                            >
                                <img 
                                    src={homeIcon} 
                                    alt="Volver"
                                    style={{ 
                                        width: '15px', 
                                        height: '15px',
                                        filter: 'brightness(0) invert(1)'
                                    }}
                                />
                                <span>Volver a la tienda</span>
                            </Link>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="col-md-10 py-4">
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
}