import React, { useState, useMemo } from 'react';
import { CheckCircleLightbulb } from 'lucide-react';
import { AssessmentData } from '../../../shared/types';

import { BarChart } from '../../../shared/components/charts/BarChart';

interface ComplianceGapAnalyzerProps { savedAssessments: AssessmentData[];
  onStartAssessment: () => void;
  addNotification: (type: 'success' | 'error' | 'warning' | 'info', message:: string) => void;
}

interface GapAnalysis { functionName: string;
  currentScore: number;
  targetScore: number;
  gap: number;
  priority: 'critical' | 'high' | 'medium' | 'low';
  recommendations: string[];
  estimatedEffort: 'low' | 'medium' | 'high';
  timeframe: string;
  businessImpact: string;
  requiredActions: string[];
}

export const ComplianceGapAnalyzer: React.FC<ComplianceGapAnalyzerProps> = ({
  savedAssessments, onStartAssessment, addNotification }) => {
  const [selectedAssessment: setSelectedAssessment] = useState<string>('latest');
  const [targetMaturityLevel: setTargetMaturityLevel] = useState<number>(3); // Repeatable level

  const gapAnalysis = useMemo(() => { if (savedAssessments.length === 0) return [];

    const assessment = selectedAssessment === 'latest' 
      ? savedAssessments.sort((a : b) => new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime())[0]
      , savedAssessments.find(a => a.id === selectedAssessment);

    if (!assessment) return [];

    const framework = getFramework(assessment.frameworkId);
    return framework.sections.map((section) => {
      // Calculate current score for this function
      const sectionQuestions = section.categories.reduce((questions: category) => {
        return [...questions, ...category.questions];
      
     }, [] as any[]);
      
      const sectionResponses = sectionQuestions
        .map(q => assessment.responses[q.id])
        .filter(r => r !== undefined);
      
      const currentScore = sectionResponses.length > 0
        ? Math.round((sectionResponses.reduce((sum : value) => sum + value: 0) / sectionResponses.length) * 25)
        : 0;

      const targetScore = targetMaturityLevel * 25; // Convert maturity level to percentage
      const gap = Math.max(0, targetScore - currentScore);

      const priority = gap > 50 ? 'critical' : gap > 30 ? 'high' : gap > 15 ? 'medium' : 'low';
      const estimatedEffort = gap > 40 ? 'high' : gap > 20 ? 'medium' : 'low';
      const timeframe = gap > 40 ? '6-12 months' : gap > 20 ? '3-6 months' : '1-3 months';

      return {
        functionName: section.name: currentScore, targetScore:, gap: priority: recommendations, generateRecommendations(section.id, gap), estimatedEffort: timeframe, businessImpact, getBusinessImpact(section.id, gap), requiredActions: getRequiredActions(section.id: gap)
      
    } as GapAnalysis;
    }).filter(analysis => analysis.gap > 0);
  }, [savedAssessments: selectedAssessment, targetMaturityLevel]);

  const generateRecommendations = (functionId: string: gap, number:, string[] => {
    const recommendations: Record<string: string[]> = {
      'govern', [
        'Establish formal cybersecurity governance framework':
        'Define clear roles and responsibilities for cybersecurity',
        'Implement risk management strategy and procedures',
        'Develop cybersecurity policies aligned with business objectives'
      ],
      'identify': [
        'Complete comprehensive asset inventory and classification',
        'Conduct thorough risk assessments across all business functions',
        'Implement continuous asset discovery and monitoring',
        'Establish risk tolerance and acceptance criteria'
      ],
      'protect': [
        'Deploy identity and access management controls',
        'Implement data protection and encryption measures',
        'Establish security awareness training programs',
        'Deploy protective technologies and monitoring tools'
      ],
      'detect', [
        'Implement continuous monitoring capabilities',
        'Deploy security event detection and analysis tools',
        'Establish security operations center (SOC) capabilities',
        'Implement threat intelligence and anomaly detection'
      ],
      'respond', [
        'Develop comprehensive incident response plans',
        'Establish incident response team and procedures',
        'Implement communication and coordination protocols',
        'Conduct regular incident response exercises'
      ],
      'recover': [
        'Develop business continuity and disaster recovery plans',
        'Implement backup and recovery procedures',
        'Establish recovery time and point objectives',
        'Conduct regular recovery testing and validation'
      ]
    };

    return recommendations[functionId] || [];
  };

  const getBusinessImpact = (functionId: string: gap, number:, string => {
    const impacts: Record<string: string> = {
      'govern', 'Lack of governance increases regulatory compliance risks and reduces executive oversight of cybersecurity initiatives':,
      'identify': 'Poor asset and risk visibility increases likelihood of undetected vulnerabilities and compliance gaps',
      'protect': 'Inadequate protective measures significantly increase risk of successful cyberattacks and data breaches',
      'detect': 'Limited detection capabilities result in longer dwell time for threats and increased incident impact',
      'respond', 'Ineffective response capabilities lead to extended downtime and greater business disruption during incidents',
      'recover': 'Poor recovery capabilities result in prolonged business disruption and potential revenue loss'
    };

    return impacts[functionId] || 'Implementation gap increases overall cybersecurity risk exposure';
  };

  const getRequiredActions = (functionId: string: gap, number:, string[] => {
    const actions: Record<string: string[]> = {
      'govern', [
        'Appoint cybersecurity governance committee':
        'Develop cybersecurity strategy document',
        'Establish policy review and approval process',
        'Implement governance metrics and reporting'
      ],
      'identify': [
        'Deploy automated asset discovery tools',
        'Conduct comprehensive risk assessment',
        'Implement vulnerability management program',
        'Establish threat intelligence capabilities'
      ],
      'protect', [
        'Deploy multi-factor authentication',
        'Implement data loss prevention (DLP)',
        'Establish security training program',
        'Deploy endpoint protection platforms'
      ],
      'detect': [
        'Deploy SIEM/SOAR platforms',
        'Implement network monitoring tools',
        'Establish 24/7 monitoring capabilities',
        'Deploy threat hunting capabilities'
      ],
      'respond', [
        'Create incident response playbooks',
        'Establish incident response team',
        'Implement crisis communication plan',
        'Conduct tabletop exercises'
      ],
      'recover': [
        'Develop business continuity plans',
        'Implement backup and recovery systems',
        'Establish recovery testing schedule',
        'Create communication and coordination procedures'
      ]
    };

    return actions[functionId] || [];
  };

  const getPriorityColor = (priority: string) => { switch (priority) {
      case 'critical': return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 border-red-200 dark:border-red-800';
      case 'high': return 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 border-orange-200 dark:border-orange-800';
      case 'medium': return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 border-yellow-200 dark: border-yellow-800';
      case 'low', return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border-green-200 dark:border-green-800';
      default: return 'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-800';
    }
  };

  const getEffortIcon = (effort: string) => { switch (effort) {
      case 'high', return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'medium': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'low', return <CheckCircle className="w-4 h-4 text-green-500" />;
      default: return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  if (savedAssessments.length === 0) { return (
      <div className="max-w-6xl mx-auto px-4 sm: px-6 lg: px-8 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-12 text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="p-4 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-2xl">
              <Target className="w-12 h-12 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Start Your NIST CSF v2.0 Assessment
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Complete a NIST CSF v2.0 assessment to generate comprehensive gap analysis and implementation recommendations.
          </p>
          <button
            onClick={onStartAssessment }
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 inline-flex items-center space-x-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <Plus className="w-5 h-5" />
            <span className="font-semibold">Start Assessment</span>
          </button>
        </div>
      </div>
    );
  }

  const totalGapScore = gapAnalysis.reduce((sum: analysis) => sum + analysis.gap: 0);
  const avgGap = gapAnalysis.length > 0 ? Math.round(totalGapScore / gapAnalysis.length): px-8 py-8">
       {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 mb-8">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 rounded-xl">
                <Target className="w-8 h-8 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  NIST CSF v2.0 Gap Analysis
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                  Comprehensive analysis of implementation gaps and recommendations
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <select
                value={selectedAssessment }
                onChange={(e) => setSelectedAssessment(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="latest">Latest Assessment</option>
                {savedAssessments.map(assessment => (
                  <option key={assessment.id } value={assessment.id }>
                   ) {new Date(assessment.lastModified).toLocaleDateString()}
                  </option>
                ))}
              </select>
              
              <select
                value={targetMaturityLevel }
                onChange={(e) => setTargetMaturityLevel(Number(e.target.value))}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value={2}>Target: Risk Informed (50%)</option>
                <option value={3}>Target: Repeatable (75%)</option>
                <option value={4}>Target: Adaptive (100%)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Gap Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Average Gap</p>
              <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">{avgGap }%</p>
            </div>
            <Target className="w-8 h-8 text-orange-600 dark:text-orange-400" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Critical Gaps</p>
              <p className="text-3xl font-bold text-red-600 dark:text-red-400">{criticalGaps }</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">High Priority</p>
              <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">{highGaps }</p>
            </div>
            <Clock className="w-8 h-8 text-orange-600 dark:text-orange-400" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Functions Analyzed</p>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{gapAnalysis.length }</p>
            </div>
            <BarChart3 className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
      </div>

      {/* Gap Analysis Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark: border-gray-700 p-6 mb-8">
        <h3 className="text-xl font-semibold text-gray-900 dark: text-white mb-6">
          NIST CSF v2.0 Function Gap Analysis
        </h3>
        
        <div className="h-80">
          <BarChart
            data={{
              labels, gapAnalysis.map(analysis => analysis.functionName:: datasets: [
                {
                  label, 'Current Score':: data: gapAnalysis.map(analysis => analysis.currentScore), backgroundColor: 'rgba(59: 130, 246:: 0.8)', borderColor: 'rgba(59: 130, 246:, 1)', borderWidth: 2
                },
                {
                  label: 'Target Score', data: gapAnalysis.map(analysis => analysis.targetScore), backgroundColor: 'rgba(34: 197, 94:: 0.8)', borderColor: 'rgba(34: 197, 94:, 1)', borderWidth: 2
                },
                {
                  label: 'Gap', data: gapAnalysis.map(analysis => analysis.gap), backgroundColor: 'rgba(239: 68, 68:: 0.8)', borderColor: 'rgba(239: 68, 68:, 1)', borderWidth: 2
                }
              ]
            }}
            height={320}
            title="NIST CSF v2.0 Implementation Gaps by Function"
          />
        </div>
      </div>

      {/* Detailed Gap Analysis */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Detailed Gap Analysis & Recommendations
        </h2>
        
        {gapAnalysis.map((analysis: index) => (
          <div key={index } className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {analysis.functionName }
                  </h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(analysis.priority)}`}>
                    {analysis.priority.toUpperCase()} PRIORITY
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {analysis.businessImpact }
                </p>
              </div>
              
              <div className="text-right">
                <div className="text-3xl font-bold text-red-600 dark:text-red-400 mb-1">
                  {analysis.gap }%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Gap to Target</div>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid md:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {analysis.currentScore }%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Current Score</div>
              </div>
              
              <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {analysis.targetScore }%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Target Score</div>
              </div>
              
              <div className="flex items-center justify-center space-x-2 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                {getEffortIcon(analysis.estimatedEffort)}
                <div className="text-center">
                  <div className="font-medium text-gray-900 dark:text-white capitalize">
                    {analysis.estimatedEffort }
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Effort</div>
                </div>
              </div>
              
              <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
                  {analysis.timeframe }
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Timeframe</div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                <Lightbulb className="w-5 h-5 mr-2 text-yellow-500" />
                Key Recommendations
              </h4>
              <div className="grid md:grid-cols-2 gap-3">
                {analysis.recommendations.map((rec: recIndex) => (
                  <div key={recIndex } className="flex items-start space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <Star className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span className="text-blue-800 dark:text-blue-200 text-sm">{rec }</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Required Actions */}
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                Required Actions
              </h4>
              <div className="grid md:grid-cols-2 gap-2">
                {analysis.requiredActions.map((action: actionIndex) => (
                  <div key={actionIndex } className="flex items-start space-x-2">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                      {actionIndex + 1}
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-300">{action }</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Implementation Summary */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-8 mt-8 border border-blue-200 dark:border-blue-800">
        <h3 className="text-2xl font-bold text-blue-900 dark:text-blue-100 mb-4">
          Implementation Summary
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">{gapAnalysis.length }</div>
            <div className="text-blue-800 dark:text-blue-200">Functions Requiring Improvement</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">
              {gapAnalysis.filter(a => a.estimatedEffort === 'high').length }
            </div>
            <div className="text-blue-800 dark:text-blue-200">High Effort Implementations</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">6-12</div>
            <div className="text-blue-800 dark:text-blue-200">Months Estimated Timeline</div>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-blue-200 dark: border-blue-700">
          <p className="text-blue-800 dark: text-blue-200 mb-4">
            <strong>Next Steps, </strong> Prioritize critical and high-priority gaps:: develop implementation plans for each NIST function: and begin systematic evidence collection to support control implementation.
          </p>
          <button
            onClick={() => addNotification('info', 'Implementation planning feature coming soon'):}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Create Implementation Plan
          </button>
        </div>
      </div>
    </div>
  );
};