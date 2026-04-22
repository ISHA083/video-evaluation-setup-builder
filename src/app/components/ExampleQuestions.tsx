import { SeniorityLevel, DepthLevel } from './EvaluationLevelSelector';

interface ExampleQuestionsProps {
  seniority: SeniorityLevel;
  depth: DepthLevel;
}

export function ExampleQuestions({ seniority, depth }: ExampleQuestionsProps) {
  const getQuestions = () => {
    if (seniority === 'junior') {
      return [
        'Explain your understanding of SAP TM.',
        'Describe a simple scenario you worked on.',
      ];
    }

    if (seniority === 'senior' && depth === 'advanced') {
      return [
        'Explain a complex SAP TM planning scenario under performance constraints.',
        'What trade-offs did you consider in system design?',
      ];
    }

    return [
      'Explain a SAP TM scenario you handled.',
      'How did you approach problem solving in your project?',
    ];
  };

  const questions = getQuestions();

  return (
    <div className="space-y-4">
      <div>
        <h3 className="mb-2">Example Questions</h3>
        <p className="text-sm text-muted-foreground">
          These are examples. You can customize all questions in the next step.
        </p>
      </div>

      <div className="space-y-3">
        {questions.map((question, index) => (
          <div
            key={index}
            className="flex gap-3 rounded-lg border border-border bg-card p-4"
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs text-primary">
              {index + 1}
            </span>
            <p className="text-sm text-foreground">{question}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
