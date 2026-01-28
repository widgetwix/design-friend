import { useApp } from '../context/AppContext';
import SwipeCard from '../components/SwipeCard';
import ProgressBar from '../components/ProgressBar';
import { motion } from 'framer-motion';

export default function DiscoveryFeed() {
  const { images, currentImageIndex, handleSwipe, progress, totalImages } = useApp();

  // Show current and next card
  const visibleCards = images.slice(currentImageIndex, currentImageIndex + 2).reverse();

  return (
    <div className="min-h-screen bg-[#F2E6DF] flex flex-col">
      {/* Header */}
      <header className="pt-12 pb-4 px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <h1 className="text-2xl font-bold text-[#1A1A1A] font-headline">Design Friend</h1>
          <p className="text-sm text-[#1A1A1A]/60 mt-1 font-mono uppercase tracking-wider">Discover your interior style</p>
        </motion.div>
        <ProgressBar current={progress} total={totalImages} />
      </header>

      {/* Card Stack */}
      <div className="flex-1 px-4 pb-4 flex items-center justify-center">
        <div className="relative w-full max-w-sm aspect-[3/4]">
          {visibleCards.map((image, index) => (
            <SwipeCard
              key={image.id}
              image={image}
              isTop={index === visibleCards.length - 1}
              onSwipe={handleSwipe}
            />
          ))}

          {/* Empty state */}
          {visibleCards.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-[#1A1A1A]/40">No more images</p>
            </div>
          )}
        </div>
      </div>

      {/* Action hints */}
      <div className="pb-8 px-4">
        <div className="flex justify-center gap-8 text-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col items-center"
          >
            <div className="w-12 h-12 border border-[#1A1A1A] bg-transparent flex items-center justify-center mb-2">
              <svg className="w-6 h-6 text-[#1A1A1A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <span className="text-xs text-[#1A1A1A]/60 font-mono uppercase tracking-wider">Left</span>
            <span className="text-xs font-medium text-[#1A1A1A]">Not for me</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col items-center"
          >
            <div className="w-12 h-12 border border-[#1A1A1A] bg-transparent flex items-center justify-center mb-2">
              <svg className="w-6 h-6 text-[#1A1A1A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-xs text-[#1A1A1A]/60 font-mono uppercase tracking-wider">Up</span>
            <span className="text-xs font-medium text-[#1A1A1A]">Not sure</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col items-center"
          >
            <div className="w-12 h-12 border border-[#C84C35] bg-[#C84C35]/10 flex items-center justify-center mb-2">
              <svg className="w-6 h-6 text-[#C84C35]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <span className="text-xs text-[#1A1A1A]/60 font-mono uppercase tracking-wider">Right</span>
            <span className="text-xs font-medium text-[#C84C35]">Love it!</span>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
