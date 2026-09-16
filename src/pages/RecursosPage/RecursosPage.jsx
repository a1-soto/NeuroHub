import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { recursos } from '../../data/recursos';
import ResourceCard from '../../components/ResourceCard/ResourceCard';
import GooChipFilter from '../../components/GooChipFilter/GooChipFilter';

const CATEGORIAS = [
    { value: '', label: 'Todos' },
    { value: 'comunicacion-aumentativa', label: 'Comunicación Aumentativa' },
    { value: 'lectura-facil', label: 'Lectura Fácil' },
    { value: 'autismo', label: 'Autismo' },
    { value: 'tdah', label: 'TDAH' },
    { value: 'dislexia', label: 'Dislexia' },
    { value: 'procesamiento-sensorial', label: 'Procesamiento Sensorial' },
    { value: 'altas-capacidades', label: 'Altas Capacidades' },
];

const CATEGORIA_VALUES = CATEGORIAS.map((c) => c.value);

function RecursosPage() {
    const [busqueda, setBusqueda] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const categoriaParam = searchParams.get('categoria');
        if (categoriaParam && !CATEGORIA_VALUES.includes(categoriaParam)) {
            setSearchParams({}, { replace: true });
        }
    }, [searchParams, setSearchParams]);

    const categoriaParam = searchParams.get('categoria');
    const categoriaActiva = CATEGORIA_VALUES.includes(categoriaParam) ? categoriaParam : '';

    const recursosFiltrados = recursos.filter((r) => {
        const matchesCategoria = !categoriaActiva || r.category === categoriaActiva;
        const texto = `${r.name} ${r.description} ${r.org} ${r.tipo}`.toLowerCase();
        const matchesBusqueda = !busqueda || texto.includes(busqueda.trim().toLowerCase());
        return matchesCategoria && matchesBusqueda;
    });

    function handleBusquedaChange(e) {
        setBusqueda(e.target.value);
    }

    function handleBusquedaClear() {
        setBusqueda('');
    }

    function handleCategoriaChange(value) {
        if (value) {
            setSearchParams({ categoria: value });
        } else {
            setSearchParams({});
        }
    }

    return (
        <>
            <div className="page-header">
                <h1>Biblioteca de Recursos</h1>
                <p>
                    Materiales gratuitos y organizaciones reales para autismo, TDAH, dislexia,
                    procesamiento sensorial y altas capacidades — cada recurso enlaza a su fuente
                    original.
                </p>
            </div>

            <div className="filterbar">
                <div className="filterbar__search">
                    <Search aria-hidden="true" />
                    <label className="sr-only" htmlFor="recSearch">
                        Buscar recurso
                    </label>
                    <input
                        id="recSearch"
                        type="text"
                        placeholder="Buscar recursos…"
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
                    options={CATEGORIAS}
                    value={categoriaActiva}
                    onChange={handleCategoriaChange}
                    ariaLabel="Filtrar recursos por categoría"
                />
            </div>

            <div className="card-grid">
                {recursosFiltrados.map((r) => (
                    <ResourceCard key={r.id} {...r} />
                ))}
                {recursosFiltrados.length === 0 && (
                    <p className="grid-empty">Ningún recurso coincide con ese filtro.</p>
                )}
            </div>
        </>
    );
}

export default RecursosPage;
