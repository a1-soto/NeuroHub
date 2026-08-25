import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { X } from 'lucide-react';
import { recursos } from '../../data/recursos';
import ResourceCard from '../../components/ResourceCard/ResourceCard';
import './RecursosPage.css';

const CATEGORIAS = [
    { slug: 'comunicacion-aumentativa', label: 'Comunicación Aumentativa' },
    { slug: 'lectura-facil', label: 'Lectura Fácil' },
    { slug: 'autismo', label: 'Autismo' },
    { slug: 'tdah', label: 'TDAH' },
    { slug: 'dislexia', label: 'Dislexia' },
    { slug: 'procesamiento-sensorial', label: 'Procesamiento Sensorial' },
    { slug: 'altas-capacidades', label: 'Altas Capacidades' },
];

function RecursosPage() {
    const [busqueda, setBusqueda] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const categoriaActiva = searchParams.get('categoria') ?? '';

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

    function handleCategoriaChange(e) {
        const value = e.target.value;
        if (value) {
            setSearchParams({ categoria: value });
        } else {
            setSearchParams({});
        }
    }

    return (
        <section className="wash">
            <h1 className="section-title">Biblioteca de Recursos</h1>
            <p className="section-sub">
                Materiales gratuitos y organizaciones reales para autismo, TDAH, dislexia,
                procesamiento sensorial y altas capacidades — cada recurso enlaza a su fuente
                original.
            </p>

            <div className="content-layout">
                <div className="filter-sidebar">
                    <label className="sr-only" htmlFor="recSearch">
                        Buscar recurso
                    </label>
                    <div className="search-wrap">
                        <input
                            id="recSearch"
                            type="text"
                            placeholder="Buscar…"
                            value={busqueda}
                            onChange={handleBusquedaChange}
                        />
                        {busqueda && (
                            <button
                                type="button"
                                className="search-clear"
                                onClick={handleBusquedaClear}
                                aria-label="Borrar búsqueda"
                            >
                                <X size={14} strokeWidth={3} aria-hidden="true" />
                            </button>
                        )}
                    </div>

                    <label className="sr-only" htmlFor="recCategoria">
                        Categoría
                    </label>
                    <select
                        id="recCategoria"
                        value={categoriaActiva}
                        onChange={handleCategoriaChange}
                    >
                        <option value="">Todos los Recursos</option>
                        {CATEGORIAS.map((cat) => (
                            <option key={cat.slug} value={cat.slug}>
                                {cat.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="recursos-grid">
                    {recursosFiltrados.map((r) => (
                        <ResourceCard key={r.id} {...r} />
                    ))}
                    {recursosFiltrados.length === 0 && (
                        <p className="recursos-empty">Ningún recurso coincide con ese filtro.</p>
                    )}
                </div>
            </div>
        </section>
    );
}

export default RecursosPage;
