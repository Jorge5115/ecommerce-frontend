export default function Loading({ text = 'Cargando...' }) {
    return (
        <div className="d-flex align-items-center justify-content-center py-5">
            <div className="text-center">
                <div className="spinner-border text-primary mb-3" role="status"></div>
                <p className="text-muted">{text}</p>
            </div>
        </div>
    );
}