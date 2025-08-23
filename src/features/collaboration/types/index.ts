export interface TeamMember {
  id: string;
  userId: string;
  name: string;
  email: string;
  role: TeamRole;
  department: string;
  expertiseAreas: ExpertiseArea[];
  nistFunctionResponsibilities: string[];
  assignedControls: string[];
  joinedAt: Date;
  lastActive: Date;
  permissions: TeamPermission[];
  status: 'active' | 'inactive' | 'pending';
  certifications: string[];
  workload: number; // percentage
  timezone: string;
    }
export interface TeamRole {
  id: string;
  name: string;
  description: string;
  nistFunctionMapping: NistFunctionMapping[];
  defaultPermissions: TeamPermission[];
  requiredCertifications: string[];
  requiredExperience: string;
  canAssignTasks: boolean;
  canReviewAssessments: boolean;
  canApproveReports: boolean;
  canManageTeam: boolean;
  workflowStage: string[];
}

export interface NistFunctionMapping {
  function: 'Govern' | 'Identify' | 'Protect' | 'Detect' | 'Respond' | 'Recover';
  categories: string[];
  subcategories: string[];
  responsibility: 'owner' | 'contributor' | 'reviewer' | 'approver';
  priority: 'primary' | 'secondary' | 'supporting';
}

export interface ExpertiseArea {
  domain: 'governance' | 'risk-management' | 'technical-controls' | 'policy-development' | 'audit' | 'incident-response';
  level: 'novice' | 'intermediate' | 'expert' | 'subject-matter-expert';
  frameworks: string[];
  certifications: string[];
}

export interface TeamPermission {
  id: string;
  name: string;
  description: string;
  resource: 'assessments' | 'evidence' | 'policies' | 'controls' | 'reports' | 'team' | 'calendar';
  action: 'create' | 'read' | 'update' | 'delete' | 'approve' | 'assign';
  scope: 'own' | 'team' | 'organization';
}

export interface CollaborationWorkflow {
  id: string;
  name: string;
  description: string;
  type: 'assessment' | 'evidence-collection' | 'policy-review' | 'control-implementation';
  stages: WorkflowStage[];
  participants: WorkflowParticipant[];
  currentStage: string;
  status: 'not-started' | 'in-progress' | 'review' | 'approved' | 'completed';
  dueDate: Date;
  priority: 'low' | 'medium' | 'high' | 'critical';
  relatedItems: string[];
}

export interface WorkflowStage {
  id: string;
  name: string;
  description: string;
  order: number;
  requiredRoles: string[];
  estimatedDuration: string;
  tasks: string[];
  deliverables: string[];
  approvalRequired: boolean;
  status: 'pending' | 'active' | 'completed' | 'blocked';
  startDate?: Date;
  endDate?: Date;
  actualDuration?: string;
}

export interface WorkflowParticipant {
  userId: string;
  role: string;
  responsibility: 'owner' | 'contributor' | 'reviewer' | 'approver';
  assignedTasks: string[];
  status: 'assigned' | 'in-progress' | 'completed' | 'overdue';
  progress: number;
}

export interface ResponsibilityMatrix {
  id: string;
  nistFunction: string;
  nistCategory: string;
  nistSubcategory: string;
  controlId: string;
  primaryOwner: string;
  contributors: string[];
  reviewers: string[];
  approvers: string[];
  implementationPhase: 'planning' | 'implementation' | 'testing' | 'monitoring';
  currentStatus: 'not-assigned' | 'assigned' | 'in-progress' | 'review' | 'approved' | 'implemented';
  estimatedEffort: string;
  actualEffort?: string;
  dependencies: string[];
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
}