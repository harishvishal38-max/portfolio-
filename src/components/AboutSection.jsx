import React from 'react';
import {
  User,
  Compass,
  Cpu,
  Sparkles,
  Target,
  BookOpen,
  Layers,
  GraduationCap,
  Code,
} from 'lucide-react';

export default function AboutSection({ about }) {
  return (
    <section id="about" className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
            <span>Personal Profile</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            About <span className="text-gradient">Me</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-400 max-w-2xl mx-auto">
            A glimpse into my educational focus, technical passions, and overarching career aspirations.
          </p>
        </div>

        {/* Clean Two-Column Glassmorphism Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Column 1: Personal Introduction & Career Objective */}
          <div className="flex flex-col gap-6">
            {/* Personal Introduction Card */}
            <div className="glass-panel rounded-3xl p-6 sm:p-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-40 h-40 bg-purple-600/10 rounded-full blur-2xl group-hover:bg-purple-600/20 transition-all duration-500 pointer-events-none" />

              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-2xl bg-purple-600/20 border border-purple-500/30 text-purple-300">
                  <User className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-white">Personal Introduction</h3>
              </div>

              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                {about?.intro ||
                  'I am an enthusiastic Computer Science and Engineering student with a deep interest in software engineering, backend systems, and responsive modern web technologies. I enjoy decomposing difficult challenges into performant code.'}
              </p>

              {/* Quick Highlight Metrics */}
              <div className="grid grid-cols-3 gap-3 mt-6 pt-6 border-t border-white/10">
                <div className="text-center p-3 rounded-2xl bg-white/[0.03] border border-white/5">
                  <span className="block text-xl font-extrabold text-gradient">2027</span>
                  <span className="text-[11px] text-gray-400 uppercase tracking-wider">Graduation</span>
                </div>
                <div className="text-center p-3 rounded-2xl bg-white/[0.03] border border-white/5">
                  <span className="block text-xl font-extrabold text-gradient-cyan">8.65</span>
                  <span className="text-[11px] text-gray-400 uppercase tracking-wider">CGPA</span>
                </div>
                <div className="text-center p-3 rounded-2xl bg-white/[0.03] border border-white/5">
                  <span className="block text-xl font-extrabold text-gradient-purple">CSE</span>
                  <span className="text-[11px] text-gray-400 uppercase tracking-wider">Major</span>
                </div>
              </div>
            </div>

            {/* Career Objective Card */}
            <div className="glass-panel rounded-3xl p-6 sm:p-8 relative overflow-hidden group flex-1">
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-pink-600/10 rounded-full blur-2xl group-hover:bg-pink-600/20 transition-all duration-500 pointer-events-none" />

              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-2xl bg-pink-600/20 border border-pink-500/30 text-pink-300">
                  <Target className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-white">Career Objective</h3>
              </div>

              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                {about?.career_objective ||
                  'To launch my career as a Software Development Engineer at an innovative organization, contributing to scalable software systems while continuously learning and mastering cutting-edge technology stacks.'}
              </p>
            </div>
          </div>

          {/* Column 2: Interests & Skills Summary */}
          <div className="flex flex-col gap-6">
            {/* Career Interests Card */}
            <div className="glass-panel rounded-3xl p-6 sm:p-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-600/10 rounded-full blur-2xl group-hover:bg-cyan-600/20 transition-all duration-500 pointer-events-none" />

              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-2xl bg-cyan-600/20 border border-cyan-500/30 text-cyan-300">
                  <Compass className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-white">Career Interests</h3>
              </div>

              <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-4">
                {about?.career_interests ||
                  'Full Stack Software Development, Distributed Backend Systems, Database Engineering, Cloud Technologies, and AI-powered Web Applications.'}
              </p>

              <div className="flex flex-wrap gap-2">
                {[
                  'Full-Stack Development',
                  'Backend Engineering',
                  'Cloud Architecture',
                  'Distributed Systems',
                  'System Design',
                ].map((item, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-xl text-xs font-medium bg-cyan-500/10 text-cyan-300 border border-cyan-500/20"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Technical Interests Card */}
            <div className="glass-panel rounded-3xl p-6 sm:p-8 relative overflow-hidden group">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-2xl bg-purple-600/20 border border-purple-500/30 text-purple-300">
                  <Cpu className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-white">Technical Interests</h3>
              </div>

              <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-4">
                {about?.technical_interests ||
                  'Object-Oriented Programming (Java, C), Data Structures & Algorithms, Relational Database Modeling (MySQL), RESTful APIs, and Modern JavaScript Frameworks.'}
              </p>

              <div className="flex flex-wrap gap-2">
                {['OOP Principles', 'Data Structures', 'MySQL Optimization', 'RESTful APIs', 'Modern React'].map(
                  (item, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-xl text-xs font-medium bg-purple-500/10 text-purple-300 border border-purple-500/20"
                    >
                      {item}
                    </span>
                  )
                )}
              </div>
            </div>

            {/* Skills & Areas of Learning */}
            <div className="glass-panel rounded-3xl p-6 sm:p-8 relative overflow-hidden group flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-2xl bg-pink-600/20 border border-pink-500/30 text-pink-300">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-white">Skills & Areas of Learning</h3>
              </div>

              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                {about?.skills_summary ||
                  'Solid expertise across Java, Python, C, MySQL, HTML5, CSS3, JavaScript, VS Code, and collaborative Git/GitHub workflows.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
