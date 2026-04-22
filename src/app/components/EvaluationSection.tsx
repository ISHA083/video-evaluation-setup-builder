import { ReactNode } from 'react';

interface EvaluationSectionProps {
  title: string;
  description: string;
  enabled: boolean;
  onToggle: () => void;
  children: ReactNode;
}

export function EvaluationSection({
  title,
  description,
  enabled,
  onToggle,
  children,
}: EvaluationSectionProps) {
  return (
    <div className="rounded-lg border border-border bg-card">
      <div className="border-b border-border p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="mb-1">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
          <button
            onClick={onToggle}
            className={`relative h-6 w-11 rounded-full transition-colors ${
              enabled ? 'bg-green-600' : 'bg-muted'
            }`}
          >
            <div
              className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
                enabled ? 'translate-x-5' : 'translate-x-0.5'
              }`}
            />
          </button>
        </div>
      </div>
      {enabled && <div className="p-4">{children}</div>}
    </div>
  );
}
