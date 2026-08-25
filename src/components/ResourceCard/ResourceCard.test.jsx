import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ResourceCard from './ResourceCard';

const recursoDePrueba = {
    name: 'ARASAAC',
    tipo: 'Portal',
    description: 'Sistema pictográfico de referencia en español.',
    category: 'comunicacion-aumentativa',
    org: 'Gobierno de Aragón',
    url: 'https://arasaac.org/',
};

describe('ResourceCard', () => {
    function renderResourceCard(props = recursoDePrueba) {
        render(<ResourceCard {...props} />);
    }

    it('renders the name, descrption and org', () => {
        renderResourceCard();
        expect(screen.getByText('ARASAAC')).toBeInTheDocument();
        expect(
            screen.getByText('Sistema pictográfico de referencia en español.')
        ).toBeInTheDocument();
        expect(screen.getByText('Gobierno de Aragón')).toBeInTheDocument();
    });

    it('renders the "Recurso externo" badge', () => {
        renderResourceCard();
        expect(screen.getByText('Recurso externo')).toBeInTheDocument();
    });

    it('renders a "Visitar" link that opens the ral URL in a new tab', () => {
        renderResourceCard();
        const link = screen.getByRole('link', { name: /visitar/i });
        expect(link).toHaveAttribute('href', 'https://arasaac.org/');
        expect(link).toHaveAttribute('target', '_blank');
        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('gives the tipo icon a real accesible name', () => {
        renderResourceCard();
        expect(screen.getByRole('img', { name: 'Portal' })).toBeInTheDocument();
    });
});
