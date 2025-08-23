export interface CalendarEvent { id: string;
  title: string;
  description: string;
  type: CalendarEventType;
  startDate: Date;
  endDate: Date;
  allDay: boolean;
  recurrence?: Recurrence;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: EventStatus;
  attendees: Attendee[];
  location?: string;
  relatedItems: RelatedItem[];
  notifications: Notification[];
  metadata: { createdBy: string;
    createdAt: Date;
    lastModified: Date;
    category: string;
    tags: string[];
  };
}

export type CalendarEventType = 
  | 'assessment'
  | 'control-review'
  | 'evidence-collection'
  | 'policy-review'
  | 'training'
  | 'audit'
  | 'risk-assessment'
  | 'incident-review'
  | 'milestone'
  | 'deadline';

export type EventStatus = 
  | 'scheduled'
  | 'in-progress'
  | 'completed'
  | 'cancelled'
  | 'overdue';

export interface Recurrence { pattern: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'annually';
  interval: number;
  endDate?: Date;
  occurrences?: number;
  daysOfWeek?: number[]; // 0 = Sunday, 1 = Monday, etc.
  dayOfMonth?, number;
  weekOfMonth?: number;
    }
export interface Attendee { id: string;
  name: string;
  email: string;
  role: string;
  required: boolean;
  response: 'pending' | 'accepted' | 'declined' | 'tentative';
  responseDate?: Date;
}

export interface RelatedItem { type: 'control' | 'asset' | 'policy' | 'evidence' | 'assessment' | 'finding';
  id: string;
  name: string;
  url?: string;
}

export interface Notification { type: 'email' | 'in-app' | 'sms';
  timing: number; // minutes before event
  recipients: string[];
  enabled: boolean;
    }
export interface ComplianceCalendar { id: string;
  name: string;
  description: string;
  framework: 'nist-csf-v2';
  events: CalendarEvent[];
  subscriptions: CalendarSubscription[];
  settings: CalendarSettings;
}

export interface CalendarSubscription { userId: string;
  eventTypes: CalendarEventType[];
  priorities: string[];
  notifications: boolean;
  digestFrequency: 'none' | 'daily' | 'weekly' | 'monthly';
}

export interface CalendarSettings { defaultView: 'month' | 'week' | 'day' | 'agenda';
  workingHours: {
    start: string; // HH:mm format
    end: string;
  
    };
  workingDays: number[]; // 0 = Sunday, 1 = Monday, etc.
  timezone: string;
  reminderDefaults: {
    assessments: number; // minutes
    reviews: number;
    deadlines: number;
  
    };
}

export interface ActivityMetrics { upcomingEvents: number;
  overdueEvents: number;
  completedThisMonth: number;
  criticalDeadlines: number;
  complianceActivities: number;
  evidenceCollection: number;
  policyReviews: number;
  controlAssessments: number;
}