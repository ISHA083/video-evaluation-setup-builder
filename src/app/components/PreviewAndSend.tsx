import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ContextBar } from './ContextBar';
import { PreviewModeSwitch } from './PreviewModeSwitch';
import { EvaluationOverview } from './EvaluationOverview';
import { CandidateExperience } from './CandidateExperience';
import { ShareEvaluation } from './ShareEvaluation';

interface PreviewAndSendProps {
  role: string;
  experience: string;
  level: string;
  onBack: () => void;
  onLaunch: () => void;
}

export function PreviewAndSend({
  role,
  experience,
  level,
  onBack,
  onLaunch,
}: PreviewAndSendProps) {
  const [previewMode, setPreviewMode] = useState<'overview' | 'experience'>('overview');

  return (
    <div className="space-y-8">
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
              This is what candidates will experience during the evaluation
            </p>
          </div>
          <button
            onClick={onBack}
            className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm transition-colors hover:bg-muted"
          >
            Edit Evaluation
          </button>
        </div>
      </div>

      <PreviewModeSwitch mode={previewMode} onChange={setPreviewMode} />

      {previewMode === 'overview' ? <EvaluationOverview /> : <CandidateExperience />}

      <ShareEvaluation />

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex items-center gap-2 rounded-lg border border-border bg-background px-6 py-3 text-sm transition-colors hover:bg-muted"
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </button>
        <button
          onClick={onLaunch}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm text-primary-foreground transition-opacity hover:opacity-90"
        >
          Launch Evaluation
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
