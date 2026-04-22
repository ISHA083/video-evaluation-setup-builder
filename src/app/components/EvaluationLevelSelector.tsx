import { Check } from 'lucide-react';

export type SeniorityLevel = 'junior' | 'mid' | 'senior';
export type DepthLevel = 'basic' | 'moderate' | 'advanced';

interface EvaluationLevelSelectorProps {
  seniority: SeniorityLevel;
  depth: DepthLevel;
  onSeniorityChange: (level: SeniorityLevel) => void;
  onDepthChange: (level: DepthLevel) => void;
}

export function EvaluationLevelSelector({
  seniority,
  depth,
  onSeniorityChange,
  onDepthChange,
}: EvaluationLevelSelectorProps) {
  const seniorityOptions = [
    {
      value: 'junior' as SeniorityLevel,
      label: 'Junior',
      experience: '0–3 years',
      description: 'Focus on fundamentals',
    },
    {
      value: 'mid' as SeniorityLevel,
      label: 'Mid-Level',
      experience: '3–7 years',
      description: 'Hands-on experience and problem solving',
    },
    {
      value: 'senior' as SeniorityLevel,
      label: 'Senior',
      experience: '7+ years',
      description: 'Architecture, trade-offs, ownership',
    },
  ];

  const depthOptions = [
    { value: 'basic' as DepthLevel, label: 'Basic' },
    { value: 'moderate' as DepthLevel, label: 'Moderate' },
    { value: 'advanced' as DepthLevel, label: 'Advanced' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-2">Set Evaluation Level</h3>
        <p className="text-sm text-muted-foreground">
          This helps us generate the right questions and assess candidates accurately
        </p>
      </div>

      <div>
        <label className="mb-3 block text-sm">Seniority Level</label>
        <div className="grid gap-3">
          {seniorityOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => onSeniorityChange(option.value)}
              className={`relative flex items-start gap-4 rounded-lg border-2 p-4 text-left transition-all ${
                seniority === option.value
                  ? 'border-primary bg-primary/5'
                  : 'border-border bg-background hover:border-border/80 hover:bg-muted/50'
              }`}
            >
              <div
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                  seniority === option.value
                    ? 'border-primary bg-primary'
                    : 'border-muted-foreground/30'
                }`}
              >
                {seniority === option.value && (
                  <Check className="h-3 w-3 text-primary-foreground" />
                )}
              </div>
              <div className="flex-1">
                <div className="mb-0.5 flex items-baseline gap-2">
                  <span className="text-sm">{option.label}</span>
                  <span className="text-xs text-muted-foreground">
                    {option.experience}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">{option.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="mb-3 block text-sm">Evaluation Depth</label>
        <div className="flex gap-3">
          {depthOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => onDepthChange(option.value)}
              className={`flex-1 rounded-lg border-2 px-4 py-3 text-sm transition-all ${
                depth === option.value
                  ? 'border-primary bg-primary/5 text-foreground'
                  : 'border-border bg-background text-muted-foreground hover:border-border/80 hover:bg-muted/50'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          Controls how deep answers should be and how strictly candidates are evaluated
        </p>
      </div>
    </div>
  );
}
