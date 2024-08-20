import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export default function CustomRadioGroup({ defaultValue, options, onChange }) {
  return (
    <RadioGroup
      defaultValue={defaultValue || options[0].value}
      onValueChange={onChange}
    >
      {options.map(({ value, id, label }) => (
        <div className="flex items-center space-x-2" key={id}>
          <RadioGroupItem value={value} id={id} />
          <Label htmlFor={id}>{label}</Label>
        </div>
      ))}
    </RadioGroup>
  );
}
