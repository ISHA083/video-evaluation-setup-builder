import { useState } from 'react';
import { X, Plus } from 'lucide-react';

interface KeywordChipsProps {
  keywords: string[];
  onChange: (keywords: string[]) => void;
  placeholder?: string;
}

export function KeywordChips({ keywords, onChange, placeholder = 'e.g., SAP TM, integration' }: KeywordChipsProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newKeyword, setNewKeyword] = useState('');

  const addKeyword = () => {
    const trimmed = newKeyword.trim();
    if (trimmed && !keywords.includes(trimmed)) {
      onChange([...keywords, trimmed]);
    }
    setNewKeyword('');
    setIsAdding(false);
  };

  const removeKeyword = (keyword: string) => {
    onChange(keywords.filter((k) => k !== keyword));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addKeyword();
    } else if (e.key === 'Escape') {
      setNewKeyword('');
      setIsAdding(false);
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-xs text-muted-foreground">Expected Keywords/Response Points (optional)</label>
      <div className="flex flex-wrap gap-2">
        {keywords.map((keyword, index) => (
          <span
            key={index}
            className="flex items-center gap-1.5 rounded-md border border-purple-200 bg-purple-50 px-3 py-1.5 text-xs text-purple-700 dark:border-purple-800 dark:bg-purple-950/30 dark:text-purple-300"
          >
            {keyword}
            <button
              onClick={() => removeKeyword(keyword)}
              className="rounded-sm transition-colors hover:bg-purple-100 dark:hover:bg-purple-900/50"
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}

        {isAdding ? (
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={newKeyword}
              onChange={(e) => setNewKeyword(e.target.value)}
              onKeyDown={handleKeyPress}
              onBlur={addKeyword}
              placeholder={placeholder}
              autoFocus
              className="w-48 rounded-md border border-border bg-input-background px-2 py-1 text-xs outline-none focus:border-ring"
            />
          </div>
        ) : (
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-1.5 rounded-md border border-dashed border-purple-300 px-3 py-1.5 text-xs text-purple-600 transition-colors hover:border-purple-500 hover:bg-purple-50 hover:text-purple-700 dark:border-purple-700 dark:text-purple-400 dark:hover:bg-purple-950/30"
          >
            <Plus className="h-3 w-3" />
            Add keyword
          </button>
        )}
      </div>
      <p className="text-xs text-muted-foreground">Keywords or topics you expect in a strong answer</p>
    </div>
  );
}
