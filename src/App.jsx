import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import EditorPage from './pages/EditorPage';
import PreviewPage from './pages/PreviewPage';
import NotFound from './pages/NotFound';
import ParticleBackground from './components/ParticleBackground';

const AppContent = () => {
  const location = useLocation();
  const showParticles = ['/', '/dashboard', '/404'].includes(location.pathname);

  return (
    <>
      {showParticles && <ParticleBackground />}
      <div className="relative min-h-screen z-10">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/editor/:id" element={<EditorPage />} />
          <Route path="/preview/:id" element={<PreviewPage />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </div>
      <Toaster position="bottom-right" toastOptions={{
        style: {
          background: 'rgba(10, 10, 12, 0.9)',
          color: '#f8fafc',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          fontFamily: "'Outfit', sans-serif",
          fontSize: '13px',
          fontWeight: 600,
        }
      }} />
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;

