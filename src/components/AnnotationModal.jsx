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
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="e.g., I love the velvet texture, the warm lighting..."
                className="w-full h-28 p-4 border border-[#1A1A1A] bg-transparent resize-none focus:outline-none focus:ring-1 focus:ring-[#C84C35] text-[#1A1A1A]"
                autoFocus
              />

              <div className="flex gap-3 mt-4">
                <button
                  type="button"
                  onClick={handleSkip}
                  className="flex-1 py-3 px-4 border border-[#1A1A1A] text-[#1A1A1A] font-medium hover:bg-[#1A1A1A]/5 transition-colors"
                >
                  Skip
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 px-4 bg-[#1A1A1A] text-[#F2E6DF] font-medium hover:bg-[#1A1A1A]/90 transition-opacity"
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
