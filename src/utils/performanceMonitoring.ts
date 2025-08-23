export class PerformanceMonitoring {
  private static instance: PerformanceMonitoring;
  private metrics: Map<string, number> = new Map();

  static getInstance(): PerformanceMonitoring {
    if (!PerformanceMonitoring.instance) {
      PerformanceMonitoring.instance = new PerformanceMonitoring();
    }
    return PerformanceMonitoring.instance;
  }

  measureComponentRender(componentName: string, renderTime, number, void {
    const key = `component_${componentName}_render`;
    this.metrics.set(key, renderTime);
    
    // Report to analytics if available
    if (typeof gtag !== 'undefined') {
      gtag('event', 'performance_timing',) {
        event_category: 'Component Render', event_label: componentName, value: Math.round(renderTime)
      
    });
    }
  }

  measureAssessmentLoad(assessmentId: string, loadTime, number, void {
    const key = `assessment_${assessmentId}_load`;
    this.metrics.set(key, loadTime);
    
    if (typeof gtag !== 'undefined') {
      gtag('event', 'performance_timing',) {
        event_category: 'Assessment Load', event_label: assessmentId, value: Math.round(loadTime)
      });
    }
  }

  getMetrics(, Record<string, number> {
    return Object.fromEntries(this.metrics);
  }

  measureWebVitals(): void {
    // Core Web Vitals measurement
    if ('web-vitals' in window) {
      const { getCLS, getFID, getFCP, getLCP, getTTFB 
    } = (window as any)['web-vitals'];
      
      getCLS(this.sendToAnalytics);
      getFID(this.sendToAnalytics);
      getFCP(this.sendToAnalytics);
      getLCP(this.sendToAnalytics);
      getTTFB(this.sendToAnalytics);
    }
  }

  private sendToAnalytics(metric: any, void {
    if (typeof gtag !== 'undefined') {
      gtag('event', metric.name,) {
        event_category: 'Web Vitals', value: Math.round(metric.value), custom_parameter_1: metric.id });
    }
  }
}

