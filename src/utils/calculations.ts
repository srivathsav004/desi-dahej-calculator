import { 
  DowryCalculatorInputs, 
  DowryBreakdown,
  ChartData
} from '../types';
import {
  BASE_DOWRY_AMOUNT,
  QUALIFICATION_MULTIPLIERS,
  CAR_VALUE_ADDITIONS,
  FOREIGN_BONUS,
  SALARY_MULTIPLIER,
  OFF_SEASON_DISCOUNT_PERCENTAGE,
  GOLD_RATE_PER_GRAM,
  CHART_COLORS,
  DOWRY_TAGLINES
} from './constants';

export const calculateDowry = (inputs: DowryCalculatorInputs): DowryBreakdown => {
  const { groom, bride, additional } = inputs;
  
  // Base dowry
  let baseDowry = BASE_DOWRY_AMOUNT;
  
  // Job multiplier based on qualification and salary
  const qualificationMultiplier = QUALIFICATION_MULTIPLIERS[groom.qualification] || 1;
  const jobMultiplier = groom.monthlySalary * SALARY_MULTIPLIER * qualificationMultiplier;
  
  // Foreign bonus
  const foreignBonus = groom.workingAbroad ? FOREIGN_BONUS : 0;
  
  // Car value addition
  const carValueAddition = CAR_VALUE_ADDITIONS[groom.carOwned] || 0;
  
  // Education recovery fee
  const educationRecoveryFee = groom.qualification === 'MBA' || groom.qualification === 'IAS' 
    ? 1000000 // ₹10 Lakhs for MBA/IAS
    : groom.qualification === 'PhD' 
      ? 800000 // ₹8 Lakhs for PhD
      : groom.qualification === 'BTech' 
        ? 400000 // ₹4 Lakhs for BTech
        : 0;
  
  // Prestige tax (based on complexion - satirical)
  const prestigeTax = groom.complexion === 'Fair' 
    ? 200000 // ₹2 Lakhs for fair
    : groom.complexion === 'Wheatish' 
      ? 100000 // ₹1 Lakh for wheatish
      : 0; // No tax for dusky
  
  // Off-season discount
  const offSeasonDiscount = additional.weddingSeason === 'Off-Season' 
    ? (baseDowry + jobMultiplier + foreignBonus + carValueAddition + educationRecoveryFee + prestigeTax) * (OFF_SEASON_DISCOUNT_PERCENTAGE / 100)
    : 0;
  
  // Gold estimate value
  const goldEstimateValue = additional.goldWeight * GOLD_RATE_PER_GRAM;
  
  // Mother-in-law wishlist total (rough estimate: ₹50,000 per item)
  const motherInLawWishlistTotal = additional.motherInLawWishlist.length * 50000;
  
  // Calculate total
  let total = baseDowry + 
    jobMultiplier + 
    foreignBonus + 
    carValueAddition + 
    educationRecoveryFee + 
    prestigeTax - 
    offSeasonDiscount + 
    goldEstimateValue + 
    motherInLawWishlistTotal;
  
  // Apply bride qualifications modifiers
  if (bride.qualification === 'IAS' || bride.qualification === 'PhD') {
    total *= 0.7; // 30% reduction if bride is highly qualified
  }
  
  if (bride.working) {
    total *= 0.8; // 20% reduction if bride is working
  }
  
  // If bride is more qualified, reverse the dowry flow (negative total)
  if (additional.brideMoreQualified) {
    total = -total;
  }
  
  return {
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
  };
};

export const formatCurrency = (amount: number): string => {
  const absAmount = Math.abs(amount);
  if (absAmount >= 10000000) {
    return `₹${(absAmount / 10000000).toFixed(2)} Cr`;
  } else if (absAmount >= 100000) {
    return `₹${(absAmount / 100000).toFixed(2)} Lakhs`;
  } else {
    return `₹${absAmount.toLocaleString('en-IN')}`;
  }
};

export const getTagline = (total: number): string => {
  const absTotal = Math.abs(total);
  
  if (total < 0) {
    // Reversed dowry flow
    const reversed = DOWRY_TAGLINES.reversed;
    return reversed[Math.floor(Math.random() * reversed.length)];
  }
  
  if (absTotal < 1000000) { // Less than 10 Lakhs
    const low = DOWRY_TAGLINES.low;
    return low[Math.floor(Math.random() * low.length)];
  } else if (absTotal < 5000000) { // Between 10-50 Lakhs
    const medium = DOWRY_TAGLINES.medium;
    return medium[Math.floor(Math.random() * medium.length)];
  } else if (absTotal < 10000000) { // Between 50 Lakhs - 1 Crore
    const high = DOWRY_TAGLINES.high;
    return high[Math.floor(Math.random() * high.length)];
  } else { // More than 1 Crore
    const veryHigh = DOWRY_TAGLINES.veryHigh;
    return veryHigh[Math.floor(Math.random() * veryHigh.length)];
  }
};

export const prepareChartData = (breakdown: DowryBreakdown): ChartData[] => {
  const { 
    baseDowry,
    jobMultiplier,
    foreignBonus,
    carValueAddition,
    educationRecoveryFee,
    prestigeTax,
    goldEstimateValue,
    motherInLawWishlistTotal
  } = breakdown;
  
  // Only include positive values
  const data: ChartData[] = [];
  
  if (baseDowry > 0) {
    data.push({ name: 'Base Dowry', value: baseDowry, color: CHART_COLORS[0] });
  }
  
  if (jobMultiplier > 0) {
    data.push({ name: 'Job Multiplier', value: jobMultiplier, color: CHART_COLORS[1] });
  }
  
  if (foreignBonus > 0) {
    data.push({ name: 'Foreign Bonus', value: foreignBonus, color: CHART_COLORS[2] });
  }
  
  if (carValueAddition > 0) {
    data.push({ name: 'Car Value', value: carValueAddition, color: CHART_COLORS[3] });
  }
  
  if (educationRecoveryFee > 0) {
    data.push({ name: 'Education Fee', value: educationRecoveryFee, color: CHART_COLORS[4] });
  }
  
  if (prestigeTax > 0) {
    data.push({ name: 'Prestige Tax', value: prestigeTax, color: CHART_COLORS[5] });
  }
  
  if (goldEstimateValue > 0) {
    data.push({ name: 'Gold Value', value: goldEstimateValue, color: CHART_COLORS[6] });
  }
  
  if (motherInLawWishlistTotal > 0) {
    data.push({ name: 'MIL Wishlist', value: motherInLawWishlistTotal, color: CHART_COLORS[7] });
  }
  
  return data;
};