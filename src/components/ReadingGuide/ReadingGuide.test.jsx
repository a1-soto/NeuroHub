import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ReadingGuide from './ReadingGuide';
import { AccesibilidadContext } from '../../context/AccesibilidadContext';

describe('ReadingGuide', () => {
    function renderGuide(guiaLectura) {
        return render(
            <AccesibilidadContext.Provider value={{ guiaLectura }}>
                <ReadingGuide />
            </AccesibilidadContext.Provider>
        );
    }

    it('always renders the reading-guide div', () => {
        const { container } = renderGuide(false);
        expect(container.querySelector('.reading-guide')).toBeInTheDocument();
    });

    it('updates its top position on mousemove when guiaLectura is true', () => {
        const { container } = renderGuide(true);
        fireEvent.mouseMove(document, { clientY: 100 });
        expect(container.querySelector('.reading-guide').style.top).toBe('83px');
    });

    it('does not update position on mousemove when guiaLectura is false', () => {
        const { container } = renderGuide(false);
        fireEvent.mouseMove(document, { clientY: 100 });
        expect(container.querySelector('.reading-guide').style.top).toBe('');
    });

    it('stops updating after guiaLectura turns false (cleanup removes the listener)', () => {
        const { container, rerender } = renderGuide(true);
        fireEvent.mouseMove(document, { clientY: 100 });
        rerender(
            <AccesibilidadContext.Provider value={{ guiaLectura: false }}>
                <ReadingGuide />
            </AccesibilidadContext.Provider>
        );
        fireEvent.mouseMove(document, { clientY: 300 });
        expect(container.querySelector('.reading-guide').style.top).toBe('83px');
    });
});
