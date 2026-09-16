import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ResourceCard from './ResourceCard';

const recursoDePrueba = {
    name: 'ARASAAC',
    description: 'Sistema pictográfico de referencia en español.',
    category: 'comunicacion-aumentativa',
    url: 'https://arasaac.org/',
    org: 'Gobierno de Aragón',
    tipo: 'Portal',
};

describe('ResourceCard', () => {
    function renderResourceCard(props = recursoDePrueba) {
        render(<ResourceCard {...props} />);
    }

    it('renders the name and description', () => {
        renderResourceCard();
        expect(screen.getByText('ARASAAC')).toBeInTheDocument();
        expect(
            screen.getByText('Sistema pictográfico de referencia en español.')
        ).toBeInTheDocument();
    });

    it('renders the org and tipo', () => {
        renderResourceCard();
        expect(screen.getByText('Gobierno de Aragón')).toBeInTheDocument();
        expect(screen.getByText('Portal')).toBeInTheDocument();
    });

    it('renders a "Sitio oficial" link that opens the real URL in a new tab', () => {
        renderResourceCard();
        const link = screen.getByRole('link', { name: /sitio oficial/i });
        expect(link).toHaveAttribute('href', 'https://arasaac.org/');
        expect(link).toHaveAttribute('target', '_blank');
        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
});
