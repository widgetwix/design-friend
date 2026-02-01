import { useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

export default function SwipeCard({ image, onSwipe, isTop }) {
  const [exitX, setExitX] = useState(0);
  const [exitY, setExitY] = useState(0);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0.5, 1, 1, 1, 0.5]);

  // Overlay opacity based on swipe direction
  const likeOpacity = useTransform(x, [0, 100], [0, 1]);
  const nopeOpacity = useTransform(x, [-100, 0], [1, 0]);
  const unsureOpacity = useTransform(y, [-100, 0], [1, 0]);

  const handleDragEnd = (event, info) => {
    const threshold = 100;
    const velocity = 500;

    // Swipe up (unsure)
    if (info.offset.y < -threshold || info.velocity.y < -velocity) {
      setExitY(-1000);
      onSwipe('up');
      return;
    }

    // Swipe right (like)
    if (info.offset.x > threshold || info.velocity.x > velocity) {
      setExitX(1000);
      onSwipe('right');
      return;
    }

    // Swipe left (dislike)
    if (info.offset.x < -threshold || info.velocity.x < -velocity) {
      setExitX(-1000);
      onSwipe('left');
      return;
    }

    // Return to center
    animate(x, 0, { type: 'spring', stiffness: 500, damping: 30 });
    animate(y, 0, { type: 'spring', stiffness: 500, damping: 30 });
  };

  if (!isTop) {
    return (
      <div
        className="absolute inset-0 border border-[#1A1A1A] overflow-hidden shadow-lg"
        style={{ transform: 'scale(0.95)', opacity: 0.7 }}
      >
        <img
          src={image.url}
          alt={image.description}
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  return (
    <motion.div
      className="absolute inset-0 border border-[#1A1A1A] overflow-hidden shadow-xl cursor-grab active:cursor-grabbing touch-none"
      style={{ x, y, rotate, opacity }}
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={1}
      onDragEnd={handleDragEnd}
      animate={{ x: exitX, y: exitY }}
      transition={{ duration: 0.3 }}
      aria-label={`Interior design image: ${image.description}`}
    >
      {/* Image */}
      <img
        src={image.url}
        alt={image.description}
        className="w-full h-full object-cover pointer-events-none"
        draggable={false}
      />

      {/* Like overlay */}
      <motion.div
        className="absolute inset-0 bg-[#C84C35]/30 flex items-center justify-center"
        style={{ opacity: likeOpacity }}
      >
        <div className="bg-[#C84C35] text-[#F2E6DF] px-6 py-3 text-2xl font-bold font-mono uppercase tracking-wider transform -rotate-12 border border-[#F2E6DF]">
          LIKE
        </div>
      </motion.div>

      {/* Nope overlay */}
      <motion.div
        className="absolute inset-0 bg-[#1A1A1A]/30 flex items-center justify-center"
        style={{ opacity: nopeOpacity }}
      >
        <div className="bg-[#1A1A1A] text-[#F2E6DF] px-6 py-3 text-2xl font-bold font-mono uppercase tracking-wider transform rotate-12 border border-[#F2E6DF]">
          NOPE
        </div>
      </motion.div>

      {/* Unsure overlay */}
      <motion.div
        className="absolute inset-0 bg-[#1A1A1A]/20 flex items-center justify-center"
        style={{ opacity: unsureOpacity }}
      >
        <div className="bg-[#F2E6DF] text-[#1A1A1A] px-4 py-3 text-xl font-bold font-mono uppercase tracking-wider border border-[#1A1A1A]">
          NOT SURE
        </div>
      </motion.div>
    </motion.div>
  );
}
