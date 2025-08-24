import { ENV } from '../config/environment';

interface ErrorContext {
  user?: { id: string; email: string };
  url?: string;
  userAgent?: string;
  timestamp?: Date;
  extra?: Record<string, any>;
  tags?: Record<string, string>;
  level?: 'error' | 'warning' | 'info' | 'debug';
}

interface ErrorDetails {
  message: string;
  stack?: string;
  name?: string;
  cause?: unknown;
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

    if (ENV.isProduction && ENV.SENTRY_DSN) {
      this.initializeSentry();
    }
    this.setupGlobalErrorHandlers();
    this.isInitialized = true;
  }

  private initializeSentry() {
    // Placeholder for Sentry or other provider
    // eslint-disable-next-line no-console
    console.log('Sentry DSN configured:', Boolean(ENV.SENTRY_DSN));
  }

  private setupGlobalErrorHandlers() {
    window.addEventListener('unhandledrejection', (event) => {
      this.captureException(new Error(String(event.reason)), {
        tags: { type: 'unhandledRejection' },
        level: 'error'
      });
    });

    window.addEventListener('error', (event) => {
      this.captureException(event.error || new Error(event.message), {
        tags: { type: 'globalError' },
        level: 'error',
        extra: {
          filename: (event as ErrorEvent).filename,
          lineno: (event as ErrorEvent).lineno,
          colno: (event as ErrorEvent).colno
        }
      });
    });
  }

  captureException(error: Error | string, context: ErrorContext = {}) {
    const errorDetails: ErrorDetails =
      typeof error === 'string'
        ? { message: error }
        : { message: error.message, stack: error.stack, name: error.name, cause: (error as any).cause };

    const enhancedContext: ErrorContext = {
      ...context,
      url: window.location.href,
      userAgent: navigator.userAgent,
      timestamp: new Date(),
      level: context.level || 'error'
    };

    if (ENV.isDevelopment) {
      // eslint-disable-next-line no-console
      console.group('Error Captured');
      // eslint-disable-next-line no-console
      console.error('Error:', errorDetails);
      // eslint-disable-next-line no-console
      console.log('Context:', enhancedContext);
      // eslint-disable-next-line no-console
      console.groupEnd();
    }

    if (ENV.isProduction) {
      this.sendToMonitoringService(errorDetails, enhancedContext);
    }

    this.storeErrorLocally(errorDetails, enhancedContext);
  }

  captureMessage(message: string, level: 'error' | 'warning' | 'info' | 'debug' = 'info', context: ErrorContext = {}) {
    this.captureException(message, { ...context, level });
  }

  private async sendToMonitoringService(error: ErrorDetails, context: ErrorContext) {
    try {
      await fetch('/api/errors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error, context })
      });
    } catch (sendError) {
      // eslint-disable-next-line no-console
      console.error('Failed to send error to monitoring service:', sendError);
    }
  }

  private storeErrorLocally(error: ErrorDetails, context: ErrorContext): void {
    try {
      const stored = JSON.parse(localStorage.getItem('error-logs') || '[]');
      stored.push({ error, context });
      const recent = stored.slice(-50);
      localStorage.setItem('error-logs', JSON.stringify(recent));
    } catch {
      // ignore storage errors
    }
  }

  getStoredErrors(): Array<{ error: ErrorDetails; context: ErrorContext }> {
    try {
      return JSON.parse(localStorage.getItem('error-logs') || '[]');
    } catch {
      return [];
    }
  }

  clearStoredErrors() {
    localStorage.removeItem('error-logs');
  }

  capturePerformance(name: string, duration: number, metadata?: Record<string, any>) {
    if (ENV.isProduction) {
      this.captureMessage(`Performance ${name} took ${duration}ms`, 'info', {
        tags: { type: 'performance' },
        extra: { duration, ...metadata }
      });
    }
  }

  captureUserAction(action: string, metadata?: Record<string, any>) {
    if (ENV.isProduction && ENV.ANALYTICS_ID) {
      this.captureMessage(`User Action ${action}`, 'info', {
        tags: { type: 'userAction' },
        extra: metadata
      });
    }
  }
}

export const errorMonitoring = ErrorMonitoring.getInstance();

// Initialize when module loads
errorMonitoring.initialize();