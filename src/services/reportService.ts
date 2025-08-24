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

class ReportService {
	private static instance: ReportService;

	static getInstance(): ReportService {
		if (!ReportService.instance) {
			ReportService.instance = new ReportService();
		}
		return ReportService.instance;
	}

	async exportReport(assessment: AssessmentData, framework: Framework, options: ReportExportOptions): Promise<void> {
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
				extra: { assessmentId: assessment.id, format: options.format },
			});
			throw error;
		}
	}

	private async exportToPDF(assessment: AssessmentData, framework: Framework, options: ReportExportOptions): Promise<void> {
		const data = this.generateReportData(assessment, framework);
		const html = this.generateHTMLReport(assessment, framework, data, options);
		const blob = new Blob([html], { type: 'text/html' });
		const url = URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.href = url;
		link.download = `${framework.name}-assessment-${assessment.id}.html`;
		link.click();
		URL.revokeObjectURL(url);
	}

	private async exportToJSON(assessment: AssessmentData, framework: Framework, _options: ReportExportOptions): Promise<void> {
		const data = this.generateReportData(assessment, framework);
		const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
		const url = URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.href = url;
		link.download = `${framework.name}-assessment-${assessment.id}.json`;
		link.click();
		URL.revokeObjectURL(url);
	}

	private async exportToCSV(assessment: AssessmentData, framework: Framework, _options: ReportExportOptions): Promise<void> {
		const rows = [
			['Framework', framework.name],
			['Assessment ID', assessment.id],
			['Framework Name', assessment.frameworkName],
			['Created At', assessment.createdAt?.toString() ?? ''],
			['Last Modified', assessment.lastModified?.toString() ?? ''],
		];
		const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n');
		const blob = new Blob([csv], { type: 'text/csv' });
		const url = URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.href = url;
		link.download = `${framework.name}-assessment-${assessment.id}.csv`;
		link.click();
		URL.revokeObjectURL(url);
	}

	private generateReportData(assessment: AssessmentData, framework: Framework) {
		return {
			framework: framework.name,
			assessmentId: assessment.id,
			sections: assessment.sections?.length ?? 0,
			responsesCount: Object.keys(assessment.responses || {}).length,
			isComplete: !!assessment.isComplete,
			createdAt: assessment.createdAt,
			lastModified: assessment.lastModified,
		};
	}

	private generateHTMLReport(
		assessment: AssessmentData,
		framework: Framework,
		reportData: any,
		options: ReportExportOptions
	): string {
		const organizationName = options.branding?.organizationName || assessment.organizationInfo?.name || 'Organization';
		const reportDate = new Date().toLocaleDateString();
		return `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><title>${framework.name} Assessment Report - ${organizationName}</title></head>
<body>
	<h1>${framework.name} Assessment Report</h1>
	<p><strong>Organization:</strong> ${organizationName}</p>
	<p><strong>Date:</strong> ${reportDate}</p>
	<p><strong>Assessment ID:</strong> ${assessment.id}</p>
	<p><strong>Sections:</strong> ${reportData.sections}</p>
	<p><strong>Responses:</strong> ${reportData.responsesCount}</p>
	<p><strong>Complete:</strong> ${reportData.isComplete ? 'Yes' : 'No'}</p>
</body></html>`;
	}
}

export const reportService = ReportService.getInstance(); 