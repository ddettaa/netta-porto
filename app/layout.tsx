import type { Metadata } from "next";
import { Host_Grotesk } from "next/font/google";
import { Analytics } from '@vercel/analytics/next';
import "./globals.css";

const hostGrotesk = Host_Grotesk({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aditya Rahman — Backend Developer & AI Enthusiast",
  description: "Portfolio of Aditya Rahman. Backend Developer specializing in PHP, Laravel, and Golang. AI Enthusiast focusing on fine-tuning LLMs, Agentic Workflows, and RAG Architecture.",
  keywords: ["Aditya Rahman", "Backend Developer", "AI Enthusiast", "Portfolio", "Laravel", "Golang", "Web3", "Next.js", "AI Agents", "LLM", "RAG"],
  authors: [{ name: "Aditya Rahman" }],
  openGraph: {
    title: "Aditya Rahman — Backend Developer & AI Enthusiast",
    description: "Portfolio of Aditya Rahman. Backend Developer & AI Enthusiast building Web3 dApps, AI agent systems, and full-stack applications.",
    type: "website",
    locale: "en_US",
    siteName: "Aditya Rahman Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aditya Rahman — Backend Developer & AI Enthusiast",
    description: "Portfolio of Aditya Rahman. Backend Developer & AI Enthusiast building Web3 dApps and AI agent systems.",
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
        <Analytics />
      </body>
    </html>
  );
}
