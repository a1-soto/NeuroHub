import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import Footer from './Footer';

describe('Footer', () => {
    function renderFooter() {
        render(
            <MemoryRouter>
                <Footer />
            </MemoryRouter>
        );
    }

    it('renders the 5 legal links with corret hrefs', () => {
        renderFooter();
        expect(screen.getByRole('link', { name: '¿Quiénes somos?' })).toHaveAttribute(
            'href',
            '/quienes-somos'
        );

        expect(screen.getByRole('link', { name: 'Aviso Legal' })).toHaveAttribute(
            'href',
            '/aviso-legal'
        );
        expect(screen.getByRole('link', { name: 'Política de Privacidad' })).toHaveAttribute(
            'href',
            '/privacidad'
        );
        expect(screen.getByRole('link', { name: 'Condiciones del servicio' })).toHaveAttribute(
            'href',
            '/condiciones'
        );
        expect(screen.getByRole('link', { name: 'Política de Cookies' })).toHaveAttribute(
            'href',
            '/cookies'
        );
    });

    it('renders the Testimonios card with its link to /testimonios', () => {
        renderFooter();
        expect(screen.getByRole('heading', { name: 'Testimonios' }));
        expect(screen.getByRole('link', { name: 'Ir' })).toHaveAttribute('href', '/testimonios');
    });

    it('renders the Apoya card with its link to /donacion', () => {
        renderFooter();
        expect(screen.getByRole('heading', { name: 'Apoya' }));
        expect(screen.getByRole('link', { name: 'Donar' })).toHaveAttribute('href', '/donacion');
    });

    it('renders the 3 social icons with accessible names', () => {
        renderFooter();
        expect(screen.getByRole('link', { name: 'Sitio web' }));
        expect(screen.getByRole('link', { name: 'X (Twitter)' }));
        expect(screen.getByRole('link', { name: 'Instagram' }));
    });

    it('renders the copyright text', () => {
        renderFooter();
        expect(screen.getByText('© 2026 NeuroHub — derechos reservados'));
    });
});
