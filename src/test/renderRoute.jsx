import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SiteRoutes from '../site/SiteRoutes';

/** Renders the whole site (layout + the page for `path`) in a memory router. */
export function renderRoute(path = '/') {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <SiteRoutes />
    </MemoryRouter>,
  );
}
