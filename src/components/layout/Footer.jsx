import logo from '../../assets/logo.png';

export default function Footer() {
    return (
        <footer style={{ backgroundColor: '#0a2a2a' }} className="text-white mt-5 py-5">
            <div className="container">
                <div className="row g-4 justify-content-center text-center text-md-start">

                    <div className="col-md-4">
                        <div className="d-flex align-items-center gap-2 mb-3">
                            <img src={logo} alt="Stack Shop" style={{ height: '35px' }} />
                            <h5 className="fw-bold mb-0">Stack Shop</h5>
                        </div>
                        <p className="text-secondary small">
                            Tu tienda online de confianza. Los mejores productos al mejor precio.
                            Desarrollado con Spring Boot y React.
                        </p>
                        <div className="d-flex gap-3 justify-content-center justify-content-md-start mt-3">
                            <a
                                href="https://www.linkedin.com/in/jorge-casanova-sánchez"
                                target="_blank"
                                rel="noreferrer"
                                className="text-white text-decoration-none"
                                style={{ fontSize: '1.5rem' }}
                                title="LinkedIn"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                                </svg>
                            </a>
                            <a
                                href="https://github.com/Jorge5115"
                                target="_blank"
                                rel="noreferrer"
                                className="text-white text-decoration-none"
                                style={{ fontSize: '1.5rem' }}
                                title="GitHub"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                                </svg>
                            </a>
                            <a
                                href="mailto:jorge.casanova.sanchez@gmail.com"
                                className="text-white text-decoration-none"
                                style={{ fontSize: '1.5rem' }}
                                title="Email"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-3.897L1 5.383v5.722Z"/>
                                </svg>
                            </a>
                        </div>
                        <button
                            className="btn btn-sm mt-5"
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
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        >
                            Volver arriba
                        </button>
                    </div>

                    <div className="col-md-4 ps-md-5">
                        <ul className="list-unstyled">
                            <li className="mb-3">
                                <span className="text-white small fw-bold">⚙️ Spring Boot 4</span>
                                <p className="text-secondary small mb-0">API REST del backend con seguridad y autenticacion</p>
                            </li>
                            <li className="mb-3">
                                <span className="text-white small fw-bold">⚛️ React 18</span>
                                <p className="text-secondary small mb-0">Interfaz de usuario dinamica y reactiva</p>
                            </li>
                            <li className="mb-3">
                                <span className="text-white small fw-bold">🐬 MySQL</span>
                                <p className="text-secondary small mb-0">Base de datos relacional para persistencia de datos</p>
                            </li>
                            <li className="mb-3">
                                <span className="text-white small fw-bold">⚡ Redis</span>
                                <p className="text-secondary small mb-0">Cache y almacenamiento del carrito en tiempo real</p>
                            </li>
                        </ul>
                    </div>

                    <div className="col-md-4">
                        <ul className="list-unstyled">
                            <li className="mb-3">
                                <span className="text-white small fw-bold">🐳 Docker</span>
                                <p className="text-secondary small mb-0">Contenedores para MySQL y Redis en desarrollo</p>
                            </li>
                            <li className="mb-3">
                                <span className="text-white small fw-bold">☁️ Cloudinary</span>
                                <p className="text-secondary small mb-0">Almacenamiento y gestion de imagenes en la nube</p>
                            </li>
                            <li className="mb-3">
                                <span className="text-white small fw-bold">🔐 JWT</span>
                                <p className="text-secondary small mb-0">Autenticacion segura mediante tokens</p>
                            </li>
                            <li className="mb-3">
                                <span className="text-white small fw-bold">🔌 WebSockets</span>
                                <p className="text-secondary small mb-0">Notificaciones en tiempo real con STOMP</p>
                            </li>
                        </ul>
                    </div>

                </div>

        
            </div>
        </footer>
    );
}