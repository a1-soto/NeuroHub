import { useState } from 'react';
import AidCard from './AidCard';

function MunicipioTabs({ municipios }) {
    const [municipioActivo, setMunicipioActivo] = useState(municipios[0].slug);
    const municipio = municipios.find((m) => m.slug === municipioActivo);

    function handleTabClick(slug) {
        setMunicipioActivo(slug);
    }

    return (
        <>
            <div className="tab-row">
                {municipios.map((m) => (
                    <button
                        key={m.slug}
                        className={m.slug === municipioActivo ? 'tab-btn active' : 'tab-btn'}
                        onClick={() => handleTabClick(m.slug)}
                    >
                        {m.label}
                    </button>
                ))}
            </div>
            {municipio.ayudas.length > 0 ? (
                <div className="aid-grid">
                    {municipio.ayudas.map((ayuda) => (
                        <AidCard key={ayuda.titulo} {...ayuda} />
                    ))}
                </div>
            ) : (
                <p className="placeholder-note">
                    Guía específica para {municipio.label} — próximamente.
                </p>
            )}
        </>
    );
}

export default MunicipioTabs;
