import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AnnotationModal({ isOpen, onClose, onSubmit, position }) {
  const [note, setNote] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (note.trim()) {
      onSubmit(note.trim());
      setNote('');
    }
  };

  const handleSkip = () => {
    onSubmit('');
    setNote('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 z-50 shadow-2xl"
          >
            <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-6" />

            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Why did this catch your eye?
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Tell us what you love about this element
            </p>

            <form onSubmit={handleSubmit}>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="e.g., I love the velvet texture, the warm lighting..."
                className="w-full h-28 p-4 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-700"
                autoFocus
              />

              <div className="flex gap-3 mt-4">
                <button
                  type="button"
                  onClick={handleSkip}
                  className="flex-1 py-3 px-4 border border-gray-200 rounded-xl text-gray-600 font-medium hover:bg-gray-50 transition-colors"
                >
                  Skip
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
                >
                  Save & Continue
                </button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
