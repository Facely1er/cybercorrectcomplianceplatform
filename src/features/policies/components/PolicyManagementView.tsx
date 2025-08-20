import React, { useState, useEffect } from 'react';
import { ArrowLeft, FileText, Plus, Search, Filter, Download, Upload, Edit3, Trash2, Eye, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { Policy, PolicyStatus, PolicyType } from '../types';

interface PolicyManagementViewProps {
  onBack: () => void;
  addNotification: (type: 'success' | 'error' | 'warning' | 'info', message: string) => void;
}

export const PolicyManagementView: React.FC<PolicyManagementViewProps> = ({
  onBack,
  addNotification
}) => {
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showPolicyForm, setShowPolicyForm] = useState(false);
  const [editingPolicy, setEditingPolicy] = useState<Policy | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: 'governance' as PolicyType,
    status: 'draft' as PolicyStatus,
    version: '1.0',
    owner: '',
    approver: '',
    nistFunction: 'Govern',
    nistCategory: '',
    nistSubcategories: [] as string[]
  });

  // Mock data for demonstration
  useEffect(() => {
    const mockPolicies: any[] = [
      {
        id: 'pol-001',
        name: 'Information Security Policy',
        description: 'Comprehensive policy outlining information security requirements and procedures',
        type: 'governance',
        framework: 'nist-csf-v2',
        nistFunction: 'Govern',
        nistCategory: 'Organizational Context',
        nistSubcategories: ['GV.OC-01', 'GV.OC-02'],
        status: 'effective',
        version: '2.1',
        effectiveDate: new Date('2024-01-15'),
        lastReviewed: new Date('2024-01-15'),
        nextReview: new Date('2024-07-15'),
        reviewCycle: 'annually' as const,
        owner: 'CISO',
        approver: 'CEO',
        stakeholders: ['Executive Team', 'Security Team'],
        scope: ['Organization-wide'],
        exceptions: [],
        relatedPolicies: [],
        relatedControls: ['gv.oc-01', 'gv.oc-02'],
        evidence: [],
        implementationGuide: {
          objectives: [],
          procedures: [],
          roles: [],
          timeline: { phases: [], milestones: [], dependencies: [], riskFactors: [] },
          successCriteria: [],
          measurableOutcomes: []
        },
        complianceRequirements: [],
        metadata: {
          businessJustification: 'Required for cybersecurity governance',
          riskRating: 'high',
          implementationCost: 'low',
          technicalComplexity: 'low',
          trainingRequired: true,
          auditFrequency: 'annually'
        }
      }
    ];

    setPolicies(mockPolicies);
  }, []);

  const getStatusIcon = (status: Policy['status']) => {
    switch (status) {
      case 'effective':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'under-review':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'draft':
        return <Edit3 className="w-4 h-4 text-blue-500" />;
      case 'deprecated':
        return <AlertCircle className="w-4 h-4 text-gray-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: Policy['status']) => {
    switch (status) {
      case 'effective':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'under-review':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'draft':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'deprecated':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Policy Management
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Manage organizational policies and compliance documentation
                </p>
              </div>
            </div>
            
            <button
              onClick={() => addNotification('info', 'Policy creation feature coming soon')}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Create Policy</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8">
          <div className="text-center">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Policy Management Coming Soon
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Advanced policy management features are being developed
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};