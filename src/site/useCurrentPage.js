import { useLocation } from 'react-router-dom';
import site from './pages';

/**
 * The page at the current URL: `{ path, file, known, meta, element }`.
 * Any unknown URL gives the 404 page (`path: '/404'`, `known: false`), the same page prerendered as
 * 404.html, so anything that reads it renders identically wherever Vercel serves that file.
 */
export default function useCurrentPage() {
  return site.pageAt(useLocation().pathname);
}
