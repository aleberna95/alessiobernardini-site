import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/language-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Alessio Bernardini — Full Stack Developer",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  description:
    "Full Stack Developer. Sviluppo software, siti web, gestionali e automazioni per aziende e professionisti. Ascoli Piceno, disponibile da remoto.",
  openGraph: {
    title: "Alessio Bernardini — Full Stack Developer",
    description:
      "Sviluppo software, siti web, gestionali e automazioni per aziende e professionisti.",
    url: "https://alessiobernardini.dev",
    siteName: "Alessio Bernardini",
    locale: "it_IT",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Alessio Bernardini — Full Stack Developer",
    description:
      "Sviluppo software, siti web, gestionali e automazioni per aziende e professionisti.",
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
      <body className="bg-white min-h-screen">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
