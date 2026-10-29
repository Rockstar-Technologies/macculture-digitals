// Placeholder mark until the final logo exists (design.md).
export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`grid shrink-0 place-items-center rounded-full border border-accent font-display font-extrabold text-accent ${className}`}
    >
      MD
    </span>
  );
}
