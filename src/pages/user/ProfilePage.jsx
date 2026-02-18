import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userApi } from '../../api/userApi';
import Navbar from '../../components/layout/Navbar';
import { toast } from 'react-toastify';

export default function ProfilePage() {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        currentPassword: '',
        newPassword: '',
    });

    useEffect(() => {
        if (!user) navigate('/login');
        else fetchProfile();
    }, [user]);

    const fetchProfile = async () => {
        try {
            const response = await userApi.getProfile();
            setProfile(response.data);
            setFormData({
                firstName: response.data.firstName || '',
                lastName: response.data.lastName || '',
                phone: response.data.phone || '',
                currentPassword: '',
                newPassword: '',
            });
        } catch (error) {
            toast.error('Error al cargar el perfil');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const dataToSend = { ...formData };
            if (!dataToSend.newPassword) {
                delete dataToSend.newPassword;
                delete dataToSend.currentPassword;
            }
            await userApi.updateProfile(dataToSend);
            toast.success('Perfil actualizado correctamente');
            fetchProfile();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error al actualizar el perfil');
        } finally {
            setSaving(false);
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

    return (
        <>
            <Navbar />
            <div className="container py-4">
                <h2 className="fw-bold mb-4">Mi Perfil</h2>

                <div className="row g-4">
                    <div className="col-md-4">
                        <div className="card shadow-sm text-center">
                            <div className="card-body py-4">
                                <div
                                    className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto mb-3"
                                    style={{ width: '80px', height: '80px', fontSize: '2rem' }}
                                >
                                    {profile?.firstName?.charAt(0).toUpperCase()}
                                </div>
                                <h5 className="fw-bold">{profile?.firstName} {profile?.lastName}</h5>
                                <p className="text-muted mb-1">{profile?.email}</p>
                                <span className={`badge ${profile?.role === 'ADMIN' ? 'bg-danger' : 'bg-primary'}`}>
                                    {profile?.role}
                                </span>
                                <p className="text-muted small mt-3 mb-0">
                                    Miembro desde {new Date(profile?.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                        </div>

                        <div className="card shadow-sm mt-3">
                            <div className="card-body">
                                <h6 className="fw-bold mb-3">Accesos rapidos</h6>
                                <div className="d-grid gap-2">
                                    <button
                                        className="btn btn-outline-primary btn-sm"
                                        onClick={() => navigate('/orders')}
                                    >
                                        Mis Pedidos
                                    </button>
                                    <button
                                        className="btn btn-outline-secondary btn-sm"
                                        onClick={() => navigate('/wishlist')}
                                    >
                                        Favoritos
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-8">
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <h5 className="fw-bold mb-4">Editar datos</h5>
                                <form onSubmit={handleSubmit}>
                                    <div className="row mb-3">
                                        <div className="col">
                                            <label className="form-label">Nombre</label>
                                            <input
                                                type="text"
                                                name="firstName"
                                                className="form-control"
                                                value={formData.firstName}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="col">
                                            <label className="form-label">Apellidos</label>
                                            <input
                                                type="text"
                                                name="lastName"
                                                className="form-control"
                                                value={formData.lastName}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Teléfono</label>
                                        <input
                                            type="text"
                                            name="phone"
                                            className="form-control"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="612345678"
                                        />
                                    </div>

                                    <hr />
                                    <h6 className="fw-bold mb-3">Cambiar contraseña (opcional)</h6>

                                    <div className="mb-3">
                                        <label className="form-label">Contraseña actual</label>
                                        <input
                                            type="password"
                                            name="currentPassword"
                                            className="form-control"
                                            value={formData.currentPassword}
                                            onChange={handleChange}
                                            placeholder="Deja vacio para no cambiar"
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label className="form-label">Nueva contraseña</label>
                                        <input
                                            type="password"
                                            name="newPassword"
                                            className="form-control"
                                            value={formData.newPassword}
                                            onChange={handleChange}
                                            placeholder="Minimo 6 caracteres"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={saving}
                                    >
                                        {saving ? 'Guardando...' : 'Guardar cambios'}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}