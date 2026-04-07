import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Script from "next/script";
import AdsterraBanner from "@/components/AdsterraBanner";
import AdsterraNative from "@/components/AdsterraNative";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://careerdost.online"),
  alternates: {
    canonical: "/",
  },
  title: "CareerDost - Latest Govt & Private Jobs | Career Dost",
  description: "Find the latest Govt and Private jobs on CareerDost. Get reliable updates on recruitment notifications, admit cards, results, and career guidance at Career Dost.",
  keywords: ["CareerDost", "career dost", "job portal", "government jobs", "sarkari naukri", "private jobs", "latest jobs", "recruitment", "admit card", "results"],
  openGraph: {
    title: "CareerDost - Latest Govt & Private Jobs | Career Dost",
    description: "Find the latest Govt and Private jobs on CareerDost. Get reliable updates on recruitment notifications, admit cards, results, and career guidance at Career Dost.",
    siteName: "CareerDost",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "CareerDost - Latest Govt & Private Jobs | Career Dost",
    description: "Find the latest Govt and Private jobs on CareerDost. Get reliable updates on recruitment notifications, admit cards, results, and career guidance at Career Dost.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="referrer" content="no-referrer-when-downgrade" />
      </head>
      <body className={`${inter.className} min-h-screen bg-slate-50 flex flex-col text-slate-900`}>
        <Header />


        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>

        {/* Adsterra Native Banner */}
        <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
          <AdsterraNative id="a8ce15e21a37b9041c1ac20f8a8c6c32" />
        </section>

        <Footer />

        {/* Adsterra Global Scripts */}
        <Script 
          id="adsterra-popunder" 
          src="https://pl29089781.profitablecpmratenetwork.com/6c/41/21/6c412133e91ed82a5c0f898b57597687.js" 
          strategy="lazyOnload" 
        />
        <Script 
          id="adsterra-social-bar" 
          src="https://pl29089788.profitablecpmratenetwork.com/c3/f3/31/c3f3319e9c9dea0489a86e40b798f77f.js" 
          strategy="lazyOnload" 
        />
      </body>
    </html>
  );
}
