'use client';

import { useState, useEffect } from "react";
import { Cursor, CursorFollow, CursorProvider } from "@/components/animate-ui/components/animate/cursor";
import { Header } from "@/components/header";
import { ThemeToggler } from "@/components/animate-ui/primitives/effects/theme-toggler";
import { useTheme } from "next-themes";
import type { ThemeSelection } from "@/components/animate-ui/primitives/effects/theme-toggler";

export default function Home() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [currentResolved, setCurrentResolved] = useState<'light' | 'dark'>(resolvedTheme as 'light' | 'dark' || 'light');
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  useEffect(() => {
    if (resolvedTheme) {
      setCurrentResolved(resolvedTheme as 'light' | 'dark');
    }
  }, [resolvedTheme]);

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

  const cursorText = hoveredLink ? formatLink(hoveredLink) : 'Hello';

  return (
    <CursorProvider>
      <Cursor />
      <CursorFollow>{cursorText}</CursorFollow>
      <main className="">
        <Header />
        <HeroSection theme={theme} resolvedTheme={resolvedTheme} setTheme={setTheme} onThemeChange={setCurrentResolved} />
        <BlueSection resolvedTheme={currentResolved} />
        <ProjectSection resolvedTheme={currentResolved} />
        <ContactSection resolvedTheme={currentResolved} setHoveredLink={setHoveredLink} />
      </main>
    </CursorProvider>
  );

  function HeroSection({ 
    theme, 
    resolvedTheme, 
    setTheme,
    onThemeChange
  }: { 
    theme: string | undefined; 
    resolvedTheme: string | undefined;
    setTheme: (theme: ThemeSelection) => void;
    onThemeChange: (theme: 'light' | 'dark') => void;
  }) {
    const getNextTheme = (
      effective: ThemeSelection,
      modes: ThemeSelection[] = ['light', 'dark']
    ): ThemeSelection => {
      const i = modes.indexOf(effective);
      if (i === -1) return modes[0];
      return modes[(i + 1) % modes.length];
    };

    return (
      <div className="px-4 py-6 sm:px-6 sm:py-12 md:px-8 md:py-16 lg:px-12 lg:py-75 relative z-[1]">
        <h1 className="text-7xl font-bold mb-8 text-center">
          Hello, I'm{' '}
          <ThemeToggler
            theme={theme as ThemeSelection}
            resolvedTheme={resolvedTheme as 'light' | 'dark'}
            setTheme={setTheme}
            onImmediateChange={(newTheme) => {
              const resolved = newTheme === 'system' 
                ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
                : newTheme;
              onThemeChange(resolved as 'light' | 'dark');
            }}
          >
            {({ effective, toggleTheme }) => (
              <span
                onClick={() => toggleTheme(getNextTheme(effective))}
                className="cursor-pointer hover:text-blue-600 transition-colors"
              >
                Aditya Rahman
              </span>
            )}
          </ThemeToggler>
        </h1>
      </div>
    );
  }

  function BlueSection({ resolvedTheme }: { resolvedTheme: 'light' | 'dark' }) {
    return (
      <div className={`${resolvedTheme === 'light' ? 'bg-blue-600' : 'bg-red-600'} px-4 py-6 sm:px-6 sm:py-12 md:px-8 md:py-16 lg:px-12 lg:py-75 relative z-[1] transition-colors duration-700 ease-in-out`}>
        <h1 className="text-7xl font-bold mb-8 text-center text-white transition-all duration-700 ease-in-out">
        <span className={`${resolvedTheme === 'light' ? 'text-blue-900' : 'text-red-900'} transition-colors duration-700 ease-in-out`}>
         Introduce me&nbsp;
        </span>
         <span className="transition-all duration-700 ease-in-out">
           {resolvedTheme === 'light' ? 'as a BackEnd Developer.' : 'as a UI/UX Designer.'}
         </span>
        </h1>
        <p className="text-2xl text-white text-center transition-all duration-700 ease-in-out">
        {resolvedTheme === 'light' 
          ? 'In Backend Development, I specialize with PHP, Laravel, and Golang'
          : 'In UI/UX Design, I specialize with Figma, Canva, and Ibis Paint.'}
        </p>
      </div>
    );
  }

  function ProjectSection({ resolvedTheme }: { resolvedTheme: 'light' | 'dark' }) {
    return (
      <div className="px-4 py-6 sm:px-6 sm:py-12 md:px-8 md:py-16 lg:px-12 lg:py-75 relative z-[1]">
        <h1 className="text-7xl font-bold mb-8">
          Projects.
        </h1>
        <div className="text-lg text-center transition-all duration-700 ease-in-out flex flex-col items-center justify-center">
          {resolvedTheme === 'light' ? 
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-3xl font-bold mb-4">Project 1</h2>
            <p className="text-lg text-center transition-all duration-700 ease-in-out">
              This is a description of project 1.
            </p>
          </div>
          : <div className="flex flex-col items-center justify-center">
            <h2 className="text-3xl font-bold mb-4">Project 2</h2>
            <p className="text-lg text-center transition-all duration-700 ease-in-out">
              This is a description of project 2.
            </p>
          </div>}
        </div>
      </div>
    );
  }
  function ContactSection({ resolvedTheme, setHoveredLink }: { resolvedTheme: 'light' | 'dark'; setHoveredLink: (link: string | null) => void }) {
    return (
      <div className={`${resolvedTheme === 'light' ? 'bg-[#005CEF]' : 'bg-[#005CEF]'} px-4 py-6 sm:px-6 sm:py-12 md:px-8 md:py-16 lg:px-12 lg:py-20 relative z-[1]`}>
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-bold text-white mb-4 sm:mb-8 md:mb-10 lg:mb-12">Contact Me.</h1>
        <div className="mb-6 sm:mb-10 md:mb-12 lg:mb-16 relative z-[1]">
          <a 
            href="mailto:adityarahmann15@gmail.com" 
            className="relative inline-block text-white hover:text-[#FFDD18] transition-colors text-sm sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-4 z-[1] break-all sm:break-normal after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-white after:z-[1] after:transition-all after:duration-300 hover:after:w-full"
            onMouseEnter={() => setHoveredLink('mailto:adityarahmann15@gmail.com')}
            onMouseLeave={() => setHoveredLink(null)}
          >adityarahmann15@gmail.com</a>
          <div className="absolute bottom-0 top-12 sm:top-20 md:top-24 left-0 right-0 h-0.5 sm:h-1 bg-white rounded-r-full z-[1]"></div>
        </div>
        <div className="flex flex-col gap-2 sm:gap-4 md:gap-5 lg:gap-6 relative z-[1]">
          <a 
            href="https://github.com/ddettaa" 
            className="relative inline-block text-white hover:text-gray-300 transition-colors text-base sm:text-2xl md:text-3xl lg:text-4xl font-bold z-[1] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-white after:z-[1] after:transition-all after:duration-300 hover:after:w-full"
            onMouseEnter={() => setHoveredLink('https://github.com/ddettaa')}
            onMouseLeave={() => setHoveredLink(null)}
          >GitHub</a>
          <a 
            href="https://www.linkedin.com/in/2ddettaa/" 
            className="relative inline-block text-white hover:text-gray-300 transition-colors text-base sm:text-2xl md:text-3xl lg:text-4xl font-bold z-[1] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-white after:z-[1] after:transition-all after:duration-300 hover:after:w-full"
            onMouseEnter={() => setHoveredLink('https://www.linkedin.com/in/2ddettaa/')}
            onMouseLeave={() => setHoveredLink(null)}
          >LinkedIn</a>
          <a 
            href="https://www.instagram.com/ddettaa/" 
            className="relative inline-block text-white hover:text-gray-300 transition-colors text-base sm:text-2xl md:text-3xl lg:text-4xl font-bold z-[1] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-white after:z-[1] after:transition-all after:duration-300 hover:after:w-full"
            onMouseEnter={() => setHoveredLink('https://www.instagram.com/ddettaa/')}
            onMouseLeave={() => setHoveredLink(null)}
          >Instagram</a>
          <a 
            href="https://www.facebook.com/ddettaa/" 
            className="relative inline-block text-white hover:text-gray-300 transition-colors text-base sm:text-2xl md:text-3xl lg:text-4xl font-bold z-[1] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-white after:z-[1] after:transition-all after:duration-300 hover:after:w-full"
            onMouseEnter={() => setHoveredLink('https://www.facebook.com/ddettaa/')}
            onMouseLeave={() => setHoveredLink(null)}
          >Facebook</a>
          <a 
            href="https://www.twitter.com/ddetta4/" 
            className="relative inline-block text-white hover:text-gray-300 transition-colors text-base sm:text-2xl md:text-3xl lg:text-4xl font-bold z-[1] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-white after:z-[1] after:transition-all after:duration-300 hover:after:w-full"
            onMouseEnter={() => setHoveredLink('https://www.twitter.com/ddetta4/')}
            onMouseLeave={() => setHoveredLink(null)}
          >Twitter</a>
          <a 
            href="https://www.youtube.com/ddettaa/" 
            className="relative inline-block text-white hover:text-gray-300 transition-colors text-base sm:text-2xl md:text-3xl lg:text-4xl font-bold z-[1] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-white after:z-[1] after:transition-all after:duration-300 hover:after:w-full"
            onMouseEnter={() => setHoveredLink('https://www.youtube.com/ddettaa/')}
            onMouseLeave={() => setHoveredLink(null)}
          >YouTube</a>
        </div>
      </div>
    );
  }
}

