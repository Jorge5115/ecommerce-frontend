export default function StatsSection() {
    const stats = [
        { value: '1000+', label: 'Productos disponibles', icon: '📦' },
        { value: '500+', label: 'Clientes satisfechos', icon: '😊' },
        { value: '99%', label: 'Entregas a tiempo', icon: '🚀' },
        { value: '24/7', label: 'Soporte disponible', icon: '💬' },
    ];

    return (
        <div style={{ backgroundColor: '#f8f9fa' }} className="py-5">
            <div className="container">
                <div className="row g-4 text-center">
                    {stats.map(stat => (
                        <div key={stat.label} className="col-md-3 col-6">
                            <div className="fs-2 mb-2">{stat.icon}</div>
                            <h3 className="fw-bold text-dark">{stat.value}</h3>
                            <p className="text-muted small mb-0">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}