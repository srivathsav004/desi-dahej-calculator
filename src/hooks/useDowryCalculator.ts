import { useState } from 'react';
import { DowryCalculatorInputs, DowryBreakdown } from '../types';
import { calculateDowry } from '../utils/calculations';

export const useDowryCalculator = () => {
  const [result, setResult] = useState<DowryBreakdown | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showMemes, setShowMemes] = useState(false);

  const calculateResult = (inputs: DowryCalculatorInputs) => {
    const breakdown = calculateDowry(inputs);
    setResult(breakdown);
    setShowResult(true);
    setShowMemes(inputs.additional.memeMode);
    
    // If all inputs are minimal, show congratulatory message
    if (
      inputs.groom.monthlySalary <= 20000 &&
      inputs.groom.carOwned === 'None' &&
      !inputs.groom.workingAbroad &&
      inputs.additional.goldWeight <= 20 &&
      inputs.additional.motherInLawWishlist.length === 0
    ) {
      setTimeout(() => {
        alert('Shaadi of the Year! No Dahej, Only Love ❤️');
      }, 1500);
    }
  };

  return {
    result,
    showResult,
    showMemes,
    calculateResult
  };
};