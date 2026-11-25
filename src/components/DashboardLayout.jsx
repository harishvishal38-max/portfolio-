import React, { useState } from 'react';
import {
  LayoutDashboard,
  User,
  GraduationCap,
  Cpu,
  Calendar,
  Award,
  FolderGit2,
  Mail,
  SlidersHorizontal,
  Download,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Sparkles,
  MapPin,
  Building2,
  CheckCircle2,
  Sun,
  Moon,
  Rocket,
  Search,
  Bell,
  Check,
  Tag,
  Eye,
  Plus,
  FileText,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon } from './SocialIcons';
import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import EducationSection from './EducationSection';
import SkillsSection from './SkillsSection';
import EventsSection from './EventsSection';
import CertificatesSection from './CertificatesSection';
import ProjectsSection from './ProjectsSection';
import ResumeSection from './ResumeSection';
import ContactSection from './ContactSection';

export default function DashboardLayout({
  data,
  onOpenEditModal,
  onPreviewCertificate,
  onRefresh,
}) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [themeMode, setThemeMode] = useState('space'); // 'space' (Dark Cosmic Glass) or 'opal' (Frosted Opal White Glass as in Image 2)
  const [skillChartFilter, setSkillChartFilter] = useState('All');

  const {
    profile = {},
    about = {},
    education = [],
    skills = [],
    events = [],
    certificates = [],
    achievements = [],
    projects = [],
  } = data || {};

  const isOpal = themeMode === 'opal';

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'about', label: 'About Me', icon: <User className="w-4 h-4" /> },
    { id: 'education', label: 'Education', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'skills', label: 'Skills & Tech', icon: <Cpu className="w-4 h-4" /> },
    { id: 'projects', label: 'Projects', icon: <FolderGit2 className="w-4 h-4" /> },
    { id: 'events', label: 'Events', icon: <Calendar className="w-4 h-4" /> },
    { id: 'certificates', label: 'Certificates', icon: <Award className="w-4 h-4" /> },
    { id: 'resume', label: 'Resume', icon: <FileText className="w-4 h-4" /> },
    { id: 'contact', label: 'Contact', icon: <Mail className="w-4 h-4" /> },
  ];

  // Calculate average skill proficiency
  const avgProficiency =
    skills.length > 0
      ? Math.round(
          skills.reduce((acc, curr) => acc + (Number(curr.proficiency) || 75), 0) /
            skills.length
        )
      : 88;

  // Filter skills for bar chart
  const filteredSkillsForChart =
    skillChartFilter === 'All'
      ? skills.slice(0, 7)
      : skills.filter((s) => s.category.toLowerCase().includes(skillChartFilter.toLowerCase()));

  return (
    <div className="relative min-h-screen py-6 px-3 sm:px-6 lg:px-8 flex items-center justify-center">
      {/* MASTER GLASS CONTAINER (Inspired by Reference Image 2) */}
      <div
        className={`relative w-full max-w-7xl rounded-[32px] sm:rounded-[38px] transition-all duration-500 overflow-hidden shadow-2xl ${
          isOpal
            ? 'bg-white/80 text-slate-800 border border-white/80 shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur-2xl'
            : 'bg-[#0d1126]/70 text-white border border-white/15 shadow-[0_25px_70px_rgba(0,0,0,0.6)] backdrop-blur-2xl'
        }`}
      >
        {/* Subtle internal gradient glows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row min-h-[850px] relative z-10">
          {/* ================= LEFT SIDEBAR ================= */}
          <aside
            className={`w-full lg:w-64 p-5 flex flex-col justify-between shrink-0 border-b lg:border-b-0 lg:border-r transition-colors ${
              isOpal ? 'border-slate-200/60 bg-white/40' : 'border-white/10 bg-black/20'
            }`}
          >
            <div>
              {/* Brand Header */}
              <div className="flex items-center gap-3 px-2 py-3 mb-6">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 via-pink-500 to-cyan-400 p-[1.5px] shadow-lg">
                  <div
                    className={`w-full h-full rounded-[14px] flex items-center justify-center ${
                      isOpal ? 'bg-white' : 'bg-[#070919]'
                    }`}
                  >
                    <Rocket className="w-5 h-5 text-purple-500" />
                  </div>
                </div>
                <div>
                  <h1 className="font-extrabold text-base tracking-wide bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
                    {profile.name || 'Vishal M'}
                  </h1>
                  <span
                    className={`text-[10px] uppercase font-mono tracking-widest block -mt-0.5 ${
                      isOpal ? 'text-slate-500' : 'text-cyan-400/80'
                    }`}
                  >
                    Student Portfolio
                  </span>
                </div>
              </div>

              {/* Navigation Menu */}
              <div className="space-y-6">
                <div>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-3 block mb-2 ${
                      isOpal ? 'text-slate-400' : 'text-gray-400'
                    }`}
                  >
                    Main Menu
                  </span>
                  <nav className="space-y-1">
                    {navItems.map((item) => {
                      const isActive = activeTab === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => setActiveTab(item.id)}
                          className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all duration-200 ${
                            isActive
                              ? isOpal
                                ? 'bg-purple-600 text-white shadow-md shadow-purple-500/25 font-bold scale-[1.02]'
                                : 'bg-gradient-to-r from-purple-600/40 to-pink-600/30 text-white border border-purple-400/40 shadow-md font-bold scale-[1.02]'
                              : isOpal
                              ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
                              : 'text-gray-300 hover:text-white hover:bg-white/[0.06]'
                          }`}
                        >
                          <span
                            className={
                              isActive
                                ? 'text-white'
                                : isOpal
                                ? 'text-purple-600'
                                : 'text-cyan-400'
                            }
                          >
                            {item.icon}
                          </span>
                          <span>{item.label}</span>
                        </button>
                      );
                    })}
                  </nav>
                </div>

                {/* Management / Quick Actions */}
                <div>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-3 block mb-2 ${
                      isOpal ? 'text-slate-400' : 'text-gray-400'
                    }`}
                  >
                    Actions
                  </span>
                  <div className="space-y-1.5">
                    {/* Database Edit Button */}
                    <button
                      onClick={onOpenEditModal}
                      className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-semibold bg-gradient-to-r from-purple-600/20 via-pink-500/20 to-cyan-500/20 hover:from-purple-600/35 hover:to-pink-600/35 border border-purple-400/30 transition-all text-purple-300 hover:text-white"
                    >
                      <div className="flex items-center gap-2.5">
                        <SlidersHorizontal className="w-4 h-4 text-pink-400" />
                        <span>Edit Mode</span>
                      </div>
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                    </button>

                    {/* Resume Download */}
                    <a
                      href={profile.resume_url || '/sample-resume.pdf'}
                      download
                      target="_blank"
                      rel="noreferrer"
                      className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl text-xs font-semibold border transition-all ${
                        isOpal
                          ? 'border-slate-200 hover:bg-slate-100 text-slate-700'
                          : 'border-white/10 hover:bg-white/[0.08] text-gray-200'
                      }`}
                    >
                      <Download className="w-4 h-4 text-cyan-400" />
                      <span>Resume</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Theme Switcher & Mini Profile */}
            <div className="pt-6 mt-6 border-t border-white/10 space-y-3">
              {/* Theme Toggle Pill (Cosmic Dark vs Frosted Opal White) */}
              <div
                className={`p-1 rounded-2xl flex items-center justify-between text-[11px] font-medium border ${
                  isOpal ? 'bg-slate-100/80 border-slate-200' : 'bg-black/40 border-white/10'
                }`}
              >
                <button
                  onClick={() => setThemeMode('space')}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-xl transition-all ${
                    !isOpal
                      ? 'bg-purple-600 text-white font-bold shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <Moon className="w-3.5 h-3.5" />
                  <span>Space Dark</span>
                </button>
                <button
                  onClick={() => setThemeMode('opal')}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-xl transition-all ${
                    isOpal
                      ? 'bg-white text-purple-700 font-bold shadow-sm'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Sun className="w-3.5 h-3.5" />
                  <span>Frosted Opal</span>
                </button>
              </div>

              {/* Social icons row */}
              <div className="flex items-center justify-around py-1">
                <a
                  href={profile.github_url || 'https://github.com'}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-xl hover:scale-110 transition-transform text-cyan-400 hover:text-cyan-300"
                  aria-label="GitHub"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
                <a
                  href={profile.linkedin_url || 'https://linkedin.com'}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-xl hover:scale-110 transition-transform text-pink-400 hover:text-pink-300"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
                <a
                  href={profile.instagram_url || 'https://instagram.com'}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-xl hover:scale-110 transition-transform text-pink-400 hover:text-pink-300"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
                <a
                  href={`mailto:${profile.email || 'vishal.m.dev@example.com'}`}
                  className="p-2 rounded-xl hover:scale-110 transition-transform text-purple-400 hover:text-purple-300"
                  aria-label="Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>
          </aside>

          {/* ================= MAIN CONTENT AREA ================= */}
          <main className="flex-1 p-5 sm:p-8 flex flex-col justify-between overflow-y-auto">
            {/* TOP BAR */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <h2
                  className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
                    isOpal ? 'text-slate-900' : 'text-white'
                  }`}
                >
                  {activeTab === 'dashboard'
                    ? 'Portfolio Dashboard'
                    : navItems.find((n) => n.id === activeTab)?.label}
                </h2>
                <p className={`text-xs sm:text-sm mt-0.5 ${isOpal ? 'text-slate-500' : 'text-gray-400'}`}>
                  {profile.title || 'Engineering Student | Aspiring Software Developer'}
                </p>
              </div>

              {/* Profile Pill (Top Right, matching Carla Sanford pill in reference image) */}
              <div
                className={`flex items-center gap-3 p-1.5 pr-4 rounded-full border transition-all ${
                  isOpal
                    ? 'bg-white/80 border-slate-200/80 shadow-sm'
                    : 'bg-white/[0.05] border-white/10'
                }`}
              >
                <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-purple-500/50 shadow-md">
                  <img
                    src={
                      profile.avatar_url ||
                      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80'
                    }
                    alt={profile.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-left">
                  <span
                    className={`block text-xs font-bold leading-tight ${
                      isOpal ? 'text-slate-800' : 'text-white'
                    }`}
                  >
                    {profile.name || 'Vishal M'}
                  </span>
                  <span className="text-[10px] text-emerald-400 font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
                    Available
                  </span>
                </div>
              </div>
            </div>

            {/* TAB CONTENT SWITCHER */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6 animate-in fade-in duration-300">
                {/* 1. TOP METRIC STAT CARDS ROW (Exact 4 Cards like Reference Image 2) */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Metric 1 */}
                  <div
                    className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                      isOpal
                        ? 'bg-white/60 border-slate-200/60 shadow-sm'
                        : 'bg-white/[0.03] border-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
                        <GraduationCap className="w-4 h-4" />
                      </div>
                      <span className={`text-xs font-medium ${isOpal ? 'text-slate-500' : 'text-gray-400'}`}>
                        CGPA Score
                      </span>
                    </div>
                    <div className="flex items-baseline justify-between">
                      <span
                        className={`text-xl sm:text-2xl font-black ${
                          isOpal ? 'text-slate-800' : 'text-white'
                        }`}
                      >
                        8.65
                      </span>
                      <span className="text-[11px] font-semibold text-emerald-400 font-mono">
                        Class Distinction
                      </span>
                    </div>
                  </div>

                  {/* Metric 2 */}
                  <div
                    className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                      isOpal
                        ? 'bg-white/60 border-slate-200/60 shadow-sm'
                        : 'bg-white/[0.03] border-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-xl bg-pink-500/10 text-pink-400">
                        <Cpu className="w-4 h-4" />
                      </div>
                      <span className={`text-xs font-medium ${isOpal ? 'text-slate-500' : 'text-gray-400'}`}>
                        Tech Skills
                      </span>
                    </div>
                    <div className="flex items-baseline justify-between">
                      <span
                        className={`text-xl sm:text-2xl font-black ${
                          isOpal ? 'text-slate-800' : 'text-white'
                        }`}
                      >
                        {skills.length || 13}
                      </span>
                      <span className="text-[11px] font-semibold text-purple-400 font-mono">
                        Core Stacks
                      </span>
                    </div>
                  </div>

                  {/* Metric 3 */}
                  <div
                    className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                      isOpal
                        ? 'bg-white/60 border-slate-200/60 shadow-sm'
                        : 'bg-white/[0.03] border-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <span className={`text-xs font-medium ${isOpal ? 'text-slate-500' : 'text-gray-400'}`}>
                        Events & Honors
                      </span>
                    </div>
                    <div className="flex items-baseline justify-between">
                      <span
                        className={`text-xl sm:text-2xl font-black ${
                          isOpal ? 'text-slate-800' : 'text-white'
                        }`}
                      >
                        {events.length + achievements.length || 8}
                      </span>
                      <span className="text-[11px] font-semibold text-cyan-400 font-mono">
                        Hackathons & Sprints
                      </span>
                    </div>
                  </div>

                  {/* Metric 4 */}
                  <div
                    className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                      isOpal
                        ? 'bg-white/60 border-slate-200/60 shadow-sm'
                        : 'bg-white/[0.03] border-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
                        <FolderGit2 className="w-4 h-4" />
                      </div>
                      <span className={`text-xs font-medium ${isOpal ? 'text-slate-500' : 'text-gray-400'}`}>
                        Projects Built
                      </span>
                    </div>
                    <div className="flex items-baseline justify-between">
                      <span
                        className={`text-xl sm:text-2xl font-black ${
                          isOpal ? 'text-slate-800' : 'text-white'
                        }`}
                      >
                        {projects.length || 3}
                      </span>
                      <span className="text-[11px] font-semibold text-amber-400 font-mono">
                        Full-Stack Live
                      </span>
                    </div>
                  </div>
                </div>

                {/* 2. MIDDLE ROW (Matching Image 2: Skill KPI Chart Card on Left, Contrast Card on Right) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                  {/* Left Main Card: Skill Proficiency Bar Chart + Focus Areas (7 Cols) */}
                  <div
                    className={`lg:col-span-7 p-6 rounded-3xl border transition-all flex flex-col justify-between ${
                      isOpal
                        ? 'bg-white/60 border-slate-200/60 shadow-sm'
                        : 'bg-white/[0.03] border-white/10'
                    }`}
                  >
                    {/* Header */}
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                      <div>
                        <span className={`text-xs font-medium block ${isOpal ? 'text-slate-500' : 'text-gray-400'}`}>
                          Technical Competency Index
                        </span>
                        <div className="flex items-baseline gap-2 mt-1">
                          <span
                            className={`text-3xl font-extrabold ${
                              isOpal ? 'text-slate-900' : 'text-white'
                            }`}
                          >
                            {avgProficiency}%
                          </span>
                          <span className="text-xs font-semibold text-emerald-400 flex items-center gap-0.5">
                            <TrendingUp className="w-3.5 h-3.5" /> High Proficiency
                          </span>
                        </div>
                      </div>

                      {/* Filter pill */}
                      <div className="flex gap-1 bg-black/10 p-1 rounded-xl text-[11px]">
                        {['All', 'Languages', 'Web', 'Database'].map((f) => (
                          <button
                            key={f}
                            onClick={() => setSkillChartFilter(f)}
                            className={`px-2.5 py-1 rounded-lg transition-all ${
                              skillChartFilter === f
                                ? isOpal
                                  ? 'bg-white text-purple-700 shadow-sm font-bold'
                                  : 'bg-purple-600 text-white font-bold'
                                : 'text-gray-400 hover:text-white'
                            }`}
                          >
                            {f}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Split View: Vertical Bar Chart + Core Focus Areas (like Reference Image 2) */}
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-end pt-4">
                      {/* Interactive Vertical Bar Chart (7 Cols) */}
                      <div className="sm:col-span-7 flex items-end justify-between gap-2 h-48 pt-4 border-b border-dashed border-white/10 pb-2">
                        {filteredSkillsForChart.map((s, idx) => (
                          <div
                            key={s.id || idx}
                            className="flex-1 flex flex-col items-center gap-2 h-full justify-end group"
                          >
                            <span className="text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity text-cyan-300">
                              {s.proficiency}%
                            </span>
                            <div className="w-full bg-black/20 rounded-t-lg h-full max-h-36 flex items-end overflow-hidden p-0.5">
                              <div
                                className="w-full rounded-t-md bg-gradient-to-t from-purple-600 via-pink-500 to-cyan-400 group-hover:brightness-125 transition-all duration-700"
                                style={{ height: `${s.proficiency}%` }}
                              />
                            </div>
                            <span
                              className={`text-[10px] font-semibold truncate max-w-[45px] text-center ${
                                isOpal ? 'text-slate-600' : 'text-gray-300'
                              }`}
                              title={s.name}
                            >
                              {s.name}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Core Focus List (5 Cols, matching "Top Performance" in Image 2) */}
                      <div className="sm:col-span-5 space-y-3">
                        <span
                          className={`text-xs font-bold uppercase tracking-wider block ${
                            isOpal ? 'text-slate-600' : 'text-purple-300'
                          }`}
                        >
                          Core Pillars
                        </span>
                        {[
                          { title: 'Software Eng (Java)', desc: 'OOP, Collections, APIs' },
                          { title: 'Database (MySQL)', desc: 'Normalization & Queries' },
                          { title: 'Full-Stack Web', desc: 'React, Tailwind, Node.js' },
                          { title: 'Algorithms & C', desc: 'Structures & Complexity' },
                        ].map((pillar, i) => (
                          <div
                            key={i}
                            className={`p-2.5 rounded-xl border text-xs ${
                              isOpal
                                ? 'bg-white/80 border-slate-200'
                                : 'bg-white/[0.02] border-white/5'
                            }`}
                          >
                            <span
                              className={`font-bold block ${
                                isOpal ? 'text-slate-800' : 'text-white'
                              }`}
                            >
                              {pillar.title}
                            </span>
                            <span className="text-[11px] text-gray-400 block mt-0.5">
                              {pillar.desc}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column (5 Cols, matching Dark Contrast Card & Working Format in Image 2) */}
                  <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
                    {/* Contrast Dark Glass Card (matching "Upcoming Meeting" card in Image 2) */}
                    <div className="p-6 rounded-3xl bg-[#090d22]/90 border border-purple-500/30 text-white shadow-xl relative overflow-hidden flex-1">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-full blur-xl pointer-events-none" />

                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-pink-500" />
                          <h3 className="font-bold text-sm tracking-wide text-white">
                            Events & Hackathons
                          </h3>
                        </div>
                        <button
                          onClick={() => setActiveTab('events')}
                          className="text-[11px] text-cyan-400 hover:underline flex items-center gap-0.5"
                        >
                          <span>View All</span>
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Events Mini List */}
                      <div className="space-y-3">
                        {events.slice(0, 3).map((ev, i) => (
                          <div
                            key={ev.id || i}
                            className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-pink-500/40 transition-colors"
                          >
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-bold text-white truncate max-w-[190px]">
                                {ev.title}
                              </span>
                              <span className="text-[10px] font-mono text-cyan-300">
                                {ev.event_date}
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-[11px] text-gray-400 mt-1">
                              <span>{ev.organization}</span>
                              <span className="px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-300 text-[10px] uppercase">
                                {ev.event_type}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Domain Distribution Card (matching "Working Format" in Image 2) */}
                    <div
                      className={`p-5 rounded-3xl border ${
                        isOpal
                          ? 'bg-white/60 border-slate-200/60 shadow-sm'
                          : 'bg-white/[0.03] border-white/10'
                      }`}
                    >
                      <h4
                        className={`text-xs font-bold uppercase tracking-wider mb-3 ${
                          isOpal ? 'text-slate-600' : 'text-gray-300'
                        }`}
                      >
                        Domain Proficiency
                      </h4>
                      <div className="space-y-2.5">
                        {[
                          { label: 'Backend & Systems (Java, Node)', val: '88%' },
                          { label: 'Web Technologies (HTML, CSS, JS)', val: '92%' },
                          { label: 'Database Engineering (MySQL)', val: '86%' },
                        ].map((domain, idx) => (
                          <div key={idx} className="flex items-center justify-between text-xs">
                            <span className={isOpal ? 'text-slate-600' : 'text-gray-300'}>
                              {domain.label}
                            </span>
                            <span className="font-bold font-mono text-purple-400">
                              {domain.val}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. BOTTOM ROW: FEATURED PROJECTS TABLE (Matching "Employees" table in Image 2!) */}
                <div
                  className={`p-6 rounded-3xl border transition-all ${
                    isOpal
                      ? 'bg-white/60 border-slate-200/60 shadow-sm'
                      : 'bg-white/[0.03] border-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3
                        className={`font-bold text-base ${
                          isOpal ? 'text-slate-900' : 'text-white'
                        }`}
                      >
                        Featured Projects Showcase
                      </h3>
                      <p className={`text-xs ${isOpal ? 'text-slate-500' : 'text-gray-400'}`}>
                        Core software engineering builds and deployed applications
                      </p>
                    </div>

                    <button
                      onClick={() => setActiveTab('projects')}
                      className="text-xs font-semibold text-cyan-400 hover:underline flex items-center gap-1"
                    >
                      <span>Explore All Projects</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Glass Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr
                          className={`border-b ${
                            isOpal
                              ? 'border-slate-200/80 text-slate-400'
                              : 'border-white/10 text-gray-400'
                          }`}
                        >
                          <th className="pb-3 font-semibold">PROJECT NAME</th>
                          <th className="pb-3 font-semibold">DOMAIN / STACK</th>
                          <th className="pb-3 font-semibold">STATUS</th>
                          <th className="pb-3 font-semibold text-right">LINKS</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {projects.map((proj, idx) => (
                          <tr
                            key={proj.id || idx}
                            className={`group transition-colors ${
                              isOpal ? 'hover:bg-slate-100/50' : 'hover:bg-white/[0.03]'
                            }`}
                          >
                            <td className="py-3.5 pr-4">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-xl overflow-hidden bg-space-navy shrink-0">
                                  <img
                                    src={proj.image_url}
                                    alt={proj.name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <span
                                  className={`font-bold text-sm ${
                                    isOpal ? 'text-slate-800' : 'text-white'
                                  }`}
                                >
                                  {proj.name}
                                </span>
                              </div>
                            </td>

                            <td className="py-3.5 pr-4">
                              <div className="flex flex-wrap gap-1">
                                {proj.technologies
                                  ?.split(',')
                                  .slice(0, 3)
                                  .map((t, i) => (
                                    <span
                                      key={i}
                                      className={`px-2 py-0.5 rounded-md text-[10px] font-medium border ${
                                        isOpal
                                          ? 'bg-slate-100 text-slate-700 border-slate-200'
                                          : 'bg-white/[0.05] text-cyan-300 border-white/10'
                                      }`}
                                    >
                                      {t.trim()}
                                    </span>
                                  ))}
                              </div>
                            </td>

                            <td className="py-3.5 pr-4">
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                Production Ready
                              </span>
                            </td>

                            <td className="py-3.5 text-right">
                              <div className="inline-flex items-center gap-2">
                                <a
                                  href={proj.github_url || 'https://github.com'}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="p-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-cyan-400 transition-colors"
                                  title="View Source Code"
                                >
                                  <GithubIcon className="w-3.5 h-3.5" />
                                </a>
                                <a
                                  href={proj.live_demo_url || '#'}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="p-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white transition-colors"
                                  title="Live Demo"
                                >
                                  <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* DEDICATED SECTIONS WHEN CLICKED IN SIDEBAR */}
            {activeTab === 'about' && (
              <div className="animate-in fade-in duration-300">
                <AboutSection about={about} />
              </div>
            )}

            {activeTab === 'education' && (
              <div className="animate-in fade-in duration-300">
                <EducationSection education={education} />
              </div>
            )}

            {activeTab === 'skills' && (
              <div className="animate-in fade-in duration-300">
                <SkillsSection skills={skills} />
              </div>
            )}

            {activeTab === 'events' && (
              <div className="animate-in fade-in duration-300">
                <EventsSection
                  events={events}
                  onOpenAddEvent={onOpenEditModal}
                  onPreviewCertificate={onPreviewCertificate}
                />
              </div>
            )}

            {activeTab === 'certificates' && (
              <div className="animate-in fade-in duration-300">
                <CertificatesSection
                  certificates={certificates}
                  achievements={achievements}
                  onPreviewCertificate={onPreviewCertificate}
                />
              </div>
            )}

            {activeTab === 'projects' && (
              <div className="animate-in fade-in duration-300">
                <ProjectsSection
                  projects={projects}
                  onOpenAddProject={() => onOpenEditModal('projects')}
                />
              </div>
            )}

            {activeTab === 'resume' && (
              <div className="animate-in fade-in duration-300">
                <ResumeSection
                  profile={profile}
                  onPreviewCertificate={onPreviewCertificate}
                  onRefresh={onRefresh}
                />
              </div>
            )}

            {activeTab === 'contact' && (
              <div className="animate-in fade-in duration-300">
                <ContactSection profile={profile} />
              </div>
            )}

            {/* Bottom Credits & Database Sync Status */}
            <div
              className={`mt-8 pt-4 border-t flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] ${
                isOpal ? 'border-slate-200/80 text-slate-500' : 'border-white/10 text-gray-400'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span>SQLite Database Live Synchronized</span>
              </div>
              <div>
                <span>&copy; {new Date().getFullYear()} {profile.name || 'Vishal M'}. All rights reserved.</span>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
