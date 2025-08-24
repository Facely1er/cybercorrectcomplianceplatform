import { ENV } from '../config/environment';
import { errorMonitoring } from './errorMonitoring';

interface PerformanceEntryRec {
  name: string;
  startTime: number;
  duration: number;
  metadata?: Record<string, any>;
}

interface VitalMetrics {
  FCP?: number; // First Contentful Paint
  LCP?: number; // Largest Contentful Paint
  FID?: number; // First Input Delay
  CLS?: number; // Cumulative Layout Shift
  TTFB?: number; // Time to First Byte
}

class PerformanceMonitoring {
  private static instance: PerformanceMonitoring;
  private measurements: Map<string, PerformanceEntryRec[]> = new Map();
  private vitals: VitalMetrics = {};

  static getInstance(): PerformanceMonitoring {
    if (!PerformanceMonitoring.instance) {
      PerformanceMonitoring.instance = new PerformanceMonitoring();
    }
    return PerformanceMonitoring.instance;
  }

  initialize() {
    if (!ENV.isProduction) return;
    this.setupWebVitals();
    this.setupNavigationTiming();
    this.setupResourceTiming();
  }

  private setupWebVitals() {
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
      // ignore
    }

    try {
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const last = entries[entries.length - 1] as PerformanceEntry;
        if (last) {
          this.vitals.LCP = last.startTime;
          this.reportVital('LCP', last.startTime);
        }
      }).observe({ entryTypes: ['largest-contentful-paint'] });
    } catch {
      // ignore
    }

    try {
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const anyEntry = entry as any;
          this.vitals.FID = anyEntry.processingStart - entry.startTime;
          this.reportVital('FID', this.vitals.FID);
        }
      }).observe({ entryTypes: ['first-input'] });
    } catch {
      // ignore
    }

    try {
      let clsValue = 0;
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const anyEntry = entry as any;
          if (!anyEntry.hadRecentInput) {
            clsValue += anyEntry.value;
          }
        }
        this.vitals.CLS = clsValue;
        this.reportVital('CLS', clsValue);
      }).observe({ entryTypes: ['layout-shift'] });
    } catch {
      // ignore
    }
  }

  private setupNavigationTiming() {
    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (!navigation) return;

      this.vitals.TTFB = navigation.responseStart - navigation.requestStart;
      this.reportVital('TTFB', this.vitals.TTFB);

      const timings: Record<string, number> = {
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
    try {
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const resource = entry as PerformanceResourceTiming;
          if (resource.duration > 1000) {
            this.measurePerformance(`Slow Resource: ${resource.name}`, resource.duration, {
              initiatorType: resource.initiatorType,
              transferSize: resource.transferSize
            });
          }
        }
      }).observe({ entryTypes: ['resource'] });
    } catch {
      // ignore
    }
  }

  measurePerformance(name: string, duration?: number, metadata?: Record<string, any>): PerformanceEntryRec {
    const entry: PerformanceEntryRec = {
      name,
      startTime: performance.now(),
      duration: duration || 0,
      metadata
    };

    if (!this.measurements.has(name)) {
      this.measurements.set(name, []);
    }

    const arr = this.measurements.get(name)!;
    arr.push(entry);

    if (arr.length > 100) arr.shift();

    if (entry.duration > 100) {
      errorMonitoring.captureMessage(`Slow operation: ${name} took ${entry.duration}ms`, 'warning', {
        tags: { type: 'performance' },
        extra: metadata
      });
    }

    return entry;
  }

  startTiming(name: string): (metadata?: Record<string, any>) => PerformanceEntryRec {
    const start = performance.now();
    return (metadata?: Record<string, any>) => {
      const duration = performance.now() - start;
      return this.measurePerformance(name, duration, metadata);
    };
  }

  getAverageTime(name: string): number {
    const arr = this.measurements.get(name);
    if (!arr || arr.length === 0) return 0;
    return arr.reduce((sum, e) => sum + e.duration, 0) / arr.length;
  }

  getMetrics(): Record<string, { average: number; count: number; latest: number; p95: number }> {
    const result: Record<string, any> = {};
    for (const [name, arr] of this.measurements.entries()) {
      if (arr.length === 0) continue;
      const durations = arr.map(m => m.duration).sort((a, b) => a - b);
      const p95Index = Math.floor(durations.length * 0.95);
      result[name] = {
        average: this.getAverageTime(name),
        count: arr.length,
        latest: arr[arr.length - 1]?.duration || 0,
        p95: durations[p95Index] || 0
      };
    }
    return result;
  }

  getVitalMetrics(): VitalMetrics {
    return { ...this.vitals };
  }

  private reportVital(name: string, value: number): void {
    if (!ENV.isProduction) return;
    errorMonitoring.captureMessage(`Web Vital ${name} = ${value}`, 'info', {
      tags: { type: 'webVital', vital: name },
      extra: { value }
    });
  }

  getMemoryUsage(): Record<string, number> {
    const perfAny = performance as any;
    if ('memory' in perfAny) {
      const memory = perfAny.memory;
      return {
        usedJSHeapSize: memory.usedJSHeapSize,
        totalJSHeapSize: memory.totalJSHeapSize,
        jsHeapSizeLimit: memory.jsHeapSizeLimit,
        usagePercentage: (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100
      };
    }
    return {};
  }

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

  cleanup(): void {
    this.measurements.clear();
    this.vitals = {};
  }
}

export const performanceMonitoring = PerformanceMonitoring.getInstance(); 