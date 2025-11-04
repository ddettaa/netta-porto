'use client';

import { Cursor, CursorFollow, CursorProvider } from "@/components/animate-ui/components/animate/cursor";
import { Header } from "@/components/header";
import { ThemeToggler } from "@/components/animate-ui/primitives/effects/theme-toggler";
import { useTheme } from "next-themes";
import type { ThemeSelection } from "@/components/animate-ui/primitives/effects/theme-toggler";

export default function Home() {
  return (
    <CursorProvider>
      <Cursor />
      <CursorFollow>Hello</CursorFollow>
      <main className="">
        <Header />
        <HeroSection />
      </main>
    </CursorProvider>
  );

  function HeroSection() {
    const { theme, resolvedTheme, setTheme } = useTheme();
    
    const getNextTheme = (
      effective: ThemeSelection,
      modes: ThemeSelection[] = ['light', 'dark']
    ): ThemeSelection => {
      const i = modes.indexOf(effective);
      if (i === -1) return modes[0];
      return modes[(i + 1) % modes.length];
    };

    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold">
          Hello, I'm{' '}
          <ThemeToggler
            theme={theme as ThemeSelection}
            resolvedTheme={resolvedTheme as 'light' | 'dark'}
            setTheme={setTheme}
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
}

