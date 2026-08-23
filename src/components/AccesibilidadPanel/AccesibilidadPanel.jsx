import { useContext } from 'react';
import { AccesibilidadContext } from '../../context/AccesibilidadContext';
import './AccesibilidadPanel.css';

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

                <div className="a11y-panel__section">
                    <div className="a11y-panel__row">
                        <div>
                            <div className="a11y-panel__section-title">Modo Bajo Estímulo</div>
                            <div className="a11y-panel__desc">
                                Reduce la saturación de los colores y atenúa los contrastes
                                agresivos.
                            </div>
                        </div>
                        <button
                            className={`a11y-panel__toggle ${bajoEstimulo ? 'a11y-panel__toggle--on' : ''}`}
                            onClick={toggleBajoEstimulo}
                            aria-pressed={bajoEstimulo}
                            aria-label="Activar modo bajo estímulo"
                        >
                            <span className="a11y-panel__toggle-knob"></span>
                        </button>
                    </div>
                </div>

                <div className="a11y-panel__section">
                    <div className="a11y-panel__row">
                        <div>
                            <div className="a11y-panel__section-title">Desactivar Movimientos</div>
                            <div className="a11y-panel__desc">
                                Inhabilita transiciones y animaciones que puedan distraer.
                            </div>
                        </div>
                        <button
                            className={`a11y-panel__toggle ${movimientoReducido ? 'a11y-panel__toggle--on' : ''}`}
                            onClick={toggleMovimiento}
                            aria-pressed={movimientoReducido}
                            aria-label="Desactivar movimientos"
                        >
                            <span className="a11y-panel__toggle-knob"></span>
                        </button>
                    </div>
                </div>

                <div className="a11y-panel__section">
                    <div className="a11y-panel__row">
                        <div>
                            <div className="a11y-panel__section-title">Guía de Lectura</div>
                            <div className="a11y-panel__desc">
                                Franja que sigue al cursor para no perder la línea (ideal para
                                dislexia/TDAH).
                            </div>
                        </div>
                        <button
                            className={`a11y-panel__toggle ${guiaLectura ? 'a11y-panel__toggle--on' : ''}`}
                            onClick={toggleGuia}
                            aria-pressed={guiaLectura}
                            aria-label="Activar guía de lectura"
                        >
                            <span className="a11y-panel__toggle-knob"></span>
                        </button>
                    </div>
                </div>

                <div className="a11y-panel__section">
                    <div className="a11y-panel__section-title">Tamaño de Texto</div>
                    <div className="a11y-panel__chip-row">
                        <button
                            type="button"
                            className={`a11y-panel__chip ${tamañoTexto === -1 ? 'a11y-panel__chip--selected' : ''}`}
                            data-value="-1"
                            onClick={selectTextSize}
                            aria-pressed={tamañoTexto === -1}
                        >
                            A-
                        </button>
                        <button
                            type="button"
                            className={`a11y-panel__chip ${tamañoTexto === 0 ? 'a11y-panel__chip--selected' : ''}`}
                            data-value="0"
                            onClick={selectTextSize}
                            aria-pressed={tamañoTexto === 0}
                        >
                            A
                        </button>
                        <button
                            type="button"
                            className={`a11y-panel__chip ${tamañoTexto === 1 ? 'a11y-panel__chip--selected' : ''}`}
                            data-value="1"
                            onClick={selectTextSize}
                            aria-pressed={tamañoTexto === 1}
                        >
                            A+
                        </button>
                        <button
                            type="button"
                            className={`a11y-panel__chip ${tamañoTexto === 2 ? 'a11y-panel__chip--selected' : ''}`}
                            data-value="2"
                            onClick={selectTextSize}
                            aria-pressed={tamañoTexto === 2}
                        >
                            A++
                        </button>
                    </div>
                </div>

                <div className="a11y-panel__section">
                    <div className="a11y-panel__section-title">Interlineado</div>
                    <div className="a11y-panel__chip-row">
                        <button
                            type="button"
                            className={`a11y-panel__chip ${interlineado === 'normal' ? 'a11y-panel__chip--selected' : ''}`}
                            data-value="normal"
                            onClick={selectInterlineado}
                            aria-pressed={interlineado === 'normal'}
                        >
                            Normal
                            <small className="a11y-panel__chip-meta">1.5</small>
                        </button>
                        <button
                            type="button"
                            className={`a11y-panel__chip ${interlineado === 'amplio' ? 'a11y-panel__chip--selected' : ''}`}
                            data-value="amplio"
                            onClick={selectInterlineado}
                            aria-pressed={interlineado === 'amplio'}
                        >
                            Amplio
                            <small className="a11y-panel__chip-meta">1.8</small>
                        </button>
                        <button
                            type="button"
                            className={`a11y-panel__chip ${interlineado === 'espaciado' ? 'a11y-panel__chip--selected' : ''}`}
                            data-value="espaciado"
                            onClick={selectInterlineado}
                            aria-pressed={interlineado === 'espaciado'}
                        >
                            Espaciado
                            <small className="a11y-panel__chip-meta">2.1</small>
                        </button>
                    </div>
                </div>

                <div className="a11y-panel__section">
                    <div className="a11y-panel__section-title">Tema de Color</div>
                    <div className="a11y-panel__chip-row">
                        <button
                            type="button"
                            className={`a11y-panel__chip ${temaColor === 'neutral' ? 'a11y-panel__chip--selected' : ''}`}
                            data-value="neutral"
                            onClick={selectTemaColor}
                            aria-pressed={temaColor === 'neutral'}
                        >
                            Calma Neutral
                        </button>
                        <button
                            type="button"
                            className={`a11y-panel__chip ${temaColor === 'sepia' ? 'a11y-panel__chip--selected' : ''}`}
                            data-value="sepia"
                            onClick={selectTemaColor}
                            aria-pressed={temaColor === 'sepia'}
                        >
                            Sepia Suave
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AccesibilidadPanel;
