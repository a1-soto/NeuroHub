import { ExternalLink, Globe, Building2, GraduationCap, Smartphone } from 'lucide-react';
import './ResourceCard.css';

const CATEGORIA_LABELS = {
    'comunicacion-aumentativa': 'Comunicación Aumentativa',
    'lectura-facil': 'Lectura Fácil',
    autismo: 'Autismo',
    tdah: 'TDAH',
    dislexia: 'Dislexia',
    'procesamiento-sensorial': 'Procesamiento Sensorial',
    'altas-capacidades': 'Altas Capacidades',
};

const TIPO_ICONS = {
    Portal: Globe,
    Organización: Building2,
    Formación: GraduationCap,
    App: Smartphone,
};

function ResourceCard({ name, tipo, description, category, org, url }) {
    const TipoIcon = TIPO_ICONS[tipo];

    return (
        <div className="resource-card">
            <div className="resource-card__meta">
                <TipoIcon className="resource-card__icon" role="img" aria-label={tipo} />
                <span className={`resource-card__eyebrow resource-card__eyebrow--${category}`}>
                    {CATEGORIA_LABELS[category]}
                </span>
                <span className="resource-card__badge">Recurso externo</span>
            </div>
            <h3 className="resource-card__name">{name}</h3>
            <p className="resource-card__description">{description}</p>
            <div className="resource-card__footer">
                <span className="resource-card__org">{org}</span>
                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="resource-card__link"
                >
                    Visitar <ExternalLink size={16} strokeWidth={3} aria-hidden="true" />
                    <span className="sr-only"> (se abre en una pestaña nueva)</span>
                </a>
            </div>
        </div>
    );
}

export default ResourceCard;
