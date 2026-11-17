import { useEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

/** A malformed hash such as `#%E0%A4` must not crash the page, so fall back to the raw text. */
function decodeHash(hash) {
  const raw = hash.slice(1);
  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
}

/** Moves keyboard / screen-reader focus to `element` without jumping the scroll position. */
function focusWithoutScrolling(element) {
  if (!element) return;
  if (!element.hasAttribute('tabindex')) element.setAttribute('tabindex', '-1');
  element.focus({ preventScroll: true });
}

/**
 * Runs after each navigation:
 * - `#id` in the URL → scroll to that element (again, if the same hash link is clicked twice);
 * - otherwise scroll to the top, except on back/forward where the browser restores the position;
 * - focus moves to the hash target or `<main>` so assistive tech lands on the new content.
 * Nothing receives focus on the very first page load.
 */
export default function ScrollToTop() {
  const { pathname, hash, key } = useLocation();
  const navigationType = useNavigationType();
  const initialKey = useRef(key);
  const isInitialLoad = key === initialKey.current;
  // Re-run for repeated clicks on the same hash link, but not for ?query-only changes (e.g. filters).
  const hashVisitKey = hash ? key : null;

  useEffect(() => {
    if (hash) {
      const frame = window.requestAnimationFrame(() => {
        const target = document.getElementById(decodeHash(hash));
        target?.scrollIntoView({ block: 'start' });
        if (!isInitialLoad) focusWithoutScrolling(target);
      });
      return () => window.cancelAnimationFrame(frame);
    }

    if (isInitialLoad) return undefined;
    if (navigationType !== 'POP') {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
    focusWithoutScrolling(document.getElementById('main'));
    return undefined;
  }, [pathname, hash, hashVisitKey, navigationType, isInitialLoad]);

  return null;
}
