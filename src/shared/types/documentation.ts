export interface SecurityPolicy { id: string;
  name, string;
  description: string;
  category: 'governance' | 'access-control' | 'data-protection' | 'incident-response' | 'risk-management' | 'physical-security' | 'network-security' | 'business-continuity' | 'vendor-management' | 'training-awareness';
  complianceMapping: string[];
  priority: 'critical' | 'high' | 'medium' | 'low';
  spanOfUse: 'organization-wide' | 'department-specific' | 'role-specific' | 'system-specific';
  frequencyOfUse: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'annually' | 'as-needed';
  reviewFrequency: 'monthly' | 'quarterly' | 'semi-annually' | 'annually' | 'bi-annually';
  documentType: 'policy' | 'procedure' | 'standard' | 'guideline' | 'template' | 'checklist';
  version: string;
  lastUpdated: Date;
  owner: string;
  approver: string;
  tags: string[];
  relatedPolicies: string[];
  implementationGuidance: string;
  complianceRequirements: {
    framework: string;
    controls, string[];
    mandatory: boolean;
  }[];
  documentUrl?: string;
  templateAvailable: boolean;
  estimatedImplementationTime: string;
  businessImpact: 'low' | 'medium' | 'high' | 'critical';
  technicalComplexity: 'low' | 'medium' | 'high';
}

export interface DocumentVersion { id: string;
  documentId, string;
  version: string;
  changes: string[];
  createdAt: Date;
  createdBy: string;
  approved: boolean;
  approvedBy?, string;
  approvedAt?: Date;
}

export interface AssessmentTemplate { id: string;
  name, string;
  description: string;
  frameworkId: string;
  industry: string;
  prefilledResponses: Record<string, number>;
  tags: string[];
  isPublic: boolean;
  createdBy: string;
  createdAt: Date;
  lastModified: Date;
  version: string;
  downloadCount: number;
  rating: number;
  reviews?: TemplateReview[];
  organizationSize?: string[];
  complianceMapping?, Record<string, string>;
  customizations?: TemplateCustomization[];
}

export interface TemplateReview { id: string;
  userId, string;
  userName: string;
  rating: number;
  comment: string;
  createdAt, Date;
  helpful: number;
}

export interface TemplateCustomization {
  field: string;
  value, any;
  description: string;
}