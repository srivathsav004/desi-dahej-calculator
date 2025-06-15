export interface GroomDetails {
  qualification: string;
  jobTitle: string;
  monthlySalary: number;
  workingAbroad: boolean;
  carOwned: string;
  complexion: string;
  height: number;
}

export interface BrideDetails {
  qualification: string;
  working: boolean;
  siblings: number;
  cookingSkills: number;
  caste: string;
}

export interface AdditionalDetails {
  weddingSeason: string;
  memeMode: boolean;
  motherInLawWishlist: string[];
  brideMoreQualified: boolean;
  goldWeight: number;
  memeLevel: string;
  negotiationSkill: number;
  hasDowryInsurance: boolean;
}

export interface DowryCalculatorInputs {
  groom: GroomDetails;
  bride: BrideDetails;
  additional: AdditionalDetails;
}

export interface DowryBreakdown {
  baseDowry: number;
  jobMultiplier: number;
  foreignBonus: number;
  carValueAddition: number;
  educationRecoveryFee: number;
  prestigeTax: number;
  offSeasonDiscount: number;
  goldEstimateValue: number;
  motherInLawWishlistTotal: number;
  negotiationDiscount: number;
  insuranceDiscount: number;
  total: number;
}

export interface ChartData {
  name: string;
  value: number;
  color: string;
}

export type MemeType = {
  url: string;
  caption: string;
};