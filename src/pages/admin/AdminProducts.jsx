import { useState, useEffect } from 'react';
import { adminApi } from '../../api/adminApi';
import { productApi } from '../../api/productApi';
import AdminLayout from '../../components/layout/AdminLayout';
import { toast } from 'react-toastify';
import ProductGalleryPicker from '../../components/ui/ProductGalleryPicker';

export default function AdminProducts() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        stock: '',
        categoryId: '',
        imageUrl: '',
        active: true,
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [productsRes, categoriesRes] = await Promise.all([
                productApi.getAll(0, 100),
                adminApi.getCategories(),
            ]);
            setProducts(productsRes.data.content || []);
            setCategories(categoriesRes.data);
        } catch (error) {
            toast.error('Error al cargar los datos');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (product) => {
        setEditing(product);
        setFormData({
            name: product.name,
            description: product.description || '',
            price: product.price,
            stock: product.stock,
            categoryId: product.categoryId || '',
            imageUrl: product.imageUrl || '',
            active: product.active,
        });
        setShowModal(true);
    };

    const handleNew = () => {
        setEditing(null);
        setFormData({
            name: '',
            description: '',
            price: '',
            stock: '',
            categoryId: '',
            imageUrl: '',
            active: true,
        });
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editing) {
                await adminApi.updateProduct(editing.id, formData);
                toast.success('Producto actualizado');
            } else {
                await adminApi.createProduct(formData);
                toast.success('Producto creado');
            }
            setShowModal(false);
            fetchData();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error al guardar');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Seguro que quieres eliminar este producto?')) return;
        try {
            await adminApi.deleteProduct(id);
            toast.success('Producto eliminado');
            fetchData();
        } catch (error) {
            toast.error('Error al eliminar el producto');
        }
    };

    return (
        <AdminLayout>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="fw-bold mb-0">Productos</h3>
                <button className="btn btn-primary" onClick={handleNew}>
                    + Nuevo Producto
                </button>
            </div>

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
                                    <th>Precio</th>
                                    <th>Stock</th>
                                    <th>Categoria</th>
                                    <th>Estado</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map(product => (
                                    <tr key={product.id}>
                                        <td>{product.id}</td>
                                        <td>{product.name}</td>
                                        <td>{product.price}€</td>
                                        <td>{product.stock}</td>
                                        <td>{product.categoryName}</td>
                                        <td>
                                            <span className={`badge ${product.active ? 'bg-success' : 'bg-danger'}`}>
                                                {product.active ? 'Activo' : 'Inactivo'}
                                            </span>
                                        </td>
                                        <td>
                                            <button
                                                className="btn btn-sm btn-outline-primary me-2"
                                                onClick={() => handleEdit(product)}
                                            >
                                                Editar
                                            </button>
                                            <button
                                                className="btn btn-sm btn-outline-danger"
                                                onClick={() => handleDelete(product.id)}
                                            >
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {showModal && (
                <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title fw-bold">
                                    {editing ? 'Editar Producto' : 'Nuevo Producto'}
                                </h5>
                                <button className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="row mb-3">
                                        <div className="col">
                                            <label className="form-label">Nombre</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="col">
                                            <label className="form-label">Categoria</label>
                                            <select
                                                className="form-select"
                                                value={formData.categoryId}
                                                onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                                                required
                                            >
                                                <option value="">Selecciona categoria</option>
                                                {categories.map(cat => (
                                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                                ))}
                                            </select>
                                        </div>
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
                                    <div className="row mb-3">
                                        <div className="col">
                                            <label className="form-label">Precio</label>
                                            <input
                                                type="number"
                                                step="0.01"
                                                className="form-control"
                                                value={formData.price}
                                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="col">
                                            <label className="form-label">Stock</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                value={formData.stock}
                                                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <ProductGalleryPicker
                                            currentImage={formData.imageUrl}
                                            onImageSelected={(url) => setFormData({ ...formData, imageUrl: url })}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <div className="form-check">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                id="active"
                                                checked={formData.active}
                                                onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                                            />
                                            <label className="form-check-label" htmlFor="active">
                                                Producto activo
                                            </label>
                                        </div>
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
                                            {editing ? 'Guardar cambios' : 'Crear producto'}
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