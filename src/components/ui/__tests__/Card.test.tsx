import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Card from '../Card';

describe('Card', () => {
    it('renders with default props', () => {
        render(<Card>Card content</Card>);
        const card = screen.getByText('Card content').parentElement;
        expect(card).toBeInTheDocument();
        expect(card).toHaveClass('bg-white', 'dark:bg-slate-800', 'rounded-2xl');
    });

    it('applies custom className', () => {
        render(<Card className="custom-class">Card content</Card>);
        const card = screen.getByText('Card content').parentElement;
        expect(card).toHaveClass('custom-class');
    });

    it('renders children correctly', () => {
        render(
            <Card>
                <h2>Card Title</h2>
                <p>Card description</p>
            </Card>
        );
        
        expect(screen.getByText('Card Title')).toBeInTheDocument();
        expect(screen.getByText('Card description')).toBeInTheDocument();
    });

    it('has proper accessibility attributes', () => {
        render(<Card>Card content</Card>);
        const card = screen.getByText('Card content').parentElement;
        expect(card).toHaveAttribute('role', 'generic');
    });

    it('applies dark mode classes', () => {
        render(<Card>Card content</Card>);
        const card = screen.getByText('Card content').parentElement;
        expect(card).toHaveClass('dark:bg-slate-800', 'dark:border-slate-700');
    });

    it('has proper styling classes', () => {
        render(<Card>Card content</Card>);
        const card = screen.getByText('Card content').parentElement;
        expect(card).toHaveClass('shadow-md', 'border', 'p-6');
    });
});