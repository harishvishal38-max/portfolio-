import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, SlidersHorizontal, Download, Rocket } from 'lucide-react';

export default function Navbar({ onOpenEditModal, profile }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Education', href: '#education' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Events', href: '#events' },
    { name: 'Certificates', href: '#certificates' },
    { name: 'Resume', href: '#resume' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Detect active section
      const sections = navLinks.map((link) => link.href.substring(1));
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <nav
          className={`flex items-center justify-between px-5 py-3 rounded-2xl transition-all duration-300 ${
            isScrolled
              ? 'bg-[#111827]/95 border border-slate-800 shadow-xl'
              : 'bg-[#111827]/85 border border-slate-800/80 shadow-md'
          }`}
        >
          {/* Brand Logo */}
          <a href="#hero" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-[1.5px] transition-transform duration-300 group-hover:scale-105">
              <div className="w-full h-full bg-[#111827] rounded-[10px] flex items-center justify-center">
                <Rocket className="w-5 h-5 text-indigo-400 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg tracking-wider text-white">
                {profile?.name || 'VISHAL M'}
              </span>
              <span className="text-[10px] tracking-widest text-indigo-400 font-mono -mt-1 uppercase">
                Portfolio
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 bg-slate-800/80 p-1.5 rounded-xl border border-slate-700/60">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium tracking-wide transition-all duration-200 ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </div>

          {/* Action Buttons: Edit Mode & Resume */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Database Admin / Edit Button */}
            <button
              onClick={onOpenEditModal}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm"
              title="Edit all content stored in SQLite database"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-400" />
              <span>Edit Mode</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </button>

            {/* Resume button */}
            <a
              href={profile?.resume_url || '/sample-resume.pdf'}
              download
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span>Resume</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenEditModal}
              className="p-2 rounded-xl bg-slate-800 border border-slate-700 text-indigo-400 text-xs"
              title="Edit Mode"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 hover:text-white focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-2 p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl space-y-2 animate-in fade-in slide-in-from-top-4 duration-200">
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                    activeSection === link.href.substring(1)
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-800 flex gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenEditModal();
                }}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>Open Edit Mode</span>
              </button>
              <a
                href={profile?.resume_url || '/sample-resume.pdf'}
                download
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 text-white border border-slate-700"
              >
                <Download className="w-4 h-4 text-indigo-400" />
                <span>Resume</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
