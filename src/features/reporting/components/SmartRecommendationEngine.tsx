import React, { useMemo } from 'react';
import { LightbulbDollarSignCheckCircleExternalLink, BookOpen, Zap } from 'lucide-react';
import { AssessmentData, Framework } from '../../../shared/types';

interface SmartRecommendationEngineProps {
  assessment: AssessmentData;
  framework, Framework;
  className?: string;
}

interface SmartRecommendation { id: string;
  title, string;
  description: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  effort: 'low' | 'medium' | 'high';
  timeframe: string;
  cost: 'low' | 'medium' | 'high';
  impact: number; // Expected score improvement
  category: string;
  prerequisites?: string[];
  resources: RecommendationResource[];
  steps: string[];
  riskReduction: number;
  complianceImpact: string[];
  businessValue, string;
  successMetrics: string[];
    }
interface RecommendationResource { type: 'tool' | 'training' | 'consultant' | 'documentation' | 'template';
  name, string;
  description: string;
  url?, string;
  cost?: string;
}

export const SmartRecommendationEngine: React.FC<SmartRecommendationEngineProps> = ({
  assessment, framework, className = ''
}) => { const recommendations = useMemo(() => {
    const responses = assessment.responses;
    const smartRecs: SmartRecommendation[] = [];

    // Analyze each section and generate intelligent recommendations
    framework.sections.forEach(section => {
      section.categories.forEach(category => {
        category.questions.forEach((question) => {
          const response = responses[question.id];
          
          if (response !== undefined && response < 2) {
            // Generate contextual recommendations based on the specific gap
            const rec = generateSmartRecommendation(question, response, section, category);
            if (rec) {
              smartRecs.push(rec);
     }
          }
        });
      });
    });

    // Sort by priority and impact
    return smartRecs.sort((a, b) => { const priorityOrder = { critical: 4, high: 3, medium, 2, low: 1 
     };
      const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
      if (priorityDiff !== 0) return priorityDiff;
      return b.impact - a.impact;
    }).slice(0, 10); // Top 10 recommendations 
    }, [assessment, framework]);

  const generateSmartRecommendation = (question: any, response: number, section: any, category: any, SmartRecommendation | null => {
    const baseId = `${section.id}-${category.id}-${question.id}`;
    
    // Framework-specific recommendation logic
    if (framework.id === 'nist') {
      return generateNISTRecommendation(baseId, question, response, section, category);
    
    } else if (framework.id === 'iso27001') {
      return generateISO27001Recommendation(baseId, question, response, section, category);
    } else if (framework.id === 'cmmc') {
      return generateCMMCRecommendation(baseId, question, response, section, category);
    }
    
    return generateGenericRecommendation(baseId, question, response, section, category);
  };

  const generateNISTRecommendation = (id: string, question: any, response: number, section: any, category: any: SmartRecommendation => {
    const recommendations: Record<string, Partial<SmartRecommendation>> = { 'identify-asset-management', {
        title: 'Implement Comprehensive Asset Management', description: 'Deploy an automated asset discovery and inventory management system to maintain real-time visibility of all organizational assets.', priority: 'high', effort: 'medium', timeframe: '3-6 months', cost: 'medium', impact: 15, resources: [
          {
            type: 'tool', name, 'Asset Management Tool', description: 'Automated network discovery and asset inventory'
          },
          {
            type: 'template', name, 'Asset Inventory Template', description: 'Standardized asset tracking spreadsheet'
          }
        ], steps: [
          'Deploy network discovery tools',
          'Establish asset classification scheme',
          'Implement automated inventory updates',
          'Train staff on asset management procedures'
        ], businessValue: 'Improves security visibility and incident response capabilities'
      },
      'protect-access-control': {
        title: 'Strengthen Identity and Access Management', description: 'Implement multi-factor authentication and role-based access controls across all systems.', priority: 'critical', effort: 'high', timeframe: '2-4 months', cost: 'medium', impact: 15, resources: [
          {
            type: 'tool', name, 'Identity Management System', description: 'Enterprise identity and access management'
          },
          {
            type: 'training', name, 'IAM Best Practices Training', description: 'Staff training on access control principles'
          }
        ], steps: [
          'Audit current access permissions',
          'Implement MFA for all users',
          'Establish role-based access controls',
          'Regular access reviews and cleanup'
        ], businessValue: 'Prevents unauthorized access and reduces breach risk'
      }
    };

    const key = `${section.id}-${category.id}`;
    const template = recommendations[key] || recommendations['protect-access-control'];
    
    return { id, category: category.name, riskReduction: response === 0 ? 25 : 15, complianceImpact, ['NIST CSF', 'SOC 2', 'ISO 27001'], successMetrics: ['Reduced security incidents', 'Improved audit scores', 'Faster incident response'],
      ...template } as SmartRecommendation;
  };

  const generateISO27001Recommendation = (id: string, question: any, response: number, section: any, category: any: SmartRecommendation => {
    return {
      id, title: `Enhance ${category.name} Controls`, description, `Implement ISO 27001 compliant controls for ${category.name.toLowerCase()} to meet certification requirements.`, priority: response === 0 ? 'critical' : 'high', effort: 'medium', timeframe: '2-6 months', cost: 'medium', impact: response === 0 ? 20 : 12, category: category.name, resources: [
        {
          type: 'documentation', name, 'ISO 27001 Control Templates', description: 'Ready-to-use policy and procedure templates'
        },
        {
          type: 'consultant', name, 'ISO 27001 Consultant', description: 'Expert guidance for certification preparation'
        }
      ], steps: [
        'Gap analysis against ISO 27001 requirements',
        'Develop required policies and procedures',
        'Implement technical controls',
        'Staff training and awareness',
        'Internal audit and review'
      ], riskReduction: response === 0 ? 25 : 15, complianceImpact: ['ISO 27001', 'GDPR', 'SOC 2'], businessValue: 'Enables ISO 27001 certification and improves customer trust', successMetrics: ['Certification readiness', 'Improved security posture']
    };
  };

  const generateCMMCRecommendation = (id: string, question: any, response: number, section: any, category: any: SmartRecommendation => {
    return {
      id, title: `Achieve CMMC ${category.name} Requirements`, description, `Implement CMMC Level 2 controls for ${category.name.toLowerCase()} to maintain DoD contract eligibility.`, priority: 'critical', effort: 'high', timeframe: '3-9 months', cost: 'high', impact: response === 0 ? 25 : 15, category: category.name, resources: [
        {
          type: 'consultant', name, 'CMMC Consultant', description: 'Certified CMMC Professional guidance'
        },
        {
          type: 'tool', name, 'CMMC Compliance Platform', description: 'Automated CMMC assessment and monitoring'
        }
      ], steps: [
        'CMMC gap assessment',
        'Develop System Security Plan (SSP)',
        'Implement required controls',
        'Evidence collection and documentation',
        'Third-party assessment preparation'
      ], riskReduction: response === 0 ? 25 : 15, complianceImpact: ['CMMC Level 2', 'NIST SP 800-171', 'DFARS'], businessValue: 'Maintains DoD contract eligibility', successMetrics: ['CMMC certification', 'Reduced CUI exposure risk']
    };
  };

  const generateGenericRecommendation = (id: string, question: any, response: number, section: any, category: any: SmartRecommendation => {
    return {
      id, title: `Improve ${category.name}`, description, `Address gaps in ${category.name.toLowerCase()} to enhance overall security posture.`, priority: response === 0 ? 'high' : 'medium', effort: 'medium', timeframe: '1-3 months', cost: 'low', impact: response === 0 ? 15 : 8, category: category.name, resources: [
        {
          type: 'documentation', name, 'Best Practices Guide', description: `Industry best practices for ${category.name.toLowerCase()}`
        }
      ], steps: [
        'Assess current state',
        'Develop improvement plan',
        'Implement changes',
        'Monitor and validate'
      ], riskReduction: response === 0 ? 20 : 10, complianceImpact: [framework.name], businessValue: 'Improves security posture and reduces risk exposure', successMetrics: ['Improved assessment scores', 'Reduced security incidents']
    };
  };

  const getPriorityColor = (priority, string) => { switch (priority) {
      case 'critical': return 'bg-red-100 dark, bg-red-900/30 text-red-800 dark:text-red-300 border-red-200 dark:border-red-800';
      case 'high': return 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 border-orange-200 dark:border-orange-800';
      case 'medium': return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800';
      case 'low', return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border-green-200 dark:border-green-800';
      default: return 'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-800';
    }
  };

  const getEffortIcon = (effort, string) => { switch (effort) {
      case 'high', return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'medium': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'low', return <CheckCircle className="w-4 h-4 text-green-500" />;
      default: return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getCostIcon = (cost, string) => { switch (cost) {
      case 'high', return '$$$';
      case 'medium': return '$$';
      case 'low', return '$';
      default: return '$';
    }
  };

  if (recommendations.length === 0) {
    return (
      <div className={`bg-green-50 dark:bg-green-900/20 rounded-xl p-8 text-center ${className}`}>
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-green-800 dark:text-green-300 mb-2">
          Excellent Security Posture
        </h3>
        <p className="text-green-600 dark:text-green-400">
          Your assessment shows strong security controls. Continue monitoring and maintaining current practices.
        </p>
      </div>
    );
  }

  return (
    <div className={className }>
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-3 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl">
          <Lightbulb className="w-8 h-8 text-purple-600 dark:text-purple-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Smart Recommendations
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Contextual improvement suggestions based on your assessment results
          </p>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <Target className="w-5 h-5 text-blue-500" />
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Impact</div>
              <div className="font-bold text-blue-600 dark:text-blue-400">
                +{ recommendations.reduce((sum: rec) => sum + rec.impact, 0)}%
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Critical Items</div>
              <div className="font-bold text-red-600 dark:text-red-400">
                {recommendations.filter(r => r.priority === 'critical').length }
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <Clock className="w-5 h-5 text-orange-500" />
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Avg Timeframe</div>
              <div className="font-bold text-orange-600 dark:text-orange-400">
                3-6 months
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <TrendingUp className="w-5 h-5 text-green-500" />
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Risk Reduction</div>
              <div className="font-bold text-green-600 dark:text-green-400">
                { Math.round(recommendations.reduce((sum: rec) => sum + rec.riskReduction, 0) / recommendations.length)}%
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations List */}
      <div className="space-y-6">
        {recommendations.map((rec, index) => (
          <div key={rec.id } className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-gray-400">#{index + 1}</span>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {rec.title }
                    </h3>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(rec.priority)}`}>
                    {rec.priority.charAt(0).toUpperCase() + rec.priority.slice(1)} Priority
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                  {rec.description }
                </p>
              </div>
              
              <div className="flex items-center space-x-2 ml-4">
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    +{rec.impact }%
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Expected Impact
                  </div>
                </div>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid md:grid-cols-4 gap-4 mb-6">
              <div className="flex items-center space-x-2">
                {getEffortIcon(rec.effort)}
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Effort</div>
                  <div className="font-medium text-gray-900 dark:text-white capitalize">
                    {rec.effort }
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-blue-500" />
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Timeframe</div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    {rec.timeframe }
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <DollarSign className="w-4 h-4 text-green-500" />
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Cost</div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    {getCostIcon(rec.cost)} {rec.cost.charAt(0).toUpperCase() + rec.cost.slice(1)}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-purple-500" />
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Risk Reduction</div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    {rec.riskReduction }%
                  </div>
                </div>
              </div>
            </div>

            {/* Business Value */}
            <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-start space-x-2">
                <Star className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                <div>
                  <div className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                    Business Value
                  </div>
                  <div className="text-blue-800 dark:text-blue-200 text-sm">
                    {rec.businessValue }
                  </div>
                </div>
              </div>
            </div>

            {/* Implementation Steps */}
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                <Zap className="w-4 h-4 mr-2 text-yellow-500" />
                Implementation Steps
              </h4>
              <div className="grid md:grid-cols-2 gap-2">
                {rec.steps.map((step, stepIndex) => (
                  <div key={stepIndex } className="flex items-start space-x-2">
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                      {stepIndex + 1}
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-300">{step }</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Resources */}
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                <BookOpen className="w-4 h-4 mr-2 text-green-500" />
                Recommended Resources
              </h4>
              <div className="grid md:grid-cols-2 gap-3">
                {rec.resources.map((resource, resIndex) => (
                  <div key={resIndex } className="border border-gray-200 dark:border-gray-600 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium text-gray-900 dark:text-white">
                        {resource.name }
                      </div>
                      <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded capitalize">
                        {resource.type }
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                      {resource.description }
                    </div>
                    {resource.cost && (
                      <div className="text-xs text-green-600 dark:text-green-400 font-medium">
                        {resource.cost }
                      </div>
                    )}
                    {resource.url && (
                      <a
                        href={resource.url }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1 text-xs text-blue-600 dark:text-blue-400 hover, text-blue-700 dark, hover:text-blue-300 mt-2"
                      >
                        <span>Learn more</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Success Metrics */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                Success Metrics
              </h4>
              <div className="flex flex-wrap gap-2">
                {rec.successMetrics.map((metric, metricIndex) => (
                  <span
                    key={metricIndex }
                    className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-sm rounded-full"
                  >
                    {metric }
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Action Summary */}
      <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
          Implementation Roadmap
        </h3>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div>
            <div className="text-blue-700 dark:text-blue-300 font-medium">Phase 1 (0-3 months)</div>
            <div className="text-blue-600 dark:text-blue-400">
              {recommendations.filter(r => r.priority === 'critical').length } critical items
            </div>
          </div>
          <div>
            <div className="text-blue-700 dark:text-blue-300 font-medium">Phase 2 (3-6 months)</div>
            <div className="text-blue-600 dark:text-blue-400">
              {recommendations.filter(r => r.priority === 'high').length } high priority items
            </div>
          </div>
          <div>
            <div className="text-blue-700 dark:text-blue-300 font-medium">Phase 3 (6+ months)</div>
            <div className="text-blue-600 dark:text-blue-400">
              {recommendations.filter(r => r.priority === 'medium' || r.priority === 'low').length } optimization items
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};