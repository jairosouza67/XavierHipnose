import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from '../Button';

describe('Button', () => {
    it('renders with default props', () => {
        render(<Button>Click me</Button>);
        const button = screen.getByRole('button', { name: /click me/i });
        expect(button).toBeInTheDocument();
    });

    it('renders with primary variant by default', () => {
        render(<Button>Primary</Button>);
        const button = screen.getByRole('button');
        expect(button.className).toContain('bg-secondary');
    });

    it('renders secondary variant', () => {
        render(<Button variant="secondary">Secondary</Button>);
        const button = screen.getByRole('button');
        expect(button.className).toContain('bg-primary');
    });

    it('renders ghost variant', () => {
        render(<Button variant="ghost">Ghost</Button>);
        const button = screen.getByRole('button');
        expect(button.className).toContain('bg-transparent');
    });

    it('renders outline variant', () => {
        render(<Button variant="outline">Outline</Button>);
        const button = screen.getByRole('button');
        expect(button.className).toContain('border-2');
    });

    it('renders with different sizes', () => {
        const { rerender } = render(<Button size="sm">Small</Button>);
        expect(screen.getByRole('button').className).toContain('px-4 py-1.5');

        rerender(<Button size="lg">Large</Button>);
        expect(screen.getByRole('button').className).toContain('px-8 py-3.5');
    });

    it('shows loading state', () => {
        render(<Button loading>Loading</Button>);
        const button = screen.getByRole('button');
        expect(button).toBeDisabled();
    });

    it('renders with left icon', () => {
        render(<Button leftIcon={<span data-testid="left-icon">→</span>}>With Icon</Button>);
        expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    });

    it('renders with right icon', () => {
        render(<Button rightIcon={<span data-testid="right-icon">←</span>}>With Icon</Button>);
        expect(screen.getByTestId('right-icon')).toBeInTheDocument();
    });

    it('handles click events', async () => {
        const handleClick = vi.fn();
        const user = userEvent.setup();

        render(<Button onClick={handleClick}>Clickable</Button>);
        await user.click(screen.getByRole('button'));

        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('is disabled when loading', async () => {
        const handleClick = vi.fn();
        const user = userEvent.setup();

        render(<Button loading onClick={handleClick}>Loading</Button>);
        await user.click(screen.getByRole('button'));

        expect(handleClick).not.toHaveBeenCalled();
    });

    it('applies custom className', () => {
        render(<Button className="custom-class">Custom</Button>);
        expect(screen.getByRole('button').className).toContain('custom-class');
    });
});
