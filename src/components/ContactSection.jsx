import React, { useState } from 'react';
import {
  Mail,
  MapPin,
  Send,
  Sparkles,
  CheckCircle2,
  Copy,
  Check,
  ArrowUp,
  MessageSquare,
} from 'lucide-react';
import { LinkedinIcon, GithubIcon } from './SocialIcons';
import confetti from 'canvas-confetti';
import { sendContactMessage } from '../utils/api';

export default function ContactSection({ profile }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    if (profile?.email) {
      navigator.clipboard.writeText(profile.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMsg('Please fill in your name, email, and message.');
      return;
    }

    setSubmitting(true);
    setErrorMsg('');

    try {
      await sendContactMessage(formData);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });

      // Trigger celebratory cosmic confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#8B5CF6', '#EC4899', '#38BDF8'],
      });
    } catch (err) {
      console.error(err);
      setErrorMsg('Failed to send message. Please try again or email directly.');
    } finally {
      setSubmitting(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="relative pt-20 pb-12 px-4 sm:px-6 lg:px-8 border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-300 text-xs font-semibold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
            <span>Transmit A Signal</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-400 max-w-xl mx-auto">
            Have a project in mind, want to discuss software engineering, or explore internship opportunities?
          </p>
        </div>

        {/* Contact Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-20">
          {/* Left Column: Direct Info Cards (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            {/* Direct Email Card */}
            <div className="glass-card rounded-3xl p-6 border border-white/10 relative overflow-hidden group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-purple-600/20 border border-purple-500/30 text-purple-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 block font-medium">Email Me Directly</span>
                    <a
                      href={`mailto:${profile?.email || 'vishal.m.dev@example.com'}`}
                      className="font-bold text-white hover:text-cyan-300 text-sm sm:text-base transition-colors"
                    >
                      {profile?.email || 'vishal.m.dev@example.com'}
                    </a>
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className="p-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.12] border border-white/10 text-gray-300 hover:text-white transition-all"
                  title="Copy email address"
                >
                  {copiedEmail ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* LinkedIn Profile Card */}
            <a
              href={profile?.linkedin_url || 'https://linkedin.com'}
              target="_blank"
              rel="noreferrer"
              className="glass-card rounded-3xl p-6 border border-white/10 flex items-center justify-between group hover:border-pink-500/40 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-pink-600/20 border border-pink-500/30 text-pink-400">
                  <LinkedinIcon className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-gray-400 block font-medium">LinkedIn Network</span>
                  <span className="font-bold text-white group-hover:text-pink-200 text-sm sm:text-base transition-colors">
                    Connect on LinkedIn
                  </span>
                </div>
              </div>
              <span className="text-xs text-pink-400 font-semibold">&rarr;</span>
            </a>

            {/* GitHub Profile Card */}
            <a
              href={profile?.github_url || 'https://github.com'}
              target="_blank"
              rel="noreferrer"
              className="glass-card rounded-3xl p-6 border border-white/10 flex items-center justify-between group hover:border-cyan-500/40 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-cyan-600/20 border border-cyan-500/30 text-cyan-400">
                  <GithubIcon className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-gray-400 block font-medium">GitHub Repositories</span>
                  <span className="font-bold text-white group-hover:text-cyan-200 text-sm sm:text-base transition-colors">
                    Explore Code & Projects
                  </span>
                </div>
              </div>
              <span className="text-xs text-cyan-400 font-semibold">&rarr;</span>
            </a>

            {/* Location Card */}
            <div className="glass-card rounded-3xl p-6 border border-white/10 flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-white/[0.05] border border-white/10 text-purple-400">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-gray-400 block font-medium">Based In</span>
                <span className="font-bold text-white text-sm sm:text-base">
                  {profile?.location || 'Tamil Nadu, India'}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/15 relative overflow-hidden">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                Send a <span className="text-gradient">Direct Message</span>
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 mb-6">
                Messages are directly stored and dispatched into my database inbox.
              </p>

              {submitted ? (
                <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center animate-in fade-in duration-300">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-3">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-1">Signal Received!</h4>
                  <p className="text-xs sm:text-sm text-gray-300 mb-4">
                    Thank you! Your message has been saved to the database. I will respond to your email promptly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-white"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMsg && (
                    <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs">
                      {errorMsg}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1.5">
                        Your Name <span className="text-pink-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Alex Johnson"
                        className="w-full px-4 py-3 rounded-2xl glass-input text-xs sm:text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1.5">
                        Your Email <span className="text-pink-400">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@company.com"
                        className="w-full px-4 py-3 rounded-2xl glass-input text-xs sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1.5">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. Internship Opportunity / Collaboration"
                      className="w-full px-4 py-3 rounded-2xl glass-input text-xs sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1.5">
                      Your Message <span className="text-pink-400">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Write your note here..."
                      className="w-full px-4 py-3 rounded-2xl glass-input text-xs sm:text-sm resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold text-sm shadow-xl shadow-purple-900/40 hover:scale-[1.01] active:scale-98 transition-all duration-200 disabled:opacity-50"
                  >
                    {submitting ? (
                      <span>Transmitting...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Transmission</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Professional Footer */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <div>
            <p className="text-center sm:text-left">
              &copy; {new Date().getFullYear()}{' '}
              <span className="font-bold text-white">{profile?.name || 'Vishal M'}</span>. All
              rights reserved.
            </p>
            <p className="text-[11px] text-gray-500 text-center sm:text-left mt-0.5">
              Engineered with React, Node.js & SQLite &bull; Glassmorphism Space Theme
            </p>
          </div>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-gray-300 hover:text-white transition-all"
          >
            <span>Back to Orbit</span>
            <ArrowUp className="w-3.5 h-3.5 text-cyan-400" />
          </button>
        </div>
      </div>
    </footer>
  );
}
