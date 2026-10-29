import type { Metadata } from "next";
import { Bricolage_Grotesque, Hanken_Grotesk } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display-face",
  display: "swap",
});

const body = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-body-face",
  display: "swap",
});

export const metadata: Metadata = {
  title: "404 | Maculture Digitals",
  robots: { index: false },
};

// Shown for URLs that match no route. It bypasses the locale layout, so it
// cannot know the visitor's language and shows both.
export default function GlobalNotFound() {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="grid min-h-dvh place-items-center px-5">
        <main className="max-w-xl">
          <p className="font-display text-6xl font-extrabold text-accent">404</p>
          <h1 className="mt-4 font-display text-[clamp(1.5rem,6.6vw,1.875rem)] font-extrabold uppercase leading-[0.95] tracking-tight text-white sm:text-5xl">
            Page not found
            <br />
            Page introuvable
          </h1>
          <p className="mt-6 text-lg text-light">
            The page you are looking for does not exist or has moved.
          </p>
          <p className="mt-2 text-lg text-light">
            La page que vous cherchez n&apos;existe pas ou a été déplacée.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/en"
              className="inline-flex items-center justify-center rounded-ui bg-accent px-5 py-3 text-sm font-semibold uppercase tracking-wider text-black transition-[transform,background-color] duration-[160ms] ease-out hover:bg-white active:scale-[0.97]"
            >
              English
            </Link>
            <Link
              href="/fr"
              className="inline-flex items-center justify-center rounded-ui border border-light/40 px-5 py-3 text-sm font-semibold uppercase tracking-wider text-light transition-[transform,color,border-color] duration-[160ms] ease-out hover:border-accent hover:text-accent active:scale-[0.97]"
            >
              Français
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
