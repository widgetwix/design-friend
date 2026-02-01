import { useApp } from '../context/AppContext';
import SwipeCard from '../components/SwipeCard';
import { motion } from 'framer-motion';

export default function DiscoveryFeed() {
  const { images, currentImageIndex, handleSwipe, progress, totalImages } = useApp();

  // Show current and next card
  const visibleCards = images.slice(currentImageIndex, currentImageIndex + 2).reverse();
  const currentImage = images[currentImageIndex];

  return (
    <div className="min-h-screen bg-[#F2E6DF] flex flex-col">
      {/* Header */}
      <header className="pt-12 pb-4 px-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-[#1A1A1A] font-headline">Design Friend</h1>
          <div className="text-right">
            <p className="text-xs text-[#1A1A1A]/60 font-mono uppercase tracking-wider">Discovering your style</p>
            <p className="text-sm font-mono text-[#1A1A1A]">{String(progress).padStart(2, '0')} / {totalImages}</p>
          </div>
        </div>
        {/* Progress bar */}
        <div className="w-full h-1 bg-[#1A1A1A]/10">
          <motion.div
            className="h-full bg-[#C84C35]"
            initial={{ width: 0 }}
            animate={{ width: `${(progress / totalImages) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </header>

      {/* Card Stack */}
      <div className="flex-1 px-4 flex flex-col">
        <div className="relative w-full max-w-sm mx-auto aspect-[3/4]">
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
            <div className="absolute inset-0 flex items-center justify-center border border-[#1A1A1A]">
              <p className="text-[#1A1A1A]/40 font-mono">No more images</p>
            </div>
          )}
        </div>

        {/* Style Info - Below Card */}
        {currentImage && (
          <motion.div
            key={currentImage.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-sm mx-auto w-full mt-4 px-4"
          >
            <h2 className="text-xl font-bold text-[#1A1A1A] font-headline uppercase tracking-wide">
              {currentImage.style}
            </h2>
            <p className="text-sm text-[#1A1A1A]/70 mt-2 leading-relaxed">
              {currentImage.description}
            </p>
          </motion.div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="pb-8 pt-4 px-4">
        <div className="flex justify-center gap-4 max-w-sm mx-auto">
          {/* Dislike Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSwipe('left')}
            aria-label="Dislike"
            className="w-16 h-16 border border-[#1A1A1A] bg-[#F2E6DF] flex items-center justify-center hover:bg-[#1A1A1A]/5 transition-colors focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] focus:ring-offset-2"
          >
            <svg className="w-7 h-7 text-[#1A1A1A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </motion.button>

          {/* Unsure Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSwipe('up')}
            aria-label="Unsure"
            className="w-16 h-16 border border-[#1A1A1A] bg-[#F2E6DF] flex items-center justify-center hover:bg-[#1A1A1A]/5 transition-colors focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] focus:ring-offset-2"
          >
            <svg className="w-7 h-7 text-[#1A1A1A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </motion.button>

          {/* Like Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSwipe('right')}
            aria-label="Like"
            className="w-16 h-16 border border-[#C84C35] bg-[#C84C35] flex items-center justify-center hover:bg-[#C84C35]/90 transition-colors focus:outline-none focus:ring-2 focus:ring-[#C84C35] focus:ring-offset-2"
          >
            <svg className="w-7 h-7 text-[#F2E6DF]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </motion.button>
        </div>

        {/* Action Labels */}
        <div className="flex justify-center gap-4 max-w-sm mx-auto mt-2">
          <span className="w-16 text-center text-xs text-[#1A1A1A]/60 font-mono uppercase tracking-wider">Dislike</span>
          <span className="w-16 text-center text-xs text-[#1A1A1A]/60 font-mono uppercase tracking-wider">Unsure</span>
          <span className="w-16 text-center text-xs text-[#C84C35] font-mono uppercase tracking-wider">Like</span>
        </div>
      </div>
    </div>
  );
}
