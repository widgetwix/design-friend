import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import AnnotationModal from '../components/AnnotationModal';

export default function DeepDive() {
  const {
    deepDiveImages,
    deepDiveIndex,
    addAnnotation,
    nextDeepDiveImage,
    annotations,
    swipeResults
  } = useApp();

  const [pinPosition, setPinPosition] = useState(null);
  const [showModal, setShowModal] = useState(false);
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
    setShowModal(true);
  };

  const handleAnnotationSubmit = (note) => {
    if (pinPosition) {
      addAnnotation(currentImage.id, pinPosition.x, pinPosition.y, note);
    }
    setShowModal(false);
    setPinPosition(null);
  };

  const handleNext = () => {
    setPinPosition(null);
    nextDeepDiveImage();
  };

  const handleSkip = () => {
    addAnnotation(currentImage.id, 50, 50, '');
    handleNext();
  };

  if (!currentImage) {
    return null;
  }

  const isLiked = swipeResults[currentImage.id] === 'like';
  const isUnsure = swipeResults[currentImage.id] === 'unsure';

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-10 pt-12 px-4">
        <div className="flex items-center justify-between text-white">
          <div>
            <h1 className="text-lg font-semibold">Deep Dive</h1>
            <p className="text-sm text-white/60">
              {deepDiveIndex + 1} of {deepDiveImages.length}
            </p>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            isLiked ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
          }`}>
            {isLiked ? 'Loved' : 'Unsure'}
          </span>
        </div>

        {/* Progress bar */}
        <div className="mt-4 h-1 bg-white/20 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
            initial={{ width: 0 }}
            animate={{ width: `${((deepDiveIndex + 1) / deepDiveImages.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </header>

      {/* Image area */}
      <div className="flex-1 flex items-center justify-center p-4 pt-28">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImage.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-md aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl"
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
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <div className="w-8 h-8 bg-indigo-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </motion.div>
            )}

            {/* New pin preview */}
            {pinPosition && !showModal && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute pointer-events-none"
                style={{
                  left: `${pinPosition.x}%`,
                  top: `${pinPosition.y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <div className="w-8 h-8 bg-purple-500 rounded-full border-4 border-white shadow-lg animate-pulse" />
              </motion.div>
            )}

            {/* Tap hint overlay */}
            {!existingAnnotation && !pinPosition && (
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center pointer-events-none">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg"
                >
                  <p className="text-sm font-medium text-gray-800">
                    Tap on what caught your eye
                  </p>
                </motion.div>
              </div>
            )}

            {/* Style badge */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="bg-black/50 backdrop-blur-sm rounded-xl p-3">
                <span className="text-white/80 text-xs">{currentImage.style}</span>
                <p className="text-white text-sm mt-1">{currentImage.description}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Action buttons */}
      <div className="p-4 pb-8 flex gap-3">
        <button
          onClick={handleSkip}
          className="flex-1 py-4 bg-white/10 text-white rounded-xl font-medium hover:bg-white/20 transition-colors"
        >
          Skip
        </button>
        <button
          onClick={handleNext}
          disabled={!existingAnnotation}
          className={`flex-1 py-4 rounded-xl font-medium transition-all ${
            existingAnnotation
              ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white'
              : 'bg-white/5 text-white/30 cursor-not-allowed'
          }`}
        >
          {deepDiveIndex < deepDiveImages.length - 1 ? 'Next' : 'Finish'}
        </button>
      </div>

      {/* Annotation Modal */}
      <AnnotationModal
        isOpen={showModal}
        position={pinPosition}
        onClose={() => {
          setShowModal(false);
          setPinPosition(null);
        }}
        onSubmit={handleAnnotationSubmit}
      />
    </div>
  );
}
