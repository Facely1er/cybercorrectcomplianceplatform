import { AssessmentData, Framework } from '../shared/types';
import { errorMonitoring } from '../lib/errorMonitoring';

export interface ReportExportOptions {
  format: 'pdf' | 'json' | 'csv';
  sections?: string[];
  includeCharts?: boolean;
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
    // For now, use browser's print functionality
    // In a full implementation, this would generate a proper PDF
    const reportData = this.generateReportData(assessment, framework);
    
    // Create a new window with the report content
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      throw new Error('Failed to open print window');
    }

    printWindow.document.write(`
      <html>
        <head>
          <title>${framework.name} Assessment Report</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .section { margin-bottom: 20px; }
            .score { font-size: 24px; font-weight: bold; color: #2563eb; }
            table { width: 100%; border-collapse: collapse; margin: 10px 0; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f5f5f5; }
            .no-print { display: none; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>${framework.name} Assessment Report</h1>
            <p>Generated on ${new Date().toLocaleDateString()}</p>
            ${options.branding?.organizationName ? `<p>Organization: ${options.branding.organizationName}</p>` : ''}
          </div>
          
          <div class="section">
            <h2>Executive Summary</h2>
            <p>Overall Score: <span class="score">${reportData.overallScore}%</span></p>
            <p>Assessment completed on ${assessment.lastModified.toLocaleDateString()}</p>
            <p>Framework: ${framework.name} v${framework.version}</p>
          </div>
          
          <div class="section">
            <h2>Section Scores</h2>
            <table>
              <thead>
                <tr>
                  <th>Section</th>
                  <th>Score</th>
                  <th>Questions Answered</th>
                  <th>Total Questions</th>
                </tr>
              </thead>
              <tbody>
                ${reportData.sectionScores.map(section => `
                  <tr>
                    <td>${section.name}</td>
                    <td>${section.score}%</td>
                    <td>${section.answered}</td>
                    <td>${section.total}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
          
          ${assessment.questionNotes && Object.keys(assessment.questionNotes).length > 0 ? `
            <div class="section">
              <h2>Assessment Notes</h2>
              ${Object.entries(assessment.questionNotes).map(([questionId, note]) => `
                <div style="margin-bottom: 15px;">
                  <strong>Question ${questionId}:</strong><br>
                  <p>${note}</p>
                </div>
              `).join('')}
            </div>
          ` : ''}
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  }

  private async exportToJSON(
    assessment: AssessmentData,
    framework: Framework,
    options: ReportExportOptions
  ): Promise<void> {
    const reportData = {
      assessment,
      framework: {
        id: framework.id,
        name: framework.name,
        version: framework.version
      },
      exportedAt: new Date(),
      options
    };

    const dataStr = JSON.stringify(reportData, null, 2);
    this.downloadFile(
      dataStr,
      `${framework.name}-report-${assessment.id}.json`,
      'application/json'
    );
  }

  private async exportToCSV(
    assessment: AssessmentData,
    framework: Framework,
    options: ReportExportOptions
  ): Promise<void> {
    const reportData = this.generateReportData(assessment, framework);
    
    const csvContent = [
      ['Section', 'Score', 'Questions Answered', 'Total Questions'],
      ...reportData.sectionScores.map(section => [
        section.name,
        section.score.toString(),
        section.answered.toString(),
        section.total.toString()
      ])
    ].map(row => row.join(',')).join('\n');

    this.downloadFile(
      csvContent,
      `${framework.name}-report-${assessment.id}.csv`,
      'text/csv'
    );
  }

  private generateReportData(assessment: AssessmentData, framework: Framework) {
    const responses = Object.values(assessment.responses);
    const overallScore = responses.length > 0 
      ? Math.round((responses.reduce((a, b) => a + b, 0) / responses.length) * 25)
      : 0;

    const sectionScores = framework.sections.map(section => {
      const sectionQuestions = section.categories.reduce((questions, category) => {
        return [...questions, ...category.questions];
      }, [] as any[]);
      
      const sectionResponses = sectionQuestions
        .map(q => assessment.responses[q.id])
        .filter(r => r !== undefined);
      
      const sectionScore = sectionResponses.length > 0
        ? Math.round((sectionResponses.reduce((sum, value) => sum + value, 0) / sectionResponses.length) * 25)
        : 0;

      return {
        name: section.name,
        score: sectionScore,
        answered: sectionResponses.length,
        total: sectionQuestions.length
      };
    });

    return {
      overallScore,
      sectionScores,
      totalQuestions: framework.sections.reduce((sum, section) => 
        sum + section.categories.reduce((catSum, category) => 
          catSum + category.questions.length, 0), 0),
      answeredQuestions: Object.keys(assessment.responses).length
    };
  }

  private downloadFile(content: string, filename: string, mimeType: string): void {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}

export const reportService = ReportService.getInstance();