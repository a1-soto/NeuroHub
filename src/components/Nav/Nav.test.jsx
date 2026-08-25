import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import Nav from './Nav';
import { AccesibilidadContext } from '../../context/AccesibilidadContext';

describe('Nav', () => {
    function renderNav(overrides = {}) {
        const value = {
            bajoEstimulo: false,
            setBajoEstimulo: vi.fn(),
            movimientoReducido: false,
            setMovimientoReducido: vi.fn(),
            guiaLectura: false,
            setGuiaLectura: vi.fn(),
            interlineado: 'normal',
            setInterlineado: vi.fn(),
            temaColor: 'neutral',
            setTemaColor: vi.fn(),
            tamañoTexto: 0,
            setTamañoTexto: vi.fn(),
            ...overrides,
        };
        render(
            <MemoryRouter>
                <AccesibilidadContext.Provider value={value}>
                    <Nav />
                </AccesibilidadContext.Provider>
            </MemoryRouter>
        );
        return value;
    }

    it('renders the 8 main nav links in order', () => {
        renderNav();

        const linkNames = [
            'Inicio',
            'Noticias',
            'Recursos',
            'Blog',
            'Profesionales',
            'Ayudas',
            'Curso',
            'Contacto',
        ];
        const allLinks = screen.getAllByRole('link');
        const topLevelNames = allLinks
            .map((link) => link.textContent)
            .filter((text) => linkNames.includes(text));
        expect(topLevelNames).toEqual(linkNames);
    });

    it('renders Recursos dropdwn submenu items whit correct hrefs', () => {
        renderNav();

        expect(screen.getByRole('link', { name: 'Comunicación Aumentativa' })).toHaveAttribute(
            'href',
            '/recursos?categoria=comunicacion-aumentativa'
        );
        expect(screen.getByRole('link', { name: 'Lectura Fácil' })).toHaveAttribute(
            'href',
            '/recursos?categoria=lectura-facil'
        );
        // REVISAR: este assert todavía busca el link viejo 'TDAH y Dislexia' — esa
        // categoría se separó en TDAH y Dislexia (dos ítems propios), así que ese
        // link ya no existe en el dropdown y este test va a fallar.
        // SOLUCIÓN: reemplazar por dos asserts, uno por cada categoría nueva:
        //   expect(screen.getByRole('link', { name: 'TDAH' })).toHaveAttribute(
        //       'href',
        //       '/recursos?categoria=tdah'
        //   );
        //   expect(screen.getByRole('link', { name: 'Dislexia' })).toHaveAttribute(
        //       'href',
        //       '/recursos?categoria=dislexia'
        //   );
        expect(screen.getByRole('link', { name: 'TDAH y Dislexia' })).toHaveAttribute(
            'href',
            '/recursos?categoria=tdah-dislexia'
        );
    });

    it('renders Ayudas dropdown submenu items with correct hrefs', () => {
        renderNav();
        expect(screen.getByRole('link', { name: 'Madrid' })).toHaveAttribute(
            'href',
            '/ayudas/madrid'
        );
        expect(screen.getByRole('link', { name: 'Cataluña' })).toHaveAttribute(
            'href',
            '/ayudas/cataluna'
        );
        expect(screen.getByRole('link', { name: 'Andalucía' })).toHaveAttribute(
            'href',
            '/ayudas/andalucia'
        );
    });

    it('show Bajo  Estímulo button as not pressed when context is false', () => {
        renderNav();
        expect(screen.getByRole('button', { name: 'Bajo Estímulo' })).toHaveAttribute(
            'aria-pressed',
            'false'
        );
    });

    it('shows Bajo Estímulo button as pressed when context is true', () => {
        renderNav({ bajoEstimulo: true });
        expect(screen.getByRole('button', { name: 'Bajo Estímulo' })).toHaveAttribute(
            'aria-pressed',
            'true'
        );
    });

    it('calls setbajoEstimulo with the opposite value on click', () => {
        const { setBajoEstimulo } = renderNav({ bajoEstimulo: false });

        fireEvent.click(screen.getByRole('button', { name: 'Bajo Estímulo' }));

        expect(setBajoEstimulo).toHaveBeenCalledWith(true);
    });

    it('opens the AccesibilidadPanel when "Ajustes UX" is clicked', () => {
        renderNav();
        const panelButton = screen.getByRole('button', { name: /ajustes ux/i });
        expect(panelButton).toHaveAttribute('aria-expanded', 'false');
        fireEvent.click(panelButton);
        expect(panelButton).toHaveAttribute('aria-expanded', 'true');
    });

    it('toggles nav__links--open class when hamburger is clicked', () => {
        renderNav();
        const hamburgerButton = screen.getByRole('button', { name: 'Abrir menú de navegación' });
        expect(hamburgerButton).toHaveAttribute('aria-expanded', 'false');
        fireEvent.click(hamburgerButton);
        expect(hamburgerButton).toHaveAttribute('aria-expanded', 'true');
    });
});
