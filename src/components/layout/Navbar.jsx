import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { logout } from '../../features/auth/authSlice';
import { toast } from 'react-toastify';
import cartIcon from '../../assets/cart.png';
import accountIcon from '../../assets/account.png';

export default function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useSelector((state) => state.auth);
    const { totalItems } = useSelector((state) => state.cart);

    const handleLogout = () => {
        dispatch(logout());
        toast.info('Sesion cerrada');
        navigate('/login');
    };

    const navItems = [
        { path: '/products', label: 'Productos', show: true },
        { path: '/orders', label: 'Mis Pedidos', show: !!user },
        { path: '/wishlist', label: 'Wishlist', show: !!user },
        { path: '/admin', label: 'Backend', show: user?.role === 'ADMIN' },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <nav style={{ backgroundColor: '#0a2a2a' }} className="text-white shadow-sm">
            <div className="container">
                <div className="d-flex justify-content-between align-items-center py-3">
                    {/* Logo */}
                    <Link to="/" className="text-white text-decoration-none fw-bold fs-4">
                        Stack Shop
                    </Link>

                    {/* Links centrados */}
                    <div className="d-flex gap-4 align-items-center">
                        {navItems.filter(item => item.show).map(item => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className="text-decoration-none position-relative"
                                style={{
                                    color: isActive(item.path) ? '#20c997' : 'white',
                                    transition: 'color 0.3s',
                                    paddingBottom: '8px',
                                }}
                                onMouseEnter={(e) => e.target.style.color = '#20c997'}
                                onMouseLeave={(e) => e.target.style.color = isActive(item.path) ? '#20c997' : 'white'}
                            >
                                {item.label}
                                {isActive(item.path) && (
                                    <div
                                        style={{
                                            position: 'absolute',
                                            bottom: 0,
                                            left: '50%',
                                            transform: 'translateX(-50%)',
                                            width: 0,
                                            height: 0,
                                            borderLeft: '6px solid transparent',
                                            borderRight: '6px solid transparent',
                                            borderBottom: '6px solid #20c997',
                                        }}
                                    />
                                )}
                            </Link>
                        ))}
                    </div>

                    {/* Usuario y carrito */}
                    <div className="d-flex gap-3 align-items-center">
                        {user ? (
                            <>
                                <Link
                                    to="/cart"
                                    className="text-white text-decoration-none position-relative d-flex align-items-center gap-1"
                                    style={{ transition: 'color 0.3s' }}
                                    onMouseEnter={(e) => e.target.style.color = '#20c997'}
                                    onMouseLeave={(e) => e.target.style.color = 'white'}
                                >
                                    <img 
                                        src={cartIcon} 
                                        alt="Carrito" 
                                        style={{ width: '24px', height: '24px' }} 
                                    />
                                    
                                    Carrito
                                    {totalItems > 0 && (
                                        <span
                                            className="position-absolute top-0 start-100 translate-middle badge rounded-pill"
                                            style={{ backgroundColor: '#20c997' }}
                                        >
                                            {totalItems}
                                        </span>
                                    )}
                                </Link>

                                <div className="dropdown">
                                    <button
                                        className="btn btn-link text-white text-decoration-none dropdown-toggle d-flex align-items-center gap-1"
                                        data-bs-toggle="dropdown"
                                        style={{ transition: 'color 0.3s' }}
                                        onMouseEnter={(e) => e.target.style.color = '#20c997'}
                                        onMouseLeave={(e) => e.target.style.color = 'white'}
                                    >
                                    <img 
                                        src={accountIcon} 
                                        alt="Cuenta" 
                                        style={{ width: '24px', height: '24px' }} 
                                    />
                                    
                                    {user.firstName}
                                    </button>
                                    <ul className="dropdown-menu dropdown-menu-end">
                                        <li>
                                            <Link className="dropdown-item" to="/profile">
                                                Mi Perfil
                                            </Link>
                                        </li>
                                        <li><hr className="dropdown-divider" /></li>
                                        <li>
                                            <button
                                                className="dropdown-item text-danger"
                                                onClick={handleLogout}
                                            >
                                                Cerrar Sesion
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="btn btn-sm"
                                    style={{
                                        border: '1px solid white',
                                        color: 'white',
                                        backgroundColor: 'transparent',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.backgroundColor = 'white';
                                        e.target.style.color = '#0a2a2a';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.backgroundColor = 'transparent';
                                        e.target.style.color = 'white';
                                    }}
                                >
                                    Iniciar Sesion
                                </Link>
                                <Link
                                    to="/register"
                                    className="btn btn-sm"
                                    style={{ backgroundColor: '#20c997', color: 'white', border: 'none' }}
                                >
                                    Registrarse
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}