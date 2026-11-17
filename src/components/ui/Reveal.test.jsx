import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, render, screen, waitFor } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { hydrateRoot } from 'react-dom/client';
import Reveal from './Reveal';

// An IntersectionObserver the test drives by hand, standing in for the visitor scrolling.
let observers = [];
class ControlledIntersectionObserver {
  constructor(callback) {
    this.callback = callback;
    this.targets = new Set();
    observers.push(this);
  }
  observe(target) {
    this.targets.add(target);
  }
  unobserve(target) {
    this.targets.delete(target);
  }
  disconnect() {
    this.targets.clear();
  }
  takeRecords() {
    return [];
  }
}

function scrollIntoView(element) {
  act(() =>
    observers
      .filter((observer) => observer.targets.has(element))
      .forEach((observer) => observer.callback([{ target: element, isIntersecting: true }])),
  );
}

let cleanupHydrated = null;

/** Prerenders a Reveal, places it `top` px down the page, then hydrates it like the browser would. */
async function hydrateRevealAt(top) {
  const ui = <Reveal data-testid="reveal">Section</Reveal>;
  const silence = vi.spyOn(console, 'error').mockImplementation(() => {});
  const html = renderToString(ui);
  silence.mockRestore();

  const container = document.createElement('div');
  container.innerHTML = html;
  document.body.appendChild(container);
  vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({
    top,
    bottom: top + 100,
    left: 0,
    right: 0,
    width: 0,
    height: 100,
    x: 0,
    y: top,
    toJSON: () => ({}),
  });

  const root = await act(async () => hydrateRoot(container, ui));
  cleanupHydrated = () => {
    act(() => root.unmount());
    container.remove();
  };
  return container.firstElementChild;
}

const originalObserver = globalThis.IntersectionObserver;

beforeEach(() => {
  observers = [];
  globalThis.IntersectionObserver = ControlledIntersectionObserver;
});

afterEach(() => {
  cleanupHydrated?.();
  cleanupHydrated = null;
  globalThis.IntersectionObserver = originalObserver;
  vi.restoreAllMocks();
});

describe('Reveal', () => {
  it('fades content mounted in the browser in once it scrolls into view', async () => {
    render(<Reveal data-testid="reveal">Section</Reveal>);
    const element = screen.getByTestId('reveal');

    expect(element.style.opacity).toBe('0');
    scrollIntoView(element);
    await waitFor(() => expect(element.style.opacity).toBe('1'));
  });

  it('keeps prerendered content that is on screen at hydration visible', async () => {
    const element = await hydrateRevealAt(100);

    await act(async () => {});
    expect(element.style.opacity).toBe('1');
  });

  it('hides prerendered content below the fold after hydration, then fades it in on scroll', async () => {
    const element = await hydrateRevealAt(window.innerHeight + 500);

    await waitFor(() => expect(element.style.opacity).toBe('0'));
    scrollIntoView(element);
    await waitFor(() => expect(element.style.opacity).toBe('1'));
  });
});
