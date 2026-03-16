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
  title: "Rohit Pakhre | MERN Stack Developer",
  description:
    "The official portfolio of Rohit Pakhre, MERN stack developer.",
  authors: [{ name: "Rohit Pakhre" }],
  keywords: ["MERN", "React", "Node.js", "MongoDB", "Express", "Portfolio"],
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "Rohit Pakhre | MERN Stack Developer",
    description:
      "The official portfolio of Rohit Pakhre, MERN stack developer.",
    url: siteUrl,
    siteName: "Rohit Pakhre Portfolio",
    images: [
      {
        url: "/favicon.svg",
        type: "image/svg+xml",
        width: 64,
        height: 64,
        alt: "Rohit Pakhre portfolio icon",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Rohit Pakhre | MERN Stack Developer",
    description:
      "The official portfolio of Rohit Pakhre, MERN stack developer.",
    images: ["/favicon.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className} suppressHydrationWarning>
        <CustomCursor />
        <div className="relative min-h-screen w-full bg-white dark:bg-black dark:bg-grid-white/[0.2] bg-grid-black/[0.2]">
          <Header />
          <main className="relative z-10 pt-14 sm:pt-16">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
