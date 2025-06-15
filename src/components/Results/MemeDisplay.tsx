import React from 'react';
import { motion } from 'framer-motion';
import { formatCurrency } from '../../utils/calculations';

interface MemeDisplayProps {
  total: number;
}

const MemeDisplay: React.FC<MemeDisplayProps> = ({ total }) => {
  const getMemeText = () => {
    const absTotal = Math.abs(total);
    if (absTotal < 1000000) {
      return "Budget Wedding: You're getting a discount groom! At least he's not a scammer!";
    } else if (absTotal < 5000000) {
      return "Mid-range package: Includes one groom with average expectations! And his mother's wishlist!";
    } else if (absTotal < 10000000) {
      return "Premium Package: Gold-plated groom with extra demands! Comes with a lifetime supply of drama!";
    } else {
      return "Ultra Luxury Package: Does the groom come with superpowers? Or just super expectations?";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-6 p-4 bg-ivory rounded-lg border border-gold"
    >
      <h4 className="text-lg font-baloo mb-2 text-maroon">Meme Corner</h4>
      <div className="space-y-4">
        <div className="text-center">
          <p className="text-xl font-medium">{getMemeText()}</p>
        </div>
        <div className="flex justify-center">
            <img
            src={`https://api.memegen.link/images/custom/${encodeURIComponent(
              getMemeText()
            )}.png?background=https://i.imgur.com/CZyQxqD.jpg`}
              alt="Dowry Meme"
            className="max-w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default MemeDisplay;