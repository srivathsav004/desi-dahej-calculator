import React from 'react';
import { GroomDetails } from '../../types';
import Dropdown from '../UI/Dropdown';
import Input from '../UI/Input';
import Toggle from '../UI/Toggle';
import { QUALIFICATION_OPTIONS, CAR_OPTIONS, COMPLEXION_OPTIONS } from '../../utils/constants';

interface GroomSectionProps {
  groomDetails: GroomDetails;
  onChange: (groomDetails: GroomDetails) => void;
}

const GroomSection: React.FC<GroomSectionProps> = ({ groomDetails, onChange }) => {
  const updateField = <K extends keyof GroomDetails>(
    field: K,
    value: GroomDetails[K]
  ) => {
    onChange({
      ...groomDetails,
      [field]: value,
    });
  };

  return (
    <div className="card mb-6 border-maroon">
      <h2 className="card-header text-maroon">
        <span className="gold-gradient">Groom Details</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Dropdown
          id="groom-qualification"
          label="Qualification"
          value={groomDetails.qualification}
          options={QUALIFICATION_OPTIONS}
          onChange={(value) => updateField('qualification', value)}
        />
        
        <Input
          id="groom-job-title"
          label="Job Title"
          type="text"
          value={groomDetails.jobTitle}
          onChange={(value) => updateField('jobTitle', value as string)}
          placeholder="e.g., Software Engineer"
        />
        
        <Input
          id="groom-monthly-salary"
          label="Monthly Salary (₹)"
          type="number"
          value={groomDetails.monthlySalary}
          onChange={(value) => updateField('monthlySalary', value as number)}
          min={0}
        />
        
        <Toggle
          id="groom-working-abroad"
          label="Working Abroad?"
          checked={groomDetails.workingAbroad}
          onChange={(checked) => updateField('workingAbroad', checked)}
        />
        
        <Dropdown
          id="groom-car-owned"
          label="Car Owned"
          value={groomDetails.carOwned}
          options={CAR_OPTIONS}
          onChange={(value) => updateField('carOwned', value)}
        />
        
        <Dropdown
          id="groom-complexion"
          label="Complexion"
          value={groomDetails.complexion}
          options={COMPLEXION_OPTIONS}
          onChange={(value) => updateField('complexion', value)}
          tooltip="This is satirical. Complexion should never matter!"
        />
        
        <Input
          id="groom-height"
          label="Height (in cm)"
          type="number"
          value={groomDetails.height}
          onChange={(value) => updateField('height', value as number)}
          min={120}
          max={220}
        />
      </div>
    </div>
  );
};

export default GroomSection;