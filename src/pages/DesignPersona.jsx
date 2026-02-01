import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { generateDesignPersona } from '../services/ai';
import LoadingScreen from '../components/LoadingScreen';
import Navigation from '../components/Navigation';

export default function DesignPersona() {
  const { likedImages, annotations, designPersona, setDesignPersona, setStage } = useApp();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const generate = async () => {
      if (!designPersona) {
        const result = await generateDesignPersona(likedImages, annotations);
        setDesignPersona(result);
      }
      setIsLoading(false);
    };
    generate();
  }, [likedImages, annotations, designPersona, setDesignPersona]);

  if (isLoading) {
    return <LoadingScreen message="Creating your design persona..." />;
  }

  if (!designPersona) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#F2E6DF] pb-24">
      {/* Header with Back Arrow */}
      <header className="pt-8 px-4 pb-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setStage('vibeCheck')}
            aria-label="Go back"
            className="p-2 -ml-2 text-[#1A1A1A] hover:bg-[#1A1A1A]/5 transition-colors focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] focus:ring-offset-2"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span className="text-sm font-mono uppercase tracking-wider text-[#1A1A1A]/60">Persona Result</span>
          <div className="w-10" /> {/* Spacer for centering */}
        </div>
      </header>

      {/* Hero Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="px-4 mb-6"
      >
        {likedImages.length > 0 && (
          <div className="relative aspect-[4/3] border border-[#1A1A1A] overflow-hidden">
            <img
              src={likedImages[0].url}
              alt="Your design style"
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </motion.div>

      {/* Persona Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="px-4"
      >
        <p className="text-xs font-mono uppercase tracking-wider text-[#1A1A1A]/60 mb-2">
          Your Design DNA
        </p>
        <h1 className="text-3xl font-bold text-[#1A1A1A] font-headline mb-4">
          {designPersona.styleName}
        </h1>

        {/* Summary */}
        <div className="space-y-4 mb-6">
          {designPersona.summary.split('\n\n').map((paragraph, i) => (
            <p key={i} className="text-[#1A1A1A]/80 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Shopping Keywords */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-[#1A1A1A] mb-3 flex items-center gap-2">
            <svg className="w-4 h-4 text-[#C84C35]" fill="currentColor" viewBox="0 0 20 20">
              <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
              <path fillRule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
            Shopping Keywords
          </h3>
          <div className="flex flex-wrap gap-2">
            {designPersona.shoppingKeywords?.slice(0, 6).map((keyword, i) => (
              <button
                key={i}
                onClick={() => navigator.clipboard.writeText(keyword)}
                className="px-3 py-2 bg-[#1A1A1A]/5 border border-[#1A1A1A]/20 text-sm text-[#1A1A1A] hover:bg-[#1A1A1A]/10 transition-colors"
                title="Click to copy"
              >
                {keyword}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="px-4 space-y-3"
      >
        <button
          onClick={() => {
            // Save persona logic - could store to localStorage or context
            alert('Persona saved!');
          }}
          className="w-full py-4 bg-[#C84C35] text-[#F2E6DF] font-semibold hover:bg-[#C84C35]/90 transition-colors focus:outline-none focus:ring-2 focus:ring-[#C84C35] focus:ring-offset-2"
        >
          Save Persona
        </button>
        <button
          onClick={() => setStage('inspiration')}
          className="w-full py-4 border border-[#1A1A1A] text-[#1A1A1A] font-semibold hover:bg-[#1A1A1A]/5 transition-colors flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] focus:ring-offset-2"
        >
          View Board
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </motion.div>

      <Navigation />
    </div>
  );
}
