import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import Root from './Root';
import './index.css';

const container = document.getElementById('root');
const app = (
  <Root>
    <BrowserRouter>
      <App />
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
