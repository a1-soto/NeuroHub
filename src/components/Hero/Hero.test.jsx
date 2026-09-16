import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, afterEach } from 'vitest';
import Hero from './Hero';
import { AccesibilidadContext } from '../../context/AccesibilidadContext';

describe('Hero', () => {
    function renderHero(movimientoReducido = false) {
        const { container, rerender } = render(
            <MemoryRouter>
                <AccesibilidadContext.Provider value={{ movimientoReducido }}>
                    <Hero />
                </AccesibilidadContext.Provider>
            </MemoryRouter>
        );
        return { container, rerender };
    }

    function setScrollY(value) {
        Object.defineProperty(window, 'scrollY', { value, configurable: true });
    }

    afterEach(() => {
        setScrollY(0);
    });

    it('reners the headline', () => {
        renderHero();
        expect(screen.getByText('Información, recursos')).toBeInTheDocument();
        expect(screen.getByText('y especialistas para la')).toBeInTheDocument();
        expect(screen.getByText('comunidad neurodivergente')).toBeInTheDocument();
    });

    it('renders the subtitle', () => {
        renderHero();
        expect(screen.getByText(/Un portal accesible para autismo/)).toBeInTheDocument();
    });

    it('renders the two CTA links', () => {
        renderHero();
        expect(screen.getAllByRole('link')).toHaveLength(2);
    });

    it('moves the blob based on scroll position', async () => {
        const { container } = renderHero(false);
        const blob = container.querySelector('.hero__blob');

        setScrollY(800);
        fireEvent.scroll(window);

        await waitFor(() => {
            expect(blob.style.transform).toBe('translateY(-2%)');
        });
    });

    it('clears the blob transform when reduced motion turns on mid-scroll', async () => {
        const { container, rerender } = renderHero(false);
        const blob = container.querySelector('.hero__blob');

        setScrollY(800);
        fireEvent.scroll(window);
        await waitFor(() => {
            expect(blob.style.transform).toBe('translateY(-2%)');
        });

        rerender(
            <MemoryRouter>
                <AccesibilidadContext.Provider value={{ movimientoReducido: true }}>
                    <Hero />
                </AccesibilidadContext.Provider>
            </MemoryRouter>
        );

        expect(blob.style.transform).toBe('');
    });
});
