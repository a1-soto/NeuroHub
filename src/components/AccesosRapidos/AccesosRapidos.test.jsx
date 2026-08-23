import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import AccesosRapidos from './AccesosRapidos';

describe('AccesosRapidos', () => {
    function renderAccesosRapidos() {
        render(
            <MemoryRouter>
                <AccesosRapidos />
            </MemoryRouter>
        );
    }

    it('renders the three card titles', () => {
        renderAccesosRapidos();
        expect(screen.getByText('Recursos')).toBeInTheDocument();
        expect(screen.getByText('Profesionales')).toBeInTheDocument();
        expect(screen.getByText('Curso')).toBeInTheDocument();
    });

    it('renders three "Ver" links', () => {
        renderAccesosRapidos();
        expect(screen.getAllByRole('link')).toHaveLength(3);
    });
});
