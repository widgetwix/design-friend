import { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
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

  const [showConfirmReset, setShowConfirmReset] = useState(false);

  const bookmarkedImages = images.filter(img => bookmarks.includes(img.id));

  const handleRetakeQuiz = () => {
    setShowConfirmReset(false);
    resetQuiz();
  };

  return (
    <div className="min-h-screen bg-[#F2E6DF] pb-24">
      {/* Header */}
      <header className="pt-12 px-4 pb-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl font-bold text-[#1A1A1A] font-headline">My Profile</h1>
          <p className="text-sm text-[#1A1A1A]/60 mt-1">Your design journey</p>
        </motion.div>
      </header>

      {/* Design Persona Card */}
      {designPersona && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-4 mb-6"
        >
          <div
            className="bg-[#1A1A1A] border border-[#1A1A1A] p-6 text-[#F2E6DF] cursor-pointer"
            onClick={() => setStage('persona')}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono uppercase tracking-wider text-[#F2E6DF]/70">MY DESIGN PERSONA</span>
              <svg className="w-5 h-5 text-[#F2E6DF]/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold font-headline mb-2">{designPersona.styleName}</h2>
            <div className="flex flex-wrap gap-2">
              {designPersona.dominantStyles?.slice(0, 2).map((style) => (
                <span
                  key={style}
                  className="px-2 py-1 bg-[#F2E6DF]/20 text-xs font-mono uppercase tracking-wider"
                >
                  {style}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mx-4 mb-6 flex gap-4"
      >
        <div className="flex-1 bg-[#F2E6DF] border border-[#1A1A1A] p-4 text-center">
          <p className="text-2xl font-bold text-[#C84C35]">{bookmarks.length}</p>
          <p className="text-xs text-[#1A1A1A]/60 font-mono uppercase">Bookmarked</p>
        </div>
        <div
          className="flex-1 bg-[#F2E6DF] border border-[#1A1A1A] p-4 text-center cursor-pointer hover:bg-[#1A1A1A]/5 transition-colors"
          onClick={() => setStage('inspiration')}
        >
          <p className="text-2xl font-bold text-[#1A1A1A]">
            {designPersona?.shoppingKeywords?.length || 0}
          </p>
          <p className="text-xs text-[#1A1A1A]/60 font-mono uppercase">Shop Keywords</p>
        </div>
      </motion.div>

      {/* Saved Bookmarks */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mx-4 mb-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-[#1A1A1A]">Saved Bookmarks</h3>
          {bookmarkedImages.length > 3 && (
            <button
              onClick={() => setStage('inspiration')}
              className="text-sm text-[#C84C35] font-medium"
            >
              See all
            </button>
          )}
        </div>

        {bookmarkedImages.length > 0 ? (
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4">
            {bookmarkedImages.map((image) => (
              <div
                key={image.id}
                className="relative flex-shrink-0 w-28 h-36 border border-[#1A1A1A] overflow-hidden"
              >
                <img
                  src={image.url}
                  alt={image.description}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  <BookmarkButton
                    isBookmarked={true}
                    onClick={() => toggleBookmark(image.id)}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-[#1A1A1A]/5 border border-[#1A1A1A]/20 p-6 text-center">
            <svg className="w-12 h-12 mx-auto text-[#1A1A1A]/30 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
            <p className="text-[#1A1A1A]/60 text-sm">No bookmarks yet</p>
            <button
              onClick={() => setStage('inspiration')}
              className="mt-2 text-[#C84C35] text-sm font-medium"
            >
              Browse your inspiration board
            </button>
          </div>
        )}
      </motion.div>

      {/* Retake Quiz */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mx-4"
      >
        <div className="bg-[#F2E6DF] border border-[#1A1A1A] p-4">
          <h3 className="font-semibold text-[#1A1A1A] mb-2">Ready for a refresh?</h3>
          <p className="text-sm text-[#1A1A1A]/60 mb-4">
            Retake the quiz to discover a new design persona. Your bookmarks will be saved.
          </p>
          <button
            onClick={() => setShowConfirmReset(true)}
            className="w-full py-3 border border-[#C84C35] text-[#C84C35] font-medium hover:bg-[#C84C35]/10 transition-colors"
          >
            Retake Style Quiz
          </button>
        </div>
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
                className="flex-1 py-3 border border-[#1A1A1A] text-[#1A1A1A] font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleRetakeQuiz}
                className="flex-1 py-3 bg-[#C84C35] text-[#F2E6DF] font-medium"
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
