import { site } from "@/config/site";

// schema.org Organization data for search engines. Social links are included
// only once they have real URLs.
export function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    email: site.emails.founder,
    telephone: site.phone,
    foundingDate: "2008",
    address: {
      "@type": "PostalAddress",
      postOfficeBoxNumber: "740",
      addressLocality: "Yaoundé",
      addressRegion: "Center",
      addressCountry: "CM",
    },
    sameAs: Object.values(site.socials).filter(Boolean),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
