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
        extra: { assessmentId: assessment.id, format: options.format }
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
    this.generatePDFWithPrint(htmlContent);
  }

  private generateHTMLReport(
    assessment: AssessmentData,
    framework: Framework,
    reportData: any,
    options: ReportExportOptions
  ): string {
    const organizationName = options.branding?.organizationName || assessment.organizationInfo?.name || 'Organization';
    const reportDate = new Date().toLocaleDateString();

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${framework.name} Assessment Report - ${organizationName}</title>
          <meta charset="UTF-8">
          <style>
            body { font-family: system-ui, sans-serif; margin: 0; padding: 20px; color: #111827; }
            .header { text-align: center; margin-bottom: 24px; border-bottom: 2px solid #2563eb; padding-bottom: 12px; }
            .header h1 { color: #1e40af; margin: 0 0 8px; }
            .section { margin: 20px 0; }
            .metric-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px; }
            .metric-card { border: 1px solid #e5e7eb; border-radius: 8px; padding: 12px; text-align: center; }
            .metric-value { font-size: 22px; font-weight: 700; color: #2563eb; }
            table { width: 100%; border-collapse: collapse; margin-top: 12px; }
            th, td { border: 1px solid #e5e7eb; padding: 8px; text-align: left; font-size: 14px; }
            th { background: #f9fafb; }
            .progress-bar { width: 100%; height: 10px; background: #e5e7eb; border-radius: 6px; overflow: hidden; }
            .progress-fill { height: 100%; background: #10b981; }
            .footer { margin-top: 24px; font-size: 12px; color: #6b7280; text-align: center; border-top: 1px solid #e5e7eb; padding-top: 12px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>${framework.name} Assessment Report</h1>
            <div>Organization: ${organizationName}</div>
            <div>Generated on ${reportDate}</div>
            <div>Assessment ID: ${assessment.id}</div>
          </div>

          <div class="section">
            <h2>Executive Summary</h2>
            <div class="metric-grid">
              <div class="metric-card">
                <div class="metric-value">${reportData.overallScore}%</div>
                <div>Overall Score</div>
              </div>
              <div class="metric-card">
                <div class="metric-value">${reportData.answeredQuestions}/${reportData.totalQuestions}</div>
                <div>Questions Completed</div>
              </div>
              <div class="metric-card">
                <div class="metric-value">${framework.name}</div>
                <div>Framework</div>
              </div>
              <div class="metric-card">
                <div class="metric-value">v${framework.version}</div>
                <div>Version</div>
              </div>
            </div>
          </div>

          <div class="section">
            <h2>Section Performance Analysis</h2>
            <table>
              <thead>
                <tr>
                  <th style="width: 40%;">Section</th>
                  <th style="width: 15%;">Score</th>
                  <th style="width: 20%;">Progress</th>
                  <th style="width: 25%;">Performance Bar</th>
                </tr>
              </thead>
              <tbody>
                ${reportData.sectionScores
                  .map((section: any) => `
                  <tr>
                    <td><strong>${section.name}</strong></td>
                    <td style="text-align:center; font-weight:700; color: ${section.score >= 75 ? '#059669' : section.score >= 50 ? '#d97706' : '#dc2626'};">${section.score}%</td>
                    <td style="text-align:center;">${section.answered}/${section.total}</td>
                    <td>
                      <div class="progress-bar">
                        <div class="progress-fill" style="width: ${section.score}%; background: ${section.score >= 75 ? '#10b981' : section.score >= 50 ? '#f59e0b' : '#ef4444'};"></div>
                      </div>
                    </td>
                  </tr>
                `)
                  .join('')}
              </tbody>
            </table>
          </div>

          <div class="footer">
            <p>Report generated by CyberCorrect™ Cybersecurity Compliance Platform</p>
            <p>Assessment ID: ${assessment.id} | Generated: ${reportDate} | Framework: ${framework.name} v${framework.version}</p>
          </div>
        </body>
      </html>
    `;
  }

  private generatePDFWithPrint(htmlContent: string) {
    const printWindow = window.open('', '_blank', 'width=1200,height=800');
    if (!printWindow) throw new Error('Failed to open print window');
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.onload = () => {
      setTimeout(() => {
        printWindow.focus();
        printWindow.print();
        setTimeout(() => printWindow.close(), 500);
      }, 300);
    };
  }

  private async exportToJSON(
    assessment: AssessmentData,
    framework: Framework,
    options: ReportExportOptions
  ): Promise<void> {
    const reportData = this.generateReportData(assessment, framework);
    const exportData = {
      assessment,
      framework: {
        id: framework.id,
        name: framework.name,
        version: framework.version,
        description: framework.description
      },
      reportData,
      exportedAt: new Date(),
      options,
      metadata: {
        totalQuestions: reportData.totalQuestions,
        answeredQuestions: reportData.answeredQuestions,
        overallScore: reportData.overallScore,
        completionRate: reportData.totalQuestions > 0 ? Math.round((reportData.answeredQuestions / reportData.totalQuestions) * 100) : 0,
        exportFormat: 'json',
        exportVersion: '2.0.0'
      }
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    this.downloadFile(
      dataStr,
      `${framework.name.replace(/[^a-zA-Z0-9]/g, '-')}-report-${assessment.id}-${new Date().toISOString().split('T')[0]}.json`,
      'application/json'
    );
  }

  private async exportToCSV(
    assessment: AssessmentData,
    framework: Framework,
    options: ReportExportOptions
  ): Promise<void> {
    const reportData = this.generateReportData(assessment, framework);

    const headers = ['Section', 'Score (%)', 'Questions Answered', 'Total Questions', 'Completion Rate (%)'];
    const csvRows = reportData.sectionScores.map((section: any) => [
      section.name,
      String(section.score),
      String(section.answered),
      String(section.total),
      section.total > 0 ? String(Math.round((section.answered / section.total) * 100)) : '0'
    ]);

    const csvContent = [headers, ...csvRows]
      .map((row) => row.map((field) => `"${String(field).replace(/"/g, '""')}"`).join(','))
      .join('\n');

    this.downloadFile(
      '\uFEFF' + csvContent,
      `${framework.name.replace(/[^a-zA-Z0-9]/g, '-')}-report-${assessment.id}-${new Date().toISOString().split('T')[0]}.csv`,
      'text/csv'
    );
  }

  private generateReportData(assessment: AssessmentData, framework: Framework) {
    const responses = Object.values(assessment.responses || {}) as number[];
    const overallScore = responses.length > 0 ? Math.round((responses.reduce((a, b) => a + b, 0) / responses.length) * 25) : 0;

    const sectionScores = framework.sections.map((section: any) => {
      const sectionQuestions = section.categories.reduce((questions: any[], category: any) => {
        return [...questions, ...category.questions];
      }, [] as any[]);

      const sectionResponses = sectionQuestions.map((q: any) => assessment.responses[q.id]).filter((r: any) => r !== undefined);
      const sectionScore = sectionResponses.length > 0 ? Math.round((sectionResponses.reduce((sum: number, value: number) => sum + value, 0) / sectionResponses.length) * 25) : 0;

      return { name: section.name, score: sectionScore, answered: sectionResponses.length, total: sectionQuestions.length };
    });

    return {
      overallScore,
      totalQuestions: framework.sections.reduce(
        (sum: number, section: any) => sum + section.categories.reduce((catSum: number, category: any) => catSum + category.questions.length, 0),
        0
      ),
      answeredQuestions: Object.keys(assessment.responses || {}).length,
      sectionScores
    };
  }

  private downloadFile(content: string, filename: string, mimeType: string): void {
    const blob = new Blob([content], { type: `${mimeType};charset=utf-8` });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}

export const reportService = ReportService.getInstance(); 