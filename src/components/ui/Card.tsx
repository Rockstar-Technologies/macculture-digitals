import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  /** Adds the hover lift and orange edge glow. */
  interactive?: boolean;
  className?: string;
  id?: string;
};

export function Card({
  children,
  interactive = false,
  className = "",
  id,
}: CardProps) {
  const hover = interactive
    ? " transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_0_0_1px_rgb(255_106_0/0.5),0_16px_40px_-16px_rgb(255_106_0/0.35)] motion-reduce:hover:translate-y-0"
    : "";
  return (
    <div id={id} className={`rounded-ui bg-surface p-6${hover} ${className}`}>
      {children}
    </div>
  );
}
