import React, { useState } from 'react';
import { ChevronLeft, Save, Download, Upload, Trash2, RefreshCw, AlertTriangle, CheckCircle } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../hooks/useAuth';
import { useAssessments } from '../../hooks/useAssessments';
import { dataService } from '../../../services/dataService';

interface SettingsViewProps {
  onBack: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ onBack }) => {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();
  const { resetAllAssessments } = useAssessments();
  const [settings, setSettings] = useState(dataService.getSettings());
  const [storageUsage, setStorageUsage] = useState(dataService.getStorageUsage());
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [importStatus, setImportStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Update storage usage periodically
  React.useEffect(() => {
    const interval = setInterval(() => {
      setStorageUsage(dataService.getStorageUsage());
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const handleSettingChange = (key: string, value: any) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    dataService.saveSettings(newSettings);
  };

  const addNotification = (type: 'success' | 'error' | 'warning' | 'info', message: string) => {
    // This would normally come from props, but we'll implement it locally for now
    console.log(`${type.toUpperCase()}: ${message}`);
  };

  const handleExportAllData = () => {
    try {
      const allData = dataService.exportAllData();
      const dataStr = JSON.stringify(allData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `cybersecurity-platform-backup-${new Date().toISOString().split('T')[0]}.json`;
      link.click();
      URL.revokeObjectURL(url);
      addNotification('success', 'Data exported successfully');
    } catch (error) {
      console.error('Export failed:', error);
      addNotification('error', 'Failed to export data');
    }
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target?.result as string);
        dataService.importAllData(importedData);
        
        // Reload settings
        setSettings(dataService.getSettings());
        
        setImportStatus('success');
        addNotification('success', 'Data imported successfully');
        setTimeout(() => setImportStatus('idle'), 3000);
      } catch (error) {
        setImportStatus('error');
        addNotification('error', 'Failed to import data');
        setTimeout(() => setImportStatus('idle'), 3000);
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  const clearAllData = () => {
    if (showDeleteConfirm) {
      if (window.confirm('This will permanently delete ALL your assessment data. This action cannot be undone. Are you sure?')) {
        handleDataReset();
      }
    } else {
      setShowDeleteConfirm(true);
      setTimeout(() => setShowDeleteConfirm(false), 5000);
    }
  };

  const handleDataReset = async () => {
    try {
      // Reset all data using centralized service
      dataService.resetAllData();
      
      // Show success message before reload
      alert('All assessment data has been reset successfully');
      
      // Reload the application
      window.location.reload();
    } catch (error) {
      console.error('Failed to reset data:', error);
      alert('Failed to reset data. Please try again.');
    }
  };

  const resetSettings = () => {
    const defaultSettings = {
      autoSave: true,
      emailNotifications: false,
      reportFormat: 'detailed' as const,
      dataRetention: '12' as const,
      autoBackup: false,
      backupFrequency: 'weekly' as const
    };
    setSettings(defaultSettings);
    dataService.saveSettings(defaultSettings);
  };

  // Storage usage display
  const getStorageStatusColor = (percentage: number) => {
    if (percentage > 80) return 'text-red-600 dark:text-red-400';
    if (percentage > 60) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-green-600 dark:text-green-400';
  };
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 mb-8">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
                <span>Back to Dashboard</span>
              </button>
              <div className="h-6 w-px bg-gray-300 dark:bg-gray-600" />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Settings
              </h1>
            </div>
            <button
              onClick={resetSettings}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Reset to Defaults</span>
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {/* Import Status */}
        {importStatus !== 'idle' && (
          <div className={`p-4 rounded-lg flex items-center space-x-3 ${
            importStatus === 'success' 
              ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' 
              : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
          }`}>
            {importStatus === 'success' ? (
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
            )}
            <span className={`font-medium ${
              importStatus === 'success' 
                ? 'text-green-800 dark:text-green-200' 
                : 'text-red-800 dark:text-red-200'
            }`}>
              {importStatus === 'success' 
                ? 'Data imported successfully!' 
                : 'Import failed. Please check the file format.'
              }
            </span>
          </div>
        )}

        {/* Appearance Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Appearance & Language
          </h2>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Theme
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Choose between light and dark mode
                </p>
              </div>
              <button
                onClick={toggleTheme}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  theme === 'dark' ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Language
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Select your preferred language
                </p>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">English</span>
            </div>
          </div>
        </div>

        {/* Assessment Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Assessment Preferences
          </h2>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Auto-save
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Automatically save progress while taking assessments
                </p>
              </div>
              <button
                onClick={() => handleSettingChange('autoSave', !settings.autoSave)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.autoSave ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.autoSave ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Default Report Format
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Choose the default format for generated reports
                </p>
              </div>
              <select
                value={settings.reportFormat}
                onChange={(e) => handleSettingChange('reportFormat', e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="detailed">Detailed Report</option>
                <option value="summary">Summary Report</option>
                <option value="executive">Executive Summary</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Auto Backup
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Automatically create data backups
                </p>
              </div>
              <button
                onClick={() => handleSettingChange('autoBackup', !settings.autoBackup)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.autoBackup ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.autoBackup ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {settings.autoBackup && (
              <div className="flex items-center justify-between ml-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Backup Frequency
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    How often to create automatic backups
                  </p>
                </div>
                <select
                  value={settings.backupFrequency}
                  onChange={(e) => handleSettingChange('backupFrequency', e.target.value)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
            )}
          </div>

          {/* Storage Usage */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Storage Usage
            </h3>
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-300">Local Storage</span>
                <span className={`text-sm font-medium ${getStorageStatusColor(storageUsage.percentage)}`}>
                  {storageUsage.percentage.toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    storageUsage.percentage > 80 ? 'bg-alert-coral' :
                    storageUsage.percentage > 60 ? 'bg-premium-gold' :
                    'bg-success-green'
                  }`}
                  style={{ width: `${Math.min(storageUsage.percentage, 100)}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                <span>{(storageUsage.used / 1024).toFixed(1)} KB used</span>
                <span>{(storageUsage.total / 1024 / 1024).toFixed(1)} MB total</span>
              </div>
              {storageUsage.percentage > 80 && (
                <div className="mt-2 text-xs text-alert-coral dark:text-dark-alert">
                  Storage is nearly full. Consider exporting and clearing old data.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Notifications
          </h2>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Email Notifications
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Receive email updates about assessment progress and reminders
                </p>
              </div>
              <button
                onClick={() => handleSettingChange('emailNotifications', !settings.emailNotifications)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.emailNotifications ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Data Management */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Data Management
          </h2>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Data Retention
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  How long to keep assessment data
                </p>
              </div>
              <select
                value={settings.dataRetention}
                onChange={(e) => handleSettingChange('dataRetention', e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="6">6 months</option>
                <option value="12">12 months</option>
                <option value="24">24 months</option>
                <option value="indefinite">Indefinite</option>
              </select>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Data Export & Import
              </h3>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleExportAllData}
                  className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Export All Data</span>
                </button>
                
                <label className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors cursor-pointer">
                  <Upload className="w-4 h-4" />
                  <span>Import Data</span>
                  <input 
                    type="file" 
                    accept=".json" 
                    onChange={handleImport}
                    className="hidden" 
                  />
                </label>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                Export creates a backup of all your assessments, settings, and profile data. 
                Import allows you to restore from a previous backup.
              </p>
             
             <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
               <p className="text-xs text-blue-800 dark:text-blue-200">
                 <strong>Tip:</strong> Regular backups ensure your CMMC compliance data is safely preserved. 
                 Export your data before major updates or when changing devices.
               </p>
             </div>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h3 className="text-lg font-medium text-red-600 dark:text-red-400 mb-4">
                Danger Zone
              </h3>
              <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                <h4 className="font-medium text-red-800 dark:text-red-200 mb-2">Reset Assessment Data</h4>
                <p className="text-sm text-red-700 dark:text-red-300 mb-3">
                  This will delete all your assessments, tasks, and related data. Your user profile and settings will be preserved.
                </p>
                <button
                  onClick={async () => {
                    if (window.confirm('Delete all assessment data? This cannot be undone.')) {
                      try {
                        await resetAllAssessments();
                        alert('Assessment data reset successfully');
                      } catch (error) {
                        alert('Failed to reset assessment data');
                      }
                    }
                  }}
                  className="bg-alert-coral text-white px-4 py-2 rounded-lg hover:bg-alert-coral/90 transition-colors text-sm"
                >
                  Reset Assessment Data Only
                </button>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={clearAllData}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    showDeleteConfirm 
                      ? 'bg-alert-coral/90 text-white' 
                      : 'bg-alert-coral text-white hover:bg-alert-coral/90'
                  }`}
                >
                  <Trash2 className="w-4 h-4" />
                  <span>{showDeleteConfirm ? 'Click Again to Confirm' : 'Complete Data Reset'}</span>
                </button>
                
                <button
                  onClick={() => window.location.reload()}
                  className="flex items-center space-x-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Reload Application</span>
                </button>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                <strong>Warning:</strong> Clearing all data will permanently delete all assessments, 
                settings, and profile information. This action cannot be undone.
              </p>
             
             <div className="mt-3 p-3 bg-alert-coral/10 dark:bg-dark-alert/20 rounded-lg border border-alert-coral/20 dark:border-dark-alert/30">
               <p className="text-xs text-alert-coral dark:text-dark-alert">
                 <strong>CMMC Compliance Note:</strong> Resetting data will remove all CMMC assessment progress, 
                 evidence collections, and compliance documentation. Ensure you have exported your data first.
               </p>
             </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={() => {
              dataService.saveSettings(settings);
              addNotification('success', 'Settings saved successfully');
            }}
            className="flex items-center space-x-2 bg-primary-teal text-white px-6 py-3 rounded-lg hover:bg-primary-teal/90 transition-colors font-medium"
          >
            <Save className="w-5 h-5" />
            <span>Save Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
};