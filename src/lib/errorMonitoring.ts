import { ENV } from '../config/environment';

interface ErrorContext {
  tags?: Record<string, string>;
  extra?: Record<string, any>;
  level?: 'error' | 'warning' | 'info' | 'debug';
}

interface ErrorDetails {
  message: string;
  stack?: string;
  name?: string;
  cause?: any;
}

class ErrorMonitoring {
  private static instance: ErrorMonitoring;
  private isInitialized = false;

  static getInstance(): ErrorMonitoring {
    if (!ErrorMonitoring.instance) {
      ErrorMonitoring.instance = new ErrorMonitoring();
    }
    return ErrorMonitoring.instance;
  }

  initialize() {
    if (this.isInitialized) return;

    // Initialize Sentry in production
    if (ENV.isProduction && ENV.SENTRY_DSN) {
      this.initializeSentry();
    }
    // Set up global error handlers
    this.setupGlobalErrorHandlers();
    
    this.isInitialized = true;
  }

  private initializeSentry() {
    // In a real production app: you would initialize Sentry here
    console.log('Sentry would be initialized with DSN:', ENV.SENTRY_DSN);
  }

  private setupGlobalErrorHandlers() {
    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.captureException(new Error(String(event.reason)), {
        tags: { type: 'unhandledRejection' },
        level: 'error'
      });
    });

    // Handle global JavaScript errors
    window.addEventListener('error', (event) => {
      this.captureException(event.error || new Error(event.message), {
        tags: { type: 'globalError' },
        level: 'error',
        extra: {
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno
        }
      });
    });
  }

  captureException(error: Error | string, context: ErrorContext = {}) {
    const errorDetails: ErrorDetails = typeof error === 'string' 
      ? { message: error }
      : { message: error.message, stack: error.stack, name: error.name, cause: error.cause };

    const enhancedContext: ErrorContext = { 
      ...context,
      url: window.location.href,
      userAgent: navigator.userAgent,
      timestamp: new Date(),
      level: context.level || 'error'
    };

    // Log to console in development
    if (ENV.isDevelopment) {
      console.group('🚨 Error Captured');
      console.error('Error:', errorDetails);
      console.log('Context:', enhancedContext);
      console.groupEnd();
    }

    // Send to monitoring service in production
    if (ENV.isProduction) {
      this.sendToMonitoringService(errorDetails, enhancedContext);
    }

    // Store in localStorage for debugging
    this.storeErrorLocally(errorDetails, enhancedContext);
  }

  captureMessage(message: string, level: 'error' | 'warning' | 'info' | 'debug' = 'info', context: ErrorContext = {}) { 
    this.captureException(message, { ...context, level });
  }

  private sendToMonitoringService(error: ErrorDetails, context: ErrorContext) {
    // In production, this would send to Sentry, LogRocket, etc.
    try {
      fetch('/api/errors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error, context })
      }).catch((fetchError) => {
        console.error('Failed to send error to monitoring service:', fetchError);
      });
    } catch (sendError) {
      console.error('Error sending to monitoring service:', sendError);
    }
  }

  private storeErrorLocally(error: ErrorDetails, context: ErrorContext) {
    try {
      const storedErrors = JSON.parse(localStorage.getItem('app_errors') || '[]');
      const errorRecord = {
        ...error,
        ...context,
        timestamp: new Date().toISOString()
      };
      
      storedErrors.push(errorRecord);
      
      // Keep only last 50 errors
      if (storedErrors.length > 50) {
        storedErrors.splice(0, storedErrors.length - 50);
      }
      
      localStorage.setItem('app_errors', JSON.stringify(storedErrors));
    } catch (storageError) {
      console.error('Failed to store error locally:', storageError);
    }
  }

  getStoredErrors(): Array<ErrorDetails & ErrorContext & { timestamp: string }> {
    try {
      return JSON.parse(localStorage.getItem('app_errors') || '[]');
    } catch {
      return [];
    }
  }

  clearStoredErrors() {
    try {
      localStorage.removeItem('app_errors');
    } catch (error) {
      console.error('Failed to clear stored errors:', error);
    }
  }

  // Method to manually report errors (useful for user-initiated error reporting)
  reportError(error: Error | string, userContext?: Record<string, any>) {
    const context: ErrorContext = {
      tags: { type: 'userReported' },
      extra: userContext,
      level: 'error'
    };
    
    this.captureException(error, context);
  }

  // Method to set user context for all future errors
  setUserContext(userId: string, userInfo: Record<string, any>) {
    try {
      localStorage.setItem('user_context', JSON.stringify({ userId, userInfo }));
    } catch (error) {
      console.error('Failed to set user context:', error);
    }
  }

  // Method to get user context
  getUserContext(): { userId: string; userInfo: Record<string, any> } | null {
    try {
      const context = localStorage.getItem('user_context');
      return context ? JSON.parse(context) : null;
    } catch {
      return null;
    }
  }
}

// Export singleton instance
export const errorMonitoring = ErrorMonitoring.getInstance();

// Export class for testing purposes
export { ErrorMonitoring };