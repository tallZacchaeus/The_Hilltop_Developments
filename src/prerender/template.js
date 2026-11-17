import { metaTagsFor } from '../lib/pageMeta';

const HEAD_START = '<!--app-head:start-->';
const HEAD_END = '<!--app-head:end-->';
const ROOT_OPEN = '<div id="root">';
const ROOT_ELEMENT = `${ROOT_OPEN}</div>`;
const HTML_ESCAPES = Object.freeze({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' });

/** Escapes text for use inside HTML text or a double-quoted attribute. */
export function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => HTML_ESCAPES[char]);
}

/**
 * A page's metadata as <head> markup for its prerendered HTML.
 * @param {{ title: string, description: string, url: string, robots: string }} meta
 */
export function renderHeadTags(meta) {
  const metaTags = metaTagsFor(meta).map(
    ([attribute, key, content]) => `<meta ${attribute}="${key}" content="${escapeHtml(content)}" />`,
  );
  return [
    `<title>${escapeHtml(meta.title)}</title>`,
    ...metaTags,
    `<link rel="canonical" href="${escapeHtml(meta.url)}" />`,
  ].join('\n    ');
}

/**
 * Builds a page from the client's index.html: swaps the default head block for the page's tags
 * and puts the rendered markup inside the root element.
 * Uses slicing rather than String#replace so "$&"-style sequences in the markup stay literal.
 * @param {string} template
 * @param {{ headHtml: string, appHtml: string }} page
 */
export function injectPage(template, { headHtml, appHtml }) {
  const headStart = template.indexOf(HEAD_START);
  const headEnd = template.indexOf(HEAD_END);
  if (headStart === -1 || headEnd < headStart) {
    throw new Error('index.html is missing the <!--app-head:start--> … <!--app-head:end--> markers');
  }
  const withHead = template.slice(0, headStart) + headHtml + template.slice(headEnd + HEAD_END.length);

  const rootAt = withHead.indexOf(ROOT_ELEMENT);
  if (rootAt === -1) {
    throw new Error('index.html is missing an empty <div id="root"></div>');
  }
  const insertAt = rootAt + ROOT_OPEN.length;
  return withHead.slice(0, insertAt) + appHtml + withHead.slice(insertAt);
}
