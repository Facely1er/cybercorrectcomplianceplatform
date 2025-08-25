import { AssessmentData, UserProfile } from '../shared/types';
import { Asset } from '../shared/types/assets';
import { Task } from '../features/tasks/types';
import { auditLogger } from '../lib/auditLog';

export interface AppData {
  assessments: AssessmentData[];
  userProfile: UserProfile | null;
  assets: Asset[];
  tasks: Task[];
  settings: Record<string, any>;
  lastBackup: Date | null;
  version: string;
}

export class DataService {
  private static instance: DataService;
  private readonly STORAGE_KEYS = {
    ASSESSMENTS: 'cybersecurity-assessments',
    USER_PROFILE: 'user-profile',
    ASSETS: 'asset-inventory',
    TASKS: 'cybersecurity-tasks',
    SETTINGS: 'app-settings',
    BACKUP_METADATA: 'backup-metadata'
  };
  private readonly CURRENT_VERSION = '2.0.0';

  static getInstance(): DataService {
    if (!DataService.instance) {
      DataService.instance = new DataService();
    }
    return DataService.instance;
  }

  private constructor() {
    this.initializeStorage();
    this.migrateDataIfNeeded();
  }

  private initializeStorage(): void {
    // Initialize storage with empty data if not exists
    Object.values(this.STORAGE_KEYS).forEach((key) => {
      if (!localStorage.getItem(key)) {
        const defaultValue = key.includes('settings') ? '{}' : key.includes('profile') ? 'null' : '[]';
        localStorage.setItem(key, defaultValue);
      }
    });

    // Set version if not exists
    if (!localStorage.getItem('app-version')) {
      localStorage.setItem('app-version', this.CURRENT_VERSION);
    }
  }

  private migrateDataIfNeeded(): void {
    const storedVersion = localStorage.getItem('app-version');
    if (!storedVersion || storedVersion !== this.CURRENT_VERSION) {
      this.performDataMigration(storedVersion);
      localStorage.setItem('app-version', this.CURRENT_VERSION);
    }
  }

  private performDataMigration(fromVersion: string | null): void {
    console.log(`Migrating data from version ${fromVersion || 'unknown'} to ${this.CURRENT_VERSION}`);
    
    // Migration logic for different versions
    if (!fromVersion) {
      // First time setup - no migration needed
      return;
    }
    // Add specific migration logic here as the app evolves
    try {
      // Example: Migrate old assessment format
      const oldAssessments = this.getAssessments();
      const migratedAssessments = oldAssessments.map(assessment => ({
        ...assessment,
        assessmentVersion: assessment.assessmentVersion || '1.0.0',
        evidenceLibrary: assessment.evidenceLibrary || [],
        questionEvidence: assessment.questionEvidence || {},
        versionHistory: assessment.versionHistory || []
      }));
      
      this.saveAssessments(migratedAssessments);
      
    } catch (error) {
      console.error('Data migration failed:', error);
      // Don't throw - continue with current data
    }
  }

  // Assessment Data Management
  getAssessments(): AssessmentData[] {
    try {
      const data = localStorage.getItem(this.STORAGE_KEYS.ASSESSMENTS);
      if (!data) return [];
      
      const assessments = JSON.parse(data);
      return assessments.map((assessment: any) => ({
        ...assessment,
        createdAt: new Date(assessment.createdAt),
        lastModified: new Date(assessment.lastModified)
      }));
    } catch (error) {
      console.error('Failed to load assessments:', error);
      return [];
    }
  }

  saveAssessments(assessments: AssessmentData[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEYS.ASSESSMENTS, JSON.stringify(assessments));
      
      auditLogger.log({
        userId: 'current-user',
        action: 'update',
        resource: 'assessments',
        resourceId: 'bulk',
        changes: { count: assessments.length }
      });
    } catch (error) {
      console.error('Failed to save assessments:', error);
      throw new Error('Storage quota exceeded or localStorage unavailable');
    }
  }

  getAssessment(id: string): AssessmentData | null {
    const assessments = this.getAssessments();
    return assessments.find(a => a.id === id) || null;
  }

  saveAssessment(assessment: AssessmentData): void {
    const assessments = this.getAssessments();
    const index = assessments.findIndex(a => a.id === assessment.id);
    
    if (index >= 0) {
      assessments[index] = assessment;
    } else {
      assessments.push(assessment);
    }
    
    this.saveAssessments(assessments);
  }

  deleteAssessment(id: string): void {
    const assessments = this.getAssessments().filter(a => a.id !== id);
    this.saveAssessments(assessments);
  }

  // User Profile Management
  getUserProfile(): UserProfile | null {
    try {
      const data = localStorage.getItem(this.STORAGE_KEYS.USER_PROFILE);
      if (!data || data === 'null') return null;
      
      const profile = JSON.parse(data);
      return {
        ...profile,
        createdAt: new Date(profile.createdAt),
        lastLogin: new Date(profile.lastLogin)
      };
    } catch (error) {
      console.error('Failed to load user profile:', error);
      return null;
    }
  }

  saveUserProfile(profile: UserProfile): void {
    try {
      localStorage.setItem(this.STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
    } catch (error) {
      console.error('Failed to save user profile:', error);
      throw new Error('Failed to save user profile');
    }
  }

  // Asset Management
  getAssets(): Asset[] {
    try {
      const data = localStorage.getItem(this.STORAGE_KEYS.ASSETS);
      if (!data) return [];
      
      const assets = JSON.parse(data);
      return assets.map((asset: any) => ({
        ...asset,
        createdAt: new Date(asset.createdAt),
        updatedAt: new Date(asset.updatedAt),
        lastReviewed: new Date(asset.lastReviewed),
        nextReview: new Date(asset.nextReview),
        riskAssessment: {
          ...asset.riskAssessment,
          lastAssessment: new Date(asset.riskAssessment.lastAssessment),
          nextAssessment: new Date(asset.riskAssessment.nextAssessment)
        },
        lifecycle: {
          ...asset.lifecycle,
          deploymentDate: asset.lifecycle.deploymentDate ? new Date(asset.lifecycle.deploymentDate) : undefined,
          maintenanceSchedule: {
            ...asset.lifecycle.maintenanceSchedule,
            lastMaintenance: asset.lifecycle.maintenanceSchedule.lastMaintenance ? new Date(asset.lifecycle.maintenanceSchedule.lastMaintenance) : undefined,
            nextMaintenance: new Date(asset.lifecycle.maintenanceSchedule.nextMaintenance)
          }
        }
      }));
    } catch (error) {
      console.error('Failed to load assets:', error);
      return [];
    }
  }

  saveAssets(assets: Asset[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEYS.ASSETS, JSON.stringify(assets));
    } catch (error) {
      console.error('Failed to save assets:', error);
      throw new Error('Failed to save assets');
    }
  }

  saveAsset(asset: Asset): void {
    const assets = this.getAssets();
    const index = assets.findIndex(a => a.id === asset.id);
    
    if (index >= 0) {
      assets[index] = asset;
    } else {
      assets.push(asset);
    }
    
    this.saveAssets(assets);
  }

  // Enhanced asset export with classification data
  exportAssetsWithClassification(): string {
    try {
      const assets = this.getAssets();
      const exportData = {
        timestamp: new Date().toISOString(),
        version: '2.0.0',
        metadata: {
          totalAssets: assets.length,
          exportType: 'full-classification',
          categories: this.getAssetCategorySummary(assets),
          classifications: this.getClassificationSummary(assets)
        },
        assets: assets.map(asset => ({
          ...asset,
          exportMetadata: {
            exportedAt: new Date().toISOString(),
            classification: {
              level: asset.informationClassification,
              businessValue: asset.businessValue,
              criticality: asset.criticality,
              riskLevel: asset.riskAssessment.overallRisk
            }
          }
        }))
      };
      
      return JSON.stringify(exportData, null, 2);
    } catch (error) {
      console.error('Failed to export assets with classification:', error);
      throw new Error('Failed to export assets');
    }
  }
  
  // Import assets with enhanced validation
  importAssetsWithValidation(importData: string): { success: boolean; imported: number; errors: string[] } {
    try {
      const data = JSON.parse(importData);
      const errors: string[] = [];
      let imported = 0;
      
      if (!data.assets || !Array.isArray(data.assets)) {
        throw new Error('Invalid file format, missing assets array');
      }
      
      const existingAssets = this.getAssets();
      const validAssets: Asset[] = [];
      
      data.assets.forEach((importedAsset: any, index: number) => {
        try {
          // Validate required fields
          if (!importedAsset.name || !importedAsset.owner || !importedAsset.category) {
            errors.push(`Asset ${index + 1}: Missing required fields (name, owner, category)`);
            return;
          }
          
          // Validate classification levels
          const validClassifications = ['public', 'internal', 'confidential', 'restricted', 'top-secret'];
          if (importedAsset.informationClassification && !validClassifications.includes(importedAsset.informationClassification)) {
            errors.push(`Asset ${index + 1}: Invalid classification level`);
            return;
          }
          
          // Convert dates
          const processedAsset: Asset = {
            ...importedAsset,
            id: importedAsset.id || `imported-${Date.now()}-${index}`,
            createdAt: importedAsset.createdAt ? new Date(importedAsset.createdAt) : new Date(),
            updatedAt: new Date(),
            lastReviewed: new Date(),
            nextReview: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
            riskAssessment: {
              ...importedAsset.riskAssessment,
              lastAssessment: importedAsset.riskAssessment?.lastAssessment ? new Date(importedAsset.riskAssessment.lastAssessment) : new Date(),
              nextAssessment: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
            },
            lifecycle: {
              ...importedAsset.lifecycle,
              deploymentDate: importedAsset.lifecycle?.deploymentDate ? new Date(importedAsset.lifecycle.deploymentDate) : new Date(),
              maintenanceSchedule: {
                ...importedAsset.lifecycle?.maintenanceSchedule,
                nextMaintenance: importedAsset.lifecycle?.maintenanceSchedule?.nextMaintenance ? 
                  new Date(importedAsset.lifecycle.maintenanceSchedule.nextMaintenance) : new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
              }
            }
          };
          
          validAssets.push(processedAsset);
          imported++;
          
        } catch (assetError) {
          errors.push(`Asset ${index + 1}: ${(assetError as Error).message}`);
        }
      });
      
      // Save valid assets
      if (validAssets.length > 0) {
        this.saveAssets([...existingAssets, ...validAssets]);
      }
      
      return {
        success: validAssets.length > 0,
        imported: validAssets.length,
        errors
      };
      
    } catch (error) {
      return {
        success: false,
        imported: 0,
        errors: [`Import failed: ${(error as Error).message}`]
      };
    }
  }
  
  private getAssetCategorySummary(assets: Asset[]): Record<string, number> {
    return assets.reduce((acc, asset) => {
      acc[asset.category] = (acc[asset.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }
  
  private getClassificationSummary(assets: Asset[]): Record<string, number> {
    return assets.reduce((acc, asset) => {
      acc[asset.informationClassification] = (acc[asset.informationClassification] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }

  deleteAsset(id: string): void {
    const assets = this.getAssets().filter(a => a.id !== id);
    this.saveAssets(assets);
  }

  // Task Management
  getTasks(): Task[] {
    try {
      const data = localStorage.getItem(this.STORAGE_KEYS.TASKS);
      if (!data) return [];
      
      const tasks = JSON.parse(data);
      return tasks.map((task: any) => ({
        ...task,
        createdAt: new Date(task.createdAt),
        updatedAt: new Date(task.updatedAt),
        dueDate: new Date(task.dueDate),
        startDate: task.startDate ? new Date(task.startDate) : undefined
      }));
    } catch (error) {
      console.error('Failed to load tasks:', error);
      return [];
    }
  }

  saveTasks(tasks: Task[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEYS.TASKS, JSON.stringify(tasks));
    } catch (error) {
      console.error('Failed to save tasks:', error);
      throw new Error('Failed to save tasks');
    }
  }

  saveTask(task: Task): void {
    const tasks = this.getTasks();
    const index = tasks.findIndex(t => t.id === task.id);
    
    if (index >= 0) {
      tasks[index] = task;
    } else {
      tasks.push(task);
    }
    
    this.saveTasks(tasks);
  }

  deleteTask(id: string): void {
    const tasks = this.getTasks().filter(t => t.id !== id);
    this.saveTasks(tasks);
  }

  // Settings Management
  getSettings(): Record<string, any> {
    try {
      const data = localStorage.getItem(this.STORAGE_KEYS.SETTINGS);
      return data ? JSON.parse(data) : {
        autoSave: true,
        emailNotifications: false,
        reportFormat: 'detailed',
        dataRetention: '12',
        autoBackup: false,
        backupFrequency: 'weekly'
      };
    } catch (error) {
      console.error('Failed to load settings:', error);
      return {};
    }
  }

  saveSettings(settings: Record<string, any>): void {
    try {
      localStorage.setItem(this.STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch (error) {
      console.error('Failed to save settings:', error);
      throw new Error('Failed to save settings');
    }
  }

  // Data Export/Import
  exportAllData(): AppData {
    return {
      assessments: this.getAssessments(),
      userProfile: this.getUserProfile(),
      assets: this.getAssets(),
      tasks: this.getTasks(),
      settings: this.getSettings(),
      lastBackup: new Date(),
      version: this.CURRENT_VERSION
    };
  }

  importAllData(data: AppData): void {
    try {
      // Validate data structure
      if (!data.version) {
        throw new Error('Invalid data format - missing version');
      }
      
      // Import each data type
      if (data.assessments && Array.isArray(data.assessments)) {
        // Convert date strings back to Date objects
        const assessments = data.assessments.map(assessment => ({
          ...assessment,
          createdAt: new Date(assessment.createdAt),
          lastModified: new Date(assessment.lastModified)
        }));
        this.saveAssessments(assessments);
      }

      if (data.userProfile) {
        // Convert date strings back to Date objects
        const profile = {
          ...data.userProfile,
          createdAt: new Date(data.userProfile.createdAt),
          lastLogin: new Date(data.userProfile.lastLogin)
        };
        this.saveUserProfile(profile);
      }

      if (data.assets && Array.isArray(data.assets)) {
        // Convert date strings back to Date objects for assets
        const assets = data.assets.map(asset => ({
          ...asset,
          createdAt: new Date(asset.createdAt),
          updatedAt: new Date(asset.updatedAt),
          lastReviewed: new Date(asset.lastReviewed),
          nextReview: new Date(asset.nextReview),
          riskAssessment: {
            ...asset.riskAssessment,
            lastAssessment: new Date(asset.riskAssessment.lastAssessment),
            nextAssessment: new Date(asset.riskAssessment.nextAssessment)
          },
          lifecycle: {
            ...asset.lifecycle,
            deploymentDate: asset.lifecycle.deploymentDate ? new Date(asset.lifecycle.deploymentDate) : undefined,
            maintenanceSchedule: {
              ...asset.lifecycle.maintenanceSchedule,
              nextMaintenance: new Date(asset.lifecycle.maintenanceSchedule.nextMaintenance),
              lastMaintenance: asset.lifecycle.maintenanceSchedule.lastMaintenance ? new Date(asset.lifecycle.maintenanceSchedule.lastMaintenance) : undefined
            }
          }
        }));
        this.saveAssets(assets);
      }

      if (data.tasks && Array.isArray(data.tasks)) {
        // Convert date strings back to Date objects for tasks
        const tasks = data.tasks.map(task => ({
          ...task,
          createdAt: new Date(task.createdAt),
          updatedAt: new Date(task.updatedAt),
          dueDate: new Date(task.dueDate),
          startDate: task.startDate ? new Date(task.startDate) : undefined
        }));
        this.saveTasks(tasks);
      }

      if (data.settings) {
        this.saveSettings(data.settings);
      }

      // Update backup metadata
      localStorage.setItem(this.STORAGE_KEYS.BACKUP_METADATA, JSON.stringify({
        lastImport: new Date(),
        importedVersion: data.version
      }));

    } catch (error) {
      console.error('Failed to import data:', error);
      throw new Error('Failed to import data');
    }
  }

  // Data Reset and Cleanup
  resetAllData(preserveProfile: boolean = false): void {
    try {
      // Store profile if preserving
      const profileToKeep = preserveProfile ? this.getUserProfile() : null;
      const settingsToKeep = preserveProfile ? this.getSettings() : null;
      
      // Remove all data
      Object.values(this.STORAGE_KEYS).forEach((key) => {
        localStorage.removeItem(key);
      });
      
      // Remove version and backup metadata
      localStorage.removeItem('app-version');
      localStorage.removeItem('backup-metadata');
      
      // Reinitialize
      this.initializeStorage();
      
      // Restore profile and settings if preserving
      if (preserveProfile && profileToKeep) {
        this.saveUserProfile(profileToKeep);
      }
      if (preserveProfile && settingsToKeep) {
        this.saveSettings(settingsToKeep);
      }
      
      auditLogger.log({
        userId: 'current-user',
        action: 'delete',
        resource: 'all-data',
        resourceId: 'bulk-reset',
        metadata: { preservedProfile: preserveProfile }
      });
      
    } catch (error) {
      console.error('Failed to reset data:', error);
      throw new Error('Failed to reset data');
    }
  }

  // Storage Usage Monitoring
  getStorageUsage(): { used: number; total: number; percentage: number } {
    try {
      let totalSize = 0;
      for (const key in localStorage) {
        if (Object.prototype.hasOwnProperty.call(localStorage, key)) {
          totalSize += localStorage[key].length + key.length;
        }
      }

      // Estimate total available (usually ~5-10MB but varies by browser)
      const estimatedTotal = 5 * 1024 * 1024; // 5MB estimate
      const percentage = (totalSize / estimatedTotal) * 100;

      return {
        used: totalSize,
        total: estimatedTotal,
        percentage: Math.min(percentage, 100)
      };
    } catch (error) {
      console.error('Failed to calculate storage usage:', error);
      return {
        used: 0,
        total: 0,
        percentage: 0
      };
    }
  }

  // Data Validation
  validateData(): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    try {
      // Validate assessments
      const assessments = this.getAssessments();
      assessments.forEach((assessment, index) => {
        if (!assessment.id || !assessment.frameworkId) {
          errors.push(`Assessment ${index + 1}: Missing required fields`);
        }
      });

      // Validate assets
      const assets = this.getAssets();
      assets.forEach((asset, index) => {
        if (!asset.id || !asset.name || !asset.owner) {
          errors.push(`Asset ${index + 1}: Missing required fields`);
        }
      });

      // Validate tasks
      const tasks = this.getTasks();
      tasks.forEach((task, index) => {
        if (!task.id || !task.title || !task.assignedBy) {
          errors.push(`Task ${index + 1}: Missing required fields`);
        }
      });

    } catch (error) {
      errors.push(`Data validation error: ${error}`);
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Backup and Recovery
  createBackup(): string {
    try {
      const backupData = {
        ...this.exportAllData(),
        backupDate: new Date(),
        backupId: Date.now().toString(),
        backupType: 'manual',
        description: 'Manual backup created by user',
        checksum: this.generateChecksum(JSON.stringify(this.exportAllData()))
      };
      
      return JSON.stringify(backupData, null, 2);
    } catch (error) {
      console.error('Failed to create backup:', error);
      throw new Error('Failed to create backup');
    }
  }

  private generateChecksum(data: string): string {
    // Simple checksum for data integrity verification
    let hash = 0;
    for (let i = 0; i < data.length; i++) {
      const char = data.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return hash.toString(16);
  }

  restoreFromBackup(backupData: string): void {
    try {
      const data = JSON.parse(backupData);
      
      // Validate backup structure
      if (!data.version || !data.backupDate) {
        throw new Error('Invalid backup format');
      }
      
      // Verify checksum if present
      if (data.checksum) {
        const { checksum, backupDate, backupId, backupType, description, ...dataForChecksum } = data;
        const calculatedChecksum = this.generateChecksum(JSON.stringify(dataForChecksum));
        
        if (checksum !== calculatedChecksum) {
          console.warn('Backup checksum mismatch - data may be corrupted');
        }
      }
      
      // Import the data
      this.importAllData(data);
      
      auditLogger.log({
        userId: 'current-user',
        action: 'import',
        resource: 'backup',
        resourceId: data.backupId || 'unknown',
        metadata: {
          backupDate: data.backupDate,
          itemsRestored: (data.assessments?.length || 0) + (data.assets?.length || 0) + (data.tasks?.length || 0)
        }
      });

    } catch (error) {
      console.error('Failed to restore from backup:', error);
      throw new Error('Failed to restore from backup');
    }
  }

  // Data Cleanup and Optimization
  optimizeStorage(): void {
    try {
      // Remove old versions of assessments (keep only last 5 versions per assessment)
      const assessments = this.getAssessments().map(assessment => ({
        ...assessment,
        versionHistory: assessment.versionHistory?.slice(-5) || []
      }));

      this.saveAssessments(assessments);

      // Clean up old audit logs (keep only last 1000 entries)
      auditLogger.loadFromLocalStorage();
      
    } catch (error) {
      console.error('Failed to optimize storage:', error);
    }
  }

  // Demo data management
  loadDemoData(): void {
    try {
      // Create demo assessment data
      const demoAssessment: AssessmentData = {
        id: 'demo-assessment-001',
        frameworkId: 'nist-csf-v2',
        frameworkName: 'NIST CSF v2.0 - Demo Assessment',
        responses: {
          'gv.oc-q1': 2,
          'gv.oc-q2': 1,
          'gv.rm-q1': 2,
          'id.am-q1': 1,
          'id.am-q2': 2,
          'id.ra-q1': 1,
          'pr.ac-q1': 2,
          'pr.ac-q2': 1,
          'pr.ds-q1': 2,
          'de.ae-q1': 1,
          'de.ae-q2': 0,
          'de.cm-q1': 1,
          'rs.rp-q1': 0,
          'rs.rp-q2': 1,
          'rc.rp-q1': 0,
          'rc.rp-q2': 0
        },
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
        lastModified: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        isComplete: true,
        version: '2.0',
        organizationInfo: {
          name: 'Demo Corporation',
          industry: 'Technology',
          size: 'Medium (51-500 employees)',
          location: 'United States',
          assessor: 'Demo User'
        },
        questionNotes: {
          'gv.oc-q1': 'We have established basic governance but need to formalize processes.',
          'rs.rp-q1': 'Incident response plan is in development.',
          'rc.rp-q1': 'Recovery procedures need to be documented and tested.'
        },
        questionEvidence: {},
        evidenceLibrary: [],
        assessmentVersion: '1.0.0',
        versionHistory: [],
        changeLog: [],
        tags: ['demo', 'nist-csf', 'baseline']
      };

      // Create demo assets
      const demoAssets = [
        {
          id: 'demo-asset-001',
          name: 'Primary Web Server',
          description: 'Main production web server hosting customer applications',
          category: 'hardware',
          subcategory: 'server',
          type: 'server',
          owner: 'IT Operations Manager',
          custodian: 'System Administrator',
          location: {
            type: 'physical',
            building: 'Data Center A',
            room: 'Server Room 1',
            address: '123 Business Park Dr'
          },
          status: 'active',
          criticality: 'critical',
          informationClassification: 'confidential',
          businessValue: 'mission-critical',
          dependencies: [],
          controls: [],
          vulnerabilities: [],
          riskAssessment: {
            overallRisk: 'medium',
            riskFactors: [],
            threats: [],
            impact: {
              confidentiality: 'high',
              integrity: 'high',
              availability: 'critical',
              financialImpact: 'Significant revenue impact if unavailable',
              operationalImpact: 'Complete service disruption',
              reputationalImpact: 'Customer trust impact',
              legalImpact: 'Potential SLA violations'
            },
            likelihood: {
              threatLevel: 'medium',
              vulnerabilityLevel: 'medium',
              exposureLevel: 'medium',
              historicalIncidents: 0,
              industryTrends: 'Increasing cyber threats'
            },
            riskTreatment: {
              strategy: 'mitigate',
              controls: ['firewall', 'monitoring', 'backup'],
              residualRisk: 'low'
            },
            lastAssessment: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
            nextAssessment: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
            assessedBy: 'Security Team'
          },
          compliance: [],
          lifecycle: {
            phase: 'operation',
            deploymentDate: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000),
            maintenanceSchedule: {
              frequency: 'monthly',
              nextMaintenance: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
              maintenanceType: 'preventive',
              assignedTo: 'System Administrator'
            }
          },
          createdAt: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000),
          updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          lastReviewed: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
          nextReview: new Date(Date.now() + 335 * 24 * 60 * 60 * 1000),
          tags: ['production', 'critical', 'web-server'],
          metadata: {
            environment: 'production',
            vendor: 'Dell'
          }
        }
      ];

      // Create demo tasks
      const demoTasks = [
        {
          id: 'demo-task-001',
          title: 'Complete Asset Inventory Review',
          description: 'Review and update the comprehensive asset inventory to ensure all organizational assets are properly documented and classified',
          type: 'assessment',
          priority: 'high',
          status: 'in-progress',
          nistFunction: 'Identify',
          nistCategory: 'Asset Management',
          nistSubcategory: 'ID.AM-01',
          relatedControlId: 'id.am-01',
          assignedTo: ['IT Operations Manager'],
          assignedBy: 'CISO',
          createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
          updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
          dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          estimatedHours: 16,
          progress: 60,
          dependencies: [],
          subtasks: [],
          attachments: [],
          comments: [],
          evidence: [],
          approvalRequired: false,
          tags: ['demo', 'asset-management', 'quarterly'],
          metadata: {
            businessImpact: 'high',
            technicalComplexity: 'medium',
            riskReduction: 15,
            complianceImpact: ['NIST CSF v2.0'],
            successCriteria: ['Asset inventory updated', 'Classifications verified']
          }
        }
      ];

      // Save demo data
      this.saveAssessments([demoAssessment]);
      this.saveAssets(demoAssets);
      this.saveTasks(demoTasks);
      
      // Mark as demo data
      localStorage.setItem('demo-data-loaded', new Date().toISOString());
      
    } catch (error) {
      console.error('Failed to load demo data:', error);
      throw new Error('Failed to load demo data');
    }
  }

  isDemoDataLoaded(): boolean {
    return !!localStorage.getItem('demo-data-loaded');
  }

  clearDemoData(): void {
    try {
      // Reset all data but preserve user profile and settings
      this.resetAllData(true);
      
      // Remove demo data marker
      localStorage.removeItem('demo-data-loaded');
      
      auditLogger.log({
        userId: 'current-user',
        action: 'delete',
        resource: 'demo-data',
        resourceId: 'demo-reset'
      });
      
    } catch (error) {
      console.error('Failed to clear demo data:', error);
      throw new Error('Failed to clear demo data');
    }
  }
}

