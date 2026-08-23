import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import Hero from './Hero';

describe('Hero', () => {
    function renderHero() {
        render(
            <MemoryRouter>
                <Hero />
            </MemoryRouter>
        );
    }

    it('reners the headline', () => {
        renderHero();
        expect(
            screen.getByText(
                'Información, Recursos y Especialistas para la Comunidad Neurodivergente'
            )
        ).toBeInTheDocument();
    });

    it('renders the subtitle', () => {
        renderHero();
        expect(screen.getByText(/Un portal accesible para autismo/)).toBeInTheDocument();
    });

    it('renders the two CTA links', () => {
        renderHero();
        expect(screen.getAllByRole('link')).toHaveLength(2);
    });
});
