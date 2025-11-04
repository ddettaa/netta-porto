import Image from "next/image";
import { Cursor, CursorFollow, CursorProvider } from "@/components/animate-ui/components/animate/cursor";
import { BubbleBackground } from "@/components/animate-ui/components/backgrounds/bubble";
import { Header } from "@/components/header";

export default function Home() {
  return (
    <CursorProvider>
      <Cursor />
      <CursorFollow>User</CursorFollow>
      <main className="min h-screen">
        <Header />
      </main>
    </CursorProvider>
  );
}

