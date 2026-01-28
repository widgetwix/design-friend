import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

export default function ProfileDisplay({ onLoginClick }) {
  const { user, isAuthenticated, signOut } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Get user initials
  const getInitials = (name) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleSignOut = async () => {
    await signOut();
    setShowDropdown(false);
  };

  if (!isAuthenticated) {
    return (
      <div
        data-testid="profile-display"
        className="absolute right-4 top-4 z-20"
      >
        <button
          onClick={onLoginClick}
          className="px-4 py-2 text-sm font-medium text-[#1A1A1A] bg-[#F2E6DF] border border-[#1A1A1A] shadow-md hover:bg-[#1A1A1A]/5 transition-colors"
        >
          Sign In
        </button>
      </div>
    );
  }

  return (
    <div
      data-testid="profile-display"
      className="absolute right-4 top-4 z-20"
      ref={dropdownRef}
    >
      {/* Avatar button */}
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="relative w-10 h-10 overflow-hidden shadow-md hover:shadow-lg transition-shadow focus:outline-none focus:ring-1 focus:ring-[#C84C35] focus:ring-offset-2"
      >
        {user?.photoURL ? (
          <img
            src={user.photoURL}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-[#1A1A1A] flex items-center justify-center text-[#F2E6DF] font-medium text-sm">
            {getInitials(user?.displayName)}
          </div>
        )}
      </button>

      {/* Dropdown menu */}
      <AnimatePresence>
        {showDropdown && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-64 bg-[#F2E6DF] border border-[#1A1A1A] shadow-xl overflow-hidden"
          >
            {/* User info */}
            <div className="p-4 border-b border-[#1A1A1A]/20">
              <div className="flex items-center gap-3">
                {user?.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="Profile"
                    className="w-12 h-12 object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 bg-[#1A1A1A] flex items-center justify-center text-[#F2E6DF] font-medium">
                    {getInitials(user?.displayName)}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-[#1A1A1A] truncate">
                    {user?.displayName}
                  </p>
                  <p className="text-sm text-[#1A1A1A]/60 truncate">
                    {user?.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Menu items */}
            <div className="p-2">
              <button
                onClick={handleSignOut}
                className="w-full flex items-center gap-3 px-3 py-2 text-left text-[#1A1A1A] hover:bg-[#1A1A1A]/5 transition-colors"
              >
                <svg className="w-5 h-5 text-[#1A1A1A]/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>Sign Out</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
