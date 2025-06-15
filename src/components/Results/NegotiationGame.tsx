import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatCurrency } from '../../utils/calculations';

interface NegotiationGameProps {
  initialAmount: number;
  onComplete: (agreed: boolean) => void;
  onClose: () => void;
}

const NegotiationGame: React.FC<NegotiationGameProps> = ({
  initialAmount,
  onComplete,
  onClose
}) => {
  const [currentDemand, setCurrentDemand] = useState(0);
  const [negotiationRound, setNegotiationRound] = useState(1);
  const [showConfetti, setShowConfetti] = useState(false);

  const demands = [
    {
      text: "We would like a luxury car and 100g more gold in the dowry package. It's a matter of family prestige!",
      amount: initialAmount * 0.3
    },
    {
      text: "The groom's mother wants a separate house in the dowry. She needs her space!",
      amount: initialAmount * 0.5
    },
    {
      text: "We need a business setup for the groom's brother. Family comes first!",
      amount: initialAmount * 0.7
    }
  ];

  const handleAgree = () => {
    setCurrentDemand(demands[negotiationRound - 1].amount);
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
      onComplete(true);
    }, 2000);
  };

  const handleRefuse = () => {
    if (negotiationRound < demands.length) {
      setNegotiationRound(prev => prev + 1);
    } else {
      onComplete(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white p-6 rounded-lg max-w-md w-full mx-4"
      >
        <h3 className="text-xl font-baloo mb-4 text-maroon">Negotiation Challenge</h3>
        
        <div className="mb-6">
          <p className="text-lg mb-2">Round {negotiationRound} of {demands.length}</p>
          <p className="font-medium mb-4 text-maroon">
            {demands[negotiationRound - 1].text}
          </p>
          <p className="text-sm text-gray-600">
            Additional Amount: {formatCurrency(demands[negotiationRound - 1].amount)}
          </p>
        </div>

        <div className="flex gap-4 justify-end">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRefuse}
            className="btn-secondary"
          >
            Refuse
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAgree}
            className="btn-accent"
          >
            Agree
          </motion.button>
        </div>

        <AnimatePresence>
          {showConfetti && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 pointer-events-none"
            >
              {/* Add confetti animation here */}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default NegotiationGame; 