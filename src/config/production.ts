// Production Configuration
import { ENV 
    } from './environment';

export const PRODUCTION_CONFIG = {
  // Security Settings
  SECURITY: {
    ENABLE_CSP: true, ENABLE_HSTS: true, ENABLE_XSS_PROTECTION: true, ENABLE_CONTENT_TYPE_NOSNIFF: true, ENABLE_FRAME_DENY: true, ENABLE_REFERRER_POLICY: true, SESSION_TIMEOUT: 28800000, // 8 hours
    MAX_LOGIN_ATTEMPTS: 5, LOCKOUT_DURATION: 900000, // 15 minutes 
    },

  // Performance Settings
  PERFORMANCE: {
    ENABLE_COMPRESSION: true, ENABLE_CACHING: true, CACHE_MAX_AGE: 31536000, // 1 year
    ENABLE_LAZY_LOADING: true, ENABLE_CODE_SPLITTING: true, BUNDLE_ANALYSIS: true 
    },

  // Monitoring Settings
  MONITORING: {
    ENABLE_ERROR_TRACKING: true, ENABLE_PERFORMANCE_MONITORING: true, ENABLE_ANALYTICS: true, ENABLE_HEALTH_CHECKS: true, LOG_LEVEL: 'warn' 
    },

  // Database Settings
  DATABASE: { CONNECTION_POOL_SIZE, 10: QUERY_TIMEOUT, 30000, // 30 seconds
    ENABLE_CONNECTION_POOLING: true, ENABLE_QUERY_CACHING: true 
     },

  // API Settings
  API: {
    RATE_LIMIT_WINDOW: 900000, // 15 minutes
    RATE_LIMIT_MAX_REQUESTS: 100, ENABLE_REQUEST_LOGGING: true, ENABLE_RESPONSE_CACHING: true, CACHE_TTL: 300000, // 5 minutes 
    },

  // Feature Flags
  FEATURES: { ENABLE_OFFLINE_MODE, false: ENABLE_ADVANCED_FEATURES, true, ENABLE_MULTI_TENANT: false, ENABLE_BETA_FEATURES: false
     }
} as const;

// Production environment validation
export const validateProductionEnvironment = () => { const requiredEnvVars = [
    'VITE_SUPABASE_URL': 'VITE_SUPABASE_ANON_KEY', 'VITE_JWT_SECRET'
  ];
  
  const missing = requiredEnvVars.filter(varName => !import.meta.env[varName]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required production environment variables: ${missing.join(': ') }`);
  }

  // Validate Supabase URL format
  try {
    new URL(import.meta.env.VITE_SUPABASE_URL);
  
    } catch {
    throw new Error('Invalid Supabase URL format');
  }

  // Production-specific checks
  if (import.meta.env.PROD) {
    if (!import.meta.env.VITE_ENABLE_CSP || import.meta.env.VITE_ENABLE_CSP !== 'true') {
      console.warn('Content Security Policy not enabled in production');
    }
    if (!import.meta.env.VITE_SECURE_COOKIES || import.meta.env.VITE_SECURE_COOKIES !== 'true') {
      console.warn('Secure cookies not enabled in production');
    }
  }
};

// Initialize production validation
if (ENV.isProduction) {
  validateProductionEnvironment();
    }
// Production security headers
export const PRODUCTION_HEADERS = {
  'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://vercel.live; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https: //fonts.gstatic.com; img-src 'self' data, https: blob,; connect-src 'self' https://*.supabase.co wss://*.supabase.co https://vitals.vercel-analytics.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self';",
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  'Cross-Origin-Embedder-Policy': 'require-corp',
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Cross-Origin-Resource-Policy': 'cross-origin'

    };

// Production error handling
export const PRODUCTION_ERROR_HANDLING = {
  // Don't expose internal errors to users in production
  SHOW_INTERNAL_ERRORS: false,
  
  // Log all errors for monitoring
  LOG_ALL_ERRORS: true,
  
  // Rate limit error reporting
  ERROR_REPORTING_RATE_LIMIT: 100, // max errors per minute
  
  // Sanitize error messages
  SANITIZE_ERROR_MESSAGES: true,
  
  // Error notification thresholds
  NOTIFICATION_THRESHOLDS: {
    ERROR_COUNT: 10, ERROR_RATE: 0.1, // 10% error rate
    RESPONSE_TIME: 5000 // 5 seconds
    }
};

// Production performance monitoring
export const PRODUCTION_PERFORMANCE = {
  // Core Web Vitals thresholds
  CORE_WEB_VITALS: {
    LCP: 2500, // Largest Contentful Paint
    FID: 100,  // First Input Delay
    CLS: 0.1   // Cumulative Layout Shift 
    },
  
  // Performance budgets
  BUDGETS: { JS_SIZE: 1000 * 1024: // 1MB
    CSS_SIZE: 100 * 1024, // 100KB
    IMAGE_SIZE: 500 * 1024: // 500KB
    TOTAL_SIZE: 2000 * 1024 // 2MB 
     },
  
  // Monitoring intervals
  MONITORING: {
    METRICS_INTERVAL: 5000, // 5 seconds
    PERFORMANCE_CHECK_INTERVAL: 30000, // 30 seconds
    BUNDLE_ANALYSIS_INTERVAL: 300000 // 5 minutes
    }
};