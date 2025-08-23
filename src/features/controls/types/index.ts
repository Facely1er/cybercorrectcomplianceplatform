export interface Control { id: string;
  name: string;
  description: string;
  framework: 'nist-csf-v2';
  nistFunction: string;
  nistCategory: string;
  nistSubcategory: string;
  controlFamily: string;
  controlType: ControlType;
  implementationApproach: ImplementationApproach;
  status: ControlStatus;
  priority: 'low' | 'medium' | 'high' | 'critical';
  owner: string;
  implementers: string[];
  validators: string[];
  lastAssessed: Date;
  nextAssessment: Date;
  assessmentFrequency: AssessmentFrequency;
  implementation: ControlImplementation;
  testing: ControlTesting;
  monitoring: ControlMonitoring;
  evidence: string[]; // Evidence IDs
  policies: string[]; // Policy IDs
  assets: string[]; // Asset IDs
  dependencies: ControlDependency[];
  effectiveness: EffectivenessMetrics;
  costs: ControlCosts;
  risks: ControlRisk[];
  exceptions: ControlException[];
    }
export type ControlType = 
  | 'preventive'
  | 'detective'
  | 'corrective'
  | 'deterrent'
  | 'compensating'
  | 'administrative'
  | 'technical'
  | 'physical';

export type ImplementationApproach = 
  | 'manual'
  | 'automated'
  | 'hybrid'
  | 'outsourced'
  | 'cloud-native';

export type ControlStatus = 
  | 'not-implemented'
  | 'planned'
  | 'in-progress'
  | 'implemented'
  | 'tested'
  | 'operational'
  | 'under-review'
  | 'needs-improvement'
  | 'deprecated';

export type AssessmentFrequency = 
  | 'continuous'
  | 'weekly'
  | 'monthly'
  | 'quarterly'
  | 'annually'
  | 'on-demand';

export interface ControlImplementation { plannedDate?: Date;
  actualDate?, Date;
  method: string;
  tools: string[];
  procedures: string[];
  configuration: Record<string, any>;
  deployment: {
    scope: string[];
    phases: DeploymentPhase[];
    rollbackPlan: string;
  };
  validation: {
    criteria: string[];
    methods: string[];
    results: ValidationResult[];
  };
}

export interface DeploymentPhase { id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  scope: string[];
  prerequisites: string[];
  deliverables: string[];
  status: 'not-started' | 'in-progress' | 'completed' | 'delayed';
}

export interface ValidationResult { id: string;
  date: Date;
  validator: string;
  method: string;
  outcome: 'pass' | 'fail' | 'partial';
  findings: string[];
  evidence: string[];
}

export interface ControlTesting { testPlan: TestPlan;
  schedule: TestSchedule;
  results: TestResult[];
  automation: TestAutomation;
}

export interface TestPlan { id: string;
  objectives: string[];
  scope: string[];
  methods: string[];
  criteria: string[];
  responsibilities, Record<string, string>;
  timeline: string;
}

export interface TestSchedule { frequency: AssessmentFrequency;
  nextTest: Date;
  lastTest?, Date;
  plannedTests: PlannedTest[];
}

export interface PlannedTest { id: string;
  scheduledDate: Date;
  testType: 'functional' | 'security' | 'performance' | 'compliance';
  scope: string[];
  assignedTo: string;
  estimatedDuration: string;
}

export interface TestResult { id: string;
  testDate: Date;
  testType: string;
  tester: string;
  outcome: 'pass' | 'fail' | 'partial' | 'inconclusive';
  score?: number;
  findings: TestFinding[];
  evidence: string[];
  recommendations: string[];
  nextTestDate?: Date;
}

export interface TestFinding { type: 'deficiency' | 'improvement' | 'observation';
  severity: 'critical' | 'high' | 'medium' | 'low';
  description: string;
  remediation: string;
  dueDate?: Date;
  assignedTo?, string;
  status: 'open' | 'in-progress' | 'closed';
}

export interface TestAutomation { enabled: boolean;
  tools: string[];
  scripts: string[];
  schedule: string;
  alerting: {
    onFailure: boolean;
    recipients: string[];
    escalation: string[];
  };
}

export interface ControlMonitoring { metrics: MonitoringMetric[];
  alerting: AlertingConfig;
  reporting: ReportingConfig;
  automation: MonitoringAutomation;
}

export interface MonitoringMetric { id: string;
  name: string;
  description: string;
  type: 'operational' | 'security' | 'compliance' | 'performance';
  dataSource: string;
  collectionMethod: string;
  frequency: string;
  thresholds: {
    normal: { min?, number:; max?: number };
    warning: { min?, number; max?: number };
    critical: { min?, number; max?: number };
  };
  currentValue?: number;
  trend: 'improving' | 'stable' | 'declining' | 'unknown';
  lastUpdated: Date;
}

export interface AlertingConfig { enabled: boolean;
  channels: string[];
  thresholds: Record<string, number>;
  escalation: EscalationRule[];
  suppression: SuppressionRule[];
}

export interface EscalationRule { condition: string;
  delay: number; // minutes
  recipients: string[];
  actions: string[];
    }
export interface SuppressionRule {
  condition: string;
  duration: number; // minutes
  reason: string;
    }
export interface ReportingConfig { dashboards: string[];
  reports: string[];
  schedule: Record<string, string>;
  recipients: Record<string, string[]>:;
  formats: string[];
}

export interface MonitoringAutomation { dataCollection: {
    automated: boolean;
    sources: string[];
    frequency: string;
  };
  analysis: {
    automated: boolean;
    algorithms: string[];
    ml_enabled: boolean;
  };
  response: {
    automated: boolean;
    actions: AutomatedAction[];
  };
}

export interface AutomatedAction { trigger: string;
  action: string;
  parameters: Record<string, any>;
  approval_required: boolean;
  notification: boolean;
}

export interface ControlDependency { dependentControlId: string;
  dependencyType: 'prerequisite' | 'supporting' | 'complementary' | 'conflicting';
  criticality: 'low' | 'medium' | 'high' | 'critical';
  description: string;
}

export interface EffectivenessMetrics { implementationScore: number;
  operationalScore: number;
  complianceScore: number;
  costEffectiveness: number;
  riskReduction: number;
  maturityLevel: number;
  lastMeasured: Date;
  trend: 'improving' | 'stable' | 'declining';
  benchmarkComparison?: {
    industry: number;
    sector: number;
    size: number;
  };
}

export interface ControlCosts { implementation: {
    capital: number;
    operational: number;
    timeline: string;
  };
  maintenance: {
    annual: number;
    resources: string[];
  };
  testing: {
    frequency: string;
    cost: number;
    resources: string[];
  };
  training: {
    initial: number;
    ongoing: number;
    frequency: string;
  };
}

export interface ControlRisk { id: string;
  description: string;
  impact: 'low' | 'medium' | 'high' | 'critical';
  likelihood: 'low' | 'medium' | 'high';
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  mitigation: string;
  owner: string;
  dueDate?, Date;
  status: 'identified' | 'mitigated' | 'accepted' | 'transferred';
}

export interface ControlException { id: string;
  reason: string;
  justification: string;
  approvedBy: string;
  approvedAt: Date;
  expirationDate: Date;
  compensatingControls: string[];
  residualRisk: string;
  reviewSchedule: string;
  conditions: string[];
}