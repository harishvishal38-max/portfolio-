import React, { useState, useEffect } from 'react';
import {
  X,
  Save,
  Trash2,
  Plus,
  Upload,
  User,
  Info,
  GraduationCap,
  Cpu,
  Calendar,
  Award,
  FolderGit2,
  Mail,
  RefreshCw,
  Check,
  AlertCircle,
  FileText,
  Sliders,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  updateProfile,
  updateAbout,
  saveEducation,
  deleteEducation,
  saveSkill,
  deleteSkill,
  saveEvent,
  deleteEvent,
  saveCertificate,
  deleteCertificate,
  saveAchievement,
  deleteAchievement,
  saveProject,
  deleteProject,
  fetchMessages,
  deleteMessage,
  uploadMediaFile,
  resetDatabaseToDefault,
} from '../utils/api';

export default function EditPortfolioModal({
  isOpen,
  onClose,
  initialData,
  onDataRefresh,
  activeTabDefault = 'profile',
}) {
  const [activeTab, setActiveTab] = useState(activeTabDefault);
  const [profileForm, setProfileForm] = useState(initialData?.profile || {});
  const [aboutForm, setAboutForm] = useState(initialData?.about || {});
  const [educationList, setEducationList] = useState(initialData?.education || []);
  const [skillsList, setSkillsList] = useState(initialData?.skills || []);
  const [eventsList, setEventsList] = useState(initialData?.events || []);
  const [certsList, setCertsList] = useState(initialData?.certificates || []);
  const [achievementsList, setAchievementsList] = useState(initialData?.achievements || []);
  const [projectsList, setProjectsList] = useState(initialData?.projects || []);
  const [messagesList, setMessagesList] = useState([]);

  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState({ text: '', type: '' });
  const [uploading, setUploading] = useState(false);

  // Synchronize when initialData changes
  useEffect(() => {
    if (initialData) {
      setProfileForm(initialData.profile || {});
      setAboutForm(initialData.about || {});
      setEducationList(initialData.education || []);
      setSkillsList(initialData.skills || []);
      setEventsList(initialData.events || []);
      setCertsList(initialData.certificates || []);
      setAchievementsList(initialData.achievements || []);
      setProjectsList(initialData.projects || []);
    }
  }, [initialData]);

  // Load messages when tab opened
  useEffect(() => {
    if (activeTab === 'messages') {
      fetchMessages()
        .then((data) => setMessagesList(data))
        .catch(console.error);
    }
  }, [activeTab]);

  const showFeedback = (text, type = 'success') => {
    setFeedback({ text, type });
    setTimeout(() => setFeedback({ text: '', type: '' }), 3500);
  };

  const handleFileUpload = async (file, targetCallback) => {
    if (!file) return;
    try {
      setUploading(true);
      const res = await uploadMediaFile(file);
      targetCallback(res.url, res.isPdf);
      showFeedback(`File uploaded: ${res.originalName}`);
    } catch (err) {
      showFeedback('File upload failed: ' + err.message, 'error');
    } finally {
      setUploading(false);
    }
  };

  // Profile Save
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const updated = await updateProfile(profileForm);
      setProfileForm(updated);
      showFeedback('Profile updated in SQLite database!');
      onDataRefresh();
      confetti({ particleCount: 40, spread: 50 });
    } catch (err) {
      showFeedback(err.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  // About Save
  const handleSaveAbout = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const updated = await updateAbout(aboutForm);
      setAboutForm(updated);
      showFeedback('About details saved in database!');
      onDataRefresh();
      confetti({ particleCount: 40, spread: 50 });
    } catch (err) {
      showFeedback(err.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  // Education Actions
  const [newEdu, setNewEdu] = useState({
    institution: '',
    degree: '',
    department: '',
    academic_year: '',
    cgpa: '',
    level: 'college',
    details: '',
  });

  const handleAddEducation = async (e) => {
    e.preventDefault();
    try {
      const created = await saveEducation(newEdu);
      setEducationList([...educationList, created]);
      setNewEdu({
        institution: '',
        degree: '',
        department: '',
        academic_year: '',
        cgpa: '',
        level: 'college',
        details: '',
      });
      showFeedback('Education milestone added to database!');
      onDataRefresh();
    } catch (err) {
      showFeedback(err.message, 'error');
    }
  };

  const handleDeleteEducation = async (id) => {
    if (!window.confirm('Delete this education entry?')) return;
    try {
      await deleteEducation(id);
      setEducationList(educationList.filter((e) => e.id !== id));
      showFeedback('Education entry removed');
      onDataRefresh();
    } catch (err) {
      showFeedback(err.message, 'error');
    }
  };

  // Skills Actions
  const [newSkill, setNewSkill] = useState({
    category: 'Programming Languages',
    name: '',
    proficiency: 85,
    icon: 'Code2',
  });

  const handleAddSkill = async (e) => {
    e.preventDefault();
    if (!newSkill.name) return;
    try {
      const created = await saveSkill(newSkill);
      setSkillsList([...skillsList, created]);
      setNewSkill({ ...newSkill, name: '', proficiency: 85 });
      showFeedback('Skill added to database!');
      onDataRefresh();
    } catch (err) {
      showFeedback(err.message, 'error');
    }
  };

  const handleUpdateSkillProficiency = async (skill, val) => {
    try {
      const updated = { ...skill, proficiency: Number(val) };
      await saveSkill(updated);
      setSkillsList(skillsList.map((s) => (s.id === skill.id ? updated : s)));
      onDataRefresh();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteSkill = async (id) => {
    try {
      await deleteSkill(id);
      setSkillsList(skillsList.filter((s) => s.id !== id));
      showFeedback('Skill removed');
      onDataRefresh();
    } catch (err) {
      showFeedback(err.message, 'error');
    }
  };

  // Events Actions
  const [newEvent, setNewEvent] = useState({
    title: '',
    event_type: 'Hackathon',
    organization: '',
    event_date: '',
    role: '',
    description: '',
    photo_url: '',
    certificate_url: '',
  });

  const handleAddEvent = async (e) => {
    e.preventDefault();
    if (!newEvent.title) return;
    try {
      const created = await saveEvent(newEvent);
      setEventsList([created, ...eventsList]);
      setNewEvent({
        title: '',
        event_type: 'Hackathon',
        organization: '',
        event_date: '',
        role: '',
        description: '',
        photo_url: '',
        certificate_url: '',
      });
      showFeedback('Event entry recorded in database!');
      onDataRefresh();
    } catch (err) {
      showFeedback(err.message, 'error');
    }
  };

  const handleDeleteEvent = async (id) => {
    if (!window.confirm('Delete this event entry?')) return;
    try {
      await deleteEvent(id);
      setEventsList(eventsList.filter((ev) => ev.id !== id));
      showFeedback('Event entry deleted');
      onDataRefresh();
    } catch (err) {
      showFeedback(err.message, 'error');
    }
  };

  // Certificates Actions
  const [newCert, setNewCert] = useState({
    title: '',
    issuing_organization: '',
    date_completed: '',
    category: 'Programming',
    file_url: '',
    is_pdf: 0,
    description: '',
  });

  const handleAddCertificate = async (e) => {
    e.preventDefault();
    if (!newCert.title || !newCert.file_url) {
      showFeedback('Please provide a certificate title and file URL or upload.', 'error');
      return;
    }
    try {
      const created = await saveCertificate(newCert);
      setCertsList([created, ...certsList]);
      setNewCert({
        title: '',
        issuing_organization: '',
        date_completed: '',
        category: 'Programming',
        file_url: '',
        is_pdf: 0,
        description: '',
      });
      showFeedback('Certificate saved to database!');
      onDataRefresh();
    } catch (err) {
      showFeedback(err.message, 'error');
    }
  };

  const handleDeleteCertificate = async (id) => {
    if (!window.confirm('Delete this certificate?')) return;
    try {
      await deleteCertificate(id);
      setCertsList(certsList.filter((c) => c.id !== id));
      showFeedback('Certificate deleted');
      onDataRefresh();
    } catch (err) {
      showFeedback(err.message, 'error');
    }
  };

  // Projects Actions
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    technologies: '',
    image_url: '',
    github_url: '',
    live_demo_url: '',
    featured: 1,
  });

  const handleAddProject = async (e) => {
    e.preventDefault();
    if (!newProject.name) return;
    try {
      const created = await saveProject(newProject);
      setProjectsList([created, ...projectsList]);
      setNewProject({
        name: '',
        description: '',
        technologies: '',
        image_url: '',
        github_url: '',
        live_demo_url: '',
        featured: 1,
      });
      showFeedback('Project added to database!');
      onDataRefresh();
    } catch (err) {
      showFeedback(err.message, 'error');
    }
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm('Delete this project?')) return;
    try {
      await deleteProject(id);
      setProjectsList(projectsList.filter((p) => p.id !== id));
      showFeedback('Project deleted');
      onDataRefresh();
    } catch (err) {
      showFeedback(err.message, 'error');
    }
  };

  // Messages Actions
  const handleDeleteMsg = async (id) => {
    try {
      await deleteMessage(id);
      setMessagesList(messagesList.filter((m) => m.id !== id));
      showFeedback('Message deleted');
    } catch (err) {
      showFeedback(err.message, 'error');
    }
  };

  // Reset Database
  const handleResetDatabase = async () => {
    if (
      !window.confirm(
        'Are you sure you want to restore the default initial portfolio template? Any custom modifications will be reset.'
      )
    )
      return;
    try {
      await resetDatabaseToDefault();
      showFeedback('Database reset to polished default template!');
      onDataRefresh();
    } catch (err) {
      showFeedback(err.message, 'error');
    }
  };

  if (!isOpen) return null;

  const tabs = [
    { id: 'profile', label: 'Hero & Profile', icon: <User className="w-4 h-4" /> },
    { id: 'about', label: 'About Me', icon: <Info className="w-4 h-4" /> },
    { id: 'education', label: 'Education', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'skills', label: 'Skills', icon: <Cpu className="w-4 h-4" /> },
    { id: 'events', label: 'Events & Entries', icon: <Calendar className="w-4 h-4" /> },
    { id: 'certificates', label: 'Certificates', icon: <Award className="w-4 h-4" /> },
    { id: 'projects', label: 'Projects', icon: <FolderGit2 className="w-4 h-4" /> },
    { id: 'messages', label: 'Inbox', icon: <Mail className="w-4 h-4" /> },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#050711]/85 backdrop-blur-2xl transition-opacity"
        onClick={onClose}
      />

      {/* Main Glass Panel */}
      <div className="relative w-full max-w-5xl h-[92vh] rounded-3xl glass-panel border border-white/20 shadow-2xl z-10 flex flex-col overflow-hidden">
        {/* Header Bar */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-black/30">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-purple-600/30 border border-purple-500/40 text-purple-300">
              <Sliders className="w-5 h-5 text-pink-400" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                Portfolio Content & Database Manager
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  SQLite Live Sync
                </span>
              </h2>
              <p className="text-xs text-gray-400">
                All changes made here are saved directly to the database.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleResetDatabase}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white/[0.05] hover:bg-white/[0.1] text-gray-300 hover:text-white border border-white/10"
              title="Reset to default template data"
            >
              <RefreshCw className="w-3.5 h-3.5 text-yellow-400" />
              <span>Reset Defaults</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Feedback Alert Bar */}
        {feedback.text && (
          <div
            className={`px-6 py-2.5 text-xs font-semibold flex items-center gap-2 ${
              feedback.type === 'error'
                ? 'bg-red-500/20 text-red-300 border-b border-red-500/30'
                : 'bg-emerald-500/20 text-emerald-300 border-b border-emerald-500/30'
            }`}
          >
            {feedback.type === 'error' ? (
              <AlertCircle className="w-4 h-4 text-red-400" />
            ) : (
              <Check className="w-4 h-4 text-emerald-400" />
            )}
            <span>{feedback.text}</span>
          </div>
        )}

        {/* Tabs Row */}
        <div className="flex items-center gap-1 px-4 py-2 border-b border-white/10 bg-white/[0.02] overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-900/30 border border-purple-400/40'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Scrollable Tab Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* TAB 1: HERO & PROFILE */}
          {activeTab === 'profile' && (
            <form onSubmit={handleSaveProfile} className="space-y-5 max-w-3xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={profileForm.name || ''}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">Professional Title</label>
                  <input
                    type="text"
                    value={profileForm.title || ''}
                    onChange={(e) => setProfileForm({ ...profileForm, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">
                  Introduction / Bio
                </label>
                <textarea
                  rows={3}
                  value={profileForm.bio || ''}
                  onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">College Name</label>
                  <input
                    type="text"
                    value={profileForm.college || ''}
                    onChange={(e) => setProfileForm({ ...profileForm, college: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">Department</label>
                  <input
                    type="text"
                    value={profileForm.department || ''}
                    onChange={(e) => setProfileForm({ ...profileForm, department: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">Location</label>
                  <input
                    type="text"
                    value={profileForm.location || ''}
                    onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">LinkedIn URL</label>
                  <input
                    type="text"
                    value={profileForm.linkedin_url || ''}
                    onChange={(e) => setProfileForm({ ...profileForm, linkedin_url: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">GitHub URL</label>
                  <input
                    type="text"
                    value={profileForm.github_url || ''}
                    onChange={(e) => setProfileForm({ ...profileForm, github_url: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">Instagram URL</label>
                  <input
                    type="text"
                    value={profileForm.instagram_url || ''}
                    onChange={(e) => setProfileForm({ ...profileForm, instagram_url: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={profileForm.email || ''}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs"
                  />
                </div>
              </div>

              {/* Profile Picture Upload & Resume URL */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">
                    Profile Picture (Image URL or Upload)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={profileForm.avatar_url || ''}
                      onChange={(e) => setProfileForm({ ...profileForm, avatar_url: e.target.value })}
                      placeholder="https://... or upload"
                      className="w-full px-3.5 py-2 rounded-xl glass-input text-xs"
                    />
                    <label className="cursor-pointer px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs flex items-center gap-1 border border-white/15">
                      <Upload className="w-3.5 h-3.5" />
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) =>
                          handleFileUpload(e.target.files[0], (url) =>
                            setProfileForm({ ...profileForm, avatar_url: url })
                          )
                        }
                      />
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">
                    Resume Document (PDF URL or Upload)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={profileForm.resume_url || ''}
                      onChange={(e) => setProfileForm({ ...profileForm, resume_url: e.target.value })}
                      placeholder="/resume.pdf or URL"
                      className="w-full px-3.5 py-2 rounded-xl glass-input text-xs"
                    />
                    <label className="cursor-pointer px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs flex items-center gap-1 border border-white/15">
                      <Upload className="w-3.5 h-3.5" />
                      <input
                        type="file"
                        accept=".pdf,image/*"
                        className="hidden"
                        onChange={(e) =>
                          handleFileUpload(e.target.files[0], (url) =>
                            setProfileForm({ ...profileForm, resume_url: url })
                          )
                        }
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Website Student Background Image Upload / URL */}
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">
                  Website Background Image (Professional Student Photo URL or Upload)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={profileForm.bg_image_url || ''}
                    onChange={(e) => setProfileForm({ ...profileForm, bg_image_url: e.target.value })}
                    placeholder="https://... or upload custom student / workspace photo"
                    className="w-full px-3.5 py-2 rounded-xl glass-input text-xs"
                  />
                  <label className="cursor-pointer px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs flex items-center gap-1 border border-white/15 whitespace-nowrap">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        handleFileUpload(e.target.files[0], (url) =>
                          setProfileForm({ ...profileForm, bg_image_url: url })
                        )
                      }
                    />
                  </label>
                </div>
                <p className="text-[11px] text-gray-400 mt-1">
                  This image is smoothly blended into the dark space background behind the 3D planets and frosted glass cards.
                </p>
              </div>

              <button
                type="submit"
                disabled={saving || uploading}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-xs font-semibold shadow-lg shadow-purple-900/30 transition-all"
              >
                <Save className="w-4 h-4" />
                <span>Save Profile Changes</span>
              </button>
            </form>
          )}

          {/* TAB 2: ABOUT ME */}
          {activeTab === 'about' && (
            <form onSubmit={handleSaveAbout} className="space-y-4 max-w-3xl">
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">
                  Personal Introduction
                </label>
                <textarea
                  rows={3}
                  value={aboutForm.intro || ''}
                  onChange={(e) => setAboutForm({ ...aboutForm, intro: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">
                  Career Objective
                </label>
                <textarea
                  rows={3}
                  value={aboutForm.career_objective || ''}
                  onChange={(e) => setAboutForm({ ...aboutForm, career_objective: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">
                  Career Interests
                </label>
                <input
                  type="text"
                  value={aboutForm.career_interests || ''}
                  onChange={(e) => setAboutForm({ ...aboutForm, career_interests: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">
                  Technical Interests
                </label>
                <input
                  type="text"
                  value={aboutForm.technical_interests || ''}
                  onChange={(e) => setAboutForm({ ...aboutForm, technical_interests: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">
                  Skills & Areas of Learning Summary
                </label>
                <textarea
                  rows={2}
                  value={aboutForm.skills_summary || ''}
                  onChange={(e) => setAboutForm({ ...aboutForm, skills_summary: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-semibold shadow-lg transition-all"
              >
                <Save className="w-4 h-4" />
                <span>Save About Me Details</span>
              </button>
            </form>
          )}

          {/* TAB 3: EDUCATION */}
          {activeTab === 'education' && (
            <div className="space-y-6">
              {/* Form to Add New Education Entry */}
              <div className="glass-card rounded-2xl p-5 border border-white/10">
                <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                  <Plus className="w-4 h-4 text-cyan-400" />
                  <span>Add New Education Milestone</span>
                </h3>
                <form onSubmit={handleAddEducation} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <input
                        type="text"
                        required
                        placeholder="Institution / College / School Name"
                        value={newEdu.institution}
                        onChange={(e) => setNewEdu({ ...newEdu, institution: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        required
                        placeholder="Degree / Course (e.g. B.E. or HSC)"
                        value={newEdu.degree}
                        onChange={(e) => setNewEdu({ ...newEdu, degree: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Department / Stream"
                        value={newEdu.department}
                        onChange={(e) => setNewEdu({ ...newEdu, department: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <input
                        type="text"
                        required
                        placeholder="Academic Year (e.g. 2023 - 2027)"
                        value={newEdu.academic_year}
                        onChange={(e) => setNewEdu({ ...newEdu, academic_year: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        required
                        placeholder="CGPA / Percentage (e.g. 8.65 or 92%)"
                        value={newEdu.cgpa}
                        onChange={(e) => setNewEdu({ ...newEdu, cgpa: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                      />
                    </div>
                    <div>
                      <select
                        value={newEdu.level}
                        onChange={(e) => setNewEdu({ ...newEdu, level: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                      >
                        <option value="college">College / Undergraduate</option>
                        <option value="hsc">Higher Secondary (Class XII)</option>
                        <option value="sslc">Secondary School (Class X)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="Brief details or coursework highlights..."
                      value={newEdu.details}
                      onChange={(e) => setNewEdu({ ...newEdu, details: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                    />
                  </div>

                  <button
                    type="submit"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Milestone</span>
                  </button>
                </form>
              </div>

              {/* List of Existing Education Entries */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  Current Database Entries ({educationList.length})
                </h4>
                {educationList.map((edu) => (
                  <div
                    key={edu.id}
                    className="glass-card rounded-2xl p-4 flex items-center justify-between border border-white/5"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">{edu.institution}</span>
                        <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-white/10 text-gray-300">
                          {edu.level}
                        </span>
                      </div>
                      <p className="text-xs text-cyan-300 mt-0.5">
                        {edu.degree} &bull; {edu.academic_year} &bull;{' '}
                        <span className="text-white font-semibold">{edu.cgpa}</span>
                      </p>
                    </div>

                    <button
                      onClick={() => handleDeleteEducation(edu.id)}
                      className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                      title="Delete entry"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: SKILLS */}
          {activeTab === 'skills' && (
            <div className="space-y-6">
              {/* Add Skill Form */}
              <div className="glass-card rounded-2xl p-5 border border-white/10">
                <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                  <Plus className="w-4 h-4 text-pink-400" />
                  <span>Add New Skill</span>
                </h3>
                <form onSubmit={handleAddSkill} className="flex flex-wrap items-center gap-3">
                  <select
                    value={newSkill.category}
                    onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
                    className="px-3 py-2 rounded-xl glass-input text-xs"
                  >
                    <option value="Programming Languages">Programming Languages</option>
                    <option value="Database">Database</option>
                    <option value="Web Technologies">Web Technologies</option>
                    <option value="Tools">Tools</option>
                    <option value="Other Skills">Other Skills</option>
                  </select>

                  <input
                    type="text"
                    required
                    placeholder="Skill Name (e.g. Java, MySQL)"
                    value={newSkill.name}
                    onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                    className="px-3 py-2 rounded-xl glass-input text-xs flex-1 min-w-[150px]"
                  />

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">Score:</span>
                    <input
                      type="number"
                      min="10"
                      max="100"
                      value={newSkill.proficiency}
                      onChange={(e) => setNewSkill({ ...newSkill, proficiency: e.target.value })}
                      className="w-16 px-2 py-2 rounded-xl glass-input text-xs text-center"
                    />
                    <span className="text-xs text-gray-400">%</span>
                  </div>

                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold"
                  >
                    Add Skill
                  </button>
                </form>
              </div>

              {/* Skill Proficiency Sliders */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {skillsList.map((skill) => (
                  <div
                    key={skill.id}
                    className="glass-card rounded-2xl p-4 border border-white/5 flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <span className="font-bold text-white text-sm">{skill.name}</span>
                        <span className="text-[10px] text-gray-400 ml-2">({skill.category})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-cyan-300">
                          {skill.proficiency}%
                        </span>
                        <button
                          onClick={() => handleDeleteSkill(skill.id)}
                          className="text-red-400 hover:text-red-300 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={skill.proficiency}
                      onChange={(e) => handleUpdateSkillProficiency(skill, e.target.value)}
                      className="w-full accent-purple-500 cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: EVENTS & PARTICIPATION */}
          {activeTab === 'events' && (
            <div className="space-y-6">
              {/* Add New Event Form */}
              <div className="glass-card rounded-2xl p-5 border border-white/10">
                <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                  <Plus className="w-4 h-4 text-purple-400" />
                  <span>Add Event Entry</span>
                </h3>

                <form onSubmit={handleAddEvent} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <input
                        type="text"
                        required
                        placeholder="Event Name (e.g. Smart India Hackathon)"
                        value={newEvent.title}
                        onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                      />
                    </div>
                    <div>
                      <select
                        value={newEvent.event_type}
                        onChange={(e) => setNewEvent({ ...newEvent, event_type: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                      >
                        <option value="Hackathon">Hackathon</option>
                        <option value="Symposium">Symposium</option>
                        <option value="Workshop">Workshop</option>
                        <option value="Technical Event">Technical Event</option>
                      </select>
                    </div>
                    <div>
                      <input
                        type="text"
                        required
                        placeholder="College / Organization Name"
                        value={newEvent.organization}
                        onChange={(e) => setNewEvent({ ...newEvent, organization: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <input
                        type="text"
                        required
                        placeholder="Event Date (e.g. October 2025)"
                        value={newEvent.event_date}
                        onChange={(e) => setNewEvent({ ...newEvent, event_date: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="My Role (e.g. Lead Developer / Presenter)"
                        value={newEvent.role}
                        onChange={(e) => setNewEvent({ ...newEvent, role: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <textarea
                      rows={2}
                      placeholder="Event Description..."
                      value={newEvent.description}
                      onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl glass-input text-xs resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] text-gray-400 mb-1">
                        Photograph (Image URL or Upload)
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Image URL or upload"
                          value={newEvent.photo_url}
                          onChange={(e) => setNewEvent({ ...newEvent, photo_url: e.target.value })}
                          className="w-full px-3 py-1.5 rounded-xl glass-input text-xs"
                        />
                        <label className="cursor-pointer px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs flex items-center gap-1 border border-white/15">
                          <Upload className="w-3.5 h-3.5" />
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) =>
                              handleFileUpload(e.target.files[0], (url) =>
                                setNewEvent({ ...newEvent, photo_url: url })
                              )
                            }
                          />
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] text-gray-400 mb-1">
                        Certificate (URL or Upload)
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Certificate URL or upload"
                          value={newEvent.certificate_url}
                          onChange={(e) =>
                            setNewEvent({ ...newEvent, certificate_url: e.target.value })
                          }
                          className="w-full px-3 py-1.5 rounded-xl glass-input text-xs"
                        />
                        <label className="cursor-pointer px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs flex items-center gap-1 border border-white/15">
                          <Upload className="w-3.5 h-3.5" />
                          <input
                            type="file"
                            accept=".pdf,image/*"
                            className="hidden"
                            onChange={(e) =>
                              handleFileUpload(e.target.files[0], (url) =>
                                setNewEvent({ ...newEvent, certificate_url: url })
                              )
                            }
                          />
                        </label>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-semibold shadow-md"
                  >
                    Add Event Entry
                  </button>
                </form>
              </div>

              {/* Existing Events List */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  Recorded Events ({eventsList.length})
                </h4>
                {eventsList.map((ev) => (
                  <div
                    key={ev.id}
                    className="glass-card rounded-2xl p-4 flex items-center justify-between border border-white/5"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">{ev.title}</span>
                        <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300">
                          {ev.event_type}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {ev.organization} &bull; {ev.event_date} {ev.role ? `(${ev.role})` : ''}
                      </p>
                    </div>

                    <button
                      onClick={() => handleDeleteEvent(ev.id)}
                      className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: CERTIFICATES & ACHIEVEMENTS */}
          {activeTab === 'certificates' && (
            <div className="space-y-8">
              {/* Add Certificate */}
              <div className="glass-card rounded-2xl p-5 border border-white/10">
                <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                  <Award className="w-4 h-4 text-cyan-400" />
                  <span>Add New Certificate</span>
                </h3>

                <form onSubmit={handleAddCertificate} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <input
                        type="text"
                        required
                        placeholder="Certificate Title"
                        value={newCert.title}
                        onChange={(e) => setNewCert({ ...newCert, title: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        required
                        placeholder="Issuing Organization"
                        value={newCert.issuing_organization}
                        onChange={(e) =>
                          setNewCert({ ...newCert, issuing_organization: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                      />
                    </div>
                    <div>
                      <select
                        value={newCert.category}
                        onChange={(e) => setNewCert({ ...newCert, category: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                      >
                        <option value="Programming">Programming</option>
                        <option value="Technical">Technical</option>
                        <option value="Workshop">Workshop</option>
                        <option value="Internship">Internship</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <input
                        type="text"
                        required
                        placeholder="Date Completed (e.g. November 2024)"
                        value={newCert.date_completed}
                        onChange={(e) =>
                          setNewCert({ ...newCert, date_completed: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                      />
                    </div>
                    <div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          required
                          placeholder="File URL or upload PDF / image"
                          value={newCert.file_url}
                          onChange={(e) =>
                            setNewCert({
                              ...newCert,
                              file_url: e.target.value,
                              is_pdf: e.target.value.toLowerCase().endsWith('.pdf') ? 1 : 0,
                            })
                          }
                          className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                        />
                        <label className="cursor-pointer px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs flex items-center gap-1 border border-white/15">
                          <Upload className="w-3.5 h-3.5" />
                          <input
                            type="file"
                            accept=".pdf,image/*"
                            className="hidden"
                            onChange={(e) =>
                              handleFileUpload(e.target.files[0], (url, isPdf) =>
                                setNewCert({ ...newCert, file_url: url, is_pdf: isPdf ? 1 : 0 })
                              )
                            }
                          />
                        </label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="Short Description of credentials..."
                      value={newCert.description}
                      onChange={(e) => setNewCert({ ...newCert, description: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold shadow-md"
                  >
                    Add Certificate
                  </button>
                </form>
              </div>

              {/* Certificates List */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  Database Certificates ({certsList.length})
                </h4>
                {certsList.map((c) => (
                  <div
                    key={c.id}
                    className="glass-card rounded-2xl p-4 flex items-center justify-between border border-white/5"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">{c.title}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300">
                          {c.category}
                        </span>
                        {c.is_pdf ? (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-red-500/20 text-red-300">
                            PDF
                          </span>
                        ) : null}
                      </div>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {c.issuing_organization} &bull; {c.date_completed}
                      </p>
                    </div>

                    <button
                      onClick={() => handleDeleteCertificate(c.id)}
                      className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: PROJECTS */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              {/* Add Project Form */}
              <div className="glass-card rounded-2xl p-5 border border-white/10">
                <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                  <Plus className="w-4 h-4 text-purple-400" />
                  <span>Add Project Showcase</span>
                </h3>

                <form onSubmit={handleAddProject} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <input
                        type="text"
                        required
                        placeholder="Project Name"
                        value={newProject.name}
                        onChange={(e) =>
                          setNewProject({ ...newProject, name: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Technologies (comma-separated, e.g. Java, MySQL, React)"
                        value={newProject.technologies}
                        onChange={(e) =>
                          setNewProject({ ...newProject, technologies: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <textarea
                      rows={2}
                      placeholder="Project description and key architectural points..."
                      value={newProject.description}
                      onChange={(e) =>
                        setNewProject({ ...newProject, description: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-xl glass-input text-xs resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Screenshot Image URL"
                          value={newProject.image_url}
                          onChange={(e) =>
                            setNewProject({ ...newProject, image_url: e.target.value })
                          }
                          className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                        />
                        <label className="cursor-pointer px-2.5 py-2 rounded-xl bg-white/10 text-white text-xs flex items-center">
                          <Upload className="w-3.5 h-3.5" />
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) =>
                              handleFileUpload(e.target.files[0], (url) =>
                                setNewProject({ ...newProject, image_url: url })
                              )
                            }
                          />
                        </label>
                      </div>
                    </div>

                    <div>
                      <input
                        type="text"
                        placeholder="GitHub Repository URL"
                        value={newProject.github_url}
                        onChange={(e) =>
                          setNewProject({ ...newProject, github_url: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                      />
                    </div>

                    <div>
                      <input
                        type="text"
                        placeholder="Live Demo URL"
                        value={newProject.live_demo_url}
                        onChange={(e) =>
                          setNewProject({ ...newProject, live_demo_url: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-md"
                  >
                    Add Project
                  </button>
                </form>
              </div>

              {/* Projects List */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  Projects in Database ({projectsList.length})
                </h4>
                {projectsList.map((p) => (
                  <div
                    key={p.id}
                    className="glass-card rounded-2xl p-4 flex items-center justify-between border border-white/5"
                  >
                    <div>
                      <span className="font-bold text-white text-sm">{p.name}</span>
                      <p className="text-xs text-cyan-300 mt-0.5">{p.technologies}</p>
                    </div>

                    <button
                      onClick={() => handleDeleteProject(p.id)}
                      className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: MESSAGES INBOX */}
          {activeTab === 'messages' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white">
                  Incoming Visitor Messages ({messagesList.length})
                </h3>
                <span className="text-xs text-gray-400">Stored in SQLite messages table</span>
              </div>

              {messagesList.length === 0 ? (
                <div className="text-center py-12 glass-card rounded-2xl border border-white/5">
                  <Mail className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                  <p className="text-xs text-gray-400">No contact messages received yet.</p>
                </div>
              ) : (
                messagesList.map((msg) => (
                  <div
                    key={msg.id}
                    className="glass-card rounded-2xl p-5 border border-white/10 space-y-2 relative"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">{msg.name}</span>
                        <a
                          href={`mailto:${msg.email}`}
                          className="text-xs text-cyan-400 hover:underline font-mono"
                        >
                          &lt;{msg.email}&gt;
                        </a>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] text-gray-400 font-mono">
                          {new Date(msg.created_at).toLocaleString()}
                        </span>
                        <button
                          onClick={() => handleDeleteMsg(msg.id)}
                          className="text-red-400 hover:text-red-300 p-1"
                          title="Delete message"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {msg.subject && (
                      <h4 className="text-xs font-semibold text-purple-300">
                        Subject: {msg.subject}
                      </h4>
                    )}

                    <p className="text-xs text-gray-300 leading-relaxed bg-white/[0.02] p-3 rounded-xl border border-white/5">
                      {msg.message}
                    </p>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
