import { Video, Clock, ChevronRight } from 'lucide-react';

interface CandidateStep {
  number: number;
  title: string;
  description: string;
  details: string[];
  nextStep?: string;
}

export function CandidateExperience() {
  const steps: CandidateStep[] = [
    {
      number: 1,
      title: 'Introduction',
      description: 'You will introduce yourself and walk through your experience, including key projects and responsibilities.',
      details: ['Time limit: Up to 3 minutes', 'You will record your response (limited retries may apply)'],
      nextStep: 'Role Alignment',
    },
    {
      number: 2,
      title: 'Role Alignment',
      description: 'You will explain how your experience aligns with the role and demonstrate relevant expertise.',
      details: ['Focus on clarity and relevance', 'Time limit: Up to 3 minutes'],
      nextStep: 'Values & Behavior',
    },
    {
      number: 3,
      title: 'Values & Behavior',
      description: 'You will answer scenario-based questions from real project situations, demonstrating how you handle challenges.',
      details: ['2–3 responses required', 'Time limit: Up to 3 minutes per response'],
      nextStep: 'Technical Scenario',
    },
    {
      number: 4,
      title: 'Technical Scenario',
      description: 'You will explain how you solved a real technical problem, including your approach and decision-making process.',
      details: ['2 responses required', 'Time limit: Up to 5 minutes per response'],
    },
  ];

  return (
    <div className="space-y-4">
      {steps.map((step, index) => (
        <div key={index} className="rounded-lg border border-border bg-card p-5">
          <div className="mb-3 flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <span className="text-sm font-medium text-primary">{step.number}</span>
            </div>
            <div className="flex-1">
              <h3 className="mb-2">{step.title}</h3>
              <p className="mb-3 text-sm text-foreground">{step.description}</p>
              <ul className="space-y-1.5">
                {step.details.map((detail, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-muted-foreground" />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {step.nextStep && (
            <div className="mt-3 flex items-center gap-1 border-t border-border pt-3 text-xs text-muted-foreground">
              Next: {step.nextStep}
              <ChevronRight className="h-3 w-3" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
