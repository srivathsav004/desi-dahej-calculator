import React from 'react';

interface DropdownProps {
  id: string;
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  tooltip?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  id,
  label,
  value,
  options,
  onChange,
  tooltip
}) => {
  return (
    <div className="mb-4">
      <div className="flex items-center mb-1">
        <label htmlFor={id} className="block text-maroon font-medium">
          {label}
        </label>
        {tooltip && (
          <div className="group relative ml-2">
            <span className="cursor-help text-gold-dark">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 16v-4"></path>
                <path d="M12 8h.01"></path>
              </svg>
            </span>
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-white p-2 rounded shadow-lg text-sm w-48 z-10">
              {tooltip}
            </div>
          </div>
        )}
      </div>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="input-base"
      >
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;