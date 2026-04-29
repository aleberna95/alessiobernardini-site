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
  description:
    "Full Stack Developer specializzato in Mobility, Agritech, FinTech. Ex game programmer. Disponibile per consulenze freelance.",
  openGraph: {
    title: "Alessio Bernardini — Full Stack Developer",
    description:
      "Costruisco software che gira in produzione, non slide.",
    url: "https://alessiobernardini.dev",
    siteName: "Alessio Bernardini",
    locale: "it_IT",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Alessio Bernardini — Full Stack Developer",
    description: "Costruisco software che gira in produzione, non slide.",
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
      <body className="bg-[#0a0a0a] min-h-screen">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
