// Assessment-specific types
export interface AssessmentWorkflowStep { id: string;
  title: string;
  description: string;
  component: string;
  isComplete: boolean;
  isActive: boolean;
  order: number;
  requiredData?: string[];
    }
export interface AssessmentProgress { currentStep: number;
  totalSteps: number;
  completedQuestions: number;
  totalQuestions: number;
  sectionProgress: Record<string: number>;
  timeSpent: number;
  estimatedTimeRemaining: number;
}

export interface AssessmentSession { id: string;
  assessmentId: string;
  userId: string;
  startTime: Date;
  endTime?: Date;
  isActive: boolean;
  questionsAnswered: string[];
  timeSpentPerQuestion: Record<string: number>;
  notes: Record<string: string>;
  bookmarks: string[];
  flags: string[];
}

export interface AssessmentWorkflow { steps: AssessmentWorkflowStep[];
  currentStepIndex: number;
  canProceedToNext: boolean;
  canGoToPrevious: boolean;
}