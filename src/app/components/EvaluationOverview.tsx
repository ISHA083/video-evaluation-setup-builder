import { Clock } from 'lucide-react';

interface SectionOverview {
  title: string;
  whatCandidateWillDo: string;
  focus: string[];
  time: string;
  format: string;
}

export function EvaluationOverview() {
  const sections: SectionOverview[] = [
    {
      title: 'General Introduction',
      whatCandidateWillDo: 'You will introduce yourself and walk through your experience, including key projects and responsibilities.',
      focus: ['Communication', 'Structure', 'Confidence'],
      format: '1 response • 1 question',
      time: 'Time limit: Up to 3 minutes',
    },
    {
      title: 'Role Fit Explanation',
      whatCandidateWillDo: 'You will explain how your experience aligns with the role and demonstrate relevant expertise.',
      focus: ['Role understanding', 'Relevance', 'Clarity'],
      format: '1 response • 1 question',
      time: 'Time limit: Up to 3 minutes',
    },
    {
      title: 'Values & Behavior',
      whatCandidateWillDo: 'You will answer scenario-based questions from real project situations, demonstrating how you handle challenges.',
      focus: ['Ownership', 'Integrity'],
      format: '2–3 responses • scenario-based questions',
      time: 'Time limit: Up to 3 minutes per response',
    },
    {
      title: 'Technical Scenario',
      whatCandidateWillDo: 'You will explain how you solved a real technical problem, including your approach and decision-making process.',
      focus: ['System design', 'Decision-making'],
      format: '2 responses • scenario-based questions',
      time: 'Time limit: Up to 5 minutes per response',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-2 dark:border-blue-900 dark:bg-blue-950/20">
        <p className="text-xs text-blue-700 dark:text-blue-300">9 questions across 4 structured sections</p>
      </div>

      <div className="space-y-4">
        {sections.map((section, index) => (
          <div key={index} className="rounded-lg border border-border bg-card p-5">
            <h3 className="mb-3">{section.title}</h3>

            <div className="space-y-3">
              <div>
                <div className="mb-1 text-xs text-muted-foreground">What candidate will do</div>
                <p className="text-sm text-foreground">{section.whatCandidateWillDo}</p>
              </div>

              <div>
                <div className="mb-1.5 text-xs text-muted-foreground">What we evaluate</div>
                <div className="flex flex-wrap gap-2">
                  {section.focus.map((item, i) => (
                    <span
                      key={i}
                      className="rounded-md bg-secondary px-2.5 py-1 text-xs text-secondary-foreground"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="mb-1 text-xs text-muted-foreground">Format</div>
                <p className="text-sm text-foreground">{section.format}</p>
              </div>

              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                {section.time}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-lg border border-border bg-card p-5">
        <div className="mb-2 flex items-center gap-3 text-sm">
          <span className="font-medium">4 Sections</span>
          <span className="text-muted-foreground">•</span>
          <span className="text-muted-foreground">9 Questions</span>
          <span className="text-muted-foreground">•</span>
          <span className="text-muted-foreground">Estimated Duration: ~18 minutes</span>
        </div>
        <p className="text-xs text-muted-foreground">
          Candidates will complete this in a structured guided session
        </p>
      </div>
    </div>
  );
}
