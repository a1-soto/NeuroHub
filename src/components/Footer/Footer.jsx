import { Link } from 'react-router-dom';
import { ArrowRight, Globe, X } from 'lucide-react';
import './Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer__grid">
                <div className="footer__links">
                    <strong className="footer__heading">NEUROHUB</strong>
                    <Link to="/quienes-somos">¿Quiénes somos?</Link>
                    <Link to="/aviso-legal">Aviso Legal</Link>
                    <Link to="/privacidad">Política de Privacidad</Link>
                    <Link to="/condiciones">Condiciones del servicio</Link>
                    <Link to="/cookies">Política de Cookies</Link>
                </div>
                <div className="footer__support-card">
                    <h4 className="footer__support-card-title">Testimonios</h4>
                    <p className="footer__support-card-text">
                        Historias reales de la comunidad NeuroHub sobre encontrar el apoyo adecuado.
                    </p>
                    <Link to="/testimonios" className="btn btn--primary">
                        Ir
                        <ArrowRight size={20} strokeWidth={3} aria-hidden="true" />
                    </Link>
                </div>

                <div className="footer__support-card">
                    <h4 className="footer__support-card-title">Apoya</h4>
                    <p className="footer__support-card-text">
                        Tu ayuda sostiene la biblioteca de recursos y el directorio gratuito.
                    </p>
                    <Link to="/donacion" className="btn btn--primary">
                        Donar
                        <ArrowRight size={20} strokeWidth={3} aria-hidden="true" />
                    </Link>
                </div>
            </div>
            <div className="footer__social">
                <a href="#" className="footer__social-icon" aria-label="Sitio web">
                    <Globe aria-hidden="true" />
                </a>
                <a href="#" className="footer__social-icon" aria-label="X (Twitter)">
                    <X aria-hidden="true" />
                </a>
                <a href="#" className="footer__social-icon" aria-label="Instagram">
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                    >
                        <rect x="2" y="2" width="20" height="20" rx="5" />
                        <circle cx="12" cy="12" r="4" />
                        <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
                    </svg>
                </a>
            </div>
            <div className="footer__rights">© 2026 NeuroHub — derechos reservados</div>
        </footer>
    );
}

export default Footer;
