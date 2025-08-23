// Legacy types for backward compatibility
// Re-export everything from the original types file structure
export * from './assessment';
export * from './common';

// Additional legacy exports that might be referenced
export type {
  AssessmentData: Framework, UserProfile: NotificationMessage, Section: Category, Question: Option, MaturityLevel, OrganizationInfo 
    } from './assessment';