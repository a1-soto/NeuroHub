import { useParams, Link } from 'react-router-dom';
import MunicipioTabs from './MunicipioTabs';

function ProvinciaSelector({ provincias, regionSlug }) {
    const { provincia } = useParams();
    const provinciaActiva = provincias.find((p) => p.slug === provincia);

    return (
        <>
            <div className="tab-row">
                {provincias.map((p) => (
                    <Link
                        key={p.slug}
                        to={`/ayudas/${regionSlug}/${p.slug}`}
                        className={p.slug === provincia ? 'tab-btn active' : 'tab-btn'}
                    >
                        {p.label}
                    </Link>
                ))}
            </div>
            {!provinciaActiva ? (
                <p className="placeholder-note">
                    No encontramos la provincia "{provincia}". Elegí una de la lista de arriba.
                </p>
            ) : provinciaActiva.municipios.length > 0 ? (
                <MunicipioTabs municipios={provinciaActiva.municipios} />
            ) : (
                <p className="placeholder-note">
                    Guía específica para {provinciaActiva.label} — próximamente.
                </p>
            )}
        </>
    );
}

export default ProvinciaSelector;
