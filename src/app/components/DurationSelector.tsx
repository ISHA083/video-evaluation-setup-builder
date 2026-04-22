interface DurationSelectorProps {
  duration: number;
  onChange: (duration: number) => void;
}

export function DurationSelector({ duration, onChange }: DurationSelectorProps) {
  return (
    <div className="flex items-center gap-2">
      <label className="text-sm text-muted-foreground">Duration:</label>
      <select
        value={duration}
        onChange={(e) => onChange(Number(e.target.value))}
        className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm outline-none focus:border-ring"
      >
        <option value={1}>1 min</option>
        <option value={2}>2 min</option>
        <option value={3}>3 min</option>
        <option value={4}>4 min</option>
        <option value={5}>5 min</option>
      </select>
    </div>
  );
}
