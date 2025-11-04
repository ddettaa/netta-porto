'use client';

import { useState, useEffect } from "react";
import { Cursor, CursorFollow, CursorProvider } from "@/components/animate-ui/components/animate/cursor";
import { Header } from "@/components/header";


export default function Contact() {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const formatLink = (href: string): string => {
    if (href.startsWith('mailto:')) {
      return href.replace('mailto:', '');
    }
    try {
      const url = new URL(href);
      return url.hostname.replace('www.', '');
    } catch {
      return href;
    }
  };

  const cursorText = hoveredLink ? formatLink(hoveredLink) : 'User';

  return (
    <CursorProvider>
      <Cursor />
      <CursorFollow>{cursorText}</CursorFollow>
      <main className="bg-[#005CEF] relative">
        <Header />
        <ContactSection setHoveredLink={setHoveredLink} />
        <div 
          className="fixed bottom-0 left-170 top-100 right-0 w-400 h-400 bg-yellow-400 rounded-full z-[5] transition-all duration-300 ease-out"
          style={{
            transform: `translateY(${-scrollY * 0.5}px) rotate(${scrollY * 0.1}deg) scale(${1 + Math.sin(scrollY * 0.01) * 0.2})`,
          }}
        />
      </main>
    </CursorProvider>
  );
}

function ContactSection({ setHoveredLink }: { setHoveredLink: (link: string | null) => void }) {
    return (
      <div className="px-6 py-12 relative z-[1]">
        <h1 className="text-8xl font-bold text-white mb-8">Contact Me</h1>
        <div className="mb-12 relative z-[1]">
          <a 
            href="mailto:adityarahmann15@gmail.com" 
            className="relative inline-block text-white hover:text-gray-300 transition-colors text-4xl font-bold mb-4 z-[1] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-white after:z-[1] after:transition-all after:duration-300 hover:after:w-full"
            onMouseEnter={() => setHoveredLink('mailto:adityarahmann15@gmail.com')}
            onMouseLeave={() => setHoveredLink(null)}
          >adityarahmann15@gmail.com</a>
          <div className="absolute bottom-0 top-20 left-0 right-0 h-1 bg-white rounded-r-full z-[1]"></div>
        </div>
        <div className="flex flex-col gap-4 relative z-[1]">
          <a 
            href="https://github.com/ddettaa" 
            className="relative inline-block text-white hover:text-gray-300 transition-colors text-4xl font-bold z-[1] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-white after:z-[1] after:transition-all after:duration-300 hover:after:w-full"
            onMouseEnter={() => setHoveredLink('https://github.com/ddettaa')}
            onMouseLeave={() => setHoveredLink(null)}
          >GitHub</a>
          <a 
            href="https://www.linkedin.com/in/2ddettaa/" 
            className="relative inline-block text-white hover:text-gray-300 transition-colors text-4xl font-bold z-[1] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-white after:z-[1] after:transition-all after:duration-300 hover:after:w-full"
            onMouseEnter={() => setHoveredLink('https://www.linkedin.com/in/2ddettaa/')}
            onMouseLeave={() => setHoveredLink(null)}
          >LinkedIn</a>
          <a 
            href="https://www.instagram.com/ddettaa/" 
            className="relative inline-block text-white hover:text-gray-300 transition-colors text-4xl font-bold z-[1] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-white after:z-[1] after:transition-all after:duration-300 hover:after:w-full"
            onMouseEnter={() => setHoveredLink('https://www.instagram.com/ddettaa/')}
            onMouseLeave={() => setHoveredLink(null)}
          >Instagram</a>
          <a 
            href="https://www.facebook.com/ddettaa/" 
            className="relative inline-block text-white hover:text-gray-300 transition-colors text-4xl font-bold z-[1] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-white after:z-[1] after:transition-all after:duration-300 hover:after:w-full"
            onMouseEnter={() => setHoveredLink('https://www.facebook.com/ddettaa/')}
            onMouseLeave={() => setHoveredLink(null)}
          >Facebook</a>
          <a 
            href="https://www.twitter.com/ddetta4/" 
            className="relative inline-block text-white hover:text-gray-300 transition-colors text-4xl font-bold z-[1] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-white after:z-[1] after:transition-all after:duration-300 hover:after:w-full"
            onMouseEnter={() => setHoveredLink('https://www.twitter.com/ddetta4/')}
            onMouseLeave={() => setHoveredLink(null)}
          >Twitter</a>
          <a 
            href="https://www.youtube.com/ddettaa/" 
            className="relative inline-block text-white hover:text-gray-300 transition-colors text-4xl font-bold z-[1] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-white after:z-[1] after:transition-all after:duration-300 hover:after:w-full"
            onMouseEnter={() => setHoveredLink('https://www.youtube.com/ddettaa/')}
            onMouseLeave={() => setHoveredLink(null)}
          >YouTube</a>
        </div>
      </div>
    );
}
