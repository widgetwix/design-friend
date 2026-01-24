import { AppProvider, useApp } from './context/AppContext';
import DiscoveryFeed from './pages/DiscoveryFeed';
import VibeCheck from './pages/VibeCheck';
import DeepDive from './pages/DeepDive';
import DesignPersona from './pages/DesignPersona';
import InspirationBoard from './pages/InspirationBoard';
import Profile from './pages/Profile';
import './index.css';

function AppContent() {
  const { stage } = useApp();

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
}

function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-gray-50">
        <AppContent />
      </div>
    </AppProvider>
  );
}

export default App;
