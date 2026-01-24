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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 pb-24">
      {/* Header */}
      <header className="pt-12 px-4 pb-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
          <p className="text-sm text-gray-500 mt-1">Your design journey</p>
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
            className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white cursor-pointer"
            onClick={() => setStage('persona')}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-medium text-white/70">MY DESIGN PERSONA</span>
              <svg className="w-5 h-5 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2">{designPersona.styleName}</h2>
            <div className="flex flex-wrap gap-2">
              {designPersona.dominantStyles?.slice(0, 2).map((style) => (
                <span
                  key={style}
                  className="px-2 py-1 bg-white/20 rounded-full text-xs"
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
        <div className="flex-1 bg-white rounded-xl p-4 shadow-sm text-center">
          <p className="text-2xl font-bold text-indigo-600">{bookmarks.length}</p>
          <p className="text-xs text-gray-500">Bookmarked</p>
        </div>
        <div
          className="flex-1 bg-white rounded-xl p-4 shadow-sm text-center cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => setStage('inspiration')}
        >
          <p className="text-2xl font-bold text-purple-600">
            {designPersona?.shoppingKeywords?.length || 0}
          </p>
          <p className="text-xs text-gray-500">Shop Keywords</p>
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
          <h3 className="text-lg font-semibold text-gray-800">Saved Bookmarks</h3>
          {bookmarkedImages.length > 3 && (
            <button
              onClick={() => setStage('inspiration')}
              className="text-sm text-indigo-600 font-medium"
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
                className="relative flex-shrink-0 w-28 h-36 rounded-xl overflow-hidden shadow-md"
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
          <div className="bg-gray-50 rounded-xl p-6 text-center">
            <svg className="w-12 h-12 mx-auto text-gray-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
            <p className="text-gray-500 text-sm">No bookmarks yet</p>
            <button
              onClick={() => setStage('inspiration')}
              className="mt-2 text-indigo-600 text-sm font-medium"
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
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-2">Ready for a refresh?</h3>
          <p className="text-sm text-gray-500 mb-4">
            Retake the quiz to discover a new design persona. Your bookmarks will be saved.
          </p>
          <button
            onClick={() => setShowConfirmReset(true)}
            className="w-full py-3 border-2 border-indigo-500 text-indigo-600 font-medium rounded-xl hover:bg-indigo-50 transition-colors"
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
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowConfirmReset(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-indigo-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Retake Quiz?</h3>
              <p className="text-sm text-gray-500">
                Your current design persona will be replaced, but your bookmarked images will be saved.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmReset(false)}
                className="flex-1 py-3 border border-gray-200 text-gray-600 rounded-xl font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleRetakeQuiz}
                className="flex-1 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-medium"
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
