export default function EmptyState({ icon = '📭', title, message, actionLabel, onAction }) {
    return (
        <div className="text-center py-5">
            <div className="display-1 mb-3">{icon}</div>
            <h5 className="fw-bold text-muted">{title}</h5>
            {message && <p className="text-muted">{message}</p>}
            {actionLabel && onAction && (
                <button className="btn btn-primary mt-2" onClick={onAction}>
                    {actionLabel}
                </button>
            )}
        </div>
    );
}