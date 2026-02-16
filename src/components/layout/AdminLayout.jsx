import { useSelector } from 'react-redux';
import { Navigate, Link, useLocation } from 'react-router-dom';
import Navbar from './Navbar';

export default function AdminLayout({ children }) {
    const { user } = useSelector((state) => state.auth);
    const location = useLocation();

    if (!user || user.role !== 'ADMIN') {
        return <Navigate to="/products" />;
    }

    const menuItems = [
        { path: '/admin', label: 'Dashboard', icon: '📊' },
        { path: '/admin/products', label: 'Productos', icon: '📦' },
        { path: '/admin/categories', label: 'Categorias', icon: '🏷️' },
        { path: '/admin/orders', label: 'Pedidos', icon: '📋' },
        { path: '/admin/users', label: 'Usuarios', icon: '👥' },
        { path: '/admin/coupons', label: 'Cupones', icon: '🎟️' },
    ];

    return (
        <>
            <Navbar />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2 bg-dark min-vh-100 pt-3">
                        <ul className="nav flex-column">
                            {menuItems.map(item => (
                                <li key={item.path} className="nav-item">
                                    <Link
                                        to={item.path}
                                        className={`nav-link ${location.pathname === item.path ? 'text-white fw-bold' : 'text-secondary'}`}
                                    >
                                        {item.icon} {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="col-md-10 py-4">
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
}