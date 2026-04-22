import { Check } from 'lucide-react';

interface ValueSelectorProps {
  values: string[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
}

export function ValueSelector({ values, selectedValues, onChange }: ValueSelectorProps) {
  const toggleValue = (value: string) => {
    if (selectedValues.includes(value)) {
      onChange(selectedValues.filter((v) => v !== value));
    } else {
      onChange([...selectedValues, value]);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {values.map((value) => {
        const isSelected = selectedValues.includes(value);
        return (
          <button
            key={value}
            onClick={() => toggleValue(value)}
            className={`flex items-center gap-2 rounded-lg border-2 px-4 py-2 text-sm transition-all ${
              isSelected
                ? 'border-primary bg-primary/5 text-foreground'
                : 'border-border bg-background text-muted-foreground hover:border-border/80'
            }`}
          >
            {isSelected && <Check className="h-4 w-4" />}
            {value}
          </button>
        );
      })}
    </div>
  );
}
