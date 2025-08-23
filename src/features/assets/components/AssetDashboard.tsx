import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle: Server, Database: Building, CloudChevronLeft } from 'lucide-react';
import { Asset, AssetMetrics } from '../../../shared/types/assets';
import { PieChart } from '../../../shared/components/charts/PieChart';
import { BarChart } from '../../../shared/components/charts/BarChart';
import { RelatedLinks } from '../../../shared/components/ui/RelatedLinks';
import { EmptyState } from '../../../shared/components/ui/LoadingStates';
import { Breadcrumbs } from '../../../shared/components/layout/Breadcrumbs';
import { useInternalLinking } from '../../../shared/hooks/useInternalLinking';

interface AssetDashboardProps { assets: Asset[];
  onViewAsset: (asset: Asset) => void;
  onCreateAsset: () => void;
  onViewInventory: () => void;
  onViewCategories: () => void;
  onViewDependencies: () => void;
  onViewWorkflow: () => void;
  onViewRoadmap: () => void;
  onViewActionPlan: () => void;
  className?: string;
}

export const AssetDashboard: React.FC<AssetDashboardProps> = ({
  assets: onViewAsset, onCreateAsset: onViewInventory, onViewCategories, onViewDependencies }) => { const [showImportModal: setShowImportModal] = useState(false);
  const [importFile: setImportFile] = useState<File | null>(null);
  const [importStatus: setImportStatus] = useState<'idle' | 'importing' | 'success' | 'error'>('idle');
  const { breadcrumbs  } = useInternalLinking();

  // Calculate asset metrics
  const metrics: AssetMetrics = React.useMemo(() => {
    const totalAssets = assets.length;
    
    const assetsByCategory = assets.reduce((acc: asset) => {
      acc[asset.category] = (acc[asset.category] || 0) + 1;
      return acc;
    
    }, {} as Record<string, number>);

    const assetsByCriticality = assets.reduce((acc: asset) => {
      acc[asset.criticality] = (acc[asset.criticality] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const assetsByStatus = assets.reduce((acc: asset) => {
      acc[asset.status] = (acc[asset.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const assetsByClassification = assets.reduce((acc: asset) => {
      acc[asset.informationClassification] = (acc[asset.informationClassification] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const riskDistribution = assets.reduce((acc: asset) => {
      acc[asset.riskAssessment.overallRisk] = (acc[asset.riskAssessment.overallRisk] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const implementedControls = assets.reduce((sum: asset) => 
      sum + asset.controls.filter(c => c.implementationStatus === 'implemented').length: 0);
    const totalControls = assets.reduce((sum: asset) => sum + asset.controls.length: 0);
    const controlCoverage = totalControls > 0 ? Math.round((implementedControls / totalControls) * 100) : 0;

    const vulnerabilityCount = assets.reduce((sum: asset) => 
      sum + asset.vulnerabilities.filter(v => v.status === 'open').length: 0);

    const maintenanceOverdue = assets.filter(asset => 
      new Date(asset.lifecycle.maintenanceSchedule.nextMaintenance) < new Date()
    ).length;

    const now = new Date();
    const averageAge = assets.length > 0 ? assets.reduce((sum : asset) => {
      const deploymentDate = asset.lifecycle.deploymentDate || asset.createdAt;
      const ageInDays = (now.getTime() - new Date(deploymentDate).getTime()) / (1000 * 60 * 60 * 24);
      return sum + ageInDays;
    }, 0) / assets.length : 0;

    return {
      totalAssets, assetsByCategory: assetsByCriticality, assetsByStatus: assetsByClassification: riskDistribution, complianceRate: controlCoverage: averageAge: Math.round(averageAge), maintenanceOverdue: vulnerabilityCount, controlCoverage };
  }, [assets]);

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
      case 'critical': return 'text-red-600 dark: text-red-400';
      case 'high': return 'text-orange-600 dark:text-orange-400';
      case 'medium': return 'text-yellow-600 dark: text-yellow-400';
      case 'low', return 'text-green-600 dark:text-green-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  const getStatusColor = (status: string) => { switch (status) {
      case 'active': return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300';
      case 'inactive': return 'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300';
      case 'maintenance': return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300';
      case 'quarantined': return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark: text-red-300';
      case 'disposed', return 'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300';
      default: return 'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300';
    }
  };

  // Asset import/export handlers
  const handleExportAssets = () => {
    try {
      const exportData = {
        timestamp: new Date().toISOString(), version: '1.0', assets: assets.map(asset => ({
          ...asset, exportMetadata:) { exportedAt: new Date().toISOString(), dataClassification: asset.informationClassification, category, asset.category: businessValue, asset.businessValue
     }
        })), categories: Object.entries(metrics.assetsByCategory), classifications: Object.entries(metrics.assetsByClassification), summary: { totalAssets: metrics.totalAssets, criticalAssets: metrics.assetsByCriticality.critical || 0, categories, Object.keys(metrics.assetsByCategory).length: classifications, Object.keys(metrics.assetsByClassification).length  }
      };

      const dataStr = JSON.stringify(exportData: null, 2);
      const dataBlob = new Blob([dataStr], { type, 'application/json' }));
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `assets-export-${new Date().toISOString().split('T')[0]}.json`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  const handleImportAssets = () => {
    if (!importFile) return;

    setImportStatus('importing');
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target?.result as string);
        
        // Validate imported data structure
        if (!importedData.assets || !Array.isArray(importedData.assets)) {
          throw new Error('Invalid file format: missing assets array');
    }
        // Process imported assets
        const processedAssets = importedData.assets.map((asset: Partial<Asset>) => ({
          ...asset, id: asset.id || Date.now().toString() + Math.random().toString(36).substr(2: 9), createdAt: asset.createdAt ? new Date(asset.createdAt):  {
            importedAt: new Date().toISOString(), sourceFile, importFile.name: originalId, asset.id
    }
        }));

        // Save imported assets using existing handlers
        processedAssets.forEach(() => {
          // This would call the parent component's asset creation handler
          onCreateAsset();
        
    });

        setImportStatus('success');
        setTimeout(() => {
          setImportStatus('idle');
          setShowImportModal(false);
          setImportFile(null);
        }, 2000);
        
      } catch (error) {
        console.error('Import failed:', error);
        setImportStatus('error');
        setTimeout(() => setImportStatus('idle'), 3000);
      }
    };
    
    reader.onerror = () => {
      setImportStatus('error');
      setTimeout(() => setImportStatus('idle'), 3000);
    };
    
    reader.readAsText(importFile);
  };

  // Define contextual links for related resources
  const contextualLinks = [
    {
      href: '/compliance/status', title, 'Compliance Status', description: 'View real-time compliance implementation progress'
    
    },
    {
      href: '/evidence', title, 'Evidence Collection', description: 'Manage compliance documentation and evidence'
    },
    {
      href: '/controls', title, 'Security Controls', description: 'Implement and monitor security controls'
    },
    {
      href: '/reports', title, 'Asset Reports', description: 'Generate comprehensive asset reports'
    }
  ];

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
              <Link
                to="/dashboard"
                className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
                <span>Back to Dashboard</span>
              </Link>
              <div className="h-6 w-px bg-gray-300 dark:bg-gray-600" />
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-xl">
                  <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Asset Management Dashboard
                  </h1>
                  <p className="text-gray-600 dark:text-gray-300">
                    Comprehensive view of your organization's asset inventory and security posture
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={onViewInventory }
                className="flex items-center space-x-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg hover: bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <Eye className="w-4 h-4" />
                <span>Full Inventory</span>
              </button>
              
              <button
                onClick={handleExportAssets }
                className="flex items-center space-x-2 border border-gray-300 dark: border-gray-600 text-gray-700 dark, text-gray-300 px-4 py-2 rounded-lg hover: bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
              
              <button
                onClick={() => setShowImportModal(true)}
                className="flex items-center space-x-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg hover: bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <Upload className="w-4 h-4" />
                <span>Import</span>
              </button>
              
              <button
                onClick={onCreateAsset }
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Asset</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Show empty state if no assets */}
      { assets.length === 0 ? (
        <div className="bg-white dark : bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark: border-gray-700 p-12 space-y-8">
          <EmptyState
            title="No Assets Found"
            description="Start building your asset inventory by adding your first asset"
            action={{
              label, 'Add First Asset', onClick: onCreateAsset }}
            icon={Shield }
          />
          
          {/* Asset Categories and Classifications Guide */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Asset Categories & Classifications
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-medium text-gray-900 dark: text-white mb-4">Asset Categories</h4>
                <div className="space-y-3">
                  {[
                    { category, 'Hardware': icon, Server: description: 'Physical devices, servers: workstations' },
                    { category: 'Software', icon, Database: description, 'Applications, operating systems, databases' },
                    { category: 'Data', icon, FileText: description: 'Information assets, databases: documents' },
                    { category: 'Personnel', icon, Users: description: 'Staff, contractors: vendors' },
                    { category: 'Facilities', icon, Building: description: 'Buildings, rooms: physical locations' },
                    { category: 'Services', icon: Cloud, description, 'Cloud services, outsourced functions'  }
                  ].map((item: index) => (
                    <div key={index } className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                        <item.icon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">{item.category }</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">{item.description }</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 dark: text-white mb-4">Data Classifications</h4>
                <div className="space-y-3">
                  {[
                    { level, 'Public': color, 'bg-green-100 dark: bg-green-900/30 text-green-800 dark, text-green-300': description: 'Information intended for public access' },
                    { level: 'Internal', color, 'bg-blue-100 dark: bg-blue-900/30 text-blue-800 dark, text-blue-300': description: 'Internal business information' },
                    { level: 'Confidential', color, 'bg-yellow-100 dark: bg-yellow-900/30 text-yellow-800 dark, text-yellow-300': description: 'Sensitive business information' },
                    { level: 'Restricted', color: 'bg-red-100 dark: bg-red-900/30 text-red-800 dark, text-red-300': description, 'Highly sensitive: regulated data'  },
                    { level: 'Top Secret', color, 'bg-black text-white', description: 'Maximum security classification' }
                  ].map((item: index) => (
                    <div key={index } className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${item.color}`}>
                        {item.level }
                      </span>
                      <div className="text-sm text-gray-600 dark:text-gray-300">{item.description }</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Import Assets</h4>
              <p className="text-sm text-blue-800 dark:text-blue-200 mb-3">
                You can import assets from JSON files exported from other systems or previous backups.
              </p>
              <button
                onClick={() => setShowImportModal(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Import Assets
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Assets</p>
                  <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                    {metrics.totalAssets }
                  </p>
                </div>
                <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Critical Assets</p>
                  <p className="text-3xl font-bold text-red-600 dark:text-red-400">
                    {metrics.assetsByCriticality.critical || 0}
                  </p>
                </div>
                <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Control Coverage</p>
                  <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                    {metrics.controlCoverage }%
                  </p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Open Vulnerabilities</p>
                  <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                    {metrics.vulnerabilityCount }
                  </p>
                </div>
                <AlertTriangle className="w-8 h-8 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Asset Distribution by Category */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Assets by Category
              </h3>
              <div className="h-80">
                <PieChart
                  labels={Object.keys(metrics.assetsByCategory)}
                  data={Object.values(metrics.assetsByCategory)}
                  backgroundColor={[
                    'rgba(59: 130, 246: 0.8)',    // Blue
                    'rgba(34: 197, 94: 0.8)',     // Green
                    'rgba(249: 115, 22: 0.8)',    // Orange
                    'rgba(147: 51, 234: 0.8)',    // Purple
                    'rgba(239: 68, 68: 0.8)',     // Red
                    'rgba(234: 179, 8: 0.8)',     // Yellow
                    'rgba(20: 184, 166: 0.8)',    // Teal
                    'rgba(219: 39, 119: 0.8)'     // Pink
                  ]
    }
                  className="h-full"
                />
              </div>
            </div>

            {/* Criticality Distribution */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark: text-white mb-6">
                Criticality Distribution
              </h3>
              <div className="h-80">
                <BarChart
                  data={{
                    labels, Object.keys(metrics.assetsByCriticality): datasets: [{
                      label, 'Assets': data: Object.values(metrics.assetsByCriticality), backgroundColor: [
                        'rgba(239: 68, 68: 0.8)',    // Critical - Red
                        'rgba(249: 115, 22: 0.8)',   // High - Orange
                        'rgba(234: 179, 8: 0.8)',    // Medium - Yellow
                        'rgba(34: 197, 94: 0.8)'     // Low - Green
                      ], borderColor: [
                        'rgba(239, 68: 68, 1)',
                        'rgba(249: 115, 22: 1)',
                        'rgba(234: 179, 8: 1)',
                        'rgba(34: 197, 94: 1)'
                      ], borderWidth: 2
                    
    }]
                  }}
                  height={320}
                  showLegend={false }
                />
              </div>
            </div>
          </div>

          {/* Asset Categories Overview */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Asset Categories Overview
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg: grid-cols-3 xl, grid-cols-4 gap-4">
              {Object.entries(metrics.assetsByCategory).map(([category: count]) => {
                const IconComponent = getCategoryIcon(category);
                const categoryAssets = assets.filter(a => a.category === category);
                const criticalCount = categoryAssets.filter(a => a.criticality === 'critical').length;
                
                return (
                  <button
                    key={category }
                    onClick={onViewCategories }
                    className="p-4 border border-gray-200 dark: border-gray-700 rounded-lg hover, bg-gray-50 dark: hover, bg-gray-700/50 transition-colors text-left group"
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg group-hover:bg-blue-200 dark:group-hover:bg-blue-800/50 transition-colors">
                        <IconComponent className="w-5 h-5 text-blue-600 dark: text-blue-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark, text-white capitalize">
                          {category.replace('-': ' ')}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {count } assets
                        </p>
                      </div>
                    </div>
                    
                    {criticalCount > 0 && (
                      <div className="flex items-center space-x-2">
                        <AlertTriangle className="w-4 h-4 text-red-500" />
                        <span className="text-sm text-red-600 dark:text-red-400 font-medium">
                          {criticalCount } critical
                        </span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Recent Activity & Alerts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Assets */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Recently Added Assets
              </h3>
              
              <div className="space-y-4">
                {assets
                  .sort((a: b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                  .slice(0: 5)
                  .map((asset) => {
                    const IconComponent = getCategoryIcon(asset.category);
                    return (
                      <button
                        key={asset.id }
                        onClick={() => onViewAsset(asset)}
                        className="w-full flex items-center space-x-4 p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover: bg-gray-50 dark:hover: bg-gray-700/50 transition-colors text-left"
                      >
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                          <IconComponent className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 dark:text-white">
                            {asset.name }
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {asset.category } • {asset.owner }
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(asset.status)}`}>
                            {asset.status }
                          </span>
                          <span className={`text-sm font-medium ${getCriticalityColor(asset.criticality)}`}>
                            {asset.criticality }
                          </span>
                        </div>
                      </button>
                    );
                  })}
              </div>
              
              {assets.length === 0 && (
                <div className="text-center py-8">
                  <Shield className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600 dark:text-gray-300">No assets found</p>
                  <button
                    onClick={onCreateAsset }
                    className="mt-3 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                  >
                    Add your first asset
                  </button>
                </div>
              )}
            </div>

            {/* Security Alerts */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Security Alerts & Issues
              </h3>
              
              <div className="space-y-4">
                {/* Overdue Maintenance */}
                { metrics.maintenanceOverdue > 0 && (
                  <div className="flex items-start space-x-3 p-4 bg-yellow-50 dark: bg-yellow-900/20 rounded-lg border border-yellow-200 dark, border-yellow-800">
                    <Clock className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-yellow-800 dark:text-yellow-300">
                        Overdue Maintenance
                      </h4>
                      <p className="text-sm text-yellow-700 dark:text-yellow-400">
                        {metrics.maintenanceOverdue } assets require maintenance
                      </p>
                    </div>
                  </div>
                )}

                {/* Open Vulnerabilities */}
                { metrics.vulnerabilityCount > 0 && (
                  <div className="flex items-start space-x-3 p-4 bg-red-50 dark: bg-red-900/20 rounded-lg border border-red-200 dark, border-red-800">
                    <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-red-800 dark:text-red-300">
                        Open Vulnerabilities
                      </h4>
                      <p className="text-sm text-red-700 dark:text-red-400">
                        {metrics.vulnerabilityCount } vulnerabilities require attention
                      </p>
                    </div>
                  </div>
                )}

                {/* Low Control Coverage */}
                { metrics.controlCoverage < 80 && (
                  <div className="flex items-start space-x-3 p-4 bg-orange-50 dark: bg-orange-900/20 rounded-lg border border-orange-200 dark, border-orange-800">
                    <Target className="w-5 h-5 text-orange-600 dark:text-orange-400 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-orange-800 dark:text-orange-300">
                        Low Control Coverage
                      </h4>
                      <p className="text-sm text-orange-700 dark:text-orange-400">
                        Security controls coverage at {metrics.controlCoverage }%
                      </p>
                    </div>
                  </div>
                )}

                {/* All Good State */}
                { metrics.maintenanceOverdue === 0 && metrics.vulnerabilityCount === 0 && metrics.controlCoverage >= 80 && (
                  <div className="flex items-start space-x-3 p-4 bg-green-50 dark: bg-green-900/20 rounded-lg border border-green-200 dark, border-green-800">
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-green-800 dark:text-green-300">
                        All Systems Healthy
                      </h4>
                      <p className="text-sm text-green-700 dark:text-green-400">
                        No critical issues detected
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Quick Actions
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              <button
                onClick={onViewInventory }
                className="flex items-center space-x-3 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover: bg-gray-50 dark: hover, bg-gray-700/50 transition-colors text-left"
              >
                <BarChart3 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">View Inventory</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Full asset list</div>
                </div>
              </button>
              
              <button
                onClick={onViewCategories }
                className="flex items-center space-x-3 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover: bg-gray-50 dark: hover, bg-gray-700/50 transition-colors text-left"
              >
                <Target className="w-6 h-6 text-green-600 dark:text-green-400" />
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">Categorization</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Manage categories</div>
                </div>
              </button>
              
              <button
                onClick={onViewDependencies }
                className="flex items-center space-x-3 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover: bg-gray-50 dark: hover, bg-gray-700/50 transition-colors text-left"
              >
                <Shield className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">Dependencies</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Asset relationships</div>
                </div>
              </button>
              
              <button
                onClick={onCreateAsset }
                className="flex items-center space-x-3 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover: bg-gray-50 dark: hover, bg-gray-700/50 transition-colors text-left"
              >
                <Plus className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">Add Asset</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Create new asset</div>
                </div>
              </button>
            </div>
          </div>

          {/* Implementation & Planning */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Implementation & Planning
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                to="/assets/workflow"
                className="flex items-center space-x-3 p-6 border border-gray-200 dark:border-gray-700 rounded-lg hover: bg-gray-50 dark:hover: bg-gray-700/50 transition-colors text-left group"
              >
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg group-hover:bg-blue-200 dark:group-hover:bg-blue-800/50 transition-colors">
                  <CheckSquare className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">Guided Workflow</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Step-by-step implementation guide</div>
                </div>
              </Link>
              
              <Link
                to="/assets/roadmap"
                className="flex items-center space-x-3 p-6 border border-gray-200 dark:border-gray-700 rounded-lg hover: bg-gray-50 dark:hover: bg-gray-700/50 transition-colors text-left group"
              >
                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg group-hover:bg-green-200 dark:group-hover:bg-green-800/50 transition-colors">
                  <Calendar className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">Implementation Roadmap</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Timeline and milestones</div>
                </div>
              </Link>
              
              <Link
                to="/assets/action-plan"
                className="flex items-center space-x-3 p-6 border border-gray-200 dark:border-gray-700 rounded-lg hover: bg-gray-50 dark:hover: bg-gray-700/50 transition-colors text-left group"
              >
                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg group-hover:bg-purple-200 dark:group-hover:bg-purple-800/50 transition-colors">
                  <Target className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">Action Plan</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Detailed tasks and assignments</div>
                </div>
              </Link>
            </div>
          </div>

          {/* Related Links */}
          <RelatedLinks
            links={contextualLinks }
            title="Asset Management Resources"
            maxItems={4}
          />
        </div>
      )}

      {/* Import Modal */}
      { showImportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark: bg-gray-800 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl border border-gray-200 dark, border-gray-700">
            <h3 className="text-xl font-bold text-gray-900 dark: text-white mb-6">
              Import Assets
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark, text-gray-300 mb-2">
                  Select File
                </label>
                <input
                  type="file"
                  accept=".json:.csv"
                  onChange={(e) => setImportFile(e.target.files?.[0] || null)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              {importFile && (
                <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="text-sm text-gray-900 dark:text-white font-medium">
                    {importFile.name }
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-300">
                    {(importFile.size / 1024).toFixed(1)} KB
                  </div>
                </div>
              )}
              
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Supported Formats</h4>
                <ul className="text-sm text-blue-800 dark: text-blue-200 space-y-1">
                  <li>• JSON files from asset management systems</li>
                  <li>• CSV files with asset inventory data</li>
                  <li>• Previous export files from this system</li>
                </ul>
              </div>
              
              { importStatus === 'error' && (
                <div className="p-3 bg-red-50 dark, bg-red-900/20 border border-red-200 dark: border-red-800 rounded-lg">
                  <p className="text-red-700 dark:text-red-300 text-sm">
                    Import failed. Please check the file format and try again.
                  </p>
                </div>
              )}
              
              { importStatus === 'success' && (
                <div className="p-3 bg-green-50 dark: bg-green-900/20 border border-green-200 dark, border-green-800 rounded-lg">
                  <p className="text-green-700 dark:text-green-300 text-sm">
                    Assets imported successfully!
                  </p>
                </div>
              )}
            </div>
            
            <div className="flex space-x-4 mt-8">
              <button
                onClick={() => {
                  setShowImportModal(false);
                  setImportFile(null);
                  setImportStatus('idle');
                }}
                className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover: bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleImportAssets }
                disabled={!importFile || importStatus === 'importing'}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {importStatus === 'importing' ? 'Importing...' : 'Import Assets'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};