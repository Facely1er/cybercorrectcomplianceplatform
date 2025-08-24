import { AssessmentData, UserProfile } from '../shared/types';
import { Asset } from '../shared/types/assets';

export interface AppData {
	assessments: AssessmentData[];
	userProfile: UserProfile | null;
	assets: Asset[];
	tasks: any[];
	settings: Record<string, any>;
	lastBackup: Date | null;
	version: string;
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
	};
	private readonly CURRENT_VERSION = '2.0.0';

	static getInstance(): DataService {
		if (!DataService.instance) DataService.instance = new DataService();
		return DataService.instance;
	}

	private constructor() {
		this.initializeStorage();
	}

	private initializeStorage(): void {
		Object.values(this.STORAGE_KEYS).forEach((key) => {
			if (!localStorage.getItem(key)) {
				const defaultValue = key.includes('settings') ? '{}' : key.includes('profile') ? 'null' : '[]';
				localStorage.setItem(key, defaultValue);
			}
		});
		if (!localStorage.getItem('app-version')) {
			localStorage.setItem('app-version', this.CURRENT_VERSION);
		}
	}

	// Assessments
	getAssessments(): AssessmentData[] {
		try {
			const data = localStorage.getItem(this.STORAGE_KEYS.ASSESSMENTS);
			if (!data) return [];
			const assessments: AssessmentData[] = JSON.parse(data);
			return assessments.map((a: any) => ({
				...a,
				createdAt: a.createdAt ? new Date(a.createdAt) : new Date(),
				lastModified: a.lastModified ? new Date(a.lastModified) : new Date(),
			}));
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
			if (!data) return [];
			const assets: Asset[] = JSON.parse(data);
			return assets.map((asset: any) => ({
				...asset,
				createdAt: asset.createdAt ? new Date(asset.createdAt) : new Date(),
				updatedAt: asset.updatedAt ? new Date(asset.updatedAt) : new Date(),
			}));
		} catch {
			return [];
		}
	}

	saveAssets(assets: Asset[]): void {
		localStorage.setItem(this.STORAGE_KEYS.ASSETS, JSON.stringify(assets));
	}

	saveAsset(asset: Asset): void {
		const assets = this.getAssets();
		const index = assets.findIndex((a) => a.id === asset.id);
		if (index >= 0) assets[index] = asset;
		else assets.push(asset);
		this.saveAssets(assets);
	}

	deleteAsset(id: string): void {
		this.saveAssets(this.getAssets().filter((a) => a.id !== id));
	}

	// Settings
	getSettings(): Record<string, any> {
		try {
			const raw = localStorage.getItem(this.STORAGE_KEYS.SETTINGS) || '{}';
			return JSON.parse(raw);
		} catch {
			return {};
		}
	}

	saveSettings(settings: Record<string, any>): void {
		localStorage.setItem(this.STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
	}

	getStorageUsage() {
		// Rough estimate of localStorage usage
		let used = 0;
		for (const key in localStorage) {
			if (Object.prototype.hasOwnProperty.call(localStorage, key)) {
				const value = localStorage.getItem(key);
				used += (key.length + (value ? value.length : 0));
			}
		}
		const total = 5 * 1024 * 1024; // 5MB typical quota
		return { used, total, percentage: (used / total) * 100 };
	}

	// Backups and imports (minimal stubs for UI flows)
	createBackup(): string {
		const data = {
			version: this.CURRENT_VERSION,
			assessments: this.getAssessments(),
			assets: this.getAssets(),
			tasks: [],
			settings: this.getSettings(),
			backupDate: new Date().toISOString(),
		};
		return JSON.stringify(data);
	}

	restoreFromBackup(json: string): void {
		try {
			const data = JSON.parse(json);
			if (Array.isArray(data.assessments)) this.saveAssessments(data.assessments);
			if (Array.isArray(data.assets)) this.saveAssets(data.assets);
			if (data.settings && typeof data.settings === 'object') this.saveSettings(data.settings);
		} catch {}
	}

	importAllData(data: any): void {
		if (Array.isArray(data.assessments)) this.saveAssessments(data.assessments);
		if (Array.isArray(data.assets)) this.saveAssets(data.assets);
		if (data.settings && typeof data.settings === 'object') this.saveSettings(data.settings);
	}

	resetAllData(): void {
		this.saveAssessments([]);
		this.saveAssets([]);
		this.saveSettings({});
	}

	// Demo helpers
	isDemoDataLoaded(): boolean {
		return (this.getAssessments().length + this.getAssets().length) > 0;
	}

	loadDemoData(): void {
		const sampleAssessment: AssessmentData = {
			id: `a-${Date.now()}`,
			frameworkId: 'nist-csf',
			frameworkName: 'NIST CSF',
			description: 'Demo assessment',
			sections: [],
			responses: {},
			questionNotes: {},
			questionEvidence: {},
			evidenceLibrary: [],
			versionHistory: [],
			changeLog: [],
			createdAt: new Date(),
			lastModified: new Date(),
			isComplete: false,
		};
		const sampleAsset: Asset = {
			id: `asset-${Date.now()}`,
			name: 'Demo Asset',
			owner: 'Demo Owner',
			category: 'Hardware',
			createdAt: new Date(),
			updatedAt: new Date(),
			criticality: 'medium' as any,
			businessValue: 'medium' as any,
			informationClassification: 'internal' as any,
			riskAssessment: { overallRisk: 'medium' as any } as any,
			lifecycle: {} as any,
		};
		this.saveAssessment(sampleAssessment);
		this.saveAsset(sampleAsset);
	}
}

export const dataService = DataService.getInstance();

