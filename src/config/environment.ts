// Environment Configuration
export const ENV = {
  NODE_ENV: import.meta.env.NODE_ENV || 'development',
  APP_VERSION: import.meta.env.VITE_APP_VERSION || '2.0.0',
  
  // Authentication
  AUTH_PROVIDER: import.meta.env.VITE_AUTH_PROVIDER || 'supabase',
  JWT_SECRET: import.meta.env.VITE_JWT_SECRET,
  SESSION_TIMEOUT: parseInt(import.meta.env.VITE_SESSION_TIMEOUT || '28800000'), // 8 hours
  
  // Database
  SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
  SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY,
  
  // Security
  ENABLE_CSP: import.meta.env.VITE_ENABLE_CSP === 'true',
  SECURE_COOKIES: import.meta.env.VITE_SECURE_COOKIES === 'true',
  
  // Monitoring
  SENTRY_DSN: import.meta.env.VITE_SENTRY_DSN,
  ANALYTICS_ID: import.meta.env.VITE_ANALYTICS_ID,
  
  // Feature Flags
  ENABLE_OFFLINE_MODE: import.meta.env.VITE_ENABLE_OFFLINE_MODE === 'true',
  ENABLE_ADVANCED_FEATURES: import.meta.env.VITE_ENABLE_ADVANCED_FEATURES === 'true',
  ENABLE_MULTI_TENANT: import.meta.env.VITE_ENABLE_MULTI_TENANT === 'true',
  
  // API Configuration
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || '/api',
  API_TIMEOUT: parseInt(import.meta.env.VITE_API_TIMEOUT || '30000'), // 30 seconds
  
  // Validation
  isProduction: import.meta.env.NODE_ENV === 'production',
  isDevelopment: import.meta.env.NODE_ENV === 'development',
  isTest: import.meta.env.NODE_ENV === 'test',
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
  } else if (ENV.SUPABASE_ANON_KEY.length < 100) {
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
    
    // Check for demo/default values in production
    if (ENV.SUPABASE_URL.includes('your-project')) {
      errors.push('VITE_SUPABASE_URL must be updated with your actual Supabase project URL');
    }
    
    if (ENV.SUPABASE_ANON_KEY.includes('your-')) {
      errors.push('VITE_SUPABASE_ANON_KEY must be updated with your actual Supabase anon key');
    }
  }
  
  // Log warnings
  if (warnings.length > 0) {
    console.warn('Environment warnings:', warnings);
  }
  
  // Throw errors
  if (errors.length > 0) {
    throw new Error(`Environment configuration errors:\n${errors.map(e => `- ${e}`).join('\n')}`);
  }
  
  // Success message
  if (ENV.isProduction) {
    console.log('✅ Production environment validation passed');
  }
};

// Initialize environment validation
if (ENV.isProduction) {
  validateEnvironment();
}