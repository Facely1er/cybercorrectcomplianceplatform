import React, { useState } from 'react';
import { 
  FileText, Upload, CheckCircle, Clock, AlertTriangle, 
  Download, Eye, Search, Filter, Calendar, Users,
  BarChart3, Target, Award, Shield, Plus, Settings
} from 'lucide-react';
import { Breadcrumbs } from '../../../shared/components/layout/Breadcrumbs';
import { useInternalLinking } from '../../../shared/hooks/useInternalLinking';
import { Evidence, EvidenceCollection, EvidenceStatus } from '../types';

interface EvidenceCollectionDashboardProps {
  onBack: () => void;
  addNotification: (type: 'success' | 'error' | 'warning' | 'info', message: string) => void;
}

export const EvidenceCollectionDashboard: React.FC<EvidenceCollectionDashboardProps> = ({
  onBack,
  addNotification
}) => {
  const { breadcrumbs } = useInternalLinking();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<EvidenceStatus | 'all'>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadFormData, setUploadFormData] = useState({
    name: '',
    description: '',
    type: 'document' as 'document' | 'screenshot' | 'policy' | 'procedure' | 'certificate' | 'audit-report' | 'test-result' | 'training-record' | 'assessment-report' | 'log-file' | 'configuration' | 'vulnerability-scan' | 'penetration-test',
    controlId: '',
    confidentialityLevel: 'internal' as 'public' | 'internal' | 'confidential' | 'restricted',
    tags: ''
  });

  // Mock data - in production this would come from API
  const evidenceCollections: EvidenceCollection[] = [
    {
      id: 'ec-1',
      name: 'Asset Management Evidence Collection',
      description: 'Evidence collection for NIST CSF ID.AM (Asset Management) controls',
      controlId: 'id.am-01',
      requiredEvidenceTypes: ['policy', 'procedure', 'screenshot', 'audit-report'],
      collectionStatus: 'in-progress',
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      assignedTo: ['IT Security Team', 'Asset Management Team'],
      evidence: [],
      completionPercentage: 65,
      lastUpdated: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
    },
    {
      id: 'ec-2',
      name: 'Access Control Implementation Evidence',
      description: 'Evidence collection for NIST CSF PR.AA (Identity Management and Access Control)',
      controlId: 'pr.aa-01',
      requiredEvidenceTypes: ['policy', 'configuration', 'test-result', 'training-record'],
      collectionStatus: 'complete',
      dueDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      assignedTo: ['IAM Team', 'Security Operations'],
      evidence: [],
      completionPercentage: 100,
      lastUpdated: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
    },
    {
      id: 'ec-3',
      name: 'Network Monitoring Evidence',
      description: 'Evidence collection for NIST CSF DE.CM (Continuous Monitoring) controls',
      controlId: 'de.cm-01',
      requiredEvidenceTypes: ['log-file', 'screenshot', 'procedure', 'audit-report'],
      collectionStatus: 'not-started',
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      assignedTo: ['Network Operations', 'SOC Team'],
      evidence: [],
      completionPercentage: 0,
      lastUpdated: new Date()
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'complete': return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300';
      case 'in-progress': return 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300';
      case 'overdue': return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300';
      default: return 'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'complete': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'in-progress': return <Clock className="w-5 h-5 text-blue-500" />;
      case 'overdue': return <AlertTriangle className="w-5 h-5 text-red-500" />;
      default: return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const handleUploadEvidence = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!uploadFormData.name.trim() || !uploadFormData.description.trim()) {
      addNotification('error', 'Name and description are required');
      return;
    }

    const newEvidence: any = {
      id: `evidence-${Date.now()}`,
      name: uploadFormData.name,
      description: uploadFormData.description,
      type: uploadFormData.type,
      controlIds: uploadFormData.controlId ? [uploadFormData.controlId] : [],
      assetIds: [],
      uploadedBy: 'current-user',
      uploadedAt: new Date(),
      status: 'approved' as const,
      confidentialityLevel: uploadFormData.confidentialityLevel,
      retention: {
        period: 60, // 5 years
        reason: 'Compliance requirement',
        disposalDate: new Date(Date.now() + 5 * 365 * 24 * 60 * 60 * 1000)
      },
      metadata: {
        version: '1.0',
        source: 'manual-upload',
        validFrom: new Date(),
        approvalRequired: false
      },
      tags: uploadFormData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      linkedControls: [],
      complianceMapping: []
    };

    // Find the collection to update
    const updatedCollections = evidenceCollections.map(collection => {
      if (collection.controlId === uploadFormData.controlId || uploadFormData.controlId === '') {
        return {
          ...collection,
          evidence: [...collection.evidence, newEvidence],
          completionPercentage: Math.min(100, collection.completionPercentage + 20),
          lastUpdated: new Date()
        };
      }
      return collection;
    });

    // In a real app, this would save to backend
    addNotification('success', `Evidence "${newEvidence.name}" uploaded successfully`);
    setShowUploadModal(false);
    
    // Reset form
    setUploadFormData({
      name: '',
      description: '',
      type: 'document',
      controlId: '',
      confidentialityLevel: 'internal',
      tags: ''
    });
  };

  const stats = {
    totalCollections: evidenceCollections.length,
    completed: evidenceCollections.filter(ec => ec.collectionStatus === 'complete').length,
    inProgress: evidenceCollections.filter(ec => ec.collectionStatus === 'in-progress').length,
    overdue: evidenceCollections.filter(ec => ec.dueDate < new Date() && ec.collectionStatus !== 'complete').length,
    averageCompletion: Math.round(evidenceCollections.reduce((sum, ec) => sum + ec.completionPercentage, 0) / evidenceCollections.length)
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumbs */}
      <div className="mb-6">
        <Breadcrumbs items={breadcrumbs} />
      </div>

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
                  Evidence Collection Dashboard
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                  Manage compliance evidence for NIST CSF v2.0 implementation
                </p>
              </div>
            </div>
            
            <button
              onClick={() => setShowUploadModal(true)}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Upload className="w-4 h-4" />
              <span>Upload Evidence</span>
            </button>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Collections</p>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stats.totalCollections}</p>
            </div>
            <FileText className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Completed</p>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">{stats.completed}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">In Progress</p>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stats.inProgress}</p>
            </div>
            <Clock className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Overdue</p>
              <p className="text-3xl font-bold text-red-600 dark:text-red-400">{stats.overdue}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Completion</p>
              <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{stats.averageCompletion}%</p>
            </div>
            <Target className="w-8 h-8 text-purple-600 dark:text-purple-400" />
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 mb-8 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex-1 max-w-lg">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search evidence collections..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex space-x-4">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="not-started">Not Started</option>
              <option value="in-progress">In Progress</option>
              <option value="complete">Complete</option>
              <option value="overdue">Overdue</option>
            </select>
            
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="policy">Policies</option>
              <option value="procedure">Procedures</option>
              <option value="screenshot">Screenshots</option>
              <option value="audit-report">Audit Reports</option>
              <option value="test-result">Test Results</option>
            </select>
          </div>
        </div>
      </div>

      {/* Evidence Collections */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Evidence Collections ({evidenceCollections.length})
          </h2>
        </div>
        
        <div className="p-6">
          <div className="space-y-6">
            {evidenceCollections.map((collection) => (
              <div key={collection.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {collection.name}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(collection.collectionStatus)}`}>
                        {collection.collectionStatus.replace('-', ' ')}
                      </span>
                      {getStatusIcon(collection.collectionStatus)}
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {collection.description}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center space-x-2">
                        <Shield className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          Control: {collection.controlId.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          Due: {collection.dueDate.toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          {collection.assignedTo.length} teams assigned
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                      {collection.completionPercentage}%
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Complete</div>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-4">
                  <div
                    className={`h-3 rounded-full transition-all duration-300 ${
                      collection.completionPercentage === 100 ? 'bg-green-500' :
                      collection.completionPercentage > 0 ? 'bg-blue-500' : 'bg-gray-300'
                    }`}
                    style={{ width: `${collection.completionPercentage}%` }}
                  />
                </div>
                
                {/* Required Evidence Types */}
                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Required Evidence Types:</h4>
                  <div className="flex flex-wrap gap-2">
                    {collection.requiredEvidenceTypes.map((type, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-sm rounded-full"
                      >
                        {type.replace('-', ' ')}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Assigned Teams */}
                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Assigned Teams:</h4>
                  <div className="flex flex-wrap gap-2">
                    {collection.assignedTo.map((team, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-full"
                      >
                        {team}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Actions */}
                <div className="flex space-x-3">
                  <button
                    onClick={() => {
                      const evidenceDetails = `Evidence Collection Details:

Name: ${collection.name}
Description: ${collection.description}
Control ID: ${collection.controlId}
Status: ${collection.collectionStatus}
Progress: ${collection.completionPercentage}%
Due Date: ${collection.dueDate.toLocaleDateString()}

Required Evidence Types:
${collection.requiredEvidenceTypes.map(type => `• ${type.replace('-', ' ')}`).join('\n')}

Assigned Teams:
${collection.assignedTo.map(team => `• ${team}`).join('\n')}

Last Updated: ${collection.lastUpdated.toLocaleDateString()}`;
                      
                      addNotification('info', evidenceDetails);
                    }}
                    className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View Evidence</span>
                  </button>
                  
                  <button
                    onClick={() => setShowUploadModal(true)}
                    className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Add Evidence</span>
                  </button>
                  
                  <button
                    onClick={() => addNotification('info', 'Export functionality would be implemented')}
                    className="flex items-center space-x-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>Export</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {evidenceCollections.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No Evidence Collections
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Start by creating evidence collection requirements for your NIST CSF v2.0 controls
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Upload Modal Placeholder */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-2xl w-full mx-4 shadow-2xl border border-gray-200 dark:border-gray-700 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Upload Evidence
            </h3>
            
            <form onSubmit={handleUploadEvidence} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Evidence Name *
                </label>
                <input
                  type="text"
                  required
                  value={uploadFormData.name}
                  onChange={(e) => setUploadFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter evidence name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description *
                </label>
                <textarea
                  required
                  value={uploadFormData.description}
                  onChange={(e) => setUploadFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Describe the evidence and its relevance"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Evidence Type *
                  </label>
                  <select
                    required
                    value={uploadFormData.type}
                    onChange={(e) => setUploadFormData(prev => ({ ...prev, type: e.target.value as any }))}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="document">Document</option>
                    <option value="screenshot">Screenshot</option>
                    <option value="policy">Policy</option>
                    <option value="procedure">Procedure</option>
                    <option value="certificate">Certificate</option>
                    <option value="audit-report">Audit Report</option>
                    <option value="test-result">Test Result</option>
                    <option value="training-record">Training Record</option>
                    <option value="assessment-report">Assessment Report</option>
                    <option value="log-file">Log File</option>
                    <option value="configuration">Configuration</option>
                    <option value="vulnerability-scan">Vulnerability Scan</option>
                    <option value="penetration-test">Penetration Test</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Related Control ID
                  </label>
                  <input
                    type="text"
                    value={uploadFormData.controlId}
                    onChange={(e) => setUploadFormData(prev => ({ ...prev, controlId: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., id.am-01"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Confidentiality Level
                </label>
                <select
                  value={uploadFormData.confidentialityLevel}
                  onChange={(e) => setUploadFormData(prev => ({ ...prev, confidentialityLevel: e.target.value as any }))}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="public">Public</option>
                  <option value="internal">Internal</option>
                  <option value="confidential">Confidential</option>
                  <option value="restricted">Restricted</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  value={uploadFormData.tags}
                  onChange={(e) => setUploadFormData(prev => ({ ...prev, tags: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="compliance, policy, security"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  File Upload
                </label>
                <input
                  type="file"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg,.xlsx,.csv"
                />
              </div>
              
              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowUploadModal(false);
                    setUploadFormData({
                      name: '',
                      description: '',
                      type: 'document',
                      controlId: '',
                      confidentialityLevel: 'internal',
                      tags: ''
                    });
                  }}
                  className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
                >
                  Upload Evidence
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};