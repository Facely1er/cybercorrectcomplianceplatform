import React, { useState } from 'react';
import { 
  FileText, Shield, Users, Clock, CheckCircle, AlertTriangle,
  Plus, Search, Filter, Eye, Edit3, Download, Calendar,
  Target, Award, Settings, Flag, Star
} from 'lucide-react';
import { Policy, PolicyStatus, PolicyType } from '../types';

interface PolicyManagementViewProps {
  onBack: () => void;
  addNotification: (type: 'success' | 'error' | 'warning' | 'info', message: string) => void;
}

export const PolicyManagementView: React.FC<PolicyManagementViewProps> = ({
  onBack,
  addNotification
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<PolicyStatus | 'all'>('all');
  const [filterType, setFilterType] = useState<PolicyType | 'all'>('all');
  const [filterFunction, setFilterFunction] = useState<string>('all');

  // Mock policy data mapped to NIST CSF v2.0
  const policies: Policy[] = [
    {
      id: 'pol-001',
      name: 'Cybersecurity Governance Policy',
      description: 'Establishes the organizational cybersecurity governance framework and strategic direction',
      type: 'governance',
      framework: 'nist-csf-v2',
      nistFunction: 'Govern',
      nistCategory: 'Organizational Context',
      nistSubcategories: ['GV.OC-01', 'GV.OC-02'],
      version: '2.1',
      status: 'effective',
      effectiveDate: new Date(2024, 0, 1),
      lastReviewed: new Date(2024, 1, 15),
      nextReview: new Date(2024, 11, 15),
      reviewCycle: 'annually',
      owner: 'CISO',
      approver: 'CEO',
      stakeholders: ['Executive Team', 'Board of Directors', 'Security Team'],
      scope: ['Organization-wide'],
      exceptions: [],
      relatedPolicies: ['pol-002', 'pol-003'],
      relatedControls: ['gv.oc-01', 'gv.oc-02'],
      evidence: ['ev-001', 'ev-002'],
      implementationGuide: {
        objectives: ['Establish governance framework', 'Define roles and responsibilities'],
        procedures: [],
        roles: [],
        timeline: { phases: [], milestones: [], dependencies: [], riskFactors: [] },
        successCriteria: ['Governance framework approved', 'Roles documented'],
        measurableOutcomes: ['100% stakeholder awareness', 'Quarterly governance reviews']
      },
      complianceRequirements: [],
      metadata: {
        businessJustification: 'Required for establishing cybersecurity governance and executive oversight',
        riskRating: 'high',
        implementationCost: 'low',
        technicalComplexity: 'low',
        trainingRequired: true,
        auditFrequency: 'annually'
      }
    },
    {
      id: 'pol-002',
      name: 'Asset Management Policy',
      description: 'Defines requirements for identifying, inventorying, and managing organizational assets',
      type: 'asset-management',
      framework: 'nist-csf-v2',
      nistFunction: 'Identify',
      nistCategory: 'Asset Management',
      nistSubcategories: ['ID.AM-01', 'ID.AM-02'],
      version: '1.8',
      status: 'under-review',
      effectiveDate: new Date(2023, 11, 1),
      lastReviewed: new Date(2024, 1, 1),
      nextReview: new Date(2024, 10, 1),
      reviewCycle: 'annually',
      owner: 'IT Manager',
      approver: 'CISO',
      stakeholders: ['IT Team', 'Security Team', 'Facilities'],
      scope: ['IT Infrastructure', 'Physical Assets'],
      exceptions: [],
      relatedPolicies: ['pol-001'],
      relatedControls: ['id.am-01', 'id.am-02'],
      evidence: ['ev-003', 'ev-004'],
      implementationGuide: {
        objectives: ['Maintain accurate asset inventory', 'Classify assets by criticality'],
        procedures: [],
        roles: [],
        timeline: { phases: [], milestones: [], dependencies: [], riskFactors: [] },
        successCriteria: ['95% asset discovery accuracy', 'Real-time inventory updates'],
        measurableOutcomes: ['Monthly inventory reports', 'Asset risk classifications']
      },
      complianceRequirements: [],
      metadata: {
        businessJustification: 'Critical for understanding organizational attack surface and risk exposure',
        riskRating: 'high',
        implementationCost: 'medium',
        technicalComplexity: 'medium',
        trainingRequired: true,
        auditFrequency: 'quarterly'
      }
    },
    {
      id: 'pol-003',
      name: 'Access Control Policy',
      description: 'Establishes requirements for user access management, authentication, and authorization',
      type: 'access-control',
      framework: 'nist-csf-v2',
      nistFunction: 'Protect',
      nistCategory: 'Identity Management',
      nistSubcategories: ['PR.AA-01', 'PR.AA-02'],
      version: '2.0',
      status: 'effective',
      effectiveDate: new Date(2024, 1, 1),
      lastReviewed: new Date(2024, 1, 20),
      nextReview: new Date(2024, 7, 20),
      reviewCycle: 'semi-annually',
      owner: 'Security Manager',
      approver: 'CISO',
      stakeholders: ['Security Team', 'IT Team', 'HR'],
      scope: ['All Systems', 'All Users'],
      exceptions: [],
      relatedPolicies: ['pol-001'],
      relatedControls: ['pr.aa-01', 'pr.aa-02'],
      evidence: ['ev-005', 'ev-006'],
      implementationGuide: {
        objectives: ['Implement role-based access', 'Deploy multi-factor authentication'],
        procedures: [],
        roles: [],
        timeline: { phases: [], milestones: [], dependencies: [], riskFactors: [] },
        successCriteria: ['100% MFA deployment', 'Role-based access implemented'],
        measurableOutcomes: ['Zero unauthorized access incidents', 'Quarterly access reviews']
      },
      complianceRequirements: [],
      metadata: {
        businessJustification: 'Essential for preventing unauthorized access and protecting sensitive data',
        riskRating: 'critical',
        implementationCost: 'medium',
        technicalComplexity: 'high',
        trainingRequired: true,
        auditFrequency: 'quarterly'
      }
    }
  ];

  const getStatusColor = (status: PolicyStatus) => {
    switch (status) {
      case 'effective': return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300';
      case 'approved': return 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300';
      case 'under-review': return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300';
      case 'draft': return 'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300';
      case 'deprecated': return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300';
      default: return 'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'critical': return 'text-red-600 dark:text-red-400';
      case 'high': return 'text-orange-600 dark:text-orange-400';
      case 'medium': return 'text-yellow-600 dark:text-yellow-400';
      case 'low': return 'text-green-600 dark:text-green-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  const filteredPolicies = policies.filter(policy => {
    const matchesSearch = policy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         policy.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || policy.status === filterStatus;
    const matchesType = filterType === 'all' || policy.type === filterType;
    const matchesFunction = filterFunction === 'all' || policy.nistFunction === filterFunction;
    
    return matchesSearch && matchesStatus && matchesType && matchesFunction;
  });

  const stats = {
    total: policies.length,
    effective: policies.filter(p => p.status === 'effective').length,
    underReview: policies.filter(p => p.status === 'under-review').length,
    overdue: policies.filter(p => p.nextReview < new Date()).length
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 mb-8">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-xl">
                <FileText className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Policy Management
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                  Manage policies mapped to NIST CSF v2.0 framework
                </p>
              </div>
            </div>
            
            <button
              onClick={() => addNotification('info', 'Policy creation feature coming soon')}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Create Policy</span>
            </button>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Policies</p>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stats.total}</p>
            </div>
            <FileText className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Effective</p>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">{stats.effective}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Under Review</p>
              <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">{stats.underReview}</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Overdue Reviews</p>
              <p className="text-3xl font-bold text-red-600 dark:text-red-400">{stats.overdue}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
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
                placeholder="Search policies..."
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
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="governance">Governance</option>
              <option value="risk-management">Risk Management</option>
              <option value="asset-management">Asset Management</option>
              <option value="access-control">Access Control</option>
              <option value="data-protection">Data Protection</option>
              <option value="incident-response">Incident Response</option>
            </select>
            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="draft">Draft</option>
              <option value="under-review">Under Review</option>
              <option value="approved">Approved</option>
              <option value="effective">Effective</option>
              <option value="deprecated">Deprecated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Policies List */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            NIST CSF v2.0 Policies ({filteredPolicies.length})
          </h2>
        </div>
        
        <div className="p-6">
          <div className="space-y-6">
            {filteredPolicies.map((policy) => (
              <div key={policy.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {policy.name}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(policy.status)}`}>
                        {policy.status.replace('-', ' ')}
                      </span>
                      <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs font-medium rounded-full">
                        v{policy.version}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {policy.description}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">NIST Function:</span>
                        <div className="font-medium text-gray-900 dark:text-white">{policy.nistFunction}</div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">Category:</span>
                        <div className="font-medium text-gray-900 dark:text-white">{policy.nistCategory}</div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">Owner:</span>
                        <div className="font-medium text-gray-900 dark:text-white">{policy.owner}</div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">Next Review:</span>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {policy.nextReview.toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <span className="text-sm text-gray-500 dark:text-gray-400">NIST Subcategories:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {policy.nistSubcategories.map((sub, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 text-xs rounded"
                          >
                            {sub}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className={`text-lg font-bold ${getRiskColor(policy.metadata.riskRating)} mb-1`}>
                      {policy.metadata.riskRating.toUpperCase()}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Risk Rating</div>
                  </div>
                </div>
                
                {/* Actions */}
                <div className="flex space-x-3">
                  <button
                    onClick={() => addNotification('info', `Viewing policy: ${policy.name}`)}
                    className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View</span>
                  </button>
                  
                  <button
                    onClick={() => addNotification('info', 'Policy editing feature coming soon')}
                    className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                    <span>Edit</span>
                  </button>
                  
                  <button
                    onClick={() => addNotification('info', 'Policy download feature coming soon')}
                    className="flex items-center space-x-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {filteredPolicies.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No Policies Found
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                No policies match your current search and filter criteria
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};