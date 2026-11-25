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
  User,
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
    <section id="hero" className="relative min-h-[85vh] flex items-center justify-center pt-28 pb-12 px-4 sm:px-6 lg:px-8">
      {/* Clean Solid Modern Card Container */}
      <div className="relative max-w-5xl w-full mx-auto rounded-3xl bg-[#111827] p-8 sm:p-12 lg:p-16 border border-slate-800 shadow-2xl overflow-hidden group">
        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800/90 border border-slate-700 mb-6">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-medium tracking-wider text-slate-300 uppercase">
              Engineering Student &bull; Software Developer
            </span>
          </div>

          {/* Profile Picture Area with Clean Professional Ring */}
          <div className="relative mb-6">
            <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full p-1 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 shadow-xl overflow-hidden flex items-center justify-center">
              {profile?.avatar_url ? (
                <img
                  src={profile.avatar_url}
                  alt={profile?.name || 'Profile'}
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-slate-900 border border-slate-700/60 flex items-center justify-center text-slate-400">
                  <User className="w-14 h-14 sm:w-16 sm:h-16 stroke-[1.5]" />
                </div>
              )}
            </div>

            {/* Clean Code Badge */}
            <div className="absolute bottom-0 right-0 p-2 rounded-full bg-slate-900 border border-slate-700 shadow-md text-indigo-400">
              <Code2 className="w-4 h-4" />
            </div>
          </div>

          {/* Name in Large Clean Modern Typography */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-3">
            {profile?.name || 'Vishal M'}
          </h1>

          {/* Animated Typing Effect Role Display */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-slate-800/90 border border-slate-700 text-indigo-300 font-semibold text-sm sm:text-base lg:text-lg mb-4 min-h-[44px]">
            <span className="text-cyan-400 font-mono">&gt;</span>
            <span className="text-indigo-300">{currentText}</span>
            <span className="w-0.5 h-5 bg-indigo-400 animate-pulse ml-0.5" />
          </div>

          {/* Short Professional Introduction */}
          <p className="max-w-2xl text-sm sm:text-base text-slate-300 leading-relaxed mb-6 font-normal">
            {profile?.bio ||
              'Passionate Computer Science engineering student dedicated to building scalable web applications, solving complex algorithmic problems, and exploring modern cloud architectures.'}
          </p>

          {/* Academic Info Chips (College, Department, Location) */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 mb-8 max-w-3xl">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-xs sm:text-sm text-slate-300">
              <Building2 className="w-4 h-4 text-indigo-400" />
              <span>{profile?.college || 'College of Engineering & Technology'}</span>
            </div>

            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-xs sm:text-sm text-slate-300">
              <GraduationCap className="w-4 h-4 text-purple-400" />
              <span>{profile?.department || 'Computer Science and Engineering'}</span>
            </div>

            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-xs sm:text-sm text-slate-300">
              <MapPin className="w-4 h-4 text-pink-400" />
              <span>{profile?.location || 'Tamil Nadu, India'}</span>
            </div>
          </div>

          {/* Action Buttons: View My Projects & Download Resume */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            {/* View My Projects Button */}
            <a
              href="#projects"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 transition-all duration-200 hover:scale-[1.02] active:scale-98"
            >
              <FolderGit2 className="w-4 h-4" />
              <span>View My Projects</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            {/* Download Resume Button */}
            <a
              href={profile?.resume_url || '/sample-resume.pdf'}
              download
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm border border-slate-700 transition-all duration-200 hover:scale-[1.02] active:scale-98"
            >
              <Download className="w-4 h-4 text-indigo-400" />
              <span>Download Resume</span>
            </a>

            {/* Social Media Icons (LinkedIn, GitHub, Instagram, Email) */}
            <div className="flex items-center gap-2.5 mt-2 sm:mt-0">
              <a
                href={profile?.linkedin_url || 'https://linkedin.com'}
                target="_blank"
                rel="noreferrer"
                className="p-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white transition-all hover:scale-105 active:scale-95 shadow-sm"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="w-4 h-4 text-indigo-400" />
              </a>

              <a
                href={profile?.github_url || 'https://github.com'}
                target="_blank"
                rel="noreferrer"
                className="p-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white transition-all hover:scale-105 active:scale-95 shadow-sm"
                aria-label="GitHub Profile"
              >
                <GithubIcon className="w-4 h-4 text-cyan-400" />
              </a>

              <a
                href={profile?.instagram_url || 'https://instagram.com'}
                target="_blank"
                rel="noreferrer"
                className="p-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white transition-all hover:scale-105 active:scale-95 shadow-sm"
                aria-label="Instagram Profile"
              >
                <InstagramIcon className="w-4 h-4 text-pink-400" />
              </a>

              <a
                href={`mailto:${profile?.email || 'vishal.m.dev@example.com'}`}
                className="p-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white transition-all hover:scale-105 active:scale-95 shadow-sm"
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
