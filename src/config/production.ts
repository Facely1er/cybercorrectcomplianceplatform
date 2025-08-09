// Production Configuration
export const PRODUCTION_CONFIG = {
  // Build settings
  BUILD: {
    NODE_ENV: 'production',
    MINIFY: true,
    SOURCE_MAPS: false,
    BUNDLE_ANALYZER: false,
    TREE_SHAKING: true,
    CODE_SPLITTING: true
  },

  // Security settings
  SECURITY: {
    ENABLE_CSP: true,
    SECURE_COOKIES: true,
    HSTS_MAX_AGE: 31536000, // 1 year
    CSRF_PROTECTION: true,
    XSS_PROTECTION: true,
    REFERRER_POLICY: 'strict-origin-when-cross-origin'
  },

  // Performance settings
  PERFORMANCE: {
    ENABLE_COMPRESSION: true,
    CACHE_CONTROL_MAX_AGE: 31536000, // 1 year for static assets
    ENABLE_SERVICE_WORKER: true,
    LAZY_LOADING: true,
    BUNDLE_SIZE_LIMIT: 244 * 1024 // 244KB
  },

  // Monitoring settings
  MONITORING: {
    ERROR_REPORTING: true,
    PERFORMANCE_TRACKING: true,
    USER_ANALYTICS: false, // Disable for privacy
    HEALTH_CHECKS: true,
    LOG_LEVEL: 'error'
  },

  // API settings
  API: {
    TIMEOUT: 30000, // 30 seconds
    RETRY_ATTEMPTS: 3,
    RATE_LIMIT: {
      WINDOW_MS: 900000, // 15 minutes
      MAX_REQUESTS: 100
    }
  }
};

// Validate production environment
export const validateProductionEnvironment = () => {
  const requiredEnvVars = [
    'VITE_SUPABASE_URL',
    'VITE_SUPABASE_ANON_KEY'
  ];

  const missing = requiredEnvVars.filter(varName => !import.meta.env[varName]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }

  // Validate URLs
  try {
    new URL(import.meta.env.VITE_SUPABASE_URL);
  } catch {
    throw new Error('Invalid VITE_SUPABASE_URL');
  }

  console.log('✅ Production environment validation passed');
};

// Initialize production configuration
if (import.meta.env.PROD) {
  validateProductionEnvironment();
}