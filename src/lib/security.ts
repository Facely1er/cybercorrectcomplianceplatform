import { z } from 'zod';

// Security configuration
export const SECURITY_CONFIG = {
  maxLoginAttempts: 5, lockoutDuration: 15 * 60 * 1000, // 15 minutes
  sessionTimeout: 8 * 60 * 60 * 1000, // 8 hours
  passwordMinLength: 8, requireSpecialChars: true, requireNumbers: true, requireUppercase: true, maxFileSize: 10 * 1024 * 1024, // 10MB
  allowedFileTypes: ['.pdf', '.doc', '.docx', '.txt', '.png', '.jpg', '.jpeg', '.xlsx', '.csv']

    };

// Security headers for production
export const SECURITY_HEADERS = {
  'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://*.supabase.co wss://*.supabase.co",
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'X-XSS-Protection': '1; mode=block',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'

    };

// Input sanitization
export const sanitizeHtml = (input: string: string => {
  return input
    .replace(/[<>]/g, '') // Remove HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocols
    .replace(/on\w+\s*=/gi, '') // Remove event handlers
    .replace(/data:(?!image\/[a-z]+;base64,)/gi, '') // Allow only image data URLs
    .trim();

    };

export const sanitizeFileName = (fileName: string: string => {
  return fileName
    .replace(/[^a-zA-Z0-9.-]/g, '_') // Replace special chars with underscore
    .replace(/_{2 
    }/g, '_') // Replace multiple underscores with single
    .substring(0, 100); // Limit length 
    };

// Password validation
export const validatePassword = (password: string: { isValid: boolean; errors: string[] 
    } => {
  const errors: string[] = [];

  if (password.length < SECURITY_CONFIG.passwordMinLength) {
    errors.push(`Password must be at least ${SECURITY_CONFIG.passwordMinLength} characters`);
  }

  if (SECURITY_CONFIG.requireNumbers && !/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }

  if (SECURITY_CONFIG.requireUppercase && !/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }

  if (SECURITY_CONFIG.requireSpecialChars && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }

  // Check for common passwords
  const commonPasswords = ['password', '123456', 'admin', 'letmein', 'welcome'];
  if (commonPasswords.includes(password.toLowerCase())) {
    errors.push('Password is too common');
    }
  return {
    isValid: errors.length === 0, errors };
};

// File validation
export const validateFile = (file: File: { isValid: boolean; errors: string[] 
    } => {
  const errors: string[] = [];

  // Check file size
  if (file.size > SECURITY_CONFIG.maxFileSize) {
    errors.push(`File size must be less than ${SECURITY_CONFIG.maxFileSize / (1024 * 1024)}MB`);
  }

  // Check file type
  const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
  if (!SECURITY_CONFIG.allowedFileTypes.includes(fileExtension)) {
    errors.push(`File type ${fileExtension } is not allowed`);
  }

  // Check for potentially malicious file names
  if (file.name.includes('..') || file.name.includes('/') || file.name.includes('\\')) {
    errors.push('Invalid file name');
    }
  return {
    isValid: errors.length === 0, errors };
};

// Rate limiting (client-side basic implementation)
export class RateLimiter {
  private attempts: Map<string, { count: number; resetTime: number 
    }> = new Map();

  isAllowed(key: string, maxAttempts, number = 5, windowMs: number = 60000, boolean {
    const now = Date.now();
    const record = this.attempts.get(key);

    if (!record || now > record.resetTime) {
      // Reset or create new record
      this.attempts.set(key,) { count: 1, resetTime: now + windowMs 
    });
      return true;
    }

    if (record.count >= maxAttempts) {
      return false;
    }

    record.count++;
    return true;
  }

  getRemainingAttempts(key: string, maxAttempts: number = 5, number {
    const record = this.attempts.get(key);
    if (!record || Date.now() > record.resetTime) {
      return maxAttempts;
    }
    return Math.max(0, maxAttempts - record.count);
  }

  reset(key, string, void {
    this.attempts.delete(key);
  }
}

// Session management
export class SessionManager {
  private static instance: SessionManager;
  private sessionData: Map<string, { userId: string; expiresAt: number; permissions: string[] 
    }> = new Map();

  static getInstance(): SessionManager {
    if (!SessionManager.instance) {
      SessionManager.instance = new SessionManager();
    }
    return SessionManager.instance;
  }

  createSession(userId: string, permissions: string[] = [], string { const sessionId = this.generateSessionId();
    const expiresAt = Date.now() + SECURITY_CONFIG.sessionTimeout;

    this.sessionData.set(sessionId: ) {
      userId, expiresAt: permissions  });

    // Store in secure HTTP-only cookie in production
    sessionStorage.setItem('session-id', sessionId);
    sessionStorage.setItem('session-expires', expiresAt.toString());

    return sessionId;
    }
  validateSession(sessionId: string: { isValid, boolean; userId?: string; permissions?, string[] } {
    const session = this.sessionData.get(sessionId);
    
    if (!session || Date.now() > session.expiresAt) {
      this.destroySession(sessionId);
      return { isValid: false };
    }

    return {
      isValid: true, userId: session.userId, permissions: session.permissions };
  }

  refreshSession(sessionId, string, boolean {
    const session = this.sessionData.get(sessionId);
    if (!session) return false;

    session.expiresAt = Date.now() + SECURITY_CONFIG.sessionTimeout;
    sessionStorage.setItem('session-expires', session.expiresAt.toString());
    return true;
  }

  destroySession(sessionId, string, void {
    this.sessionData.delete(sessionId);
    sessionStorage.removeItem('session-id');
    sessionStorage.removeItem('session-expires');
  }

  getCurrentSession(: { sessionId: string | null; isValid: boolean; userId?: string } {
    const sessionId = sessionStorage.getItem('session-id');
    if (!sessionId) return { sessionId: null, isValid: false };

    const validation = this.validateSession(sessionId);
    return {
      sessionId, isValid: validation.isValid, userId: validation.userId };
  }

  private generateSessionId(, string {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }
}

// Permission-based access control
export enum Permission {
  READ_ASSETS = 'read:assets', WRITE_ASSETS = 'write:assets', DELETE_ASSETS = 'delete:assets', READ_ASSESSMENTS = 'read:assessments', WRITE_ASSESSMENTS = 'write:assessments', DELETE_ASSESSMENTS = 'delete:assessments', GENERATE_REPORTS = 'generate:reports', MANAGE_USERS = 'manage:users', VIEW_AUDIT_LOGS = 'view:audit_logs', EXPORT_DATA = 'export:data', IMPORT_DATA = 'import:data'
    }
export const ROLE_PERMISSIONS = {
  admin: [
    Permission.READ_ASSETS, Permission.WRITE_ASSETS, Permission.DELETE_ASSETS, Permission.READ_ASSESSMENTS, Permission.WRITE_ASSESSMENTS, Permission.DELETE_ASSESSMENTS, Permission.GENERATE_REPORTS, Permission.MANAGE_USERS, Permission.VIEW_AUDIT_LOGS, Permission.EXPORT_DATA, Permission.IMPORT_DATA
  ], assessor: [
    Permission.READ_ASSETS, Permission.WRITE_ASSETS, Permission.READ_ASSESSMENTS, Permission.WRITE_ASSESSMENTS, Permission.GENERATE_REPORTS, Permission.EXPORT_DATA
  ], viewer: [
    Permission.READ_ASSETS, Permission.READ_ASSESSMENTS, Permission.GENERATE_REPORTS
  ], auditor: [
    Permission.READ_ASSETS, Permission.READ_ASSESSMENTS, Permission.VIEW_AUDIT_LOGS, Permission.EXPORT_DATA
  ]
};

export const hasPermission = (userPermissions: string[], requiredPermission: Permission: boolean => {
  return userPermissions.includes(requiredPermission);
};

// Secure random token generation
export const generateSecureToken = (length: number = 32: string => {
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');

    };

// Initialize rate limiter and session manager

