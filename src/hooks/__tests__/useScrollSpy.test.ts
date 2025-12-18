import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useScrollSpy } from '../useScrollSpy';

describe('useScrollSpy', () => {
    let observerMock: {
        observe: ReturnType<typeof vi.fn>;
        disconnect: ReturnType<typeof vi.fn>;
    };
    let intersectionObserverCallback: (entries: IntersectionObserverEntry[]) => void;

    beforeEach(() => {
        observerMock = {
            observe: vi.fn(),
            disconnect: vi.fn(),
        };

        // Mock IntersectionObserver
        vi.stubGlobal('IntersectionObserver', vi.fn((callback) => {
            intersectionObserverCallback = callback;
            return observerMock;
        }));

        // Create mock sections
        ['home', 'servicos', 'contato'].forEach(id => {
            const el = document.createElement('div');
            el.id = id;
            document.body.appendChild(el);
        });
    });

    afterEach(() => {
        document.body.innerHTML = '';
        vi.unstubAllGlobals();
    });

    it('should observe all section elements', () => {
        const onActiveChange = vi.fn();
        const sectionIds = ['home', 'servicos', 'contato'];

        renderHook(() => useScrollSpy(sectionIds, onActiveChange));

        expect(observerMock.observe).toHaveBeenCalledTimes(3);
    });

    it('should call onActiveChange when a section intersects', () => {
        const onActiveChange = vi.fn();
        const sectionIds = ['home', 'servicos', 'contato'];

        renderHook(() => useScrollSpy(sectionIds, onActiveChange));

        // Simulate intersection
        intersectionObserverCallback([
            {
                isIntersecting: true,
                target: { id: 'servicos' } as Element,
            } as IntersectionObserverEntry,
        ]);

        expect(onActiveChange).toHaveBeenCalledWith('servicos');
    });

    it('should not call onActiveChange when section is not intersecting', () => {
        const onActiveChange = vi.fn();
        const sectionIds = ['home', 'servicos'];

        renderHook(() => useScrollSpy(sectionIds, onActiveChange));

        intersectionObserverCallback([
            {
                isIntersecting: false,
                target: { id: 'servicos' } as Element,
            } as IntersectionObserverEntry,
        ]);

        expect(onActiveChange).not.toHaveBeenCalled();
    });

    it('should disconnect observer on unmount', () => {
        const onActiveChange = vi.fn();
        const sectionIds = ['home'];

        const { unmount } = renderHook(() => useScrollSpy(sectionIds, onActiveChange));
        unmount();

        expect(observerMock.disconnect).toHaveBeenCalled();
    });
});
