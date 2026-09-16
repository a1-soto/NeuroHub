import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { AccesibilidadContext } from './context/AccesibilidadContext';
import { comunidades } from './data/ayudas';

import { useState, useEffect, useMemo } from 'react';

import Nav from './components/Nav/Nav';
import Footer from './components/Footer/Footer';

import ReadingGuide from './components/ReadingGuide/ReadingGuide';
import ScrollProgress from './components/ScrollProgress/ScrollProgress';
import BackToTop from './components/BackToTop/BackToTop';

import InicioPage from './pages/InicioPage/InicioPage';
import NoticiasPage from './pages/NoticiasPage/NoticiasPage';
import RecursosPage from './pages/RecursosPage/RecursosPage';
import ProfesionalesPage from './pages/ProfesionalesPage/ProfesionalesPage';
import AyudasPage from './pages/AyudasPage/AyudasPage';
import CursoPage from './pages/CursoPage/CursoPage';
import BlogPage from './pages/BlogPage/BlogPage';
import ContactoPage from './pages/ContactoPage/ContactoPage';
import DonacionPage from './pages/DonacionPage/DonacionPage';
import TestimoniosPage from './pages/TestimoniosPage/TestimoniosPage';
import QuienesSomosPage from './pages/QuienesSomosPage/QuienesSomosPage';
import AvisoLegalPage from './pages/AvisoLegalPage/AvisoLegalPage';
import PrivacidadPage from './pages/PrivacidadPage/PrivacidadPage';
import CondicionesPage from './pages/CondicionesPage/CondicionesPage';
import CookiesPage from './pages/CookiesPage/CookiesPage';

// Old nested routing scheme was /ayudas/:region/:provincia?/:municipio? — the
// region/provincia/municipio drill-down now lives on one page (AyudasPage),
// selected via ?region=. This keeps a deep link's region instead of always
// dropping it, so an indexed/bookmarked /ayudas/andalucia/sevilla still lands
// on Andalucía instead of silently defaulting to Madrid.
function AyudasLegacyRedirect() {
    const { '*': wildcard } = useParams();
    const [regionSlug] = (wildcard ?? '').split('/');
    const esRegionConocida = comunidades.some((c) => c.slug === regionSlug);

    return <Navigate to={esRegionConocida ? `/ayudas?region=${regionSlug}` : '/ayudas'} replace />;
}

function App() {
    const [bajoEstimulo, setBajoEstimulo] = useState(false);
    const [movimientoReducido, setMovimientoReducido] = useState(false);
    const [guiaLectura, setGuiaLectura] = useState(false);
    const [tamañoTexto, setTamañoTexto] = useState(0);
    const [interlineado, setInterlineado] = useState('normal');
    const [temaColor, setTemaColor] = useState('neutral');

    useEffect(() => {
        document.documentElement.dataset.bajoEstimulo = bajoEstimulo;
        document.documentElement.dataset.reducedMotion = movimientoReducido;
        document.documentElement.dataset.textSize = tamañoTexto;
        document.documentElement.dataset.lineHeight = interlineado;
        document.documentElement.dataset.readingGuide = guiaLectura;
        document.documentElement.dataset.colorTheme = temaColor;
    }, [bajoEstimulo, movimientoReducido, guiaLectura, tamañoTexto, interlineado, temaColor]);

    const accesibilidad = useMemo(
        () => ({
            bajoEstimulo,
            setBajoEstimulo,
            movimientoReducido,
            setMovimientoReducido,
            guiaLectura,
            setGuiaLectura,
            tamañoTexto,
            setTamañoTexto,
            interlineado,
            setInterlineado,
            temaColor,
            setTemaColor,
        }),
        [bajoEstimulo, movimientoReducido, guiaLectura, tamañoTexto, interlineado, temaColor]
    );

    return (
        <AccesibilidadContext.Provider value={accesibilidad}>
            <BrowserRouter>
                <Nav />
                <main>
                    <Routes>
                        <Route path="/" element={<InicioPage />} />
                        <Route path="/noticias" element={<NoticiasPage />} />
                        <Route path="/recursos" element={<RecursosPage />} />
                        <Route path="/profesionales" element={<ProfesionalesPage />} />
                        <Route path="/ayudas" element={<AyudasPage />} />
                        <Route path="/ayudas/*" element={<AyudasLegacyRedirect />} />
                        <Route path="/curso" element={<CursoPage />} />
                        <Route path="/blog" element={<BlogPage />} />
                        <Route path="/contacto" element={<ContactoPage />} />
                        <Route path="/donacion" element={<DonacionPage />} />
                        <Route path="/testimonios" element={<TestimoniosPage />} />
                        <Route path="/quienes-somos" element={<QuienesSomosPage />} />
                        <Route path="/aviso-legal" element={<AvisoLegalPage />} />
                        <Route path="/privacidad" element={<PrivacidadPage />} />
                        <Route path="/condiciones" element={<CondicionesPage />} />
                        <Route path="/cookies" element={<CookiesPage />} />
                    </Routes>
                </main>
                <Footer />
                <ReadingGuide />
                <ScrollProgress />
                <BackToTop />
            </BrowserRouter>
        </AccesibilidadContext.Provider>
    );
}

export default App;
