import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@radix-ui/react-label';
import React, { useEffect, useRef, useState } from 'react';
import { HexColorPicker } from 'react-colorful';

const ColorGroup = ({ defaultValue, onChange, formValue, options }) => {
  const colorPickerRef = useRef(null);
  const [openColorSlider, setOpenColorSlider] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        colorPickerRef.current &&
        !colorPickerRef.current.contains(event.target)
      ) {
        setOpenColorSlider(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [colorPickerRef]);

  return (
    <div>
      <RadioGroup
        defaultValue={defaultValue || options[0].value}
        onValueChange={(value) => {
          if (value === 'custom') {
            setOpenColorSlider(true);
          } else onChange(value);
        }}
      >
        {options.map(({ value, id, label }) => (
          <div className="flex items-center space-x-2" key={id}>
            <RadioGroupItem value={value} id={id} />
            <Label htmlFor={id}>{label}</Label>
          </div>
        ))}
      </RadioGroup>
      {openColorSlider && (
        <div className="" ref={colorPickerRef}>
          <HexColorPicker
            color={'#' + formValue}
            onChange={(color) => onChange(color.slice(1))}
          />
        </div>
      )}
      {/* <HexColorInput
    color={'#' + value.badgeColor}
    onChange={(color) =>
      handleValueChange('badgeColor', color.slice(1))
    }
    className="git-input"
  /> */}
    </div>
  );
};

export default ColorGroup;
