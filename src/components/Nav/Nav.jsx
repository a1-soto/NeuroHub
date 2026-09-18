import { NavLink, useLocation } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { Sparkles, SlidersHorizontal, Menu, X } from 'lucide-react';
import { AccesibilidadContext } from '../../context/AccesibilidadContext';
import AccesibilidadPanel from '../AccesibilidadPanel/AccesibilidadPanel';
import NavDropdown from './NavDropdown';
import './Nav.css';

const RECURSOS_ITEMS = [
    { label: 'Comunicación Aumentativa', to: '/recursos?categoria=comunicacion-aumentativa' },
    { label: 'Lectura Fácil', to: '/recursos?categoria=lectura-facil' },
    { label: 'Autismo', to: '/recursos?categoria=autismo' },
    { label: 'TDAH', to: '/recursos?categoria=tdah' },
    { label: 'Dislexia', to: '/recursos?categoria=dislexia' },
    { label: 'Procesamiento Sensorial', to: '/recursos?categoria=procesamiento-sensorial' },
    { label: 'Altas Capacidades', to: '/recursos?categoria=altas-capacidades' },
];

const AYUDAS_ITEMS = [
    { label: 'Madrid', to: '/ayudas?region=madrid' },
    { label: 'Cataluña', to: '/ayudas?region=cataluna' },
    { label: 'Andalucía', to: '/ayudas?region=andalucia' },
];

const NAV_ITEMS = [
    { type: 'link', label: 'Inicio', to: '/' },
    { type: 'link', label: 'Noticias', to: '/noticias' },
    { type: 'dropdown', label: 'Recursos', to: '/recursos', items: RECURSOS_ITEMS },
    { type: 'link', label: 'Blog', to: '/blog' },
    { type: 'link', label: 'Profesionales', to: '/profesionales' },
    { type: 'dropdown', label: 'Ayudas', to: '/ayudas', items: AYUDAS_ITEMS },
    { type: 'link', label: 'Curso', to: '/curso' },
    { type: 'link', label: 'Contacto', to: '/contacto' },
];

function pillLinkClassName({ isActive }) {
    return `pillnav__link ${isActive ? 'is-active' : ''}`;
}

function drawerLinkClassName({ isActive }) {
    return `mobile-drawer__link ${isActive ? 'is-active' : ''}`;
}

function drawerSublinkClassName({ isActive }) {
    return `mobile-drawer__sublink ${isActive ? 'is-active' : ''}`;
}

function Nav() {
    const [panelOpen, setPanelOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { bajoEstimulo, setBajoEstimulo } = useContext(AccesibilidadContext);
    const location = useLocation();

    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location]);

    useEffect(() => {
        document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [mobileMenuOpen]);

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
            <div className="pillnav-wrap">
                <header className="pillnav">
                    <NavLink to="/" className="pillnav__logo">
                        Neuro<span className="pillnav__logo-accent">Hub</span>
                    </NavLink>

                    <nav className="pillnav__links" aria-label="Navegación principal">
                        {NAV_ITEMS.map((item) =>
                            item.type === 'dropdown' ? (
                                <NavDropdown
                                    key={item.label}
                                    label={item.label}
                                    to={item.to}
                                    items={item.items}
                                />
                            ) : (
                                <NavLink
                                    key={item.label}
                                    to={item.to}
                                    className={pillLinkClassName}
                                >
                                    {item.label}
                                </NavLink>
                            )
                        )}
                    </nav>

                    <div className="pillnav__actions">
                        <button
                            className={bajoEstimulo ? 'is-active' : ''}
                            onClick={toggleBajoEstimulo}
                            aria-pressed={bajoEstimulo}
                            title="Bajo Estímulo"
                            aria-label="Bajo Estímulo"
                        >
                            <Sparkles aria-hidden="true" />
                        </button>
                        <button
                            onClick={openPanel}
                            aria-expanded={panelOpen}
                            title="Ajustes UX"
                            aria-label="Ajustes UX"
                        >
                            <SlidersHorizontal aria-hidden="true" />
                        </button>
                    </div>

                    <button
                        className="pillnav__hamburger"
                        onClick={toggleMobileMenu}
                        aria-expanded={mobileMenuOpen}
                        aria-label="Abrir menú de navegación"
                    >
                        {mobileMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
                    </button>
                </header>
            </div>

            <div className="mobile-drawer" hidden={!mobileMenuOpen}>
                {NAV_ITEMS.map((item) => (
                    <div key={item.label} className="mobile-drawer__group">
                        <NavLink to={item.to} className={drawerLinkClassName}>
                            {item.label}
                        </NavLink>
                        {item.type === 'dropdown' &&
                            item.items.map((subItem) => (
                                <NavLink
                                    key={subItem.to}
                                    to={subItem.to}
                                    className={drawerSublinkClassName}
                                >
                                    {subItem.label}
                                </NavLink>
                            ))}
                    </div>
                ))}
            </div>

            <AccesibilidadPanel open={panelOpen} onClose={closePanel} />
        </>
    );
}

export default Nav;
