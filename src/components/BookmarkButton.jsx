import { motion } from 'framer-motion';

export default function BookmarkButton({ isBookmarked, onClick }) {
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className="p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-md"
    >
      <motion.svg
        animate={{ scale: isBookmarked ? [1, 1.3, 1] : 1 }}
        transition={{ duration: 0.3 }}
        className={`w-5 h-5 transition-colors ${
          isBookmarked ? 'text-indigo-600 fill-indigo-600' : 'text-gray-600'
        }`}
        fill={isBookmarked ? 'currentColor' : 'none'}
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
        />
      </motion.svg>
    </motion.button>
  );
}
