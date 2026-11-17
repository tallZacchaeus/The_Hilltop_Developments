import { Link } from 'react-router-dom';
import Logo from '../ui/Logo';

/** H-monogram + "Hilltop Developments", linking home. Used in the header and footer. */
export default function Wordmark({ className = '' }) {
  return (
    <Link to="/" className={`focus-ring flex w-fit items-center gap-2.5 rounded-md ${className}`}>
      <Logo size={20} />
      <span className="font-display text-[19px] font-medium tracking-[-0.02em]">
        Hilltop <span className="text-navy/60">Developments</span>
      </span>
    </Link>
  );
}
