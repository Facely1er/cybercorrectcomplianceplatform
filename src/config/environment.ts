// Environment Configuration
export const ENV = {
	NODE_ENV: (import.meta as any).env?.MODE ?? (import.meta as any).env?.NODE_ENV ?? 'development',
	APP_VERSION: (import.meta as any).env?.VITE_APP_VERSION ?? '2.0.0',

	// Authentication
	AUTH_PROVIDER: (import.meta as any).env?.VITE_AUTH_PROVIDER ?? 'supabase',
	JWT_SECRET: (import.meta as any).env?.VITE_JWT_SECRET ?? '',
	SESSION_TIMEOUT: Number((import.meta as any).env?.VITE_SESSION_TIMEOUT ?? '28800000'), // 8 hours

	// Database
	SUPABASE_URL: (import.meta as any).env?.VITE_SUPABASE_URL ?? '',
	SUPABASE_ANON_KEY: (import.meta as any).env?.VITE_SUPABASE_ANON_KEY ?? '',

	// Security
	ENABLE_CSP: ((import.meta as any).env?.VITE_ENABLE_CSP ?? 'false') === 'true',
	SECURE_COOKIES: ((import.meta as any).env?.VITE_SECURE_COOKIES ?? 'false') === 'true',

	// Monitoring
	SENTRY_DSN: (import.meta as any).env?.VITE_SENTRY_DSN ?? '',
	ANALYTICS_ID: (import.meta as any).env?.VITE_ANALYTICS_ID ?? '',

	// Feature Flags
	ENABLE_OFFLINE_MODE: ((import.meta as any).env?.VITE_ENABLE_OFFLINE_MODE ?? 'false') === 'true',
	ENABLE_ADVANCED_FEATURES: ((import.meta as any).env?.VITE_ENABLE_ADVANCED_FEATURES ?? 'false') === 'true',
	ENABLE_MULTI_TENANT: ((import.meta as any).env?.VITE_ENABLE_MULTI_TENANT ?? 'false') === 'true',

	// API Configuration
	API_BASE_URL: (import.meta as any).env?.VITE_API_BASE_URL ?? '/api',
	API_TIMEOUT: Number((import.meta as any).env?.VITE_API_TIMEOUT ?? '30000'), // 30 seconds

	// Validation helpers
	isProduction: ((import.meta as any).env?.PROD ?? false) === true || ((import.meta as any).env?.NODE_ENV ?? '') === 'production',
	isDevelopment: ((import.meta as any).env?.DEV ?? false) === true || ((import.meta as any).env?.NODE_ENV ?? '') === 'development',
	isTest: ((import.meta as any).env?.MODE ?? '') === 'test' || ((import.meta as any).env?.NODE_ENV ?? '') === 'test'
} as const;

// Validate required environment variables
export const validateEnvironment = () => {
	const errors: string[] = [];
	const warnings: string[] = [];
	// Critical variables for Supabase
	if (!ENV.SUPABASE_URL) {
		errors.push('VITE_SUPABASE_URL is required for authentication');
	} else if (!ENV.SUPABASE_URL.includes('supabase.co')) {
		warnings.push('VITE_SUPABASE_URL should be a valid Supabase URL');
	}
	if (!ENV.SUPABASE_ANON_KEY) {
		errors.push('VITE_SUPABASE_ANON_KEY is required for authentication');
	} else if (ENV.SUPABASE_ANON_KEY.length < 80) {
		warnings.push('VITE_SUPABASE_ANON_KEY appears to be invalid (too short)');
	}
	// Production-specific validation
	if (ENV.isProduction) {
		if (!ENV.JWT_SECRET) {
			errors.push('VITE_JWT_SECRET is required in production');
		} else if (ENV.JWT_SECRET.length < 32) {
			errors.push('VITE_JWT_SECRET must be at least 32 characters in production');
		} else if (ENV.JWT_SECRET.includes('your-') || ENV.JWT_SECRET.includes('change-')) {
			errors.push('VITE_JWT_SECRET must be changed from default value');
		}
		if (!ENV.SENTRY_DSN) {
			warnings.push('VITE_SENTRY_DSN recommended for production error monitoring');
		}
	}
	if (warnings.length > 0) {
		console.warn('Environment warnings:', warnings);
	}
	if (errors.length > 0) {
		throw new Error(`Environment configuration errors:\n${errors.map(e => `- ${e}`).join('\n')}`);
	}
	if (ENV.isProduction) {
		console.log('✅ Production environment validation passed');
	}
};

// Initialize environment validation
if (ENV.isProduction) {
	try {
		validateEnvironment();
	} catch (err) {
		console.error(err);
	}
}