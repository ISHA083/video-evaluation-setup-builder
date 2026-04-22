import { Pencil, RotateCcw } from 'lucide-react';

interface JobSummary {
  role: string;
  experienceRange: string;
  keySkills: string[];
}

interface JobSummaryCardProps {
  summary: JobSummary;
  onEdit: () => void;
  onReanalyze: () => void;
}

export function JobSummaryCard({ summary, onEdit, onReanalyze }: JobSummaryCardProps) {
  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-border bg-card p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3>Job Summary</h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-xs text-muted-foreground">
              Role Detected
            </label>
            <input
              type="text"
              value={summary.role}
              readOnly
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs text-muted-foreground">
              Experience Range
            </label>
            <input
              type="text"
              value={summary.experienceRange}
              readOnly
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs text-muted-foreground">
              Key Skills
            </label>
            <div className="flex flex-wrap gap-2">
              {summary.keySkills.map((skill, index) => (
                <span
                  key={index}
                  className="rounded-md bg-secondary px-3 py-1.5 text-xs text-secondary-foreground"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-4 text-xs text-muted-foreground">
          Auto-detected from JD. You can edit if needed.
        </p>
      </div>

      <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-900 dark:bg-blue-950/30">
        <p className="text-sm text-blue-900 dark:text-blue-200">
          We've extracted key role details. Next, you'll define how candidates should be evaluated.
        </p>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onEdit}
          className="flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm transition-colors hover:bg-muted"
        >
          <Pencil className="h-4 w-4" />
          Edit Role
        </button>
        <button
          onClick={onReanalyze}
          className="flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm transition-colors hover:bg-muted"
        >
          <RotateCcw className="h-4 w-4" />
          Re-analyze JD
        </button>
      </div>
    </div>
  );
}
