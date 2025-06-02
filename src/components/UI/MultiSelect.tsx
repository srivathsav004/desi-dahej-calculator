import React, { useState } from 'react';

interface MultiSelectProps {
  id: string;
  label: string;
  options: string[];
  selectedOptions: string[];
  onChange: (selectedOptions: string[]) => void;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  id,
  label,
  options,
  selectedOptions,
  onChange
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOption = (option: string) => {
    if (selectedOptions.includes(option)) {
      onChange(selectedOptions.filter(item => item !== option));
    } else {
      onChange([...selectedOptions, option]);
    }
  };

  return (
    <div className="mb-4 relative">
      <label htmlFor={id} className="block text-maroon font-medium mb-1">
        {label}
      </label>
      <div
        className="input-base flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="truncate">
          {selectedOptions.length > 0
            ? `${selectedOptions.length} items selected`
            : 'Select items'}
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-5 w-5 transition-transform ${isOpen ? 'transform rotate-180' : ''}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gold rounded-md shadow-lg max-h-60 overflow-y-auto">
          {options.map((option) => (
            <div
              key={option}
              className="px-4 py-2 hover:bg-gold-light cursor-pointer flex items-center"
              onClick={() => toggleOption(option)}
            >
              <input
                type="checkbox"
                className="mr-2 h-4 w-4 text-royalblue"
                checked={selectedOptions.includes(option)}
                onChange={() => {}}
              />
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelect;