import React from 'react';

interface InputProps {
  id: string;
  label: string;
  type: 'text' | 'number';
  value: string | number;
  onChange: (value: string | number) => void;
  min?: number;
  max?: number;
  placeholder?: string;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type,
  value,
  onChange,
  min,
  max,
  placeholder
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (type === 'number') {
      onChange(e.target.valueAsNumber || 0);
    } else {
      onChange(e.target.value);
    }
  };

  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-maroon font-medium mb-1">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={handleChange}
        min={min}
        max={max}
        placeholder={placeholder}
        className="input-base"
      />
    </div>
  );
};

export default Input;