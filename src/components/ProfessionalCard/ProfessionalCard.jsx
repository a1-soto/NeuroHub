import { Mail, Phone } from 'lucide-react';
import avatarGenerico from '../../assets/illustrations/profesional-avatar-generico.png';
import '../ResourceCard/ResourceCard.css';
import './ProfessionalCard.css';

const ESPECIALIDAD_LABELS = {
    comunicacion: 'Comunicación',
    lectura: 'Lectura Fácil',
    tdah: 'TDAH',
    dislexia: 'Dislexia',
    autismo: 'Autismo',
    sensorial: 'Procesamiento Sensorial',
    altas: 'Altas Capacidades',
};

const MODALIDAD_LABELS = {
    presencial: 'Presencial',
    online: 'Online',
    mixta: 'Mixta',
};

function ProfessionalCard({
    nombre,
    credencial,
    especialidad,
    modalidad,
    region,
    bio,
    email,
    telefono,
}) {
    return (
        <article className="dircard">
            <div className="dircard__media" data-cat={especialidad}>
                <img src={avatarGenerico} alt="" className="dircard__media-img" />
            </div>
            <div className="dircard__body">
                <div className="dircard__eyebrow-row">
                    <span className={`dircard__eyebrow dircard__eyebrow--${especialidad}`}>
                        {ESPECIALIDAD_LABELS[especialidad]}
                    </span>
                    <span className="professional-card__neuroafirmativa">
                        Práctica Neuroafirmativa
                    </span>
                </div>
                <div className="dircard__row">
                    <div>
                        <h3 className="dircard__title">{nombre}</h3>
                        <p className="professional-card__credencial">
                            {credencial} · {region}
                        </p>
                    </div>
                    <div className="dircard__stat">
                        <span className="dircard__stat-label">Modalidad</span>
                        <span className="dircard__stat-value">{MODALIDAD_LABELS[modalidad]}</span>
                    </div>
                </div>
                <p className="dircard__desc">{bio}</p>
                <div className="professional-card__contact">
                    <a href={`mailto:${email}`} className="professional-card__contact-link">
                        <Mail size={14} strokeWidth={2.4} aria-hidden="true" />
                        {email}
                    </a>
                    <a href={`tel:${telefono}`} className="professional-card__contact-link">
                        <Phone size={14} strokeWidth={2.4} aria-hidden="true" />
                        {telefono}
                    </a>
                </div>
            </div>
        </article>
    );
}

export default ProfessionalCard;
