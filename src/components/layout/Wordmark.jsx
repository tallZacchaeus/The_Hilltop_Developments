import { Link } from 'react-router-dom';
import Logo from '../ui/Logo';

/**
 * H-monogram + "Hilltop Developments", linking home. Used in the header and footer.
 * `tone="light"` is for the navy footer.
 */
export default function Wordmark({ className = '', tone = 'dark' }) {
  const isLight = tone === 'light';
  return (
    <Link to="/" className={`${isLight ? 'focus-ring-light' : 'focus-ring'} flex w-fit items-center gap-2.5 rounded-md ${className}`}>
      <Logo size={20} />
      <span className="font-display text-[19px] font-medium tracking-[-0.02em]">
        Hilltop <span className={isLight ? 'text-white/75' : 'text-navy/60'}>Developments</span>
      </span>
    </Link>
  );
}
