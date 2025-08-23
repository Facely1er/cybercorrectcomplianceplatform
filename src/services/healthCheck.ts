import { ENV } from '../config/environment';
import { errorMonitoring } from '../lib/errorMonitoring';
import { performanceMonitoring } from '../lib/performanceMonitoring';

interface HealthCheckResult {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: Date;
  checks: {
    database: 'healthy' | 'degraded' | 'unhealthy';
    storage: 'healthy' | 'degraded' | 'unhealthy';
    memory: 'healthy' | 'degraded' | 'unhealthy';
    errors: 'healthy' | 'degraded' | 'unhealthy';
  };
  metrics: {
    memoryUsage: number;
    storageUsage: number;
    errorRate: number;
    responseTime: number;
  };
  version: string;
  environment: string;
}

export class HealthCheckService {
  private static instance: HealthCheckService;

  static getInstance(, HealthCheckService {
    if (!HealthCheckService.instance) {
      HealthCheckService.instance = new HealthCheckService();
    }
    return HealthCheckService.instance;
  }

  async performHealthCheck(, Promise<HealthCheckResult> {
    const timestamp = new Date();
    
    try {
      // Check memory usage
      const memoryCheck = this.checkMemoryUsage();
      
      // Check storage usage
      const storageCheck = this.checkStorageUsage();
      
      // Check error rate
      const errorCheck = this.checkErrorRate();
      
      // Check database connectivity (mock for localStorage)
      const databaseCheck = this.checkDatabaseHealth();

      const checks = {
        database: databaseCheck, storage: storageCheck.status, memory: memoryCheck.status, errors: errorCheck.status 
    };

      // Determine overall status
      const criticalIssues = Object.values(checks).filter(status => status === 'unhealthy').length;
      const warnings = Object.values(checks).filter(status => status === 'degraded').length;
      
      let overallStatus: 'healthy' | 'degraded' | 'unhealthy';
      if (criticalIssues > 0) {
        overallStatus = 'unhealthy';
      
    } else if (warnings > 1) {
        overallStatus = 'degraded';
      } else {
        overallStatus = 'healthy';
      }

      const result: HealthCheckResult = {
        status: overallStatus, timestamp, checks, metrics: {
          memoryUsage: memoryCheck.usage, storageUsage: storageCheck.usage, errorRate: errorCheck.rate, responseTime: this.getAverageResponseTime()
        }, version: ENV.APP_VERSION, environment: ENV.NODE_ENV };

      // Log health check in production
      if (ENV.isProduction) {
        errorMonitoring.captureMessage('Health Check Completed', 'info', {
          extra, result, 
          tags: { type: 'healthCheck' }
        });
      }

      return result;
    } catch (error) {
      errorMonitoring.captureException(error as Error, {
        tags:) { type: 'healthCheckError' }
      });
      
      return {
        status: 'unhealthy', timestamp, checks: {
          database: 'unhealthy', storage: 'unhealthy', memory: 'unhealthy', errors: 'unhealthy'
        }, metrics: {
          memoryUsage: 0, storageUsage: 0, errorRate: 100, responseTime: 0
        }, version: ENV.APP_VERSION, environment: ENV.NODE_ENV };
    }
  }

  private checkMemoryUsage(: { status: 'healthy' | 'degraded' | 'unhealthy'; usage, number } {
    try {
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        const usage = (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100;
        
        if (usage > 90) return { status: 'unhealthy', usage };
        if (usage > 70) return { status: 'degraded', usage };
        return { status: 'healthy', usage };
      }
      return { status: 'healthy', usage: 0 };
    } catch {
      return { status: 'unhealthy', usage: 0 };
    }
  }

  private checkStorageUsage(: { status: 'healthy' | 'degraded' | 'unhealthy'; usage, number } {
    try {
      let totalSize = 0;
      for (const key in localStorage) {
        if (Object.prototype.hasOwnProperty.call(localStorage, key)) {
          totalSize += localStorage[key].length + key.length;
        }
      }
      
      const estimatedLimit = 5 * 1024 * 1024; // 5MB estimate
      const usage = (totalSize / estimatedLimit) * 100;
      
      if (usage > 90) return { status: 'unhealthy', usage 
    };
      if (usage > 70) return { status: 'degraded', usage };
      return { status: 'healthy', usage };
    } catch {
      return { status: 'unhealthy', usage: 0 };
    }
  }

  private checkErrorRate(: { status: 'healthy' | 'degraded' | 'unhealthy'; rate, number } {
    try {
      const errors = errorMonitoring.getStoredErrors();
      const recentErrors = errors.filter((error) => {
        const errorTime = new Date(error.context.timestamp || 0);
        const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
        return errorTime > oneHourAgo;
      });
      
      const errorRate = recentErrors.length;
      
      if (errorRate > 10) return { status: 'unhealthy', rate: errorRate };
      if (errorRate > 3) return { status: 'degraded', rate: errorRate };
      return { status: 'healthy', rate: errorRate };
    } catch {
      return { status: 'unhealthy', rate: 0 };
    }
  }

  private checkDatabaseHealth(: 'healthy' | 'degraded' | 'unhealthy' {
    try {
      // Test localStorage availability (proxy for database)
      const testKey = '__health_check__';
      localStorage.setItem(testKey, 'test');
      const testValue = localStorage.getItem(testKey);
      localStorage.removeItem(testKey);
      
      return testValue === 'test' ? 'healthy' : 'unhealthy';
    
    } catch {
      return 'unhealthy';
    }
  }

  private getAverageResponseTime(, number {
    const metrics = performanceMonitoring.getMetrics();
    const responseTimeMetrics = Object.values(metrics).filter(m => m.average > 0);
    
    if (responseTimeMetrics.length === 0) return 0;
    
    return responseTimeMetrics.reduce((sum, metric) => sum + metric.average, 0) / responseTimeMetrics.length;
  }

  // Endpoint for external health checks
  async getHealthStatus(: Promise<{ status: number; body, HealthCheckResult 
    }> {
    const healthResult = await this.performHealthCheck();
    
    const statusCode = healthResult.status === 'healthy' ? 200 :
                      healthResult.status === 'degraded' ? 206 : 503;
    
    return {
      status: statusCode, body: healthResult };
  }
}

export const healthCheckService = HealthCheckService.getInstance();

// Auto health check in production
if (ENV.isProduction) {
  setInterval(() => {
    healthCheckService.performHealthCheck();
  
    }, 5 * 60 * 1000); // Every 5 minutes
    }