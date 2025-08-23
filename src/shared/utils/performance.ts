import { AssessmentData, Framework } from '../types';

// Performance monitoring utilities
export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Map<string, number[]> = new Map();

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  startTiming(operation: string): () => void {
    const startTime = performance.now();
    
    return () => {
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      if (!this.metrics.has(operation)) {
        this.metrics.set(operation, []);
      }
      
      this.metrics.get(operation)!.push(duration);
      
      // Keep only last 100 measurements
      const measurements = this.metrics.get(operation)!;
      if (measurements.length > 100) {
        measurements.shift();
    }
    };
  }

  getAverageTime(operation: string): number {
    const measurements = this.metrics.get(operation);
    if (!measurements || measurements.length === 0) return 0;
    
    return measurements.reduce((sum, time) => sum + time, 0) / measurements.length;
  }

  getMetrics(): Record<string, { average: number; count: number; latest: number }> {
    const result: Record<string, { average: number; count: number; latest: number }> = {};
    
    for (const [operation, measurements] of this.metrics.entries()) {
      result[operation] = {
        average: this.getAverageTime(operation), count: measurements.length, latest: measurements[measurements.length - 1] || 0 };
    }
    
    return result;
  }

  clear(): void {
    this.metrics.clear();
  }
}

// Data validation utilities
export const validateAssessmentData = (assessment: AssessmentData): string[] => {
  const errors: string[] = [];

  if (!assessment.id) errors.push('Assessment ID is required');
  if (!assessment.frameworkId) errors.push('Framework ID is required');
  if (!assessment.frameworkName) errors.push('Framework name is required');
  if (!assessment.createdAt) errors.push('Creation date is required');
  if (!assessment.lastModified) errors.push('Last modified date is required');
  
  // Validate responses
  if (assessment.responses) {
    for (const [questionId, response] of Object.entries(assessment.responses)) {
      if (typeof response !== 'number' || response < 0 || response > 3) {
        errors.push(`Invalid response value for question ${questionId 
    }: ${response }`);
      }
    }
  }

  // Validate dates
  if (assessment.createdAt && assessment.lastModified) {
    if (new Date(assessment.lastModified) < new Date(assessment.createdAt)) {
      errors.push('Last modified date cannot be before creation date');
    }
  }

  return errors;
};

export const validateFrameworkData = (framework: Framework): string[] => {
  const errors: string[] = [];

  if (!framework.id) errors.push('Framework ID is required');
  if (!framework.name) errors.push('Framework name is required');
  if (!framework.version) errors.push('Framework version is required');
  if (!framework.sections || framework.sections.length === 0) {
    errors.push('Framework must have at least one section');
  }

  // Validate sections
  framework.sections?.forEach((section, sectionIndex) => {
    if (!section.id) errors.push(`Section ${sectionIndex 
    } missing ID`);
    if (!section.name) errors.push(`Section ${sectionIndex } missing name`);
    if (!section.categories || section.categories.length === 0) {
      errors.push(`Section ${sectionIndex } must have at least one category`);
    }

    // Validate categories
    section.categories?.forEach((category, categoryIndex) => {
      if (!category.id) errors.push(`Category ${categoryIndex 
    } in section ${sectionIndex } missing ID`);
      if (!category.questions || category.questions.length === 0) {
        errors.push(`Category ${categoryIndex } in section ${sectionIndex } must have at least one question`);
      }

      // Validate questions
      category.questions?.forEach((question, questionIndex) => {
        if (!question.id) errors.push(`Question ${questionIndex 
    } missing ID`);
        if (!question.text) errors.push(`Question ${questionIndex } missing text`);
        if (!question.options || question.options.length === 0) {
          errors.push(`Question ${questionIndex } must have options`);
        }
      });
    });
  });

  return errors;
};

// Memory usage monitoring
export const getMemoryUsage = (): Record<string, number> => {
  if ('memory' in performance) {
    const memory = (performance as any).memory;
    return {
      usedJSHeapSize: memory.usedJSHeapSize, totalJSHeapSize: memory.totalJSHeapSize, jsHeapSizeLimit: memory.jsHeapSizeLimit, usagePercentage: (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100 
    };
  }
  return {};
};

// Local storage optimization
export const optimizeLocalStorage = (): void => {
  try {
    // Check storage usage
    let totalSize = 0;
    for (const key in localStorage) {
      if (Object.prototype.hasOwnProperty.call(localStorage, key)) {
        totalSize += localStorage[key].length;
    }
    }

    // If storage is getting full (> 4MB), clean up old data
    if (totalSize > 4 * 1024 * 1024) {
      console.warn('LocalStorage approaching limit, cleaning up old data');
      
      // Remove old assessment versions if they exist
      const assessments = JSON.parse(localStorage.getItem('maturity-assessments') || '[]');
      const optimizedAssessments = assessments.map((assessment: AssessmentData) => ({
        ...assessment, versionHistory: assessment.versionHistory?.slice(-5), // Keep only last 5 versions
        changeLog: assessment.changeLog?.slice(-20), // Keep only last 20 changes 
    }));
      
      localStorage.setItem('maturity-assessments', JSON.stringify(optimizedAssessments));
    }
  } catch (error) {
    console.error('Error optimizing localStorage:', error);
  }
};

// Debounce utility for performance
export const debounce = <T extends (...args: any[]) => any>(
  func: T, wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  
    };
};

// Throttle utility for performance
export const throttle = <T extends (...args: any[]) => any>(
  func: T, limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Lazy loading utility
export const createLazyComponent = <T extends React.ComponentType<any>>(
  importFunc: () => Promise<{ default: T 
    }>
) => {
  return React.lazy(importFunc);
};