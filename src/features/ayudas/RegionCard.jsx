import { Link } from 'react-router-dom';
import './RegionCard.css';

function RegionCard({ slug, label, status }) {
    const esGuiaDisponible = status === 'ready';

    if (!esGuiaDisponible) {
        return (
            <button className="region-card" disabled>
                {label}
                <span className="status-badge soon">Próximamente</span>
            </button>
        );
    }

    return (
        <Link to={`/ayudas/${slug}`} className="region-card">
            {label}
            <span className="status-badge ready">Guía disponible</span>
        </Link>
    );
}

export default RegionCard;
