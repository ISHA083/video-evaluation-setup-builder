import { useState, useEffect, useRef } from 'react';
import { Check } from 'lucide-react';

interface EditableQuestionProps {
  question: string;
  onChange: (value: string) => void;
}

export function EditableQuestion({ question, onChange }: EditableQuestionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(question);
  const [isSaving, setIsSaving] = useState(false);
  const [showSaved, setShowSaved] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    setValue(question);
  }, [question]);

  const handleChange = (newValue: string) => {
    setValue(newValue);
    setIsSaving(true);
    setShowSaved(false);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      onChange(newValue);
      setIsSaving(false);
      setShowSaved(true);
      setTimeout(() => setShowSaved(false), 2000);
    }, 800);
  };

  const handleBlur = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    onChange(value);
    setIsSaving(false);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="space-y-2">
        <textarea
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          onBlur={handleBlur}
          autoFocus
          className="w-full rounded-lg border border-ring bg-background px-3 py-2 text-sm outline-none focus:border-ring"
          rows={2}
        />
        {isSaving && (
          <p className="text-xs text-muted-foreground">Saving...</p>
        )}
        {showSaved && (
          <div className="flex items-center gap-1 text-xs text-green-600 dark:text-green-500">
            <Check className="h-3 w-3" />
            Saved
          </div>
        )}
      </div>
    );
  }

  return (
    <p
      onClick={() => setIsEditing(true)}
      className="cursor-pointer rounded-lg px-3 py-2 text-sm text-foreground transition-colors hover:bg-muted"
    >
      {value}
    </p>
  );
}
