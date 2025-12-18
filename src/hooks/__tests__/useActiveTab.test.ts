import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useActiveTab } from '../useActiveTab';

// Mock scrollTo
const scrollToMock = vi.fn();
Object.defineProperty(window, 'scrollTo', { value: scrollToMock });

describe('useActiveTab', () => {
    beforeEach(() => {
        // Reset mocks
        scrollToMock.mockClear();
        document.body.innerHTML = '';
    });

    afterEach(() => {
        document.body.innerHTML = '';
    });

    it('should initialize with default tab', () => {
        const { result } = renderHook(() => useActiveTab('home'));
        expect(result.current.activeTab).toBe('home');
    });

    it('should update active tab when setActiveTab is called', () => {
        const { result } = renderHook(() => useActiveTab('home'));

        act(() => {
            result.current.setActiveTab('servicos');
        });

        expect(result.current.activeTab).toBe('servicos');
    });

    it('should scroll to element when handleTabChange is called', () => {
        // Create a mock element
        const mockElement = document.createElement('div');
        mockElement.id = 'contato';
        Object.defineProperty(mockElement, 'offsetTop', { value: 500 });
        document.body.appendChild(mockElement);

        const { result } = renderHook(() => useActiveTab('home'));

        act(() => {
            result.current.handleTabChange('contato');
        });

        expect(result.current.activeTab).toBe('contato');
        expect(scrollToMock).toHaveBeenCalledWith({
            top: 420, // 500 - 80 offset
            behavior: 'smooth',
        });
    });

    it('should not scroll if element does not exist', () => {
        const { result } = renderHook(() => useActiveTab('home'));

        act(() => {
            result.current.handleTabChange('nonexistent' as any);
        });

        expect(scrollToMock).not.toHaveBeenCalled();
    });
});
