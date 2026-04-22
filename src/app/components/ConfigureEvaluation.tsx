import { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, RotateCcw, X, ChevronDown } from 'lucide-react';
import { ContextBar } from './ContextBar';
import { EvaluationSection } from './EvaluationSection';
import { EditableQuestion } from './EditableQuestion';
import { DurationSelector } from './DurationSelector';
import { ValueSelector } from './ValueSelector';
import { RegenerateModal } from './RegenerateModal';
import { CustomCheckbox } from './CustomCheckbox';
import { KeywordChips } from './KeywordChips';

interface QuestionConfig {
  question: string;
  aiFollowUpsEnabled: boolean;
  followUpCount: number;
  expectedKeywords: string[];
  showAIEnhance: boolean;
}

interface ConfigureEvaluationProps {
  role: string;
  experience: string;
  level: string;
  onBack: () => void;
  onContinue: () => void;
}

export function ConfigureEvaluation({
  role,
  experience,
  level,
  onBack,
  onContinue,
}: ConfigureEvaluationProps) {
  const [generalIntroEnabled, setGeneralIntroEnabled] = useState(true);
  const [generalIntroDuration, setGeneralIntroDuration] = useState(3);
  const [generalIntroQuestions, setGeneralIntroQuestions] = useState<QuestionConfig[]>([
    {
      question: 'Tell us about your experience, key projects, and what defines you as a professional.',
      aiFollowUpsEnabled: false,
      followUpCount: 0,
      expectedKeywords: [],
      showAIEnhance: false,
    },
  ]);

  const [roleFitEnabled, setRoleFitEnabled] = useState(true);
  const [roleFitQuestions, setRoleFitQuestions] = useState<QuestionConfig[]>([
    {
      question: 'Explain why you are a good fit for this role based on your experience.',
      aiFollowUpsEnabled: false,
      followUpCount: 0,
      expectedKeywords: [],
      showAIEnhance: false,
    },
  ]);

  const [valuesEnabled, setValuesEnabled] = useState(true);
  const [selectedValues, setSelectedValues] = useState(['Ownership', 'Integrity']);
  const [valueQuestions, setValueQuestions] = useState<QuestionConfig[]>([
    {
      question: 'Tell us about a time you handled a conflict in a team',
      aiFollowUpsEnabled: false,
      followUpCount: 0,
      expectedKeywords: [],
      showAIEnhance: false,
    },
    {
      question: 'Describe a situation where you took ownership of a difficult problem',
      aiFollowUpsEnabled: false,
      followUpCount: 0,
      expectedKeywords: [],
      showAIEnhance: false,
    },
  ]);

  const [technicalEnabled, setTechnicalEnabled] = useState(true);
  const [technicalMode, setTechnicalMode] = useState<'direct' | 'category'>('direct');
  const [selectedCategories, setSelectedCategories] = useState(['Design', 'Architecture']);
  const [technicalQuestions, setTechnicalQuestions] = useState<QuestionConfig[]>([
    {
      question: 'Describe a complex SAP TM scenario you handled',
      aiFollowUpsEnabled: false,
      followUpCount: 0,
      expectedKeywords: [],
      showAIEnhance: false,
    },
    {
      question: 'How did you resolve a system performance issue',
      aiFollowUpsEnabled: false,
      followUpCount: 0,
      expectedKeywords: [],
      showAIEnhance: false,
    },
  ]);

  const [regenerateModalOpen, setRegenerateModalOpen] = useState(false);
  const [regenerateTarget, setRegenerateTarget] = useState<string>('');

  const allValues = ['Ownership', 'Integrity', 'Collaboration', 'Customer Focus', 'Accountability'];
  const technicalCategories = ['Design', 'Architecture', 'Integration', 'Performance', 'Debugging'];

  // General Intro helpers
  const addGeneralIntroQuestion = () => {
    setGeneralIntroQuestions([
      ...generalIntroQuestions,
      { question: 'New question', aiFollowUpsEnabled: false, followUpCount: 0, expectedKeywords: [], showAIEnhance: false },
    ]);
  };

  const removeGeneralIntroQuestion = (index: number) => {
    setGeneralIntroQuestions(generalIntroQuestions.filter((_, i) => i !== index));
  };

  const updateGeneralIntroQuestion = (index: number, field: keyof QuestionConfig, value: any) => {
    const updated = [...generalIntroQuestions];
    updated[index] = { ...updated[index], [field]: value };
    setGeneralIntroQuestions(updated);
  };

  // Role Fit helpers
  const addRoleFitQuestion = () => {
    setRoleFitQuestions([
      ...roleFitQuestions,
      { question: 'New question', aiFollowUpsEnabled: false, followUpCount: 0, expectedKeywords: [], showAIEnhance: false },
    ]);
  };

  const removeRoleFitQuestion = (index: number) => {
    setRoleFitQuestions(roleFitQuestions.filter((_, i) => i !== index));
  };

  const updateRoleFitQuestion = (index: number, field: keyof QuestionConfig, value: any) => {
    const updated = [...roleFitQuestions];
    updated[index] = { ...updated[index], [field]: value };
    setRoleFitQuestions(updated);
  };

  // Value questions helpers
  const addValueQuestion = () => {
    setValueQuestions([
      ...valueQuestions,
      { question: 'New question', aiFollowUpsEnabled: false, followUpCount: 0, expectedKeywords: [], showAIEnhance: false },
    ]);
  };

  const removeValueQuestion = (index: number) => {
    setValueQuestions(valueQuestions.filter((_, i) => i !== index));
  };

  const updateValueQuestion = (index: number, field: keyof QuestionConfig, value: any) => {
    const updated = [...valueQuestions];
    updated[index] = { ...updated[index], [field]: value };
    setValueQuestions(updated);
  };

  // Technical questions helpers
  const addTechnicalQuestion = () => {
    setTechnicalQuestions([
      ...technicalQuestions,
      { question: 'New question', aiFollowUpsEnabled: false, followUpCount: 0, expectedKeywords: [], showAIEnhance: false },
    ]);
  };

  const removeTechnicalQuestion = (index: number) => {
    setTechnicalQuestions(technicalQuestions.filter((_, i) => i !== index));
  };

  const updateTechnicalQuestion = (index: number, field: keyof QuestionConfig, value: any) => {
    const updated = [...technicalQuestions];
    updated[index] = { ...updated[index], [field]: value };
    setTechnicalQuestions(updated);
  };

  const handleRegenerate = (target: string) => {
    setRegenerateTarget(target);
    setRegenerateModalOpen(true);
  };

  const handleRegenerateConfirm = (mode: 'replace' | 'variations') => {
    console.log(`Regenerate ${regenerateTarget} with mode: ${mode}`);
  };

  const totalSections = [generalIntroEnabled, roleFitEnabled, valuesEnabled, technicalEnabled].filter(Boolean).length;
  const totalQuestions =
    (generalIntroEnabled ? generalIntroQuestions.length : 0) +
    (roleFitEnabled ? roleFitQuestions.length : 0) +
    (valuesEnabled ? valueQuestions.length : 0) +
    (technicalEnabled ? technicalQuestions.length : 0);
  const totalMinutes = totalQuestions * 2;

  return (
    <div className="space-y-8">
      <ContextBar role={role} experience={experience} level={level} onEdit={onBack} />

      <EvaluationSection
        title="General Introduction"
        description="Understand candidate communication and overall experience"
        enabled={generalIntroEnabled}
        onToggle={() => setGeneralIntroEnabled(!generalIntroEnabled)}
      >
        <div className="space-y-4">
          <div className="space-y-4">
            {generalIntroQuestions.map((q, index) => (
              <div key={index} className="rounded-lg border border-border bg-muted/30 p-4">
                <div className="mb-3 flex items-start gap-2">
                  <div className="flex-1">
                    <EditableQuestion
                      question={q.question}
                      onChange={(value) => updateGeneralIntroQuestion(index, 'question', value)}
                    />
                  </div>
                  {generalIntroQuestions.length > 1 && (
                    <button
                      onClick={() => removeGeneralIntroQuestion(index)}
                      className="rounded-lg p-2 transition-colors hover:bg-muted"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>

                <button
                  onClick={() => updateGeneralIntroQuestion(index, 'showAIEnhance', !q.showAIEnhance)}
                  className="flex items-center gap-2 text-xs text-blue-600 transition-colors hover:text-blue-700"
                >
                  <ChevronDown className={`h-4 w-4 transition-transform ${q.showAIEnhance ? 'rotate-180' : ''}`} />
                  Enhance with AI
                </button>

                {q.showAIEnhance && (
                  <div className="mt-3 space-y-4 rounded-lg border border-blue-200 bg-blue-50/50 p-4 dark:border-blue-900 dark:bg-blue-950/20">
                    <div className="flex items-center gap-3">
                      <CustomCheckbox
                        checked={q.aiFollowUpsEnabled}
                        onChange={(checked) => updateGeneralIntroQuestion(index, 'aiFollowUpsEnabled', checked)}
                        label="Enable AI Follow-ups"
                      />
                      {q.aiFollowUpsEnabled && (
                        <select
                          value={q.followUpCount}
                          onChange={(e) => updateGeneralIntroQuestion(index, 'followUpCount', Number(e.target.value))}
                          className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm outline-none"
                        >
                          <option value={0}>0 follow-ups</option>
                          <option value={1}>1 follow-up</option>
                          <option value={2}>2 follow-ups</option>
                          <option value={3}>3 follow-ups</option>
                        </select>
                      )}
                    </div>

                    <KeywordChips
                      keywords={q.expectedKeywords}
                      onChange={(keywords) => updateGeneralIntroQuestion(index, 'expectedKeywords', keywords)}
                      placeholder="e.g., SAP TM, integration"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          <button
            onClick={addGeneralIntroQuestion}
            className="flex items-center gap-2 text-sm text-primary transition-opacity hover:opacity-80"
          >
            <Plus className="h-4 w-4" />
            Add Question
          </button>

          <DurationSelector duration={generalIntroDuration} onChange={setGeneralIntroDuration} />
        </div>
      </EvaluationSection>

      <EvaluationSection
        title="Role Fit Explanation"
        description="Assess alignment with the job description"
        enabled={roleFitEnabled}
        onToggle={() => setRoleFitEnabled(!roleFitEnabled)}
      >
        <div className="space-y-4">
          <div className="space-y-4">
            {roleFitQuestions.map((q, index) => (
              <div key={index} className="rounded-lg border border-border bg-muted/30 p-4">
                <div className="mb-3 flex items-start gap-2">
                  <div className="flex-1">
                    <EditableQuestion
                      question={q.question}
                      onChange={(value) => updateRoleFitQuestion(index, 'question', value)}
                    />
                  </div>
                  {roleFitQuestions.length > 1 && (
                    <button
                      onClick={() => removeRoleFitQuestion(index)}
                      className="rounded-lg p-2 transition-colors hover:bg-muted"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>

                <button
                  onClick={() => updateRoleFitQuestion(index, 'showAIEnhance', !q.showAIEnhance)}
                  className="flex items-center gap-2 text-xs text-blue-600 transition-colors hover:text-blue-700"
                >
                  <ChevronDown className={`h-4 w-4 transition-transform ${q.showAIEnhance ? 'rotate-180' : ''}`} />
                  Enhance with AI
                </button>

                {q.showAIEnhance && (
                  <div className="mt-3 space-y-4 rounded-lg border border-blue-200 bg-blue-50/50 p-4 dark:border-blue-900 dark:bg-blue-950/20">
                    <div className="flex items-center gap-3">
                      <CustomCheckbox
                        checked={q.aiFollowUpsEnabled}
                        onChange={(checked) => updateRoleFitQuestion(index, 'aiFollowUpsEnabled', checked)}
                        label="Enable AI Follow-ups"
                      />
                      {q.aiFollowUpsEnabled && (
                        <select
                          value={q.followUpCount}
                          onChange={(e) => updateRoleFitQuestion(index, 'followUpCount', Number(e.target.value))}
                          className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm outline-none"
                        >
                          <option value={0}>0 follow-ups</option>
                          <option value={1}>1 follow-up</option>
                          <option value={2}>2 follow-ups</option>
                          <option value={3}>3 follow-ups</option>
                        </select>
                      )}
                    </div>

                    <KeywordChips
                      keywords={q.expectedKeywords}
                      onChange={(keywords) => updateRoleFitQuestion(index, 'expectedKeywords', keywords)}
                      placeholder="e.g., relevant experience"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          <button
            onClick={addRoleFitQuestion}
            className="flex items-center gap-2 text-sm text-primary transition-opacity hover:opacity-80"
          >
            <Plus className="h-4 w-4" />
            Add Question
          </button>
        </div>
      </EvaluationSection>

      <EvaluationSection
        title="Values & Behavior"
        description="Evaluate ownership, integrity, and decision-making"
        enabled={valuesEnabled}
        onToggle={() => setValuesEnabled(!valuesEnabled)}
      >
        <div className="space-y-4">
          <ValueSelector
            values={allValues}
            selectedValues={selectedValues}
            onChange={setSelectedValues}
          />

          <div className="space-y-4">
            {valueQuestions.map((q, index) => (
              <div key={index} className="rounded-lg border border-border bg-muted/30 p-4">
                <div className="mb-3 flex items-start gap-2">
                  <div className="flex-1">
                    <EditableQuestion
                      question={q.question}
                      onChange={(value) => updateValueQuestion(index, 'question', value)}
                    />
                  </div>
                  {valueQuestions.length > 1 && (
                    <button
                      onClick={() => removeValueQuestion(index)}
                      className="rounded-lg p-2 transition-colors hover:bg-muted"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>

                <button
                  onClick={() => updateValueQuestion(index, 'showAIEnhance', !q.showAIEnhance)}
                  className="flex items-center gap-2 text-xs text-blue-600 transition-colors hover:text-blue-700"
                >
                  <ChevronDown className={`h-4 w-4 transition-transform ${q.showAIEnhance ? 'rotate-180' : ''}`} />
                  Enhance with AI
                </button>

                {q.showAIEnhance && (
                  <div className="mt-3 space-y-4 rounded-lg border border-blue-200 bg-blue-50/50 p-4 dark:border-blue-900 dark:bg-blue-950/20">
                    <div className="flex items-center gap-3">
                      <CustomCheckbox
                        checked={q.aiFollowUpsEnabled}
                        onChange={(checked) => updateValueQuestion(index, 'aiFollowUpsEnabled', checked)}
                        label="Enable AI Follow-ups"
                      />
                      {q.aiFollowUpsEnabled && (
                        <select
                          value={q.followUpCount}
                          onChange={(e) => updateValueQuestion(index, 'followUpCount', Number(e.target.value))}
                          className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm outline-none"
                        >
                          <option value={0}>0 follow-ups</option>
                          <option value={1}>1 follow-up</option>
                          <option value={2}>2 follow-ups</option>
                          <option value={3}>3 follow-ups</option>
                        </select>
                      )}
                    </div>

                    <KeywordChips
                      keywords={q.expectedKeywords}
                      onChange={(keywords) => updateValueQuestion(index, 'expectedKeywords', keywords)}
                      placeholder="e.g., ownership, conflict"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <button
              onClick={addValueQuestion}
              className="flex items-center gap-2 text-sm text-primary transition-opacity hover:opacity-80"
            >
              <Plus className="h-4 w-4" />
              Add Question
            </button>
            <button
              onClick={() => handleRegenerate('values')}
              className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <RotateCcw className="h-4 w-4" />
              Regenerate
            </button>
          </div>
        </div>
      </EvaluationSection>

      <EvaluationSection
        title="Technical Scenario"
        description="Evaluate real-world problem solving and technical depth"
        enabled={technicalEnabled}
        onToggle={() => setTechnicalEnabled(!technicalEnabled)}
      >
        <div className="space-y-4">
          <div className="flex gap-3">
            <button
              onClick={() => setTechnicalMode('direct')}
              className={`flex-1 rounded-lg border-2 px-4 py-2 text-sm transition-all ${
                technicalMode === 'direct'
                  ? 'border-primary bg-primary/5 text-foreground'
                  : 'border-border bg-background text-muted-foreground'
              }`}
            >
              Direct Questions
            </button>
            <button
              onClick={() => setTechnicalMode('category')}
              className={`flex-1 rounded-lg border-2 px-4 py-2 text-sm transition-all ${
                technicalMode === 'category'
                  ? 'border-primary bg-primary/5 text-foreground'
                  : 'border-border bg-background text-muted-foreground'
              }`}
            >
              Category-Based
            </button>
          </div>

          {technicalMode === 'category' && (
            <ValueSelector
              values={technicalCategories}
              selectedValues={selectedCategories}
              onChange={setSelectedCategories}
            />
          )}

          <div className="space-y-4">
            {technicalQuestions.map((q, index) => (
              <div key={index} className="rounded-lg border border-border bg-muted/30 p-4">
                <div className="mb-3 flex items-start gap-2">
                  <div className="flex-1">
                    <EditableQuestion
                      question={q.question}
                      onChange={(value) => updateTechnicalQuestion(index, 'question', value)}
                    />
                  </div>
                  {technicalQuestions.length > 1 && (
                    <button
                      onClick={() => removeTechnicalQuestion(index)}
                      className="rounded-lg p-2 transition-colors hover:bg-muted"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>

                <button
                  onClick={() => updateTechnicalQuestion(index, 'showAIEnhance', !q.showAIEnhance)}
                  className="flex items-center gap-2 text-xs text-blue-600 transition-colors hover:text-blue-700"
                >
                  <ChevronDown className={`h-4 w-4 transition-transform ${q.showAIEnhance ? 'rotate-180' : ''}`} />
                  Enhance with AI
                </button>

                {q.showAIEnhance && (
                  <div className="mt-3 space-y-4 rounded-lg border border-blue-200 bg-blue-50/50 p-4 dark:border-blue-900 dark:bg-blue-950/20">
                    <div className="flex items-center gap-3">
                      <CustomCheckbox
                        checked={q.aiFollowUpsEnabled}
                        onChange={(checked) => updateTechnicalQuestion(index, 'aiFollowUpsEnabled', checked)}
                        label="Enable AI Follow-ups"
                      />
                      {q.aiFollowUpsEnabled && (
                        <select
                          value={q.followUpCount}
                          onChange={(e) => updateTechnicalQuestion(index, 'followUpCount', Number(e.target.value))}
                          className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm outline-none"
                        >
                          <option value={0}>0 follow-ups</option>
                          <option value={1}>1 follow-up</option>
                          <option value={2}>2 follow-ups</option>
                          <option value={3}>3 follow-ups</option>
                        </select>
                      )}
                    </div>

                    <KeywordChips
                      keywords={q.expectedKeywords}
                      onChange={(keywords) => updateTechnicalQuestion(index, 'expectedKeywords', keywords)}
                      placeholder="e.g., system design"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <button
              onClick={addTechnicalQuestion}
              className="flex items-center gap-2 text-sm text-primary transition-opacity hover:opacity-80"
            >
              <Plus className="h-4 w-4" />
              Add Question
            </button>
            <button
              onClick={() => handleRegenerate('technical')}
              className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <RotateCcw className="h-4 w-4" />
              Regenerate
            </button>
          </div>
        </div>
      </EvaluationSection>

      <div className="rounded-lg border border-border bg-card p-4">
        <div className="mb-2 text-sm">
          <span className="font-medium">{totalSections} Sections Enabled</span>
          <span className="mx-2 text-muted-foreground">•</span>
          <span className="text-muted-foreground">{totalQuestions} Questions</span>
          <span className="mx-2 text-muted-foreground">•</span>
          <span className="text-muted-foreground">~{totalMinutes} minutes total</span>
        </div>
        <p className="text-xs text-muted-foreground">Ready to preview candidate experience</p>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex items-center gap-2 rounded-lg border border-border bg-background px-6 py-3 text-sm transition-colors hover:bg-muted"
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </button>
        <button
          onClick={onContinue}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm text-primary-foreground transition-opacity hover:opacity-90"
        >
          Preview Candidate Experience
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <RegenerateModal
        isOpen={regenerateModalOpen}
        onClose={() => setRegenerateModalOpen(false)}
        onConfirm={handleRegenerateConfirm}
      />
    </div>
  );
}
