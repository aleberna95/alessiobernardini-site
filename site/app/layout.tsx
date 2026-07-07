import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/language-context";
import StructuredData from "@/components/StructuredData";
import { PostHogProvider } from "@/components/analytics/PostHogProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://alessiobernardini.dev"),
  title: {
    default: "Alessio Bernardini — Full Stack Developer",
    template: "%s — Alessio Bernardini",
  },
  description:
    "Full Stack Developer con P.IVA ad Ascoli Piceno. Sviluppo gestionali, app, siti web e automazioni su misura per aziende e professionisti. Disponibile da remoto.",
  alternates: {
    canonical: "/",
  },
  keywords: [
    "full stack developer",
    "sviluppo gestionali",
    "sviluppo app",
    "automazioni aziendali",
    "sviluppo software Ascoli Piceno",
    "freelance developer P.IVA",
    "CRM su misura",
  ],
  authors: [{ name: "Alessio Bernardini", url: "https://alessiobernardini.dev" }],
  creator: "Alessio Bernardini",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Alessio Bernardini — Full Stack Developer",
    description:
      "Sviluppo gestionali, app, siti web e automazioni su misura per aziende e professionisti.",
    url: "https://alessiobernardini.dev",
    siteName: "Alessio Bernardini",
    locale: "it_IT",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Alessio Bernardini — Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alessio Bernardini — Full Stack Developer",
    description:
      "Sviluppo gestionali, app, siti web e automazioni su misura per aziende e professionisti.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="it"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://eu.i.posthog.com" />
        <link rel="preconnect" href="https://eu-assets.i.posthog.com" crossOrigin="" />
      </head>
      <body className="bg-white min-h-screen">
        <StructuredData />
        <PostHogProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </PostHogProvider>
      </body>
    </html>
  );
}
