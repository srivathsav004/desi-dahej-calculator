import React from 'react';

interface StarRatingProps {
  id: string;
  label: string;
  rating: number;
  onChange: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ id, label, rating, onChange }) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-maroon font-medium mb-1">
        {label}
      </label>
      <div className="star-rating-container" id={id}>
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className={`text-2xl focus:outline-none transition-all duration-300 transform hover:scale-110 ${
              star <= rating ? 'text-gold' : 'text-gray-300'
            }`}
            aria-label={`Rate ${star} out of 5 stars`}
          >
            ★
          </button>
        ))}
      </div>
    </div>
  );
};

export default StarRating;