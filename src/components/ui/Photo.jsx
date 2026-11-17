/**
 * Cover image. Lazy by default; `priority` loads it eagerly for above-the-fold heroes.
 * (`fetchpriority` is lowercase because React 18 passes it through as a plain attribute.)
 * @param {{ src: string, alt: string, priority?: boolean, className?: string } & Record<string, unknown>} props
 */
export default function Photo({ src, alt, priority = false, className = '', ...rest }) {
  return (
    <img
      src={src}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchpriority={priority ? 'high' : undefined}
      className={`h-full w-full object-cover ${className}`}
      {...rest}
    />
  );
}
