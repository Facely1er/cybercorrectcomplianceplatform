import React, { useState } from 'react';
import { 
  Shield, CheckCircle, Clock, AlertTriangle, Target,
  Plus, Search, Filter, Eye, Edit3, Settings, BarChart3,
  Award, Users, Calendar, FileText, TrendingUp
} from 'lucide-react';
import { Control, ControlStatus, ControlType } from '../types';

interface ControlsManagementViewProps {
  onBack: () => void;
  addNotification: (type: 'success' | 'error' | 'warning' | 'info', message: string) => void;
}

export const ControlsManagementView: React.FC<ControlsManagementViewProps> = ({
  onBack,
  addNotification
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<ControlStatus | 'all'>('all');
  const [filterFunction, setFilterFunction] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');

  // Mock controls data for NIST CSF v2.0
  const controls: Control[] = [
    {
      id: 'ctrl-001',
      name: 'Asset Inventory Management',
      description: 'Maintain comprehensive inventory of organizational assets including hardware, software, and data',
      framework: 'nist-csf-v2',
      nistFunction: 'Identify',
      nistCategory: 'Asset Management',
      nistSubcategory: 'ID.AM-01',
      controlFamily: 'Asset Management',
      controlType: 'administrative',
      implementationApproach: 'automated',
      status: 'implemented',
      priority: 'high',
      owner: 'IT Manager',
      implementers: ['IT Team', 'Security Team'],
      validators: ['CISO', 'Internal Audit'],
      lastAssessed: new Date(2024, 1, 15),
      nextAssessment: new Date(2024, 4, 15),
      assessmentFrequency: 'quarterly',
      implementation: {
        actualDate: new Date(2024, 0, 15),
        method: 'Automated discovery tools with manual validation',
        tools: ['Lansweeper', 'ManageEngine AssetExplorer'],
        procedures: ['Asset Discovery SOP', 'Inventory Validation Process'],
        configuration: { discovery_frequency: 'daily', validation_frequency: 'weekly' },
        deployment: {
          scope: ['All Networks', 'All Systems'],
          phases: [],
          rollbackPlan: 'Manual inventory as fallback'
        },
        validation: {
          criteria: ['95% discovery accuracy', 'Real-time updates'],
          methods: ['Automated testing', 'Manual spot checks'],
          results: []
        }
      },
      testing: {
        testPlan: {
          id: 'tp-001',
          objectives: ['Verify inventory accuracy', 'Test discovery coverage'],
          scope: ['All asset types', 'All network segments'],
          methods: ['Automated scanning', 'Manual verification'],
          criteria: ['95% accuracy', '<24h discovery time'],
          responsibilities: { tester: 'Security Team', reviewer: 'CISO' },
          timeline: 'Quarterly'
        },
        schedule: {
          frequency: 'quarterly',
          nextTest: new Date(2024, 4, 15),
          lastTest: new Date(2024, 1, 15),
          plannedTests: []
        },
        results: [],
        automation: {
          enabled: true,
          tools: ['Lansweeper API', 'Custom scripts'],
          scripts: ['discovery_validation.py'],
          schedule: 'weekly',
          alerting: {
            onFailure: true,
            recipients: ['it-team@company.com'],
            escalation: ['ciso@company.com']
          }
        }
      },
      monitoring: {
        metrics: [
          {
            id: 'metric-001',
            name: 'Asset Discovery Accuracy',
            description: 'Percentage of assets accurately discovered and classified',
            type: 'operational',
            dataSource: 'Asset Management System',
            collectionMethod: 'Automated',
            frequency: 'daily',
            thresholds: {
              normal: { min: 95 },
              warning: { min: 90, max: 94 },
              critical: { max: 89 }
            },
            currentValue: 97,
            trend: 'stable',
            lastUpdated: new Date()
          }
        ],
        alerting: {
          enabled: true,
          channels: ['email', 'slack'],
          thresholds: { accuracy: 90 },
          escalation: [],
          suppression: []
        },
        reporting: {
          dashboards: ['Asset Management Dashboard'],
          reports: ['Monthly Asset Report'],
          schedule: { monthly: 'monthly' },
          recipients: { monthly: ['it-manager@company.com'] },
          formats: ['PDF', 'Excel']
        },
        automation: {
          dataCollection: {
            automated: true,
            sources: ['Lansweeper', 'Network Scanners'],
            frequency: 'daily'
          },
          analysis: {
            automated: true,
            algorithms: ['Asset Classification', 'Anomaly Detection'],
            ml_enabled: false
          },
          response: {
            automated: false,
            actions: []
          }
        }
      },
      evidence: ['ev-001', 'ev-002'],
      policies: ['pol-002'],
      assets: ['asset-001', 'asset-002'],
      dependencies: [],
      effectiveness: {
        implementationScore: 95,
        operationalScore: 92,
        complianceScore: 98,
        costEffectiveness: 85,
        riskReduction: 75,
        maturityLevel: 4,
        lastMeasured: new Date(2024, 1, 15),
        trend: 'improving'
      },
      costs: {
        implementation: {
          capital: 50000,
          operational: 15000,
          timeline: '3 months'
        },
        maintenance: {
          annual: 25000,
          resources: ['IT Staff', 'Security Analyst']
        },
        testing: {
          frequency: 'quarterly',
          cost: 5000,
          resources: ['Security Team']
        },
        training: {
          initial: 10000,
          ongoing: 5000,
          frequency: 'annually'
        }
      },
      risks: [],
      exceptions: []
    },
    {
      id: 'ctrl-002',
      name: 'Multi-Factor Authentication',
      description: 'Implement multi-factor authentication for all user accounts accessing organizational systems',
      framework: 'nist-csf-v2',
      nistFunction: 'Protect',
      nistCategory: 'Identity Management',
      nistSubcategory: 'PR.AA-01',
      controlFamily: 'Access Control',
      controlType: 'technical',
      implementationApproach: 'automated',
      status: 'in-progress',
      priority: 'critical',
      owner: 'Security Manager',
      implementers: ['Security Team', 'IT Team'],
      validators: ['CISO'],
      lastAssessed: new Date(2024, 1, 1),
      nextAssessment: new Date(2024, 3, 1),
      assessmentFrequency: 'monthly',
      implementation: {
        plannedDate: new Date(2024, 2, 31),
        method: 'Phased rollout starting with privileged accounts',
        tools: ['Microsoft Azure MFA', 'RSA SecurID'],
        procedures: ['MFA Enrollment Process', 'Exception Handling'],
        configuration: { enforced_groups: ['Admins', 'Privileged Users'] },
        deployment: {
          scope: ['All Systems', 'All Users'],
          phases: [],
          rollbackPlan: 'Disable MFA enforcement, maintain single-factor'
        },
        validation: {
          criteria: ['100% privileged account coverage', 'User acceptance >90%'],
          methods: ['Automated reporting', 'User surveys'],
          results: []
        }
      },
      testing: {
        testPlan: {
          id: 'tp-002',
          objectives: ['Verify MFA functionality', 'Test bypass prevention'],
          scope: ['All MFA methods', 'All user types'],
          methods: ['Penetration testing', 'User acceptance testing'],
          criteria: ['No bypass vulnerabilities', 'Login time <30 seconds'],
          responsibilities: { tester: 'Security Team', reviewer: 'CISO' },
          timeline: 'Monthly'
        },
        schedule: {
          frequency: 'monthly',
          nextTest: new Date(2024, 3, 1),
          lastTest: new Date(2024, 1, 1),
          plannedTests: []
        },
        results: [],
        automation: {
          enabled: false,
          tools: [],
          scripts: [],
          schedule: 'manual',
          alerting: {
            onFailure: true,
            recipients: ['security-team@company.com'],
            escalation: []
          }
        }
      },
      monitoring: {
        metrics: [
          {
            id: 'metric-002',
            name: 'MFA Adoption Rate',
            description: 'Percentage of users with MFA enabled',
            type: 'security',
            dataSource: 'Identity Provider',
            collectionMethod: 'Automated',
            frequency: 'daily',
            thresholds: {
              normal: { min: 95 },
              warning: { min: 90, max: 94 },
              critical: { max: 89 }
            },
            currentValue: 78,
            trend: 'improving',
            lastUpdated: new Date()
          }
        ],
        alerting: {
          enabled: true,
          channels: ['email'],
          thresholds: { adoption: 90 },
          escalation: [],
          suppression: []
        },
        reporting: {
          dashboards: ['Identity Management Dashboard'],
          reports: ['MFA Status Report'],
          schedule: { weekly: 'weekly' },
          recipients: { weekly: ['security-manager@company.com'] },
          formats: ['PDF']
        },
        automation: {
          dataCollection: {
            automated: true,
            sources: ['Azure AD', 'Identity Provider APIs'],
            frequency: 'daily'
          },
          analysis: {
            automated: true,
            algorithms: ['Trend Analysis'],
            ml_enabled: false
          },
          response: {
            automated: false,
            actions: []
          }
        }
      },
      evidence: ['ev-003'],
      policies: ['pol-003'],
      assets: ['asset-003'],
      dependencies: [],
      effectiveness: {
        implementationScore: 65,
        operationalScore: 70,
        complianceScore: 60,
        costEffectiveness: 80,
        riskReduction: 85,
        maturityLevel: 2,
        lastMeasured: new Date(2024, 1, 1),
        trend: 'improving'
      },
      costs: {
        implementation: {
          capital: 75000,
          operational: 20000,
          timeline: '4 months'
        },
        maintenance: {
          annual: 30000,
          resources: ['Security Team', 'Help Desk']
        },
        testing: {
          frequency: 'monthly',
          cost: 8000,
          resources: ['Security Team', 'External Auditor']
        },
        training: {
          initial: 15000,
          ongoing: 8000,
          frequency: 'annually'
        }
      },
      risks: [],
      exceptions: []
    }
  ];

  const getStatusColor = (status: ControlStatus) => {
    switch (status) {
      case 'operational': return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300';
      case 'implemented': return 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300';
      case 'in-progress': return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300';
      case 'planned': return 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300';
      case 'not-implemented': return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300';
      default: return 'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-600 dark:text-red-400';
      case 'high': return 'text-orange-600 dark:text-orange-400';
      case 'medium': return 'text-yellow-600 dark:text-yellow-400';
      case 'low': return 'text-green-600 dark:text-green-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  const filteredControls = controls.filter(control => {
    const matchesSearch = control.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         control.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || control.status === filterStatus;
    const matchesFunction = filterFunction === 'all' || control.nistFunction === filterFunction;
    const matchesPriority = filterPriority === 'all' || control.priority === filterPriority;
    
    return matchesSearch && matchesStatus && matchesFunction && matchesPriority;
  });

  const stats = {
    total: controls.length,
    operational: controls.filter(c => c.status === 'operational').length,
    implemented: controls.filter(c => c.status === 'implemented').length,
    inProgress: controls.filter(c => c.status === 'in-progress').length,
    avgEffectiveness: Math.round(controls.reduce((sum, c) => sum + c.effectiveness.implementationScore, 0) / controls.length)
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 mb-8">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-xl">
                <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Controls Management
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                  Track and manage NIST CSF v2.0 security controls implementation
                </p>
              </div>
            </div>
            
            <button
              onClick={() => addNotification('info', 'Control creation feature coming soon')}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Control</span>
            </button>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Controls</p>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stats.total}</p>
            </div>
            <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Operational</p>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">{stats.operational}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Implemented</p>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stats.implemented}</p>
            </div>
            <Target className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">In Progress</p>
              <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">{stats.inProgress}</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Effectiveness</p>
              <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{stats.avgEffectiveness}%</p>
            </div>
            <Award className="w-8 h-8 text-purple-600 dark:text-purple-400" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 mb-8 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex-1 max-w-lg">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search controls..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <select
              value={filterFunction}
              onChange={(e) => setFilterFunction(e.target.value)}
              className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Functions</option>
              <option value="Govern">Govern</option>
              <option value="Identify">Identify</option>
              <option value="Protect">Protect</option>
              <option value="Detect">Detect</option>
              <option value="Respond">Respond</option>
              <option value="Recover">Recover</option>
            </select>
            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="not-implemented">Not Implemented</option>
              <option value="planned">Planned</option>
              <option value="in-progress">In Progress</option>
              <option value="implemented">Implemented</option>
              <option value="operational">Operational</option>
            </select>
            
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Priorities</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Controls List */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            NIST CSF v2.0 Controls ({filteredControls.length})
          </h2>
        </div>
        
        <div className="p-6">
          <div className="space-y-6">
            {filteredControls.map((control) => (
              <div key={control.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {control.name}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(control.status)}`}>
                        {control.status.replace('-', ' ')}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(control.priority)}`}>
                        {control.priority.toUpperCase()}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {control.description}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">NIST Function:</span>
                        <div className="font-medium text-gray-900 dark:text-white">{control.nistFunction}</div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">Subcategory:</span>
                        <div className="font-medium text-gray-900 dark:text-white">{control.nistSubcategory}</div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">Owner:</span>
                        <div className="font-medium text-gray-900 dark:text-white">{control.owner}</div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">Next Assessment:</span>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {control.nextAssessment.toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    
                    {/* Effectiveness Metrics */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                          {control.effectiveness.implementationScore}%
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-300">Implementation</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <div className="text-lg font-bold text-green-600 dark:text-green-400">
                          {control.effectiveness.operationalScore}%
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-300">Operational</div>
                      </div>
                      <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                        <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
                          {control.effectiveness.complianceScore}%
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-300">Compliance</div>
                      </div>
                      <div className="text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                        <div className="text-lg font-bold text-orange-600 dark:text-orange-400">
                          {control.effectiveness.riskReduction}%
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-300">Risk Reduction</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                      Level {control.effectiveness.maturityLevel}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Maturity</div>
                    <div className="flex items-center justify-end mt-2">
                      <TrendingUp className={`w-4 h-4 ${
                        control.effectiveness.trend === 'improving' ? 'text-green-500' :
                        control.effectiveness.trend === 'declining' ? 'text-red-500' :
                        'text-gray-500'
                      }`} />
                    </div>
                  </div>
                </div>
                
                {/* Actions */}
                <div className="flex space-x-3">
                  <button
                    onClick={() => addNotification('info', `Viewing control: ${control.name}`)}
                    className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View Details</span>
                  </button>
                  
                  <button
                    onClick={() => addNotification('info', 'Control testing feature coming soon')}
                    className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Test Control</span>
                  </button>
                  
                  <button
                    onClick={() => addNotification('info', 'Control monitoring feature coming soon')}
                    className="flex items-center space-x-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <BarChart3 className="w-4 h-4" />
                    <span>Monitor</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {filteredControls.length === 0 && (
            <div className="text-center py-12">
              <Shield className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No Controls Found
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                No controls match your current search and filter criteria
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};