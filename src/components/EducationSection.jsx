import React from 'react';
import {
  GraduationCap,
  Calendar,
  Award,
  BookOpen,
  Sparkles,
  School,
  Building,
} from 'lucide-react';

export default function EducationSection({ education }) {
  const getLevelBadge = (level) => {
    switch (level) {
      case 'college':
        return {
          label: 'Higher Education / B.E.',
          color: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
          icon: <GraduationCap className="w-4 h-4 text-purple-400" />,
        };
      case 'hsc':
        return {
          label: 'Higher Secondary Education (HSC)',
          color: 'bg-pink-500/20 text-pink-300 border-pink-500/30',
          icon: <School className="w-4 h-4 text-pink-400" />,
        };
      case 'sslc':
        return {
          label: 'Secondary Education (SSLC)',
          color: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
          icon: <BookOpen className="w-4 h-4 text-cyan-400" />,
        };
      default:
        return {
          label: 'Academic Milestone',
          color: 'bg-white/10 text-white border-white/20',
          icon: <Award className="w-4 h-4 text-yellow-400" />,
        };
    }
  };

  return (
    <section id="education" className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Academic Milestones</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Education <span className="text-gradient">Timeline</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-400 max-w-xl mx-auto">
            My structured educational qualifications, academic honors, and foundational coursework.
          </p>
        </div>

        {/* Vertical Timeline Container */}
        <div className="relative">
          {/* Glowing Vertical Line */}
          <div className="absolute left-4 sm:left-1/2 top-4 bottom-4 -translate-x-1/2 w-[3px] bg-gradient-to-b from-purple-500 via-pink-500 to-cyan-400 rounded-full shadow-[0_0_15px_rgba(139,92,246,0.6)]" />

          {/* Timeline Items */}
          <div className="space-y-12">
            {education?.map((item, idx) => {
              const badge = getLevelBadge(item.level);
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={item.id || idx}
                  className={`relative flex flex-col sm:flex-row items-center ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Node Orb */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 z-20 flex items-center justify-center w-8 h-8 rounded-full bg-[#0d1126] border-2 border-white/60 shadow-[0_0_15px_rgba(236,72,153,0.8)]">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-tr from-pink-500 to-cyan-400 animate-ping opacity-75" />
                    <div className="absolute w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  </div>

                  {/* Glass Card content */}
                  <div className="w-full sm:w-[45%] pl-12 sm:pl-0">
                    <div className="glass-card rounded-3xl p-6 sm:p-7 relative group hover:border-purple-400/40 transition-all duration-300">
                      {/* Atmospheric hover glow inside card */}
                      <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-600/10 rounded-full blur-xl group-hover:bg-purple-600/20 transition-all pointer-events-none" />

                      {/* Level Chip & Year */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold border ${badge.color}`}
                        >
                          {badge.icon}
                          <span>{badge.label}</span>
                        </span>

                        <div className="flex items-center gap-1.5 text-xs font-medium text-gray-400 bg-white/[0.04] px-2.5 py-1 rounded-lg border border-white/5">
                          <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                          <span>{item.academic_year}</span>
                        </div>
                      </div>

                      {/* Institution / College Name */}
                      <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-purple-200 transition-colors">
                        {item.institution}
                      </h3>

                      {/* Degree / Course & Department */}
                      <div className="mt-1">
                        <p className="text-sm font-semibold text-cyan-300">{item.degree}</p>
                        {item.department && (
                          <p className="text-xs text-gray-400 mt-0.5">{item.department}</p>
                        )}
                      </div>

                      {/* CGPA / Percentage Highlight */}
                      <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-transparent border border-purple-500/30">
                        <Award className="w-4 h-4 text-pink-400" />
                        <span className="text-xs text-gray-300 font-medium">Score / Performance:</span>
                        <span className="text-sm font-bold text-white tracking-wide">
                          {item.cgpa}
                        </span>
                      </div>

                      {/* Curriculum / Details */}
                      {item.details && (
                        <p className="mt-4 text-xs sm:text-sm text-gray-300 leading-relaxed border-t border-white/5 pt-3">
                          {item.details}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
