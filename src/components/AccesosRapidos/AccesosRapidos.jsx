import { Folder, Users, FileText } from 'lucide-react';
import { useRevealOnScroll } from '../../hooks/useRevealOnScroll';
import QuickCard from './QuickCard';
import './AccesosRapidos.css';

const accesos = [
    {
        icon: Folder,
        title: 'Recursos',
        description:
            'Pictogramas, guías de Lectura Fácil y materiales prácticos por tipo de apoyo.',
        href: '/recursos',
    },
    {
        icon: Users,
        title: 'Profesionales',
        description: 'Directorio filtrable por comunidad, municipio, especialidad y modalidad.',
        href: '/profesionales',
    },
    {
        icon: FileText,
        title: 'Ayudas públicas',
        description: 'Qué existe, cómo se pide y qué plazos maneja tu comunidad.',
        href: '/ayudas',
    },
];

function AccesosRapidos() {
    const gridRef = useRevealOnScroll();

    return (
        <section className="accesos-rapidos px-9 mt-14">
            <h2 className="section-title">Accesos Rápidos</h2>
            <div ref={gridRef} className="quick-grid grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
                {accesos.map((item) => (
                    <QuickCard key={item.title} {...item} />
                ))}
            </div>
        </section>
    );
}

export default AccesosRapidos;
