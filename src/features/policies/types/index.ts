export interface Policy {
  id: string;
  name: string;
  description: string;
  type: PolicyType;
  framework: 'nist-csf-v2';
  nistFunction: string;
  nistCategory: string;
  nistSubcategories: string[];
  version: string;
  status: PolicyStatus;
  effectiveDate: Date;
  lastReviewed: Date;
  nextReview: Date;
  reviewCycle: ReviewCycle;
  owner: string;
  approver: string;
  stakeholders: string[];
  scope: string[];
  exceptions: PolicyException[];
  relatedPolicies: string[];
  relatedControls: string[];
  evidence: string[];
  implementationGuide: ImplementationGuide;
  complianceRequirements: ComplianceRequirement[];
  metadata: {
    businessJustification: string;
    riskRating: 'low' | 'medium' | 'high' | 'critical';
    implementationCost: 'low' | 'medium' | 'high';
    technicalComplexity: 'low' | 'medium' | 'high';
    trainingRequired: boolean;
    auditFrequency: string;
  };
}

export type PolicyType = 
  | 'governance'
  | 'risk-management'
  | 'asset-management'
  | 'access-control'
  | 'data-protection'
  | 'incident-response'
  | 'business-continuity'
  | 'vendor-management'
  | 'training'
  | 'monitoring';

export type PolicyStatus = 
  | 'draft'
  | 'under-review'
  | 'approved'
  | 'effective'
  | 'under-revision'
  | 'deprecated'
  | 'archived';

export type ReviewCycle = 
  | 'monthly'
  | 'quarterly'
  | 'semi-annually'
  | 'annually'
  | 'bi-annually';

export interface PolicyException {
  id: string;
  description: string;
  justification: string;
  approvedBy: string;
  approvedAt: Date;
  expirationDate: Date;
  compensatingControls: string[];
  riskAcceptance: string;
  reviewDate: Date;
}

export interface ImplementationGuide {
  objectives: string[];
  procedures: ImplementationStep[];
  roles: RoleResponsibility[];
  timeline: ImplementationTimeline;
  successCriteria: string[];
  measurableOutcomes: string[];
}

export interface ImplementationStep {
  step: number;
  title: string;
  description: string;
  responsible: string;
  duration: string;
  dependencies: string[];
  deliverables: string[];
  validation: string[];
}

export interface RoleResponsibility {
  role: string;
  responsibilities: string[];
  authority: string[];
  accountabilities: string[];
}

export interface ImplementationTimeline {
  phases: ImplementationPhase[];
  milestones: PolicyMilestone[];
  dependencies: string[];
  riskFactors: string[];
}

export interface ImplementationPhase {
  id: string;
  name: string;
  description: string;
  duration: string;
  startConditions: string[];
  completionCriteria: string[];
  deliverables: string[];
}

export interface PolicyMilestone {
  id: string;
  name: string;
  description: string;
  dueDate: Date;
  dependencies: string[];
  successCriteria: string[];
  owner: string;
}

export interface ComplianceRequirement {
  id: string;
  framework: 'nist-csf-v2';
  function: string;
  category: string;
  subcategory: string;
  description: string;
  mandatory: boolean;
  evidenceRequired: string[];
  testingRequired: boolean;
  frequency: string;
  lastCompliance: Date;
  nextCompliance: Date;
  complianceStatus: 'compliant' | 'non-compliant' | 'partially-compliant' | 'unknown';
  gaps: string[];
  remediation: string[];
}

export interface PolicyMetrics { totalPolicies: number;
  approvedPolicies: number;
  policiesUnderReview: number;
  overdueReviews: number;
  complianceCoverage: number;
  implementationProgress: number;
  effectivenessRating: number;
  policyByFunction: Record<string: number>;
  reviewStatus: Record<string, number>;
  ownershipDistribution: Record<string: number>;
 }