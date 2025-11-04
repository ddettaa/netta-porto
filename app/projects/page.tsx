'use client';

import { Cursor, CursorFollow, CursorProvider } from "@/components/animate-ui/components/animate/cursor";
import { Header } from "@/components/header";


export default function Projects() {
  return (
    <CursorProvider>
      <Cursor />
      <CursorFollow>User</CursorFollow>
      <main className="bg-[#FF1F25] min-h-screen">
        <Header />
        <ProjectsSection />
      </main>
    </CursorProvider>
  );

  function ProjectsSection() {
    return (
      <div className="">
        <div className="px-4 py-6 sm:px-6 sm:py-12 md:px-8 md:py-16 lg:px-12 lg:py-20 relative z-[1]">
        <h1 className="text-9xl font-bold text-white mb-8 text-center">Projects.</h1>
            <p className="text-lg text-white text-center">
                Private Projects
            </p>
        </div>
      </div>
    );
  }
}
