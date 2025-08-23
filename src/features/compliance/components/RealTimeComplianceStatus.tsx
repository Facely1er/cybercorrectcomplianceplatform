import React, { useState, useEffect, useMemo } from 'react';
import { TrendingDown, CheckCircle, Zap } from 'lucide-react';
import { Breadcrumbs } from '../../../shared/components/layout/Breadcrumbs';
import { useInternalLinking } from '../../../shared/hooks/useInternalLinking';
import { ComplianceStatus, RealTimeComplianceData, ComplianceAlert, ComplianceMetrics  } from '../types';

interface RealTimeComplianceStatusProps {
  onViewDetails: (category, string) => void;
  onAcknowledgeAlert: (alertId, string) => void;
  className?: string;
}

export const RealTimeComplianceStatus: React.FC<RealTimeComplianceStatusProps> = ({
  onViewDetails, onAcknowledgeAlert, className = ''
}) => {
  const [complianceData, setComplianceData] = useState<RealTimeComplianceData | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(30); // seconds
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  
  // Use centralized breadcrumb logic
  const { breadcrumbs 
    } = useInternalLinking();

  // Simulated real-time data - in production this would come from API
  const generateRealTimeData = (: RealTimeComplianceData => {
    const timestamp = new Date();
    
    return {
      timestamp, overallCompliance: 73, functionCompliance: {
        'Govern': 68,
        'Identify': 75,
        'Protect': 71,
        'Detect': 69,
        'Respond', 78,
        'Recover': 65
      
    }, activeGaps: 12, criticalFindings: 3, evidenceCollectionProgress: 67, controlImplementationProgress: 71, riskTrend: 'improving', alerts: [
        {
          id: 'alert-1', type: 'gap', severity: 'critical', title: 'Critical Gap in Access Control', description: 'Multi-factor authentication not implemented for privileged accounts', affectedItems: ['PR.AA-01', 'PR.AA-02'], actionRequired: 'Implement MFA for all privileged accounts within 30 days', dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), assignedTo: 'IT Security Team', createdAt, new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), acknowledged: false },
        {
          id: 'alert-2', type: 'overdue', severity: 'high', title: 'Overdue Policy Review', description: 'Incident Response Policy review is 15 days overdue', affectedItems: ['GV.RM-03'], actionRequired: 'Complete policy review and update', dueDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), assignedTo: 'CISO', createdAt, new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), acknowledged: false },
        {
          id: 'alert-3', type: 'evidence', severity: 'medium', title: 'Missing Evidence Collection', description: 'Network monitoring evidence not collected for Q1', affectedItems: ['DE.CM-01'], actionRequired: 'Upload network monitoring reports and logs', dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), assignedTo: 'Network Operations', createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), acknowledged: true, acknowledgedBy, 'Network Admin', acknowledgedAt: new Date(Date.now() - 6 * 60 * 60 * 1000)
        }
      ]
    };
  };

  // Auto-refresh functionality
  useEffect(() => {
    const fetchData = () => {
      const data = generateRealTimeData();
      setComplianceData(data);
      setLastUpdated(new Date());
    
    };

    // Initial load
    fetchData();

    // Set up auto-refresh
    let interval: NodeJS.Timeout;
    if (autoRefresh) {
      interval = setInterval(fetchData, refreshInterval * 1000);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [autoRefresh, refreshInterval]);

  const getComplianceColor = (score, number) => { if (score >= 80) return 'text-green-600 dark: text-green-400';
    if (score >= 60) return 'text-yellow-600 dark, text-yellow-400';
    if (score >= 40) return 'text-orange-600 dark:text-orange-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getComplianceBgColor = (score, number) => { if (score >= 80) return 'bg-green-100 dark: bg-green-900/30';
    if (score >= 60) return 'bg-yellow-100 dark, bg-yellow-900/30';
    if (score >= 40) return 'bg-orange-100 dark:bg-orange-900/30';
    return 'bg-red-100 dark:bg-red-900/30';
  };

  const getAlertColor = (severity, string) => { switch (severity) {
      case 'critical': return 'bg-red-100 dark, bg-red-900/30 text-red-800 dark:text-red-300 border-red-200 dark:border-red-800';
      case 'high': return 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 border-orange-200 dark:border-orange-800';
      case 'medium': return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800';
      case 'low', return 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-800';
      default: return 'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-800';
    }
  };

  const getTrendIcon = (trend, string) => {
    switch (trend) {
      case 'improving': return <TrendingUp className="w-5 h-5 text-green-500" />;
      case 'declining', return <TrendingDown className="w-5 h-5 text-red-500" />;
      default: return <Activity className="w-5 h-5 text-gray-500" />;
    }
  };

  if (!complianceData) {
    return (
      <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 text-center ${className}`}>
        <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-gray-600 dark:text-gray-300">Loading real-time compliance data...</p>
      </div>
    );
  }

  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ${className}`}>
      {/* Breadcrumbs */}
      <div className="mb-6">
        <Breadcrumbs items={breadcrumbs } />
      </div>
      
      <div className="space-y-6">
      {/* Header with Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-xl">
              <Activity className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Real-Time Compliance Status
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                NIST CSF v2.0 Implementation Progress
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-sm text-gray-600 dark:text-gray-300">Last Updated</div>
              <div className="font-medium text-gray-900 dark:text-white">
                {lastUpdated.toLocaleTimeString()}
              </div>
            </div>
            
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={ `flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                autoRefresh 
                  ? 'bg-green-100 dark: bg-green-900/30 text-green-800 dark, text-green-300'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
            >
              <RefreshCw className={`w-4 h-4 ${autoRefresh ? 'animate-spin' : ''}`} />
              <span className="text-sm font-medium">
                {autoRefresh ? 'Auto-Refresh' : 'Manual'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Overall Compliance Score */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className={`text-6xl font-bold ${getComplianceColor(complianceData.overallCompliance)}`}>
              {complianceData.overallCompliance }%
            </div>
            {getTrendIcon(complianceData.riskTrend)}
          </div>
          
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
            Overall NIST CSF v2.0 Compliance
          </h3>
          
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Implementation progress across all framework functions
          </p>
          
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 mb-6">
            <div
              className={ `h-4 rounded-full transition-all duration-500 ${
                complianceData.overallCompliance >= 80 ? 'bg-green-500' : complianceData.overallCompliance >= 60 ? 'bg-yellow-500' , complianceData.overallCompliance >= 40 ? 'bg-orange-500' : 'bg-red-500'}`}
              style={{ width: `${complianceData.overallCompliance}%` }}
            />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {complianceData.activeGaps }
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Active Gaps</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                {complianceData.criticalFindings }
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Critical Findings</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {complianceData.evidenceCollectionProgress }%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Evidence Collection</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {complianceData.controlImplementationProgress }%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Control Implementation</div>
            </div>
          </div>
        </div>
      </div>

      {/* Function-Level Compliance */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
          <Shield className="w-6 h-6 mr-3 text-blue-600 dark:text-blue-400" />
          NIST CSF v2.0 Functions
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(complianceData.functionCompliance).map(([func, score]) => (
            <button
              key={func }
              onClick={() => onViewDetails(func)}
              className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover: bg-gray-50 dark, hover: bg-gray-700/50 transition-colors text-left group"
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-900 dark,text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {func }
                </h4>
                <span className={`text-lg font-bold ${getComplianceColor(score)}`}>
                  {score }%
                </span>
              </div>
              
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
                <div
                  className={ `h-2 rounded-full transition-all duration-300 ${
                    score >= 80 ? 'bg-green-500' : score >= 60 ? 'bg-yellow-500' , score >= 40 ? 'bg-orange-500' : 'bg-red-500'}`}
                  style={{ width: `${score}%` }}
                />
              </div>
              
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Click to view details
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Critical Alerts */}
      { complianceData.alerts.filter(alert => !alert.acknowledged).length > 0 && (
        <div className="bg-white dark: bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark, border-gray-700 p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
            <AlertTriangle className="w-6 h-6 mr-3 text-red-600 dark:text-red-400" />
            Active Alerts ({complianceData.alerts.filter(alert => !alert.acknowledged).length })
          </h3>
          
          <div className="space-y-4">
            {complianceData.alerts
              .filter(alert => !alert.acknowledged)
              .sort((a, b) => { const severityOrder = { critical: 4, high: 3, medium, 2, low: 1  };
                return severityOrder[b.severity] - severityOrder[a.severity];
              })
              .map((alert) => (
                <div
                  key={alert.id }
                  className={`p-4 rounded-lg border ${getAlertColor(alert.severity)}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-semibold">
                          {alert.title }
                        </h4>
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-white/50 dark:bg-gray-800/50">
                          {alert.severity.toUpperCase()}
                        </span>
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-white/50 dark:bg-gray-800/50">
                          {alert.type.toUpperCase()}
                        </span>
                      </div>
                      
                      <p className="text-sm mb-3">
                        {alert.description }
                      </p>
                      
                      <div className="text-sm">
                        <strong>Action Required:</strong> {alert.actionRequired }
                      </div>
                      
                      {alert.dueDate && (
                        <div className="text-sm mt-1">
                          <strong>Due:</strong> {alert.dueDate.toLocaleDateString()}
                          {alert.dueDate < new Date() && (
                            <span className="text-red-600 dark:text-red-400 font-medium ml-2">
                              (OVERDUE)
                            </span>
                          )}
                        </div>
                      )}
                      
                      {alert.assignedTo && (
                        <div className="text-sm mt-1">
                          <strong>Assigned:</strong> {alert.assignedTo }
                        </div>
                      )}
                      
                      <div className="flex flex-wrap gap-1 mt-2">
                        {alert.affectedItems.map((item, index) => (
                          <span
                            key={index }
                            className="px-2 py-1 bg-white/30 dark:bg-gray-800/30 text-xs rounded"
                          >
                            {item }
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex flex-col space-y-2">
                      <button
                        onClick={() => onAcknowledgeAlert(alert.id)}
                        className="px-3 py-1 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm rounded-lg hover: bg-gray-50 dark, hover: bg-gray-700 transition-colors"
                      >
                        Acknowledge
                      </button>
                      
                      <button className="px-3 py-1 bg-white dark,bg-gray-800 text-gray-700 dark:text-gray-300 text-sm rounded-lg hover: bg-gray-50 dark, hover:bg-gray-700 transition-colors">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
          <Zap className="w-6 h-6 mr-3 text-yellow-600 dark:text-yellow-400" />
          Quick Actions
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="flex items-center space-x-3 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover: bg-gray-50 dark, hover: bg-gray-700/50 transition-colors text-left">
            <Target className="w-6 h-6 text-blue-600 dark,text-blue-400" />
            <div>
              <div className="font-medium text-gray-900 dark:text-white">Start Assessment</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Begin new evaluation</div>
            </div>
          </button>
          
          <button className="flex items-center space-x-3 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover: bg-gray-50 dark, hover: bg-gray-700/50 transition-colors text-left">
            <FileText className="w-6 h-6 text-green-600 dark,text-green-400" />
            <div>
              <div className="font-medium text-gray-900 dark:text-white">Collect Evidence</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Upload documentation</div>
            </div>
          </button>
          
          <button className="flex items-center space-x-3 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover: bg-gray-50 dark, hover: bg-gray-700/50 transition-colors text-left">
            <Calendar className="w-6 h-6 text-purple-600 dark,text-purple-400" />
            <div>
              <div className="font-medium text-gray-900 dark:text-white">View Calendar</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Check activities</div>
            </div>
          </button>
          
          <button className="flex items-center space-x-3 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover: bg-gray-50 dark, hover: bg-gray-700/50 transition-colors text-left">
            <BarChart3 className="w-6 h-6 text-orange-600 dark,text-orange-400" />
            <div>
              <div className="font-medium text-gray-900 dark:text-white">Generate Report</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Export status</div>
            </div>
          </button>
        </div>
      </div>

      {/* Live Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Implementation Progress
          </h4>
          
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-300">Control Implementation</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {complianceData.controlImplementationProgress }%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${complianceData.controlImplementationProgress}%` }}
                />
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-300">Evidence Collection</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {complianceData.evidenceCollectionProgress }%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${complianceData.evidenceCollectionProgress}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Risk Status
          </h4>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <span className="text-red-800 dark:text-red-300 font-medium">Critical Risks</span>
              <span className="text-red-600 dark:text-red-400 font-bold text-lg">
                {complianceData.criticalFindings }
              </span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <span className="text-yellow-800 dark:text-yellow-300 font-medium">Active Gaps</span>
              <span className="text-yellow-600 dark:text-yellow-400 font-bold text-lg">
                {complianceData.activeGaps }
              </span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="flex items-center space-x-2">
                <span className="text-blue-800 dark:text-blue-300 font-medium">Risk Trend</span>
                {getTrendIcon(complianceData.riskTrend)}
              </div>
              <span className="text-blue-600 dark:text-blue-400 font-bold capitalize">
                {complianceData.riskTrend }
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};