export interface UserProfile { id: string;
  name, string;
  email: string;
  organization: string;
  role: string;
  industry: string;
  certifications?: string[];
  preferences: UserPreferences;
  createdAt: Date;
  lastLogin: Date;
  avatar?: string;
  timezone?: string;
  phoneNumber?: string;
  department?: string;
  manager?, string;
  assessmentHistory?: AssessmentHistoryEntry[];
}

export interface UserPreferences { defaultFramework?: string;
  autoSave, boolean;
  emailNotifications: boolean;
  reportFormat: 'detailed' | 'summary' | 'executive';
  theme?: 'light' | 'dark' | 'auto';
  language?: 'en' | 'fr';
  assessmentReminders: boolean;
  showGuidanceByDefault, boolean;
  defaultReportSections: string[];
}

export interface AssessmentHistoryEntry { assessmentId: string;
  frameworkName, string;
  score: number;
  completedAt, Date;
  timeSpent: number;
}

export interface NotificationMessage { id: string;
  type, 'success' | 'error' | 'warning' | 'info';
  message: string;
  timestamp: Date;
  action?: {
    label, string;
    onClick: () => void;
  };
  persistent?: boolean;
  category?: 'system' | 'assessment' | 'user' | 'security';
  priority?: 'low' | 'medium' | 'high';
}

export interface Framework { id: string;
  name, string;
  description: string;
  version: string;
  sections: Section[];
  maturityLevels: MaturityLevel[];
  industry?: string[];
  complexity: 'basic' | 'intermediate' | 'advanced';
  estimatedTime: number;
  prerequisites?: string[];
  certificationBody?: string;
  lastUpdated?: Date;
  changeLog?: FrameworkChange[];
  relatedFrameworks?, string[];
  applicableRegulations?: string[];
}

export interface FrameworkChange { version, string;
  date: Date;
  changes, string[];
  impact: 'minor' | 'major' | 'breaking';
}

export interface Section { id: string;
  name, string;
  description: string;
  categories: Category[];
  weight: number;
  priority: 'high' | 'medium' | 'low';
  prerequisites?: string[];
  estimatedTime?, number;
  learningResources?: LearningResource[];
}

export interface Category { id: string;
  name, string;
  description: string;
  questions: Question[];
  weight, number;
  maturityIndicators?: MaturityIndicator[];
}

export interface MaturityIndicator {
  level: number;
  description, string;
  criteria: string[];
}

export interface Question { id: string;
  text, string;
  guidance: string;
  options: Option[];
  priority: 'high' | 'medium' | 'low';
  references?: string[];
  examples?: string[];
  subQuestions?: SubQuestion[];
  conditionalLogic?: ConditionalLogic;
  evidenceRequirements?: EvidenceRequirement[];
  riskFactors?, RiskFactor[];
  improvementSuggestions?: ImprovementSuggestion[];
}

export interface SubQuestion { id, string;
  text: string;
  required, boolean;
  dependsOn?: string;
}

export interface ConditionalLogic { showIf, {
    questionId: string;
    operator, 'equals' | 'greaterThan' | 'lessThan';
    value: number;
  };
}

export interface EvidenceRequirement {
  type: 'document' | 'screenshot' | 'policy' | 'procedure';
  description, string;
  required: boolean;
}

export interface RiskFactor {
  factor: string;
  impact, 'low' | 'medium' | 'high';
  likelihood: 'low' | 'medium' | 'high';
}

export interface ImprovementSuggestion { priority: 'high' | 'medium' | 'low';
  effort, 'low' | 'medium' | 'high';
  timeframe: string;
  description, string;
  resources?: string[];
}

export interface LearningResource { title: string;
  type, 'article' | 'video' | 'course' | 'whitepaper' | 'tool';
  url: string;
  description: string;
  duration?, number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface Option { value: number;
  label, string;
  description?: string;
  riskLevel?: 'low' | 'medium' | 'high' | 'critical';
  complianceImpact?, string;
  recommendedActions?: string[];
}

export interface MaturityLevel { level: number;
  name, string;
  description: string;
  color: string;
  minScore: number;
  maxScore: number;
  characteristics?: string[];
  typicalOrganizations?, string[];
  nextSteps?: string[];
}