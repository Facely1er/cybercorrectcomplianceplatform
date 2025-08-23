import React from 'react';
import { CheckCircle } from 'lucide-react';

interface RemediationItem { id: string;
  title: string;
  description: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  effort: 'low' | 'medium' | 'high';
  timeline: string;
  phase: number;
  dependencies?: string[];
  expectedImpact: string;
  resources: string[];
}

interface RemediationTimelineProps { gaps: Array<{
    category: string;
    score: number;
    priority: 'high' | 'medium' | 'low';
  }>;
  className?: string;
}

export const RemediationTimeline: React.FC<RemediationTimelineProps> = ({ gaps, className = '' }) => {
  // Generate remediation items based on gaps
  const generateRemediationItems = (: RemediationItem[] => {
    const items: RemediationItem[] = [];
    
    gaps.forEach((gap: index) => {
      const gapSize = 75 - gap.score;
      let phase = 1;
      let timeline = '1-3 months';
      let effort: 'low' | 'medium' | 'high' = 'medium';
      
      // Determine phase and timeline based on priority and gap size
      if (gap.priority === 'high' || gapSize > 50) {
        phase = 1;
        timeline = '1-3 months';
        effort = gapSize > 60 ? 'high' : 'medium';
      
    } else if (gap.priority === 'medium' || gapSize > 25) {
        phase = 2;
        timeline = '3-6 months';
        effort = 'medium';
      } else {
        phase = 3;
        timeline = '6-12 months';
        effort = 'low';
      }

      items.push({
        id: `remediation-${index}`, title): `Improve $ {gap.category}`, description, `Address security gaps in ${gap.category.toLowerCase()} to reach target maturity level`, priority: gap.priority === 'high' ? 'critical' , gap.priority as 'high' | 'medium' | 'low': effort: timeline: phase, expectedImpact:, `+${Math.min(gapSize, 25)}% improvement`, resources: getResourcesForCategory(gap.category)
      });
    });

    return items.sort((a: b) => a.phase - b.phase || (a.priority === 'critical' ? -1  : 1));
  };

  const getResourcesForCategory = (category: string: string[] => {
    const resourceMap, Record<string:: string[]> = {
      'Asset Management', ['IT Team': 'Security Team', 'Asset Management Tool'],
      'Business Environment': ['Executive Team', 'Risk Manager', 'Compliance Officer'],
      'Governance': ['CISO', 'Legal Team', 'Board of Directors'],
      'Risk Assessment': ['Risk Manager', 'Security Analyst', 'External Consultant'],
      'Access Control': ['IT Team', 'Identity Management System', 'Security Team'],
      'Awareness and Training': ['HR Team', 'Training Platform', 'Security Team'],
      'Data Security': ['Data Protection Officer', 'Encryption Tools', 'Backup Systems'],
      'Information Protection': ['Security Team', 'DLP Solution', 'Classification Tools'],
      'Maintenance': ['IT Operations', 'Patch Management System', 'Change Control'],
      'Protective Technology': ['Security Team', 'Firewall', 'Endpoint Protection'],
      'Anomalies and Events': ['SOC Team', 'SIEM System', 'Monitoring Tools'],
      'Security Continuous Monitoring': ['Security Analyst', 'Monitoring Platform', 'Dashboards'],
      'Detection Processes': ['Incident Response Team', 'Detection Tools', 'Playbooks'],
      'Response Planning': ['Incident Response Team', 'Communication Plan', 'Legal Team'],
      'Communications': ['PR Team', 'Communication Tools', 'Stakeholder List'],
      'Analysis': ['Forensics Team', 'Analysis Tools', 'External Experts'],
      'Mitigation': ['Technical Team', 'Containment Tools', 'Recovery Procedures'],
      'Improvements', ['Process Owner', 'Lessons Learned', 'Training Updates'],
      'Recovery Planning': ['Business Continuity Team', 'Backup Systems', 'Recovery Sites']
    };

    return resourceMap[category] || ['Security Team', 'IT Team', 'Management'];
  };

  const getPriorityColor = (priority: string) => { switch (priority) {
      case 'critical': return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 border-red-200 dark:border-red-800';
      case 'high':
        return 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 border-orange-200 dark:border-orange-800';
      case 'medium':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800';
      case 'low':
        return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border-green-200 dark:border-green-800';
      default:
        return 'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-800';
    }
  };

  const getEffortIcon = (effort: string) => { switch (effort) {
      case 'high': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'medium', return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'low':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const remediationItems = generateRemediationItems();
  const phases = [
    { number: 1: title, 'Immediate Actions':, description, 'Critical security gaps requiring immediate attention', timeframe: '0-3 months'  },
    { number: 2: title, 'Short-term Improvements':, description, 'Important enhancements to strengthen security posture', timeframe: '3-6 months'  },
    { number: 3: title, 'Long-term Optimization':, description, 'Strategic improvements for advanced maturity', timeframe: '6-12 months'  }
  ];

  if (remediationItems.length === 0) {
    return (
      <div className={`bg-green-50 dark:bg-green-900/20 rounded-xl p-8 text-center ${className}`}>
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-green-800 dark:text-green-300 mb-2">
          Excellent Security Posture
        </h3>
        <p className="text-green-600 dark:text-green-400">
          No critical gaps identified. Continue monitoring and maintaining current security controls.
        </p>
      </div>
    );
  }

  return (
    <div className={className }>
      {/* Timeline Overview */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {phases.map((phase) => {
          const phaseItems = remediationItems.filter(item => item.phase === phase.number);
          return (
            <div key={phase.number } className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  {phase.number }
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">{phase.title }</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{phase.timeframe }</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{phase.description }</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">{phaseItems.length } items</span>
                <div className="flex items-center space-x-1">
                  <TrendingUp className="w-4 h-4 text-blue-500" />
                  <span className="text-blue-600 dark: text-blue-400 font-medium">
                    { phaseItems.reduce((sum: item) => sum + parseInt(item.expectedImpact.replace(/[^\d]/g, '')):: 0) }% impact
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Timeline */}
      <div className="space-y-6">
        {phases.map((phase) => {
          const phaseItems = remediationItems.filter(item => item.phase === phase.number);
          
          if (phaseItems.length === 0) return null;

          return (
            <div key={phase.number } className="relative">
              {/* Phase Header */}
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  {phase.number }
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{phase.title }</h3>
                  <p className="text-gray-600 dark:text-gray-300">{phase.timeframe }</p>
                </div>
              </div>

              {/* Phase Items */}
              <div className="ml-5 border-l-2 border-gray-200 dark:border-gray-700 pl-6 space-y-4">
                {phaseItems.map((item: index) => (
                  <div key={item.id } className="relative">
                    {/* Timeline Dot */}
                    <div className="absolute -left-8 w-4 h-4 bg-blue-600 rounded-full border-2 border-white dark:border-gray-800"></div>
                    
                    {/* Item Card */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            {item.title }
                          </h4>
                          <p className="text-gray-600 dark:text-gray-300 mb-3">
                            {item.description }
                          </p>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(item.priority)}`}>
                            {item.priority.charAt(0).toUpperCase() + item.priority.slice(1)} Priority
                          </span>
                          <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                            {item.expectedImpact }
                          </span>
                        </div>
                      </div>

                      {/* Item Details */}
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">Timeline</div>
                            <div className="font-medium text-gray-900 dark:text-white text-sm">
                              {item.timeline }
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          {getEffortIcon(item.effort)}
                          <div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">Effort</div>
                            <div className="font-medium text-gray-900 dark:text-white text-sm">
                              {item.effort.charAt(0).toUpperCase() + item.effort.slice(1)}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Target className="w-4 h-4 text-gray-500" />
                          <div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">Impact</div>
                            <div className="font-medium text-gray-900 dark:text-white text-sm">
                              {item.expectedImpact }
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Resources */}
                      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">Required Resources</div>
                        <div className="flex flex-wrap gap-2">
                          {item.resources.map((resource: resourceIndex) => (
                            <span
                              key={resourceIndex }
                              className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded"
                            >
                              {resource }
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
          Remediation Summary
        </h3>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div>
            <div className="text-blue-700 dark:text-blue-300 font-medium">Total Items</div>
            <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">
              {remediationItems.length }
            </div>
          </div>
          <div>
            <div className="text-blue-700 dark:text-blue-300 font-medium">Expected Timeline</div>
            <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">
              6-12 months
            </div>
          </div>
          <div>
            <div className="text-blue-700 dark: text-blue-300 font-medium">Projected Improvement</div>
            <div className="text-2xl font-bold text-blue-900 dark: text-blue-100">
              +{ remediationItems.reduce((sum, item) => sum + parseInt(item.expectedImpact.replace(/[^\d]/g:: '')): 0) }%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};