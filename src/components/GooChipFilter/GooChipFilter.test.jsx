import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import GooChipFilter from './GooChipFilter';

const opcionesDePrueba = [
    { value: 'todos', label: 'Todos' },
    { value: 'autismo', label: 'Autismo' },
    { value: 'tdah', label: 'TDAH' },
];

describe('GooChipFilter', () => {
    function renderGooChipFilter(overrides = {}) {
        const onChange = vi.fn();
        render(
            <GooChipFilter
                options={opcionesDePrueba}
                value="todos"
                onChange={onChange}
                ariaLabel="Filtrar por categoría"
                {...overrides}
            />
        );
        return { onChange };
    }

    it('renders a chip for each option', () => {
        renderGooChipFilter();
        expect(screen.getByRole('button', { name: 'Todos' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Autismo' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'TDAH' })).toBeInTheDocument();
    });

    it('marks the chip matching "value" as pressed, and the rest as not', () => {
        renderGooChipFilter({ value: 'autismo' });
        expect(screen.getByRole('button', { name: 'Autismo' })).toHaveAttribute(
            'aria-pressed',
            'true'
        );
        expect(screen.getByRole('button', { name: 'Todos' })).toHaveAttribute(
            'aria-pressed',
            'false'
        );
        expect(screen.getByRole('button', { name: 'TDAH' })).toHaveAttribute(
            'aria-pressed',
            'false'
        );
    });

    it("calls onChange with the clicked chip's value", () => {
        const { onChange } = renderGooChipFilter({ value: 'todos' });
        fireEvent.click(screen.getByRole('button', { name: 'TDAH' }));
        expect(onChange).toHaveBeenCalledWith('tdah');
    });

    it('calls onChange even when the already-active chip is clicked again', () => {
        const { onChange } = renderGooChipFilter({ value: 'todos' });
        fireEvent.click(screen.getByRole('button', { name: 'Todos' }));
        expect(onChange).toHaveBeenCalledWith('todos');
    });

    it('exposes the chip group with the given aria-label', () => {
        renderGooChipFilter();
        expect(screen.getByRole('group', { name: 'Filtrar por categoría' })).toBeInTheDocument();
    });
});
