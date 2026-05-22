export default function Button({ children, variant = 'primary', className = '', ...props }) {
  const baseClasses = "inline-flex items-center gap-2.5 px-7 py-4 text-[0.85rem] tracking-[0.08em] uppercase transition-all duration-300 font-medium whitespace-nowrap";
  const variants = {
    primary: "bg-gold text-navy-deep hover:bg-gold-soft hover:-translate-y-0.5",
    ghost: "bg-transparent text-cream border border-cream/15 hover:border-gold hover:text-gold"
  };

  return (
    <button 
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
