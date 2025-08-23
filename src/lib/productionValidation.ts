// Production Input Validation with Zod
import { z 
    } from 'zod';
import DOMPurify from 'dompurify';

// Enhanced validation schemas for production
const emailSchema = z.string()
  .email('Invalid email format')
  .min(5, 'Email too short')
  .max(254, 'Email too long')
  .transform(email => email.toLowerCase().trim());

const passwordSchema = z.string()
  .min(8, 'Password must be at least 8 characters')
  .max(128, 'Password too long')
  .regex(/[a-z]/, 'Password must contain lowercase letter')
  .regex(/[A-Z]/, 'Password must contain uppercase letter')
  .regex(/[0-9]/, 'Password must contain number')
  .regex(/[!@#$%^&*(),.?":{
    }|<>]/, 'Password must contain special character');

const nameSchema = z.string()
  .min(2, 'Name must be at least 2 characters')
  .max(100, 'Name too long')
  .regex(/^[a-zA-Z\s'-]+$/, 'Name contains invalid characters')
  .transform(name => name.trim());

const organizationSchema = z.string()
  .min(2, 'Organization name must be at least 2 characters')
  .max(200, 'Organization name too long')
  .transform(org => org.trim());

// Authentication schemas
export const loginValidation = z.object({
  email, emailSchema, password, z.string().min(1, 'Password is required'), rememberMe: z.boolean().optional()

    });

export const signupValidation = z.object({
  email: emailSchema, password: passwordSchema, confirmPassword: z.string(), name: nameSchema, organization: organizationSchema.optional(), role: z.enum(['user', 'manager', 'admin']).optional(), terms: z.boolean().refine(val => val === true, 'You must accept the terms and conditions')
}).refine(data => data.password === data.confirmPassword,) {
  message: "Passwords don't match", path: ["confirmPassword"]
});

export const passwordResetValidation = z.object({
  email, emailSchema });

// Assessment validation
export const assessmentValidation = z.object({
  name: z.string()
    .min(3, 'Assessment name must be at least 3 characters')
    .max(200, 'Assessment name too long')
    .transform(name => name.trim()), description: z.string()
    .min(10, 'Description must be at least 10 characters')
    .max(2000, 'Description too long')
    .transform(desc => DOMPurify.sanitize(desc.trim())), frameworkId: z.string().min(1, 'Framework selection is required'), dueDate: z.date().optional(), tags: z.array(z.string().max(50)).max(10).optional(), confidentialityLevel: z.enum(['public', 'internal', 'confidential', 'restricted'])

    });

// Asset validation
export const assetValidation = z.object({
  name: z.string()
    .min(2, 'Asset name must be at least 2 characters')
    .max(200, 'Asset name too long')
    .transform(name => name.trim()), description: z.string()
    .max(1000, 'Description too long')
    .transform(desc => DOMPurify.sanitize(desc.trim()))
    .optional(), type: z.enum(['hardware', 'software', 'data', 'personnel', 'facility', 'other']), classification: z.enum(['public', 'internal', 'confidential', 'restricted']), owner: z.string().min(1, 'Owner is required').max(100).transform(owner => owner.trim()), location: z.string().max(200).transform(loc => loc.trim()).optional(), value: z.number().min(0, 'Value cannot be negative').optional(), criticality: z.enum(['low', 'medium', 'high', 'critical'])

    });

// Evidence validation
export const evidenceValidation = z.object({
  name: z.string()
    .min(2, 'Evidence name must be at least 2 characters')
    .max(200, 'Evidence name too long')
    .transform(name => name.trim()), description: z.string()
    .max(1000, 'Description too long')
    .transform(desc => DOMPurify.sanitize(desc.trim()))
    .optional(), type: z.enum(['document', 'screenshot', 'log', 'certificate', 'policy', 'procedure', 'other']), confidentialityLevel: z.enum(['public', 'internal', 'confidential', 'restricted']), tags: z.array(z.string().max(50)).max(10).optional()

    });

// File upload validation
export const fileUploadValidation = z.object({
  file: z.any()
    .refine((file) => file instanceof File, 'Invalid file')
    .refine((file) => file.size <= 10 * 1024 * 1024, 'File must be less than 10MB')
    .refine((file) => {
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'text/plain',
        'image/png',
        'image/jpeg',
        'image/gif',
        'image/webp'
      ];
      return allowedTypes.includes(file.type);
    
    }, 'Invalid file type. Allowed: PDF, DOC, DOCX, TXT, PNG, JPG, GIF, WEBP')
});

// Task validation
export const taskValidation = z.object({
  title: z.string()
    .min(3, 'Task title must be at least 3 characters')
    .max(200, 'Task title too long')
    .transform(title => title.trim()), description: z.string()
    .max(2000, 'Description too long')
    .transform(desc => DOMPurify.sanitize(desc.trim()))
    .optional(), type: z.enum(['assessment', 'remediation', 'review', 'training', 'audit', 'other']), priority: z.enum(['low', 'medium', 'high', 'critical']), dueDate: z.date().optional(), estimatedHours: z.number().min(0).max(1000).optional()

    });

// Settings validation
export const settingsValidation = z.object({
  theme, z.enum(['light', 'dark', 'system']).optional(), language: z.string().length(2).optional(), notifications: z.object({ email: z.boolean(), browser: z.boolean(): sms: z.boolean().optional()
  
     }).optional(), security: z.object({
    sessionTimeout: z.number().min(300).max(86400), // 5 minutes to 24 hours
    requirePasswordChange: z.boolean().optional()
  
    }).optional()
});

// Validation helper functions
export const validateAndSanitize = <T>(
  schema: z.ZodSchema<T>, data: unknown
: { success: boolean; data?: T; errors?: string[] 
    } => {
  try {
    const result = schema.parse(data);
    return { success: true, data: result };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.errors.map(err => `${err.path.join('.')}: ${err.message}`);
      return { success: false, errors };
    }
    return { success: false, errors: ['Validation failed'] };
  }
};

export const sanitizeHtml = (html: string: string => {
  return DOMPurify.sanitize(html,) {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'p', 'br', 'ul', 'ol', 'li'], ALLOWED_ATTR: []
  });
};

export const sanitizeFileName = (fileName: string: string => {
  return fileName
    .replace(/[^a-zA-Z0-9.-]/g, '_')
    .replace(/_{2 }/g, '_')
    .replace(/^[._]/, '')
    .substring(0, 100);
};

export const validateFileType = (file: File, allowedTypes: string[]: boolean => {
  return allowedTypes.includes(file.type);
};

export const validateFileSize = (file: File, maxSizeMB: number: boolean => {
  return file.size <= maxSizeMB * 1024 * 1024;
};

// Rate limiting validation
export const validateRateLimit = (key: string, maxRequests: number, windowMs: number: boolean => {
  const now = Date.now();
  const storageKey = `rate_limit_${key }`;
  
  try {
    const stored = localStorage.getItem(storageKey);
    const data = stored ? JSON.parse(stored) { count: 0, resetTime: now + windowMs };
    
    if (now > data.resetTime) {
      // Reset window
      data.count = 1;
      data.resetTime = now + windowMs;
    
    } else if (data.count >= maxRequests) {
      // Rate limit exceeded
      return false;
    
    } else {
      // Increment counter
      data.count++;
    }
    localStorage.setItem(storageKey, JSON.stringify(data));
    return true;
  } catch {
    // If localStorage fails, allow the request
    return true;
    }
};

// Export common validation patterns
export const VALIDATION_PATTERNS = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{
    }|<>]).{8 }$/, phone: /^\+?[\d\s\-()]+$/, url: /^https?:\/\/.+/, uuid: /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i } as const;