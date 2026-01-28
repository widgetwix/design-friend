import { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import BookmarkButton from '../components/BookmarkButton';
import Navigation from '../components/Navigation';

export default function InspirationBoard() {
  const { likedImages, bookmarks, toggleBookmark, annotations } = useApp();
  const [selectedImage, setSelectedImage] = useState(null);

  const getAnnotation = (imageId) => annotations.find(a => a.imageId === imageId);

  return (
    <div className="min-h-screen bg-[#F2E6DF] pb-24">
      {/* Header */}
      <header className="pt-12 px-4 pb-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl font-bold text-[#1A1A1A] font-headline">Inspiration Board</h1>
          <p className="text-sm text-[#1A1A1A]/60 mt-1 font-mono">
            {likedImages.length} images you loved
          </p>
        </motion.div>
      </header>

      {/* Masonry Grid */}
      <div className="px-4">
        <div className="masonry-grid">
          {likedImages.map((image, index) => {
            const annotation = getAnnotation(image.id);
            const isBookmarked = bookmarks.includes(image.id);

            return (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="masonry-item"
              >
                <div
                  className="relative border border-[#1A1A1A] overflow-hidden cursor-pointer group"
                  onClick={() => setSelectedImage(image)}
                >
                  <img
                    src={image.url}
                    alt={image.description}
                    className="w-full object-cover"
                    style={{ aspectRatio: index % 3 === 0 ? '3/4' : '4/3' }}
                  />

                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  {/* Bookmark button */}
                  <div className="absolute top-2 right-2">
                    <BookmarkButton
                      isBookmarked={isBookmarked}
                      onClick={() => toggleBookmark(image.id)}
                    />
                  </div>

                  {/* Style badge */}
                  <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="inline-block px-2 py-1 bg-[#F2E6DF] text-xs font-mono uppercase tracking-wider text-[#1A1A1A]">
                      {image.style}
                    </span>
                  </div>

                  {/* Annotation indicator */}
                  {annotation && annotation.note && (
                    <div className="absolute top-2 left-2">
                      <div className="w-6 h-6 bg-[#C84C35] flex items-center justify-center shadow-md">
                        <svg className="w-3 h-3 text-[#F2E6DF]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Image detail modal */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-[#1A1A1A]/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="relative max-w-lg w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-[#F2E6DF]/80 hover:text-[#F2E6DF]"
            >
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Image */}
            <img
              src={selectedImage.url}
              alt={selectedImage.description}
              className="w-full border border-[#F2E6DF]/30"
            />

            {/* Annotation pin */}
            {getAnnotation(selectedImage.id) && (
              <div
                className="absolute"
                style={{
                  left: `${getAnnotation(selectedImage.id).x}%`,
                  top: `${getAnnotation(selectedImage.id).y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <div className="w-8 h-8 bg-[#C84C35] border-2 border-[#F2E6DF] shadow-lg animate-pulse" />
              </div>
            )}

            {/* Info card */}
            <div className="mt-4 bg-[#F2E6DF] border border-[#1A1A1A] p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-1 bg-[#1A1A1A] text-[#F2E6DF] text-xs font-mono uppercase tracking-wider">
                  {selectedImage.style}
                </span>
                <BookmarkButton
                  isBookmarked={bookmarks.includes(selectedImage.id)}
                  onClick={() => toggleBookmark(selectedImage.id)}
                />
              </div>
              <p className="text-[#1A1A1A] text-sm">{selectedImage.description}</p>

              {/* User annotation */}
              {getAnnotation(selectedImage.id)?.note && (
                <div className="mt-3 pt-3 border-t border-[#1A1A1A]/20">
                  <p className="text-xs text-[#1A1A1A]/40 mb-1 font-mono uppercase">Your note:</p>
                  <p className="text-[#1A1A1A]/80 text-sm italic">
                    "{getAnnotation(selectedImage.id).note}"
                  </p>
                </div>
              )}

              {/* Tags */}
              <div className="mt-3 flex flex-wrap gap-1">
                {selectedImage.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 border border-[#1A1A1A]/30 text-[#1A1A1A]/60 text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      <Navigation />
    </div>
  );
}
