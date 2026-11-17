import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';

export default function Layout() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-btn focus:bg-navy focus:px-4 focus:py-3 focus:text-white"
      >
        Skip to content
      </a>
      <ScrollToTop />
      <Header />
      <main id="main" tabIndex={-1} className="flex flex-col gap-6 pt-2 lg:gap-10">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
