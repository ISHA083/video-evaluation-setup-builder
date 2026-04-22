import { Check } from 'lucide-react';

interface CustomCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}

export function CustomCheckbox({ checked, onChange, label }: CustomCheckboxProps) {
  return (
    <label className="flex items-center gap-2 text-sm cursor-pointer">
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only"
        />
        <div
          className={`h-4 w-4 rounded border-2 transition-colors ${
            checked
              ? 'bg-orange-600 border-orange-600'
              : 'bg-transparent border-orange-600'
          } flex items-center justify-center`}
        >
          {checked && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
        </div>
      </div>
      {label}
    </label>
  );
}
