import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Root from './Root';
import SiteRoutes from './site/SiteRoutes';
import './index.css';

const container = document.getElementById('root');
const app = (
  <Root>
    <BrowserRouter>
      <SiteRoutes />
    </BrowserRouter>
  </Root>
);

// Production pages arrive prerendered (scripts/prerender.js), so React adopts the existing markup.
// The dev server sends an empty root, which is rendered from scratch.
if (container.hasChildNodes()) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
