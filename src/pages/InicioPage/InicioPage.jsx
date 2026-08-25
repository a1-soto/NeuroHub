import AccesosRapidos from '../../components/AccesosRapidos/AccesosRapidos';
import Hero from '../../components/Hero/Hero';
import UltimasNoticias from '../../components/UltimasNoticias/UltimasNoticias';
import BlogTeaser from '../../components/BlogTeaser/BlogTeaser';

function InicioPage() {
    return (
        <>
            <Hero />
            <AccesosRapidos />
            <UltimasNoticias />
            <BlogTeaser />
        </>
    );
}

export default InicioPage;
