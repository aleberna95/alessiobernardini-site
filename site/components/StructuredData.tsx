export default function StructuredData() {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Alessio Bernardini",
    url: "https://alessiobernardini.dev",
    image: "https://alessiobernardini.dev/photo.png",
    jobTitle: "Full Stack Developer",
    email: "mailto:alebernardini95@gmail.com",
    telephone: "+39 334 713 2869",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ascoli Piceno",
      addressCountry: "IT",
    },
    sameAs: [
      "https://www.linkedin.com/in/alessiobernardini",
      "https://github.com/alessiobernardini",
    ],
    knowsAbout: [
      "Full Stack Development",
      "Gestionali web",
      "Sviluppo app mobile",
      "Automazioni",
      "API REST",
      "Intelligenza Artificiale applicata",
      "Firebase",
      "Next.js",
      "TypeScript",
    ],
  };

  const service = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Alessio Bernardini — Sviluppo Software",
    description:
      "Sviluppo di gestionali, app, siti web e automazioni su misura per aziende e professionisti.",
    url: "https://alessiobernardini.dev",
    image: "https://alessiobernardini.dev/og-image.png",
    priceRange: "€€",
    founder: {
      "@type": "Person",
      name: "Alessio Bernardini",
    },
    areaServed: { "@type": "Country", name: "Italia" },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ascoli Piceno",
      addressCountry: "IT",
    },
    vatID: "IT02607070444",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+39 334 713 2869",
      email: "alebernardini95@gmail.com",
      contactType: "sales",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }}
      />
    </>
  );
}
