import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import CustomCursor from "@/components/ui/CustomCursor";

const inter = Inter({ subsets: ["latin"] });

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
  "https://rohit-pakhre-portfolio.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Rohit Pakhre | Software Developer",
  description:
    "Rohit Pakhre is a software developer specializing in the MERN stack — building modern, scalable web applications. Explore the portfolio of Rohit Pakhre, also known as Rohit or Pakhre.",
  authors: [{ name: "Rohit Pakhre" }],
  keywords: [
    "Rohit Pakhre",
    "Rohit",
    "Pakhre",
    "rohit pakhre developer",
    "rohit software developer",
    "pakhre developer",
    "Rohit Pakhre portfolio",
    "Rohit Pakhre MERN",
    "Software Developer",
    "MERN Stack Developer",
    "React Developer",
    "Node.js Developer",
    "MongoDB",
    "Express",
    "React",
    "Node.js",
    "Portfolio",
    "Web Developer India",
    "Rohit Pakhre GitHub",
    "Rohit Pakhre LinkedIn",
  ],
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "Rohit Pakhre | Software Developer",
    description:
      "Rohit Pakhre is a software developer specializing in the MERN stack — building modern, scalable web applications.",
    url: siteUrl,
    siteName: "Rohit Pakhre Portfolio",
    images: [
      {
        url: "/favicon.png",
        type: "image/png",
        width: 1200,
        height: 630,
        alt: "Rohit Pakhre portfolio preview image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rohit Pakhre | Software Developer",
    description:
      "Rohit Pakhre is a software developer specializing in the MERN stack — building modern, scalable web applications.",
    images: ["/favicon.png"],
  },
  verification: {
    google: "753c5592b76e888d",
  },
  alternates: {
    canonical: siteUrl,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Rohit Pakhre",
      alternateName: ["Rohit", "Pakhre", "rohit pakhre"],
      url: siteUrl,
      jobTitle: "Software Developer",
      description:
        "Rohit Pakhre is a software developer specializing in the MERN stack (MongoDB, Express, React, Node.js), building modern and scalable web applications.",
      knowsAbout: [
        "Software Development",
        "MERN Stack",
        "React",
        "Node.js",
        "MongoDB",
        "Express.js",
        "Web Development",
        "JavaScript",
        "TypeScript",
      ],
      sameAs: [
        "https://github.com/Rohit-Pakhre09",
        "https://linkedin.com/in/rohit-pakhre",
        "https://www.instagram.com/rohit._.ix/",
      ],
      image: `${siteUrl}/favicon.png`,
      email: "pakhrerohit281@gmail.com",
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Rohit Pakhre Portfolio",
      description:
        "The official portfolio of Rohit Pakhre, a software developer specializing in the MERN stack.",
      author: { "@id": `${siteUrl}/#person` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: structured data
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <CustomCursor />
        <div className="relative min-h-screen w-full overflow-hidden bg-white bg-grid-black/[0.2] dark:bg-black dark:bg-grid-white/[0.2]">
          <div className="relative z-10">
            <Header />
            <main className="relative z-10 pt-14 sm:pt-16">{children}</main>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
