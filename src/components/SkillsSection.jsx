import React, { useState } from 'react';
import {
  Code2,
  Database,
  Globe,
  Palette,
  FileCode2,
  Terminal,
  Cpu,
  Laptop,
  GitBranch,
  Cloud,
  Lightbulb,
  Users,
  MessageSquare,
  Sparkles,
  Layers,
} from 'lucide-react';

export default function SkillsSection({ skills }) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Map icon strings to Lucide components
  const getSkillIcon = (iconName) => {
    const props = { className: 'w-5 h-5 text-cyan-400' };
    switch (iconName) {
      case 'Code2':
        return <Code2 {...props} />;
      case 'Terminal':
        return <Terminal {...props} className="w-5 h-5 text-pink-400" />;
      case 'Cpu':
        return <Cpu {...props} className="w-5 h-5 text-purple-400" />;
      case 'Database':
        return <Database {...props} className="w-5 h-5 text-blue-400" />;
      case 'Globe':
        return <Globe {...props} className="w-5 h-5 text-emerald-400" />;
      case 'Palette':
        return <Palette {...props} className="w-5 h-5 text-pink-400" />;
      case 'FileCode2':
        return <FileCode2 {...props} className="w-5 h-5 text-yellow-400" />;
      case 'Laptop':
        return <Laptop {...props} className="w-5 h-5 text-purple-300" />;
      case 'GitBranch':
        return <GitBranch {...props} className="w-5 h-5 text-orange-400" />;
      case 'Cloud':
        return <Cloud {...props} className="w-5 h-5 text-cyan-300" />;
      case 'Lightbulb':
        return <Lightbulb {...props} className="w-5 h-5 text-amber-400" />;
      case 'Users':
        return <Users {...props} className="w-5 h-5 text-indigo-400" />;
      case 'MessageSquare':
        return <MessageSquare {...props} className="w-5 h-5 text-teal-400" />;
      default:
        return <Code2 {...props} />;
    }
  };

  const categories = [
    'All',
    'Programming Languages',
    'Database',
    'Web Technologies',
    'Tools',
    'Other Skills',
  ];

  const filteredSkills =
    selectedCategory === 'All'
      ? skills
      : skills?.filter((s) => s.category === selectedCategory);

  return (
    <section id="skills" className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-300 text-xs font-semibold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
            <span>Core Competencies</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Technical <span className="text-gradient">Skills</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-400 max-w-xl mx-auto">
            Practical programming proficiencies, database engineering tools, and collaborative skillsets.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-900/40 border border-white/20 scale-105'
                  : 'bg-white/[0.04] text-gray-400 hover:text-white hover:bg-white/[0.08] border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills?.map((skill) => (
            <div
              key={skill.id || skill.name}
              className="glass-card rounded-3xl p-6 relative overflow-hidden group hover:border-purple-400/40 transition-all duration-300"
            >
              {/* Soft background hover glow */}
              <div className="absolute top-0 right-0 w-28 h-28 bg-purple-500/10 rounded-full blur-xl group-hover:bg-purple-500/20 transition-all pointer-events-none" />

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-white/[0.06] border border-white/10 group-hover:border-purple-400/30 transition-colors">
                    {getSkillIcon(skill.icon)}
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base group-hover:text-purple-200 transition-colors">
                      {skill.name}
                    </h3>
                    <span className="text-[11px] text-gray-400">{skill.category}</span>
                  </div>
                </div>

                {/* Percentage Tag */}
                <span className="px-2.5 py-1 rounded-xl text-xs font-mono font-bold bg-white/[0.06] border border-white/10 text-cyan-300">
                  {skill.proficiency}%
                </span>
              </div>

              {/* Animated Progress Bar */}
              <div className="relative w-full h-2.5 bg-black/40 rounded-full overflow-hidden border border-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 shadow-[0_0_10px_rgba(139,92,246,0.6)] transition-all duration-1000 ease-out"
                  style={{ width: `${skill.proficiency}%` }}
                />
              </div>

              {/* Subtle footer info */}
              <div className="flex items-center justify-between mt-3 text-[11px] text-gray-400">
                <span>Mastery Level</span>
                <span className="font-medium text-gray-300">
                  {skill.proficiency >= 85
                    ? 'Advanced'
                    : skill.proficiency >= 75
                    ? 'Proficient'
                    : 'Intermediate'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
