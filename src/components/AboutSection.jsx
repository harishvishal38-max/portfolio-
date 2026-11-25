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
  ShieldCheck,
  Zap,
  Flame,
  CheckCircle2,
} from 'lucide-react';

export default function AboutSection({ about, profile }) {
  const strengthsList = [
    {
      title: 'Algorithmic Problem Solving',
      desc: 'Mastery in decomposing complex problem statements into efficient data structures with optimal time & space complexity.',
      icon: <Zap className="w-4 h-4 text-yellow-400" />,
    },
    {
      title: 'Full-Stack System Architecture',
      desc: 'Building responsive frontend interfaces paired with resilient, scalable relational database backends.',
      icon: <Layers className="w-4 h-4 text-cyan-400" />,
    },
    {
      title: 'Rapid Adaptability & Fast Learning',
      desc: 'Quickly absorbing modern frameworks, developer tooling, cloud systems, and AI integration workflows.',
      icon: <Flame className="w-4 h-4 text-pink-400" />,
    },
    {
      title: 'Cross-Functional Teamwork',
      desc: 'Effective communicator and collaborative team player experienced in hackathons and group engineering sprints.',
      icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" />,
    },
  ];

  return (
    <section id="about" className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
            <span>Profile & Aspirations</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            About <span className="text-gradient">Me</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-400 max-w-2xl mx-auto">
            A comprehensive look into my academic journey, core technical interests, and personal strengths as an engineering student.
          </p>
        </div>

        {/* Clean Two-Column Glassmorphism Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-8">
          {/* Column 1: Profile Image + Personal Intro (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Professional Profile Image Card */}
            <div className="glass-panel rounded-3xl p-6 border border-white/15 relative overflow-hidden group shadow-xl flex flex-col items-center text-center">
              <div className="relative w-44 h-44 rounded-2xl overflow-hidden border border-slate-700 p-1 bg-slate-900 shadow-xl mb-4 flex items-center justify-center">
                {profile?.avatar_url ? (
                  <img
                    src={profile.avatar_url}
                    alt="Professional Profile"
                    className="w-full h-full object-cover rounded-xl"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 py-6">
                    <User className="w-16 h-16 stroke-[1.5]" />
                    <span className="text-[11px] font-medium text-slate-400 mt-2">Empty Avatar</span>
                  </div>
                )}
              </div>
              <h3 className="text-xl font-bold text-white">Engineering Student</h3>
              <span className="text-xs text-purple-300 font-medium mt-0.5">Computer Science & Engineering</span>
              <p className="text-xs text-gray-400 mt-2">
                Focused on object-oriented programming, modern databases, and clean web architecture.
              </p>
            </div>

            {/* Personal Introduction Card */}
            <div className="glass-panel rounded-3xl p-6 sm:p-7 relative overflow-hidden group flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 rounded-2xl bg-purple-600/20 border border-purple-500/30 text-purple-300">
                  <User className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">Personal Introduction</h3>
              </div>

              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                {about?.intro ||
                  'I am an enthusiastic Computer Science and Engineering student with a deep interest in software engineering, backend systems, and responsive modern web technologies. I enjoy decomposing difficult challenges into performant code.'}
              </p>

              {/* Education Background Quick Metric */}
              <div className="grid grid-cols-3 gap-2.5 mt-5 pt-4 border-t border-white/10">
                <div className="text-center p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                  <span className="block text-base font-extrabold text-gradient">B.E.</span>
                  <span className="text-[10px] text-gray-400 uppercase">Degree</span>
                </div>
                <div className="text-center p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                  <span className="block text-base font-extrabold text-gradient-cyan">8.65</span>
                  <span className="text-[10px] text-gray-400 uppercase">CGPA</span>
                </div>
                <div className="text-center p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                  <span className="block text-base font-extrabold text-gradient-purple">2027</span>
                  <span className="text-[10px] text-gray-400 uppercase">Batch</span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Career & Technical Interests + Objective (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Career Objective Card */}
            <div className="glass-panel rounded-3xl p-6 sm:p-7 relative overflow-hidden group">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 rounded-2xl bg-pink-600/20 border border-pink-500/30 text-pink-300">
                  <Target className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">Career Objective</h3>
              </div>

              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                {about?.career_objective ||
                  'To launch my career as a Software Development Engineer at an innovative organization, contributing to scalable software systems while continuously learning and mastering cutting-edge technology stacks.'}
              </p>
            </div>

            {/* Career Interests Card */}
            <div className="glass-panel rounded-3xl p-6 sm:p-7 relative overflow-hidden group">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 rounded-2xl bg-cyan-600/20 border border-cyan-500/30 text-cyan-300">
                  <Compass className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">Career Interests</h3>
              </div>

              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-3">
                {about?.career_interests ||
                  'Full Stack Software Development, Distributed Backend Systems, Database Engineering, Cloud Technologies, and AI-powered Web Applications.'}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {[
                  'Full-Stack Web',
                  'Backend Systems',
                  'Cloud Architecture',
                  'Database Optimization',
                  'AI & Data Science',
                ].map((item, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-xl text-xs font-medium bg-cyan-500/10 text-cyan-300 border border-cyan-500/20"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Technical Interests Card */}
            <div className="glass-panel rounded-3xl p-6 sm:p-7 relative overflow-hidden group flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 rounded-2xl bg-purple-600/20 border border-purple-500/30 text-purple-300">
                  <Cpu className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">Technical Interests</h3>
              </div>

              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-3">
                {about?.technical_interests ||
                  'Object-Oriented Programming (Java, C, C++), Data Structures & Algorithms, Relational Database Modeling (MySQL), RESTful APIs, and Modern JavaScript Frameworks.'}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {[
                  'Python & Java',
                  'C / C++',
                  'MySQL & Firebase',
                  'React & Tailwind',
                  'Data Structures',
                ].map((item, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-xl text-xs font-medium bg-purple-500/10 text-purple-300 border border-purple-500/20"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Dedicated Personal Strengths Section (as requested) */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/15 relative overflow-hidden shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Personal Strengths</h3>
              <p className="text-xs text-gray-400">Key professional attributes that drive my engineering approach</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {strengthsList.map((st, i) => (
              <div
                key={i}
                className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-purple-400/30 transition-all hover:-translate-y-1"
              >
                <div className="p-2 rounded-xl bg-white/[0.05] w-fit mb-3 border border-white/10">
                  {st.icon}
                </div>
                <h4 className="font-bold text-white text-sm mb-1">{st.title}</h4>
                <p className="text-xs text-gray-300 leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
