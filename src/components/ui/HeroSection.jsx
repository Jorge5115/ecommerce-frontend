import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import deliveryIcon from '../../assets/delivery.png';
import secureIcon from '../../assets/secure.png';
import returnIcon from '../../assets/return.png';
import supportIcon from '../../assets/support.png';

export default function HeroSection() {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    const benefits = [
        { icon: deliveryIcon, label: 'Envio rápido' },
        { icon: secureIcon, label: 'Pago seguro' },
        { icon: returnIcon, label: 'Devoluciones' },
        { icon: supportIcon, label: 'Soporte 24/7' },
    ];

    return (
        <div
            className="text-white py-5"
            style={{
                background: 'linear-gradient(135deg, #0a2a2a 0%, #0d4f4f 50%, #0a2a2a 100%)',
                minHeight: '500px',
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <div className="container">
                <div className="row align-items-center g-5">
                    <div className="col-md-6">
                        <span className="badge bg-success mb-3 px-3 py-2">
                            Bienvenido a Stack Shop
                        </span>
                        <h1 className="display-4 fw-bold mb-4">
                            Tu tienda de confianza
                        </h1>
                        <p className="lead mb-4" style={{ color: '#d0d0d0' }}>
                            Descubre miles de productos al mejor precio. 
                            Compra de forma segura, recíbelo rápido y disfruta de la mejor experiencia de compra posible.
                        </p>
                        <div className="d-flex gap-3 flex-wrap">
                            <button
                                className="btn btn-lg px-4 py-2 fw-bold"
                                style={{ backgroundColor: '#20c997', color: 'white', border: 'none' }}
                                onClick={() => navigate('/products')}
                            >
                                Ver productos
                            </button>
                            {!user && (
                                <button
                                    className="btn btn-lg px-4 py-2 fw-bold"
                                    style={{ border: '2px solid white', color: 'white', backgroundColor: 'transparent' }}
                                    onMouseEnter={(e) => {
                                        e.target.style.backgroundColor = 'white';
                                        e.target.style.color = '#0a2a2a';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.backgroundColor = 'transparent';
                                        e.target.style.color = 'white';
                                    }}
                                    onClick={() => navigate('/register')}
                                >
                                    Crear cuenta gratis
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="col-md-6 text-center">
                        <div
                            className="rounded-4 p-4"
                            style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
                        >
                            <div className="row g-3">
                                {benefits.map(item => (
                                    <div key={item.label} className="col-6">
                                        <div
                                            className="rounded-3 p-3"
                                            style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
                                        >
                                            <img 
                                                src={item.icon} 
                                                alt={item.label}
                                                style={{ width: '48px', height: '48px', marginBottom: '8px', filter: 'invert(69%) sepia(46%) saturate(458%) hue-rotate(115deg) brightness(95%) contrast(91%)' }}
                                            />
                                            <small className="text-white d-block">{item.label}</small>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}