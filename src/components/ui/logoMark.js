/**
 * Hilltop's H mark, traced from the client's monogram artwork (1932 px square, Nov 2026).
 *
 * Four strokes of even width: a bar and a hook in the top half, and the same pair rotated 180°
 * in the bottom half. Units are the artwork's pixels with the origin at the mark's top-left
 * corner, so the paths read as the measured stroke centre-lines (butt caps, mitred corners).
 * public/favicon.svg repeats these paths; logoMark.test.js keeps the two in sync.
 */
export const MARK_WIDTH = 467;
export const MARK_HEIGHT = 612;
export const MARK_STROKE = 31;

export const MARK_PATHS = Object.freeze([
  'M15.5 3 V315', // top-left bar
  'M140 3 V250 H451.5 V15.5 H327 V192', // top hook
  'M451.5 609 V297', // bottom-right bar (top-left bar rotated 180°)
  'M327 609 V362 H15.5 V596.5 H140 V420', // bottom hook (top hook rotated 180°)
]);
