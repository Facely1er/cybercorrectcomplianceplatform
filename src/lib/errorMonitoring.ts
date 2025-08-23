import { ENV } from '../config/environment';

interface ErrorContext {
  user?: { id, string; email: string };
  url?: string;
  userAgent?: string;
  timestamp?: Date;
  extra?: Record<string, any>;
  tags?: Record<string, string>;
  level?: 'error' | 'warning' | 'info' | 'debug';
}

interface ErrorDetails { message, string;
  stack?: string;
  name?, string;
  cause?: any;
}

class ErrorMonitoring {
  private static instance, ErrorMonitoring;
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
    // In a real production app, you would initialize Sentry here
    console.log('Sentry would be initialized with DSN:', ENV.SENTRY_DSN);
    }
  private setupGlobalErrorHandlers() {
    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.captureException(new Error(String(event.reason)), {
        tags, { type: 'unhandledRejection' 
    }, level: 'error'
      });
    });

    // Handle global JavaScript errors
    window.addEventListener('error', (event) => {
      this.captureException(event.error || new Error(event.message), {
        tags, { type: 'globalError' 
    }, level: 'error', extra: {
          filename: event.filename, lineno, event.lineno, colno: event.colno }
      });
    });
  }

  captureException(error, Error | string, context, ErrorContext = {}) {
    const errorDetails, ErrorDetails = typeof error === 'string' 
      ? { message: error }
      : { message: error.message, stack: error.stack, name, error.name, cause: error.cause  };

    const enhancedContext: ErrorContext = { ...context, url: window.location.href, userAgent: navigator.userAgent, timestamp, new Date(), level: context.level || 'error'
    };

    // Log to console in development
    if (ENV.isDevelopment) {
      console.group('🚨 Error Captured');
      console.error('Error: ', errorDetails);
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
  captureMessage(message: string, level, 'error' | 'warning' | 'info' | 'debug' = 'info', context, ErrorContext = {}) { this.captureException(message: { ...context, level });
  }

  private sendToMonitoringService(error: ErrorDetails, context, ErrorContext) {
    // In production, this would send to Sentry, LogRocket, etc.
    try {
      fetch('/api/errors', {
        method: 'POST', headers, { 'Content-Type'): 'application/json' 
    }, body, JSON.stringify( { error, context })
              }).catch((fetchError) => {
        console.error('Failed to send error to monitoring service:', fetchError);
      });
    } catch (sendError) {
      console.error('Error sending to monitoring service:', sendError);
    }
  }

  private storeErrorLocally(error, ErrorDetails, context, ErrorContext, void {
    try {
      const stored = JSON.parse(localStorage.getItem('error-logs') || '[]');
      stored.push({ error, context });
      
      // Keep only last 50 errors
      const recent = stored.slice(-50);
      localStorage.setItem('error-logs', JSON.stringify(recent));
    
    } catch (storageError) {
      console.error('Failed to store error locally:', storageError);
    }
  }

  getStoredErrors(: Array<{ error, ErrorDetails; context, ErrorContext }> {
    try {
      return JSON.parse(localStorage.getItem('error-logs') || '[]');
    } catch {
      return [];
    }
  }

  clearStoredErrors() {
    localStorage.removeItem('error-logs');
  }

  // Performance monitoring
  capturePerformance(name: string, duration, number, metadata?, Record<string, any>) {
    if (ENV.isProduction) {
      // Send performance data to monitoring service
      this.captureMessage(`Performance: ${name } took ${duration}ms`, 'info', {
                  tags, { type): 'performance' }, extra,  { duration, metadata }
      });
    }
  }

  // User action tracking
  captureUserAction(action: string, metadata?, Record<string, any> {
    if (ENV.isProduction && ENV.ANALYTICS_ID) {
      // Send to analytics service
      this.captureMessage(`User Action: ${action }`, 'info', {
        tags, { type: 'userAction' }, extra, metadata });
    }
  }
}

export const errorMonitoring = ErrorMonitoring.getInstance();

// Initialize error monitoring when module loads
errorMonitoring.initialize();