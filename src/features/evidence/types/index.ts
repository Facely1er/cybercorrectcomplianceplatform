export interface Evidence {
  id: string;
  name: string;
  description: string;
  type: EvidenceType;
  controlIds: string[];
  assetIds: string[];
  filePath?: string;
  fileSize?: number;
  mimeType?: string;
  uploadedBy: string;
  uploadedAt: Date;
  lastReviewed?: Date;
  reviewedBy?: string;
  status: EvidenceStatus;
  confidentialityLevel: 'public' | 'internal' | 'confidential' | 'restricted';
  retention: {
    period: number; // months
    reason: string;
    disposalDate: Date;
  
    };
  metadata: {
    version: string;
    source: string;
    validFrom: Date;
    validTo?: Date;
    approvalRequired: boolean;
    approvedBy?: string;
    approvedAt?: Date;
  };
  tags: string[];
  linkedControls: LinkedControl[];
  complianceMapping: ComplianceMapping[];
}

export type EvidenceType = 
  | 'policy'
  | 'procedure' 
  | 'screenshot'
  | 'audit-report'
  | 'test-result'
  | 'training-record'
  | 'assessment-report'
  | 'certificate'
  | 'log-file'
  | 'configuration'
  | 'vulnerability-scan'
  | 'penetration-test';

export type EvidenceStatus = 
  | 'draft'
  | 'under-review'
  | 'approved'
  | 'rejected'
  | 'expired'
  | 'archived';

export interface LinkedControl {
  controlId: string;
  controlName: string;
  linkType: 'implementation' | 'testing' | 'monitoring' | 'documentation';
  effectiveness: 'high' | 'medium' | 'low' | 'unknown';
  lastValidated: Date;
  validatedBy: string;
}

export interface ComplianceMapping {
  framework: 'nist-csf-v2';
  function: string;
  category: string;
  subcategory: string;
  requirement: string;
  mappingType: 'direct' | 'supporting' | 'related';
}

export interface EvidenceCollection {
  id: string;
  name: string;
  description: string;
  controlId: string;
  requiredEvidenceTypes: EvidenceType[];
  collectionStatus: 'not-started' | 'in-progress' | 'complete' | 'overdue';
  dueDate: Date;
  assignedTo: string[];
  evidence: Evidence[];
  completionPercentage: number;
  lastUpdated: Date;
}

export interface EvidenceValidation {
  id: string;
  evidenceId: string;
  validationType: 'automated' | 'manual' | 'peer-review' | 'expert-review';
  status: 'pending' | 'passed' | 'failed' | 'requires-attention';
  validatedBy: string;
  validatedAt: Date;
  findings: ValidationFinding[];
  nextValidation: Date;
}

export interface ValidationFinding {
  type: 'issue' | 'recommendation' | 'observation';
  severity: 'critical' | 'high' | 'medium' | 'low' | 'info';
  description: string;
  remediation?: string;
  dueDate?: Date;
  assignedTo?: string;
}