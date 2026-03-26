'use client';

import { useState } from "react";
import { Cursor, CursorFollow, CursorProvider } from "@/components/animate-ui/components/animate/cursor";
import { Header } from "@/components/header";
import { ExternalLink, Github, Globe, ChevronDown } from "lucide-react";

type Project = {
  name: string;
  description: string;
  tech: string[];
  github: string;
  demo?: string;
  category: 'fullstack' | 'frontend' | 'backend' | 'ai' | 'web3';
  highlight?: boolean;
};

const projects: Project[] = [
  {
    name: "EmotionSense AI",
    description: "An AI-powered emotion detection and analysis application built with TypeScript. Leverages machine learning to analyze and classify human emotions from various inputs.",
    tech: ["TypeScript", "AI/ML", "Next.js"],
    github: "https://github.com/ddettaa/emotionsense-ai",
    category: "ai",
    highlight: true,
  },
  {
    name: "Farchess",
    description: "A decentralized chess game built on Farcaster, running onchain on Base. Play chess with your Farcaster friends with moves recorded on the blockchain.",
    tech: ["TypeScript", "Farcaster", "Base", "Onchain"],
    github: "https://github.com/ddettaa/Farchess",
    demo: "https://farchess.vercel.app",
    category: "web3",
    highlight: true,
  },
  {
    name: "Wrapcast",
    description: "Wrapped Farcaster 2025 — a year-in-review experience for Farcaster users. Visualize your social activity, top casts, and engagement metrics throughout the year.",
    tech: ["TypeScript", "Farcaster", "Next.js", "Vercel"],
    github: "https://github.com/ddettaa/wrapcast",
    demo: "https://wrapcast-tau.vercel.app",
    category: "web3",
    highlight: true,
  },
  {
    name: "Irys Checker",
    description: "A utility tool for checking and verifying data on the Irys network. Built with TypeScript and deployed on Vercel for easy access.",
    tech: ["TypeScript", "Irys", "Next.js", "Vercel"],
    github: "https://github.com/ddettaa/irys-checker",
    demo: "https://irys-checker-one.vercel.app",
    category: "web3",
  },
  {
    name: "SIMRS Pemeriksaan",
    description: "Hospital Information System for the examination department. A full-stack application with separate frontend, backend API, mobile app, and admin panel built with Laravel Filament.",
    tech: ["PHP", "Laravel", "Filament", "Flutter", "JavaScript"],
    github: "https://github.com/ddettaa/SIMRS-PEMERIKSAAN",
    category: "fullstack",
    highlight: true,
  },
  {
    name: "Netta Porto",
    description: "A portfolio website built with TypeScript and deployed on Vercel. Clean design with modern web technologies.",
    tech: ["TypeScript", "Next.js", "Vercel"],
    github: "https://github.com/ddettaa/netta-porto",
    demo: "https://portofolio-ddettaas-projects.vercel.app",
    category: "frontend",
  },
  {
    name: "Cafe Java",
    description: "A cafe management application built with Java. Handles ordering, menu management, and basic cafe operations.",
    tech: ["Java", "OOP"],
    github: "https://github.com/ddettaa/Cafe-Java",
    category: "backend",
  },
  {
    name: "UAS MetNum",
    description: "Numerical methods implementation in C++. Academic project covering various numerical computation algorithms and mathematical problem solving.",
    tech: ["C++", "Numerical Methods"],
    github: "https://github.com/ddettaa/UAS-MetNum",
    category: "backend",
  },
];

const categories = [
  { key: 'all', label: 'All' },
  { key: 'web3', label: 'Web3' },
  { key: 'fullstack', label: 'Full Stack' },
  { key: 'ai', label: 'AI' },
  { key: 'frontend', label: 'Frontend' },
  { key: 'backend', label: 'Backend' },
];

export default function Projects() {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [filter, setFilter] = useState('all');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const formatLink = (href: string): string => {
    try {
      const url = new URL(href);
      return url.hostname.replace('www.', '');
    } catch {
      return href;
    }
  };

  const cursorText = hoveredLink ? formatLink(hoveredLink) : 'Projects';

  const filtered = filter === 'all' ? projects : projects.filter(p => p.category === filter);

  return (
    <CursorProvider>
      <Cursor />
      <CursorFollow>{cursorText}</CursorFollow>
      <main className="bg-[#FF1F25] min-h-screen">
        <Header />
        <div className="px-4 py-6 sm:px-6 sm:py-12 md:px-8 md:py-16 lg:px-12 lg:py-20 relative z-[1]">
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-white mb-4">
            Projects.
          </h1>
          <p className="text-lg sm:text-xl text-white/80 mb-8 max-w-2xl">
            A collection of projects I&apos;ve built — from Web3 dApps and AI experiments to full-stack systems.
          </p>

          {/* Filter */}
          <div className="flex flex-wrap gap-2 mb-12">
            {categories.map(cat => (
              <button
                key={cat.key}
                onClick={() => { setFilter(cat.key); setOpenIndex(null); }}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                  filter === cat.key
                    ? 'bg-white text-[#FF1F25]'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Project list */}
          <div className="space-y-0">
            {filtered.map((project, index) => (
              <div key={project.name}>
                <div
                  className="flex items-center justify-between py-5 group cursor-pointer"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-3">
                      <p className="text-sm text-white/60 uppercase tracking-wider font-medium">
                        {project.category === 'web3' ? 'Web3' : project.category === 'ai' ? 'AI / ML' : project.category === 'fullstack' ? 'Full Stack' : project.category === 'frontend' ? 'Frontend' : 'Backend'}
                      </p>
                      {project.highlight && (
                        <span className="bg-yellow-400 text-black text-xs font-bold px-2 py-0.5 rounded-full">
                          Featured
                        </span>
                      )}
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white group-hover:text-yellow-400 transition-colors duration-300">
                      {project.name}
                    </h2>
                  </div>
                  <ChevronDown
                    className={`w-6 h-6 text-white transition-all duration-300 ease-in-out flex-shrink-0 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </div>

                {/* Accordion content */}
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    openIndex === index ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="pb-6">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 sm:p-8">
                      <p className="text-white/90 text-base sm:text-lg mb-6 leading-relaxed">
                        {project.description}
                      </p>

                      {/* Tech stack */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tech.map(t => (
                          <span
                            key={t}
                            className="bg-white/10 text-white text-xs sm:text-sm font-medium px-3 py-1 rounded-full"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      {/* Links */}
                      <div className="flex flex-wrap gap-3">
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-white text-[#FF1F25] font-bold py-2.5 px-5 rounded-lg text-sm transition-all duration-300 hover:scale-105 hover:shadow-xl"
                          onMouseEnter={() => setHoveredLink(project.github)}
                          onMouseLeave={() => setHoveredLink(null)}
                        >
                          <Github className="w-4 h-4" />
                          Source Code
                        </a>
                        {project.demo && (
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-yellow-400 text-black font-bold py-2.5 px-5 rounded-lg text-sm transition-all duration-300 hover:scale-105 hover:shadow-xl"
                            onMouseEnter={() => setHoveredLink(project.demo!)}
                            onMouseLeave={() => setHoveredLink(null)}
                          >
                            <ExternalLink className="w-4 h-4" />
                            Live Demo
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-white/20" />
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-4xl sm:text-5xl font-bold text-white">{projects.length}+</p>
              <p className="text-white/60 text-sm mt-1">Projects</p>
            </div>
            <div className="text-center">
              <p className="text-4xl sm:text-5xl font-bold text-white">5+</p>
              <p className="text-white/60 text-sm mt-1">Languages</p>
            </div>
            <div className="text-center">
              <p className="text-4xl sm:text-5xl font-bold text-white">4</p>
              <p className="text-white/60 text-sm mt-1">Live Demos</p>
            </div>
            <div className="text-center">
              <p className="text-4xl sm:text-5xl font-bold text-white">3</p>
              <p className="text-white/60 text-sm mt-1">Web3 dApps</p>
            </div>
          </div>

          {/* GitHub CTA */}
          <div className="mt-16 text-center">
            <a
              href="https://github.com/ddettaa"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-white text-[#FF1F25] font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              onMouseEnter={() => setHoveredLink('https://github.com/ddettaa')}
              onMouseLeave={() => setHoveredLink(null)}
            >
              <Globe className="w-5 h-5" />
              View All on GitHub
            </a>
          </div>
        </div>
      </main>
    </CursorProvider>
  );
}
