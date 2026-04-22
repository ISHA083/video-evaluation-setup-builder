import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { ProgressIndicator } from './components/ProgressIndicator';
import { JobDescriptionInput } from './components/JobDescriptionInput';
import { LoadingState } from './components/LoadingState';
import { JobSummaryCard } from './components/JobSummaryCard';
import { EvaluationLevelSelector, SeniorityLevel, DepthLevel } from './components/EvaluationLevelSelector';
import { ExampleQuestions } from './components/ExampleQuestions';
import { EditRoleModal } from './components/EditRoleModal';
import { ConfigureEvaluation } from './components/ConfigureEvaluation';
import { PreviewAndSend } from './components/PreviewAndSend';

type WorkflowState = 'input' | 'loading' | 'extracted';
type Step = 1 | 2 | 3;

interface JobSummary {
  role: string;
  experienceRange: string;
  keySkills: string[];
}

export default function App() {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [state, setState] = useState<WorkflowState>('input');
  const [jobSummary, setJobSummary] = useState<JobSummary>({
    role: 'SAP TM Consultant',
    experienceRange: '6–10 years',
    keySkills: ['SAP TM', 'Integration', 'Planning', 'Optimization'],
  });
  const [seniority, setSeniority] = useState<SeniorityLevel>('senior');
  const [depth, setDepth] = useState<DepthLevel>('moderate');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const getStepStatus = (stepNumber: number) => {
    if (stepNumber < currentStep) return 'completed' as const;
    if (stepNumber === currentStep) return 'active' as const;
    return 'inactive' as const;
  };

  const steps = [
    { label: 'Setup Role', status: getStepStatus(1) },
    { label: 'Configure Evaluation', status: getStepStatus(2) },
    { label: 'Review & Send', status: getStepStatus(3) },
  ];

  const getLevelString = () => {
    const seniorityMap = {
      junior: 'Junior',
      mid: 'Mid-Level',
      senior: 'Senior',
    };
    const depthMap = {
      basic: 'Basic',
      moderate: 'Moderate',
      advanced: 'Advanced',
    };
    return `${seniorityMap[seniority]} + ${depthMap[depth]}`;
  };

  const handleJobDescriptionSubmit = (content: string) => {
    setState('loading');
    setTimeout(() => {
      setState('extracted');
    }, 2000);
  };

  const handleReanalyze = () => {
    setState('input');
  };

  const handleLaunch = () => {
    console.log('Evaluation launched!');
    // Handle launch logic here
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-6 py-12">
        <div className="mb-12">
          <div className="mb-8 text-center">
            <h1 className="mb-2">
              {currentStep === 1
                ? 'Create Video Evaluation'
                : currentStep === 2
                ? 'Configure Evaluation'
                : 'Preview & Send'}
            </h1>
            <p className="text-sm text-muted-foreground">
              {currentStep === 1
                ? 'Set up how candidates will be evaluated using structured video responses'
                : currentStep === 2
                ? 'Customize the questions used to evaluate candidates'
                : 'Review the evaluation before sharing with candidates'}
            </p>
          </div>

          <div className="mb-8 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-muted px-4 py-1.5">
              <span className="text-xs text-muted-foreground">Step {currentStep} of 3</span>
            </div>
          </div>

          <ProgressIndicator steps={steps} currentStep={currentStep} />
        </div>

        {currentStep === 1 && (
          <>
            <div className="space-y-12">
              {state === 'input' && (
                <JobDescriptionInput onSubmit={handleJobDescriptionSubmit} />
              )}

              {state === 'loading' && <LoadingState />}

              {state === 'extracted' && (
                <>
                  <JobSummaryCard
                    summary={jobSummary}
                    onEdit={() => setIsEditModalOpen(true)}
                    onReanalyze={handleReanalyze}
                  />

                  <EvaluationLevelSelector
                    seniority={seniority}
                    depth={depth}
                    onSeniorityChange={setSeniority}
                    onDepthChange={setDepth}
                  />

                  <ExampleQuestions seniority={seniority} depth={depth} />
                </>
              )}
            </div>

            {state === 'extracted' && (
              <div className="mt-12 space-y-4">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm text-primary-foreground transition-opacity hover:opacity-90"
                >
                  Continue to Configure Evaluation
                  <ChevronRight className="h-4 w-4" />
                </button>
                <p className="text-center text-xs text-muted-foreground">
                  Next: Customize questions and evaluation sections
                </p>
              </div>
            )}
          </>
        )}

        {currentStep === 2 && (
          <ConfigureEvaluation
            role={jobSummary.role}
            experience={jobSummary.experienceRange}
            level={getLevelString()}
            onBack={() => setCurrentStep(1)}
            onContinue={() => setCurrentStep(3)}
          />
        )}

        {currentStep === 3 && (
          <PreviewAndSend
            role={jobSummary.role}
            experience={jobSummary.experienceRange}
            level={getLevelString()}
            onBack={() => setCurrentStep(2)}
            onLaunch={handleLaunch}
          />
        )}
      </div>

      <EditRoleModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        currentSummary={jobSummary}
        onSave={setJobSummary}
      />
    </div>
  );
}
