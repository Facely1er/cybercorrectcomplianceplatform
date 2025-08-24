import { ENV } from '../config/environment';
import { errorMonitoring } from './errorMonitoring';

type PerformanceMetadata = Record<string, any>;

export interface PerformanceEntryRecord {
	name: string;
	startTime: number;
	duration: number;
	metadata?: PerformanceMetadata;
}

export interface VitalMetrics {
	FCP?: number; // First Contentful Paint
	LCP?: number; // Largest Contentful Paint
	FID?: number; // First Input Delay
	CLS?: number; // Cumulative Layout Shift
	TTFB?: number; // Time to First Byte
}

class PerformanceMonitoring {
	private static instance: PerformanceMonitoring;
	private measurements: Map<string, PerformanceEntryRecord[]> = new Map();
	private vitals: VitalMetrics = {};
	private initialized = false;

	static getInstance(): PerformanceMonitoring {
		if (!PerformanceMonitoring.instance) {
			PerformanceMonitoring.instance = new PerformanceMonitoring();
		}
		return PerformanceMonitoring.instance;
	}

	initialize() {
		if (this.initialized || typeof window === 'undefined') return;
		if (ENV.isProduction) {
			this.setupWebVitals();
			this.setupNavigationTiming();
			this.setupResourceTiming();
		}
		this.initialized = true;
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
			}).observe({ type: 'paint', buffered: true } as any);
		} catch {}

		try {
			new PerformanceObserver((list) => {
				const entries = list.getEntries();
				const lastEntry: any = entries[entries.length - 1];
				if (lastEntry) {
					this.vitals.LCP = lastEntry.startTime;
					this.reportVital('LCP', lastEntry.startTime);
				}
			}).observe({ type: 'largest-contentful-paint', buffered: true } as any);
		} catch {}

		try {
			new PerformanceObserver((list) => {
				for (const entry of list.getEntries() as any) {
					const fid = entry.processingStart - entry.startTime;
					this.vitals.FID = fid;
					this.reportVital('FID', fid);
				}
			}).observe({ type: 'first-input', buffered: true } as any);
		} catch {}

		try {
			let clsValue = 0;
			new PerformanceObserver((list) => {
				for (const entry of list.getEntries() as any) {
					if (!entry.hadRecentInput) {
						clsValue += entry.value;
					}
				}
				this.vitals.CLS = clsValue;
				this.reportVital('CLS', clsValue);
			}).observe({ type: 'layout-shift', buffered: true } as any);
		} catch {}
	}

	private setupNavigationTiming() {
		window.addEventListener('load', () => {
			const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
			if (!nav) return;
			this.vitals.TTFB = nav.responseStart - nav.requestStart;
			this.reportVital('TTFB', this.vitals.TTFB);
			const timings: Record<string, number> = {
				'DNS Lookup': nav.domainLookupEnd - nav.domainLookupStart,
				'TCP Connection': nav.connectEnd - nav.connectStart,
				'Request': nav.responseStart - nav.requestStart,
				'Response': nav.responseEnd - nav.responseStart,
				'DOM Processing': nav.domContentLoadedEventStart - nav.responseEnd,
				'Resource Loading': nav.loadEventStart - nav.domContentLoadedEventStart,
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
							transferSize: (resource as any).transferSize,
						});
					}
				}
			}).observe({ type: 'resource', buffered: true } as any);
		} catch {}
	}

	measurePerformance(name: string, duration = 0, metadata?: PerformanceMetadata): PerformanceEntryRecord {
		const entry: PerformanceEntryRecord = { name, startTime: performance.now(), duration, metadata };
		if (!this.measurements.has(name)) this.measurements.set(name, []);
		const arr = this.measurements.get(name)!;
		arr.push(entry);
		if (arr.length > 100) arr.shift();
		if (entry.duration > 100) {
			errorMonitoring.captureMessage(`Slow operation: ${name} took ${entry.duration}ms`, 'warning', {
				tags: { type: 'performance' },
				extra: metadata || {},
			});
		}
		return entry;
	}

	startTiming(name: string): (metadata?: PerformanceMetadata) => PerformanceEntryRecord {
		const start = performance.now();
		return (metadata?: PerformanceMetadata) => {
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
				p95: durations[p95Index] || 0,
			};
		}
		return result;
	}

	getVitalMetrics(): VitalMetrics {
		return { ...this.vitals };
	}

	private reportVital(name: string, value: number): void {
		if (ENV.isProduction) {
			errorMonitoring.captureMessage(`Web Vital ${name} = ${value}`, 'info', {
				tags: { type: 'webVital', vital: name },
				extra: { value },
			});
		}
	}

	getMemoryUsage(): Record<string, number> {
		if (typeof performance !== 'undefined' && (performance as any).memory) {
			const memory = (performance as any).memory;
			return {
				usedJSHeapSize: memory.usedJSHeapSize,
				totalJSHeapSize: memory.totalJSHeapSize,
				jsHeapSizeLimit: memory.jsHeapSizeLimit,
				usagePercentage: (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100,
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
			totalResources: scripts.length + styles.length,
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