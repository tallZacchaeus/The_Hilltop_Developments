import { useCallback, useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import { NAV_ITEMS } from '../../data/site';
import Button from '../ui/Button';
import Wordmark from './Wordmark';
import MobileMenu from './MobileMenu';

const SCROLL_THRESHOLD = 12;

function useHasScrolled(threshold) {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setHasScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return hasScrolled;
}

const navLinkClass = ({ isActive }) =>
  `focus-ring inline-flex items-center gap-1 rounded-md px-3 py-2 font-display text-[15px] transition-colors hover:text-navy ${
    isActive ? 'text-navy' : 'text-navy/70'
  }`;

function DesktopNavItem({ item }) {
  // Escape hides an open dropdown (WCAG 1.4.13) until the pointer or focus leaves the item.
  const [isDismissed, setIsDismissed] = useState(false);

  if (!item.children) {
    return (
      <li>
        <NavLink to={item.to} className={navLinkClass}>
          {item.label}
        </NavLink>
      </li>
    );
  }

  const handleKeyDown = (event) => {
    if (event.key !== 'Escape') return;
    setIsDismissed(true);
    event.currentTarget.querySelector('a')?.focus();
  };

  const handleBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) setIsDismissed(false);
  };

  const dismissed = isDismissed ? '!invisible !opacity-0' : '';

  return (
    <li
      className="group relative"
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
      onMouseLeave={() => setIsDismissed(false)}
    >
      <NavLink to={item.to} className={navLinkClass}>
        {item.label}
        <ChevronDown
          aria-hidden
          className="h-3.5 w-3.5 transition-transform duration-300 group-focus-within:rotate-180 group-hover:rotate-180"
        />
      </NavLink>
      <div
        className={`invisible absolute left-1/2 top-full z-10 w-60 -translate-x-1/2 pt-3 opacity-0 transition duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100 ${dismissed}`}
      >
        <ul className="rounded-card border border-line bg-white p-2 shadow-card">
          {item.children.map((child) => (
            <li key={child.to}>
              <Link
                to={child.to}
                className="focus-ring block rounded-xl px-3 py-2.5 text-[15px] text-navy/75 transition-colors hover:bg-sky-50 hover:text-navy"
              >
                {child.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

export default function Header() {
  const hasScrolled = useHasScrolled(SCROLL_THRESHOLD);
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname, search, hash } = useLocation();
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    closeMenu();
  }, [pathname, search, hash, closeMenu]);

  const surface = hasScrolled ? 'bg-white/85 shadow-header backdrop-blur-xl' : 'bg-white';

  return (
    <>
      <header className={`sticky top-0 z-50 transition-[background-color,box-shadow] duration-300 ${surface}`}>
        <div className="mx-auto flex h-[72px] max-w-[1400px] items-center justify-between gap-6 px-4 sm:px-6 lg:px-10">
          <Wordmark />

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <DesktopNavItem key={item.to} item={item} />
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Button to="/contact" variant="light" className="hidden sm:inline-flex">
              Get In Touch
            </Button>
            <button
              type="button"
              className="focus-ring grid h-11 w-11 place-items-center rounded-btn ring-1 ring-inset ring-line lg:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X aria-hidden className="h-5 w-5" /> : <Menu aria-hidden className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>
      <MobileMenu open={menuOpen} onClose={closeMenu} />
    </>
  );
}
