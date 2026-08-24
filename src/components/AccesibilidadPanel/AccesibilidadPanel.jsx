import { useContext } from 'react';
import { AccesibilidadContext } from '../../context/AccesibilidadContext';
import ToggleRow from './ToggleRow';
import './AccesibilidadPanel.css';

const TEXT_SIZE_OPTIONS = [
    { value: -1, label: 'A-' },
    { value: 0, label: 'A' },
    { value: 1, label: 'A+' },
    { value: 2, label: 'A++' },
];

const INTERLINEADO_OPTIONS = [
    { value: 'normal', label: 'Normal', meta: '1.5' },
    { value: 'amplio', label: 'Amplio', meta: '1.8' },
    { value: 'espaciado', label: 'Espaciado', meta: '2.1' },
];

const TEMA_COLOR_OPTIONS = [
    { value: 'neutral', label: 'Calma Neutral' },
    { value: 'sepia', label: 'Sepia Suave' },
];

function AccesibilidadPanel({ open, onClose }) {
    const {
        bajoEstimulo,
        setBajoEstimulo,
        movimientoReducido,
        setMovimientoReducido,
        guiaLectura,
        setGuiaLectura,
        tamañoTexto,
        setTamañoTexto,
        interlineado,
        setInterlineado,
        temaColor,
        setTemaColor,
    } = useContext(AccesibilidadContext);

    function toggleBajoEstimulo() {
        setBajoEstimulo(!bajoEstimulo);
    }

    function toggleMovimiento() {
        setMovimientoReducido(!movimientoReducido);
    }

    function toggleGuia() {
        setGuiaLectura(!guiaLectura);
    }

    function selectTextSize(event) {
        setTamañoTexto(Number(event.currentTarget.dataset.value));
    }

    function selectInterlineado(event) {
        setInterlineado(event.currentTarget.dataset.value);
    }

    function selectTemaColor(event) {
        setTemaColor(event.currentTarget.dataset.value);
    }

    return (
        <>
            <div
                className={`a11y-panel-backdrop ${open ? 'a11y-panel-backdrop--open' : ''}`}
                onClick={onClose}
            ></div>
            <div
                className={`a11y-panel ${open ? 'a11y-panel--open' : ''}`}
                role="dialog"
                aria-label="Panel de Confort Sensorial"
            >
                <div className="a11y-panel__head">
                    <h2 className="a11y-panel__heading">Panel de Confort Sensorial</h2>
                    <button
                        className="a11y-panel__close"
                        onClick={onClose}
                        aria-label="Cerrar panel"
                    >
                        ✕
                    </button>
                </div>

                <ToggleRow
                    title="Modo Bajo Estímulo"
                    description="Reduce la saturación de los colores y atenúa los contrastes agresivos."
                    checked={bajoEstimulo}
                    onToggle={toggleBajoEstimulo}
                    ariaLabel="Activar modo bajo estímulo"
                />

                <ToggleRow
                    title="Desactivar Movimientos"
                    description="Inhabilita transiciones y animaciones que puedan distraer."
                    checked={movimientoReducido}
                    onToggle={toggleMovimiento}
                    ariaLabel="Desactivar movimientos"
                />

                <ToggleRow
                    title="Guía de Lectura"
                    description="Franja que sigue al cursor para no perder la línea (ideal para dislexia/TDAH)."
                    checked={guiaLectura}
                    onToggle={toggleGuia}
                    ariaLabel="Activar guía de lectura"
                />

                <div className="a11y-panel__section">
                    <div className="a11y-panel__section-title">Tamaño de Texto</div>
                    <div className="a11y-panel__chip-row">
                        {TEXT_SIZE_OPTIONS.map((option) => (
                            <button
                                key={option.value}
                                type="button"
                                className={`a11y-panel__chip ${tamañoTexto === option.value ? 'a11y-panel__chip--selected' : ''}`}
                                data-value={option.value}
                                onClick={selectTextSize}
                                aria-pressed={tamañoTexto === option.value}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="a11y-panel__section">
                    <div className="a11y-panel__section-title">Interlineado</div>
                    <div className="a11y-panel__chip-row">
                        {INTERLINEADO_OPTIONS.map((option) => (
                            <button
                                key={option.value}
                                type="button"
                                className={`a11y-panel__chip ${interlineado === option.value ? 'a11y-panel__chip--selected' : ''}`}
                                data-value={option.value}
                                onClick={selectInterlineado}
                                aria-pressed={interlineado === option.value}
                            >
                                {option.label}
                                <small className="a11y-panel__chip-meta">{option.meta}</small>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="a11y-panel__section">
                    <div className="a11y-panel__section-title">Tema de Color</div>
                    <div className="a11y-panel__chip-row">
                        {TEMA_COLOR_OPTIONS.map((option) => (
                            <button
                                key={option.value}
                                type="button"
                                className={`a11y-panel__chip ${temaColor === option.value ? 'a11y-panel__chip--selected' : ''}`}
                                data-value={option.value}
                                onClick={selectTemaColor}
                                aria-pressed={temaColor === option.value}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default AccesibilidadPanel;
