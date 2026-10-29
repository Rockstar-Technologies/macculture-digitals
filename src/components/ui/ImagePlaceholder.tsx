// Stand-in for photography that has not been supplied yet.
export function ImagePlaceholder({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={label}
      className={`grid place-items-center bg-gradient-to-br from-ink to-surface text-xs uppercase tracking-widest text-muted ${className}`}
    >
      <span aria-hidden>{label}</span>
    </div>
  );
}
