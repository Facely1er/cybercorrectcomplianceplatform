import { AssessmentData, Framework } from '../shared/types';
import { errorMonitoring } from '../lib/errorMonitoring';

export interface ReportExportOptions {
  format: 'pdf' | 'json' | 'csv';
  includeExecutiveSummary?: boolean;
  includeDetailedAnalysis?: boolean;
  includeRecommendations?: boolean;
  includeGapAnalysis?: boolean;
  includeNextSteps?: boolean;
  branding?: {
    organizationName?: string;
    logo?: string;
  };
}

export class ReportService {
  private static instance: ReportService;

  static getInstance(): ReportService {
    if (!ReportService.instance) {
      ReportService.instance = new ReportService();
    }
    return ReportService.instance;
  }

  async exportReport(
    assessment: AssessmentData,
    framework: Framework,
    options: ReportExportOptions
  ): Promise<void> {
    try {
      switch (options.format) {
        case 'pdf':
          await this.exportToPDF(assessment, framework, options);
          break;
        case 'json':
          await this.exportToJSON(assessment, framework, options);
          break;
        case 'csv':
          await this.exportToCSV(assessment, framework, options);
          break;
        default:
          throw new Error(`Unsupported format: ${options.format}`);
      }
    } catch (error) {
      errorMonitoring.captureException(error as Error, {
        tags: { type: 'reportExportError' },
        extra: { assessmentId: (assessment as any)?.id, format: options.format },
      });
      throw error;
    }
  }

  private async exportToPDF(
    assessment: AssessmentData,
    framework: Framework,
    options: ReportExportOptions
  ): Promise<void> {
    const reportData = this.generateReportData(assessment, framework);
    const htmlContent = this.generateHTMLReport(assessment, framework, reportData, options);

    // Try File System Access API if available
    const anyWindow = window as any;
    if (typeof anyWindow.showSaveFilePicker === 'function') {
      try {
        const fileHandle = await anyWindow.showSaveFilePicker({
          suggestedName: `${framework.name.replace(/[^a-zA-Z0-9]/g, '-')}-report-${(assessment as any).id || 'assessment'}-${new Date().toISOString().split('T')[0]}.html`,
          types: [{ description: 'HTML Report', accept: { 'text/html': ['.html'] } }]
        });
        const writable = await fileHandle.createWritable();
        await writable.write(htmlContent);
        await writable.close();
        return;
      } catch {
        // Fall through to print method
      }
    }

    // Fallback: open a new window and trigger print
    const printWindow = window.open('', '_blank', 'width=1200,height=800');
    if (!printWindow) throw new Error('Failed to open print window - popup blocked');
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.onload = () => {
      setTimeout(() => {
        printWindow.focus();
        printWindow.print();
        setTimeout(() => printWindow.close(), 1000);
      }, 500);
    };
  }

  private async exportToJSON(
    assessment: AssessmentData,
    framework: Framework,
    _options: ReportExportOptions
  ): Promise<void> {
    const reportData = this.generateReportData(assessment, framework);
    const exportData = {
      assessment,
      framework,
      reportData,
      generatedAt: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `assessment-report-${(assessment as any).id || 'assessment'}.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  private async exportToCSV(
    assessment: AssessmentData,
    framework: Framework,
    _options: ReportExportOptions
  ): Promise<void> {
    const reportData = this.generateReportData(assessment, framework);
    const lines: string[] = [];
    lines.push('Metric,Value');
    lines.push(`Framework,${this.escapeCsv(framework.name)} v${this.escapeCsv(String((framework as any).version ?? ''))}`);
    lines.push(`Assessment ID,${this.escapeCsv(String((assessment as any).id ?? ''))}`);
    lines.push(`Overall Score,${this.escapeCsv(String(reportData.overallScore))}`);
    lines.push(`Total Questions,${this.escapeCsv(String(reportData.totalQuestions))}`);
    lines.push(`Answered Questions,${this.escapeCsv(String(reportData.answeredQuestions))}`);

    const blob = new Blob([lines.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `assessment-report-${(assessment as any).id || 'assessment'}.csv`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  private escapeCsv(value: string): string {
    if (value.includes(',') || value.includes('"') || value.includes('\n')) {
      return `"${value.replace(/"/g, '""')}"`;
    }
    return value;
  }

  private generateReportData(assessment: AssessmentData, framework: Framework) {
    // Minimal, safe computations to avoid relying on deep shapes
    const totalQuestions = (assessment as any)?.questions?.length ?? 0;
    const answeredQuestions = (assessment as any)?.answers ? Object.keys((assessment as any).answers).length : 0;
    const overallScore = Math.round(((assessment as any)?.score ?? (answeredQuestions / Math.max(1, totalQuestions))) * 100) % 101;

    return {
      totalQuestions,
      answeredQuestions,
      overallScore,
      sectionScores: [] as Array<{ name: string; score: number; answered: number; total: number }>,
    };
  }

  private generateHTMLReport(
    assessment: AssessmentData,
    framework: Framework,
    reportData: any,
    options: ReportExportOptions
  ): string {
    const organizationName = options.branding?.organizationName || (assessment as any)?.organizationInfo?.name || 'Organization';
    const reportDate = new Date().toLocaleDateString();

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8" />
          <title>${framework.name} Assessment Report - ${organizationName}</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif; margin: 0; padding: 20px; line-height: 1.6; color: #333; background: #fff; }
            .header { text-align: center; margin-bottom: 40px; border-bottom: 3px solid #2563eb; padding-bottom: 20px; }
            .header h1 { color: #1e40af; font-size: 28px; margin: 0 0 10px; font-weight: bold; }
            .subtitle { color: #6b7280; font-size: 16px; margin: 0 0 5px; }
            .section { margin-bottom: 30px; }
            .score { font-size: 36px; font-weight: bold; color: #2563eb; text-align: center; margin: 20px 0; }
            table { width: 100%; border-collapse: collapse; margin: 15px 0; }
            th, td { border: 1px solid #d1d5db; padding: 12px 8px; text-align: left; font-size: 14px; }
            th { background-color: #f9fafb; font-weight: 600; color: #374151; }
            .footer { margin-top: 40px; text-align: center; font-size: 12px; color: #6b7280; border-top: 1px solid #e5e7eb; padding-top: 20px; }
            @media print { .no-print { display: none !important; } }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>${framework.name} Assessment Report</h1>
            <div class="subtitle">Organization: ${organizationName}</div>
            <div class="subtitle">Generated on ${reportDate}</div>
            <div class="subtitle">Assessment ID: ${(assessment as any).id ?? ''}</div>
          </div>

          <div class="section">
            <h2>Executive Summary</h2>
            <div class="score">Overall Score: ${reportData.overallScore}%</div>
            <p><strong>Assessment Completion Date:</strong> ${new Date().toLocaleDateString()}</p>
          </div>

          <div class="footer">
            <p>Report generated by CyberCorrect™ Cybersecurity Compliance Platform</p>
            <p>Assessment ID: ${(assessment as any).id ?? ''} | Generated: ${reportDate} | Framework: ${framework.name} ${(framework as any).version ?? ''}</p>
            <p>This report contains confidential information. Handle according to your organization's data classification policies.</p>
          </div>
        </body>
      </html>
    `;
  }
}

export const reportService = new ReportService(); 