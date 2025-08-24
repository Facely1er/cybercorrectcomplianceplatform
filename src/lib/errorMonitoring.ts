import { ENV } from '../config/environment';

export interface ErrorContext {
	user?: { id: string; email?: string };
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
		if (typeof window === 'undefined') return; // SSR/build guard

		// Initialize Sentry in production (placeholder)
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
		if (typeof window === 'undefined') return;
		window.addEventListener('unhandledrejection', (event) => {
			this.captureException(new Error(String((event as any).reason)), {
				tags: { type: 'unhandledRejection' },
				level: 'error',
			});
		});
		window.addEventListener('error', (event: ErrorEvent) => {
			this.captureException(event.error || new Error(event.message), {
				tags: { type: 'globalError' },
				level: 'error',
				extra: {
					filename: (event as any).filename,
					lineno: (event as any).lineno,
					colno: (event as any).colno,
				},
			});
		});
	}

	captureException(error: Error | string, context: ErrorContext = {}) {
		const details: ErrorDetails =
			typeof error === 'string'
				? { message: error }
				: { message: error.message, stack: error.stack, name: error.name, cause: (error as any).cause };

		const enhancedContext: ErrorContext = {
			...context,
			url: typeof window !== 'undefined' ? window.location.href : context.url,
			userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : context.userAgent,
			timestamp: new Date(),
			level: context.level || 'error',
		};

		if (ENV.isDevelopment) {
			console.group('🚨 Error Captured');
			console.error('Error:', details);
			console.log('Context:', enhancedContext);
			console.groupEnd();
		}

		if (ENV.isProduction) {
			this.sendToMonitoringService(details, enhancedContext).catch((e) =>
				console.error('Failed to send error to monitoring service:', e)
			);
		}

		this.storeErrorLocally(details, enhancedContext);
	}

	captureMessage(message: string, level: 'error' | 'warning' | 'info' | 'debug' = 'info', context: ErrorContext = {}) {
		this.captureException(message, { ...context, level });
	}

	private async sendToMonitoringService(error: ErrorDetails, context: ErrorContext) {
		try {
			await fetch('/api/errors', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ error, context }),
			});
		} catch (sendError) {
			console.error('Error sending to monitoring service:', sendError);
		}
	}

	private storeErrorLocally(error: ErrorDetails, context: ErrorContext): void {
		if (typeof window === 'undefined') return;
		try {
			const storedRaw = localStorage.getItem('error-logs') || '[]';
			const stored: Array<{ error: ErrorDetails; context: ErrorContext }> = JSON.parse(storedRaw);
			stored.push({ error, context });
			const recent = stored.slice(-50);
			localStorage.setItem('error-logs', JSON.stringify(recent));
		} catch (storageError) {
			console.warn('Failed to store error locally:', storageError);
		}
	}

	getStoredErrors(): Array<{ error: ErrorDetails; context: ErrorContext }> {
		if (typeof window === 'undefined') return [];
		try {
			return JSON.parse(localStorage.getItem('error-logs') || '[]');
		} catch {
			return [];
		}
	}

	clearStoredErrors() {
		if (typeof window === 'undefined') return;
		localStorage.removeItem('error-logs');
	}

	capturePerformance(name: string, duration: number, metadata?: Record<string, any>) {
		if (ENV.isProduction) {
			this.captureMessage(`Performance ${name} took ${duration}ms`, 'info', {
				tags: { type: 'performance' },
				extra: { duration, ...(metadata || {}) },
			});
		}
	}

	captureUserAction(action: string, metadata?: Record<string, any>) {
		if (ENV.isProduction && ENV.ANALYTICS_ID) {
			this.captureMessage(`User Action ${action}`, 'info', {
				tags: { type: 'userAction' },
				extra: metadata || {},
			});
		}
	}
}

export const errorMonitoring = ErrorMonitoring.getInstance();

// Initialize error monitoring when module loads (browser-only)
if (typeof window !== 'undefined') {
	errorMonitoring.initialize();
}