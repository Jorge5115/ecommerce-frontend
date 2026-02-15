import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { orderApi } from '../api/orderApi';
import { couponApi } from '../api/couponApi';
import { clearCart } from '../features/cart/cartSlice';
import Navbar from '../components/layout/Navbar';
import { toast } from 'react-toastify';

export default function CheckoutPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { items, total } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        shippingAddress: '',
        shippingCity: '',
        shippingPostalCode: '',
        shippingCountry: 'Spain',
        paymentMethod: 'CREDIT_CARD',
        couponCode: '',
    });

    const [couponResult, setCouponResult] = useState(null);
    const [validatingCoupon, setValidatingCoupon] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (items.length === 0) navigate('/cart');
    }, [items]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleValidateCoupon = async () => {
        if (!formData.couponCode) return;
        setValidatingCoupon(true);
        try {
            const response = await couponApi.validate(formData.couponCode, total);
            setCouponResult(response.data);
            if (response.data.valid) {
                toast.success('Cupon aplicado correctamente');
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error('Error al validar el cupon');
        } finally {
            setValidatingCoupon(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const orderData = { ...formData };
            if (!couponResult?.valid) delete orderData.couponCode;

            const response = await orderApi.create(orderData);
            dispatch(clearCart());
            toast.success('Pedido creado correctamente');
            navigate(`/orders/${response.data.id}`);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error al crear el pedido');
        } finally {
            setSubmitting(false);
        }
    };

    const finalTotal = couponResult?.valid ? couponResult.finalTotal : total;

    return (
        <>
            <Navbar />
            <div className="container py-4">
                <h2 className="fw-bold mb-4">Finalizar Compra</h2>

                <div className="row g-4">
                    <div className="col-md-7">
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <h5 className="fw-bold mb-4">Datos de envio</h5>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label className="form-label">Direccion</label>
                                        <input
                                            type="text"
                                            name="shippingAddress"
                                            className="form-control"
                                            value={formData.shippingAddress}
                                            onChange={handleChange}
                                            required
                                            placeholder="Calle Mayor 123"
                                        />
                                    </div>

                                    <div className="row mb-3">
                                        <div className="col">
                                            <label className="form-label">Ciudad</label>
                                            <input
                                                type="text"
                                                name="shippingCity"
                                                className="form-control"
                                                value={formData.shippingCity}
                                                onChange={handleChange}
                                                required
                                                placeholder="Madrid"
                                            />
                                        </div>
                                        <div className="col">
                                            <label className="form-label">Codigo Postal</label>
                                            <input
                                                type="text"
                                                name="shippingPostalCode"
                                                className="form-control"
                                                value={formData.shippingPostalCode}
                                                onChange={handleChange}
                                                required
                                                placeholder="28001"
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Pais</label>
                                        <input
                                            type="text"
                                            name="shippingCountry"
                                            className="form-control"
                                            value={formData.shippingCountry}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Metodo de pago</label>
                                        <select
                                            name="paymentMethod"
                                            className="form-select"
                                            value={formData.paymentMethod}
                                            onChange={handleChange}
                                        >
                                            <option value="CREDIT_CARD">Tarjeta de credito</option>
                                            <option value="DEBIT_CARD">Tarjeta de debito</option>
                                            <option value="PAYPAL">PayPal</option>
                                            <option value="BANK_TRANSFER">Transferencia bancaria</option>
                                        </select>
                                    </div>

                                    <div className="mb-4">
                                        <label className="form-label">Cupon de descuento</label>
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                name="couponCode"
                                                className="form-control"
                                                value={formData.couponCode}
                                                onChange={handleChange}
                                                placeholder="VERANO20"
                                            />
                                            <button
                                                type="button"
                                                className="btn btn-outline-secondary"
                                                onClick={handleValidateCoupon}
                                                disabled={validatingCoupon}
                                            >
                                                {validatingCoupon ? 'Validando...' : 'Aplicar'}
                                            </button>
                                        </div>
                                        {couponResult && (
                                            <div className={`mt-2 small ${couponResult.valid ? 'text-success' : 'text-danger'}`}>
                                                {couponResult.valid
                                                    ? `Descuento aplicado: -${couponResult.discountAmount}€`
                                                    : couponResult.message}
                                            </div>
                                        )}
                                    </div>

                                    <button
                                        type="submit"
                                        className="btn btn-primary w-100 py-2"
                                        disabled={submitting}
                                    >
                                        {submitting ? 'Procesando...' : `Confirmar pedido - ${finalTotal}€`}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-5">
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <h5 className="fw-bold mb-3">Resumen del pedido</h5>
                                {items.map(item => (
                                    <div key={item.productId} className="d-flex justify-content-between mb-2">
                                        <span className="text-muted">
                                            {item.productName} x{item.quantity}
                                        </span>
                                        <span>{item.subtotal}€</span>
                                    </div>
                                ))}
                                <hr />
                                <div className="d-flex justify-content-between mb-2">
                                    <span>Subtotal</span>
                                    <span>{total}€</span>
                                </div>
                                {couponResult?.valid && (
                                    <div className="d-flex justify-content-between mb-2 text-success">
                                        <span>Descuento</span>
                                        <span>-{couponResult.discountAmount}€</span>
                                    </div>
                                )}
                                <div className="d-flex justify-content-between mb-2 text-muted small">
                                    <span>IVA (21%)</span>
                                    <span>incluido</span>
                                </div>
                                <hr />
                                <div className="d-flex justify-content-between fw-bold fs-5">
                                    <span>Total</span>
                                    <span className="text-primary">{finalTotal}€</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}