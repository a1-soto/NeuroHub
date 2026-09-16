import '@testing-library/jest-dom';

// jsdom doesn't implement IntersectionObserver — stubbed for components
// that use it (e.g. useRevealOnScroll) so they don't crash under test.
class IntersectionObserverStub {
    observe() {}
    unobserve() {}
    disconnect() {}
}

global.IntersectionObserver = IntersectionObserverStub;

// jsdom doesn't implement ResizeObserver — stubbed for components
// that use it (e.g. ScrollProgress) so they don't crash under test.
class ResizeObserverStub {
    observe() {}
    unobserve() {}
    disconnect() {}
}

global.ResizeObserver = ResizeObserverStub;
