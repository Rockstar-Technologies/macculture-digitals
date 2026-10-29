import type { ComponentProps, ReactNode } from "react";
import { TransitionLink } from "@/components/motion/TransitionLink";

type Variant = "primary" | "secondary";

const base =
  "btn-sweep relative isolate overflow-hidden inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-ui px-5 py-3 text-sm font-semibold uppercase tracking-wider " +
  "transition-[transform,background-color,color,border-color] duration-[160ms] ease-out " +
  "active:scale-[0.97] motion-reduce:active:scale-100";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-black hover:bg-white hover:-translate-y-0.5",
  secondary:
    "border border-light/40 text-light hover:border-accent hover:text-accent hover:-translate-y-0.5",
};

type CommonProps = { variant?: Variant; className?: string; children: ReactNode };
type LinkProps = CommonProps & { href: string } & Omit<
    ComponentProps<typeof TransitionLink>,
    "href" | "className" | "children"
  >;
type NativeProps = CommonProps & { href?: undefined } & Omit<
    ComponentProps<"button">,
    "className" | "children"
  >;

export function Button({
  variant = "primary",
  className = "",
  children,
  ...rest
}: LinkProps | NativeProps) {
  const classes = `${base} ${variants[variant]} ${className}`;

  if (rest.href !== undefined) {
    return (
      <TransitionLink {...rest} className={classes}>
        {children}
      </TransitionLink>
    );
  }

  return (
    <button type="button" {...rest} className={classes}>
      {children}
    </button>
  );
}
