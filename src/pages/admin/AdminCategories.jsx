import { useState, useEffect } from 'react';
import { adminApi } from '../../api/adminApi';
import AdminLayout from '../../components/layout/AdminLayout';
import { toast } from 'react-toastify';

export default function AdminCategories() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        imageUrl: '',
    });

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await adminApi.getCategories();
            setCategories(response.data);
        } catch (error) {
            toast.error('Error al cargar las categorias');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await adminApi.createCategory(formData);
            toast.success('Categoria creada correctamente');
            setShowModal(false);
            setFormData({ name: '', description: '', imageUrl: '' });
            fetchCategories();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error al crear la categoria');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Seguro que quieres eliminar esta categoria?')) return;
        try {
            await adminApi.deleteCategory(id);
            toast.success('Categoria eliminada');
            fetchCategories();
        } catch (error) {
            toast.error('Error al eliminar la categoria');
        }
    };

    return (
        <AdminLayout>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="fw-bold mb-0">Categorias</h3>
                <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                    + Nueva Categoria
                </button>
            </div>

            {loading ? (
                <div className="text-center py-5">
                    <div className="spinner-border text-primary"></div>
                </div>
            ) : (
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    {categories.map(cat => (
                        <div key={cat.id} className="col">
                            <div className="card shadow-sm h-100">
                                {cat.imageUrl && (
                                    <img
                                        src={cat.imageUrl}
                                        className="card-img-top"
                                        alt={cat.name}
                                        style={{ height: '150px', objectFit: 'cover' }}
                                    />
                                )}
                                <div className="card-body">
                                    <h5 className="fw-bold">{cat.name}</h5>
                                    <p className="text-muted small">{cat.description}</p>
                                    <span className="badge bg-secondary">
                                        {cat.productCount} productos
                                    </span>
                                </div>
                                <div className="card-footer bg-transparent">
                                    <button
                                        className="btn btn-sm btn-outline-danger w-100"
                                        onClick={() => handleDelete(cat.id)}
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {showModal && (
                <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title fw-bold">Nueva Categoria</h5>
                                <button className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label className="form-label">Nombre</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Descripcion</label>
                                        <textarea
                                            className="form-control"
                                            rows={3}
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">URL Imagen</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={formData.imageUrl}
                                            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                                            placeholder="https://ejemplo.com/imagen.jpg"
                                        />
                                    </div>
                                    <div className="modal-footer px-0 pb-0">
                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            onClick={() => setShowModal(false)}
                                        >
                                            Cancelar
                                        </button>
                                        <button type="submit" className="btn btn-primary">
                                            Crear categoria
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}