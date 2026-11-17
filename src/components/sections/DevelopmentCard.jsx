import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { DEVELOPMENT_STATUS_LABELS, getTypeLabel } from '../../data/developments';
import Card from '../ui/Card';
import Chip from '../ui/Chip';
import Photo from '../ui/Photo';

/**
 * Image card for one development; the whole card links to its detail page.
 * @param {{ development: import('../../data/developments').Development, showSummary?: boolean }} props
 */
export default function DevelopmentCard({ development, showSummary = false }) {
  const { slug, name, type, status, tagline, summary, image, imageAlt } = development;

  return (
    <Card as="article" interactive className="group relative flex h-full flex-col p-3 sm:p-4">
      <div className="relative aspect-[4/3] overflow-hidden rounded-inner bg-sky-100">
        <Photo src={image} alt={imageAlt} className="transition-transform duration-700 group-hover:scale-[1.04]" />
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          <Chip>{getTypeLabel(type)}</Chip>
          <Chip>{DEVELOPMENT_STATUS_LABELS[status]}</Chip>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2 px-2 pb-2 pt-5">
        <p className="text-sm text-navy/70">{tagline}</p>
        <h3 className="text-h3">
          <Link
            to={`/developments/${slug}`}
            className="focus-ring rounded-sm after:absolute after:inset-0 after:rounded-card after:content-['']"
          >
            {name}
          </Link>
        </h3>
        {showSummary && <p className="line-clamp-3 text-[15px] leading-relaxed text-navy/70">{summary}</p>}
        <span aria-hidden="true" className="mt-auto inline-flex items-center gap-1.5 pt-3 font-display text-[15px]">
          View project
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
    </Card>
  );
}
