import React, { useState, useEffect } from 'react';
import BackgroundSpace from './components/BackgroundSpace';
import DashboardLayout from './components/DashboardLayout';
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
      setTimeout(() => setLoading(false), 800);
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

      {/* Master Glassmorphic Dashboard Layout (Matching Reference Design Template) */}
      <div className="relative z-10">
        <DashboardLayout
          data={data}
          onOpenEditModal={() => openEditModalWithTab('profile')}
          onPreviewCertificate={(cert) => setPreviewCert(cert)}
        />
      </div>

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
