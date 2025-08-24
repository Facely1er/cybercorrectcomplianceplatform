import { AssessmentData, UserProfile } from '../shared/types';
import { Asset } from '../shared/types/assets';
import { Task } from '../features/tasks/types';

export interface AppData {
  assessments: AssessmentData[];
  userProfile: UserProfile | null;
  assets: Asset[];
  tasks: Task[];
  settings: Record<string, any>;
  lastBackup: Date | null;
  version: string;
}

const DEFAULT_SETTINGS = {
  autoSave: true,
  emailNotifications: false,
  reportFormat: 'detailed',
  dataRetention: '12',
  autoBackup: false,
  backupFrequency: 'weekly'
};

export class DataService {
  private static instance: DataService;

  private readonly STORAGE_KEYS = {
    ASSESSMENTS: 'cybersecurity-assessments',
    USER_PROFILE: 'user-profile',
    ASSETS: 'asset-inventory',
    TASKS: 'cybersecurity-tasks',
    SETTINGS: 'app-settings',
    BACKUP_METADATA: 'backup-metadata'
  } as const;

  private readonly CURRENT_VERSION = '2.0.0';

  static getInstance(): DataService {
    if (!DataService.instance) {
      DataService.instance = new DataService();
    }
    return DataService.instance;
  }

  private constructor() {
    this.initializeStorage();
  }

  private initializeStorage(): void {
    Object.values(this.STORAGE_KEYS).forEach((key) => {
      if (localStorage.getItem(key) === null) {
        const defaultValue = key.includes('settings') ? JSON.stringify(DEFAULT_SETTINGS) : key.includes('profile') ? 'null' : '[]';
        localStorage.setItem(key, defaultValue);
      }
    });

    if (!localStorage.getItem('app-version')) {
      localStorage.setItem('app-version', this.CURRENT_VERSION);
    }
  }

  // Settings
  getSettings(): typeof DEFAULT_SETTINGS {
    try {
      const data = localStorage.getItem(this.STORAGE_KEYS.SETTINGS);
      return data ? { ...DEFAULT_SETTINGS, ...(JSON.parse(data) || {}) } : { ...DEFAULT_SETTINGS };
    } catch {
      return { ...DEFAULT_SETTINGS };
    }
  }

  saveSettings(settings: Partial<typeof DEFAULT_SETTINGS>): void {
    const current = this.getSettings();
    localStorage.setItem(this.STORAGE_KEYS.SETTINGS, JSON.stringify({ ...current, ...settings }));
  }

  getStorageUsage(): { used: number; total: number; percentage: number } {
    try {
      let totalSize = 0;
      for (const key in localStorage) {
        if (Object.prototype.hasOwnProperty.call(localStorage, key)) {
          const value = localStorage.getItem(key) || '';
          totalSize += key.length + value.length;
        }
      }
      const estimatedTotal = 5 * 1024 * 1024;
      const percentage = (totalSize / estimatedTotal) * 100;
      return { used: totalSize, total: estimatedTotal, percentage: Math.min(percentage, 100) };
    } catch {
      return { used: 0, total: 5 * 1024 * 1024, percentage: 0 };
    }
  }

  resetAllData(preserveProfile = false): void {
    try {
      const profile = preserveProfile ? this.getUserProfile() : null;
      const settings = this.getSettings();
      Object.values(this.STORAGE_KEYS).forEach((key) => localStorage.removeItem(key));
      localStorage.removeItem('app-version');
      this.initializeStorage();
      if (preserveProfile && profile) this.saveUserProfile(profile);
      this.saveSettings(settings);
    } catch {
      // ignore
    }
  }

  isDemoDataLoaded(): boolean {
    return !!localStorage.getItem('demo-data-loaded');
  }

  clearDemoData(): void {
    this.resetAllData(true);
    localStorage.removeItem('demo-data-loaded');
  }

  // Assessment Data Management
  getAssessments(): AssessmentData[] {
    try {
      const data = localStorage.getItem(this.STORAGE_KEYS.ASSESSMENTS);
      if (!data) return [];
      const assessments = JSON.parse(data);
      return assessments.map((a: any) => ({
        ...a,
        createdAt: a.createdAt ? new Date(a.createdAt) : new Date(),
        lastModified: a.lastModified ? new Date(a.lastModified) : new Date()
      }));
    } catch {
      return [];
    }
  }

  saveAssessments(assessments: AssessmentData[]): void {
    localStorage.setItem(this.STORAGE_KEYS.ASSESSMENTS, JSON.stringify(assessments));
  }

  getAssessment(id: string): AssessmentData | null {
    const assessments = this.getAssessments();
    return assessments.find((a) => a.id === id) || null;
  }

  saveAssessment(assessment: AssessmentData): void {
    const assessments = this.getAssessments();
    const index = assessments.findIndex((a) => a.id === assessment.id);
    if (index >= 0) {
      assessments[index] = assessment;
    } else {
      assessments.push(assessment);
    }
    this.saveAssessments(assessments);
  }

  deleteAssessment(id: string): void {
    const assessments = this.getAssessments().filter((a) => a.id !== id);
    this.saveAssessments(assessments);
  }

  // Assets
  getAssets(): Asset[] {
    try {
      const data = localStorage.getItem(this.STORAGE_KEYS.ASSETS);
      if (!data) return [];
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  saveAssets(assets: Asset[]): void {
    localStorage.setItem(this.STORAGE_KEYS.ASSETS, JSON.stringify(assets));
  }

  saveAsset(asset: Asset): void {
    const assets = this.getAssets();
    const index = assets.findIndex((a: any) => a.id === (asset as any).id);
    if (index >= 0) {
      (assets as any)[index] = asset as any;
    } else {
      (assets as any).push(asset as any);
    }
    this.saveAssets(assets as any);
  }

  // User Profile
  getUserProfile(): UserProfile | null {
    try {
      const data = localStorage.getItem(this.STORAGE_KEYS.USER_PROFILE);
      if (!data || data === 'null') return null;
      const profile = JSON.parse(data);
      return {
        ...profile,
        createdAt: profile.createdAt ? new Date(profile.createdAt) : new Date(),
        lastLogin: profile.lastLogin ? new Date(profile.lastLogin) : new Date()
      } as UserProfile;
    } catch {
      return null;
    }
  }

  saveUserProfile(profile: UserProfile): void {
    localStorage.setItem(this.STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
  }
}

export const dataService = DataService.getInstance();

