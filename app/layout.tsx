import type { Metadata } from "next";
import { Host_Grotesk } from "next/font/google";
import "./globals.css";

const hostGrotesk = Host_Grotesk({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aditya Rahman — Backend Developer & UI/UX Designer",
  description: "Portfolio of Aditya Rahman. Backend Developer specializing in PHP, Laravel, and Golang. UI/UX Designer with Figma and modern design tools. Building Web3 dApps, AI projects, and full-stack systems.",
  keywords: ["Aditya Rahman", "Backend Developer", "UI/UX Designer", "Portfolio", "Laravel", "Golang", "Web3", "Next.js"],
  authors: [{ name: "Aditya Rahman" }],
  openGraph: {
    title: "Aditya Rahman — Backend Developer & UI/UX Designer",
    description: "Portfolio of Aditya Rahman. Backend Developer & UI/UX Designer building Web3 dApps, AI projects, and full-stack systems.",
    type: "website",
    locale: "en_US",
    siteName: "Aditya Rahman Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aditya Rahman — Backend Developer & UI/UX Designer",
    description: "Portfolio of Aditya Rahman. Backend Developer & UI/UX Designer.",
    creator: "@ddetta4",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${hostGrotesk.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
