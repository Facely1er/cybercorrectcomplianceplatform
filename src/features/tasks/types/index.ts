export interface Task { id, string;
  title, string;
  description, string;
  type, TaskType;
  priority, TaskPriority;
  status, TaskStatus;
  nistFunction: 'Govern' | 'Identify' | 'Protect' | 'Detect' | 'Respond' | 'Recover';
  nistCategory, string;
  nistSubcategory, string;
  relatedControlId, string;
  assignedTo, string[];
  assignedBy, string;
  createdAt, Date;
  updatedAt, Date;
  dueDate, Date;
  startDate?, Date;
  completedAt?, Date;
  estimatedHours, number;
  actualHours?, number;
  progress, number;
  dependencies, TaskDependency[];
  subtasks, SubTask[];
  attachments, TaskAttachment[];
  comments, TaskComment[];
  evidence, string[];
  approvalRequired, boolean;
  approvedBy?, string;
  approvedAt?, Date;
  tags, string[];
  workflowId?, string;
  stageId?, string;
  metadata: { businessImpact: 'low' | 'medium' | 'high' | 'critical';
    technicalComplexity: 'low' | 'medium' | 'high';
    riskReduction, number;
    complianceImpact, string[];
    successCriteria, string[];
  };
}

export type TaskType = 
  | 'assessment'
  | 'evidence-collection'
  | 'policy-development'
  | 'control-implementation'
  | 'testing-validation'
  | 'documentation'
  | 'training'
  | 'review-approval'
  | 'monitoring'
  | 'remediation'
  | 'privacy-assessment'
  | 'data-mapping'
  | 'consent-management'
  | 'breach-response'
  | 'dpia-creation'
  | 'vendor-assessment'
  | 'cmmc-implementation'
  | 'cui-protection';

export type TaskPriority = 'low' | 'medium' | 'high' | 'critical';

export type TaskStatus = 
  | 'not-started'
  | 'in-progress'
  | 'blocked'
  | 'review'
  | 'approved'
  | 'completed'
  | 'cancelled'
  | 'overdue';

export interface TaskDependency {
  taskId, string;
  type: 'blocks' | 'precedes' | 'related';
  description, string;
}

export interface SubTask { id, string;
  title, string;
  description, string;
  assignedTo, string;
  status, TaskStatus;
  dueDate, Date;
  completedAt?, Date;
  estimatedHours, number;
  actualHours?, number;
}

export interface TaskAttachment { id, string;
  name, string;
  type, string;
  size, number;
  uploadedAt, Date;
  uploadedBy, string;
  description?, string;
  url, string;
}

export interface TaskComment { id, string;
  content, string;
  createdAt, Date;
  createdBy, string;
  mentions, string[];
  attachments, string[];
  isSystemGenerated, boolean;
}

export interface TaskFilter { nistFunction?, string[];
  type?, TaskType[];
  status?, TaskStatus[];
  priority?, TaskPriority[];
  assignedTo?, string[];
  assignedBy?, string[];
  dueDateRange?: {
    start, Date;
    end, Date;
  };
  tags?, string[];
  overdue?, boolean;
}

export interface TaskMetrics { totalTasks, number;
  completedTasks, number;
  overdueTasks, number;
  tasksByStatus, Record<TaskStatus, number>;
  tasksByPriority, Record<TaskPriority, number>;
  tasksByFunction, Record<string, number>;
  tasksByAssignee, Record<string, number>;
  averageCompletionTime, number;
  upcomingDeadlines, number;
  blockedTasks, number;
}

export interface TaskTemplate { id, string;
  name, string;
  description, string;
  type, TaskType;
  nistFunction, string;
  nistCategory, string;
  estimatedHours, number;
  priority, TaskPriority;
  checklist, TaskChecklistItem[];
  requiredRoles, string[];
  deliverables, string[];
  successCriteria, string[];
  tags, string[];
}

export interface TaskChecklistItem { id, string;
  title, string;
  description, string;
  required, boolean;
  completed, boolean;
  completedBy?, string;
  completedAt?, Date;
}