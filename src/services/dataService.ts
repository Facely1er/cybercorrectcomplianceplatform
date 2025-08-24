import { AssessmentData, UserProfile } from '../shared/types';
import { Asset } from '../shared/types/assets';
import { Task } from '../features/tasks/types';

interface AppSettings {
  autoSave: boolean;
  emailNotifications: boolean;
  reportFormat: 'detailed' | 'summary' | 'executive';
  autoBackup: boolean;
  backupFrequency: 'daily' | 'weekly' | 'monthly';
  dataRetention: '6' | '12' | '24' | 'indefinite';
}

interface StorageUsage {
  used: number;
  total: number;
  percentage: number;
}

class DataService {
  private static instance: DataService;
  private readonly STORAGE_KEYS = {
    ASSESSMENTS: 'cybersecurity-assessments',
    USER_PROFILE: 'user-profile',
    ASSETS: 'asset-inventory',
    TASKS: 'cybersecurity-tasks',
    SETTINGS: 'app-settings',
    BACKUP_METADATA: 'backup-metadata',
  } as const;

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
    const defaults: Record<string, string> = {
      [this.STORAGE_KEYS.ASSESSMENTS]: '[]',
      [this.STORAGE_KEYS.USER_PROFILE]: 'null',
      [this.STORAGE_KEYS.ASSETS]: '[]',
      [this.STORAGE_KEYS.TASKS]: '[]',
      [this.STORAGE_KEYS.SETTINGS]: JSON.stringify({
        autoSave: true,
        emailNotifications: false,
        reportFormat: 'detailed',
        autoBackup: false,
        backupFrequency: 'weekly',
        dataRetention: '12',
      } satisfies AppSettings),
      [this.STORAGE_KEYS.BACKUP_METADATA]: JSON.stringify({}),
    };

    Object.entries(defaults).forEach(([key, value]) => {
      if (localStorage.getItem(key) === null) {
        localStorage.setItem(key, value);
      }
    });
  }

  // Assessments
  getAssessments(): AssessmentData[] {
    try {
      const data = localStorage.getItem(this.STORAGE_KEYS.ASSESSMENTS);
      return data ? (JSON.parse(data) as AssessmentData[]).map((a: any) => ({
        ...a,
        createdAt: new Date(a.createdAt),
        lastModified: new Date(a.lastModified),
      })) : [];
    } catch {
      return [];
    }
  }

  saveAssessments(assessments: AssessmentData[]): void {
    localStorage.setItem(this.STORAGE_KEYS.ASSESSMENTS, JSON.stringify(assessments));
  }

  getAssessment(id: string): AssessmentData | null {
    return this.getAssessments().find((a) => a.id === id) || null;
  }

  saveAssessment(assessment: AssessmentData): void {
    const assessments = this.getAssessments();
    const index = assessments.findIndex((a) => a.id === assessment.id);
    if (index >= 0) assessments[index] = assessment;
    else assessments.push(assessment);
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
      return data ? (JSON.parse(data) as Asset[]).map((asset: any) => ({
        ...asset,
        createdAt: new Date(asset.createdAt),
        updatedAt: new Date(asset.updatedAt),
      })) : [];
    } catch {
      return [];
    }
  }

  saveAssets(assets: Asset[]): void {
    localStorage.setItem(this.STORAGE_KEYS.ASSETS, JSON.stringify(assets));
  }

  saveAsset(asset: Asset): void {
    const assets = this.getAssets();
    const index = assets.findIndex((a) => a.id === (asset as any).id);
    if (index >= 0) assets[index] = asset;
    else assets.push(asset);
    this.saveAssets(assets);
  }

  deleteAsset(assetId: string): void {
    const assets = this.getAssets().filter((a: any) => a.id !== assetId);
    this.saveAssets(assets);
  }

  // Tasks (minimal: used by taskService)
  getTasks(): Task[] {
    try {
      const data = localStorage.getItem(this.STORAGE_KEYS.TASKS);
      return data ? (JSON.parse(data) as Task[]).map((t: any) => ({
        ...t,
        createdAt: t.createdAt ? new Date(t.createdAt) : undefined,
        updatedAt: t.updatedAt ? new Date(t.updatedAt) : undefined,
        dueDate: t.dueDate ? new Date(t.dueDate) : undefined,
      })) : [];
    } catch {
      return [];
    }
  }

  saveTask(task: Task): void {
    const tasks = this.getTasks();
    const index = tasks.findIndex((t: any) => t.id === task.id);
    if (index >= 0) tasks[index] = task;
    else tasks.push(task);
    localStorage.setItem(this.STORAGE_KEYS.TASKS, JSON.stringify(tasks));
  }

  deleteTask(taskId: string): void {
    const tasks = this.getTasks().filter((t: any) => t.id !== taskId);
    localStorage.setItem(this.STORAGE_KEYS.TASKS, JSON.stringify(tasks));
  }

  // Settings
  getSettings(): AppSettings {
    try {
      const data = localStorage.getItem(this.STORAGE_KEYS.SETTINGS);
      return data ? (JSON.parse(data) as AppSettings) : {
        autoSave: true,
        emailNotifications: false,
        reportFormat: 'detailed',
        autoBackup: false,
        backupFrequency: 'weekly',
        dataRetention: '12',
      };
    } catch {
      return {
        autoSave: true,
        emailNotifications: false,
        reportFormat: 'detailed',
        autoBackup: false,
        backupFrequency: 'weekly',
        dataRetention: '12',
      };
    }
  }

  saveSettings(settings: AppSettings): void {
    localStorage.setItem(this.STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  }

  getStorageUsage(): StorageUsage {
    const used = new Blob(Object.values(localStorage)).size;
    const total = 5 * 1024 * 1024; // 5MB typical localStorage budget
    return { used, total, percentage: (used / total) * 100 };
  }

  // Backups (minimal JSON export/import)
  createBackup(): string {
    const payload = {
      version: '2.0.0',
      backupDate: new Date().toISOString(),
      assessments: this.getAssessments(),
      assets: this.getAssets(),
      tasks: this.getTasks(),
      settings: this.getSettings(),
    };
    return JSON.stringify(payload, null, 2);
  }

  restoreFromBackup(json: string): void {
    const data = JSON.parse(json);
    if (data.assessments) this.saveAssessments(data.assessments);
    if (data.assets) this.saveAssets(data.assets);
    if (data.tasks) localStorage.setItem(this.STORAGE_KEYS.TASKS, JSON.stringify(data.tasks));
    if (data.settings) this.saveSettings(data.settings);
  }

  importAllData(data: any): void {
    if (data.assessments) this.saveAssessments(data.assessments);
    if (data.assets) this.saveAssets(data.assets);
    if (data.tasks) localStorage.setItem(this.STORAGE_KEYS.TASKS, JSON.stringify(data.tasks));
    if (data.settings) this.saveSettings(data.settings);
  }

  // Demo data flags
  isDemoDataLoaded(): boolean {
    const assessments = this.getAssessments();
    return assessments.some((a: any) => a?.id?.toString().startsWith('demo-'));
  }

  clearDemoData(): void {
    const nonDemo = this.getAssessments().filter((a: any) => !a?.id?.toString().startsWith('demo-'));
    this.saveAssessments(nonDemo);
  }

  resetAllData(factoryReset = false): void {
    if (factoryReset) {
      localStorage.clear();
      this.initializeStorage();
      return;
    }
    this.saveAssessments([]);
    this.saveAssets([]);
    localStorage.setItem(this.STORAGE_KEYS.TASKS, '[]');
  }
}

export const dataService = DataService.getInstance();

