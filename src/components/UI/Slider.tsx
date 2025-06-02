import React from 'react';

interface SliderProps {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  valueLabel?: string;
}

const Slider: React.FC<SliderProps> = ({
  id,
  label,
  value,
  min,
  max,
  step,
  onChange,
  valueLabel
}) => {
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1">
        <label htmlFor={id} className="block text-maroon font-medium">
          {label}
        </label>
        <span className="text-royalblue font-medium">
          {value} {valueLabel}
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value, 10))}
        className="w-full h-2 bg-gold-light rounded-lg appearance-none cursor-pointer"
      />
    </div>
  );
};

export default Slider;