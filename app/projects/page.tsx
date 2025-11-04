'use client';
'use client';

import { Cursor, CursorFollow, CursorProvider } from "@/components/animate-ui/components/animate/cursor";
import { Header } from "@/components/header";


export default function Projects() {
  return (
    <CursorProvider>
      <Cursor />
      <CursorFollow>Hello</CursorFollow>
      <main className="">
        <Header />
        <ProjectsSection />
      </main>
    </CursorProvider>
  );

  function ProjectsSection() {
    return (
      <div className="">
        <div className="container">
        <h1 className="text-4xl font-bold">Projects</h1>
            <p className="text-lg">
                Here are some of my projects.
            </p>
        </div>
      </div>
    );
  }
}
