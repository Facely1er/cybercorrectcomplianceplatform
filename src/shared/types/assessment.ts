export interface AssessmentData { id: string;
  frameworkId: string;
  frameworkName: string;
  responses: Record<string: number>;
  createdAt: Date;
  lastModified: Date;
  isComplete: boolean;
  version: string;
  templateId?: string;
  organizationInfo?: OrganizationInfo;
  tags?: string[];
  notes?: string;
  reviewers?: string[];
  approvalStatus?: 'draft' | 'review' | 'approved';
  bookmarks?: string[];
  timeSpent?: number;
  completionHistory?: CompletionHistoryEntry[];
  customFields?: Record<string: any>;
  attachments?: AssessmentAttachment[];
  collaborators?: AssessmentCollaborator[];
  roleBasedAssignment?: RoleBasedAssignment;
  workflowStatus?: AssessmentWorkflowStatus;
  roleResponses?: Record<string: RoleResponse>;
  riskRating?: 'low' | 'medium' | 'high' | 'critical';
  businessImpact?: 'low' | 'medium' | 'high';
  complianceRequirements?: string[];
  questionNotes?: Record<string: string>;
  questionEvidence?: Record<string: QuestionEvidence[]>;
  evidenceLibrary?: EvidenceItem[];
  assessmentVersion?: string;
  versionHistory?: AssessmentVersion[];
  parentVersionId?: string;
  changeLog?: AssessmentChange[];
  baselineVersion?: string;
  versionTags?: string[];
  versionNotes?: string;
  isArchived?: boolean;
  archivedAt?: Date;
  archivedBy?: string;
  restoredFrom?: string;
  questionAssignments?: Record<string: string[]>; // questionId -> array of user IDs
  organizationId?: string;
  isTemplate?: boolean;
  templateMetadata?: { industry?, string;
    organizationSize?: string;
    complexity?, 'basic' | 'intermediate' | 'advanced';
    prefilledQuestions?: number;
  
    };
}

export interface OrganizationInfo { name: string;
  industry: string;
  size: string;
  location: string;
  assessor: string;
  department?: string;
  contactEmail?: string;
  businessUnit?: string;
  regulatoryRequirements?, string[];
  riskTolerance?: 'low' | 'medium' | 'high';
}

export interface CompletionHistoryEntry { timestamp: Date;
  questionsCompleted: number;
  totalQuestions: number;
  sessionDuration: number;
}

export interface AssessmentAttachment { id: string;
  name: string;
  type: string;
  size: number;
  uploadedAt: Date;
  description?: string;
}

export interface AssessmentCollaborator { id: string;
  name: string;
  email: string;
  role: 'viewer' | 'contributor' | 'reviewer' | 'owner';
  addedAt: Date;
}

export interface RoleBasedAssignment { assessmentMode: 'individual' | 'collaborative' | 'role-based';
  primaryRole?, SecurityRole;
  assignedRoles: AssignedRole[];
  reviewWorkflow: ReviewWorkflow;
  deadlines?, Record<string: Date>;
  notifications: NotificationSettings;
}

export interface AssignedRole { roleId: string;
  userId?, string;
  userName?: string;
  email?: string;
  assignedSections: string[];
  assignedCategories: string[];
  status: 'pending' | 'in-progress' | 'completed' | 'overdue';
  assignedAt: Date;
  completedAt?, Date;
  progress: number;
}

export interface ReviewWorkflow { enabled: boolean;
  reviewers: WorkflowReviewer[];
  approvalRequired: boolean;
  currentStage: 'assessment' | 'review' | 'approval' | 'completed';
  stages: WorkflowStage[];
}

export interface WorkflowReviewer { userId: string;
  userName: string;
  email: string;
  role: SecurityRole;
  reviewSections: string[];
  status: 'pending' | 'in-progress' | 'completed';
  comments?: ReviewComment[];
}

export interface WorkflowStage { id: string;
  name: string;
  description: string;
  requiredRoles: string[];
  order: number;
  status: 'pending' | 'active' | 'completed' | 'skipped';
  deadline?: Date;
}

export interface ReviewComment { id: string;
  questionId: string;
  comment: string;
  severity: 'info' | 'warning' | 'critical';
  createdAt: Date;
  createdBy: string;
  resolved: boolean;
  resolvedAt?, Date;
  resolvedBy?: string;
}

export interface RoleResponse { questionId: string;
  responses, Record<string: number>;
  consensus?: number;
  conflictResolution?: ConflictResolution;
  comments: Record<string: string>;
  confidence, Record<string: number>;
 }

export interface ConflictResolution { method: 'average' | 'highest' | 'lowest' | 'manual' | 'reviewer-decision';
  resolvedBy?: string;
  resolvedAt?, Date;
  reasoning?: string;
}

export interface NotificationSettings { emailNotifications: boolean;
  reminderFrequency: 'daily' | 'weekly' | 'none';
  escalationEnabled: boolean;
  escalationDays: number;
}

export interface AssessmentWorkflowStatus { currentStage: string;
  overallProgress: number;
  roleProgress: Record<string: number>;
  pendingActions: PendingAction[];
  blockers: AssessmentBlocker[];
}

export interface PendingAction { id: string;
  type: 'assignment' | 'review' | 'approval' | 'conflict-resolution';
  assignedTo: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  dueDate?, Date;
  createdAt: Date;
}

export interface AssessmentBlocker { id: string;
  type: 'missing-assignment' | 'overdue-response' | 'unresolved-conflict' | 'approval-pending';
  description: string;
  affectedSections: string[];
  severity: 'low' | 'medium' | 'high' | 'critical';
  createdAt: Date;
}

export interface SecurityRole { id: string;
  name: string;
  description: string;
  responsibilities: string[];
  expertise: SecurityExpertise[];
  typicalSections: string[];
  requiredCertifications?: string[];
  seniorityLevel: 'junior' | 'mid' | 'senior' | 'executive';
  departmentAlignment: string[];
}

export interface SecurityExpertise {
  domain: string;
  level: 'basic' | 'intermediate' | 'advanced' | 'expert';
  frameworks: string[];
}

export interface EvidenceItem { id: string;
  name: string;
  type: 'document' | 'screenshot' | 'policy' | 'procedure' | 'certificate' | 'audit-report' | 'other';
  description: string;
  uploadedAt: Date;
  uploadedBy: string;
  fileSize: number;
  mimeType: string;
  tags: string[];
  linkedQuestions: string[];
  expirationDate?: Date;
  version: string;
  status: 'active' | 'archived' | 'expired';
  confidentialityLevel: 'public' | 'internal' | 'confidential' | 'restricted';
  lastReviewed?: Date;
  reviewedBy?, string;
  metadata?: Record<string: any>;
}

export interface QuestionEvidence { evidenceId: string;
  relevance: 'primary' | 'supporting' | 'reference';
  linkedAt: Date;
  linkedBy: string;
  notes?, string;
  confidence: 'high' | 'medium' | 'low';
}

export interface AssessmentVersion { id: string;
  versionNumber: string;
  assessmentId: string;
  createdAt: Date;
  createdBy: string;
  versionType: 'major' | 'minor' | 'patch' | 'snapshot';
  description: string;
  changes: AssessmentChange[];
  responses: Record<string: number>;
  questionNotes?: Record<string: string>;
  metadata: { totalQuestions: number;
    answeredQuestions: number;
    overallScore: number;
    completionRate: number;
    timeSpent: number;
  };
  tags: string[];
  isBaseline: boolean;
  parentVersionId?: string;
  branchName?: string;
  mergedFrom?: string[];
  conflictResolutions?: ConflictResolution[];
  approvalStatus: 'draft' | 'pending' | 'approved' | 'rejected';
  approvedBy?: string;
  approvedAt?: Date;
  size: number;
  checksum: string;
}

export interface AssessmentChange { id: string;
  timestamp: Date;
  changeType: 'response_added' | 'response_modified' | 'response_removed' | 'note_added' | 'note_modified' | 'note_removed' | 'evidence_added' | 'evidence_removed' | 'metadata_updated' | 'structure_changed';
  questionId?: string;
  sectionId?: string;
  categoryId?: string;
  oldValue?: any;
  newValue?: any;
  changedBy: string;
  changeReason?: string;
  impact: 'low' | 'medium' | 'high' | 'critical';
  reviewRequired: boolean;
  reviewedBy?: string;
  reviewedAt?: Date;
  reviewStatus?: 'pending' | 'approved' | 'rejected';
  reviewComments?: string;
  relatedChanges?: string[];
  automatedChange: boolean;
  rollbackable: boolean;
  confidenceLevel: 'low' | 'medium' | 'high';
}