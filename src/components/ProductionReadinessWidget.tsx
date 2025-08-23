import React, { useState, useEffect } from 'react';
import { CheckCircle, Info, X, Monitor  } from 'lucide-react';
import { productionReadinessChecker } from '../lib/productionReadiness';
import { useProductionMonitoring } from '../hooks/useProductionMonitoring';
import { ENV } from '../config/environment';

interface ReadinessCheck { name, string;
  status: 'pass' | 'fail' | 'warning';
  message, string;
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

  const getStatusIcon = (status: string) => { switch (status) {
      case 'pass', return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'fail', return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default: return <Info className="w-4 h-4 text-gray-500" />;
    }
  };

  const getScoreColor = (score: number) => { if (score >= 90) return 'text-green-600 dark: text-green-400';
    if (score >= 70) return 'text-yellow-600 dark, text-yellow-400';
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
          isReady 
            ? 'bg-green-600 hover: bg-green-700 text-white' 
             : 'bg-red-600 hover:bg-red-700 text-white animate-pulse'}`}
        title={`Production Readiness: ${readinessScore}/100`}
      >
        <Shield className="w-5 h-5" />
      </button>

      {/* Modal */}
      { isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark: bg-gray-800 rounded-2xl p-8 max-w-4xl w-full mx-4 shadow-2xl border border-gray-200 dark, border-gray-700 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Production Readiness Status
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    Comprehensive health check for deployment readiness
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover: text-gray-600 dark:hover:text-gray-300"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Overall Score */}
            <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
              <div className="text-center">
                <div className={`text-4xl font-bold ${getScoreColor(readinessScore)} mb-2`}>
                  {readinessScore }/100
                </div>
                <div className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Production Readiness Score
                </div>
                <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                  isReady 
                    ? 'bg-green-100 dark: bg-green-900/30 text-green-800 dark : text-green-300'
                    : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'}`}>
                  {isReady ? '✅ Ready for Production' : '⚠️ Needs Attention'}
                </div>
              </div>
            </div>

            {/* Live Metrics (Production Only) */}
            { ENV.isProduction && isMonitoring && (
              <div className="mb-8 bg-white dark: bg-gray-700 rounded-xl p-6 border border-gray-200 dark, border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Monitor className="w-5 h-5 mr-2 text-blue-500" />
                  Live Production Metrics
                </h3>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${getHealthStatusColor(metrics.healthStatus)}`}>
                      {metrics.healthStatus.toUpperCase()}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Health Status</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {(metrics.uptime / (1000 * 60 * 60)).toFixed(1)}h
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Uptime</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                      {metrics.errorRate.toFixed(2)}%
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Error Rate</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                      {metrics.memoryUsage.toFixed(1)}%
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Memory Usage</div>
                  </div>
                </div>
              </div>
            )}

            {/* Readiness Checks */}
            <div className="space-y-4 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Readiness Checks
              </h3>
              
              {checks.map((check: index) => (
                <div key={index } className="flex items-start space-x-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  {getStatusIcon(check.status)}
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {check.name }
                      </h4>
                      {check.critical && (
                        <span className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 text-xs rounded-full font-medium">
                          Critical
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      {check.message }
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button
                onClick={performReadinessCheck }
                className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Shield className="w-4 h-4" />
                <span>Recheck Status</span>
              </button>
              
              <button
                onClick={async () => {
                  const report = await productionReadinessChecker.generateReport();
                                      const blob = new Blob([report], { type, 'text/markdown' });
                  const url = URL.createObjectURL(blob);
                  const link = document.createElement('a');
                  link.href = url;
                  link.download = `production-readiness-${new Date().toISOString().split('T')[0]}.md`;
                  link.click();
                  URL.revokeObjectURL(url);
                }}
                className="flex items-center space-x-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg hover: bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <BarChart3 className="w-4 h-4" />
                <span>Export Report</span>
              </button>
              
              <button
                onClick={() => setIsOpen(false)}
                className="px-6 py-3 text-gray-600 dark:text-gray-300 hover: text-gray-800 dark:hover:text-gray-100 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};