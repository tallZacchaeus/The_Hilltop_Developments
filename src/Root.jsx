import { StrictMode } from 'react';
import ErrorBoundary from './components/layout/ErrorBoundary';

/**
 * Wrapper shared by the browser entry (main.jsx) and the prerender step (site/buildSite.jsx).
 * Both must render the same tree for hydration to match, so the router goes inside as children.
 * @param {{ children: React.ReactNode }} props
 */
export default function Root({ children }) {
  return (
    <StrictMode>
      <ErrorBoundary>{children}</ErrorBoundary>
    </StrictMode>
  );
}
