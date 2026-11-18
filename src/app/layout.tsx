import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SITE, SOCIALS } from "@/data/site";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Technitoit - Rénovation de maison, toiture, façade et isolation",
    template: "%s | Technitoit",
  },
  description:
    "Technitoit, leader de la rénovation de l'habitat en France depuis 2002 : toiture, façade, isolation et énergie. 80 agences, devis gratuit.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Technitoit",
    title: "Technitoit - Rénovation de maison, toiture, façade et isolation",
    description: "Leader de la rénovation de l'habitat en France : toiture, façade, isolation, énergie.",
    images: [{ url: "/images/home_hero.jpg", width: 1728, height: 1080 }],
  },
  twitter: { card: "summary_large_image", site: "@technitoit" },
};

export const viewport: Viewport = {
  themeColor: "#e7540f",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.name,
  alternateName: "Expert en rénovation toiture, façade et isolation",
  url: `${SITE.url}/`,
  logo: `${SITE.url}/favicon.ico`,
  sameAs: SOCIALS.map((s) => s.href),
  address: {
    "@type": "PostalAddress",
    streetAddress: "184 rue du Faubourg Saint-Honoré",
    addressLocality: "Paris",
    postalCode: "75008",
    addressCountry: "FR",
  },
  foundingDate: String(SITE.foundingYear),
  description: "Technitoit est le leader français de la rénovation de l'habitat : toiture, façade, isolation, énergie.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" dir="ltr" className={jakarta.variable} data-scroll-behavior="smooth">
      <body className="min-h-dvh overflow-x-clip">
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-white focus:px-5 focus:py-2.5 focus:font-semibold focus:shadow-lg"
        >
          Aller au contenu
        </a>
        <Header />
        <main id="contenu">{children}</main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </body>
    </html>
  );
}
