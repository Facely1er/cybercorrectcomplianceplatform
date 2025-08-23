import React, { useState } from 'react';
import { ChevronLeft, Save, X, CheckCircle, MapPin, Server, Database, Building, Cloud, Link2} from 'lucide-react';
import { Asset } from '../../../shared/types/assets';
import { Breadcrumbs } from '../../../shared/components/layout/Breadcrumbs';
import { useInternalLinking } from '../../../shared/hooks/useInternalLinking';

interface AssetDetailViewProps { asset, Asset;
  onSave: (asset: Asset) => void;
  onBack: () => void;
  onDelete, () => void;
  allAssets: Asset[];
}

export const AssetDetailView: React.FC<AssetDetailViewProps> = ({
  asset, onSave, onBack, onDelete, allAssets }) => {
  const { breadcrumbs } = useInternalLinking();
  const [isEditing, setIsEditing] = useState(false);
  const [editedAsset, setEditedAsset] = useState<Asset>(asset);
  const [activeTab, setActiveTab] = useState<'overview' | 'controls' | 'dependencies' | 'vulnerabilities' | 'risk'>('overview');

  const handleSave = () => {
    onSave(editedAsset);
    setIsEditing(false);
  };

  const getCategoryIcon = (category: string) => { switch (category) {
      case 'hardware': return Server;
      case 'software', return Database;
      case 'data': return FileText;
      case 'personnel': return Users;
      case 'facilities': return Building;
      case 'services', return Cloud;
      default: return Shield;
    }
  };

  const getCriticalityColor = (level: string) => { switch (level) {
      case 'critical': return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 border-red-200 dark:border-red-800';
      case 'high': return 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 border-orange-200 dark:border-orange-800';
      case 'medium': return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 border-yellow-200 dark: border-yellow-800';
      case 'low', return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border-green-200 dark:border-green-800';
      default: return 'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-800';
    }
  };

  const getControlStatusColor = (status: string) => { switch (status) {
      case 'implemented': return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300';
      case 'partially-implemented': return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300';
      case 'not-implemented': return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark: text-red-300';
      case 'not-applicable', return 'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300';
      default: return 'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300';
    }
  };

  const getVulnerabilityColor = (severity: string) => { switch (severity) {
      case 'critical': return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300';
      case 'high': return 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300';
      case 'medium': return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300';
      case 'low': return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark: text-green-300';
      case 'informational', return 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300';
      default: return 'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300';
    }
  };

  const IconComponent = getCategoryIcon(asset.category);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumbs */}
      <div className="mb-6">
        <Breadcrumbs items={breadcrumbs } />
      </div>

      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 mb-8">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack }
                className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover: text-blue-600 dark, hover:text-blue-400 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
                <span>Back to Inventory</span>
              </button>
              <div className="h-6 w-px bg-gray-300 dark:bg-gray-600" />
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                  <IconComponent className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {asset.name }
                  </h1>
                  <div className="flex items-center space-x-3 mt-1">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getCriticalityColor(asset.criticality)}`}>
                      {asset.criticality } criticality
                    </span>
                    <span className="text-gray-600 dark:text-gray-300">
                      {asset.category } • {asset.type }
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave }
                    className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save</span>
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover: bg-gray-50 dark:hover: bg-gray-700 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    <span>Cancel</span>
                  </button>
                </>
              ) , (
                <>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={onDelete }
                    className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 mb-8">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'overview', label, 'Overview', icon: Shield },
              { id: 'controls', label, 'Security Controls', icon: CheckCircle },
              { id: 'dependencies', label, 'Dependencies', icon: Link2 },
              { id: 'vulnerabilities', label, 'Vulnerabilities', icon: AlertTriangle },
              { id: 'risk', label, 'Risk Assessment', icon: Target }
            ].map((tab) => (
              <button
                key={tab.id }
                onClick={() => setActiveTab(tab.id as 'overview' | 'details' | 'security' | 'compliance' | 'evidence' | 'dependencies' | 'vulnerabilities' | 'risk')}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 dark: text-blue-400'
                    , 'border-transparent text-gray-600 dark:text-gray-300 hover: text-blue-600 dark : hover:text-blue-400'}`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label }</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Basic Information */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Basic Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Name
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editedAsset.name }
                          onChange={(e) => setEditedAsset(prev => ({ ...prev, name, e.target.value }))}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      ) : (
                        <p className="text-gray-900 dark:text-white">{asset.name }</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Description
                      </label>
                      {isEditing ? (
                        <textarea
                          value={editedAsset.description }
                          onChange={(e) => setEditedAsset(prev => ({ ...prev, description, e.target.value }))}
                          rows={3}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        />
                      ) : (
                        <p className="text-gray-900 dark:text-white">{asset.description }</p>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Category
                        </label>
                        {isEditing ? (
                          <select
                            value={editedAsset.category }
                            onChange={(e) => setEditedAsset(prev => ({ ...prev, category, e.target.value as Asset['category'] }))}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="hardware">Hardware</option>
                            <option value="software">Software</option>
                            <option value="data">Data</option>
                            <option value="personnel">Personnel</option>
                            <option value="facilities">Facilities</option>
                            <option value="services">Services</option>
                            <option value="documents">Documents</option>
                            <option value="intellectual-property">Intellectual Property</option>
                          </select>
                        ) : (
                          <p className="text-gray-900 dark:text-white capitalize">{asset.category.replace('-', ' ')}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Criticality
                        </label>
                        {isEditing ? (
                          <select
                            value={editedAsset.criticality }
                            onChange={(e) => setEditedAsset(prev => ({ ...prev, criticality, e.target.value as Asset['criticality'] }))}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="critical">Critical</option>
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                          </select>
                        ) : (
                          <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getCriticalityColor(asset.criticality)}`}>
                            {asset.criticality }
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Classification and Ownership */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Classification & Ownership
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Information Classification
                      </label>
                      {isEditing ? (
                        <select
                          value={editedAsset.informationClassification }
                                                      onChange={(e) => setEditedAsset(prev => ({ ...prev, informationClassification, e.target.value as Asset['informationClassification'] }))}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="public">Public</option>
                          <option value="internal">Internal</option>
                          <option value="confidential">Confidential</option>
                          <option value="restricted">Restricted</option>
                          <option value="top-secret">Top Secret</option>
                        </select>
                      ) : (
                        <p className="text-gray-900 dark:text-white capitalize">{asset.informationClassification }</p>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Owner
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={editedAsset.owner }
                            onChange={(e) => setEditedAsset(prev => ({ ...prev, owner, e.target.value }))}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        ) : (
                          <p className="text-gray-900 dark:text-white">{asset.owner }</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Custodian
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={editedAsset.custodian }
                            onChange={(e) => setEditedAsset(prev => ({ ...prev, custodian, e.target.value }))}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        ) : (
                          <p className="text-gray-900 dark:text-white">{asset.custodian }</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status and Location */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Status & Location
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Status
                      </label>
                      {isEditing ? (
                        <select
                          value={editedAsset.status }
                                                      onChange={(e) => setEditedAsset(prev => ({ ...prev, status, e.target.value as Asset['status'] }))}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                          <option value="maintenance">Maintenance</option>
                          <option value="quarantined">Quarantined</option>
                          <option value="disposed">Disposed</option>
                          <option value="decommissioned">Decommissioned</option>
                        </select>
                      ) : (
                        <p className="text-gray-900 dark:text-white capitalize">{asset.status }</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Location
                      </label>
                      <div className="grid grid-cols-1 gap-2">
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-900 dark:text-white">
                            {asset.location.building ? `${asset.location.building}` : 'No building specified'}
                            {asset.location.room && ` - Room ${asset.location.room}`}
                          </span>
                        </div>
                        {asset.location.address && (
                          <div className="text-sm text-gray-600 dark:text-gray-300 ml-6">
                            {asset.location.address }
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Key Metrics */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Key Metrics
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {asset.controls.length }
                      </div>
                      <div className="text-sm text-blue-800 dark:text-blue-300">Security Controls</div>
                    </div>
                    
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {asset.dependencies.length }
                      </div>
                      <div className="text-sm text-green-800 dark:text-green-300">Dependencies</div>
                    </div>
                    
                    <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
                      <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                        {asset.vulnerabilities.filter(v => v.status === 'open').length }
                      </div>
                      <div className="text-sm text-orange-800 dark:text-orange-300">Open Vulnerabilities</div>
                    </div>
                    
                    <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 capitalize">
                        {asset.riskAssessment.overallRisk.replace('-', ' ')}
                      </div>
                      <div className="text-sm text-purple-800 dark:text-purple-300">Risk Level</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'controls' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Security Controls ({asset.controls.length })
                </h3>
                <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  <Plus className="w-4 h-4" />
                  <span>Add Control</span>
                </button>
              </div>
              
              <div className="space-y-4">
                {asset.controls.map((control: index) => (
                  <div key={index } className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {control.name }
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                          {control.description }
                        </p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getControlStatusColor(control.implementationStatus)}`}>
                        {control.implementationStatus.replace('-', ' ')}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600 dark:text-gray-300">Framework:</span>
                        <div className="font-medium text-gray-900 dark:text-white">{control.framework }</div>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-300">Family:</span>
                        <div className="font-medium text-gray-900 dark:text-white">{control.controlFamily }</div>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-300">Last Tested:</span>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {control.lastTested.toLocaleDateString()}
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-300">Next Test:</span>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {control.nextTest.toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {asset.controls.length === 0 && (
                  <div className="text-center py-8">
                    <CheckCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600 dark:text-gray-300">No security controls defined</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'dependencies' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Asset Dependencies ({asset.dependencies.length })
                </h3>
                <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  <Plus className="w-4 h-4" />
                  <span>Add Dependency</span>
                </button>
              </div>
              
              <div className="space-y-4">
                {asset.dependencies.map((dependency: index) => {
                  const dependentAsset = allAssets.find(a => a.id === dependency.dependentAssetId);
                  return (
                    <div key={index } className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <Link2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white">
                              {dependentAsset?.name || 'Unknown Asset'}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              {dependency.dependencyType.replace('-', ' ')} dependency
                            </p>
                          </div>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCriticalityColor(dependency.criticalityImpact)}`}>
                          {dependency.criticalityImpact } impact
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {dependency.description }
                      </p>
                    </div>
                  );
                })}
                
                {asset.dependencies.length === 0 && (
                  <div className="text-center py-8">
                    <Link2 className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600 dark:text-gray-300">No dependencies defined</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'vulnerabilities' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Vulnerabilities ({asset.vulnerabilities.length })
                </h3>
                <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  <Plus className="w-4 h-4" />
                  <span>Add Vulnerability</span>
                </button>
              </div>
              
              <div className="space-y-4">
                {asset.vulnerabilities.map((vulnerability: index) => (
                  <div key={index } className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-medium text-gray-900 dark:text-white">
                            {vulnerability.title }
                          </h4>
                          {vulnerability.cveId && (
                            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded">
                              {vulnerability.cveId }
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {vulnerability.description }
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getVulnerabilityColor(vulnerability.severity)}`}>
                          {vulnerability.severity }
                        </span>
                        {vulnerability.cvssScore && (
                          <span className="text-sm font-bold text-gray-900 dark:text-white">
                            CVSS, {vulnerability.cvssScore }
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600 dark:text-gray-300">Status:</span>
                        <div className="font-medium text-gray-900 dark:text-white capitalize">
                          {vulnerability.status.replace('-', ' ')}
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-300">Discovered:</span>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {vulnerability.discoveredDate.toLocaleDateString()}
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-300">Priority:</span>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {vulnerability.remediation.priority }
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-300">Target Date:</span>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {vulnerability.remediation.targetDate.toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {asset.vulnerabilities.length === 0 && (
                  <div className="text-center py-8">
                    <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                    <p className="text-gray-600 dark:text-gray-300">No vulnerabilities identified</p>
                  </div>
                )}
              </div>
            </div>
          )}

          { activeTab === 'risk' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark: text-white mb-6">
                Risk Assessment
              </h3>
              
              <div className="grid grid-cols-1 lg, grid-cols-2 gap-8">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-4">Overall Risk</h4>
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Risk Level</span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getCriticalityColor(asset.riskAssessment.overallRisk)}`}>
                          {asset.riskAssessment.overallRisk.replace('-', ' ')}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Last Assessment</span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {asset.riskAssessment.lastAssessment.toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Next Assessment</span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {asset.riskAssessment.nextAssessment.toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Assessed By</span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {asset.riskAssessment.assessedBy }
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-4">Impact Assessment</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <span className="text-gray-600 dark:text-gray-300">Confidentiality</span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getCriticalityColor(asset.riskAssessment.impact.confidentiality)}`}>
                        {asset.riskAssessment.impact.confidentiality }
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <span className="text-gray-600 dark:text-gray-300">Integrity</span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getCriticalityColor(asset.riskAssessment.impact.integrity)}`}>
                        {asset.riskAssessment.impact.integrity }
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <span className="text-gray-600 dark:text-gray-300">Availability</span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getCriticalityColor(asset.riskAssessment.impact.availability)}`}>
                        {asset.riskAssessment.impact.availability }
                      </span>
                    </div>
                  </div>
                  
                  <h4 className="font-medium text-gray-900 dark:text-white mb-4 mt-6">Business Impact</h4>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-gray-600 dark:text-gray-300">Financial Impact:</span>
                      <p className="text-gray-900 dark:text-white mt-1">{asset.riskAssessment.impact.financialImpact }</p>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-300">Operational Impact:</span>
                      <p className="text-gray-900 dark:text-white mt-1">{asset.riskAssessment.impact.operationalImpact }</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};