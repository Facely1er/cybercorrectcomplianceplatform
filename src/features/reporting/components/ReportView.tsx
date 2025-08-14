import React, { useMemo } from 'react';
import { 
  ChevronLeft, Download, FileText, BarChart3, TrendingUp, 
  AlertTriangle, CheckCircle, Target, Award, Calendar, MessageCircle,
  Building, User, Mail, MapPin
} from 'lucide-react';
import { AssessmentData, Framework, UserProfile } from '../../../shared/types';
import { RadarChart } from '../../../shared/components/charts/RadarChart';
import { RemediationTimeline } from './RemediationTimeline';
import { SmartRecommendationEngine } from './SmartRecommendationEngine';
import { reportService } from '../../../services/reportService';
import { Breadcrumbs } from '../../../shared/components/layout/Breadcrumbs';
import { useInternalLinking } from '../../../shared/hooks/useInternalLinking';

interface ReportViewProps {
  assessment: AssessmentData;
  framework: Framework;
  onBack: () => void;
  onExport: (assessment: AssessmentData, format: 'json' | 'csv' | 'pdf') => void;
  userProfile: UserProfile | null;
}

export const ReportView: React.FC<ReportViewProps> = ({
  assessment,
  framework,
  onBack,
  onExport,
  userProfile
}) => {
  const { breadcrumbs } = useInternalLinking();

  // Calculate comprehensive metrics
  const metrics = useMemo(() => {
    const responses = Object.entries(assessment.responses);
    const totalQuestions = framework.sections.reduce((sum, section) => 
      sum + section.categories.reduce((catSum, category) => 
        catSum + category.questions.length, 0), 0);

    // Overall score calculation
    const overallScore = responses.length > 0 
      ? Math.round((responses.reduce((sum, [, value]) => sum + value, 0) / responses.length) * 25)
      : 0;

    // Section analysis
    const sectionAnalysis = framework.sections.map(section => {
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
        section: section.name,
        score: sectionScore,
        questionsAnswered: sectionResponses.length,
        totalQuestions: sectionQuestions.length,
        completionRate: Math.round((sectionResponses.length / sectionQuestions.length) * 100)
      };
    });

    // Category performance
    const categoryPerformance = framework.sections.flatMap(section =>
      section.categories.map(category => {
        const categoryResponses = category.questions
          .map(q => assessment.responses[q.id])
          .filter(r => r !== undefined);
        
        const categoryScore = categoryResponses.length > 0
          ? Math.round((categoryResponses.reduce((sum, value) => sum + value, 0) / categoryResponses.length) * 25)
          : 0;

        return {
          section: section.name,
          category: category.name,
          score: categoryScore,
          questionsAnswered: categoryResponses.length,
          totalQuestions: category.questions.length,
          priority: section.priority
        };
      })
    );

    // Gap analysis
    const gaps = categoryPerformance
      .filter(cat => cat.score < 75) // Categories scoring below 75%
      .sort((a, b) => a.score - b.score)
      .slice(0, 10); // Top 10 gaps

    // Maturity level determination
    const getMaturityLevel = (score: number) => {
      const level = framework.maturityLevels.find(ml => 
        score >= ml.minScore && score <= ml.maxScore
      ) || framework.maturityLevels[0];
      return level;
    };

    const maturityLevel = getMaturityLevel(overallScore);

    return {
      overallScore,
      maturityLevel,
      totalQuestions,
      answeredQuestions: responses.length,
      completionRate: Math.round((responses.length / totalQuestions) * 100),
      sectionAnalysis,
      categoryPerformance,
      gaps
    };
  }, [assessment, framework]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 dark:text-green-400';
    if (score >= 60) return 'text-yellow-600 dark:text-yellow-400';
    if (score >= 40) return 'text-orange-600 dark:text-orange-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-100 dark:bg-green-900/30';
    if (score >= 60) return 'bg-yellow-100 dark:bg-yellow-900/30';
    if (score >= 40) return 'bg-orange-100 dark:bg-orange-900/30';
    return 'bg-red-100 dark:bg-red-900/30';
  };

  const exportReport = (format: 'json' | 'csv' | 'pdf') => {
    try {
      reportService.exportReport(assessment, framework, {
        format,
        sections: ['executive-summary', 'detailed-analysis', 'recommendations'],
        includeCharts: true,
        branding: {
          organizationName: assessment.organizationInfo?.name
        }
      });
    } catch (error) {
      console.error('Failed to export report:', error);
      alert('Failed to export report: ' + (error as Error).message);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumbs */}
      <div className="mb-6">
        <Breadcrumbs items={breadcrumbs} />
      </div>

      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 mb-8 no-print">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
                <span>Back to Dashboard</span>
              </button>
              <div className="h-6 w-px bg-gray-300 dark:bg-gray-600" />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Assessment Report
              </h1>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={() => exportReport('json')}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Export JSON</span>
              </button>
              
              <button
                onClick={() => exportReport('pdf')}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FileText className="w-4 h-4" />
                <span>Export PDF</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Report Content */}
      <div className="space-y-8">
        {/* Executive Summary */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Executive Summary
            </h2>
            <div className="flex items-center justify-center space-x-8 mb-6">
              <div className="text-center">
                <div className={`text-6xl font-bold ${getScoreColor(metrics.overallScore)} mb-2`}>
                  {metrics.overallScore}%
                </div>
                <div className="text-lg font-semibold text-gray-900 dark:text-white">
                  Overall Maturity Score
                </div>
              </div>
              <div className="text-center">
                <div className={`inline-flex items-center px-4 py-2 rounded-full text-lg font-semibold ${getScoreBgColor(metrics.overallScore)} ${getScoreColor(metrics.overallScore)}`}>
                  <Award className="w-6 h-6 mr-2" />
                  {metrics.maturityLevel.name}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                  Maturity Level
                </div>
              </div>
            </div>
            
            <div className="max-w-4xl mx-auto text-gray-600 dark:text-gray-300 leading-relaxed">
              <p>
                This assessment evaluated your organization's cybersecurity maturity using the {framework.name} framework. 
                Your current maturity score is {metrics.overallScore}%, placing you at the {metrics.maturityLevel.name.toLowerCase()} level. 
                {metrics.maturityLevel.description}
              </p>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {metrics.answeredQuestions}/{metrics.totalQuestions}
              </div>
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Questions Completed
              </div>
            </div>
            
            <div className="text-center p-6 bg-green-50 dark:bg-green-900/20 rounded-xl">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                {framework.sections.length}
              </div>
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Sections Assessed
              </div>
            </div>
            
            <div className="text-center p-6 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                {new Date(assessment.lastModified).toLocaleDateString()}
              </div>
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Assessment Date
              </div>
            </div>
          </div>
        </div>

        {/* Organization Information */}
        {(assessment.organizationInfo || userProfile) && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
              <Building className="w-6 h-6 mr-3 text-blue-600 dark:text-blue-400" />
              Organization Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {assessment.organizationInfo?.name && (
                <div className="flex items-center space-x-3">
                  <Building className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Organization</div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {assessment.organizationInfo.name}
                    </div>
                  </div>
                </div>
              )}
              
              {assessment.organizationInfo?.assessor && (
                <div className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Assessor</div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {assessment.organizationInfo.assessor}
                    </div>
                  </div>
                </div>
              )}
              
              {assessment.organizationInfo?.industry && (
                <div className="flex items-center space-x-3">
                  <Target className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Industry</div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {assessment.organizationInfo.industry}
                    </div>
                  </div>
                </div>
              )}
              
              {assessment.organizationInfo?.location && (
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Location</div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {assessment.organizationInfo.location}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Section Analysis */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
            <BarChart3 className="w-6 h-6 mr-3 text-blue-600 dark:text-blue-400" />
            Section Analysis
          </h3>
          
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Radar Chart */}
            <div>
              <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Maturity Radar Chart
              </h4>
              <div className="h-80">
                <RadarChart 
                  sectionScores={metrics.sectionAnalysis.map(section => ({
                    name: section.section,
                    score: section.score
                  }))}
                  className="h-full"
                />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-3 text-center">
                Current maturity scores vs. target benchmark (75%)
              </p>
            </div>

            {/* Section Scores List */}
            <div>
              <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Section Breakdown
              </h4>
              <div className="space-y-4">
                {metrics.sectionAnalysis.map((section, index) => (
                  <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h5 className="font-medium text-gray-900 dark:text-white">
                        {section.section}
                      </h5>
                      <div className="flex items-center space-x-3">
                        <span className={`text-lg font-bold ${getScoreColor(section.score)}`}>
                          {section.score}%
                        </span>
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          {section.questionsAnswered}/{section.totalQuestions}
                        </span>
                      </div>
                    </div>
                    
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${
                          section.score >= 80 ? 'bg-green-500' :
                          section.score >= 60 ? 'bg-yellow-500' :
                          section.score >= 40 ? 'bg-orange-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${section.score}%` }}
                      />
                    </div>
                    
                    <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                      Completion: {section.completionRate}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Remediation Timeline */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
            <Calendar className="w-6 h-6 mr-3 text-blue-600 dark:text-blue-400" />
            Remediation Timeline
          </h3>
          
          <RemediationTimeline 
            gaps={metrics.gaps.map(gap => ({
              category: gap.category,
              score: gap.score,
              priority: gap.priority
            }))}
          />
        </div>

        {/* Smart Recommendations */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
          <SmartRecommendationEngine
            assessment={assessment}
            framework={framework}
          />
        </div>

        {/* Detailed Category Performance Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
            <Target className="w-6 h-6 mr-3 text-blue-600 dark:text-blue-400" />
            Detailed Category Performance
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Section</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Category</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900 dark:text-white">Score</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900 dark:text-white">Progress</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900 dark:text-white">Priority</th>
                </tr>
              </thead>
              <tbody>
                {metrics.categoryPerformance.map((category, index) => (
                  <tr key={index} className="border-b border-gray-100 dark:border-gray-700/50">
                    <td className="py-3 px-4 text-gray-700 dark:text-gray-300">{category.section}</td>
                    <td className="py-3 px-4 text-gray-900 dark:text-white font-medium">{category.category}</td>
                    <td className="py-3 px-4 text-center">
                      <span className={`font-bold ${getScoreColor(category.score)}`}>
                        {category.score}%
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center text-gray-600 dark:text-gray-300">
                      {category.questionsAnswered}/{category.totalQuestions}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        category.priority === 'high' ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300' :
                        category.priority === 'medium' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300' :
                        'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                      }`}>
                        {category.priority}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Gap Analysis */}
        {metrics.gaps.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
              <AlertTriangle className="w-6 h-6 mr-3 text-orange-600 dark:text-orange-400" />
              Gap Analysis
            </h3>
            
            <div className="space-y-4">
              {metrics.gaps.map((gap, index) => (
                <div key={index} className="border border-orange-200 dark:border-orange-800 rounded-lg p-4 bg-orange-50 dark:bg-orange-900/20">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {gap.section} - {gap.category}
                    </h4>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        Current: 
                      </span>
                      <span className={`font-bold ${getScoreColor(gap.score)}`}>
                        {gap.score}%
                      </span>
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        Recommendation: 75%+
                      </span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    Gap: {75 - gap.score}% improvement needed • 
                    {gap.questionsAnswered}/{gap.totalQuestions} questions completed
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Next Steps */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
            <CheckCircle className="w-6 h-6 mr-3 text-green-600 dark:text-green-400" />
            Next Steps
          </h3>
          
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((step) => (
              <div key={step} className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                  {step}
                </div>
                <div className="flex-1">
                  <p className="text-gray-700 dark:text-gray-300">
                    Step {step}: {
                      step === 1 ? 'Review and prioritize identified gaps' :
                      step === 2 ? 'Develop remediation plans for high-priority items' :
                      step === 3 ? 'Allocate resources and assign responsibilities' :
                      step === 4 ? 'Implement security improvements and controls' :
                      'Schedule follow-up assessment to measure progress'
                    }
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Assessment Notes */}
        {assessment.questionNotes && Object.keys(assessment.questionNotes).length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
              <MessageCircle className="w-6 h-6 mr-3 text-blue-600 dark:text-blue-400" />
              Assessment Notes & Comments
            </h3>
            
            <div className="space-y-6">
              {Object.entries(assessment.questionNotes).map(([questionId, note]) => {
                // Find the question details
                const question = framework.sections
                  .flatMap(section => section.categories)
                  .flatMap(category => category.questions)
                  .find(q => q.id === questionId);
                
                if (!question || !note.trim()) return null;
                
                return (
                  <div key={questionId} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
                    <div className="mb-3">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                        {question.text}
                      </h4>
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        Question ID: {questionId}
                      </div>
                    </div>
                    <div className="bg-white dark:bg-gray-700 rounded-lg p-4 border border-blue-200 dark:border-blue-600">
                      <div className="flex items-start space-x-3">
                        <MessageCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <div className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">
                            Assessor Notes:
                          </div>
                          <div className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                            {note}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center text-gray-600 dark:text-gray-300 py-8">
          <p className="mb-2">
            Report generated on {new Date().toLocaleDateString()} • {framework.name} v{framework.version}
          </p>
        </div>
      </div>
    </div>
  );
};