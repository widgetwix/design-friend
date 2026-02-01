import { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import BookmarkButton from '../components/BookmarkButton';
import Navigation from '../components/Navigation';

export default function Profile() {
  const {
    designPersona,
    bookmarks,
    toggleBookmark,
    resetQuiz,
    images,
    setStage
  } = useApp();
  const { user } = useAuth();

  const [showConfirmReset, setShowConfirmReset] = useState(false);

  const bookmarkedImages = images.filter(img => bookmarks.includes(img.id));

  const handleRetakeQuiz = () => {
    setShowConfirmReset(false);
    resetQuiz();
  };

  // Get user initials for avatar
  const getInitials = (name) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-[#F2E6DF] pb-24">
      {/* Header with Settings */}
      <header className="pt-8 px-4 pb-4">
        <div className="flex items-center justify-end">
          <button
            aria-label="Settings"
            className="p-2 text-[#1A1A1A]/60 hover:text-[#1A1A1A] transition-colors focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] focus:ring-offset-2"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
      </header>

      {/* User Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-4 pb-6"
      >
        <div className="flex flex-col items-center">
          {/* Avatar with Edit Button */}
          <div className="relative mb-4">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#1A1A1A] bg-[#1A1A1A]">
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[#F2E6DF] text-2xl font-bold">
                  {getInitials(user?.displayName)}
                </div>
              )}
            </div>
            {/* Edit Button */}
            <button
              aria-label="Edit profile"
              className="absolute bottom-0 right-0 w-8 h-8 bg-[#1A1A1A] border border-[#F2E6DF] rounded-full flex items-center justify-center text-[#F2E6DF] hover:bg-[#1A1A1A]/80 transition-colors focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] focus:ring-offset-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
          </div>

          {/* User Name */}
          <h1 className="text-xl font-bold text-[#1A1A1A] font-headline">
            {user?.displayName || 'Design Enthusiast'}
          </h1>

          {/* Location */}
          <p className="text-sm text-[#1A1A1A]/60 font-mono mt-1">
            San Francisco, CA
          </p>
        </div>
      </motion.div>

      {/* Design Persona Card */}
      {designPersona && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mx-4 mb-6"
        >
          <div
            className="bg-[#F2E6DF] border border-[#1A1A1A] p-4 cursor-pointer hover:bg-[#1A1A1A]/5 transition-colors"
            onClick={() => setStage('persona')}
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[#1A1A1A]/60">MY DESIGN PERSONA</span>
                <h2 className="text-lg font-bold font-headline text-[#1A1A1A] mt-1">{designPersona.styleName}</h2>
              </div>
              <svg className="w-5 h-5 text-[#1A1A1A]/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </motion.div>
      )}

      {/* Saved Bookmarks */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mx-4 mb-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-[#1A1A1A]">Saved Bookmarks</h3>
          {bookmarkedImages.length > 0 && (
            <button
              onClick={() => setStage('inspiration')}
              className="text-sm text-[#C84C35] font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-[#C84C35] focus:ring-offset-2"
            >
              View All
            </button>
          )}
        </div>

        {bookmarkedImages.length > 0 ? (
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4">
            {bookmarkedImages.slice(0, 4).map((image) => (
              <div
                key={image.id}
                className="relative flex-shrink-0 w-24 h-24 border border-[#1A1A1A] overflow-hidden"
              >
                <img
                  src={image.url}
                  alt={image.description}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-[#1A1A1A]/5 border border-[#1A1A1A]/20 p-6 text-center">
            <svg className="w-12 h-12 mx-auto text-[#1A1A1A]/30 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
            <p className="text-[#1A1A1A]/60 text-sm font-mono">No bookmarks yet</p>
            <button
              onClick={() => setStage('inspiration')}
              className="mt-2 text-[#C84C35] text-sm font-medium hover:underline"
            >
              Browse your inspiration board
            </button>
          </div>
        )}
      </motion.div>

      {/* Retake Quiz Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mx-4"
      >
        <button
          onClick={() => setShowConfirmReset(true)}
          className="w-full py-4 border border-[#1A1A1A] text-[#1A1A1A] font-medium font-mono uppercase tracking-wider hover:bg-[#1A1A1A]/5 transition-colors focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] focus:ring-offset-2"
        >
          Retake Style Quiz
        </button>
      </motion.div>

      {/* Confirm Reset Modal */}
      {showConfirmReset && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-[#1A1A1A]/50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowConfirmReset(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[#F2E6DF] border border-[#1A1A1A] p-6 max-w-sm w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-[#1A1A1A]/10 flex items-center justify-center">
                <svg className="w-8 h-8 text-[#1A1A1A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-[#1A1A1A] font-headline mb-2">Retake Quiz?</h3>
              <p className="text-sm text-[#1A1A1A]/60">
                Your current design persona will be replaced, but your bookmarked images will be saved.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmReset(false)}
                className="flex-1 py-3 border border-[#1A1A1A] text-[#1A1A1A] font-medium focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] focus:ring-offset-2"
              >
                Cancel
              </button>
              <button
                onClick={handleRetakeQuiz}
                className="flex-1 py-3 bg-[#C84C35] text-[#F2E6DF] font-medium focus:outline-none focus:ring-2 focus:ring-[#C84C35] focus:ring-offset-2"
              >
                Start Over
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      <Navigation />
    </div>
  );
}
