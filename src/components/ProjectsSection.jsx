import React from 'react';
import {
  FolderGit2,
  ExternalLink,
  Sparkles,
  Layers,
  Code2,
} from 'lucide-react';
import { GithubIcon } from './SocialIcons';

export default function ProjectsSection({ projects }) {
  return (
    <section id="projects" className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Engineering Showcase</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-400 max-w-xl mx-auto">
            Practical software projects demonstrating full-stack engineering, algorithmic implementation, and database architecture.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects?.map((proj) => {
            const techList = proj.technologies
              ? proj.technologies.split(',').map((t) => t.trim())
              : [];

            return (
              <div
                key={proj.id || proj.name}
                className="glass-card rounded-3xl overflow-hidden border border-white/10 hover:border-purple-400/50 transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Project Screenshot Banner */}
                <div className="relative h-52 w-full overflow-hidden bg-space-navy">
                  <img
                    src={
                      proj.image_url ||
                      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80'
                    }
                    alt={proj.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      e.target.src =
                        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d1126] via-[#0d1126]/30 to-transparent" />

                  {/* Featured Badge */}
                  {proj.featured ? (
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-xl text-[11px] font-bold uppercase tracking-wider bg-purple-600/80 backdrop-blur-md border border-purple-400/40 text-white shadow-lg">
                        Featured
                      </span>
                    </div>
                  ) : null}
                </div>

                {/* Content */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Project Title */}
                    <h3 className="text-xl font-bold text-white group-hover:text-purple-200 transition-colors mb-3">
                      {proj.name}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-6">
                      {proj.description}
                    </p>

                    {/* Technologies Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {techList.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-lg text-xs font-medium bg-white/[0.04] text-cyan-300 border border-white/10"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Links */}
                  <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-3">
                    {/* GitHub Repo */}
                    <a
                      href={proj.github_url || 'https://github.com'}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold bg-white/[0.05] hover:bg-white/[0.12] text-white border border-white/10 transition-all duration-200 hover:scale-105 active:scale-95"
                    >
                      <GithubIcon className="w-4 h-4 text-cyan-400" />
                      <span>Code Repo</span>
                    </a>

                    {/* Live Demo */}
                    <a
                      href={proj.live_demo_url || '#'}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-lg shadow-purple-900/30 transition-all duration-200 hover:scale-105 active:scale-95"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Live Demo</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
