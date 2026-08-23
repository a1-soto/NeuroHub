import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import BlogTeaser from './BlogTeaser';

describe('BlogTeaser', () => {
    function renderBlogTeaser() {
        render(
            <MemoryRouter>
                <BlogTeaser />
            </MemoryRouter>
        );
    }

    it('renders the post title', () => {
        renderBlogTeaser();
        expect(screen.getByText('Entendiendo el masking o enmascaramiento')).toBeInTheDocument();
    });

    it('renders the author name', () => {
        renderBlogTeaser();
        expect(screen.getByText(/Elena Gómez/)).toBeInTheDocument();
    });
});
