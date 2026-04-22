import { X } from 'lucide-react';

interface RegenerateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (mode: 'replace' | 'variations') => void;
}

export function RegenerateModal({ isOpen, onClose, onConfirm }: RegenerateModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg border border-border bg-background p-6 shadow-lg">
        <div className="mb-6 flex items-center justify-between">
          <h3>Regenerate Questions</h3>
          <button
            onClick={onClose}
            className="rounded-lg p-1 transition-colors hover:bg-muted"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <p className="mb-6 text-sm text-muted-foreground">
          This will replace your current questions
        </p>

        <div className="space-y-3">
          <button
            onClick={() => {
              onConfirm('replace');
              onClose();
            }}
            className="w-full rounded-lg border border-border bg-background px-4 py-3 text-left text-sm transition-colors hover:bg-muted"
          >
            <div className="font-medium">Replace existing questions</div>
            <div className="text-xs text-muted-foreground">
              Remove current questions and generate new ones
            </div>
          </button>
          <button
            onClick={() => {
              onConfirm('variations');
              onClose();
            }}
            className="w-full rounded-lg border border-border bg-background px-4 py-3 text-left text-sm transition-colors hover:bg-muted"
          >
            <div className="font-medium">Add variations instead</div>
            <div className="text-xs text-muted-foreground">
              Keep existing and add new question variations
            </div>
          </button>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-lg border border-border bg-background px-4 py-2 text-sm transition-colors hover:bg-muted"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
