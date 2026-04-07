import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Script from "next/script";

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
        <meta name="google-site-verification" content="GV0iYH6r31N74e3g4ehd0wQVa1tqRH9Q7GaIUXFu6KM" />
      </head>
      <body className={`${inter.className} min-h-screen bg-slate-50 flex flex-col text-slate-900`}>
        <Header />
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
        <Footer />
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function(lnftoho){
var d = document,
    s = d.createElement('script'),
    l = d.scripts[d.scripts.length - 1];
s.settings = lnftoho || {};
s.src = "\/\/stupid-police.com\/bRXJVPs\/d.GplC0fY\/WScg\/IefmN9TuXZeUslzkdPJTAYO5-Mczwc\/3\/Myj\/kdtONRjpkUz-NtzlcLzPM\/wI";
s.async = true;
s.referrerPolicy = 'no-referrer-when-downgrade';
l.parentNode.insertBefore(s, l);
})({})
`,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function(zemh){
var d = document,
    s = d.createElement('script'),
    l = d.scripts[d.scripts.length - 1];
s.settings = zemh || {};
s.src = "\/\/stupid-police.com\/bgXXV\/sjd.GYlT0BYWWncR\/BeKmP9-uYZQUPlvksPqT\/YZ5VMXz\/ci3DNRDEUEt\/NHj\/kJzXNDzQcM0SO\/Qy";
s.async = true;
s.referrerPolicy = 'no-referrer-when-downgrade';
l.parentNode.insertBefore(s, l);
})({})
`,
          }}
        />
      </body>
    </html>
  );
}
