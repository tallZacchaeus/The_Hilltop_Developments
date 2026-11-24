// @vitest-environment node
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { MARK_HEIGHT, MARK_PATHS, MARK_STROKE, MARK_WIDTH } from './logoMark';

/** The corner points of an "M x y / H x / V y" path, in order. */
function pointsOf(d) {
  const tokens = d.trim().split(/\s+/);
  const points = [];
  let x = 0;
  let y = 0;
  for (let i = 0; i < tokens.length; i += 1) {
    const [command, value] = [tokens[i][0], tokens[i].slice(1)];
    if (command === 'M') {
      x = Number(value);
      y = Number(tokens[(i += 1)]);
    } else if (command === 'H') {
      x = Number(value);
    } else if (command === 'V') {
      y = Number(value);
    } else {
      throw new Error(`Unexpected path command in ${d}`);
    }
    points.push([x, y]);
  }
  return points;
}

const rotate180 = ([x, y]) => [MARK_WIDTH - x, MARK_HEIGHT - y];

describe('Hilltop H mark', () => {
  it('has a top half (bar + hook) and a bottom half that is the top rotated 180°', () => {
    const [topBar, topHook, bottomBar, bottomHook] = MARK_PATHS.map(pointsOf);

    expect(bottomBar).toEqual(topBar.map(rotate180));
    expect(bottomHook).toEqual(topHook.map(rotate180));
  });

  it('fills its viewBox exactly, stroke edges included', () => {
    const points = MARK_PATHS.flatMap(pointsOf);
    const half = MARK_STROKE / 2;
    const xs = points.map(([x]) => x);
    const ys = points.map(([, y]) => y);

    expect(Math.min(...xs) - half).toBe(0);
    expect(Math.max(...xs) + half).toBe(MARK_WIDTH);
    expect(Math.min(...ys) - half).toBeLessThanOrEqual(0);
    expect(Math.max(...ys) + half).toBeGreaterThanOrEqual(MARK_HEIGHT);
  });

  it('is the same drawing in public/favicon.svg', () => {
    const favicon = readFileSync(fileURLToPath(new URL('../../../public/favicon.svg', import.meta.url)), 'utf8');

    MARK_PATHS.forEach((d) => expect(favicon).toContain(`d="${d}"`));
    expect(favicon).toContain(`stroke-width="${MARK_STROKE}"`);
  });
});
