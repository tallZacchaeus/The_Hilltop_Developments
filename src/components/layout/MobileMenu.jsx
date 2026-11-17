import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { CONTACT, NAV_ITEMS } from '../../data/site';
import Button from '../ui/Button';

const DESKTOP_QUERY = '(min-width: 1024px)';

/**
 * Full-height menu below the header on screens < 1024px.
 * Locks page scroll while open and closes on Escape.
 * @param {{ open: boolean, onClose: () => void }} props
 */
export default function MobileMenu({ open, onClose }) {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    // The menu is hidden at lg+; close it if the viewport grows (e.g. tablet rotation)
    // so the body scroll lock can't get stuck.
    const desktopQuery = window.matchMedia(DESKTOP_QUERY);
    const onViewportChange = (event) => {
      if (event.matches) onClose();
    };
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    desktopQuery.addEventListener('change', onViewportChange);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
      desktopQuery.removeEventListener('change', onViewportChange);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          className="fixed inset-x-0 bottom-0 top-[72px] z-40 overflow-y-auto bg-white lg:hidden"
          initial={reduceMotion ? false : { opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
        >
          <nav aria-label="Mobile" className="px-5 pb-12 pt-2">
            <ul className="divide-y divide-line">
              {NAV_ITEMS.map((item) => (
                <li key={item.to} className="py-4">
                  <Link
                    to={item.to}
                    onClick={onClose}
                    className="focus-ring block rounded-md font-display text-2xl tracking-[-0.02em]"
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1">
                      {item.children.map((child) => (
                        <li key={child.to}>
                          <Link
                            to={child.to}
                            onClick={onClose}
                            className="focus-ring block rounded-md py-1.5 text-[15px] text-navy/70"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-col gap-3">
              <Button to="/contact" variant="dark">
                Get In Touch
              </Button>
              <Button href={CONTACT.phoneHref} variant="light">
                Call {CONTACT.phoneDisplay}
              </Button>
            </div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
