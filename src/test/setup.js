import '@testing-library/jest-dom/vitest';
import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import { MotionGlobalConfig } from 'framer-motion';

// Finish every Framer Motion animation instantly so exit transitions don't make tests wait.
MotionGlobalConfig.skipAnimations = true;

class MockIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}

const isBrowserLike = typeof window !== 'undefined';

// Suites that opt into `@vitest-environment node` skip the DOM shims.
if (isBrowserLike) {
  globalThis.IntersectionObserver = MockIntersectionObserver;

  window.matchMedia =
    window.matchMedia ??
    ((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }));

  window.scrollTo = vi.fn();
  Element.prototype.scrollIntoView = vi.fn();
}

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});
