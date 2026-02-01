import { useApp } from '../context/AppContext';

// Icons as simple SVG components
const HomeIcon = ({ active }) => (
  <svg className={`w-6 h-6 ${active ? 'text-[#C84C35]' : 'text-[#1A1A1A]/40'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const GridIcon = ({ active }) => (
  <svg className={`w-6 h-6 ${active ? 'text-[#C84C35]' : 'text-[#1A1A1A]/40'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
  </svg>
);

const UserIcon = ({ active }) => (
  <svg className={`w-6 h-6 ${active ? 'text-[#C84C35]' : 'text-[#1A1A1A]/40'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

export default function Navigation() {
  const { stage, setStage, designPersona } = useApp();

  // Only show navigation after persona is generated
  if (!designPersona && stage !== 'inspiration' && stage !== 'profile') {
    return null;
  }

  const tabs = [
    { id: 'persona', icon: HomeIcon, label: 'Persona' },
    { id: 'inspiration', icon: GridIcon, label: 'Board' },
    { id: 'profile', icon: UserIcon, label: 'Profile' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#F2E6DF] border-t border-[#1A1A1A] px-6 py-2 safe-area-bottom">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {tabs.map((tab) => {
          const isActive = stage === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => setStage(tab.id)}
              aria-label={`Go to ${tab.label}`}
              aria-current={isActive ? 'page' : undefined}
              className={`flex flex-col items-center py-2 px-4 transition-colors focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] focus:ring-offset-2 ${
                isActive ? 'text-[#C84C35]' : 'text-[#1A1A1A]/40 hover:text-[#1A1A1A]/60'
              }`}
            >
              <Icon active={isActive} />
              <span className={`text-xs mt-1 font-mono uppercase tracking-wider ${isActive ? 'text-[#C84C35]' : 'text-[#1A1A1A]/40'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
