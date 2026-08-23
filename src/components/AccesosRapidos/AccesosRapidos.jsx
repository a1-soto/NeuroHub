import { Folder, Users, Bookmark } from 'lucide-react';
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
        icon: Bookmark,
        title: 'Curso',
        description: 'Formación básica sobre el modelo social de la discapacidad.',
        href: '/curso',
    },
];

function AccesosRapidos() {
    return (
        <section className="accesos-rapidos">
            <h2 className="section-title">Accesos Rápidos</h2>
            <div className="quick-grid">
                {accesos.map((item) => (
                    <QuickCard key={item.title} {...item} />
                ))}
            </div>
        </section>
    );
}

export default AccesosRapidos;
