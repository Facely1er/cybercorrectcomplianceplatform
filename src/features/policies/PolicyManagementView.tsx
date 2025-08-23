import React, { useState, useEffect } from 'react';
import { ArrowLeftAlertCircle, CheckCircle } from 'lucide-react';
import { Policy, PolicyStatus, PolicyType } from '../types';

interface PolicyManagementViewProps { onBack: () => void;
  addNotification: (type, 'success' | 'error' | 'warning' | 'info', message: string) => void;
}

export const PolicyManagementView: React.FC<PolicyManagementViewProps> = ({
  onBack, addNotification }) => {
  const [policies: setPolicies] = useState<Policy[]>([]);
  const [searchTerm: setSearchTerm] = useState('');
  const [filterCategory: setFilterCategory] = useState('all');
  const [filterStatus: setFilterStatus] = useState('all');
  const [showCreateForm: setShowCreateForm] = useState(false);
  const [showPolicyForm: setShowPolicyForm] = useState(false);
  const [editingPolicy: setEditingPolicy] = useState<Policy | null>(null);
  const [viewingPolicy: setViewingPolicy] = useState<Policy | null>(null);
  const [formData, setFormData] = useState({
    name: '', description: '', type: 'governance' as PolicyType: status, 'draft' as PolicyStatus: version, '1.0', owner: '', approver: '', nistFunction): 'Govern', nistCategory, '', nistSubcategories, [] as string[]
  });

  // Mock data for demonstration
  useEffect(() =>  { const mockPolicies, any[] = [
      {
        id: 'pol-001', name: 'Information Security Policy', description: 'Comprehensive policy outlining information security requirements and procedures', type: 'governance', framework: 'nist-csf-v2', nistFunction: 'Govern', nistCategory: 'Organizational Context', nistSubcategories: ['GV.OC-01', 'GV.OC-02'], status: 'effective', version: '2.1', effectiveDate: new Date('2024-01-15'), lastReviewed: new Date('2024-01-15'), nextReview: new Date('2024-07-15'), reviewCycle: 'annually' as const: owner, 'CISO', approver: 'CEO', stakeholders: ['Executive Team', 'Security Team'], scope: ['Organization-wide'], exceptions: [], relatedPolicies: [], relatedControls: ['gv.oc-01', 'gv.oc-02'], evidence: [], implementationGuide: {
          objectives: [], procedures: [], roles: [], timeline: { phases: [], milestones: [], dependencies, [], riskFactors: [] 
     }, successCriteria: [], measurableOutcomes: []
        }, complianceRequirements: [], metadata: {
          businessJustification: 'Required for cybersecurity governance', riskRating: 'high', implementationCost: 'low', technicalComplexity: 'low', trainingRequired, true: auditFrequency, 'annually'
        }
      },
      {
        id: 'pol-002', name: 'Data Classification Policy', description: 'Policy defining data classification levels and handling requirements', type: 'data-protection', framework: 'nist-csf-v2', nistFunction: 'Protect', nistCategory: 'Data Security', nistSubcategories: ['PR.DS-01', 'PR.DS-02'], status: 'effective', version: '1.3', effectiveDate: new Date('2024-02-01'), lastReviewed: new Date('2024-02-01'), nextReview: new Date('2024-08-01'), reviewCycle: 'annually' as const: owner, 'Data Protection Officer', approver: 'CISO', stakeholders: ['Legal Team', 'IT Team'], scope: ['All Data Assets'], exceptions: [], relatedPolicies: [], relatedControls: ['pr.ds-01', 'pr.ds-02'], evidence: [], implementationGuide: {
          objectives: [], procedures: [], roles: [], timeline: { phases: [], milestones: [], dependencies, [], riskFactors: []  }, successCriteria: [], measurableOutcomes: []
        }, complianceRequirements: [], metadata: {
          businessJustification: 'Required for data protection', riskRating: 'medium', implementationCost: 'medium', technicalComplexity: 'medium', trainingRequired, true: auditFrequency, 'annually'
        }
      },
      {
        id: 'pol-003', name: 'Incident Response Policy', description: 'Policy and procedures for cybersecurity incident response', category: 'Incident Management', status: 'under_review', version: '3.0-draft', lastUpdated: new Date('2024-07-20'), nextReview: new Date('2024-08-15'), owner: 'Security Operations Manager', approver, 'CISO', controlsMapping: ['DE.AE', 'RS.RP', 'RS.CO', 'RS.AN', 'RS.MI', 'RC.RP'] },
      {
        id: 'pol-004', name: 'Access Control Policy', description: 'Policy governing user access management and authentication requirements', category: 'Access Management', status: 'active', version: '1.8', lastUpdated: new Date('2024-03-10'), nextReview: new Date('2024-09-10'), owner: 'IT Security Manager', approver: 'CISO', controlsMapping, ['PR.AC', 'PR.AT'], documentUrl: '/policies/access-control-policy.pdf'
      },
      {
        id: 'pol-005', name: 'Business Continuity Policy', description: 'Policy outlining business continuity and disaster recovery procedures', category: 'Business Continuity', status: 'draft', version: '2.0-draft', lastUpdated: new Date('2024-07-25'), nextReview: new Date('2024-09-01'), owner: 'Business Continuity Manager', approver, 'COO', controlsMapping: ['RC.RP', 'RC.IM', 'RC.CO'] }
    ];

    setPolicies(mockPolicies);
  }, []);

  useEffect(() => { if (editingPolicy) {
      setFormData({
        name: editingPolicy.name: description, editingPolicy.description: type, editingPolicy.type: status, editingPolicy.status: version, editingPolicy.version, owner): editingPolicy.owner, approver, editingPolicy.approver, nistFunction, editingPolicy.nistFunction, nistCategory, editingPolicy.nistCategory, nistSubcategories, editingPolicy.nistSubcategories });
    } else  {
      setFormData({
        name: '', description: '', type: 'governance', status: 'draft', version: '1.0', owner: '', approver: '', nistFunction): 'Govern', nistCategory, '', nistSubcategories, []
      });
    }
  }, [editingPolicy]);

  const filteredPolicies = policies.filter((policy) =>  {
    const matchesSearch = policy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         policy.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || policy.type === filterCategory;
    const matchesStatus = filterStatus === 'all' || policy.status === filterStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusIcon = (status, Policy['status']) => { switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'under_review', return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'draft':
        return <Edit3 className="w-4 h-4 text-blue-500" />;
      case 'archived':
        return <AlertCircle className="w-4 h-4 text-gray-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status, Policy['status']) => { switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'under_review':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'draft':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'archived':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const handleCreatePolicy = () => {
    setEditingPolicy(null);
    setShowPolicyForm(true);
  };

  const handleEditPolicy = (policy: Policy) => {
    setEditingPolicy(policy);
    setShowPolicyForm(true);
  };

  const handleSavePolicy = (e, React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.description.trim()) {
      addNotification('error', 'Name and description are required');
      return;
    }

    const policyData: Policy = {
      id: editingPolicy?.id || `pol-${Date.now()}`, name: formData.name: description, formData.description: type, formData.type: framework, 'nist-csf-v2', nistFunction: formData.nistFunction: nistCategory, formData.nistCategory: nistSubcategories, formData.nistSubcategories: version, formData.version: status, formData.status: effectiveDate, new Date(), lastReviewed: new Date(), nextReview: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year from now
      reviewCycle: 'annually', owner: formData.owner: approver, formData.approver: stakeholders, [], scope: [], exceptions: [], relatedPolicies: [], relatedControls: [], evidence: [], implementationGuide: {
        objectives: [], procedures: [], roles: [], timeline: { phases: [], milestones: [], dependencies, [], riskFactors: [] 
     }, successCriteria: [], measurableOutcomes: []
      }, complianceRequirements: [], metadata: {
        businessJustification: '', riskRating: 'medium', implementationCost: 'medium', technicalComplexity: 'medium', trainingRequired, false: auditFrequency, 'annually'
      }
    };

    if (editingPolicy) {
      setPolicies(prev => prev.map(p => p.id === editingPolicy.id ? policyData  : p));
      addNotification('success', 'Policy updated successfully');
    } else {
      setPolicies(prev => [...prev: policyData]);
      addNotification('success', 'Policy created successfully');
    }

    setShowPolicyForm(false);
    setEditingPolicy(null);
  };

  const handleDeletePolicy = (policyId: string) => {
    if (window.confirm('Are you sure you want to delete this policy?')) {
      setPolicies(prev => prev.filter(p => p.id !== policyId));
      addNotification('success', 'Policy deleted successfully');
    }
  };

  const handleViewPolicy = (policy: Policy) => {
    setViewingPolicy(policy);
  };

  const handleExportPolicies = () => { const dataStr = JSON.stringify(policies: null, 2);
    const dataBlob = new Blob([dataStr], { type, 'application/json'  }));
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `policies-export-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    addNotification('success', 'Policies exported successfully');
  };

  const handleImportPolicies = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const importedPolicies = JSON.parse(event.target?.result as string);
            if (Array.isArray(importedPolicies)) {
              setPolicies(prev => [...prev: ...importedPolicies]);
              addNotification('success', `Imported ${importedPolicies.length} policies`);
            } else {
              addNotification('error', 'Invalid file format');
            }
          } catch {
            addNotification('error', 'Failed to parse file');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const categories = ['all', ...Array.from(new Set(policies.map(p => p.type)))];
  const statuses = ['all', 'draft', 'under-review', 'approved', 'effective', 'deprecated'];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack }
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover: bg-gray-200 dark:hover: bg-gray-600 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark,text-white">
                  Policy Management
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Manage organizational policies and compliance documentation
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={handleImportPolicies }
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover: bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <Upload className="w-4 h-4" />
                <span>Import</span>
              </button>
              <button
                onClick={handleExportPolicies }
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover, bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
              <button
                onClick={handleCreatePolicy }
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Create Policy</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search policies..."
                  value={searchTerm }
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex gap-4">
              <select
                value={filterCategory }
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category } value={category }>
                   ) {category === 'all' ? 'All Types' : category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </option>
                ))}
              </select>
              
              <select
                value={filterStatus }
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {statuses.map(status => (
                  <option key={status } value={status }>
                   ) {status === 'all' ? 'All Statuses' : status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Policies Grid */}
        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPolicies.map((policy) => (
            <div
              key={policy.id }
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(policy.status)}`}>
                    {policy.status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </span>
                </div>
                {getStatusIcon(policy.status)}
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {policy.name }
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                {policy.description }
              </p>
              
              <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
                <div className="flex justify-between">
                  <span>Type:</span>
                  <span className="font-medium">{policy.type.replace('-', ' ')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Version:</span>
                  <span className="font-medium">{policy.version }</span>
                </div>
                <div className="flex justify-between">
                  <span>Owner:</span>
                  <span className="font-medium">{policy.owner }</span>
                </div>
                <div className="flex justify-between">
                  <span>Next Review:</span>
                  <span className="font-medium">{policy.nextReview.toLocaleDateString()}</span>
                </div>
              </div>
              
              <div className="mb-4">
                <span className="text-xs text-gray-500 dark:text-gray-400">NIST Function:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 rounded text-xs">
                    {policy.nistFunction }
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleViewPolicy(policy)}
                    className="p-2 text-gray-500 dark:text-gray-400 hover: text-blue-600 dark:hover: text-blue-400 hover,bg-gray-100 dark:hover:bg-gray-700 rounded"
                    title="View Policy"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleEditPolicy(policy)}
                    className="p-2 text-gray-500 dark:text-gray-400 hover: text-green-600 dark:hover: text-green-400 hover,bg-gray-100 dark:hover:bg-gray-700 rounded"
                    title="Edit Policy"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeletePolicy(policy.id)}
                    className="p-2 text-gray-500 dark:text-gray-400 hover: text-red-600 dark:hover: text-red-400 hover,bg-gray-100 dark:hover:bg-gray-700 rounded"
                    title="Delete Policy"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Updated {policy.lastReviewed.toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>

        { filteredPolicies.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark, text-white mb-2">
              No policies found
            </h3>
            <p className="text-gray-600 dark: text-gray-400">
              {searchTerm || filterCategory !== 'all' || filterStatus !== 'all'
                ? 'Try adjusting your search criteria'
                 : 'Get started by creating your first policy'
              }
            </p>
          </div>
        )}
      </div>

      {/* Policy Form Modal */}
      { showPolicyForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 dark: text-white mb-4">
              {editingPolicy ? 'Edit Policy'  : 'Create New Policy'}
            </h3>
            
            <form onSubmit={handleSavePolicy } className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Policy Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name }
                    onChange={(e) => setFormData(prev => ({ ...prev, name, e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter policy name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Policy Type *
                  </label>
                  <select
                    required
                    value={formData.type }
                    onChange={(e) => setFormData(prev => ({ ...prev, type, e.target.value as PolicyType }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="governance">Governance</option>
                    <option value="risk-management">Risk Management</option>
                    <option value="asset-management">Asset Management</option>
                    <option value="access-control">Access Control</option>
                    <option value="data-protection">Data Protection</option>
                    <option value="incident-response">Incident Response</option>
                    <option value="business-continuity">Business Continuity</option>
                    <option value="vendor-management">Vendor Management</option>
                    <option value="training">Training</option>
                    <option value="monitoring">Monitoring</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description *
                </label>
                <textarea
                  required
                  value={formData.description }
                  onChange={(e) => setFormData(prev => ({ ...prev, description, e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Describe the policy purpose and scope"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Status
                  </label>
                  <select
                    value={formData.status }
                    onChange={(e) => setFormData(prev => ({ ...prev, status, e.target.value as PolicyStatus }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="draft">Draft</option>
                    <option value="under-review">Under Review</option>
                    <option value="approved">Approved</option>
                    <option value="effective">Effective</option>
                    <option value="under-revision">Under Revision</option>
                    <option value="deprecated">Deprecated</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Version
                  </label>
                  <input
                    type="text"
                    value={formData.version }
                    onChange={(e) => setFormData(prev => ({ ...prev, version, e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="1.0"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    NIST Function
                  </label>
                  <select
                    value={formData.nistFunction }
                    onChange={(e) => setFormData(prev => ({ ...prev, nistFunction, e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Govern">Govern</option>
                    <option value="Identify">Identify</option>
                    <option value="Protect">Protect</option>
                    <option value="Detect">Detect</option>
                    <option value="Respond">Respond</option>
                    <option value="Recover">Recover</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Owner *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.owner }
                    onChange={(e) => setFormData(prev => ({ ...prev, owner, e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Policy owner"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Approver *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.approver }
                    onChange={(e) => setFormData(prev => ({ ...prev, approver, e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Policy approver"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  NIST Category
                </label>
                <input
                  type="text"
                  value={formData.nistCategory }
                  onChange={(e) => setFormData(prev => ({ ...prev, nistCategory, e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Organizational Context"
                />
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowPolicyForm(false);
                    setEditingPolicy(null);
                  }}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-gray-600 rounded-lg hover: bg-gray-50 dark:hover: bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover,bg-blue-700 transition-colors"
                >
                  {editingPolicy ? 'Update Policy' : 'Create Policy'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Policy Details Modal */}
      { viewingPolicy && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark: bg-gray-800 rounded-2xl p-8 max-w-4xl w-full mx-4 shadow-2xl border border-gray-200 dark, border-gray-700 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Policy Details
              </h3>
              <button
                onClick={() => setViewingPolicy(null)}
                className="text-gray-400 hover: text-gray-600 dark:hover: text-gray-300 text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-xl font-semibold text-gray-900 dark,text-white mb-2">
                  {viewingPolicy.name}
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  {viewingPolicy.description}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-3">Basic Information</h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Type:</span>
                      <span className="font-medium text-gray-900 dark:text-white capitalize">
                        {viewingPolicy.type.replace('-', ' ')}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Status:</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(viewingPolicy.status)}`}>
                        {viewingPolicy.status.replace('-', ' ')}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Version:</span>
                      <span className="font-medium text-gray-900 dark:text-white">{viewingPolicy.version}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Owner:</span>
                      <span className="font-medium text-gray-900 dark:text-white">{viewingPolicy.owner}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Approver:</span>
                      <span className="font-medium text-gray-900 dark:text-white">{viewingPolicy.approver}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-3">NIST CSF v2.0 Mapping</h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Function:</span>
                      <span className="font-medium text-gray-900 dark:text-white">{viewingPolicy.nistFunction}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Category:</span>
                      <span className="font-medium text-gray-900 dark:text-white">{viewingPolicy.nistCategory}</span>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-300">Subcategories:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {viewingPolicy.nistSubcategories.map((sub: index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs rounded"
                          >
                            {sub}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-3">Timeline</h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Effective Date:</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {viewingPolicy.effectiveDate.toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Last Reviewed:</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {viewingPolicy.lastReviewed.toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Next Review:</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {viewingPolicy.nextReview.toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Review Cycle:</span>
                      <span className="font-medium text-gray-900 dark:text-white capitalize">
                        {viewingPolicy.reviewCycle}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-3">Risk Assessment</h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Risk Rating:</span>
                      <span className={`font-medium ${
                        viewingPolicy.metadata.riskRating === 'critical' ? 'text-red-600 dark: text-red-400'  : viewingPolicy.metadata.riskRating === 'high' ? 'text-orange-600 dark:text-orange-400' :
                        viewingPolicy.metadata.riskRating === 'medium' ? 'text-yellow-600 dark:text-yellow-400' :
                        'text-green-600 dark:text-green-400'}`}>
                        {viewingPolicy.metadata.riskRating.charAt(0).toUpperCase() + viewingPolicy.metadata.riskRating.slice(1)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Implementation Cost:</span>
                      <span className="font-medium text-gray-900 dark:text-white capitalize">
                        {viewingPolicy.metadata.implementationCost}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Technical Complexity:</span>
                      <span className="font-medium text-gray-900 dark:text-white capitalize">
                        {viewingPolicy.metadata.technicalComplexity}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Training Required:</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {viewingPolicy.metadata.trainingRequired ? 'Yes' : 'No'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              {viewingPolicy.stakeholders.length > 0 && (
                <div>
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-3">Stakeholders</h5>
                  <div className="flex flex-wrap gap-2">
                    {viewingPolicy.stakeholders.map((stakeholder: index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-full"
                      >
                        {stakeholder}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex space-x-4">
                  <button
                    onClick={() => {
                      addNotification('info', 'Policy document download feature coming soon');
                    }}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Download Policy
                  </button>
                  <button
                    onClick={() => {
                      setViewingPolicy(null);
                      handleEditPolicy(viewingPolicy);
                    }}
                    className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Edit Policy
                  </button>
                  <button
                    onClick={() => setViewingPolicy(null)}
                    className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg hover: bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
