import { useState } from 'react';
import { comunidades, regionesDetalle } from '../../data/ayudas';
import RegionCard from '../../features/ayudas/RegionCard';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import MunicipioTabs from '../../features/ayudas/MunicipioTabs';
import ProvinciaSelector from '../../features/ayudas/ProvinciaSelector';
import './AyudasPage.css';

function AyudasLanding() {
    const [busqueda, setBusqueda] = useState('');
    const [soloDisponibles, setSoloDisponibles] = useState(false);

    const comunidadesFiltradas = comunidades.filter((c) => {
        const texto = c.label.toLowerCase();
        const matchesBusqueda = !busqueda || texto.includes(busqueda.trim().toLowerCase());
        const matchesFiltro = !soloDisponibles || c.status === 'ready';
        return matchesBusqueda && matchesFiltro;
    });

    function handleBusquedaChange(e) {
        setBusqueda(e.target.value);
    }

    function handleFiltroChange(e) {
        setSoloDisponibles(e.target.value === 'disponibles');
    }

    return (
        <section className="wash">
            <h1 className="section-title">Guías de Ayudas Públicas</h1>
            <p className="section-sub">
                Los trámites y los tiempos varían según dónde vivís. Elegí tu comunidad autónoma —
                ya tenemos guías completas para Madrid, Cataluña y Andalucía; el resto se suma en
                próximas versiones.
            </p>
            <div className="content-layout">
                <div className="filter-sidebar">
                    <label className="sr-only" htmlFor="ayudaSearch">
                        Buscar comunidad
                    </label>
                    <div className="search-wrap">
                        <input
                            id="ayudaSearch"
                            type="text"
                            placeholder="Buscar…"
                            value={busqueda}
                            onChange={handleBusquedaChange}
                        />
                    </div>
                    <label className="sr-only" htmlFor="ayudaFiltro">
                        Filtro
                    </label>
                    <select id="ayudaFiltro" onChange={handleFiltroChange}>
                        <option value="todas">Todas las Ayudas</option>
                        <option value="disponibles">Con guía disponible</option>
                    </select>
                </div>
                <div className="ayudas-grid">
                    {comunidadesFiltradas.map((c) => (
                        <RegionCard key={c.slug} {...c} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function RegionMadrid() {
    const region = regionesDetalle.madrid;

    return (
        <section className="wash">
            <Link to="/ayudas" className="back-link">
                ← Volver a Ayudas
            </Link>
            <h1 className="section-title">Ayudas en la {region.label}</h1>
            <p className="section-sub">
                Madrid es una comunidad uniprovincial: la provincia coincide con la comunidad
                autónoma. Elegí tu municipio.
            </p>
            <div className="region-stat">
                Tiempo medio de tramitación en Madrid:{' '}
                <strong>{region.tiempoTramitacion} días</strong>
            </div>
            <MunicipioTabs municipios={region.municipios} />
        </section>
    );
}

function RegionCataluna() {
    const region = regionesDetalle.cataluna;

    return (
        <section className="wash">
            <Link to="/ayudas" className="back-link">
                ← Volver a Ayudas
            </Link>
            <h1 className="section-title">Ayudas en {region.label}</h1>
            <p className="section-sub">
                Cataluña tiene varias provincias, a diferencia de Madrid — elegí la tuya y después
                tu municipio.
            </p>
            <div className="region-stat">
                Tiempo medio de tramitación en Cataluña:{' '}
                <strong>{region.tiempoTramitacion} días</strong>
            </div>
            <ProvinciaSelector provincias={region.provincias} regionSlug="cataluna" />
        </section>
    );
}

function RegionAndalucia() {
    const region = regionesDetalle.andalucia;

    return (
        <section className="wash">
            <Link to="/ayudas" className="back-link">
                ← Volver a Ayudas
            </Link>
            <h1 className="section-title">Ayudas en {region.label}</h1>
            <p className="section-sub">
                Andalucía también se organiza en provincias — elegí la tuya y después tu municipio.
            </p>
            <div className="region-stat">
                Tiempo medio de tramitación en Andalucía:{' '}
                <strong>{region.tiempoTramitacion} días</strong>
            </div>
            <ProvinciaSelector provincias={region.provincias} regionSlug="andalucia" />
        </section>
    );
}

function AyudasPage() {
    return (
        <Routes>
            <Route index element={<AyudasLanding />} />
            <Route path="madrid" element={<RegionMadrid />} />
            <Route path="cataluna" element={<Navigate to="/ayudas/cataluna/barcelona" replace />} />
            <Route path="cataluna/:provincia" element={<RegionCataluna />} />
            <Route path="andalucia" element={<Navigate to="/ayudas/andalucia/sevilla" replace />} />
            <Route path="andalucia/:provincia" element={<RegionAndalucia />} />
        </Routes>
    );
}

export default AyudasPage;
