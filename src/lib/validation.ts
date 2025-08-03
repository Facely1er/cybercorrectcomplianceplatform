import { z } from 'zod';

// Asset validation schemas
export const AssetSchema = z.object({
  name: z.string().min(1, 'Asset name is required').max(100, 'Name too long'),
  description: z.string().min(1, 'Description is required').max(500, 'Description too long'),
  category: z.enum(['hardware', 'software', 'data', 'personnel', 'facilities', 'services', 'documents', 'intellectual-property']),
  subcategory: z.string().max(50, 'Subcategory too long'),
  type: z.string().min(1, 'Type is required'),
  owner: z.string().min(1, 'Owner is required').max(100, 'Owner name too long'),
  custodian: z.string().max(100, 'Custodian name too long'),
  status: z.enum(['active', 'inactive', 'disposed', 'maintenance', 'quarantined', 'decommissioned']),
  criticality: z.enum(['critical', 'high', 'medium', 'low']),
  informationClassification: z.enum(['public', 'internal', 'confidential', 'restricted', 'top-secret']),
  businessValue: z.enum(['mission-critical', 'business-important', 'operational', 'developmental', 'administrative']),
  location: z.object({
    type: z.enum(['physical', 'logical', 'cloud', 'hybrid']),
    address: z.string().optional(),
    building: z.string().optional(),
    room: z.string().optional(),
    rack: z.string().optional(),
    cloudProvider: z.string().optional(),
    region: z.string().optional(),
    subnet: z.string().optional()
  }),
  tags: z.array(z.string().max(30, 'Tag too long')).max(20, 'Too many tags')
});

// Assessment validation schemas
export const AssessmentResponseSchema = z.object({
  questionId: z.string().min(1, 'Question ID is required'),
  response: z.number().int().min(0).max(3, 'Response must be between 0-3')
});

export const AssessmentSchema = z.object({
  frameworkId: z.string().min(1, 'Framework ID is required'),
  frameworkName: z.string().min(1, 'Framework name is required'),
  responses: z.record(z.string(), z.number().int().min(0).max(3)),
  organizationInfo: z.object({
    name: z.string().min(1, 'Organization name is required').max(100),
    industry: z.string().max(50),
    size: z.string().max(50),
    location: z.string().max(100),
    assessor: z.string().max(100)
  }).optional(),
  notes: z.string().max(2000, 'Notes too long').optional(),
  tags: z.array(z.string().max(30)).max(10).optional()
});

// User profile validation
export const UserProfileSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
  email: z.string().email('Invalid email address'),
  organization: z.string().min(1, 'Organization is required').max(100, 'Organization name too long'),
  role: z.string().max(50, 'Role too long'),
  industry: z.string().max(50, 'Industry too long'),
  certifications: z.array(z.string().max(50)).max(20, 'Too many certifications').optional(),
  department: z.string().max(50, 'Department too long').optional(),
  manager: z.string().max(100, 'Manager name too long').optional(),
  phoneNumber: z.string().regex(/^\+?[\d\s\-\(\)]+$/, 'Invalid phone number').optional()
});

// Security validation helpers
export const sanitizeString = (input: string): string => {
  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocols
    .replace(/on\w+\s*=/gi, '') // Remove event handlers
    .trim();
};

export const sanitizeObject = (obj: Record<string, any>): Record<string, any> => {
  const sanitized: Record<string, any> = {};
  
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      sanitized[key] = sanitizeString(value);
    } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      sanitized[key] = sanitizeObject(value);
    } else if (Array.isArray(value)) {
      sanitized[key] = value.map(item => 
        typeof item === 'string' ? sanitizeString(item) : item
      );
    } else {
      sanitized[key] = value;
    }
  }
  
  return sanitized;
};

export const validateAndSanitize = <T>(schema: z.ZodSchema<T>, data: unknown): T => {
  // First sanitize if it's an object
  const sanitizedData = typeof data === 'object' && data !== null 
    ? sanitizeObject(data as Record<string, any>)
    : data;
  
  // Then validate
  return schema.parse(sanitizedData);
};