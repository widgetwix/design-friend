import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { generateDesignPersona } from '../services/ai';
import LoadingScreen from '../components/LoadingScreen';
import Navigation from '../components/Navigation';

export default function DesignPersona() {
  const { likedImages, annotations, designPersona, setDesignPersona, setStage } = useApp();
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('summary');

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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 pb-24">
      {/* Header */}
      <header className="pt-12 px-4 pb-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <p className="text-sm text-indigo-600 font-medium mb-2">Your Design Persona</p>
          <h1 className="text-3xl font-bold text-gray-800">
            {designPersona.styleName}
          </h1>
        </motion.div>
      </header>

      {/* Style visual */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="px-4 mb-6"
      >
        <div className="relative h-32 rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex -space-x-4">
              {likedImages.slice(0, 4).map((img, i) => (
                <motion.img
                  key={img.id}
                  src={img.url}
                  alt=""
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                />
              ))}
              {likedImages.length > 4 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                  className="w-16 h-16 rounded-full bg-white/90 border-4 border-white shadow-lg flex items-center justify-center"
                >
                  <span className="text-sm font-bold text-gray-600">+{likedImages.length - 4}</span>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Section tabs */}
      <div className="px-4 mb-4">
        <div className="flex bg-gray-100 rounded-xl p-1">
          {[
            { id: 'summary', label: 'Summary' },
            { id: 'shopping', label: 'Shop Keywords' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id)}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                activeSection === tab.id
                  ? 'bg-white text-gray-800 shadow-sm'
                  : 'text-gray-500'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="px-4">
        {activeSection === 'summary' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 shadow-sm"
          >
            {/* Style tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {designPersona.dominantStyles?.map((style) => (
                <span
                  key={style}
                  className="px-3 py-1 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 rounded-full text-sm font-medium"
                >
                  {style}
                </span>
              ))}
            </div>

            {/* Summary text */}
            <div className="space-y-4">
              {designPersona.summary.split('\n\n').map((paragraph, i) => (
                <p key={i} className="text-gray-700 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Top characteristics */}
            {designPersona.topTags && (
              <div className="mt-6 pt-6 border-t border-gray-100">
                <h3 className="text-sm font-semibold text-gray-800 mb-3">Key Characteristics</h3>
                <div className="flex flex-wrap gap-2">
                  {designPersona.topTags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}

        {activeSection === 'shopping' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <p className="text-sm text-gray-500 mb-4">
              Copy these long-tail search terms to find furniture and decor that matches your style:
            </p>
            {designPersona.shoppingKeywords?.map((keyword, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-xl p-4 shadow-sm flex items-center justify-between group hover:shadow-md transition-shadow"
              >
                <span className="text-gray-700 flex-1">{keyword}</span>
                <button
                  onClick={() => navigator.clipboard.writeText(keyword)}
                  className="ml-2 p-2 text-gray-400 hover:text-indigo-600 transition-colors"
                  title="Copy to clipboard"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* View Inspiration Board button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="px-4 mt-8"
      >
        <button
          onClick={() => setStage('inspiration')}
          className="w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-xl shadow-lg"
        >
          View Inspiration Board
        </button>
      </motion.div>

      <Navigation />
    </div>
  );
}
