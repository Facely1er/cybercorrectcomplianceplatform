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
  const requiredVars = [
    'VITE_SUPABASE_URL',
    'VITE_SUPABASE_ANON_KEY'
  ];
  
  const productionOnlyVars = [
    'VITE_SENTRY_DSN',
    'VITE_JWT_SECRET'
  ];
  
  const missing = requiredVars.filter(varName => !import.meta.env[varName]);
  const missingProd = ENV.isProduction 
    ? productionOnlyVars.filter(varName => !import.meta.env[varName])
    : [];
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
  
  if (missingProd.length > 0) {
    console.warn(`Missing production environment variables: ${missingProd.join(', ')}`);
  }
  
  // Validate JWT secret strength in production
  if (ENV.isProduction && ENV.JWT_SECRET && ENV.JWT_SECRET.length < 32) {
    throw new Error('JWT_SECRET must be at least 32 characters long in production');
  }
};

// Initialize environment validation
if (ENV.isProduction) {
  validateEnvironment();
}