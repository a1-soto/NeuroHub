import { useContext } from 'react';
import { ArrowUp } from 'lucide-react';
import { AccesibilidadContext } from '../../context/AccesibilidadContext';
import { useScrollY } from '../../hooks/useScrollY';
import './BackToTop.css';

function BackToTop() {
    const { movimientoReducido } = useContext(AccesibilidadContext);
    const scrollY = useScrollY();
    const isVisible = scrollY > 420;

    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: movimientoReducido ? 'auto' : 'smooth' });
    }

    return (
        <button
            className={`backtotop ${isVisible ? 'is-visible' : ''}`}
            onClick={scrollToTop}
            aria-label="Volver arriba"
        >
            <ArrowUp aria-hidden="true" />
        </button>
    );
}

export default BackToTop;
