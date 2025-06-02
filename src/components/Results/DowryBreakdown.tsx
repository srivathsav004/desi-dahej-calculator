import React from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { DowryBreakdown as DowryBreakdownType } from '../../types';
import { formatCurrency } from '../../utils/calculations';

interface DowryBreakdownProps {
  breakdown: DowryBreakdownType;
}

const DowryBreakdown: React.FC<DowryBreakdownProps> = ({ breakdown }) => {
  const {
    baseDowry,
    jobMultiplier,
    foreignBonus,
    carValueAddition,
    educationRecoveryFee,
    prestigeTax,
    offSeasonDiscount,
    goldEstimateValue,
    motherInLawWishlistTotal,
    total
  } = breakdown;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="card mb-6"
    >
      <h2 className="card-header">Dowry Breakdown</h2>
      <div className="space-y-3">
        <motion.div variants={item} className="flex justify-between">
          <span>Base Dowry:</span>
          <span className="font-medium">{formatCurrency(baseDowry)}</span>
        </motion.div>

        <motion.div variants={item} className="flex justify-between">
          <span>Job Multiplier Bonus:</span>
          <span className="font-medium">{formatCurrency(jobMultiplier)}</span>
        </motion.div>

        {foreignBonus > 0 && (
          <motion.div variants={item} className="flex justify-between">
            <span>Foreign Bonus:</span>
            <span className="font-medium">{formatCurrency(foreignBonus)}</span>
          </motion.div>
        )}

        {carValueAddition > 0 && (
          <motion.div variants={item} className="flex justify-between">
            <span>Car Value Addition:</span>
            <span className="font-medium">{formatCurrency(carValueAddition)}</span>
          </motion.div>
        )}

        {educationRecoveryFee > 0 && (
          <motion.div variants={item} className="flex justify-between">
            <span>Education Recovery Fee:</span>
            <span className="font-medium">{formatCurrency(educationRecoveryFee)}</span>
          </motion.div>
        )}

        {prestigeTax > 0 && (
          <motion.div variants={item} className="flex justify-between">
            <span>Prestige Tax:</span>
            <span className="font-medium">{formatCurrency(prestigeTax)}</span>
          </motion.div>
        )}

        {offSeasonDiscount > 0 && (
          <motion.div variants={item} className="flex justify-between">
            <span>Off-Season Discount:</span>
            <span className="font-medium text-success-dark">-{formatCurrency(offSeasonDiscount)}</span>
          </motion.div>
        )}

        {goldEstimateValue > 0 && (
          <motion.div variants={item} className="flex justify-between">
            <span>Gold Estimate Value:</span>
            <span className="font-medium">{formatCurrency(goldEstimateValue)}</span>
          </motion.div>
        )}

        {motherInLawWishlistTotal > 0 && (
          <motion.div variants={item} className="flex justify-between">
            <span>Mother-in-Law Wishlist Total:</span>
            <span className="font-medium">{formatCurrency(motherInLawWishlistTotal)}</span>
          </motion.div>
        )}

        <motion.div 
          variants={item}
          className="flex justify-between pt-3 border-t-2 border-gold-light mt-3 text-lg font-bold"
        >
          <span>Total {total < 0 ? 'Reverse Dowry' : 'Dowry'} Estimate:</span>
          <span className={total < 0 ? 'text-success-dark' : 'text-error-dark'}>
            <CountUp
              start={0}
              end={Math.abs(total)}
              duration={2.5}
              separator=","
              decimals={0}
              decimal="."
              prefix="₹"
              formattingFn={(value) => formatCurrency(total < 0 ? -value : value)}
            />
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DowryBreakdown;