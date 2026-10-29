import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTiktok } from "react-icons/fa6";
import { site, type SocialKey } from "@/config/site";

const icons: Record<SocialKey, typeof FaTiktok> = {
  linkedin: FaLinkedinIn,
  facebook: FaFacebookF,
  instagram: FaInstagram,
  tiktok: FaTiktok,
};

const order: SocialKey[] = ["linkedin", "facebook", "instagram", "tiktok"];

type Props = {
  labels: Record<SocialKey, string>;
  className?: string;
};

// Pure component: usable from both server and client components.
export function SocialIcons({ labels, className = "" }: Props) {
  return (
    <ul className={`flex items-center gap-1 ${className}`}>
      {order.map((key) => {
        const Icon = icons[key];
        const href = site.socials[key];
        return (
          <li key={key}>
            <a
              href={href || "#"}
              aria-label={labels[key]}
              target={href ? "_blank" : undefined}
              rel={href ? "noopener noreferrer" : undefined}
              className="grid size-10 place-items-center rounded-ui text-light transition-[color,transform] duration-[160ms] ease-out hover:text-accent active:scale-95"
            >
              <Icon aria-hidden className="size-4" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
