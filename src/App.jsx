import { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import DiscoveryFeed from './pages/DiscoveryFeed';
import VibeCheck from './pages/VibeCheck';
import DeepDive from './pages/DeepDive';
import DesignPersona from './pages/DesignPersona';
import InspirationBoard from './pages/InspirationBoard';
import Profile from './pages/Profile';
import AuthModal from './components/AuthModal';
import ProfileDisplay from './components/ProfileDisplay';
import './index.css';

function AppContent() {
  const { stage } = useApp();
  const { isAuthenticated } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(!isAuthenticated);

  // Show auth modal if not authenticated
  if (!isAuthenticated && showAuthModal) {
    return (
      <div className="min-h-screen bg-[#F2E6DF] flex items-center justify-center">
        <AuthModal isOpen={true} onClose={() => setShowAuthModal(false)} />
      </div>
    );
  }

  const renderPage = () => {
    switch (stage) {
      case 'discovery':
        return <DiscoveryFeed />;
      case 'vibeCheck':
        return <VibeCheck />;
      case 'deepDive':
        return <DeepDive />;
      case 'persona':
        return <DesignPersona />;
      case 'inspiration':
        return <InspirationBoard />;
      case 'profile':
        return <Profile />;
      default:
        return <DiscoveryFeed />;
    }
  };

  return (
    <div className="relative">
      <ProfileDisplay onLoginClick={() => setShowAuthModal(true)} />
      {renderPage()}
      <AuthModal isOpen={showAuthModal && !isAuthenticated} onClose={() => setShowAuthModal(false)} />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <div className="min-h-screen bg-[#F2E6DF]">
          <AppContent />
        </div>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;
