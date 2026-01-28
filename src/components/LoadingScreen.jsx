import { motion } from 'framer-motion';

export default function LoadingScreen({ message = 'Analyzing your style...' }) {
  return (
    <div className="fixed inset-0 bg-[#F2E6DF] flex flex-col items-center justify-center p-8">
      {/* Animated circles */}
      <div className="relative w-24 h-24 mb-8">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute inset-0 border-2 border-[#1A1A1A]"
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.5,
              ease: 'easeOut'
            }}
          />
        ))}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="w-12 h-12 bg-[#1A1A1A]"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        </div>
      </div>

      {/* Loading text */}
      <motion.p
        className="text-lg font-medium text-[#1A1A1A] text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {message}
      </motion.p>

      {/* Animated dots */}
      <div className="flex gap-1 mt-4">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-[#C84C35]"
            animate={{ y: [-3, 3, -3] }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.15
            }}
          />
        ))}
      </div>
    </div>
  );
}
