import React, { useState, useEffect } from 'react';
import {
  Download,
  FolderGit2,
  Mail,
  MapPin,
  GraduationCap,
  Sparkles,
  ArrowRight,
  Code2,
  Building2,
} from 'lucide-react';
import { LinkedinIcon, GithubIcon, InstagramIcon } from './SocialIcons';

export default function HeroSection({ profile, onOpenEditModal }) {
  // Animated typing effect for different roles
  const roles = [
    'Engineering Student',
    'Full-Stack Developer',
    'Tech Enthusiast',
    'Competitive Programmer',
    'AI & ML Explorer',
  ];

  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullText = roles[currentRoleIndex];
    let timer;

    if (!isDeleting && currentText.length < fullText.length) {
      timer = setTimeout(() => {
        setCurrentText(fullText.substring(0, currentText.length + 1));
      }, 90);
    } else if (!isDeleting && currentText.length === fullText.length) {
      timer = setTimeout(() => setIsDeleting(true), 1800);
    } else if (isDeleting && currentText.length > 0) {
      timer = setTimeout(() => {
        setCurrentText(fullText.substring(0, currentText.length - 1));
      }, 50);
    } else if (isDeleting && currentText.length === 0) {
      setIsDeleting(false);
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentRoleIndex]);

  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8">
      {/* Central Large Translucent Glass Panel */}
      <div className="relative max-w-5xl w-full mx-auto rounded-3xl glass-panel p-6 sm:p-10 lg:p-14 border border-white/15 shadow-2xl backdrop-blur-2xl overflow-hidden group">
        {/* Decorative Internal Cosmic Light Flares */}
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-pink-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/15 backdrop-blur-md mb-6 hover:border-purple-400/40 transition-all duration-300">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-medium tracking-wider text-purple-200 uppercase">
              Engineering Student &bull; Developer Portfolio
            </span>
          </div>

          {/* Profile Picture Area with Circular Glowing Border */}
          <div className="relative mb-6">
            {/* Outer Orbital Rotating Ring */}
            <div className="absolute -inset-3.5 rounded-full border border-dashed border-purple-400/40 animate-spin-slow pointer-events-none" />
            <div className="absolute -inset-1.5 rounded-full bg-gradient-to-tr from-purple-600 via-pink-500 to-cyan-400 opacity-75 blur-sm animate-pulse-glow" />

            {/* Circular Glass Frame */}
            <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full p-1 bg-gradient-to-tr from-white/30 to-white/5 backdrop-blur-xl border-2 border-white/40 shadow-2xl overflow-hidden">
              <img
                src={
                  profile?.avatar_url ||
                  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80'
                }
                alt={profile?.name || 'Profile'}
                className="w-full h-full object-cover rounded-full transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  e.target.src =
                    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80';
                }}
              />
            </div>

            {/* Mini Orbital Floating Icon */}
            <div className="absolute bottom-0 right-0 p-2 rounded-full bg-[#0d1126] border border-cyan-400/60 shadow-lg text-cyan-400">
              <Code2 className="w-4 h-4" />
            </div>
          </div>

          {/* Name in Large Elegant Typography */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-3">
            <span className="text-gradient drop-shadow-sm">
              {profile?.name || 'Vishal M'}
            </span>
          </h1>

          {/* Animated Typing Effect Role Display */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-purple-200 font-semibold text-sm sm:text-base lg:text-lg mb-4 min-h-[44px]">
            <span className="text-cyan-400 font-mono">&gt;</span>
            <span className="text-gradient-purple">{currentText}</span>
            <span className="w-0.5 h-5 bg-cyan-400 animate-pulse ml-0.5" />
          </div>

          {/* Short Professional Introduction */}
          <p className="max-w-2xl text-sm sm:text-base text-gray-300 leading-relaxed mb-6 font-normal">
            {profile?.bio ||
              'Passionate Computer Science engineering student dedicated to building scalable web applications, solving complex algorithmic problems, and exploring modern cloud architectures with an eye for futuristic design.'}
          </p>

          {/* Academic Info Chips (College, Department, Location) */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 mb-8 max-w-3xl">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs sm:text-sm text-gray-300">
              <Building2 className="w-4 h-4 text-pink-400" />
              <span>{profile?.college || 'College of Engineering & Technology'}</span>
            </div>

            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs sm:text-sm text-gray-300">
              <GraduationCap className="w-4 h-4 text-cyan-400" />
              <span>{profile?.department || 'Computer Science and Engineering'}</span>
            </div>

            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs sm:text-sm text-gray-300">
              <MapPin className="w-4 h-4 text-purple-400" />
              <span>{profile?.location || 'Tamil Nadu, India'}</span>
            </div>
          </div>

          {/* Action Buttons: View My Projects & Download Resume */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            {/* View My Projects Button */}
            <a
              href="#projects"
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold text-sm shadow-xl shadow-purple-900/40 hover:shadow-purple-700/60 transition-all duration-300 hover:scale-105 active:scale-95 border border-white/20"
            >
              <FolderGit2 className="w-4 h-4 text-cyan-300" />
              <span>View My Projects</span>
              <ArrowRight className="w-4 h-4 text-cyan-300" />
            </a>

            {/* Download Resume Button */}
            <a
              href={profile?.resume_url || '/sample-resume.pdf'}
              download
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm border border-white/20 hover:border-cyan-400/50 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
            >
              <Download className="w-4 h-4 text-pink-400" />
              <span>Download Resume</span>
            </a>

            {/* Social Media Icons (LinkedIn, GitHub, Instagram, Email) */}
            <div className="flex items-center gap-2.5 mt-2 sm:mt-0">
              <a
                href={profile?.linkedin_url || 'https://linkedin.com'}
                target="_blank"
                rel="noreferrer"
                className="p-3.5 rounded-2xl bg-white/[0.06] hover:bg-white/[0.15] border border-white/15 hover:border-pink-500/50 text-white transition-all duration-200 hover:scale-110 active:scale-95 shadow-md"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="w-4 h-4 text-pink-400" />
              </a>

              <a
                href={profile?.github_url || 'https://github.com'}
                target="_blank"
                rel="noreferrer"
                className="p-3.5 rounded-2xl bg-white/[0.06] hover:bg-white/[0.15] border border-white/15 hover:border-cyan-500/50 text-white transition-all duration-200 hover:scale-110 active:scale-95 shadow-md"
                aria-label="GitHub Profile"
              >
                <GithubIcon className="w-4 h-4 text-cyan-400" />
              </a>

              <a
                href={profile?.instagram_url || 'https://instagram.com'}
                target="_blank"
                rel="noreferrer"
                className="p-3.5 rounded-2xl bg-white/[0.06] hover:bg-white/[0.15] border border-white/15 hover:border-pink-500/50 text-white transition-all duration-200 hover:scale-110 active:scale-95 shadow-md"
                aria-label="Instagram Profile"
              >
                <InstagramIcon className="w-4 h-4 text-pink-400" />
              </a>

              <a
                href={`mailto:${profile?.email || 'vishal.m.dev@example.com'}`}
                className="p-3.5 rounded-2xl bg-white/[0.06] hover:bg-white/[0.15] border border-white/15 hover:border-purple-500/50 text-white transition-all duration-200 hover:scale-110 active:scale-95 shadow-md"
                aria-label="Email Me"
              >
                <Mail className="w-4 h-4 text-purple-400" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
