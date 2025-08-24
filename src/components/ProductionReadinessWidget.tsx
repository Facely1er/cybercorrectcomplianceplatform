import React, { useState, useEffect } from 'react';
import { CheckCircle, Info, X, Monitor, AlertTriangle, Shield } from 'lucide-react';
import { productionReadinessChecker } from '../lib/productionReadiness';
import { useProductionMonitoring } from '../hooks/useProductionMonitoring';
import { ENV } from '../config/environment';

interface ReadinessCheck {
  name: string;
  status: 'pass' | 'fail' | 'warning';
  message: string;
  critical: boolean;
}

export const ProductionReadinessWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [checks, setChecks] = useState<ReadinessCheck[]>([]);
  const [readinessScore, setReadinessScore] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const { metrics, isMonitoring, getHealthStatusColor } = useProductionMonitoring();

  useEffect(() => {
    if (ENV.isDevelopment) {
      performReadinessCheck();
    }
  }, []);

  const performReadinessCheck = async () => {
    try {
      const result = await productionReadinessChecker.performReadinessCheck();
      setChecks(result.checks);
      setReadinessScore(result.score);
      setIsReady(result.ready);
    } catch (error) {
      console.error('Failed to perform readiness check:', error);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'fail':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default:
        return <Info className="w-4 h-4 text-gray-500" />;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 dark:text-green-400';
    if (score >= 70) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  if (!ENV.isDevelopment && !ENV.isProduction) {
    return null; // Only show in development or production
  }

  return (
    <>
      {/* Floating Widget */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-20 right-4 p-3 rounded-full shadow-lg transition-all duration-300 z-40 ${
          isReady ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-red-600 hover:bg-red-700 text-white animate-pulse'
        }`}
        title={`Production Readiness: ${readinessScore}/100`}
      >
        <Shield className="w-5 h-5" />
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-4xl w-full mx-4 shadow-2xl border border-gray-200 dark:border-gray-700 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Production Readiness Status</h2>
                  <p className="text-gray-600 dark:text-gray-300">Comprehensive health check for deployment readiness</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};