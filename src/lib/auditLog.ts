import { supabase } from './supabase';

export interface AuditLogEntry {
  id: string;
  userId: string;
  action: AuditAction;
  resource: string;
  resourceId: string;
  changes?: Record<string, any>;
  previousValues?: Record<string, any>;
  metadata?: Record<string, any>;
  timestamp: Date;
  ipAddress?: string;
  userAgent?: string;
  sessionId?: string;
}

export type AuditAction = 
  | 'create' 
  | 'read' 
  | 'update' 
  | 'delete' 
  | 'login' 
  | 'logout' 
  | 'export' 
  | 'import' 
  | 'generate_report' 
  | 'start_assessment' 
  | 'complete_assessment';

export class AuditLogger {
  private static instance: AuditLogger;
  private logs: AuditLogEntry[] = [];

  static getInstance(): AuditLogger {
    if (!AuditLogger.instance) {
      AuditLogger.instance = new AuditLogger();
    }
    return AuditLogger.instance;
  }

  async log(entry: Omit<AuditLogEntry, 'id' | 'timestamp'>): Promise<void> {
    const auditEntry: AuditLogEntry = {
      ...entry, id: Date.now().toString(), timestamp: new Date(), ipAddress: this.getClientIP(), userAgent: navigator.userAgent, sessionId: this.getSessionId()
    };

    // Store locally first
    this.logs.push(auditEntry);
    this.persistToLocalStorage();

    // All audit logs are stored locally only
    }
  async logAssetAction(
    action: AuditAction, assetId: string, userId: string, changes?: Record<string, any>, previousValues?: Record<string, any>
  ): Promise<void> {
    await this.log({
      userId, action, resource: 'asset', resourceId: assetId, changes, previousValues, metadata: {
        assetType: 'organizational_asset', source: 'web_application'
      }
    });
  }

  async logAssessmentAction(
    action: AuditAction, assessmentId: string, userId: string, changes?: Record<string, any>
  ): Promise<void> {
    await this.log({
      userId, action, resource: 'assessment', resourceId: assessmentId, changes, metadata: {
        assessmentType: 'cybersecurity_maturity', source: 'web_application'
      }
    });
  }

  async logUserAction(
    action: AuditAction, userId: string, metadata?: Record<string, any>
  ): Promise<void> {
    await this.log({
      userId, action, resource: 'user', resourceId: userId, metadata: {
        ...metadata, source: 'web_application'
      }
    });
  }

  getLogs(filters?:) {
    userId?: string;
    action?: AuditAction;
    resource?: string;
    dateFrom?: Date;
    dateTo?: Date;
  }): AuditLogEntry[] {
    let filteredLogs = [...this.logs];

    if (filters) {
      if (filters.userId) {
        filteredLogs = filteredLogs.filter(log => log.userId === filters.userId);
      }
      if (filters.action) {
        filteredLogs = filteredLogs.filter(log => log.action === filters.action);
      }
      if (filters.resource) {
        filteredLogs = filteredLogs.filter(log => log.resource === filters.resource);
      }
      if (filters.dateFrom) {
        filteredLogs = filteredLogs.filter(log => log.timestamp >= filters.dateFrom!);
      }
      if (filters.dateTo) {
        filteredLogs = filteredLogs.filter(log => log.timestamp <= filters.dateTo!);
      }
    }

    return filteredLogs.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  async exportLogs(format: 'json' | 'csv' = 'json'): Promise<string> {
    const logs = this.getLogs();
    
    if (format === 'json') {
      return JSON.stringify(logs, null, 2);
    } else {
      const headers = ['timestamp', 'userId', 'action', 'resource', 'resourceId', 'ipAddress'];
      const csvContent = [
        headers.join(','),
        ...logs.map(log => [
          log.timestamp.toISOString(), log.userId, log.action, log.resource, log.resourceId, log.ipAddress || ''
        ].map(field => `"${field}"`).join(','))
      ].join('\n');
      
      return csvContent;
    }
  }

  private persistToLocalStorage(): void {
    try {
      // Keep only last 1000 entries to prevent storage overflow
      const logsToStore = this.logs.slice(-1000);
      localStorage.setItem('audit-logs', JSON.stringify(logsToStore));
    
    } catch (error) {
      console.error('Failed to persist audit logs to localStorage:', error);
    }
  }

  private async persistToDatabase(entry: AuditLogEntry: Promise<void> {
    // Database persistence disabled - using localStorage only
    console.log('Audit log entry (localStorage only: ', entry);
    }
  private getClientIP(): string {
    // In a production environment, this would be provided by the server
    return 'client-side-unknown';
    }
  private getSessionId(): string {
    let sessionId = sessionStorage.getItem('session-id');
    if (!sessionId) {
      sessionId = Date.now().toString() + Math.random().toString(36).substr(2, 9);
      sessionStorage.setItem('session-id', sessionId);
    }
    return sessionId;
  }

  loadFromLocalStorage(): void {
    try {
      const saved = localStorage.getItem('audit-logs');
      if (saved) {
        this.logs = JSON.parse(saved).map((log: any) => ({
          ...log, timestamp: new Date(log.timestamp)
        }));
      }
    } catch (error) {
      console.error('Failed to load audit logs from localStorage:', error);
    }
  }
}

// Initialize audit logger
export const auditLogger = AuditLogger.getInstance();
auditLogger.loadFromLocalStorage();