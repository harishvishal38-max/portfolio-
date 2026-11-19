import React, { useState } from 'react';
import {
  Calendar,
  Building2,
  Award,
  Sparkles,
  UserCheck,
  ExternalLink,
  PlusCircle,
  FileCheck2,
  Tag,
} from 'lucide-react';

export default function EventsSection({ events, onOpenAddEvent, onPreviewCertificate }) {
  const [selectedType, setSelectedType] = useState('All');

  const eventTypes = ['All', 'Hackathon', 'Symposium', 'Workshop', 'Technical Event'];

  const filteredEvents =
    selectedType === 'All'
      ? events
      : events?.filter((e) => e.event_type.toLowerCase() === selectedType.toLowerCase());

  const getTypeStyle = (type) => {
    switch (type?.toLowerCase()) {
      case 'hackathon':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/40';
      case 'symposium':
        return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40';
      case 'workshop':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      case 'technical event':
        return 'bg-pink-500/20 text-pink-300 border-pink-500/40';
      default:
        return 'bg-white/10 text-white border-white/20';
    }
  };

  return (
    <section id="events" className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Heading & Add Action */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold uppercase tracking-widest mb-3">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>Extracurricular & Co-Curricular</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Events & <span className="text-gradient">Participation</span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-gray-400 max-w-xl">
              Competitive hackathons, academic symposia, hands-on technical workshops, and coding summits.
            </p>
          </div>

          {/* Quick Add Event Entry Button */}
          <button
            onClick={onOpenAddEvent}
            className="self-start md:self-end flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-xs font-semibold shadow-lg shadow-purple-900/30 border border-white/20 transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add Event Entry</span>
          </button>
        </div>

        {/* Type Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          {eventTypes.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-4 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                selectedType === type
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-900/40 border border-purple-400/30 scale-105'
                  : 'bg-white/[0.04] text-gray-400 hover:text-white hover:bg-white/[0.08] border border-white/5'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredEvents?.map((event) => (
            <div
              key={event.id || event.title}
              className="glass-card rounded-3xl overflow-hidden border border-white/10 hover:border-purple-400/40 transition-all duration-300 flex flex-col group"
            >
              {/* Event Photograph Banner */}
              <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-space-navy">
                <img
                  src={
                    event.photo_url ||
                    'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80'
                  }
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    e.target.src =
                      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1126] via-[#0d1126]/40 to-transparent" />

                {/* Event Type Badge on photo */}
                <div className="absolute top-4 left-4">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold uppercase tracking-wider backdrop-blur-md border ${getTypeStyle(
                      event.event_type
                    )}`}
                  >
                    <Tag className="w-3 h-3" />
                    <span>{event.event_type}</span>
                  </span>
                </div>

                {/* Date Badge */}
                <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-medium text-white bg-black/50 backdrop-blur-md border border-white/10">
                  <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{event.event_date}</span>
                </div>
              </div>

              {/* Event Details Content */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  {/* Organization & Role */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2 text-xs text-gray-400">
                    <div className="flex items-center gap-1.5 text-cyan-300 font-medium">
                      <Building2 className="w-3.5 h-3.5" />
                      <span>{event.organization}</span>
                    </div>

                    {event.role && (
                      <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-white/[0.06] border border-white/10 text-gray-300">
                        <UserCheck className="w-3.5 h-3.5 text-pink-400" />
                        <span>{event.role}</span>
                      </div>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-purple-200 transition-colors mt-2 mb-3">
                    {event.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-6">
                    {event.description}
                  </p>
                </div>

                {/* Footer Actions: Participation Certificate */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  {event.certificate_url ? (
                    <button
                      onClick={() =>
                        onPreviewCertificate({
                          title: `${event.title} - Certificate`,
                          issuing_organization: event.organization,
                          file_url: event.certificate_url,
                          description: `Participation certificate for ${event.title}`,
                        })
                      }
                      className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-300 hover:text-cyan-200 transition-colors"
                    >
                      <FileCheck2 className="w-4 h-4 text-cyan-400" />
                      <span>View Certificate</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <span className="text-xs text-gray-500 italic">Certificate upon request</span>
                  )}

                  <span className="text-[11px] text-gray-400 uppercase tracking-wider font-mono">
                    Verified Entry
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
