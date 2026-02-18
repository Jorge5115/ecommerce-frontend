import { useState, useEffect } from 'react';
import { adminApi } from '../../api/adminApi';
import AdminLayout from '../../components/layout/AdminLayout';
import { toast } from 'react-toastify';

export default function AdminCoupons() {
    const [coupons, setCoupons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        code: '',
        discountPercentage: '',
        discountAmount: '',
        minPurchaseAmount: '',
        validFrom: '',
        validTo: '',
        usageLimit: '',
    });

    useEffect(() => {
        fetchCoupons();
    }, []);

    const fetchCoupons = async () => {
        try {
            const response = await adminApi.getCoupons();
            setCoupons(response.data);
        } catch (error) {
            toast.error('Error al cargar los cupones');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const dataToSend = {
                ...formData,
                discountPercentage: formData.discountPercentage || null,
                discountAmount: formData.discountAmount || null,
                minPurchaseAmount: formData.minPurchaseAmount || null,
                usageLimit: formData.usageLimit || null,
                validFrom: formData.validFrom + ':00',
                validTo: formData.validTo + ':00',
            };
            await adminApi.createCoupon(dataToSend);
            toast.success('Cupon creado correctamente');
            setShowModal(false);
            setFormData({
                code: '',
                discountPercentage: '',
                discountAmount: '',
                minPurchaseAmount: '',
                validFrom: '',
                validTo: '',
                usageLimit: '',
            });
            fetchCoupons();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error al crear el cupon');
        }
    };

    const handleToggle = async (id) => {
        try {
            await adminApi.toggleCoupon(id);
            toast.success('Estado del cupon actualizado');
            fetchCoupons();
        } catch (error) {
            toast.error('Error al actualizar el cupon');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Seguro que quieres eliminar este cupon?')) return;
        try {
            await adminApi.deleteCoupon(id);
            toast.success('Cupon eliminado');
            fetchCoupons();
        } catch (error) {
            toast.error('Error al eliminar el cupon');
        }
    };

    return (
        <AdminLayout>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="fw-bold mb-0">Cupones</h3>
                <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                    + Nuevo Cupón
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
                                    <th>Codigo</th>
                                    <th>Descuento</th>
                                    <th>Min. compra</th>
                                    <th>Valido hasta</th>
                                    <th>Usos</th>
                                    <th>Estado</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {coupons.map(coupon => (
                                    <tr key={coupon.id}>
                                        <td><strong>{coupon.code}</strong></td>
                                        <td>
                                            {coupon.discountPercentage
                                                ? `${coupon.discountPercentage}%`
                                                : `${coupon.discountAmount}€`}
                                        </td>
                                        <td>{coupon.minPurchaseAmount ? `${coupon.minPurchaseAmount}€` : '-'}</td>
                                        <td>{new Date(coupon.validTo).toLocaleDateString()}</td>
                                        <td>
                                            {coupon.usedCount}
                                            {coupon.usageLimit ? `/${coupon.usageLimit}` : ''}
                                        </td>
                                        <td>
                                            <span className={`badge ${coupon.active ? 'bg-success' : 'bg-danger'}`}>
                                                {coupon.active ? 'Activo' : 'Inactivo'}
                                            </span>
                                        </td>
                                        <td>
                                            <button
                                                className="btn btn-sm btn-outline-warning me-2"
                                                onClick={() => handleToggle(coupon.id)}
                                            >
                                                {coupon.active ? 'Desactivar' : 'Activar'}
                                            </button>
                                            <button
                                                className="btn btn-sm btn-outline-danger"
                                                onClick={() => handleDelete(coupon.id)}
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
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title fw-bold">Nuevo Cupón</h5>
                                <button className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label className="form-label">Codigo</label>
                                        <input
                                            type="text"
                                            className="form-control text-uppercase"
                                            value={formData.code}
                                            onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                                            required
                                            placeholder="VERANO20"
                                        />
                                    </div>

                                    <div className="row mb-3">
                                        <div className="col">
                                            <label className="form-label">Descuento %</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                value={formData.discountPercentage}
                                                onChange={(e) => setFormData({ ...formData, discountPercentage: e.target.value, discountAmount: '' })}
                                                placeholder="20"
                                                min="1"
                                                max="100"
                                            />
                                        </div>
                                        <div className="col">
                                            <label className="form-label">Descuento fijo €</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                value={formData.discountAmount}
                                                onChange={(e) => setFormData({ ...formData, discountAmount: e.target.value, discountPercentage: '' })}
                                                placeholder="10"
                                                min="1"
                                            />
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <div className="col">
                                            <label className="form-label">Compra minima €</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                value={formData.minPurchaseAmount}
                                                onChange={(e) => setFormData({ ...formData, minPurchaseAmount: e.target.value })}
                                                placeholder="50"
                                            />
                                        </div>
                                        <div className="col">
                                            <label className="form-label">Limite de usos</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                value={formData.usageLimit}
                                                onChange={(e) => setFormData({ ...formData, usageLimit: e.target.value })}
                                                placeholder="100"
                                            />
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <div className="col">
                                            <label className="form-label">Valido desde</label>
                                            <input
                                                type="datetime-local"
                                                className="form-control"
                                                value={formData.validFrom}
                                                onChange={(e) => setFormData({ ...formData, validFrom: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="col">
                                            <label className="form-label">Valido hasta</label>
                                            <input
                                                type="datetime-local"
                                                className="form-control"
                                                value={formData.validTo}
                                                onChange={(e) => setFormData({ ...formData, validTo: e.target.value })}
                                                required
                                            />
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
                                            Crear Cupón
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