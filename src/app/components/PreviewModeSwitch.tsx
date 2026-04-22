interface PreviewModeSwitchProps {
  mode: 'overview' | 'experience';
  onChange: (mode: 'overview' | 'experience') => void;
}

export function PreviewModeSwitch({ mode, onChange }: PreviewModeSwitchProps) {
  return (
    <div>
      <label className="mb-3 block text-sm">Preview Mode</label>
      <div className="flex gap-3">
        <button
          onClick={() => onChange('overview')}
          className={`flex-1 rounded-lg border-2 px-4 py-3 text-sm transition-all ${
            mode === 'overview'
              ? 'border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400'
              : 'border-border bg-background text-muted-foreground hover:border-border/80'
          }`}
        >
          Evaluation Overview
        </button>
        <button
          onClick={() => onChange('experience')}
          className={`flex-1 rounded-lg border-2 px-4 py-3 text-sm transition-all ${
            mode === 'experience'
              ? 'border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400'
              : 'border-border bg-background text-muted-foreground hover:border-border/80'
          }`}
        >
          Candidate Experience
        </button>
      </div>
    </div>
  );
}
