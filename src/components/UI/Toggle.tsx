import React from 'react';

interface ToggleProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const Toggle: React.FC<ToggleProps> = ({ id, label, checked, onChange }) => {
  return (
    <div className="mb-4 flex items-center">
      <label htmlFor={id} className="toggle-switch">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <span className="toggle-slider"></span>
      </label>
      <span className="ml-3 text-maroon font-medium">{label}</span>
    </div>
  );
};

export default Toggle;