import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './Hero.css';

function Hero() {
    return (
        <section className="hero">
            <div className="hero__image">
                <img src="https://picsum.photos/200" alt="" fetchPriority="high" />
            </div>

            <div className="hero__content">
                <span className="hero__badge">
                    ✨ Espacio Diseñado para Bajo Estímulo Sensorial
                </span>
                <h1 className="hero__title">
                    Información, Recursos y Especialistas para la Comunidad Neurodivergente
                </h1>
                <p className="hero__subtitle">
                    Un portal accesible para autismo, TDAH, dislexia, procesamiento sensorial y
                    altas capacidades — recursos, ayudas públicas y profesionales por Comunidad
                    Autónoma.
                </p>
                <div className="hero__actions">
                    <Link to="/recursos" className="btn btn--primary">
                        Explorar Recursos
                        <ArrowRight size={20} strokeWidth={3} aria-hidden="true" />
                    </Link>
                    <Link to="/profesionales" className="btn btn--outline-white">
                        Buscar Especialistas
                        <ArrowRight size={20} strokeWidth={3} aria-hidden="true" />
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default Hero;
