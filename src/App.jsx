import React, { useState, useEffect } from 'react';
import BackgroundSpace from './components/BackgroundSpace';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import EducationSection from './components/EducationSection';
import SkillsSection from './components/SkillsSection';
import EventsSection from './components/EventsSection';
import CertificatesSection from './components/CertificatesSection';
import ProjectsSection from './components/ProjectsSection';
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
      // Artificial slight delay so loading animation feels fluid
      setTimeout(() => setLoading(false), 900);
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
    <div className="relative min-h-screen bg-[#050711] text-white selection:bg-purple-500/40 selection:text-white font-sans overflow-x-hidden">
      {/* 3D Animated Background: Professional Student Atmosphere, Galaxy Canvas, Shooting Stars & Floating Planets */}
      <BackgroundSpace bgImageUrl={data?.profile?.bg_image_url} />

      {/* Floating Glassmorphism Navigation Bar */}
      <Navbar
        profile={data.profile}
        onOpenEditModal={() => openEditModalWithTab('profile')}
      />

      {/* Main Content Sections */}
      <main className="relative z-10 space-y-12 sm:space-y-20 pb-16">
        {/* 1. Hero Section: Glassmorphism panel, large typography, profile picture, resume & work buttons */}
        <HeroSection
          profile={data.profile}
          onOpenEditModal={() => openEditModalWithTab('profile')}
        />

        {/* 2. About Me: Two-column layout with career/tech interests & objectives */}
        <AboutSection about={data.about} />

        {/* 3. Education Section: Vertical timeline with glowing connection lines */}
        <EducationSection education={data.education} />

        {/* 4. Technical Skills: Categories, animated proficiency progress bars, editable values */}
        <SkillsSection skills={data.skills} />

        {/* 5. Events & Participation: Glowing glass cards with photographs & certificates */}
        <EventsSection
          events={data.events}
          onOpenAddEvent={() => openEditModalWithTab('events')}
          onPreviewCertificate={(cert) => setPreviewCert(cert)}
        />

        {/* 6. Certificates & Achievements: Category filters, image & PDF preview modal, achievements */}
        <CertificatesSection
          certificates={data.certificates}
          achievements={data.achievements}
          onPreviewCertificate={(cert) => setPreviewCert(cert)}
        />

        {/* 7. Featured Projects: Modern showcase with live demo and GitHub repository links */}
        <ProjectsSection projects={data.projects} />

        {/* 8. Contact Section & Professional Footer: Transmit message to SQLite database */}
        <ContactSection profile={data.profile} />
      </main>

      {/* Interactive Modal Preview for Image & PDF Certificates */}
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
