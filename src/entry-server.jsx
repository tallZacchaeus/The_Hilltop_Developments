import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from './App';
import Root from './Root';
import { PageMetaSinkContext } from './hooks/usePageMeta';
import { injectPage, renderHeadTags } from './prerender/template';

export { prerenderPages } from './prerender/routes';

/**
 * Renders one route to HTML, together with the metadata its page reported through usePageMeta.
 * Used at build time by scripts/prerender.js (bundled with `vite build --ssr`).
 * @param {string} path
 */
export function render(path) {
  const reports = [];
  const html = renderToString(
    <PageMetaSinkContext.Provider value={(meta) => reports.push(meta)}>
      <Root>
        <StaticRouter location={path}>
          <App />
        </StaticRouter>
      </Root>
    </PageMetaSinkContext.Provider>,
  );

  // Exactly one usePageMeta call per page: none means no title or link preview, two would be ambiguous.
  if (reports.length !== 1) {
    throw new Error(`${path} called usePageMeta ${reports.length} times; each page must call it exactly once`);
  }
  return { html, meta: reports[0] };
}

/**
 * The complete HTML document for `path`, built from the client's index.html.
 * @param {string} template
 * @param {string} path
 */
export function renderDocument(template, path) {
  const { html, meta } = render(path);
  return injectPage(template, { headHtml: renderHeadTags(meta), appHtml: html });
}
