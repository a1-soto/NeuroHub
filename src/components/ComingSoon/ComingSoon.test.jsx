import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import ComingSoon from './ComingSoon';

describe('ComingSoon', () => {
    function renderComingSoon() {
        render(
            <MemoryRouter>
                <ComingSoon title="Noticias" />
            </MemoryRouter>
        );
    }

    it('renders the page title as the main heading', () => {
        renderComingSoon();
        expect(screen.getByRole('heading', { level: 1, name: 'Noticias' })).toBeInTheDocument();
    });

    it('links back to the finished sections', () => {
        renderComingSoon();
        expect(screen.getByRole('link', { name: 'Ver recursos' })).toHaveAttribute(
            'href',
            '/recursos'
        );
        expect(screen.getByRole('link', { name: 'Volver al inicio' })).toHaveAttribute('href', '/');
    });
});
