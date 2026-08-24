import { NavLink } from 'react-router-dom';
import { useContext, useState } from 'react';
import { Sparkles, SlidersHorizontal, Menu, X } from 'lucide-react';
import { AccesibilidadContext } from '../../context/AccesibilidadContext';
import AccesibilidadPanel from '../AccesibilidadPanel/AccesibilidadPanel';
import NavDropdown from './NavDropdown';
import './Nav.css';

const RECURSOS_ITEMS = [
    { label: 'Comunicación Aumentativa', to: '/recursos?categoria=comunicacion-aumentativa' },
    { label: 'Lectura Fácil', to: '/recursos?categoria=lectura-facil' },
    { label: 'Autismo', to: '/recursos?categoria=autismo' },
    { label: 'TDAH y Dislexia', to: '/recursos?categoria=tdah-dislexia' },
    { label: 'Procesamiento Sensorial', to: '/recursos?categoria=procesamiento-sensorial' },
    { label: 'Altas Capacidades', to: '/recursos?categoria=altas-capacidades' },
];

const AYUDAS_ITEMS = [
    { label: 'Madrid', to: '/ayudas/madrid' },
    { label: 'Cataluña', to: '/ayudas/cataluna' },
    { label: 'Andalucía', to: '/ayudas/andalucia' },
];

function Nav() {
    const [panelOpen, setPanelOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { bajoEstimulo, setBajoEstimulo } = useContext(AccesibilidadContext);

    function toggleBajoEstimulo() {
        setBajoEstimulo(!bajoEstimulo);
    }

    function openPanel() {
        setPanelOpen(true);
    }

    function closePanel() {
        setPanelOpen(false);
    }

    function toggleMobileMenu() {
        setMobileMenuOpen(!mobileMenuOpen);
    }

    return (
        <>
            <header className="nav">
                <NavLink to="/" className="nav__logo">
                    Neuro<span className="nav__logo-accent">Hub</span>
                </NavLink>
                <nav
                    className={`nav__links ${mobileMenuOpen ? 'nav__links--open' : ''}`}
                    aria-label="Navegación principal"
                >
                    <NavLink to="/">Inicio</NavLink>
                    <NavLink to="/noticias">Noticias</NavLink>
                    <NavDropdown label="Recursos" to="/recursos" items={RECURSOS_ITEMS} />
                    <NavLink to="/blog">Blog</NavLink>
                    <NavLink to="/profesionales">Profesionales</NavLink>
                    <NavDropdown label="Ayudas" to="/ayudas" items={AYUDAS_ITEMS} />
                    <NavLink to="/curso">Curso</NavLink>
                    <NavLink to="/contacto">Contacto</NavLink>
                </nav>

                <div className="nav__a11y">
                    <button
                        className={`nav__a11y-btn ${bajoEstimulo ? 'nav__a11y-btn--active' : ''}`}
                        onClick={toggleBajoEstimulo}
                        aria-pressed={bajoEstimulo}
                        aria-label="Bajo Estímulo"
                    >
                        <Sparkles aria-hidden="true" />
                        <span className="nav__a11y-btn-label" aria-hidden="true">
                            Bajo Estímulo
                        </span>
                    </button>
                    <button
                        className="nav__a11y-btn"
                        onClick={openPanel}
                        aria-expanded={panelOpen}
                        aria-label="Ajustes UX"
                    >
                        <SlidersHorizontal aria-hidden="true" />
                        <span className="nav__a11y-btn-label" aria-hidden="true">
                            Ajustes UX
                        </span>
                    </button>
                </div>

                <button
                    className="nav__hamburger"
                    onClick={toggleMobileMenu}
                    aria-expanded={mobileMenuOpen}
                    aria-label="Abrir menú de navegación"
                >
                    {mobileMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
                </button>
            </header>
            <AccesibilidadPanel open={panelOpen} onClose={closePanel} />
        </>
    );
}

export default Nav;
