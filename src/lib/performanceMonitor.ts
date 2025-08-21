// Enhanced Performance Monitoring for Production
import { ENV } from '../config/environment';

interface PerformanceMetrics {
  // Core Web Vitals
  fcp?: number; // First Contentful Paint
  lcp?: number; // Largest Contentful Paint
  fid?: number; // First Input Delay
  cls?: number; // Cumulative Layout Shift
  ttfb?: number; // Time to First Byte
  
  // Custom Metrics
  loadTime?: number;
  domContentLoaded?: number;
  memoryUsage?: number;
  connectionType?: string;
  
  // User Context
  timestamp: number;
  url: string;
  userAgent: string;
  viewport: { width: number; height: number };
}

interface ResourceTiming {
  name: string;
  duration: number;
  size?: number;
  type: 'script' | 'stylesheet' | 'image' | 'font' | 'xhr' | 'other';
}

class PerformanceMonitor {
  private metrics: PerformanceMetrics[] = [];
  private observer?: PerformanceObserver;
  private resourceObserver?: PerformanceObserver;
  
  constructor() {
    this.initializeObservers();
    this.collectInitialMetrics();
  }

  private initializeObservers(): void {
    // Core Web Vitals observer
    if ('PerformanceObserver' in window) {
      this.observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.processPerformanceEntry(entry);
        }
      });

      try {
        this.observer.observe({ entryTypes: ['navigation', 'paint', 'largest-contentful-paint', 'first-input', 'layout-shift'] });
      } catch (error) {
        console.warn('Some performance metrics not supported:', error);
      }

      // Resource timing observer
      this.resourceObserver = new PerformanceObserver((list) => {
        const resources = list.getEntries().map(this.mapResourceEntry);
        this.reportResourceMetrics(resources);
      });

      try {
        this.resourceObserver.observe({ entryTypes: ['resource'] });
      } catch (error) {
        console.warn('Resource timing not supported:', error);
      }
    }
  }

  private collectInitialMetrics(): void {
    const metrics: Partial<PerformanceMetrics> = {
      timestamp: Date.now(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight
      }
    };

    // Navigation timing
    if ('performance' in window && performance.timing) {
      const timing = performance.timing;
      metrics.loadTime = timing.loadEventEnd - timing.navigationStart;
      metrics.domContentLoaded = timing.domContentLoadedEventEnd - timing.navigationStart;
      metrics.ttfb = timing.responseStart - timing.navigationStart;
    }

    // Memory usage (if available)
    if ('memory' in performance) {
      metrics.memoryUsage = (performance as any).memory.usedJSHeapSize;
    }

    // Connection information
    if ('connection' in navigator) {
      metrics.connectionType = (navigator as any).connection?.effectiveType || 'unknown';
    }

    this.reportMetrics(metrics as PerformanceMetrics);
  }

  private processPerformanceEntry(entry: PerformanceEntry): void {
    const metrics: Partial<PerformanceMetrics> = {
      timestamp: Date.now(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight
      }
    };

    switch (entry.entryType) {
      case 'paint':
        if (entry.name === 'first-contentful-paint') {
          metrics.fcp = entry.startTime;
        }
        break;
      
      case 'largest-contentful-paint':
        metrics.lcp = entry.startTime;
        break;
      
      case 'first-input':
        metrics.fid = (entry as any).processingStart - entry.startTime;
        break;
      
      case 'layout-shift':
        if (!(entry as any).hadRecentInput) {
          metrics.cls = (metrics.cls || 0) + (entry as any).value;
        }
        break;
    }

    if (Object.keys(metrics).length > 4) { // More than just basic fields
      this.reportMetrics(metrics as PerformanceMetrics);
    }
  }

  private mapResourceEntry(entry: PerformanceResourceTiming): ResourceTiming {
    const getResourceType = (name: string): ResourceTiming['type'] => {
      if (name.includes('.js')) return 'script';
      if (name.includes('.css')) return 'stylesheet';
      if (name.match(/\.(png|jpg|jpeg|gif|svg|webp)$/)) return 'image';
      if (name.match(/\.(woff|woff2|ttf|otf)$/)) return 'font';
      if (name.includes('/api/')) return 'xhr';
      return 'other';
    };

    return {
      name: entry.name,
      duration: entry.duration,
      size: entry.transferSize,
      type: getResourceType(entry.name)
    };
  }

  private reportMetrics(metrics: PerformanceMetrics): void {
    this.metrics.push(metrics);
    
    // Send to monitoring service in production
    if (ENV.isProduction && ENV.ANALYTICS_ID) {
      this.sendToAnalytics(metrics);
    }
    
    // Log performance issues
    this.checkPerformanceThresholds(metrics);
  }

  private reportResourceMetrics(resources: ResourceTiming[]): void {
    // Report slow resources
    const slowResources = resources.filter(r => r.duration > 1000);
    if (slowResources.length > 0) {
      console.warn('Slow resources detected:', slowResources);
    }

    // Report large resources
    const largeResources = resources.filter(r => r.size && r.size > 1024 * 1024); // > 1MB
    if (largeResources.length > 0) {
      console.warn('Large resources detected:', largeResources);
    }
  }

  private checkPerformanceThresholds(metrics: PerformanceMetrics): void {
    const issues: string[] = [];

    // Check Core Web Vitals thresholds
    if (metrics.fcp && metrics.fcp > 1800) {
      issues.push(`FCP too slow: ${metrics.fcp}ms (should be < 1800ms)`);
    }
    
    if (metrics.lcp && metrics.lcp > 2500) {
      issues.push(`LCP too slow: ${metrics.lcp}ms (should be < 2500ms)`);
    }
    
    if (metrics.fid && metrics.fid > 100) {
      issues.push(`FID too slow: ${metrics.fid}ms (should be < 100ms)`);
    }
    
    if (metrics.cls && metrics.cls > 0.1) {
      issues.push(`CLS too high: ${metrics.cls} (should be < 0.1)`);
    }

    if (issues.length > 0) {
      console.warn('Performance issues detected:', issues);
      
      // Report to error monitoring
      if (ENV.isProduction) {
        this.reportPerformanceIssue(issues, metrics);
      }
    }
  }

  private async sendToAnalytics(metrics: PerformanceMetrics): Promise<void> {
    try {
      // Send to analytics service
      await fetch('/api/analytics/performance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(metrics)
      });
    } catch (error) {
      console.warn('Failed to send performance metrics:', error);
    }
  }

  private reportPerformanceIssue(issues: string[], metrics: PerformanceMetrics): void {
    // This would integrate with your error monitoring service
    console.error('Performance threshold exceeded:', {
      issues,
      metrics,
      timestamp: new Date().toISOString()
    });
  }

  // Public API
  startTiming(label: string): () => void {
    const start = performance.now();
    return () => {
      const duration = performance.now() - start;
      console.log(`${label}: ${duration.toFixed(2)}ms`);
      return duration;
    };
  }

  measureUserTiming(name: string, fn: () => void | Promise<void>): Promise<number> {
    return new Promise(async (resolve) => {
      const start = performance.now();
      await fn();
      const duration = performance.now() - start;
      
      // Mark the measurement
      if ('performance' in window && performance.mark) {
        performance.mark(`${name}-start`);
        performance.mark(`${name}-end`);
        performance.measure(name, `${name}-start`, `${name}-end`);
      }
      
      resolve(duration);
    });
  }

  getMetrics(): PerformanceMetrics[] {
    return [...this.metrics];
  }

  clearMetrics(): void {
    this.metrics = [];
  }

  destroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
    if (this.resourceObserver) {
      this.resourceObserver.disconnect();
    }
  }
}

// Singleton instance
export const performanceMonitor = new PerformanceMonitor();

// Utility functions for common measurements
export const measurePageLoad = (): void => {
  window.addEventListener('load', () => {
    setTimeout(() => {
      const metrics = performanceMonitor.getMetrics();
      console.log('Page load metrics:', metrics[metrics.length - 1]);
    }, 0);
  });
};

export const measureRouteChange = (routeName: string): (() => void) => {
  return performanceMonitor.startTiming(`Route: ${routeName}`);
};