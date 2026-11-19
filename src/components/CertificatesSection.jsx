import React, { useState } from 'react';
import {
  Award,
  Calendar,
  Building2,
  Sparkles,
  ExternalLink,
  Eye,
  FileText,
  Trophy,
  Star,
  Zap,
  CheckCircle2,
} from 'lucide-react';

export default function CertificatesSection({
  certificates,
  achievements,
  onPreviewCertificate,
}) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Programming', 'Technical', 'Workshop', 'Internship', 'Other'];

  const filteredCerts =
    selectedCategory === 'All'
      ? certificates
      : certificates?.filter(
          (c) => c.category?.toLowerCase() === selectedCategory.toLowerCase()
        );

  const getAchievementIcon = (badge) => {
    switch (badge?.toLowerCase()) {
      case 'trophy':
        return <Trophy className="w-5 h-5 text-yellow-400" />;
      case 'award':
        return <Award className="w-5 h-5 text-purple-400" />;
      case 'star':
        return <Star className="w-5 h-5 text-pink-400" />;
      case 'zap':
        return <Zap className="w-5 h-5 text-cyan-400" />;
      default:
        return <Award className="w-5 h-5 text-yellow-400" />;
    }
  };

  return (
    <section id="certificates" className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Verified Credentials</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Certificates & <span className="text-gradient">Achievements</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-400 max-w-xl mx-auto">
            Professional certifications, academic accreditations, and competitive coding milestones.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-cyan-500 text-black shadow-md shadow-cyan-500/30 font-bold scale-105'
                  : 'bg-white/[0.04] text-gray-400 hover:text-white hover:bg-white/[0.08] border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {filteredCerts?.map((cert) => {
            const isPdf =
              cert.is_pdf === 1 ||
              cert.is_pdf === true ||
              cert.file_url?.toLowerCase().endsWith('.pdf');

            return (
              <div
                key={cert.id || cert.title}
                className="glass-card rounded-3xl overflow-hidden border border-white/10 hover:border-cyan-400/40 transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Thumbnail Preview Area */}
                <div
                  onClick={() => onPreviewCertificate(cert)}
                  className="relative h-44 w-full bg-space-navy cursor-pointer overflow-hidden"
                >
                  {isPdf ? (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-purple-900/40 to-slate-900/60 p-4">
                      <FileText className="w-12 h-12 text-cyan-400 mb-2 group-hover:scale-110 transition-transform" />
                      <span className="text-xs font-semibold text-white">PDF Document Preview</span>
                      <span className="text-[10px] text-gray-400 mt-1">Click to view full PDF</span>
                    </div>
                  ) : (
                    <img
                      src={
                        cert.file_url ||
                        'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80'
                      }
                      alt={cert.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        e.target.src =
                          'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80';
                      }}
                    />
                  )}

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d1126] via-transparent to-transparent opacity-80" />

                  {/* Category Chip */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md border border-white/15 text-cyan-300">
                      {cert.category}
                    </span>
                  </div>

                  {/* Hover Overlay Button */}
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-purple-600/90 text-white text-xs font-semibold shadow-lg">
                      <Eye className="w-3.5 h-3.5" />
                      <span>Preview Certificate</span>
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Organization & Date */}
                    <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                      <span className="flex items-center gap-1 text-cyan-300 font-medium">
                        <Building2 className="w-3 h-3" />
                        {cert.issuing_organization}
                      </span>
                      <span className="flex items-center gap-1 text-gray-400">
                        <Calendar className="w-3 h-3" />
                        {cert.date_completed}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-bold text-white text-base group-hover:text-cyan-200 transition-colors mb-2">
                      {cert.title}
                    </h3>

                    {/* Description */}
                    {cert.description && (
                      <p className="text-xs text-gray-300 leading-relaxed line-clamp-2">
                        {cert.description}
                      </p>
                    )}
                  </div>

                  {/* View Certificate Button */}
                  <div className="pt-4 mt-4 border-t border-white/5">
                    <button
                      onClick={() => onPreviewCertificate(cert)}
                      className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-semibold bg-white/[0.06] hover:bg-white/[0.12] text-white border border-white/10 hover:border-cyan-400/40 transition-all duration-200"
                    >
                      <Eye className="w-3.5 h-3.5 text-cyan-400" />
                      <span>View Certificate</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Achievements Subsection */}
        <div className="mt-14 pt-12 border-t border-white/10">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-300 text-xs font-semibold uppercase tracking-wider mb-2">
              <Trophy className="w-3.5 h-3.5 text-yellow-400" />
              <span>Recognitions & Honors</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Special <span className="text-gradient">Achievements</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {achievements?.map((ach, idx) => (
              <div
                key={ach.id || idx}
                className="glass-card rounded-2xl p-5 border border-white/10 hover:border-yellow-400/40 transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 rounded-xl bg-white/[0.05] border border-white/10 group-hover:border-yellow-400/30 transition-colors">
                    {getAchievementIcon(ach.badge)}
                  </div>
                  {ach.date && (
                    <span className="text-[11px] font-mono text-gray-400 bg-white/[0.04] px-2 py-0.5 rounded-md">
                      {ach.date}
                    </span>
                  )}
                </div>

                <h4 className="font-bold text-white text-sm group-hover:text-yellow-200 transition-colors mb-1.5">
                  {ach.title}
                </h4>

                <p className="text-xs text-gray-300 leading-relaxed">
                  {ach.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
