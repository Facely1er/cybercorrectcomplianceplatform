import React, { useState } from 'react';
import { 
  Save, X, Shield, Server, Database, Users, Building, 
  FileText, Cloud, MapPin, Tag, Calendar, AlertTriangle
} from 'lucide-react';
import { 
  Asset, 
  AssetCategory, 
  AssetType, 
  CriticalityLevel, 
  InformationClassification, 
  AssetStatus,
  BusinessValue
} from '../../../shared/types/assets';

interface AssetCreationFormProps {
  onSubmit: (asset: Omit<Asset, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
  initialData?: Partial<Asset>;
}

export const AssetCreationForm: React.FC<AssetCreationFormProps> = ({
  onSubmit,
  onCancel,
  initialData
}) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    description: initialData?.description || '',
    category: initialData?.category || 'hardware' as AssetCategory,
    subcategory: initialData?.subcategory || '',
    type: initialData?.type || 'server' as AssetType,
    owner: initialData?.owner || '',
    custodian: initialData?.custodian || '',
    status: initialData?.status || 'active' as AssetStatus,
    criticality: initialData?.criticality || 'medium' as CriticalityLevel,
    informationClassification: initialData?.informationClassification || 'internal' as InformationClassification,
    businessValue: initialData?.businessValue || 'operational' as BusinessValue,
    location: {
      type: 'physical' as const,
      building: '',
      room: '',
      address: ''
    },
    tags: initialData?.tags?.join(', ') || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name.trim()) {
      alert('Asset name is required');
      return;
    }
    
    if (!formData.description.trim()) {
      alert('Asset description is required');
      return;
    }
    
    if (!formData.owner.trim()) {
      alert('Asset owner is required');
      return;
    }
    
    const newAsset: Omit<Asset, 'id' | 'createdAt' | 'updatedAt'> = {
      name: formData.name,
      description: formData.description,
      category: formData.category,
      subcategory: formData.subcategory,
      type: formData.type,
      owner: formData.owner,
      custodian: formData.custodian,
      location: formData.location,
      status: formData.status,
      criticality: formData.criticality,
      informationClassification: formData.informationClassification,
      businessValue: formData.businessValue,
      technicalSpecs: {},
      dependencies: [],
      controls: [],
      vulnerabilities: [],
      riskAssessment: {
        overallRisk: 'medium',
        riskFactors: [],
        threats: [],
        impact: {
          confidentiality: 'medium',
          integrity: 'medium',
          availability: 'medium',
          financialImpact: 'TBD',
          operationalImpact: 'TBD',
          reputationalImpact: 'TBD',
          legalImpact: 'TBD'
        },
        likelihood: {
          threatLevel: 'medium',
          vulnerabilityLevel: 'medium',
          exposureLevel: 'medium',
          historicalIncidents: 0,
          industryTrends: 'TBD'
        },
        riskTreatment: {
          strategy: 'mitigate',
          controls: [],
          residualRisk: 'medium'
        },
        lastAssessment: new Date(),
        nextAssessment: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year from now
        assessedBy: formData.owner
      },
      compliance: [],
      lifecycle: {
        phase: 'operation',
        deploymentDate: new Date(),
        maintenanceSchedule: {
          frequency: 'quarterly',
          nextMaintenance: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days from now
          maintenanceType: 'preventive',
          assignedTo: formData.custodian
        }
      },
      lastReviewed: new Date(),
      nextReview: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year from now
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      metadata: {}
    };

    onSubmit(newAsset);
  };

  const categoryOptions: { value: AssetCategory; label: string; icon: any }[] = [
    { value: 'hardware', label: 'Hardware', icon: Server },
    { value: 'software', label: 'Software', icon: Database },
    { value: 'data', label: 'Data', icon: FileText },
    { value: 'personnel', label: 'Personnel', icon: Users },
    { value: 'facilities', label: 'Facilities', icon: Building },
    { value: 'services', label: 'Services', icon: Cloud },
    { value: 'documents', label: 'Documents', icon: FileText },
    { value: 'intellectual-property', label: 'Intellectual Property', icon: Shield }
  ];

  const typeOptions: Record<AssetCategory, AssetType[]> = {
    'hardware': ['server', 'workstation', 'network-device', 'mobile-device'],
    'software': ['application', 'database', 'operating-system'],
    'data': ['personal-data', 'business-data', 'financial-data'],
    'personnel': ['employee', 'contractor', 'vendor'],
    'facilities': ['building', 'room'],
    'services': ['cloud-service', 'saas-application'],
    'documents': ['policy', 'procedure'],
    'intellectual-property': ['patent', 'trademark']
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {initialData ? 'Edit Asset' : 'Create New Asset'}
          </h2>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Asset Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter asset name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category *
              </label>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as AssetCategory }))}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categoryOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
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
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Describe the asset and its purpose"
            />
          </div>

          {/* Classification and Criticality */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Criticality Level *
              </label>
              <select
                required
                value={formData.criticality}
                onChange={(e) => setFormData(prev => ({ ...prev, criticality: e.target.value as CriticalityLevel }))}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Information Classification *
              </label>
              <select
                required
                value={formData.informationClassification}
                onChange={(e) => setFormData(prev => ({ ...prev, informationClassification: e.target.value as InformationClassification }))}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="public">Public</option>
                <option value="internal">Internal</option>
                <option value="confidential">Confidential</option>
                <option value="restricted">Restricted</option>
                <option value="top-secret">Top Secret</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Status *
              </label>
              <select
                required
                value={formData.status}
                onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as AssetStatus }))}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="maintenance">Maintenance</option>
                <option value="quarantined">Quarantined</option>
                <option value="disposed">Disposed</option>
                <option value="decommissioned">Decommissioned</option>
              </select>
            </div>
          </div>

          {/* Ownership */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Asset Owner *
              </label>
              <input
                type="text"
                required
                value={formData.owner}
                onChange={(e) => setFormData(prev => ({ ...prev, owner: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Person responsible for the asset"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Asset Custodian
              </label>
              <input
                type="text"
                value={formData.custodian}
                onChange={(e) => setFormData(prev => ({ ...prev, custodian: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Person managing day-to-day operations"
              />
            </div>
          </div>

          {/* Location */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Building
              </label>
              <input
                type="text"
                value={formData.location.building}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  location: { ...prev.location, building: e.target.value }
                }))}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Building name or number"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Room
              </label>
              <input
                type="text"
                value={formData.location.room}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  location: { ...prev.location, room: e.target.value }
                }))}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Room number or name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Address
              </label>
              <input
                type="text"
                value={formData.location.address}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  location: { ...prev.location, address: e.target.value }
                }))}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Physical address"
              />
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="critical, production, finance"
            />
          </div>

          {/* Form Actions */}
          <div className="flex space-x-4 pt-6">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium flex items-center justify-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>{initialData ? 'Update Asset' : 'Create Asset'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};