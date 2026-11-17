// @vitest-environment node
import { describe, expect, it } from 'vitest';
import { buildPageMeta } from '../lib/pageMeta';
import { escapeHtml, injectPage, renderHeadTags } from './template';

const TEMPLATE = `<html><head>
<meta charset="UTF-8" />
<!--app-head:start--><title>Default</title><!--app-head:end-->
<script type="module" src="/assets/index.js"></script>
</head><body><div id="root"></div></body></html>`;

describe('escapeHtml', () => {
  it('escapes characters that would break out of text or attributes', () => {
    expect(escapeHtml(`Terms & "Conditions" <b>'x'</b>`)).toBe(
      'Terms &amp; &quot;Conditions&quot; &lt;b&gt;&#39;x&#39;&lt;/b&gt;',
    );
  });
});

describe('renderHeadTags', () => {
  it('renders the title, meta tags and canonical link with escaped values', () => {
    const head = renderHeadTags(buildPageMeta({ title: 'Terms & Conditions', description: 'A "quote"' }, '/terms'));

    expect(head).toContain('<title>Terms &amp; Conditions | Hilltop Developments</title>');
    expect(head).toContain('<meta name="description" content="A &quot;quote&quot;" />');
    expect(head).toContain('<meta property="og:title" content="Terms &amp; Conditions | Hilltop Developments" />');
    expect(head).toContain('<meta property="og:url" content="https://www.thehilltopdevelopments.com/terms" />');
    expect(head).toContain('<link rel="canonical" href="https://www.thehilltopdevelopments.com/terms" />');
  });
});

describe('injectPage', () => {
  it('replaces the default head block and fills the root element', () => {
    const page = injectPage(TEMPLATE, { headHtml: '<title>About</title>', appHtml: '<main>Hello</main>' });

    expect(page).toContain('<title>About</title>');
    expect(page).not.toContain('Default');
    expect(page).not.toContain('app-head');
    expect(page).toContain('<div id="root"><main>Hello</main></div>');
    expect(page).toContain('<script type="module" src="/assets/index.js"></script>');
  });

  it('inserts markup literally, even when it contains $ replacement patterns', () => {
    const page = injectPage(TEMPLATE, { headHtml: "<title>$&$'</title>", appHtml: '<p>$& $1</p>' });

    expect(page).toContain("<title>$&$'</title>");
    expect(page).toContain('<div id="root"><p>$& $1</p></div>');
  });

  it('fails loudly when the template is missing a marker', () => {
    expect(() => injectPage('<div id="root"></div>', { headHtml: '', appHtml: '' })).toThrow(/app-head/);
    expect(() => injectPage('<!--app-head:start--><!--app-head:end-->', { headHtml: '', appHtml: '' })).toThrow(
      /root/,
    );
  });
});
