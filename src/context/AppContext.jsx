import { createContext, useContext, useState, useCallback } from 'react';
import designImages from '../data/images';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  // Current app stage: 'discovery' | 'vibeCheck' | 'deepDive' | 'persona' | 'inspiration' | 'profile'
  const [stage, setStage] = useState('discovery');

  // Swipe results: { imageId: 'like' | 'dislike' | 'unsure' }
  const [swipeResults, setSwipeResults] = useState({});

  // Current image index for discovery phase
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Annotations for deep dive: [{ imageId, x, y, note }]
  const [annotations, setAnnotations] = useState([]);

  // Current deep dive image index
  const [deepDiveIndex, setDeepDiveIndex] = useState(0);

  // Vibe check result
  const [vibeCheckResult, setVibeCheckResult] = useState(null);

  // Design persona result
  const [designPersona, setDesignPersona] = useState(null);

  // Bookmarked images
  const [bookmarks, setBookmarks] = useState([]);

  // Loading states
  const [isLoading, setIsLoading] = useState(false);

  // Get all images
  const images = designImages;

  // Get liked images (for deep dive and inspiration board)
  const likedImages = images.filter(
    img => swipeResults[img.id] === 'like'
  );

  // Get images for deep dive (liked + unsure)
  const deepDiveImages = images.filter(
    img => swipeResults[img.id] === 'like' || swipeResults[img.id] === 'unsure'
  );

  // Handle swipe action
  const handleSwipe = useCallback((direction) => {
    const currentImage = images[currentImageIndex];
    let result;

    switch (direction) {
      case 'right':
        result = 'like';
        break;
      case 'left':
        result = 'dislike';
        break;
      case 'up':
        result = 'unsure';
        break;
      default:
        return;
    }

    setSwipeResults(prev => ({
      ...prev,
      [currentImage.id]: result
    }));

    // Move to next image or trigger vibe check
    if (currentImageIndex < images.length - 1) {
      setCurrentImageIndex(prev => prev + 1);
    } else {
      setStage('vibeCheck');
    }
  }, [currentImageIndex, images]);

  // Add annotation
  const addAnnotation = useCallback((imageId, x, y, note) => {
    setAnnotations(prev => [
      ...prev.filter(a => a.imageId !== imageId), // Replace existing annotation for this image
      { imageId, x, y, note }
    ]);
  }, []);

  // Toggle bookmark
  const toggleBookmark = useCallback((imageId) => {
    setBookmarks(prev => {
      if (prev.includes(imageId)) {
        return prev.filter(id => id !== imageId);
      }
      return [...prev, imageId];
    });
  }, []);

  // Reset quiz (keep bookmarks)
  const resetQuiz = useCallback(() => {
    setStage('discovery');
    setSwipeResults({});
    setCurrentImageIndex(0);
    setAnnotations([]);
    setDeepDiveIndex(0);
    setVibeCheckResult(null);
    setDesignPersona(null);
  }, []);

  // Go to next deep dive image
  const nextDeepDiveImage = useCallback(() => {
    if (deepDiveIndex < deepDiveImages.length - 1) {
      setDeepDiveIndex(prev => prev + 1);
    } else {
      setStage('persona');
    }
  }, [deepDiveIndex, deepDiveImages.length]);

  const value = {
    // State
    stage,
    setStage,
    swipeResults,
    currentImageIndex,
    annotations,
    deepDiveIndex,
    vibeCheckResult,
    setVibeCheckResult,
    designPersona,
    setDesignPersona,
    bookmarks,
    isLoading,
    setIsLoading,

    // Derived data
    images,
    likedImages,
    deepDiveImages,
    currentImage: images[currentImageIndex],
    currentDeepDiveImage: deepDiveImages[deepDiveIndex],
    progress: currentImageIndex + 1,
    totalImages: images.length,

    // Actions
    handleSwipe,
    addAnnotation,
    toggleBookmark,
    resetQuiz,
    nextDeepDiveImage,
    setDeepDiveIndex
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

export default AppContext;
