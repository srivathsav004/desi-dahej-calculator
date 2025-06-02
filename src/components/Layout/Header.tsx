import React from 'react';
import { motion } from 'framer-motion';
import { IndianRupee } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-maroon to-maroon-dark text-ivory py-6 md:py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-mandala-pattern opacity-10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          <div className="flex items-center gap-3 mb-3">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="bg-gold rounded-full p-2"
            >
              <IndianRupee size={32} className="text-maroon" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-baloo font-bold">
              Desi Dahej Calculator
            </h1>
          </div>
          
          <p className="text-xl md:text-2xl text-center font-medium max-w-2xl mb-6">
            A satirical tool to calculate the "value" of marriage in our society
          </p>
          
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 border border-white/30">
            <p className="text-center italic">
              <span className="font-bold">Disclaimer:</span> This is a satirical app meant to highlight the absurdity of dowry. We strongly oppose the practice of dowry in all forms.
            </p>
          </div>
        </motion.div>
      </div>
    </header>
  );
};

export default Header;