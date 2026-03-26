'use client';

import { useState, useEffect, useRef } from "react";
import { Cursor, CursorFollow, CursorProvider } from "@/components/animate-ui/components/animate/cursor";
import { Header } from "@/components/header";
import { ThemeToggler } from "@/components/animate-ui/primitives/effects/theme-toggler";
import { useTheme } from "next-themes";
import type { ThemeSelection } from "@/components/animate-ui/primitives/effects/theme-toggler";
import DynamicText from "@/components/kokonutui/dynamic-text";
import { ChevronDown } from "lucide-react";

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
        <AboutSection resolvedTheme={currentResolved} />
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
            {({ effective, toggleTheme }) => {
              const isDark = effective === 'dark';
              return (
                <span className="relative inline-block group">
                  <span
                    onClick={() => toggleTheme(getNextTheme(effective))}
                    className={`cursor-pointer transition-all duration-300 relative inline-block hover:scale-105 ${isDark ? 'text-red-600 hover:text-red-400' : 'hover:text-blue-600'}`}
                  >
                    Aditya Rahman
                    {/* Subtle underline indicator */}
                    <span className={`absolute -bottom-1 left-0 w-full h-0.5 transition-all duration-300 ${isDark ? 'bg-red-600/30 group-hover:bg-red-600' : 'bg-blue-600/30 group-hover:bg-blue-600'}`}></span>
                  </span>
                  {/* Minimalist floating tooltip */}
                  <span className="absolute -top-15 left-[50%] -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                    <span className={`relative inline-block text-white text-xs font-medium px-4 py-1.5 rounded-full shadow-lg backdrop-blur-sm animate-float ${isDark ? 'bg-gradient-to-r from-red-600 to-red-500' : 'bg-gradient-to-r from-blue-600 to-blue-500'}`}>
                      Click me
                      <span className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 ${isDark ? 'bg-red-600' : 'bg-blue-600'}`}></span>
                    </span>
                  </span>
                </span>
              );
            }}
          </ThemeToggler>
        </h1>
      </div>
    );
  }

  function BlueSection({ resolvedTheme }: { resolvedTheme: 'light' | 'dark' }) {
    const introTexts = [
      "Perkenalkan saya",
      "Présentez-moi",
      "Presentame",
      "介绍我",
      "소개합니다",
      "Presentami",
      "Introduce me",
    ];
    
    return (
      <div className={`${resolvedTheme === 'light' ? 'bg-blue-600' : 'bg-red-600'} px-4 py-6 sm:px-6 sm:py-12 md:px-8 md:py-16 lg:px-12 lg:py-75 relative z-[1] transition-colors duration-700 ease-in-out`}>
        <h1 className="text-7xl font-bold mb-8 text-center text-white transition-all duration-700 ease-in-out">
        <span className={`${resolvedTheme === 'light' ? 'text-blue-900' : 'text-red-900'} transition-colors duration-700 ease-in-out inline-flex items-center`}>
          <DynamicText 
            texts={introTexts}
            className={`${resolvedTheme === 'light' ? 'text-blue-900' : 'text-red-900'} text-7xl font-bold`}
            interval={500}
            showDot={false}
          />
          &nbsp;
        </span>
         <span className="transition-all duration-700 ease-in-out">
           {resolvedTheme === 'light' ? 'as a BackEnd Developer.' : 'as a UI/UX Designer.'}
         </span>
        </h1>
        <p className="text-lg text-white text-center transition-all duration-700 ease-in-out">
        {resolvedTheme === 'light' 
          ? 'In Backend Development, I specialize with PHP, Laravel, and Golang.'
          : 'In UI/UX Design, I specialize with Figma, Canva, and Abode.'}
        </p>
      </div>
    );
  }

  function ProjectSection({ resolvedTheme }: { resolvedTheme: 'light' | 'dark' }) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const backendProjects = [
      { 
        description: "API & Server Development", 
        name: "Sistem Rumah Sakit Bagian Pemeriksaan",
        detail: "Sistem Rumah Sakit Bagian Pemeriksaan adalah sebuah sistem yang membantu dalam pemeriksaan pasien. Sistem ini membantu dalam pemeriksaan pasien dan pengelolaan data pasien.",
        images: [
          "/Simrs.png",
        ]
      },
      { 
        description: "Backend Development", 
        name: "SARLAIN V2",
        detail: "Scalable microservices architecture for payment processing. Handles millions of transactions with high availability and real-time monitoring.",
        images: [
          "/Sarlainv2.png",
        ]
      }
    ];

    const uiuxProjects = [
      { 
        description: "UI/UX Design", 
        name: "Burger Queen",
        detail: "Burger Queen adalah sebuah aplikasi yang membantu dalam pembuatan burger. Aplikasi ini membantu dalam pembuatan burger dan pengelolaan data burger.",
        images: [
          "/Burger Queen.png",
        ]
      },
    ];

    const projects = resolvedTheme === 'light' ? backendProjects : uiuxProjects;
    const sectionTitle = resolvedTheme === 'light' ? "Project Backend." : "Project UI/UX.";

    const toggleAccordion = (index: number) => {
      setOpenIndex(openIndex === index ? null : index);
    };

    return (
      <div className="px-4 py-6 sm:px-6 sm:py-12 md:px-8 md:py-16 lg:px-12 lg:py-75 relative z-[1]">
        <h1 className={`text-7xl font-bold mb-6 ${resolvedTheme === 'light' ? 'text-blue-600' : 'text-blue-600'} transition-colors duration-700 ease-in-out`}>
          {sectionTitle}
        </h1>
        
        {/* Horizontal line below title */}
        <div className={`h-0.5 mb-8 ${resolvedTheme === 'light' ? 'bg-blue-600' : 'bg-blue-600'} transition-colors duration-700 ease-in-out`}></div>

        {/* Project entries */}
        <div className="space-y-0">
          {projects.map((project, index) => (
            <div key={index}>
              <div 
                className="flex items-center justify-between py-4 group cursor-pointer"
                onClick={() => toggleAccordion(index)}
              >
                <div className="flex flex-col">
                  <p className="text-base text-black dark:text-white mb-1 transition-colors duration-700 ease-in-out">
                    {project.description}
                  </p>
                  <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold text-red-600 transition-colors duration-700 ease-in-out">
                    {project.name}
                  </h2>
                </div>
                <ChevronDown 
                  className={`w-6 h-6 ${resolvedTheme === 'light' ? 'text-blue-600' : 'text-blue-600'} transition-all duration-300 ease-in-out ${
                    openIndex === index ? 'rotate-180' : ''
                  }`} 
                />
              </div>
              
              {/* Accordion Content */}
              <div 
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="py-6 sm:py-8 lg:py-10">
                  {/* Single container for images and detail */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-0 items-stretch">
                    {/* Images Container - Only 1 image */}
                    <div className="w-full">
                      <div className="w-full aspect-video rounded-lg lg:rounded-l-lg lg:rounded-r-none overflow-hidden bg-gray-100 dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300">
                        <img 
                          src={project.images[0]} 
                          alt={project.name}
                          className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    </div>

                    {/* Description Box - Matches height of images container */}
                    <div className="w-full flex">
                      <div className={`bg-red-600 rounded-lg lg:rounded-r-lg lg:rounded-l-none text-white w-full flex flex-col justify-between p-6 sm:p-8 lg:p-10 shadow-lg`}>
                        <div className="flex-1 flex items-center">
                          <p className="text-sm sm:text-base lg:text-lg leading-relaxed font-normal">
                            {project.detail}
                          </p>
                        </div>
                        <div className="pt-6 mt-6 border-t border-red-500/30">
                          <button className={`bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-6 lg:py-3.5 lg:px-8 rounded-lg text-sm lg:text-base transition-all duration-300 hover:scale-105 hover:shadow-xl w-full sm:w-auto`}>
                            View Project
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Horizontal line between projects (except after last) */}
              {index < projects.length - 1 && (
                <div className={`h-0.5 my-4 ${resolvedTheme === 'light' ? 'bg-blue-600' : 'bg-blue-600'} transition-colors duration-700 ease-in-out`}></div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  function AboutSection({ resolvedTheme }: { resolvedTheme: 'light' | 'dark' }) {
    const backendSkills = [
      { name: "PHP / Laravel", level: 90 },
      { name: "Golang", level: 75 },
      { name: "JavaScript / TypeScript", level: 85 },
      { name: "MySQL / PostgreSQL", level: 80 },
      { name: "REST API Design", level: 85 },
      { name: "Git & DevOps", level: 70 },
    ];

    const designSkills = [
      { name: "Figma", level: 90 },
      { name: "UI Design", level: 85 },
      { name: "UX Research", level: 75 },
      { name: "Prototyping", level: 80 },
      { name: "Design Systems", level: 75 },
      { name: "Canva / Adobe", level: 80 },
    ];

    const skills = resolvedTheme === 'light' ? backendSkills : designSkills;
    const isLight = resolvedTheme === 'light';

    return (
      <div className="px-4 py-6 sm:px-6 sm:py-12 md:px-8 md:py-16 lg:px-12 lg:py-20 relative z-[1]">
        <h1 className={`text-5xl sm:text-6xl md:text-7xl font-bold mb-4 transition-colors duration-700 ease-in-out ${isLight ? 'text-blue-600' : 'text-red-600'}`}>
          About Me.
        </h1>
        <div className={`h-0.5 mb-8 transition-colors duration-700 ease-in-out ${isLight ? 'bg-blue-600' : 'bg-red-600'}`}></div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Bio */}
          <div>
            <p className="text-base sm:text-lg leading-relaxed text-foreground/80 mb-6">
              {isLight
                ? "I'm a Backend Developer passionate about building robust, scalable server-side applications. I work primarily with PHP, Laravel, and Golang to create APIs and systems that power real-world solutions — from hospital management systems to Web3 decentralized apps."
                : "I'm a UI/UX Designer who loves crafting intuitive and visually compelling digital experiences. With tools like Figma and a keen eye for detail, I design interfaces that are both beautiful and functional — from mobile apps to web platforms."}
            </p>
            <p className="text-base sm:text-lg leading-relaxed text-foreground/80 mb-8">
              {isLight
                ? "I believe in clean architecture, well-documented APIs, and code that's built to last. Currently exploring the intersection of Web3 and traditional backend systems."
                : "I believe great design starts with understanding people. Every pixel has a purpose, and every interaction should feel natural and delightful."}
            </p>
            <a
              href="/projects"
              className={`inline-block text-white font-bold py-3 px-6 rounded-lg text-sm transition-all duration-300 hover:scale-105 hover:shadow-xl ${isLight ? 'bg-blue-600' : 'bg-red-600'}`}
            >
              View My Work
            </a>
          </div>

          {/* Skills */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-foreground/60 uppercase tracking-wider mb-6">
              {isLight ? 'Technical Skills' : 'Design Skills'}
            </h3>
            {skills.map((skill) => (
              <div key={skill.name}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-semibold text-foreground">{skill.name}</span>
                  <span className="text-sm text-foreground/50">{skill.level}%</span>
                </div>
                <div className="w-full h-2 bg-foreground/10 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-1000 ease-out ${isLight ? 'bg-blue-600' : 'bg-red-600'}`}
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
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

