import { Upload } from 'lucide-react';
import { useState } from 'react';

interface JobDescriptionInputProps {
  onSubmit: (content: string) => void;
}

export function JobDescriptionInput({ onSubmit }: JobDescriptionInputProps) {
  const [pastedText, setPastedText] = useState('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        onSubmit(content);
      };
      reader.readAsText(file);
    }
  };

  const handlePaste = () => {
    if (pastedText.trim()) {
      onSubmit(pastedText);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-2">Start with the Job Description</h3>
        <p className="text-sm text-muted-foreground">
          Upload or paste a job description. We'll extract role details automatically.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <input
            type="file"
            id="file-upload"
            className="hidden"
            accept=".pdf,.doc,.docx,.txt"
            onChange={handleFileUpload}
          />
          <label
            htmlFor="file-upload"
            className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/30 px-6 py-12 transition-colors hover:bg-muted/50"
          >
            <Upload className="mb-3 h-8 w-8 text-muted-foreground" />
            <span className="mb-1 text-sm text-foreground">
              Upload JD (PDF or DOCX)
            </span>
            <span className="text-xs text-muted-foreground">
              Drag and drop or click to upload
            </span>
          </label>
        </div>

        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-border" />
          <span className="text-sm text-muted-foreground">or</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="space-y-3">
          <textarea
            value={pastedText}
            onChange={(e) => setPastedText(e.target.value)}
            placeholder="Paste the job description here..."
            className="min-h-[160px] w-full rounded-lg border border-border bg-input-background px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:bg-background"
          />
          <button
            onClick={handlePaste}
            disabled={!pastedText.trim()}
            className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Analyze Job Description
          </button>
        </div>

        <p className="text-xs text-muted-foreground">
          We'll extract role, skills, and experience level automatically
        </p>
      </div>
    </div>
  );
}
