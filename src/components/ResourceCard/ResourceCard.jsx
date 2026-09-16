import { ExternalLink } from 'lucide-react';
import './ResourceCard.css';

const LOGOS = import.meta.glob('../../assets/logos/*', {
    eager: true,
    query: '?url',
    import: 'default',
});

function getLogoUrl(filename) {
    if (!filename) return null;
    return LOGOS[`../../assets/logos/${filename}`] ?? null;
}

const CATEGORIA_LABELS = {
    'comunicacion-aumentativa': 'Comunicación Aumentativa',
    'lectura-facil': 'Lectura Fácil',
    autismo: 'Autismo',
    tdah: 'TDAH',
    dislexia: 'Dislexia',
    'procesamiento-sensorial': 'Procesamiento Sensorial',
    'altas-capacidades': 'Altas Capacidades',
};

const STOPWORDS = new Set(['de', 'del', 'la', 'el', 'y', 'en', 'para']);

function getInitials(name) {
    const words = name.split(/[\s—-]+/).filter(Boolean);
    const meaningful = words.filter((word) => !STOPWORDS.has(word.toLowerCase()));
    if (meaningful.length >= 2) {
        return (meaningful[0][0] + meaningful[1][0]).toUpperCase();
    }
    return (words[0] ?? '').slice(0, 2).toUpperCase();
}

function ResourceCard({ name, description, category, url, logo, org, tipo }) {
    const logoUrl = getLogoUrl(logo);

    return (
        <article className="dircard">
            <div className="dircard__media dircard__media--logo" data-cat={category}>
                {logoUrl ? (
                    <img src={logoUrl} alt="" className="dircard__media-logo" data-logo={logo} />
                ) : (
                    <div className="dircard__avatar">{getInitials(name)}</div>
                )}
            </div>
            <div className="dircard__body">
                <div className="dircard__eyebrow-row">
                    <span className={`dircard__eyebrow dircard__eyebrow--${category}`}>
                        {CATEGORIA_LABELS[category]}
                    </span>
                </div>
                <div className="dircard__row">
                    <h3 className="dircard__title">{name}</h3>
                </div>
                {org && <p className="dircard__org">{org}</p>}
                <p className="dircard__desc">{description}</p>
                <div className="dircard__foot">
                    <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="dircard__site"
                    >
                        Sitio oficial <ExternalLink size={14} strokeWidth={3} aria-hidden="true" />
                        <span className="sr-only"> (se abre en una pestaña nueva)</span>
                    </a>
                    <span className="dircard__meta">{tipo}</span>
                </div>
            </div>
        </article>
    );
}

export default ResourceCard;
