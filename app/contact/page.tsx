'use client';

import { useState, useEffect } from "react";
import { Cursor, CursorFollow, CursorProvider } from "@/components/animate-ui/components/animate/cursor";
import { Header } from "@/components/header";
import { Send } from "lucide-react";

export default function Contact() {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Construct mailto link with form data
    const subject = encodeURIComponent(`Portfolio Contact from ${formState.name}`);
    const body = encodeURIComponent(`Name: ${formState.name}\nEmail: ${formState.email}\n\n${formState.message}`);
    window.location.href = `mailto:adityarahmann15@gmail.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <CursorProvider>
      <Cursor />
      <CursorFollow>{cursorText}</CursorFollow>
      <main className="bg-[#005CEF] min-h-screen">
        <Header />
        <div className="px-4 py-6 sm:px-6 sm:py-12 md:px-8 md:py-16 lg:px-12 lg:py-20 relative z-[1]">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-bold text-white mb-4 sm:mb-8 md:mb-10 lg:mb-12">Contact Me.</h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left: Links */}
            <div>
              <div className="mb-6 sm:mb-10 md:mb-12 lg:mb-16 relative z-[1]">
                <a
                  href="mailto:adityarahmann15@gmail.com"
                  className="relative inline-block text-white hover:text-[#FFDD18] transition-colors text-sm sm:text-xl md:text-2xl lg:text-3xl font-bold mb-4 z-[1] break-all sm:break-normal after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-white after:z-[1] after:transition-all after:duration-300 hover:after:w-full"
                  onMouseEnter={() => setHoveredLink('mailto:adityarahmann15@gmail.com')}
                  onMouseLeave={() => setHoveredLink(null)}
                >adityarahmann15@gmail.com</a>
                <div className="absolute bottom-0 top-12 sm:top-20 md:top-24 left-0 right-0 h-0.5 sm:h-1 bg-white rounded-r-full z-[1]"></div>
              </div>
              <div className="flex flex-col gap-2 sm:gap-4 md:gap-5 lg:gap-6 relative z-[1]">
                {[
                  { label: 'GitHub', href: 'https://github.com/ddettaa' },
                  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/2ddettaa/' },
                  { label: 'Instagram', href: 'https://www.instagram.com/ddettaa/' },
                  { label: 'Facebook', href: 'https://www.facebook.com/ddettaa/' },
                  { label: 'Twitter', href: 'https://www.twitter.com/ddetta4/' },
                  { label: 'YouTube', href: 'https://www.youtube.com/ddettaa/' },
                ].map(link => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative inline-block text-white hover:text-gray-300 transition-colors text-base sm:text-2xl md:text-3xl lg:text-4xl font-bold z-[1] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-white after:z-[1] after:transition-all after:duration-300 hover:after:w-full"
                    onMouseEnter={() => setHoveredLink(link.href)}
                    onMouseLeave={() => setHoveredLink(null)}
                  >{link.label}</a>
                ))}
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="relative z-[1]">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Send a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    required
                    value={formState.name}
                    onChange={e => setFormState(s => ({ ...s, name: e.target.value }))}
                    className="w-full bg-white/10 backdrop-blur-sm text-white placeholder-white/50 border border-white/20 rounded-lg px-4 py-3 text-base focus:outline-none focus:border-[#FFDD18] focus:ring-1 focus:ring-[#FFDD18] transition-all duration-300"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Your Email"
                    required
                    value={formState.email}
                    onChange={e => setFormState(s => ({ ...s, email: e.target.value }))}
                    className="w-full bg-white/10 backdrop-blur-sm text-white placeholder-white/50 border border-white/20 rounded-lg px-4 py-3 text-base focus:outline-none focus:border-[#FFDD18] focus:ring-1 focus:ring-[#FFDD18] transition-all duration-300"
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Your Message"
                    required
                    rows={5}
                    value={formState.message}
                    onChange={e => setFormState(s => ({ ...s, message: e.target.value }))}
                    className="w-full bg-white/10 backdrop-blur-sm text-white placeholder-white/50 border border-white/20 rounded-lg px-4 py-3 text-base focus:outline-none focus:border-[#FFDD18] focus:ring-1 focus:ring-[#FFDD18] transition-all duration-300 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-[#FFDD18] text-black font-bold py-3 px-8 rounded-lg text-base transition-all duration-300 hover:scale-105 hover:shadow-xl"
                >
                  <Send className="w-4 h-4" />
                  {submitted ? 'Opening Mail Client...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>

        <div
          className="fixed bottom-0 right-0 z-[5] transition-all duration-300 ease-out"
          style={{
            transform: `translateY(${-scrollY * 0.5}px) rotate(${scrollY * 0.1}deg) scale(${1 + Math.sin(scrollY * 0.01) * 0.2})`,
          }}
        >
          <div
            className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 xl:w-64 xl:h-64 rounded-full relative"
            style={{
              background: '#FFDD18',
              boxShadow: '0 0 60px rgba(255, 221, 24, 0.6), 0 0 100px rgba(255, 221, 24, 0.4)',
              transform: 'translate(30%, 30%)',
            }}
          />
        </div>
      </main>
    </CursorProvider>
  );
}
