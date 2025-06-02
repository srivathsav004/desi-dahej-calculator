import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MEMES } from '../../utils/constants';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface MemeDisplayProps {
  show: boolean;
}

const MemeDisplay: React.FC<MemeDisplayProps> = ({ show }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (show) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % MEMES.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [show]);

  if (!show) return null;

  const nextMeme = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % MEMES.length);
  };

  const prevMeme = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + MEMES.length) % MEMES.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="card mb-6"
    >
      <h2 className="card-header">Dahej Memes</h2>
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <img
              src={MEMES[currentIndex].url}
              alt="Dowry Meme"
              className="w-full max-w-md h-64 object-cover rounded-lg mb-4"
            />
            <p className="text-center text-maroon italic">{MEMES[currentIndex].caption}</p>
          </motion.div>
        </AnimatePresence>

        <button
          onClick={prevMeme}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 bg-white/80 rounded-full shadow-md"
          aria-label="Previous meme"
        >
          <ChevronLeft className="text-maroon" />
        </button>

        <button
          onClick={nextMeme}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 bg-white/80 rounded-full shadow-md"
          aria-label="Next meme"
        >
          <ChevronRight className="text-maroon" />
        </button>
      </div>
    </motion.div>
  );
};

export default MemeDisplay;