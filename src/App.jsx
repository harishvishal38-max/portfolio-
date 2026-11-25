import React, { useState, useEffect } from 'react';
import ModernBackground from './components/ModernBackground';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import EducationSection from './components/EducationSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import EventsSection from './components/EventsSection';
import CertificatesSection from './components/CertificatesSection';
import ResumeSection from './components/ResumeSection';
import ContactSection from './components/ContactSection';
import CertificateModal from './components/CertificateModal';
import EditPortfolioModal from './components/EditPortfolioModal';
import LoadingScreen from './components/LoadingScreen';
import { fetchPortfolioData } from './utils/api';
import { fallbackPortfolioData } from './data/initialData';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(fallbackPortfolioData);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editModalTab, setEditModalTab] = useState('profile');
  const [previewCert, setPreviewCert] = useState(null);

  const loadData = async () => {
    try {
      const fetched = await fetchPortfolioData();
      if (fetched) {
        setData(fetched);
      }
    } catch (err) {
      console.error('Failed to load portfolio:', err);
    } finally {
      setTimeout(() => setLoading(false), 500);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const openEditModalWithTab = (tab = 'profile') => {
    setEditModalTab(tab);
    setIsEditModalOpen(true);
  };

  if (loading) {
    return <LoadingScreen name={data?.profile?.name || 'VISHAL M'} />;
  }

  return (
    <div className="relative min-h-screen bg-[#0b0f19] text-slate-100 font-sans selection:bg-indigo-600 selection:text-white overflow-x-hidden">
      {/* Clean Normal Modern Background */}
      <ModernBackground bgImageUrl={data?.profile?.bg_image_url} />

      {/* Sticky Top Navigation Bar */}
      <Navbar
        profile={data?.profile}
        onOpenEditModal={() => openEditModalWithTab('profile')}
      />

      {/* Main Flowing Website Sections */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24 pb-20">
        {/* 1. Hero Section */}
        <HeroSection
          profile={data?.profile}
          onOpenEditModal={() => openEditModalWithTab('profile')}
        />

        {/* 2. About Me */}
        <AboutSection about={data?.about} profile={data?.profile} />

        {/* 3. Education Timeline */}
        <EducationSection education={data?.education} />

        {/* 4. Technical Skills */}
        <SkillsSection skills={data?.skills} />

        {/* 5. Projects Section */}
        <ProjectsSection
          projects={data?.projects}
          onOpenAddProject={() => openEditModalWithTab('projects')}
        />

        {/* 6. Events & Participation */}
        <EventsSection
          events={data?.events}
          onOpenAddEvent={() => openEditModalWithTab('events')}
          onPreviewCertificate={(cert) => setPreviewCert(cert)}
        />

        {/* 7. Certificates & Achievements */}
        <CertificatesSection
          certificates={data?.certificates}
          achievements={data?.achievements}
          onPreviewCertificate={(cert) => setPreviewCert(cert)}
        />

        {/* 8. Resume Section */}
        <ResumeSection
          profile={data?.profile}
          onRefresh={loadData}
          onPreviewCertificate={(cert) => setPreviewCert(cert)}
        />

        {/* 9. Contact & Footer */}
        <ContactSection profile={data?.profile} />
      </main>

      {/* Interactive Certificate Preview Modal */}
      <CertificateModal
        certificate={previewCert}
        onClose={() => setPreviewCert(null)}
      />

      {/* Full-Featured Database Administration / Inline Content Editor */}
      <EditPortfolioModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        initialData={data}
        onDataRefresh={loadData}
        activeTabDefault={editModalTab}
      />
    </div>
  );
}
