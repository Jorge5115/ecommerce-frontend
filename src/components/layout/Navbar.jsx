import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../features/auth/authSlice';
import { toast } from 'react-toastify';

export default function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    const { totalItems } = useSelector((state) => state.cart);

    const handleLogout = () => {
        dispatch(logout());
        toast.info('Sesion cerrada');
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
            <Link className="navbar-brand fw-bold" to="/products">
                Stack Shop
            </Link>

            <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
            >
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav me-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/products">Productos</Link>
                    </li>
                    {user && (
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" to="/orders">Mis Pedidos</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/wishlist">Wishlist</Link>
                            </li>
                        </>
                    )}
                    {user?.role === 'ADMIN' && (
                        <li className="nav-item">
                            <Link className="nav-link text-warning" to="/admin">Admin</Link>
                        </li>
                    )}
                </ul>

                <ul className="navbar-nav">
                    {user ? (
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" to="/cart">
                                    Carrito
                                    {totalItems > 0 && (
                                        <span className="badge bg-danger ms-1">{totalItems}</span>
                                    )}
                                </Link>
                            </li>
                            <li className="nav-item dropdown">
                                <button
                                    className="nav-link dropdown-toggle btn btn-link"
                                    data-bs-toggle="dropdown"
                                >
                                    {user.firstName}
                                </button>
                                <ul className="dropdown-menu dropdown-menu-end">
                                    <li>
                                        <Link className="dropdown-item" to="/profile">Mi Perfil</Link>
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
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">Iniciar Sesion</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/register">Registrarse</Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
}