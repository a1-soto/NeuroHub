import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { profesionales } from '../../data/profesionales';
import ProfessionalCard from '../../components/ProfessionalCard/ProfessionalCard';
import GooChipFilter from '../../components/GooChipFilter/GooChipFilter';

const FILTROS = [
    { value: '', label: 'Todos' },
    { value: 'comunicacion', label: 'Comunicación' },
    { value: 'lectura', label: 'Lectura Fácil' },
    { value: 'tdah', label: 'TDAH' },
    { value: 'dislexia', label: 'Dislexia' },
    { value: 'autismo', label: 'Autismo' },
    { value: 'sensorial', label: 'Procesamiento Sensorial' },
    { value: 'altas', label: 'Altas Capacidades' },
    { value: 'online', label: 'Solo online' },
];

function ProfesionalesPage() {
    const [busqueda, setBusqueda] = useState('');
    const [filtroActivo, setFiltroActivo] = useState('');

    const profesionalesFiltrados = profesionales.filter((p) => {
        const matchesFiltro =
            !filtroActivo ||
            (filtroActivo === 'online'
                ? p.modalidad === 'online'
                : p.especialidad === filtroActivo);
        const texto = `${p.nombre} ${p.credencial} ${p.bio} ${p.region}`.toLowerCase();
        const matchesBusqueda = !busqueda || texto.includes(busqueda.trim().toLowerCase());
        return matchesFiltro && matchesBusqueda;
    });

    function handleBusquedaChange(e) {
        setBusqueda(e.target.value);
    }

    function handleBusquedaClear() {
        setBusqueda('');
    }

    return (
        <>
            <div className="page-header">
                <h1>Directorio de Profesionales</h1>
                <p>
                    Especialistas presenciales, online y mixtos por comunidad autónoma. Datos de
                    ejemplo — no son listados verificados.
                </p>
            </div>

            <div className="filterbar">
                <div className="filterbar__search">
                    <Search aria-hidden="true" />
                    <label className="sr-only" htmlFor="profSearch">
                        Buscar por nombre o especialidad
                    </label>
                    <input
                        id="profSearch"
                        type="text"
                        placeholder="Buscar por nombre o especialidad…"
                        value={busqueda}
                        onChange={handleBusquedaChange}
                    />
                    {busqueda && (
                        <button
                            type="button"
                            className="filterbar__search-clear"
                            onClick={handleBusquedaClear}
                            aria-label="Borrar búsqueda"
                        >
                            <X size={14} strokeWidth={3} aria-hidden="true" />
                        </button>
                    )}
                </div>

                <GooChipFilter
                    options={FILTROS}
                    value={filtroActivo}
                    onChange={setFiltroActivo}
                    ariaLabel="Filtrar profesionales"
                />
            </div>

            <div className="card-grid">
                {profesionalesFiltrados.map((p) => (
                    <ProfessionalCard key={p.id} {...p} />
                ))}
                {profesionalesFiltrados.length === 0 && (
                    <p className="grid-empty">Ningún profesional coincide con ese filtro.</p>
                )}
            </div>
        </>
    );
}

export default ProfesionalesPage;
