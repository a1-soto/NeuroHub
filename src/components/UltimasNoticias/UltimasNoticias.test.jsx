import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import UltimasNoticias from './UltimasNoticias';

describe('UltimasNoticias', () => {
    function renderUltimasNoticias() {
        render(
            <MemoryRouter>
                <UltimasNoticias />
            </MemoryRouter>
        );
    }

    it('renders the section title', () => {
        renderUltimasNoticias();
        expect(screen.getByText('Últimas Noticias')).toBeInTheDocument();
    });

    it('renders four news itmes', () => {
        renderUltimasNoticias();
        expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(4);
    });
});
