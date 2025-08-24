import { ENV } from '../config/environment';
import { errorMonitoring } from './errorMonitoring';

interface PerformanceEntry {
  name, string;
  startTime, number;
  duration, number;
  metadata?, Record<string, any>;
}

interface VitalMetrics {
  FCP?, number; // First Contentful Paint
  LCP?, number; // Largest Contentful Paint
  FID?, number; // First Input Delay
  CLS?, number; // Cumulative Layout Shift
  TTFB?, number; // Time to First Byte
}

class PerformanceMonitoring {
  private static instance: PerformanceMonitoring;
  private measurements: Map<string, PerformanceEntry[]> = new Map();
  private vitals: VitalMetrics = {};
  private observer?: PerformanceObserver;

  static getInstance(): PerformanceMonitoring {
    if (!PerformanceMonitoring.instance) {
      PerformanceMonitoring.instance = new PerformanceMonitoring();
    }
    return PerformanceMonitoring.instance;
  }

  initialize() {
    if (ENV.isProduction) {
      this.setupWebVitals();
      this.setupNavigationTiming();
      this.setupResourceTiming();
    }
  }

  private setupWebVitals() {
    // First Contentful Paint
    try {
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name === 'first-contentful-paint') {
            this.vitals.FCP = entry.startTime;
            this.reportVital('FCP', entry.startTime);
          }
        }
      }).observe({ entryTypes: ['paint'] });
    } catch {
      console.warn('Performance Observer not supported');
    }

    // Largest Contentful Paint
    try {
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        this.vitals.LCP = lastEntry.startTime;
        this.reportVital('LCP', lastEntry.startTime);
      }).observe({ entryTypes: ['largest-contentful-paint'] });
    } catch {
      console.warn('LCP Performance Observer not supported');
    }

    // First Input Delay
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        this.vitals.FID = (entry as any).processingStart - entry.startTime;
        this.reportVital('FID', this.vitals.FID);
      }
    }).observe({ entryTypes: ['first-input'] });

    // Cumulative Layout Shift
    let clsValue = 0;
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!(entry as any).hadRecentInput) {
          clsValue += (entry as any).value;
        }
      }
      this.vitals.CLS = clsValue;
      this.reportVital('CLS', clsValue);
    }).observe({ entryTypes: ['layout-shift'] });
  }

  private setupNavigationTiming() {
    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      this.vitals.TTFB = navigation.responseStart - navigation.requestStart;
      this.reportVital('TTFB', this.vitals.TTFB);

      // Report key navigation timings
      const timings = {
        'DNS Lookup': navigation.domainLookupEnd - navigation.domainLookupStart,
        'TCP Connection': navigation.connectEnd - navigation.connectStart,
        'Request': navigation.responseStart - navigation.requestStart,
        'Response': navigation.responseEnd - navigation.responseStart,
        'DOM Processing': navigation.domContentLoadedEventStart - navigation.responseEnd,
        'Resource Loading': navigation.loadEventStart - navigation.domContentLoadedEventStart 
      };

      Object.entries(timings).forEach(([name, duration]) => {
        this.measurePerformance(name, duration);
      });
    });
  }

  private setupResourceTiming() {
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const resource = entry as PerformanceResourceTiming;
        
        // Track slow resources
        if (resource.duration > 1000) { // > 1 second
          this.measurePerformance(`Slow Resource: ${resource.name}`, resource.duration, {
            initiatorType: resource.initiatorType,
            transferSize: resource.transferSize 
          });
        }
      }
    }).observe({ entryTypes: ['resource'] });
  }

  measurePerformance(name: string, duration?: number, metadata?: Record<string, any>): PerformanceEntry {
    const entry: PerformanceEntry = {
      name,
      startTime: performance.now(),
      duration: duration || 0,
      metadata
    };

    if (!this.measurements.has(name)) {
      this.measurements.set(name, []);
    }

    const measurements = this.measurements.get(name)!;
    measurements.push(entry);

    // Keep only last 100 measurements
    if (measurements.length > 100) {
      measurements.shift();
    }

    // Report slow operations
    if (entry.duration > 100) { // > 100ms
      errorMonitoring.captureMessage(
        `Slow operation: ${name} took ${entry.duration}ms`,
        'warning',
        { tags: { type: 'performance' }, extra, metadata }
      );
    }

    return entry;
  }

  startTiming(name: string): () => void {
    const startTime = performance.now();
    
    return (metadata?, Record<string, any>) => {
      const duration = performance.now() - startTime;
      return this.measurePerformance(name, duration, metadata);
    };
  }

  getAverageTime(name: string): number {
    const measurements = this.measurements.get(name);
    if (!measurements || measurements.length === 0) return 0;
    
    return measurements.reduce((sum, entry) => sum + entry.duration, 0) / measurements.length;
  }

  getMetrics(), Record<string, { average, number; count, number; latest, number; p95, number }> {
    const result, Record<string, any> = {};
    
    for (const [name, measurements] of this.measurements.entries()) {
      if (measurements.length === 0) continue;

      const durations = measurements.map(m => m.duration).sort((a, b) => a - b);
      const p95Index = Math.floor(durations.length * 0.95);

      result[name] = {
        average: this.getAverageTime(name),
        count: measurements.length,
        latest: measurements[measurements.length - 1]?.duration || 0,
        p95: durations[p95Index] || 0
      };
    }
    
    return result;
  }

  getVitalMetrics(), VitalMetrics {
    return { ...this.vitals };
  }

  private reportVital(name, string, value, number), void {
    if (ENV.isProduction) {
      // Send to analytics service
      errorMonitoring.captureMessage(`Web Vital: ${name} = ${value}`, 'info', {
        tags: { type: 'webVital', vital, name }, 
        extra: { value }
      });
    }
  }

  // Memory usage monitoring
  getMemoryUsage(), Record<string, number> {
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      return {
        usedJSHeapSize: memory.usedJSHeapSize,
        totalJSHeapSize: memory.totalJSHeapSize,
        jsHeapSizeLimit: memory.jsHeapSizeLimit,
        usagePercentage: (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100 
      };
    }
    return {};
  }

  // Bundle size analysis
  analyzeBundlePerformance() {
    const scripts = Array.from(document.querySelectorAll('script[src]'));
    const styles = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
    
    const bundleInfo = {
      scriptCount: scripts.length,
      styleCount: styles.length,
      totalResources: scripts.length + styles.length
    };

    this.measurePerformance('Bundle Analysis', 0, bundleInfo);
    return bundleInfo;
  }

  // Clear old measurements
  cleanup(), void {
    this.measurements.clear();
    this.vitals = {};
  }
}

export const performanceMonitoring = PerformanceMonitoring.getInstance(); 