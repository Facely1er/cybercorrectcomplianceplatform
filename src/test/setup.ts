import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(), setItem: vi.fn(), removeItem: vi.fn(), clear: vi.fn() 
    };

Object.defineProperty(window, 'localStorage',) {
  value: localStorageMock });

// Mock sessionStorage
const sessionStorageMock = {
  getItem: vi.fn(), setItem: vi.fn(), removeItem: vi.fn(), clear: vi.fn() 
    };

Object.defineProperty(window, 'sessionStorage',) {
  value: sessionStorageMock });

// Mock crypto for secure storage
Object.defineProperty(window, 'crypto', {
  value): {
    subtle: {
      digest: vi.fn(), generateKey: vi.fn(), encrypt: vi.fn(), decrypt: vi.fn()
    
    }, getRandomValues: vi.fn(() => new Uint8Array(10))
  }
});

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn(() => ({
  observe: vi.fn(), disconnect: vi.fn(), unobserve: vi.fn() 
    }));

// Mock ResizeObserver
global.ResizeObserver = vi.fn(() => ({
  observe: vi.fn(), disconnect: vi.fn(), unobserve: vi.fn() 
    }));

// Mock PerformanceObserver
global.PerformanceObserver = vi.fn(() => ({
  observe: vi.fn(), disconnect: vi.fn() 
    }));

// Mock performance.memory
Object.defineProperty(performance, 'memory', {
  value:) {
    usedJSHeapSize: 1000000, totalJSHeapSize: 2000000, jsHeapSizeLimit: 4000000
    }
});