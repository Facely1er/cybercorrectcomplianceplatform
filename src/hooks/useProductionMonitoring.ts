import { useState, useEffect, useCallback } from 'react';
import { errorMonitoring } from '../lib/errorMonitoring';
import { performanceMonitoring } from '../lib/performanceMonitoring';
import { ENV } from '../config/environment';

interface ProductionMetrics {
	uptime: number;
	errorRate: number;
	averageResponseTime: number;
	memoryUsage: number;
	bundleSize: number;
	healthStatus: 'healthy' | 'degraded' | 'unhealthy';
	lastUpdated: Date;
}

export const useProductionMonitoring = () => {
	const [metrics, setMetrics] = useState<ProductionMetrics>({
		uptime: 0,
		errorRate: 0,
		averageResponseTime: 0,
		memoryUsage: 0,
		bundleSize: 0,
		healthStatus: 'healthy',
		lastUpdated: new Date(),
	});
	const [isMonitoring, setIsMonitoring] = useState(ENV.isProduction);

	useEffect(() => {
		if (!isMonitoring || typeof window === 'undefined') return;
		const startTime = Date.now();
		let errorCount = 0;
		let requestCount = 0;
		let totalResponseTime = 0;

		const updateMetrics = () => {
			const uptime = Date.now() - startTime;
			const errorRate = requestCount > 0 ? (errorCount / requestCount) * 100 : 0;
			const averageResponseTime = requestCount > 0 ? totalResponseTime / requestCount : 0;

			let memoryUsage = 0;
			const mem = performanceMonitoring.getMemoryUsage();
			if (mem.usagePercentage) memoryUsage = mem.usagePercentage;

			const scripts = Array.from(document.querySelectorAll('script[src]'));
			const estimatedBundleSize = scripts.length * 50; // Rough estimate in KB

			let healthStatus: 'healthy' | 'degraded' | 'unhealthy' = 'healthy';
			if (errorRate > 5 || memoryUsage > 90 || averageResponseTime > 2000) {
				healthStatus = 'unhealthy';
			} else if (errorRate > 1 || memoryUsage > 70 || averageResponseTime > 1000) {
				healthStatus = 'degraded';
			}

			setMetrics({
				uptime,
				errorRate,
				averageResponseTime,
				memoryUsage,
				bundleSize: estimatedBundleSize,
				healthStatus,
				lastUpdated: new Date(),
			});
		};

		const interval = window.setInterval(updateMetrics, 30000);
		updateMetrics();

		const originalFetch = window.fetch.bind(window);
		window.fetch = async (...args) => {
			const start = performance.now();
			requestCount++;
			try {
				const response = await originalFetch(...args as any);
				const duration = performance.now() - start;
				totalResponseTime += duration;
				if (!response.ok) errorCount++;
				return response as any;
			} catch (e) {
				errorCount++;
				totalResponseTime += performance.now() - start;
				throw e;
			}
		};

		return () => {
			clearInterval(interval);
			window.fetch = originalFetch as any;
		};
	}, [isMonitoring]);

	const getHealthStatusColor = (status: string) => {
		switch (status) {
			case 'healthy':
				return 'text-green-600 dark:text-green-400';
			case 'degraded':
				return 'text-yellow-600 dark:text-yellow-400';
			case 'unhealthy':
				return 'text-red-600 dark:text-red-400';
			default:
				return 'text-gray-600 dark:text-gray-400';
		}
	};

	const reportHealthMetrics = () => {
		if (ENV.isProduction) {
			errorMonitoring.captureMessage('Production Health Check', 'info', {
				extra: metrics,
				tags: { type: 'healthCheck' },
			});
		}
	};

	const toggleMonitoring = useCallback(() => setIsMonitoring(v => !v), []);

	return { metrics, isMonitoring, toggleMonitoring, getHealthStatusColor, reportHealthMetrics };
};