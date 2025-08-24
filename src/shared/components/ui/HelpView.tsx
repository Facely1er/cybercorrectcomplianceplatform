import React, { useState, useEffect } from 'react';
import {
  ArrowLeft, Shield, Plus, Search, Filter, Download, Upload, Edit3, Trash2, Eye, AlertCircle, CheckCircle, Clock, XCircle, Target, Settings, BarChart3, Award, TrendingUp, Calendar, FileText, Users, ScrollText, DollarSign
} from 'lucide-react';
import { Breadcrumbs } from '../../../shared/components/layout/Breadcrumbs';
import { useInternalLinking } from '../../../shared/hooks/useInternalLinking';

interface ControlsManagementViewProps {
  onBack: () => void;
  addNotification: (type: 'success' | 'error' | 'info' | 'warning', message: string) => void;
}

type ControlStatus = 'not-implemented' | 'planned' | 'in-progress' | 'implemented' | 'operational';
type ControlType = 'preventive' | 'detective' | 'corrective' | 'deterrent' | 'compensating' | 'administrative' | 'technical' | 'physical';
type AssessmentFrequency = 'monthly' | 'quarterly' | 'semi-annually' | 'annually';

export const ControlsManagementView: React.FC<ControlsManagementViewProps> = ({
  onBack, addNotification
}) => {
  const [controls, setControls] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterFunction, setFilterFunction] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showControlForm, setShowControlForm] = useState(false);
  const [editingControl, setEditingControl] = useState<any | null>(null);
  const [viewingControl, setViewingControl] = useState<any | null>(null);
  const [formData, setFormData] = useState({
    controlId: '',
    name: '',
    description: '',
    nistFunction: 'Identify',
    nistCategory: '',
    nistSubcategory: '',
    status: 'not-implemented' as ControlStatus,
    priority: 'medium' as 'low' | 'medium' | 'high' | 'critical',
    owner: '',
    controlType: 'administrative' as ControlType,
    implementationApproach: 'manual' as 'manual' | 'automated' | 'hybrid' | 'outsourced' | 'cloud-native'
  });

  // Mock data for demonstration
  useEffect(() => {
    const mockControls: any[] = [
      {
        id: 'ctrl-001',
        controlId: 'ID.AM-1',
        name: 'Asset Management',
        description: 'Physical devices and systems within the organization are inventoried',
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
        assessmentFrequency: 'quarterly' as AssessmentFrequency,
        category: 'Asset Management',
        subcategory: 'Physical devices and systems',
        implementation: {
          actualDate: new Date(2024, 0, 15),
          method: 'Automated discovery tools with manual validation',
          tools: ['Lansweeper', 'ManageEngine AssetExplorer'],
          procedures: ['Asset Discovery SOP', 'Inventory Validation Process'],
          configuration: {
            discovery_frequency: 'daily',
            validation_frequency: 'weekly'
          },
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
            frequency: 'quarterly' as AssessmentFrequency,
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
          metrics: [],
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
        evidence: ['Asset inventory database', 'Asset discovery scan reports'],
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
      }
    ];

    setControls(mockControls);
  }, []);

  useEffect(() => {
    if (editingControl) {
      setFormData({
        controlId: editingControl.controlId || editingControl.nistSubcategory,
        name: editingControl.name,
        description: editingControl.description,
        nistFunction: editingControl.nistFunction,
        nistCategory: editingControl.nistCategory,
        nistSubcategory: editingControl.nistSubcategory,
        status: editingControl.status,
        priority: editingControl.priority,
        owner: editingControl.owner,
        controlType: editingControl.controlType,
        implementationApproach: editingControl.implementationApproach
      });
    } else {
      setFormData({
        controlId: '',
        name: '',
        description: '',
        nistFunction: 'Identify',
        nistCategory: '',
        nistSubcategory: '',
        status: 'not-implemented',
        priority: 'medium',
        owner: '',
        controlType: 'administrative',
        implementationApproach: 'manual'
      });
    }
  }, [editingControl]);

  const filteredControls = controls.filter(control => {
    const matchesSearch = control.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         control.controlId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         control.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFunction = filterFunction === 'all' || control.nistFunction === filterFunction;
    const matchesStatus = filterStatus === 'all' || control.status === filterStatus;
    
    return matchesSearch && matchesFunction && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'implemented': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'in-progress': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'not-implemented':
        return <XCircle className="w-4 h-4 text-red-500" />;
      case 'not-applicable':
        return <AlertCircle className="w-4 h-4 text-gray-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'implemented': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'not-implemented':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'not-applicable':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getFunctionColor = (func: string) => {
    switch (func) {
      case 'Identify': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'Protect':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Detect':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'Respond':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      case 'Recover':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'high':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      case 'critical':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const handleCreateControl = () => {
    setEditingControl(null);
    setShowControlForm(true);
  };

  const handleEditControl = (control: any) => {
    setEditingControl(control);
    setShowControlForm(true);
  };

  const handleSaveControl = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.description.trim() || !formData.controlId.trim()) {
      addNotification('error', 'Control ID, name, and description are required');
      return;
    }

    const controlData: any = {
      id: editingControl?.id || `ctrl-${Date.now()}`,
      controlId: formData.controlId,
      name: formData.name,
      description: formData.description,
      framework: 'nist-csf-v2',
      nistFunction: formData.nistFunction,
      nistCategory: formData.nistCategory,
      nistSubcategory: formData.nistSubcategory,
      controlFamily: formData.nistCategory,
      controlType: formData.controlType,
      implementationApproach: formData.implementationApproach,
      status: formData.status,
      priority: formData.priority,
      owner: formData.owner,
      implementers: [],
      validators: [],
      lastAssessed: new Date(),
      nextAssessment: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days from now
      assessmentFrequency: 'quarterly' as AssessmentFrequency,
      category: formData.category,
      subcategory: formData.subcategory,
      implementation: {
        actualDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
        method: 'Manual implementation',
        tools: [],
        procedures: [],
        configuration: {
          discovery_frequency: 'manual',
          validation_frequency: 'manual'
        },
        deployment: {
          scope: [],
          phases: [],
          rollbackPlan: ''
        },
        validation: {
          criteria: [],
          methods: [],
          results: []
        }
      },
      testing: {
        testPlan: {
          id: `tp-${Date.now()}`,
          objectives: [],
          scope: [],
          methods: [],
          criteria: [],
          responsibilities: {},
          timeline: ''
        },
        schedule: {
          frequency: 'quarterly' as AssessmentFrequency,
          nextTest: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
          lastTest: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
          plannedTests: []
        },
        results: [],
        automation: {
          enabled: false,
          tools: [],
          scripts: [],
          schedule: 'manual',
          alerting: {
            onFailure: false,
            recipients: [],
            escalation: []
          }
        }
      },
      monitoring: {
        metrics: [],
        alerting: {
          enabled: false,
          channels: [],
          thresholds: {},
          escalation: [],
          suppression: []
        },
        reporting: {
          dashboards: [],
          reports: [],
          schedule: {},
          recipients: {},
          formats: []
        },
        automation: {
          dataCollection: {
            automated: false,
            sources: [],
            frequency: 'manual'
          },
          analysis: {
            automated: false,
            algorithms: [],
            ml_enabled: false
          },
          response: {
            automated: false,
            actions: []
          }
        }
      },
      evidence: [],
      policies: [],
      assets: [],
      dependencies: [],
      effectiveness: {
        implementationScore: 0,
        operationalScore: 0,
        complianceScore: 0,
        costEffectiveness: 0,
        riskReduction: 0,
        maturityLevel: 1,
        lastMeasured: new Date(),
        trend: 'stable' as 'improving' | 'stable' | 'declining'
      },
      costs: {
        implementation: {
          capital: 0,
          operational: 0,
          timeline: 'TBD'
        },
        maintenance: {
          annual: 0,
          resources: []
        },
        testing: {
          frequency: 'quarterly',
          cost: 0,
          resources: []
        },
        training: {
          initial: 0,
          ongoing: 0,
          frequency: 'annually'
        }
      },
      risks: [],
      exceptions: []
    };

    if (editingControl) {
      setControls(prev => prev.map(c => c.id === editingControl.id ? controlData  : c));
      addNotification('success', 'Control updated successfully');
    } else {
      setControls(prev => [...prev, controlData]);
      addNotification('success', 'Control created successfully');
    }

    setShowControlForm(false);
    setEditingControl(null);
  };

  const handleDeleteControl = (controlId: string) => {
    if (window.confirm('Are you sure you want to delete this control?')) {
      setControls(prev => prev.filter(c => c.id !== controlId));
      addNotification('success', 'Control deleted successfully');
    }
  };

  const handleViewControl = (control: any) => {
    setViewingControl(control);
  };

  const handleExportControls = () => {
    const dataStr = JSON.stringify(controls, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `controls-export-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    addNotification('success', 'Controls exported successfully');
  };

  const handleImportControls = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const importedControls = JSON.parse(event.target?.result as string);
            if (Array.isArray(importedControls)) {
              setControls(prev => [...prev, ...importedControls]);
              addNotification('success', `Imported ${importedControls.length} controls`);
            } else {
              addNotification('error', 'Invalid file format');
            }
          } catch (error) {
            addNotification('error', 'Failed to parse file');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const functions = ['all', 'Identify', 'Protect', 'Detect', 'Respond', 'Recover'];
  const statuses = ['all', 'not-implemented', 'planned', 'in-progress', 'implemented', 'operational'];

  // Summary statistics
  const totalControls = controls.length;
  const implementedControls = controls.filter(c => c.status === 'implemented').length;
  const partiallyImplementedControls = controls.filter(c => c.status === 'in-progress').length;
  const notImplementedControls = controls.filter(c => c.status === 'not-implemented').length;
  const implementationPercentage = Math.round((implementedControls / totalControls) * 100);

  const breadcrumbs = [
    { label: 'Dashboard', href: '#' },
    { label: 'Controls Management', href: '#' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-2">
        <Breadcrumbs items={breadcrumbs} />
      </div>

      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover: bg-gray-200 dark: hover: bg-gray-600 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Controls Management
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Monitor and manage NIST CSF v2.0 security controls implementation
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={handleImportControls}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover: bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <Upload className="w-4 h-4" />
                <span>Import</span>
              </button>
              <button
                onClick={handleExportControls}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover: bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
              <button
                onClick={handleCreateControl}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Control</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Controls</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalControls}</p>
              </div>
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Implemented</p>
                <p className="text-2xl font-bold text-green-600">{implementedControls}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Partial</p>
                <p className="text-2xl font-bold text-yellow-600">{partiallyImplementedControls}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Not Implemented</p>
                <p className="text-2xl font-bold text-red-600">{notImplementedControls}</p>
              </div>
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
          </div>
        </div>

        {/* Implementation Progress */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Implementation Progress
            </h3>
            <span className="text-2xl font-bold text-blue-600">{implementationPercentage}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
            <div
              className="bg-blue-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${implementationPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search controls..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex gap-4">
              <select
                value={filterFunction}
                onChange={(e) => setFilterFunction(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {functions.map(func => (
                  <option key={func} value={func}>
                    {func === 'all' ? 'All Functions'  : func}
                  </option>
                ))}
              </select>
              
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>
                    {status === 'all' ? 'All Statuses'  : status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Controls Grid */}
        <div className="space-y-4">
          {filteredControls.map((control) => (
            <div
              key={control.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Shield className="w-6 h-6 text-blue-600" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {control.controlId || control.nistSubcategory}, {control.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {control.nistCategory} • {control.nistSubcategory}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {getStatusIcon(control.status)}
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(control.status)}`}>
                    {control.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </span>
                </div>
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {control.description}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">Function</span>
                  <div className="mt-1">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getFunctionColor(control.nistFunction)}`}>
                      {control.nistFunction}
                    </span>
                  </div>
                </div>
                
                <div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">Priority</span>
                  <div className="mt-1">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(control.priority)}`}>
                      {control.priority.toUpperCase()}
                    </span>
                  </div>
                </div>
                
                <div>
                  <span className="text-xs text-gray-500 dark: text-gray-400">Maturity Level</span>
                  <div className="mt-1 flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <div
                        key={level}
                        className={`w-3 h-3 rounded-full ${
                          level <= (control.effectiveness?.maturityLevel || 1)
                            ? 'bg-blue-600'
                            : 'bg-gray-300 dark:bg-gray-600'}`}
                      />
                    ))}
                    <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
                      Level {control.effectiveness?.maturityLevel || 1}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-sm">
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Owner:</span>
                  <span className="ml-2 font-medium text-gray-900 dark:text-white">{control.owner}</span>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Next Assessment:</span>
                  <span className="ml-2 font-medium text-gray-900 dark:text-white">
                    {control.nextAssessment.toLocaleDateString()}
                  </span>
                </div>
              </div>
              
              { control.evidence && control.evidence.length > 0 && (
                <div className="mb-4">
                  <span className="text-xs text-gray-500 dark: text-gray-400">Evidence, </span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {control.evidence.map((evidence: string, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 rounded text-xs"
                      >
                        {evidence}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleViewControl(control)}
                    className="p-2 text-gray-500 dark:text-gray-400 hover: text-blue-600 dark: hover: text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                    title="View Control Details"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleEditControl(control)}
                    className="p-2 text-gray-500 dark:text-gray-400 hover: text-green-600 dark: hover: text-green-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                    title="Edit Control"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteControl(control.id)}
                    className="p-2 text-gray-500 dark:text-gray-400 hover: text-red-600 dark: hover: text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                    title="Delete Control"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Last assessed {control.lastAssessed.toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>

        { filteredControls.length === 0 && (
          <div className="text-center py-12">
            <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark: text-white mb-2">
              No controls found
            </h3>
            <p className="text-gray-600 dark: text-gray-400">
              {searchTerm || filterFunction !== 'all' || filterStatus !== 'all'
                ? 'Try adjusting your search criteria'
                 : 'Get started by adding your first control'
              }
            </p>
          </div>
        )}
      </div>

      {/* Control Form Modal */}
      { showControlForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 dark: text-white mb-4">
              {editingControl ? 'Edit Control'  : 'Add New Control'}
            </h3>
            
            <form onSubmit={handleSaveControl} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Control ID *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.controlId}
                    onChange={(e) => setFormData(prev => ({ ...prev, controlId: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus: border-transparent"
                    placeholder="e.g.: ID.AM-01"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    NIST Function *
                  </label>
                  <select
                    required
                    value={formData.nistFunction}
                    onChange={(e) => setFormData(prev => ({ ...prev, nistFunction: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Identify">Identify</option>
                    <option value="Protect">Protect</option>
                    <option value="Detect">Detect</option>
                    <option value="Respond">Respond</option>
                    <option value="Recover">Recover</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Control Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter control name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description *
                </label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Describe the control objective and implementation"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    NIST Category
                  </label>
                  <input
                    type="text"
                    value={formData.nistCategory}
                    onChange={(e) => setFormData(prev => ({ ...prev, nistCategory: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus: border-transparent"
                    placeholder="e.g.: Asset Management"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    NIST Subcategory
                  </label>
                  <input
                    type="text"
                    value={formData.nistSubcategory}
                    onChange={(e) => setFormData(prev => ({ ...prev, nistSubcategory: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus: border-transparent"
                    placeholder="e.g.: ID.AM-01"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Implementation Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as ControlStatus }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="not-implemented">Not Implemented</option>
                    <option value="planned">Planned</option>
                    <option value="in-progress">In Progress</option>
                    <option value="implemented">Implemented</option>
                    <option value="operational">Operational</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Priority
                  </label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value as any }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Control Type
                  </label>
                  <select
                    value={formData.controlType}
                    onChange={(e) => setFormData(prev => ({ ...prev, controlType: e.target.value as ControlType }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="preventive">Preventive</option>
                    <option value="detective">Detective</option>
                    <option value="corrective">Corrective</option>
                    <option value="deterrent">Deterrent</option>
                    <option value="compensating">Compensating</option>
                    <option value="administrative">Administrative</option>
                    <option value="technical">Technical</option>
                    <option value="physical">Physical</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Owner *
                </label>
                <input
                  type="text"
                  required
                  value={formData.owner}
                  onChange={(e) => setFormData(prev => ({ ...prev, owner: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Control owner"
                />
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowControlForm(false);
                    setEditingControl(null);
                  }}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-gray-600 rounded-lg hover: bg-gray-50 dark: hover: bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingControl ? 'Update Control' : 'Add Control'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Control Details Modal */}
      { viewingControl && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark: bg-gray-800 rounded-2xl p-8 max-w-4xl w-full mx-4 shadow-2xl border border-gray-200 dark: border-gray-700 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Control Details
              </h3>
              <button
                onClick={() => setViewingControl(null)}
                className="text-gray-400 hover:text-gray-600 dark: hover: text-gray-300 text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {viewingControl.controlId || viewingControl.nistSubcategory}: {viewingControl.name}
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  {viewingControl.description}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-3">Control Information</h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">NIST Function:</span>
                      <span className="font-medium text-gray-900 dark:text-white">{viewingControl.nistFunction}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Category:</span>
                      <span className="font-medium text-gray-900 dark:text-white">{viewingControl.nistCategory}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Subcategory:</span>
                      <span className="font-medium text-gray-900 dark:text-white">{viewingControl.nistSubcategory}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Type:</span>
                      <span className="font-medium text-gray-900 dark:text-white capitalize">
                        {viewingControl.controlType}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Status:</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(viewingControl.status)}`}>
                        {viewingControl.status.replace('-', ' ')}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-3">Implementation</h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Owner:</span>
                      <span className="font-medium text-gray-900 dark:text-white">{viewingControl.owner}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Priority:</span>
                      <span className={`font-medium ${getRiskColor(viewingControl.priority)}`}>
                        {viewingControl.priority.charAt(0).toUpperCase() + viewingControl.priority.slice(1)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Last Assessed:</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {viewingControl.lastAssessed?.toLocaleDateString() || 'Never'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Next Assessment:</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {viewingControl.nextAssessment?.toLocaleDateString() || 'Not scheduled'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              {viewingControl.effectiveness && (
                <div>
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-3">Effectiveness Metrics</h5>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {viewingControl.effectiveness.implementationScore}%
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Implementation</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {viewingControl.effectiveness.operationalScore}%
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Operational</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">
                        {viewingControl.effectiveness.complianceScore}%
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Compliance</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">
                        Level {viewingControl.effectiveness.maturityLevel}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Maturity</div>
                    </div>
                  </div>
                </div>
              )}
              
              {viewingControl.evidence && viewingControl.evidence.length > 0 && (
                <div>
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-3">Evidence</h5>
                  <div className="flex flex-wrap gap-2">
                    {viewingControl.evidence.map((evidence: string, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 rounded-full text-sm"
                      >
                        {evidence}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200 dark: border-gray-700">
                <button
                  onClick={ () => {
                    const dataStr = JSON.stringify(viewingControl, null, 2);
                    const dataBlob = new Blob([dataStr], { type: 'application/json' });
                    const url = URL.createObjectURL(dataBlob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = `control-${viewingControl.controlId}-${new Date().toISOString().split('T')[0]}.json`;
                    link.click();
                    URL.revokeObjectURL(url);
                    addNotification('success', 'Control details exported successfully');
                  }}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Export Details
                </button>
                <button
                  onClick={() => setViewingControl(null)}
                  className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg hover: bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};