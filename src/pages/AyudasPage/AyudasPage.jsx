import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Check } from 'lucide-react';
import { comunidades, regionesDetalle, TIPOS_AYUDA } from '../../data/ayudas';
import GooChipFilter from '../../components/GooChipFilter/GooChipFilter';
import './AyudasPage.css';

const REGIONES_LISTAS = comunidades
    .filter((c) => c.status === 'ready')
    .map((c) => ({ value: c.slug, label: c.label }));

const REGIONES_PROXIMAMENTE = comunidades.filter((c) => c.status !== 'ready');

// Buscador real de oficinas de atención a la ciudadanía del Gobierno de
// España (fuente: DIR3, el registro oficial de unidades administrativas) —
// verificado 2026-09-10. No es un buscador propio de NeuroHub: no hay
// backend ni base de datos de oficinas en este proyecto, así que el botón
// lleva a la herramienta oficial real en vez de simular una búsqueda.
const OFICINAS_LOCATOR_URL =
    'https://administracion.gob.es/pag_Home/atencionCiudadana/encuentraTuOficina.html';

function AyudasPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [tipoActivo, setTipoActivo] = useState(TIPOS_AYUDA[0].value);

    useEffect(() => {
        const regionParam = searchParams.get('region');
        if (regionParam && !regionesDetalle[regionParam]) {
            setSearchParams({ region: 'madrid' }, { replace: true });
        }
    }, [searchParams, setSearchParams]);

    const regionParam = searchParams.get('region');
    const regionActiva = regionesDetalle[regionParam] ? regionParam : 'madrid';
    const region = regionesDetalle[regionActiva];
    const ayuda = region.ayudas[tipoActivo];

    function handleRegionChange(value) {
        setSearchParams({ region: value });
    }

    return (
        <>
            <div className="page-header">
                <h1>Guías de Ayudas Públicas</h1>
                <p>
                    Los trámites y los tiempos varían según dónde vivís. Empezá por lo que necesitás
                    — ya tenemos guías completas para Madrid, Cataluña y Andalucía; el resto se suma
                    en próximas versiones.
                </p>
            </div>

            <div className="stat-hook">
                <p>
                    Tu comunidad importa más de lo que parece: el{' '}
                    <strong>plazo legal es 180 días</strong>, pero el tiempo real varía casi 5 veces
                    entre regiones.
                </p>
                <div className="stat-group">
                    <div className="stat">
                        <span className="stat__label">Cataluña</span>
                        <span className="stat__value">
                            {regionesDetalle.cataluna.tiempoTramitacion}
                            <small> días</small>
                        </span>
                    </div>
                    <div className="stat">
                        <span className="stat__label">Madrid</span>
                        <span className="stat__value">
                            {regionesDetalle.madrid.tiempoTramitacion}
                            <small> días</small>
                        </span>
                    </div>
                    <div className="stat">
                        <span className="stat__label">Andalucía</span>
                        <span className="stat__value">
                            {regionesDetalle.andalucia.tiempoTramitacion}
                            <small> días</small>
                        </span>
                    </div>
                    <div className="stat stat--limit">
                        <span className="stat__label">Plazo legal</span>
                        <span className="stat__value">
                            180<small> días</small>
                        </span>
                    </div>
                </div>
            </div>

            <div className="ayudas-block">
                <p className="ayudas-step-label">
                    <span className="num">1</span> ¿Qué necesitás?
                </p>
                <GooChipFilter
                    options={TIPOS_AYUDA}
                    value={tipoActivo}
                    onChange={setTipoActivo}
                    ariaLabel="Elegí qué necesitás"
                />
            </div>

            <div className="ayudas-block">
                <p className="ayudas-step-label">
                    <span className="num">2</span> Elegí tu comunidad autónoma
                </p>
                <GooChipFilter
                    options={REGIONES_LISTAS}
                    value={regionActiva}
                    onChange={handleRegionChange}
                    ariaLabel="Elegí tu comunidad autónoma"
                />
                <div className="region-fallback">
                    {REGIONES_PROXIMAMENTE.map((c) => (
                        <span key={c.slug}>{c.label} — Próximamente</span>
                    ))}
                </div>
            </div>

            <div className="ayudas-detail">
                <div className="ayudas-detail__eyebrow">
                    {region.label} · {ayuda.titulo}
                </div>
                <h3>Cómo es el trámite</h3>
                <ul className="checklist">
                    {ayuda.pasos.map((paso) => (
                        <li key={paso}>
                            <Check aria-hidden="true" />
                            {paso}
                        </li>
                    ))}
                </ul>
                <a
                    href={region.sedeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--primary"
                >
                    Sede electrónica oficial
                </a>

                <div className="ayudas-detail__locator">
                    <p className="ayudas-detail__locator-label">¿Dónde tramitarlo?</p>
                    <a
                        href={OFICINAS_LOCATOR_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn--primary"
                    >
                        Buscar mi oficina más cercana
                    </a>
                    <p className="ayudas-detail__locator-note">
                        Te lleva al buscador oficial de oficinas de atención de la Administración
                        General del Estado — buscá ahí por tu código postal o localidad.
                    </p>
                </div>
            </div>
        </>
    );
}

export default AyudasPage;
