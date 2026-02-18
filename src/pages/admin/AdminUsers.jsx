import { useState, useEffect } from 'react';
import { adminApi } from '../../api/adminApi';
import AdminLayout from '../../components/layout/AdminLayout';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

export default function AdminUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user: currentUser } = useSelector((state) => state.auth);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await adminApi.getUsers();
            setUsers(response.data);
        } catch (error) {
            toast.error('Error al cargar los usuarios');
        } finally {
            setLoading(false);
        }
    };

    const handleToggleRole = async (id) => {
        try {
            await adminApi.toggleUserRole(id);
            toast.success('Rol actualizado');
            fetchUsers();
        } catch (error) {
            toast.error('Error al cambiar el rol');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Seguro que quieres eliminar este usuario?')) return;
        try {
            await adminApi.deleteUser(id);
            toast.success('Usuario eliminado');
            fetchUsers();
        } catch (error) {
            toast.error('Error al eliminar el usuario');
        }
    };

    return (
        <AdminLayout>
            <h3 className="fw-bold mb-4">Usuarios</h3>

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
                                    <th>Nombre</th>
                                    <th>Email</th>
                                    <th>Rol</th>
                                    <th>Fecha registro</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(user => (
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.firstName} {user.lastName}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            <span className={`badge ${user.role === 'ADMIN' ? 'bg-danger' : 'bg-primary'}`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                                        <td>
                                            <span className="text-muted small">
                                                Deshabilitado por seguridad
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}