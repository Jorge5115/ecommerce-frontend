import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { register, clearError } from '../../features/auth/authSlice';
import { toast } from 'react-toastify';

export default function RegisterPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (error) dispatch(clearError());
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await dispatch(register(formData));
        if (register.fulfilled.match(result)) {
            toast.success('¡Cuenta creada correctamente!');
            navigate('/products');
        }
    };

    return (
        <div className="min-vh-100 bg-light d-flex align-items-center justify-content-center py-5">
            <div className="card shadow-lg p-4" style={{ maxWidth: '450px', width: '100%' }}>
                <h2 className="text-center fw-bold mb-1">Crear Cuenta</h2>
                <p className="text-center text-muted mb-4">Únete a nuestra tienda</p>

                {error && (
                    <div className="alert alert-danger">{error}</div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="row mb-3">
                        <div className="col">
                            <label className="form-label fw-medium">Nombre</label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                                className="form-control"
                                placeholder="Jorge"
                            />
                        </div>
                        <div className="col">
                            <label className="form-label fw-medium">Apellido</label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                                className="form-control"
                                placeholder="García"
                            />
                        </div>
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="form-control"
                            placeholder="tu@email.com"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="form-label fw-medium">Contraseña</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="form-control"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn btn-primary w-100 py-2"
                    >
                        {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
                    </button>
                </form>

                <p className="text-center text-muted mt-4 mb-0">
                    ¿Ya tienes cuenta?{' '}
                    <Link to="/login" className="text-primary fw-medium">
                        Inicia sesión
                    </Link>
                </p>
            </div>
        </div>
    );
}