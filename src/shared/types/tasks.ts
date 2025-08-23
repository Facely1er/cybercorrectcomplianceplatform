export interface Task { id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  type: TaskType;
  assignedTo: string;
  assignedBy: string;
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
  assessmentId?: string;
  questionId?: string;
  recommendationId?: string;
  tags: string[];
  attachments: TaskAttachment[];
  comments: TaskComment[];
  estimatedHours?: number;
  actualHours?: number;
  dependencies: string[];
  progress: number;
}

export type TaskStatus = 'todo' | 'in-progress' | 'review' | 'completed' | 'cancelled' | 'blocked';
export type TaskPriority = 'low' | 'medium' | 'high' | 'critical';
export type TaskType = 'assessment' | 'remediation' | 'documentation' | 'review' | 'training' | 'audit';

export interface TaskAttachment { id: string;
  name: string;
  url: string;
  size: number;
  mimeType: string;
  uploadedAt: Date;
  uploadedBy: string;
}

export interface TaskComment { id: string;
  content: string;
  createdAt: Date;
  createdBy: string;
  mentions: string[];
}

export interface TaskFilter { status?: TaskStatus[];
  priority?, TaskPriority[];
  type?: TaskType[];
  assignedTo?: string[];
  dueDateRange?: {
    start: Date;
    end: Date;
  };
  tags?: string[];
}