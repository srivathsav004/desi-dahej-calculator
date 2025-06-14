import React from 'react';
import { AdditionalDetails } from '../../types';
import Dropdown from '../UI/Dropdown';
import Toggle from '../UI/Toggle';
import Slider from '../UI/Slider';
import MultiSelect from '../UI/MultiSelect';
import { SEASON_OPTIONS, MOTHER_IN_LAW_WISHLIST_OPTIONS, MEME_LEVELS } from '../../utils/constants';

interface AdditionalInputsProps {
  additionalDetails: AdditionalDetails;
  onChange: (additionalDetails: AdditionalDetails) => void;
}

const AdditionalInputs: React.FC<AdditionalInputsProps> = ({ 
  additionalDetails, 
  onChange 
}) => {
  const updateField = <K extends keyof AdditionalDetails>(
    field: K,
    value: AdditionalDetails[K]
  ) => {
    onChange({
      ...additionalDetails,
      [field]: value,
    });
  };

  return (
    <div className="card mb-6 border-gold">
      <h2 className="card-header text-gold-dark">
        <span className="maroon-gradient">Additional Details</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Dropdown
          id="wedding-season"
          label="Wedding Season"
          value={additionalDetails.weddingSeason}
          options={SEASON_OPTIONS}
          onChange={(value) => updateField('weddingSeason', value)}
          tooltip="Off-season weddings get a discount!"
        />
        
        <Dropdown
          id="meme-level"
          label="Meme Level"
          value={additionalDetails.memeLevel || 'Medium'}
          options={MEME_LEVELS}
          onChange={(value) => updateField('memeLevel', value)}
          tooltip="Choose how spicy you want your results!"
        />
        
        <Toggle
          id="meme-mode"
          label="Meme Mode"
          checked={additionalDetails.memeMode}
          onChange={(checked) => updateField('memeMode', checked)}
        />
        
        <MultiSelect
          id="mother-in-law-wishlist"
          label="Mother-in-Law Wishlist"
          options={MOTHER_IN_LAW_WISHLIST_OPTIONS}
          selectedOptions={additionalDetails.motherInLawWishlist}
          onChange={(selected) => updateField('motherInLawWishlist', selected)}
        />
        
        <Toggle
          id="bride-more-qualified"
          label="Bride More Qualified?"
          checked={additionalDetails.brideMoreQualified}
          onChange={(checked) => updateField('brideMoreQualified', checked)}
        />
        
        <Slider
          id="gold-weight"
          label="Gold Weight (in grams)"
          value={additionalDetails.goldWeight}
          min={0}
          max={500}
          step={10}
          onChange={(value) => updateField('goldWeight', value)}
          valueLabel="grams"
        />

        <Slider
          id="negotiation-skill"
          label="Negotiation Skill Level"
          value={additionalDetails.negotiationSkill || 50}
          min={0}
          max={100}
          step={10}
          onChange={(value) => updateField('negotiationSkill', value)}
          valueLabel="%"
        />

        <Toggle
          id="has-dowry-insurance"
          label="Has Dowry Insurance?"
          checked={additionalDetails.hasDowryInsurance || false}
          onChange={(checked) => updateField('hasDowryInsurance', checked)}
          tooltip="Get a 10% discount if you have dowry insurance!"
        />
      </div>
    </div>
  );
};

export default AdditionalInputs;