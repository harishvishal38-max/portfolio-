import React, { useState } from 'react';
import {
  FileText,
  Download,
  Upload,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  Briefcase,
  GraduationCap,
  Code2,
  Eye,
  Check,
  AlertCircle,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { uploadMediaFile, updateProfile } from '../utils/api';

export default function ResumeSection({ profile, onRefresh, onPreviewCertificate }) {
  const [uploading, setUploading] = useState(false);
  const [feedback, setFeedback] = useState({ text: '', type: '' });

  const resumeUrl = profile?.resume_url || '/sample-resume.pdf';

  const handleUploadResume = async (file) => {
    if (!file) return;
    try {
      setUploading(true);
      const res = await uploadMediaFile(file);
      await updateProfile({ resume_url: res.url });
      setFeedback({ text: 'Resume updated in database successfully!', type: 'success' });
      confetti({ particleCount: 50, spread: 60 });
      if (onRefresh) onRefresh();
    } catch (err) {
      setFeedback({ text: 'Upload failed: ' + err.message, type: 'error' });
    } finally {
      setUploading(false);
      setTimeout(() => setFeedback({ text: '', type: '' }), 4000);
    }
  };

  return (
    <section id="resume" className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
            <span>Curriculum Vitae</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Professional <span className="text-gradient">Resume</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-400 max-w-xl mx-auto">
            Comprehensive overview of academic background, technical proficiencies, project milestones, and certifications.
          </p>
        </div>

        {/* Feedback Alert */}
        {feedback.text && (
          <div
            className={`max-w-xl mx-auto mb-6 px-4 py-2.5 rounded-2xl text-xs font-semibold flex items-center gap-2 ${
              feedback.type === 'error'
                ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
            }`}
          >
            {feedback.type === 'error' ? (
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            ) : (
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            )}
            <span>{feedback.text}</span>
          </div>
        )}

        {/* Main Glass Resume Container */}
        <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/15 relative overflow-hidden group shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-pink-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 justify-between">
            {/* Left: Summary & Highlights */}
            <div className="flex-1 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-medium">
                <FileText className="w-3.5 h-3.5" />
                <span>Verified Official Document</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                {profile?.name || 'Vishal M'}
              </h3>
              <p className="text-sm font-semibold text-purple-300">
                {profile?.title || 'Engineering Student | Aspiring Software Developer'}
              </p>

              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-xl">
                Dedicated Computer Science and Engineering undergraduate with expertise in Python, Java, C++, MySQL, and modern responsive web systems. Proven experience leading hackathon teams, architecting complaint tracking portals, and solving algorithmic challenges.
              </p>

              {/* Core Qualification Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10">
                  <span className="text-[11px] text-gray-400 block">Degree</span>
                  <span className="text-xs font-bold text-white">B.E. CSE</span>
                </div>
                <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10">
                  <span className="text-[11px] text-gray-400 block">CGPA</span>
                  <span className="text-xs font-bold text-cyan-300">8.65 / 10.0</span>
                </div>
                <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 col-span-2 sm:col-span-1">
                  <span className="text-[11px] text-gray-400 block">Availability</span>
                  <span className="text-xs font-bold text-emerald-400">Internships & Roles</span>
                </div>
              </div>
            </div>

            {/* Right: Actions & Preview Card */}
            <div className="w-full lg:w-80 flex flex-col gap-3 shrink-0">
              {/* Document Mockup Card */}
              <div
                onClick={() =>
                  onPreviewCertificate &&
                  onPreviewCertificate({
                    title: 'Curriculum Vitae - ' + (profile?.name || 'Vishal M'),
                    issuing_organization: profile?.college || 'Engineering College',
                    file_url: resumeUrl,
                    is_pdf: 1,
                    description: 'Official student resume document.',
                  })
                }
                className="p-5 rounded-2xl bg-black/40 border border-white/15 hover:border-purple-400/40 transition-all cursor-pointer group/doc relative overflow-hidden"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 rounded-xl bg-purple-600/20 text-purple-300">
                    <FileText className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-md bg-white/10 text-gray-300">
                    PDF Document
                  </span>
                </div>
                <span className="font-bold text-white text-sm block group-hover/doc:text-purple-200 transition-colors">
                  Resume Preview
                </span>
                <span className="text-[11px] text-gray-400 block mt-0.5">
                  Click to inspect full document
                </span>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-cyan-400 font-semibold">
                  <span className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5" /> Quick View
                  </span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Download Resume Button */}
              <a
                href={resumeUrl}
                download
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold text-xs shadow-lg shadow-purple-900/30 transition-all hover:scale-[1.02] active:scale-98"
              >
                <Download className="w-4 h-4" />
                <span>Download Resume (PDF)</span>
              </a>

              {/* Upload / Replace Resume Button */}
              <label className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-white font-semibold text-xs cursor-pointer transition-all hover:scale-[1.02] active:scale-98">
                <Upload className="w-4 h-4 text-cyan-400" />
                <span>{uploading ? 'Uploading...' : 'Upload / Replace PDF'}</span>
                <input
                  type="file"
                  accept=".pdf,application/pdf"
                  disabled={uploading}
                  className="hidden"
                  onChange={(e) => handleUploadResume(e.target.files[0])}
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
