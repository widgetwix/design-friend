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

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        {/* Decorative element */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg"
        >
          <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-2xl font-bold text-gray-800 mb-2"
        >
          Vibe Check Complete!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-sm text-gray-500 mb-6"
        >
          Here's what we discovered about your style
        </motion.p>

        {/* Result card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl p-6 shadow-lg mb-8 text-left"
        >
          <p className="text-gray-700 leading-relaxed">
            {vibeCheckResult?.summary}
          </p>

          {/* Style tags */}
          {vibeCheckResult?.dominantStyles && (
            <div className="mt-4 flex flex-wrap gap-2">
              {vibeCheckResult.dominantStyles.map((style) => (
                <span
                  key={style}
                  className="px-3 py-1 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 rounded-full text-sm font-medium"
                >
                  {style}
                </span>
              ))}
            </div>
          )}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex justify-center gap-6 mb-8"
        >
          <div className="text-center">
            <p className="text-2xl font-bold text-indigo-600">{likedImages.length}</p>
            <p className="text-xs text-gray-500">Loved</p>
          </div>
          <div className="w-px bg-gray-200" />
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">{deepDiveImages.length}</p>
            <p className="text-xs text-gray-500">To explore</p>
          </div>
        </motion.div>

        {/* Continue button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleContinue}
          className="w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-xl shadow-lg"
        >
          {deepDiveImages.length > 0 ? 'Start Deep Dive' : 'See My Persona'}
        </motion.button>

        <p className="text-xs text-gray-400 mt-4">
          {deepDiveImages.length > 0
            ? "Let's explore what specifically caught your eye"
            : "We'll generate your unique design persona"
          }
        </p>
      </motion.div>
    </div>
  );
}
