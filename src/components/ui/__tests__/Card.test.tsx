import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Card from '../Card';

describe('Card', () => {
    it('renders children correctly', () => {
        render(<Card><p>Card content</p></Card>);
        expect(screen.getByText('Card content')).toBeInTheDocument();
    });

    it('applies elevated variant by default', () => {
        render(<Card>Elevated Card</Card>);
        const card = screen.getByText('Elevated Card').parentElement;
        expect(card?.className).toContain('shadow-md');
    });

    it('applies flat variant', () => {
        render(<Card variant="flat">Flat Card</Card>);
        const card = screen.getByText('Flat Card').parentElement;
        expect(card?.className).toContain('bg-slate-50');
    });

    it('applies bordered variant', () => {
        render(<Card variant="bordered">Bordered Card</Card>);
        const card = screen.getByText('Bordered Card').parentElement;
        expect(card?.className).toContain('border-2');
    });

    it('applies glass variant', () => {
        render(<Card variant="glass">Glass Card</Card>);
        const card = screen.getByText('Glass Card').parentElement;
        expect(card?.className).toContain('glass-effect');
    });

    it('applies different padding sizes', () => {
        const { rerender } = render(<Card padding="sm">Small padding</Card>);
        expect(screen.getByText('Small padding').parentElement?.className).toContain('p-4');

        rerender(<Card padding="lg">Large padding</Card>);
        expect(screen.getByText('Large padding').parentElement?.className).toContain('p-12');

        rerender(<Card padding="none">No padding</Card>);
        expect(screen.getByText('No padding').parentElement?.className).toContain('p-0');
    });

    it('applies custom className', () => {
        render(<Card className="custom-class">Custom</Card>);
        const card = screen.getByText('Custom').parentElement;
        expect(card?.className).toContain('custom-class');
    });

    it('adds cursor-pointer when onClick is provided', () => {
        render(<Card onClick={() => { }}>Clickable</Card>);
        const card = screen.getByText('Clickable').parentElement;
        expect(card?.className).toContain('cursor-pointer');
    });

    it('applies aria-labelledby when provided', () => {
        render(<Card aria-labelledby="card-title">Card with ARIA</Card>);
        const card = screen.getByText('Card with ARIA').parentElement;
        expect(card).toHaveAttribute('aria-labelledby', 'card-title');
    });

    it('applies role when provided', () => {
        render(<Card role="article">Card with role</Card>);
        expect(screen.getByRole('article')).toBeInTheDocument();
    });
});
