import { useState } from 'react';
import { Link, Check, Plus, X } from 'lucide-react';

export function ShareEvaluation() {
  const [linkCopied, setLinkCopied] = useState(false);
  const [emails, setEmails] = useState<string[]>(['']);

  const handleCopyLink = () => {
    const link = 'https://example.com/evaluation/abc123';

    // Fallback method for when Clipboard API is blocked
    const textArea = document.createElement('textarea');
    textArea.value = link;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.select();

    try {
      document.execCommand('copy');
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    } finally {
      document.body.removeChild(textArea);
    }
  };

  const addEmailField = () => {
    setEmails([...emails, '']);
  };

  const updateEmail = (index: number, value: string) => {
    const updated = [...emails];
    updated[index] = value;
    setEmails(updated);
  };

  const removeEmail = (index: number) => {
    setEmails(emails.filter((_, i) => i !== index));
  };

  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <h3 className="mb-4">Share Evaluation</h3>

      <div className="space-y-4">
        <div>
          <button
            onClick={handleCopyLink}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-background px-4 py-3 text-sm transition-colors hover:bg-muted"
          >
            {linkCopied ? (
              <>
                <Check className="h-4 w-4 text-green-600 dark:text-green-500" />
                <span className="text-green-600 dark:text-green-500">Link copied</span>
              </>
            ) : (
              <>
                <Link className="h-4 w-4" />
                Copy Evaluation Link
              </>
            )}
          </button>
        </div>

        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs text-muted-foreground">or</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div>
          <label className="mb-2 block text-sm">Send to candidates</label>
          <div className="space-y-2">
            {emails.map((email, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => updateEmail(index, e.target.value)}
                  placeholder="Enter email address"
                  className="flex-1 rounded-lg border border-border bg-input-background px-3 py-2 text-sm outline-none focus:border-ring focus:bg-background"
                />
                {emails.length > 1 && (
                  <button
                    onClick={() => removeEmail(index)}
                    className="rounded-lg border border-border bg-background px-3 transition-colors hover:bg-muted"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            onClick={addEmailField}
            className="mt-2 flex items-center gap-2 text-sm text-primary transition-opacity hover:opacity-80"
          >
            <Plus className="h-4 w-4" />
            Add another
          </button>
        </div>
      </div>
    </div>
  );
}
