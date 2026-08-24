import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import AccesibilidadPanel from './AccesibilidadPanel';
import { AccesibilidadContext } from '../../context/AccesibilidadContext';

describe('AccesibilidadPanel', () => {
    function renderPanel(contextOverrides = {}, props = {}) {
        const value = {
            bajoEstimulo: false,
            setBajoEstimulo: vi.fn(),
            movimientoReducido: false,
            setMovimientoReducido: vi.fn(),
            guiaLectura: false,
            setGuiaLectura: vi.fn(),
            tamañoTexto: 0,
            setTamañoTexto: vi.fn(),
            interlineado: 'normal',
            setInterlineado: vi.fn(),
            temaColor: 'neutral',
            setTemaColor: vi.fn(),
            ...contextOverrides,
        };
        const onClose = vi.fn();
        render(
            <AccesibilidadContext.Provider value={value}>
                <AccesibilidadPanel open={true} onClose={onClose} />
            </AccesibilidadContext.Provider>
        );

        return { ...value, onClose };
    }

    it('renders the dialog with its accessible name', () => {
        renderPanel();

        expect(
            screen.getByRole('dialog', { name: 'Panel de Confort Sensorial' })
        ).toBeInTheDocument();
    });

    it('calls onClose when the close button is clicked', () => {
        const { onClose } = renderPanel();
        fireEvent.click(screen.getByRole('button', { name: 'Cerrar panel' }));
        expect(onClose).toHaveBeenCalled();
    });

    // --- Modo Bajo Estímulo ---
    it('shows the Bajo Estímulo toggle as pressed when context is true', () => {
        renderPanel({ bajoEstimulo: true });
        expect(screen.getByRole('button', { name: 'Activar modo bajo estímulo' })).toHaveAttribute(
            'aria-pressed',
            'true'
        );
    });
    it('calls setBajoEstimulo with the opposite value on click', () => {
        const { setBajoEstimulo } = renderPanel({ bajoEstimulo: false });
        fireEvent.click(screen.getByRole('button', { name: 'Activar modo bajo estímulo' }));
        expect(setBajoEstimulo).toHaveBeenCalledWith(true);
    });

    // --- Desactivar Movimientos ---
    it('calls setMovimientoReducido with the opposite value on click', () => {
        const { setMovimientoReducido } = renderPanel({ movimientoReducido: false });
        fireEvent.click(screen.getByRole('button', { name: 'Desactivar movimientos' }));
        expect(setMovimientoReducido).toHaveBeenCalledWith(true);
    });

    // --- Guía de Lectura ---
    it('calls setGuiaLectura with the opposite value on click', () => {
        const { setGuiaLectura } = renderPanel({ guiaLectura: false });
        fireEvent.click(screen.getByRole('button', { name: 'Activar guía de lectura' }));
        expect(setGuiaLectura).toHaveBeenCalledWith(true);
    });

    // --- Tamaño de Texto ---
    it('calls setTamañoTexto with the numeric value of the clicked chip', () => {
        const { setTamañoTexto } = renderPanel();
        fireEvent.click(screen.getByRole('button', { name: 'A+' }));
        expect(setTamañoTexto).toHaveBeenCalledWith(1);
    });

    it('marks the chip matching the current tamañoTexto as selected', () => {
        renderPanel({ tamañoTexto: 1 });
        expect(screen.getByRole('button', { name: 'A+' })).toHaveAttribute('aria-pressed', 'true');
    });

    // --- Interlineado (3 chips: normal / amplio / espaciado) ---
    it('calls setInterlineado with the value of the clicked chip', () => {
        const { setInterlineado } = renderPanel();
        fireEvent.click(screen.getByRole('button', { name: /amplio/i }));
        expect(setInterlineado).toHaveBeenCalledWith('amplio');
    });

    // --- Tema de Color (2 chips: neutral / sepia) ---
    it('calls setTemaColor with the value of the clicked chip', () => {
        const { setTemaColor } = renderPanel();
        fireEvent.click(screen.getByRole('button', { name: 'Sepia Suave' }));
        expect(setTemaColor).toHaveBeenCalledWith('sepia');
    });
});
