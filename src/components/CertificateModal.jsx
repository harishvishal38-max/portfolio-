import React from 'react';
import { X, Download, ExternalLink, FileText, Sparkles, Building2, Calendar } from 'lucide-react';

export default function CertificateModal({ certificate, onClose }) {
  if (!certificate) return null;

  const isPdf =
    certificate.is_pdf === 1 ||
    certificate.is_pdf === true ||
    certificate.file_url?.toLowerCase().endsWith('.pdf') ||
    certificate.file_url?.includes('application/pdf');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#050711]/80 backdrop-blur-xl transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl rounded-3xl glass-panel p-6 sm:p-8 border border-white/20 shadow-2xl z-10 my-8">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-pink-400" />
              <span>{certificate.category || 'Certificate Preview'}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              {certificate.title}
            </h3>
            <div className="flex flex-wrap items-center gap-4 mt-1 text-xs text-gray-300">
              {certificate.issuing_organization && (
                <span className="flex items-center gap-1 text-cyan-300">
                  <Building2 className="w-3.5 h-3.5" />
                  {certificate.issuing_organization}
                </span>
              )}
              {certificate.date_completed && (
                <span className="flex items-center gap-1 text-gray-400">
                  <Calendar className="w-3.5 h-3.5 text-pink-400" />
                  {certificate.date_completed}
                </span>
              )}
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Certificate Viewer Content */}
        <div className="my-6">
          {certificate.description && (
            <p className="text-xs sm:text-sm text-gray-300 mb-4 bg-white/[0.02] p-3 rounded-xl border border-white/5">
              {certificate.description}
            </p>
          )}

          <div className="rounded-2xl overflow-hidden border border-white/10 bg-black/40 min-h-[350px] max-h-[70vh] flex items-center justify-center relative">
            {isPdf ? (
              <div className="w-full h-[550px] flex flex-col">
                <iframe
                  src={certificate.file_url}
                  title={certificate.title}
                  className="w-full flex-1 border-none rounded-2xl"
                />
              </div>
            ) : (
              <img
                src={certificate.file_url}
                alt={certificate.title}
                className="max-w-full max-h-[65vh] object-contain rounded-xl shadow-lg"
                onError={(e) => {
                  e.target.src =
                    'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80';
                }}
              />
            )}
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/10">
          <span className="text-xs text-gray-400">
            {isPdf ? 'PDF Document Format' : 'High Resolution Image Certificate'}
          </span>

          <div className="flex items-center gap-2">
            <a
              href={certificate.file_url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/15 transition-all"
            >
              <ExternalLink className="w-4 h-4 text-cyan-400" />
              <span>Open in New Tab</span>
            </a>

            <a
              href={certificate.file_url}
              download
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-md transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Download</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
