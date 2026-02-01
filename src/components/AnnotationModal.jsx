import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MAX_CHARS = 150;

export default function AnnotationModal({ isOpen, onClose, onSubmit, position }) {
  const [note, setNote] = useState('');

  const handleNoteChange = (e) => {
    const value = e.target.value;
    if (value.length <= MAX_CHARS) {
      setNote(value);
    }
  };

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
            className="fixed inset-0 bg-[#1A1A1A]/50 z-40"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed bottom-0 left-0 right-0 bg-[#F2E6DF] border-t border-[#1A1A1A] p-6 z-50 shadow-2xl"
          >
            <div className="w-12 h-1 bg-[#1A1A1A]/20 mx-auto mb-6" />

            <h3 className="text-xl font-bold text-[#1A1A1A] font-headline mb-2">
              Why did this catch your eye?
            </h3>
            <p className="text-sm text-[#1A1A1A]/60 mb-4">
              Tell us what you love about this element
            </p>

            <form onSubmit={handleSubmit}>
              <div className="relative">
                <textarea
                  value={note}
                  onChange={handleNoteChange}
                  placeholder="e.g., I love the velvet texture, the warm lighting..."
                  className="w-full h-28 p-4 border border-[#1A1A1A] bg-transparent resize-none focus:outline-none focus:ring-2 focus:ring-[#C84C35] text-[#1A1A1A]"
                  autoFocus
                  maxLength={MAX_CHARS}
                  aria-describedby="char-count"
                />
                <span
                  id="char-count"
                  className="absolute bottom-3 right-3 text-xs font-mono text-[#1A1A1A]/40"
                >
                  {note.length}/{MAX_CHARS}
                </span>
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  type="button"
                  onClick={handleSkip}
                  className="flex-1 py-3 px-4 border border-[#1A1A1A] text-[#1A1A1A] font-medium hover:bg-[#1A1A1A]/5 transition-colors focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] focus:ring-offset-2"
                >
                  Skip
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 px-4 bg-[#C84C35] text-[#F2E6DF] font-medium hover:bg-[#C84C35]/90 transition-colors flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#C84C35] focus:ring-offset-2"
                >
                  Next
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
