import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DowryCalculatorInputs } from '../../types';
import GroomSection from './GroomSection';
import BrideSection from './BrideSection';
import AdditionalInputs from './AdditionalInputs';
import { ArrowDownCircle, Calculator as Calculate } from 'lucide-react';

interface CalculatorProps {
  onCalculate: (inputs: DowryCalculatorInputs) => void;
}

const Calculator: React.FC<CalculatorProps> = ({ onCalculate }) => {
  const [formData, setFormData] = useState<DowryCalculatorInputs>({
    groom: {
      qualification: '',
      jobTitle: '',
      monthlySalary: 50000,
      workingAbroad: false,
      carOwned: 'None',
      complexion: 'Wheatish',
      height: 175,
    },
    bride: {
      qualification: '',
      working: false,
      siblings: 1,
      cookingSkills: 3,
      caste: '',
    },
    additional: {
      weddingSeason: 'Peak Season',
      memeMode: true,
      motherInLawWishlist: [],
      brideMoreQualified: false,
      goldWeight: 100,
    },
  });

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    onCalculate(formData);

    // Scroll to results
    document.getElementById('results')?.scrollIntoView({
      behavior: 'smooth',
    });
  };

  return (
    <form onSubmit={handleCalculate}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <GroomSection
          groomDetails={formData.groom}
          onChange={(groom) => setFormData({ ...formData, groom })}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <BrideSection
          brideDetails={formData.bride}
          onChange={(bride) => setFormData({ ...formData, bride })}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <AdditionalInputs
          additionalDetails={formData.additional}
          onChange={(additional) => setFormData({ ...formData, additional })}
        />
      </motion.div>

      <motion.div
        className="flex justify-center mb-8"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <button
          type="submit"
          className="btn-primary py-3 px-8 flex items-center gap-2 text-lg"
        >
          <Calculate size={20} />
          Calculate Dahej
        </button>
      </motion.div>

      <motion.div 
        className="flex justify-center text-gold-dark mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <ArrowDownCircle size={32} className="animate-bounce" />
      </motion.div>
    </form>
  );
};

export default Calculator;