import React from 'react';
import { BrideDetails } from '../../types';
import Dropdown from '../UI/Dropdown';
import Input from '../UI/Input';
import Toggle from '../UI/Toggle';
import StarRating from '../UI/StarRating';
import { QUALIFICATION_OPTIONS, CASTE_OPTIONS } from '../../utils/constants';

interface BrideSectionProps {
  brideDetails: BrideDetails;
  onChange: (brideDetails: BrideDetails) => void;
}

const BrideSection: React.FC<BrideSectionProps> = ({ brideDetails, onChange }) => {
  const updateField = <K extends keyof BrideDetails>(
    field: K,
    value: BrideDetails[K]
  ) => {
    onChange({
      ...brideDetails,
      [field]: value,
    });
  };

  return (
    <div className="card mb-6 border-royalblue">
      <h2 className="card-header text-royalblue">
        <span className="gold-gradient">Bride Details</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Dropdown
          id="bride-qualification"
          label="Qualification"
          value={brideDetails.qualification}
          options={QUALIFICATION_OPTIONS}
          onChange={(value) => updateField('qualification', value)}
        />
        
        <Toggle
          id="bride-working"
          label="Working?"
          checked={brideDetails.working}
          onChange={(checked) => updateField('working', checked)}
        />
        
        <Input
          id="bride-siblings"
          label="Number of Siblings"
          type="number"
          value={brideDetails.siblings}
          onChange={(value) => updateField('siblings', value as number)}
          min={0}
          max={10}
        />
        
        <StarRating
          id="bride-cooking-skills"
          label="Cooking Skills"
          rating={brideDetails.cookingSkills}
          onChange={(rating) => updateField('cookingSkills', rating)}
        />
        
        <Dropdown
          id="bride-caste"
          label="Caste (Optional)"
          value={brideDetails.caste}
          options={CASTE_OPTIONS}
          onChange={(value) => updateField('caste', value)}
          tooltip="This is satirical. Caste should never be a marriage criterion."
        />
      </div>
    </div>
  );
};

export default BrideSection;