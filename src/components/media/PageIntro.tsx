import { Reveal } from "@/components/motion/Reveal";

export function PageIntro({ children }: { children: string }) {
  return (
    <Reveal>
      <p className="mb-10 max-w-3xl text-lg leading-relaxed text-light">{children}</p>
    </Reveal>
  );
}
