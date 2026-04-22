import { Check } from 'lucide-react';

interface Step {
  label: string;
  status: 'completed' | 'active' | 'inactive';
}

interface ProgressIndicatorProps {
  steps: Step[];
  currentStep: number;
}

export function ProgressIndicator({ steps, currentStep }: ProgressIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-2">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center">
          <div className="flex items-center gap-3">
            <div
              className={`flex items-center gap-2 ${
                step.status === 'active'
                  ? 'text-foreground'
                  : step.status === 'completed'
                  ? 'text-muted-foreground'
                  : 'text-muted-foreground'
              }`}
            >
              {step.status === 'completed' ? (
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#22c55e]">
                  <Check className="h-4 w-4 text-white" />
                </div>
              ) : (
                <div
                  className={`flex h-6 w-6 items-center justify-center rounded-full border-2 text-xs ${
                    step.status === 'active'
                      ? 'border-primary bg-primary text-white'
                      : 'border-[#d1d5db] bg-white text-muted-foreground'
                  }`}
                >
                  {index + 1}
                </div>
              )}
              <span className="text-sm">{step.label}</span>
            </div>
          </div>
          {index < steps.length - 1 && (
            <div className="mx-4 h-px w-12 bg-[#e5e7eb]" />
          )}
        </div>
      ))}
    </div>
  );
}
