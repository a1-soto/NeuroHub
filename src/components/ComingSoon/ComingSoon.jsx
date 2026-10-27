import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';
import './ComingSoon.css';

// Placeholder for pages that are routed but not built yet, so a nav or
// footer link never lands on a blank screen.
function ComingSoon({ title }) {
    return (
        <section className="coming-soon">
            <div className="page-header">
                <span className="coming-soon__badge">
                    <Clock size={14} aria-hidden="true" />
                    Próximamente
                </span>
                <h1>{title}</h1>
                <p>
                    Esta sección está en construcción. Mientras tanto, puedes consultar los
                    recursos, profesionales y ayudas que ya están disponibles.
                </p>
            </div>

            <div className="coming-soon__actions">
                <Link to="/recursos" className="btn btn--primary">
                    Ver recursos
                </Link>
                <Link to="/" className="btn coming-soon__btn-secondary">
                    Volver al inicio
                </Link>
            </div>
        </section>
    );
}

export default ComingSoon;
