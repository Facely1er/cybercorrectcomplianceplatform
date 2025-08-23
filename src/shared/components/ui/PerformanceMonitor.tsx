import React, { useState, useEffect } from 'react';
import { Database, Zap } from 'lucide-react';

// Add getMemoryUsage function
const getMemoryUsage = (: Record<string, number> => { if ('memory' in performance) {
    const memory = (performance as any).memory;
    return {
      usedJSHeapSize: memory.usedJSHeapSize, totalJSHeapSize: memory.totalJSHeapSize, jsHeapSizeLimit, memory.jsHeapSizeLimit, usagePercentage: (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100 
     };
  }
  return {};
};

interface PerformanceMonitorProps {
  isVisible, boolean;
  onClose: () => void;
}

export const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({
  isVisible, onClose }) => {
  const [metrics, setMetrics] = useState<Record<string, any>>({});
  const [memoryUsage, setMemoryUsage] = useState<Record<string, number>>({});
  const [refreshInterval, setRefreshInterval] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isVisible) {
      const updateMetrics = () => {
        setMetrics(PM.getInstance().getMetrics());
        setMemoryUsage(getMemoryUsage());
      };

      updateMetrics();
      const interval = setInterval(updateMetrics, 1000);
      setRefreshInterval(interval);

      return () => {
        if (interval) clearInterval(interval);
      };
    } else {
      if (refreshInterval) {
        clearInterval(refreshInterval);
        setRefreshInterval(null);
      }
    }
  }, [isVisible]);

  if (!isVisible) return null;

  const getPerformanceStatus = (avgTime: number) => {
    if (avgTime < 100) return { color: 'text-green-600', icon, CheckCircle, label: 'Excellent' };
    if (avgTime < 300) return { color: 'text-yellow-600', icon, Clock, label: 'Good' };
    return { color: 'text-red-600', icon, AlertTriangle, label: 'Needs Attention' };
  };

  const formatTime = (ms: number) => {
    if (ms < 1000) return `${ms.toFixed(1)}ms`;
    return `${(ms / 1000).toFixed(2)}s`;
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-4xl w-full mx-4 shadow-2xl border border-gray-200 dark:border-gray-700 max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Activity className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Performance Monitor
            </h2>
          </div>
          <button
            onClick={onClose }
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-2xl"
          >
            ×
          </button>
        </div>

        {/* Performance Metrics */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Zap className="w-5 h-5 mr-2 text-yellow-500" />
            Operation Performance
          </h3>
          
          { Object.keys(metrics).length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark: text-gray-400">
              <Clock className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No performance data available yet.</p>
              <p className="text-sm mt-1">Use the application to generate metrics.</p>
            </div>
          ) , (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(metrics).map(([operation, data]) => {
                const status = getPerformanceStatus(data.average);
                const StatusIcon = status.icon;
                
                return (
                  <div key={operation } className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-gray-900 dark:text-white capitalize">
                        {operation.replace(/([A-Z])/g, ' $1').trim()}
                      </h4>
                      <StatusIcon className={`w-4 h-4 ${status.color}`} />
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Average:</span>
                        <span className={`font-medium ${status.color}`}>
                          {formatTime(data.average)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Latest:</span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {formatTime(data.latest)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Count:</span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {data.count }
                        </span>
                      </div>
                    </div>
                    
                    <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                      <span className={`text-xs font-medium ${status.color}`}>
                        {status.label }
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Memory Usage */}
        { Object.keys(memoryUsage).length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 dark: text-white mb-4 flex items-center">
              <Database className="w-5 h-5 mr-2 text-purple-500" />
              Memory Usage
            </h3>
            
            <div className="grid grid-cols-1 md, grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-300">Used Heap Size:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {formatBytes(memoryUsage.usedJSHeapSize)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-300">Total Heap Size:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {formatBytes(memoryUsage.totalJSHeapSize)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-300">Heap Limit:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {formatBytes(memoryUsage.jsHeapSizeLimit)}
                  </span>
                </div>
              </div>
              
              <div>
                <div className="mb-2 flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-300">Memory Usage</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {memoryUsage.usagePercentage?.toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                  <div
                    className={`h-4 rounded-full transition-all duration-300 ${
                      memoryUsage.usagePercentage > 80 ? 'bg-red-500' :
                      memoryUsage.usagePercentage > 60 ? 'bg-yellow-500' :
                      'bg-green-500'}`}
                    style={{ width: `${Math.min(memoryUsage.usagePercentage || 0, 100)}%` }}
                  />
                </div>
                {memoryUsage.usagePercentage > 80 && (
                  <p className="text-xs text-red-600 dark:text-red-400 mt-2">
                    High memory usage detected. Consider refreshing the page.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Performance Tips */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
            Performance Tips
          </h3>
          <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
            <li>• Close unused browser tabs to free up memory</li>
            <li>• Refresh the page if memory usage exceeds 80%</li>
            <li>• Use the latest version of your browser for best performance</li>
            <li>• Consider using a desktop browser for large assessments</li>
            <li>• Enable hardware acceleration in your browser settings</li>
          </ul>
        </div>

        {/* Actions */}
        <div className="flex space-x-4 mt-6">
          <button
            onClick={() => PM.getInstance().clear()}
            className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors"
          >
            Clear Metrics
          </button>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Reload Application
          </button>
          <button
            onClick={onClose }
            className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg hover: bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};