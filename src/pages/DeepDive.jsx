import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';

const MAX_CHARS = 150;

export default function DeepDive() {
  const {
    deepDiveImages,
    deepDiveIndex,
    addAnnotation,
    nextDeepDiveImage,
    annotations,
    swipeResults,
    setStage
  } = useApp();

  const [pinPosition, setPinPosition] = useState(null);
  const [note, setNote] = useState('');
  const imageRef = useRef(null);

  const currentImage = deepDiveImages[deepDiveIndex];

  // Check if current image already has an annotation
  const existingAnnotation = annotations.find(a => a.imageId === currentImage?.id);

  const handleImageClick = (e) => {
    if (!imageRef.current) return;

    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setPinPosition({ x, y });
  };

  const handleNoteChange = (e) => {
    const value = e.target.value;
    if (value.length <= MAX_CHARS) {
      setNote(value);
    }
  };

  const handleNext = () => {
    if (pinPosition) {
      addAnnotation(currentImage.id, pinPosition.x, pinPosition.y, note.trim());
    } else if (!existingAnnotation) {
      // Auto-add center annotation if no pin placed
      addAnnotation(currentImage.id, 50, 50, note.trim());
    }
    setPinPosition(null);
    setNote('');
    nextDeepDiveImage();
  };

  if (!currentImage) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#F2E6DF] flex flex-col">
      {/* Header */}
      <header className="pt-8 px-4 pb-4">
        <div className="flex items-center">
          <button
            onClick={() => setStage('discovery')}
            aria-label="Go back"
            className="p-2 -ml-2 text-[#1A1A1A] hover:bg-[#1A1A1A]/5 transition-colors focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] focus:ring-offset-2"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="flex-1 text-center text-lg font-semibold text-[#1A1A1A]">
            Deep Dive
          </h1>
          <div className="w-10" /> {/* Spacer for centering */}
        </div>
      </header>

      {/* Image area */}
      <div className="flex-1 px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImage.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="relative w-full aspect-square overflow-hidden rounded-lg shadow-lg"
          >
            <img
              ref={imageRef}
              src={currentImage.url}
              alt={currentImage.description}
              className="w-full h-full object-cover cursor-crosshair"
              onClick={handleImageClick}
              draggable={false}
            />

            {/* Existing pin */}
            {existingAnnotation && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute pointer-events-none"
                style={{
                  left: `${existingAnnotation.x}%`,
                  top: `${existingAnnotation.y}%`,
                  transform: 'translate(-50%, -100%)'
                }}
              >
                <div className="w-6 h-6 bg-[#C84C35] rounded-full border-2 border-white shadow-lg" />
                <div className="w-0.5 h-3 bg-[#C84C35] mx-auto -mt-0.5" />
              </motion.div>
            )}

            {/* New pin preview */}
            {pinPosition && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute pointer-events-none"
                style={{
                  left: `${pinPosition.x}%`,
                  top: `${pinPosition.y}%`,
                  transform: 'translate(-50%, -100%)'
                }}
              >
                <div className="w-6 h-6 bg-[#C84C35] rounded-full border-2 border-white shadow-lg animate-pulse" />
                <div className="w-0.5 h-3 bg-[#C84C35] mx-auto -mt-0.5" />
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Sheet */}
      <div className="bg-[#F2E6DF] p-4 pb-8">
        <h2 className="text-xl font-bold text-[#1A1A1A] font-headline mb-4">
          Why did this catch your eye?
        </h2>

        <div className="relative mb-6">
          <textarea
            value={note}
            onChange={handleNoteChange}
            placeholder="I love the velvet texture..."
            className="w-full h-24 p-4 border border-[#1A1A1A]/20 bg-white rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#C84C35] focus:border-transparent text-[#1A1A1A] placeholder:text-[#1A1A1A]/40"
            maxLength={MAX_CHARS}
          />
          <span className="absolute bottom-3 right-3 text-xs font-mono text-[#1A1A1A]/40">
            {note.length}/{MAX_CHARS}
          </span>
        </div>

        <button
          onClick={handleNext}
          className="w-full py-4 bg-[#C84C35] text-[#F2E6DF] font-semibold rounded-lg hover:bg-[#C84C35]/90 transition-colors flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#C84C35] focus:ring-offset-2"
        >
          Next
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </div>
  );
}
