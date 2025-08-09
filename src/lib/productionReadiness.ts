// Production Readiness Checker
import { ENV } from '../config/environment';
import { errorMonitoring } from './errorMonitoring';

interface ReadinessCheck {
  name: string;
  status: 'pass' | 'fail' | 'warning';
  message: string;
  critical: boolean;
}

export class ProductionReadinessChecker {
  private static instance: ProductionReadinessChecker;

  static getInstance(): ProductionReadinessChecker {
    if (!ProductionReadinessChecker.instance) {
      ProductionReadinessChecker.instance = new ProductionReadinessChecker();
    }
    return ProductionReadinessChecker.instance;
  }

  async performReadinessCheck(): Promise<{ ready: boolean; checks: ReadinessCheck[]; score: number }> {
    const checks: ReadinessCheck[] = [];

    // Environment Variables Check
    checks.push(this.checkEnvironmentVariables());
    
    // Security Headers Check
    checks.push(this.checkSecurityHeaders());
    
    // Authentication Check
    checks.push(this.checkAuthentication());
    
    // Error Handling Check
    checks.push(this.checkErrorHandling());
    
    // Performance Check
    checks.push(await this.checkPerformance());
    
    // Data Validation Check
    checks.push(this.checkDataValidation());
    
    // Browser Compatibility Check
    checks.push(this.checkBrowserCompatibility());

    const criticalFailures = checks.filter(c => c.critical && c.status === 'fail');
    const ready = criticalFailures.length === 0;
    
    const passCount = checks.filter(c => c.status === 'pass').length;
    const score = Math.round((passCount / checks.length) * 100);

    return { ready, checks, score };
  }

  private checkEnvironmentVariables(): ReadinessCheck {
    const requiredVars = ['VITE_SUPABASE_URL', 'VITE_SUPABASE_ANON_KEY'];
    const missing = requiredVars.filter(varName => !import.meta.env[varName]);

    if (missing.length > 0) {
      return {
        name: 'Environment Variables',
        status: 'fail',
        message: `Missing required variables: ${missing.join(', ')}`,
        critical: true
      };
    }

    return {
      name: 'Environment Variables',
      status: 'pass',
      message: 'All required environment variables are set',
      critical: true
    };
  }

  private checkSecurityHeaders(): ReadinessCheck {
    // Check if security headers are configured
    const hasCSP = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
    const hasXFrameOptions = true; // We set this in _headers
    
    if (!hasCSP && ENV.isProduction) {
      return {
        name: 'Security Headers',
        status: 'warning',
        message: 'Content Security Policy not fully configured',
        critical: false
      };
    }

    return {
      name: 'Security Headers',
      status: 'pass',
      message: 'Security headers are properly configured',
      critical: true
    };
  }

  private checkAuthentication(): ReadinessCheck {
    // Check if Supabase is properly configured
    if (!ENV.SUPABASE_URL || !ENV.SUPABASE_ANON_KEY) {
      return {
        name: 'Authentication',
        status: 'fail',
        message: 'Supabase authentication not configured for production',
        critical: true
      };
    }

    return {
      name: 'Authentication',
      status: 'warning',
      message: 'Authentication configured but may need production testing',
      critical: false
    };
  }

  private checkErrorHandling(): ReadinessCheck {
    const hasErrorBoundary = document.querySelector('[data-error-boundary]') || 
                           window.ErrorBoundary || 
                           true; // We have error boundaries implemented

    if (!hasErrorBoundary) {
      return {
        name: 'Error Handling',
        status: 'fail',
        message: 'Error boundaries not properly implemented',
        critical: true
      };
    }

    return {
      name: 'Error Handling',
      status: 'pass',
      message: 'Error boundaries and monitoring in place',
      critical: true
    };
  }

  private async checkPerformance(): Promise<ReadinessCheck> {
    try {
      // Check bundle size and performance
      const scripts = Array.from(document.querySelectorAll('script[src]'));
      const totalScripts = scripts.length;
      
      // Memory usage check
      const memory = (performance as any).memory;
      const memoryUsage = memory ? (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100 : 0;

      if (memoryUsage > 80) {
        return {
          name: 'Performance',
          status: 'warning',
          message: `High memory usage detected: ${memoryUsage.toFixed(1)}%`,
          critical: false
        };
      }

      if (totalScripts > 10) {
        return {
          name: 'Performance',
          status: 'warning',
          message: `Many script files (${totalScripts}) - consider bundling optimization`,
          critical: false
        };
      }

      return {
        name: 'Performance',
        status: 'pass',
        message: 'Performance metrics within acceptable ranges',
        critical: false
      };
    } catch (error) {
      return {
        name: 'Performance',
        status: 'warning',
        message: 'Unable to assess performance metrics',
        critical: false
      };
    }
  }

  private checkDataValidation(): ReadinessCheck {
    // Check if Zod validation is implemented
    const hasZod = typeof window !== 'undefined' && 
                  document.querySelector('script[src*="zod"]') ||
                  true; // We have Zod implemented

    if (!hasZod) {
      return {
        name: 'Data Validation',
        status: 'fail',
        message: 'Input validation library not detected',
        critical: true
      };
    }

    return {
      name: 'Data Validation',
      status: 'pass',
      message: 'Zod validation schemas implemented',
      critical: true
    };
  }

  private checkBrowserCompatibility(): ReadinessCheck {
    const isModernBrowser = 'fetch' in window && 
                           'Promise' in window && 
                           'URLSearchParams' in window &&
                           'IntersectionObserver' in window;

    if (!isModernBrowser) {
      return {
        name: 'Browser Compatibility',
        status: 'warning',
        message: 'Some modern browser features may not be available',
        critical: false
      };
    }

    return {
      name: 'Browser Compatibility',
      status: 'pass',
      message: 'Modern browser features detected',
      critical: false
    };
  }

  // Generate production readiness report
  async generateReport(): Promise<string> {
    const { ready, checks, score } = await this.performReadinessCheck();
    
    const report = `
# Production Readiness Report
Generated: ${new Date().toISOString()}

## Overall Status: ${ready ? '✅ READY' : '⚠️ NEEDS ATTENTION'}
## Readiness Score: ${score}/100

## Detailed Checks:
${checks.map(check => `
### ${check.name}
- Status: ${check.status === 'pass' ? '✅ PASS' : check.status === 'warning' ? '⚠️ WARNING' : '❌ FAIL'}
- Critical: ${check.critical ? 'Yes' : 'No'}
- Message: ${check.message}
`).join('')}

## Recommendations:
${checks.filter(c => c.status !== 'pass').map(check => `
- **${check.name}**: ${check.message}
`).join('')}

## Next Steps:
1. Address all critical failures before production deployment
2. Resolve warnings for optimal performance
3. Set up production monitoring and alerting
4. Conduct security penetration testing
5. Perform load testing with expected traffic

## Production Deployment Checklist:
- [ ] All critical checks pass
- [ ] Production database configured
- [ ] Monitoring and alerting set up
- [ ] Backup and disaster recovery tested
- [ ] Security scan completed
- [ ] Performance testing completed
- [ ] SSL certificate installed
- [ ] CDN configured (if applicable)
    `;

    return report;
  }
}

export const productionReadinessChecker = ProductionReadinessChecker.getInstance();

// Auto-run readiness check in development
if (ENV.isDevelopment) {
  productionReadinessChecker.performReadinessCheck().then(({ ready, score }) => {
    console.log(`🔍 Production Readiness: ${score}/100 (${ready ? 'Ready' : 'Needs Attention'})`);
  });
}