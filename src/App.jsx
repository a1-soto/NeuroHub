import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AccesibilidadContext } from './context/AccesibilidadContext';

import { useState, useEffect } from 'react';

import Nav from './components/Nav/Nav';
import Footer from './components/Footer/Footer';

import ReadingGuide from './components/ReadingGuide/ReadingGuide';

import InicioPage from './pages/InicioPage';
import NoticiasPage from './pages/NoticiasPage';
import RecursosPage from './pages/RecursosPage';
import ProfesionalesPage from './pages/ProfesionalesPage';
import AyudasPage from './pages/AyudasPage';
import CursoPage from './pages/CursoPage';
import BlogPage from './pages/BlogPage';
import ContactoPage from './pages/ContactoPage';
import DonacionPage from './pages/DonacionPage';
import TestimoniosPage from './pages/TestimoniosPage';
import QuienesSomosPage from './pages/QuienesSomosPage';
import AvisoLegalPage from './pages/AvisoLegalPage';
import PrivacidadPage from './pages/PrivacidadPage';
import CondicionesPage from './pages/CondicionesPage';
import CookiesPage from './pages/CookiesPage';

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
        if (temaColor === 'sepia') {
            document.documentElement.dataset.colorTheme = 'sepia';
        } else {
            delete document.documentElement.dataset.colorTheme;
        }
    }, [bajoEstimulo, movimientoReducido, guiaLectura, tamañoTexto, interlineado, temaColor]);

    const accesibilidad = {
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
    };

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
                        <Route path="/ayudas/*" element={<AyudasPage />} />
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
            </BrowserRouter>
        </AccesibilidadContext.Provider>
    );
}

export default App;
