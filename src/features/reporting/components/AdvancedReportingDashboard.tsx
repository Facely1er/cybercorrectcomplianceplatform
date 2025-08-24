import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import { Link } from 'react-router-dom';
import { AssessmentData, UserProfile } from '../../../shared/types';
import { nistCSFv2Framework } from '../../../data/frameworks/nist-csf-v2';
import { PieChart } from '../../../shared/components/charts/PieChart';
import { BarChart } from '../../../shared/components/charts/BarChart';

interface AdvancedReportingDashboardProps {
  savedAssessments: AssessmentData[];
  userProfile: UserProfile | null;
  onExportReport: (format: 'pdf' | 'excel' | 'json') => void;
}

export const AdvancedReportingDashboard: React.FC<Icons.AdvancedReportingDashboardProps> = ({ savedAssessments, userProfile, onExportReport }) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'30d' | '90d' | '1y'>('90d');
  const [selectedMetric, setSelectedMetric] = useState<'score' | 'progress' | 'compliance'>('score');
  const [reportType, setReportType] = useState<'executive' | 'detailed' | 'compliance'>('executive');

  const calculateAssessmentScore = (assessment: AssessmentData) => {
    const responses = Object.values(assessment.responses) as number[];
    if (responses.length === 0) return 0;
    return Math.round((responses.reduce((a, b) => a + b, 0) / responses.length) * 25);
  };

  // Generate trend data for the last 6 months
  const trendData = React.useMemo(() => {
    const months: Array<{ month: string; score: number; assessments: number; compliance: number }> = [];
    const now = new Date();

    for (let i = 5; i >= 0; i--) {
      const monthDate = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const nextMonthDate = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);

      const monthAssessments = savedAssessments.filter((a) => {
        const assessmentDate = new Date(a.lastModified);
        return assessmentDate >= monthDate && assessmentDate < nextMonthDate;
      });

      const avgScore = monthAssessments.length > 0
        ? Math.round(monthAssessments.map(calculateAssessmentScore).reduce((sum, score) => sum + score, 0) / monthAssessments.length)
        : 0;

      months.push({
        month: monthDate.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
        score: avgScore,
        assessments: monthAssessments.length,
        compliance: avgScore >= 75 ? 100 : Math.round((avgScore / 75) * 100)
      });
    }

    return months;
  }, [savedAssessments]);

  // Function-level analysis
  const functionAnalysis = React.useMemo(() => {
    if (savedAssessments.length === 0) return [] as Array<{ name: string; score: number; weight: number; questionsAnswered: number; totalQuestions: number; completionRate: number }>;

    const latestAssessment = [...savedAssessments].sort((a, b) => new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime())[0];

    return nistCSFv2Framework.sections.map((section: any) => {
      const sectionQuestions = section.categories.reduce((questions: any[], category: any) => {
        return [...questions, ...category.questions];
      }, [] as any[]);

      const sectionResponses = sectionQuestions.map((q: any) => latestAssessment.responses[q.id]).filter((r: any) => r !== undefined) as number[];
      const score = sectionResponses.length > 0 ? Math.round((sectionResponses.reduce((sum: number, value: number) => sum + value, 0) / sectionResponses.length) * 25) : 0;

      return {
        name: section.name,
        score,
        weight: section.weight || 0,
        questionsAnswered: sectionResponses.length,
        totalQuestions: sectionQuestions.length,
        completionRate: Math.round((sectionResponses.length / sectionQuestions.length) * 100)
      };
    });
  }, [savedAssessments]);

  const overallMetrics = React.useMemo(() => {
    const totalAssessments = savedAssessments.length;
    const completedAssessments = savedAssessments.filter((a) => a.isComplete).length;
    const avgScore = savedAssessments.length > 0 ? Math.round(savedAssessments.reduce((sum, assessment) => sum + calculateAssessmentScore(assessment), 0) / savedAssessments.length) : 0;
    const complianceRate = avgScore >= 75 ? 100 : Math.round((avgScore / 75) * 100);

    return {
      totalAssessments,
      completedAssessments,
      avgScore,
      complianceRate,
      improvementTrend: trendData.length >= 2 ? trendData[trendData.length - 1].score - trendData[trendData.length - 2].score : 0
    };
  }, [savedAssessments, trendData]);

  if (savedAssessments.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-12 text-center">
        <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">No Assessment Data Available</h3>
        <p className="text-gray-600 dark:text-gray-300">Complete a NIST CSF v2.0 assessment to generate comprehensive reports and analytics.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/dashboard" className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              <ChevronLeft className="w-5 h-5" />
              <span>Back to Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-gray-300 dark:bg-gray-600" />
            <div className="p-3 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl">
              <BarChart3 className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">NIST CSF v2.0 Advanced Analytics</h2>
              <p className="text-gray-600 dark:text-gray-300">Comprehensive reporting and trend analysis for implementation tracking</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <select value={reportType} onChange={(e) => setReportType(e.target.value as any)} className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent">
              <option value="executive">Executive Summary</option>
              <option value="detailed">Detailed Analysis</option>
              <option value="compliance">Compliance Report</option>
            </select>

            <button onClick={() => onExportReport('pdf')} className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
              <Download className="w-4 h-4" />
              <span>Export Report</span>
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Overall Score</p>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{overallMetrics.avgScore}%</p>
              <div className="flex items-center space-x-1 mt-1">
                {overallMetrics.improvementTrend > 0 ? (
                  <TrendingUp className="w-4 h-4 text-green-500" />
                ) : overallMetrics.improvementTrend < 0 ? (
                  <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />
                ) : null}
                <span className="text-xs text-gray-500 dark:text-gray-400">{overallMetrics.improvementTrend > 0 ? '+' : ''}{overallMetrics.improvementTrend}% this month</span>
              </div>
            </div>
            <Target className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Compliance Rate</p>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">{overallMetrics.complianceRate}%</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Target: 75% (Repeatable)</p>
            </div>
            <Shield className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Completed Assessments</p>
              <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{overallMetrics.completedAssessments}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">of {overallMetrics.totalAssessments} total</p>
            </div>
            <CheckCircle className="w-8 h-8 text-purple-600 dark:text-purple-400" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Maturity Level</p>
              <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">{overallMetrics.avgScore >= 76 ? '4' : overallMetrics.avgScore >= 51 ? '3' : overallMetrics.avgScore >= 26 ? '2' : '1'}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{overallMetrics.avgScore >= 76 ? 'Adaptive' : overallMetrics.avgScore >= 51 ? 'Repeatable' : overallMetrics.avgScore >= 26 ? 'Risk Informed' : 'Partial'}</p>
            </div>
            <Award className="w-8 h-8 text-orange-600 dark:text-orange-400" />
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Function Scores */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">NIST CSF v2.0 Function Scores</h3>
          <div className="h-80">
            <BarChart
              data={{
                labels: functionAnalysis.map((func) => func.name.split(' ')[0]),
                datasets: [
                  {
                    label: 'Current Score (%)',
                    data: functionAnalysis.map((func) => func.score),
                    backgroundColor: [
                      'rgba(59, 130, 246, 0.8)', // Govern - Blue
                      'rgba(34, 197, 94, 0.8)', // Identify - Green
                      'rgba(147, 51, 234, 0.8)', // Protect - Purple
                      'rgba(249, 115, 22, 0.8)', // Detect - Orange
                      'rgba(239, 68, 68, 0.8)', // Respond - Red
                      'rgba(234, 179, 8, 0.8)' // Recover - Yellow
                    ],
                    borderColor: [
                      'rgba(59, 130, 246, 1)',
                      'rgba(34, 197, 94, 1)',
                      'rgba(147, 51, 234, 1)',
                      'rgba(249, 115, 22, 1)',
                      'rgba(239, 68, 68, 1)',
                      'rgba(234, 179, 8, 1)'
                    ],
                    borderWidth: 2
                  }
                ]
              }}
              height={320}
              showLegend={false}
            />
          </div>
        </div>

        {/* Trend Analysis */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Implementation Progress Trend</h3>
          <div className="h-80">
            <LineChartIcon className="hidden" />
            {/* Placeholder for line chart; integrate actual chart lib similarly to BarChart */}
            <PieChart data={{ labels: ['Placeholder'], values: [100] }} />
          </div>
        </div>
      </div>

      {/* Function Details Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Detailed Function Analysis</h3>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Function</th>
                <th className="text-center py-3 px-4 font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Score</th>
                <th className="text-center py-3 px-4 font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Weight</th>
                <th className="text-center py-3 px-4 font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Progress</th>
                <th className="text-center py-3 px-4 font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {functionAnalysis.map((func, index) => (
                <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="py-4 px-4">
                    <div className="font-medium text-gray-900 dark:text-white">{func.name}</div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className={`text-lg font-bold ${func.score >= 80 ? 'text-green-600 dark:text-green-400' : func.score >= 60 ? 'text-yellow-600 dark:text-yellow-400' : func.score >= 40 ? 'text-orange-600 dark:text-orange-400' : 'text-red-600 dark:text-red-400'}`}>{func.score}%</span>
                  </td>
                  <td className="py-4 px-4 text-center text-gray-900 dark:text-white">{func.weight}%</td>
                  <td className="py-4 px-4 text-center">
                    <div className="text-sm text-gray-900 dark:text-white">{func.questionsAnswered}/{func.totalQuestions}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{func.completionRate}% complete</div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${func.score >= 80 ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' : func.score >= 60 ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300' : func.score >= 40 ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300' : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'}`}>
                      {func.score >= 80 ? 'Adaptive' : func.score >= 60 ? 'Repeatable' : func.score >= 40 ? 'Risk Informed' : 'Partial'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Executive Summary */}
      {reportType === 'executive' && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-8 border border-blue-200 dark:border-blue-800">
          <h3 className="text-2xl font-bold text-blue-900 dark:text-blue-100 mb-6">Executive Summary - NIST CSF v2.0 Implementation</h3>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-3">Current State Assessment</h4>
              <ul className="space-y-2 text-blue-700 dark:text-blue-300">
                <li>• Overall maturity score: {overallMetrics.avgScore}%</li>
                <li>• {overallMetrics.completedAssessments} assessments completed</li>
                <li>• Current maturity level: {overallMetrics.avgScore >= 76 ? 'Adaptive (Level 4)' : overallMetrics.avgScore >= 51 ? 'Repeatable (Level 3)' : overallMetrics.avgScore >= 26 ? 'Risk Informed (Level 2)' : 'Partial (Level 1)'}</li>
                <li>• Compliance rate: {overallMetrics.complianceRate}%</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-3">Key Recommendations</h4>
              <ul className="space-y-2 text-blue-700 dark:text-blue-300">
                <li>• Focus on functions scoring below 75%</li>
                <li>• Prioritize evidence collection for implemented controls</li>
                <li>• Establish continuous monitoring capabilities</li>
                <li>• Regular reassessment every 6-12 months</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Export Options */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Export & Sharing Options</h3>

        <div className="grid md:grid-cols-3 gap-4">
          <button onClick={() => onExportReport('pdf')} className="flex items-center space-x-3 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
            <FileText className="w-6 h-6 text-red-600 dark:text-red-400" />
            <div className="text-left">
              <div className="font-medium text-gray-900 dark:text-white">PDF Report</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Executive summary and detailed analysis</div>
            </div>
          </button>

          <button onClick={() => onExportReport('excel')} className="flex items-center space-x-3 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
            <BarChart3 className="w-6 h-6 text-green-600 dark:text-green-400" />
            <div className="text-left">
              <div className="font-medium text-gray-900 dark:text-white">Excel Workbook</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Data analysis and pivot tables</div>
            </div>
          </button>

          <button onClick={() => onExportReport('json')} className="flex items-center space-x-3 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
            <Settings className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <div className="text-left">
              <div className="font-medium text-gray-900 dark:text-white">JSON Data</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Raw data for integration</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};