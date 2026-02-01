import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { generateVibeCheck } from '../services/ai';
import LoadingScreen from '../components/LoadingScreen';

export default function VibeCheck() {
  const { likedImages, setVibeCheckResult, vibeCheckResult, setStage, deepDiveImages } = useApp();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const analyze = async () => {
      if (!vibeCheckResult) {
        const result = await generateVibeCheck(likedImages);
        setVibeCheckResult(result);
      }
      setIsLoading(false);
    };
    analyze();
  }, [likedImages, setVibeCheckResult, vibeCheckResult]);

  if (isLoading) {
    return <LoadingScreen message="Analyzing your style preferences..." />;
  }

  const handleContinue = () => {
    if (deepDiveImages.length > 0) {
      setStage('deepDive');
    } else {
      setStage('persona');
    }
  };

  const handleClose = () => {
    setStage('discovery');
  };

  // Get 4 images for the collage
  const collageImages = likedImages.slice(0, 4);

  return (
    <div className="min-h-screen bg-[#F2E6DF] flex flex-col">
      {/* Header */}
      <header className="pt-8 px-4 pb-4">
        <div className="flex items-center justify-between">
          <button
            onClick={handleClose}
            aria-label="Close"
            className="p-2 -ml-2 text-[#1A1A1A]/60 hover:text-[#1A1A1A] transition-colors focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] focus:ring-offset-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <span className="text-xs font-mono uppercase tracking-wider text-[#1A1A1A]/60">
            Analysis Complete
          </span>
          <button
            aria-label="More options"
            className="p-2 -mr-2 text-[#1A1A1A]/60 hover:text-[#1A1A1A] transition-colors focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] focus:ring-offset-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-8">
        {/* Image Collage */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-xs mb-8"
        >
          <div className="grid grid-cols-2 gap-1 border border-[#1A1A1A]">
            {collageImages.map((image, index) => (
              <div key={image.id} className="aspect-square overflow-hidden">
                <img
                  src={image.url}
                  alt={image.description}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
            {/* Fill empty slots if less than 4 images */}
            {Array.from({ length: Math.max(0, 4 - collageImages.length) }).map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square bg-[#1A1A1A]/10" />
            ))}
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-bold text-[#1A1A1A] font-headline mb-4 text-center"
        >
          The Vibe Check
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-[#1A1A1A]/70 text-center leading-relaxed mb-8 max-w-xs"
        >
          {vibeCheckResult?.summary ||
            `You lean towards ${vibeCheckResult?.dominantStyles?.[0] || 'modern'} aesthetics with touches of ${vibeCheckResult?.dominantStyles?.[1] || 'minimalist'} influence. Your preference for clean lines and natural materials is clear.`
          }
        </motion.p>

        {/* Continue button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleContinue}
          className="w-full max-w-xs py-4 bg-[#C84C35] text-[#F2E6DF] font-mono uppercase tracking-wider text-sm hover:bg-[#C84C35]/90 transition-colors focus:outline-none focus:ring-2 focus:ring-[#C84C35] focus:ring-offset-2"
        >
          Continue to Deep Dive
        </motion.button>
      </div>
    </div>
  );
}
