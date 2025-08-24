// Environment Configuration
export const ENV = {
  NODE_ENV: import.meta.env.MODE || 'development',
  APP_VERSION: import.meta.env.VITE_APP_VERSION || '2.0.0',

  // Authentication
  AUTH_PROVIDER: import.meta.env.VITE_AUTH_PROVIDER || 'supabase',
  JWT_SECRET: import.meta.env.VITE_JWT_SECRET || '',
  SESSION_TIMEOUT: parseInt(import.meta.env.VITE_SESSION_TIMEOUT || '28800000', 10),

  // Database
  SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL || '',
  SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY || '',

  // Security
  ENABLE_CSP: import.meta.env.VITE_ENABLE_CSP === 'true',
  SECURE_COOKIES: import.meta.env.VITE_SECURE_COOKIES === 'true',

  // Monitoring
  SENTRY_DSN: import.meta.env.VITE_SENTRY_DSN || '',
  ANALYTICS_ID: import.meta.env.VITE_ANALYTICS_ID || '',

  // Feature Flags
  ENABLE_OFFLINE_MODE: import.meta.env.VITE_ENABLE_OFFLINE_MODE === 'true',
  ENABLE_ADVANCED_FEATURES: import.meta.env.VITE_ENABLE_ADVANCED_FEATURES === 'true',
  ENABLE_MULTI_TENANT: import.meta.env.VITE_ENABLE_MULTI_TENANT === 'true',

  // API Configuration
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || '/api',
  API_TIMEOUT: parseInt(import.meta.env.VITE_API_TIMEOUT || '30000', 10),

  // Derived flags
  isProduction: import.meta.env.PROD,
  isDevelopment: import.meta.env.DEV,
  isTest: import.meta.env.MODE === 'test'
} as const;

export const validateEnvironment = () => {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (ENV.SUPABASE_URL && !ENV.SUPABASE_URL.includes('supabase.co')) {
    warnings.push('VITE_SUPABASE_URL should be a valid Supabase URL');
  }

  if (ENV.isProduction) {
    if (!ENV.JWT_SECRET) {
      errors.push('VITE_JWT_SECRET is required in production');
    } else if (ENV.JWT_SECRET.length < 32) {
      errors.push('VITE_JWT_SECRET must be at least 32 characters in production');
    }

    if (!ENV.SUPABASE_URL) {
      errors.push('VITE_SUPABASE_URL is required for authentication');
    }
    if (!ENV.SUPABASE_ANON_KEY) {
      errors.push('VITE_SUPABASE_ANON_KEY is required for authentication');
    }
  }

  if (warnings.length > 0) {
    // eslint-disable-next-line no-console
    console.warn('Environment warnings:', warnings);
  }
  if (errors.length > 0) {
    // Do not throw during build-time; allow deployment while clearly logging
    // eslint-disable-next-line no-console
    console.error('Environment configuration errors:', errors);
  }
};

if (ENV.isProduction) {
  validateEnvironment();
}