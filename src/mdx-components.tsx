import type { MDXComponents } from "mdx/types";

// Styles for blog posts written in MDX (design.md: minimalist, display-font headings).
const components: MDXComponents = {
  h2: (props) => (
    <h2
      className="mb-4 mt-12 font-display text-2xl font-extrabold uppercase tracking-tight text-white sm:text-3xl"
      {...props}
    />
  ),
  h3: (props) => (
    <h3 className="mb-3 mt-8 font-display text-xl font-bold text-white" {...props} />
  ),
  p: (props) => <p className="mb-5 leading-relaxed text-light" {...props} />,
  a: (props) => (
    <a
      className="text-accent underline underline-offset-4 transition-colors duration-[160ms] ease-out hover:text-white"
      {...props}
    />
  ),
  ul: (props) => <ul className="mb-5 list-disc space-y-2 pl-6 text-light" {...props} />,
  ol: (props) => <ol className="mb-5 list-decimal space-y-2 pl-6 text-light" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="my-6 border-l-2 border-accent pl-5 text-lg italic text-light"
      {...props}
    />
  ),
  code: (props) => (
    <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-[0.9em] text-white" {...props} />
  ),
  strong: (props) => <strong className="font-semibold text-white" {...props} />,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
