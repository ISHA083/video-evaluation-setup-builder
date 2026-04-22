import { Pencil } from 'lucide-react';

interface ContextBarProps {
  role: string;
  experience: string;
  level: string;
  onEdit: () => void;
}

export function ContextBar({ role, experience, level, onEdit }: ContextBarProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="mb-1 flex items-center gap-2 text-sm">
            <span className="font-medium text-foreground">{role}</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground">{experience}</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground">{level}</span>
          </div>
          <p className="text-xs text-muted-foreground">
            You can customize all questions below. Changes are saved automatically.
          </p>
        </div>
        <button
          onClick={onEdit}
          className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm transition-colors hover:bg-muted"
        >
          <Pencil className="h-4 w-4" />
          Edit Setup
        </button>
      </div>
    </div>
  );
}
