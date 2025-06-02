import { MemeType } from '../types';

export const QUALIFICATION_OPTIONS = [
  '12th Pass',
  'BTech',
  'MBA',
  'IAS',
  'PhD',
];

export const CAR_OPTIONS = [
  'None',
  'Maruti 800',
  'Sedan',
  'SUV',
  'Fortuner',
  'Audi',
];

export const COMPLEXION_OPTIONS = [
  'Fair',
  'Wheatish',
  'Dusky',
];

export const CASTE_OPTIONS = [
  'Brahmin',
  'Kshatriya',
  'Vaishya',
  'Shudra',
  'Others',
  'Prefer not to say',
];

export const SEASON_OPTIONS = [
  'Peak Season',
  'Off-Season',
];

export const MOTHER_IN_LAW_WISHLIST_OPTIONS = [
  'Gold Jewelry Set',
  'Washing Machine',
  'LED TV',
  'Refrigerator',
  'Air Conditioner',
  'Microwave Oven',
  'Expensive Sarees',
  'Designer Furniture',
  'Kitchen Appliances Set',
  'Cash in Hand',
];

export const BASE_DOWRY_AMOUNT = 500000; // ₹5 Lakhs
export const GOLD_RATE_PER_GRAM = 6000; // ₹6000 per gram

export const QUALIFICATION_MULTIPLIERS: Record<string, number> = {
  '12th Pass': 0.5,
  'BTech': 1.0,
  'MBA': 1.5,
  'IAS': 3.0,
  'PhD': 2.0,
};

export const CAR_VALUE_ADDITIONS: Record<string, number> = {
  'None': 0,
  'Maruti 800': 50000,
  'Sedan': 200000,
  'SUV': 500000,
  'Fortuner': 800000,
  'Audi': 1500000,
};

export const FOREIGN_BONUS = 1000000; // ₹10 Lakhs

export const SALARY_MULTIPLIER = 24; // 2 years of salary

export const OFF_SEASON_DISCOUNT_PERCENTAGE = 20; // 20% discount

export const MEMES: MemeType[] = [
  {
    url: 'https://images.pexels.com/photos/4050990/pexels-photo-4050990.jpeg',
    caption: 'When your parents say "beta, rishta aaya hai" and you know what\'s coming next...',
  },
  {
    url: 'https://images.pexels.com/photos/5638612/pexels-photo-5638612.jpeg',
    caption: 'Mother-in-law after seeing the dowry: "Is this all? We expected more from your family!"',
  },
  {
    url: 'https://images.pexels.com/photos/9638689/pexels-photo-9638689.jpeg',
    caption: 'Groom\'s family: "We don\'t want any dowry, just bless the couple" *also prepares a 10-page wishlist*',
  },
  {
    url: 'https://images.pexels.com/photos/7148384/pexels-photo-7148384.jpeg',
    caption: 'When you realize you\'re worth more than any dowry calculation',
  },
];

export const DOWRY_TAGLINES: Record<string, string[]> = {
  low: [
    'Budget Wedding: You\'re getting a discount groom!',
    'Congratulations! You qualify for our economy package!',
    'Good news! Your dowry fits in a small suitcase!',
  ],
  medium: [
    'You\'re worth 1 Sedan and a small apartment!',
    'Mid-range package: Includes one groom with average expectations!',
    'Your dowry will keep the in-laws happy... for now!',
  ],
  high: [
    'Premium Package: Gold-plated groom with extra demands!',
    'You\'re worth 2 SUVs and a duplex!',
    'Dowry Demand High: Buy 1 Groom, Get 1 Scooty Free!',
  ],
  veryHigh: [
    'Ultra Luxury Package: Does the groom come with superpowers?',
    'With this dowry, you could buy a small island instead!',
    'Breaking News: Groom\'s family expectations reach the moon!',
  ],
  reversed: [
    'Plot Twist: Groom pays the bride! Revolutionary!',
    'Modern Times: He brings the dowry to YOU!',
    'Uno Reverse Card Played Successfully!',
  ],
};

export const NEGOTIATION_QUESTIONS = [
  'Will you agree to increase the gold jewelry from 100g to 200g?',
  'Can you add a luxury car to the dowry package?',
  'Is a 3 BHK apartment instead of 2 BHK acceptable?',
  'Would you consider adding a foreign honeymoon package?',
];

export const CHART_COLORS = [
  '#D4AF37', // Gold
  '#800000', // Maroon
  '#4169E1', // Royal Blue
  '#228B22', // Forest Green
  '#8B4513', // Saddle Brown
  '#4B0082', // Indigo
  '#FF6347', // Tomato
  '#2F4F4F', // Dark Slate Gray
  '#FF4500', // Orange Red
  '#2E8B57', // Sea Green
];

export const DOWRY_FACTS = [
  'Despite being illegal since 1961, dowry remains a widespread practice in many parts of India.',
  'According to National Crime Records Bureau data, there is one dowry death reported approximately every hour in India.',
  'The Dowry Prohibition Act, 1961 makes giving, taking, or demanding dowry illegal with imprisonment up to 5 years.',
  'Section 498A of the Indian Penal Code protects women from cruelty by husband or his relatives in connection with demands for dowry.',
];