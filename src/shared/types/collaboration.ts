export interface TeamMember { id: string;
  userId: string;
  name: string;
  email: string;
  role: CollaborationRole;
  department: string;
  joinedAt: Date;
  lastActive: Date;
  permissions: TeamPermission[];
  status: 'active' | 'inactive' | 'pending';
}

export interface CollaborationRole { id: string;
  name: string;
  description: string;
  permissions: TeamPermission[];
  canAssignTasks: boolean;
  canReviewAssessments: boolean;
  canApproveReports: boolean;
  canManageTeam: boolean;
}

export interface TeamPermission { id: string;
  name: string;
  description: string;
  resource: string;
  action: 'create' | 'read' | 'update' | 'delete' | 'approve';
}