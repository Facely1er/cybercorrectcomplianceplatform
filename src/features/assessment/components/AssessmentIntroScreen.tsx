import React, { useState } from 'react';
import { ChevronLeftCheckCircle, AlertCircle, BookOpen, Building, Globe, ZapLightbulb, Lock } from 'lucide-react';
import { Framework, OrganizationInfo } from '../../../shared/types';
import { Breadcrumbs } from '../../../shared/components/layout/Breadcrumbs';
import { useInternalLinking } from '../../../shared/hooks/useInternalLinking';

interface AssessmentIntroScreenProps {
  frameworks: Framework[];
  onStartAssessment: (organizationInfo?: OrganizationInfo, selectedFramework?: string) => void;
  onBack: () => void;
}

export const AssessmentIntroScreen: React.FC<AssessmentIntroScreenProps> = ({ // Renamed to AssessmentIntroScreen
  frameworks, onStartAssessment, onBack 
    }) => {
  const { breadcrumbs } = useInternalLinking();
  const [showOrganizationForm, setShowOrganizationForm] = useState(false);
  const [selectedFramework, setSelectedFramework] = useState<string>(frameworks[0]?.id || 'cmmc');
  const [organizationInfo, setOrganizationInfo] = useState<Partial<OrganizationInfo>>({
    name: '', // Default to empty string
    industry: '', size: '', location: '', assessor: ''
  
    });

  // Get the currently selected framework
  const currentFramework = frameworks.find(f => f.id === selectedFramework) || frameworks[0];

  const getFrameworkIcon = (frameworkId: string) => {
    switch (frameworkId) {
      case 'nist':
        return Shield;
      case 'iso27001':
        return Globe;
      case 'cmmc':
        return Building;
      case 'privacy':
        return Users;
      case 'scrm':
        return Zap;
      case 'hipaa':
        return Lock;
      case 'ferpa':
        return BookOpen;
      default:
        return Shield;
    }
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'basic':
        return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border-green-200 dark:border-green-800';
      case 'intermediate':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800';
      case 'advanced':
        return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 border-red-200 dark:border-red-800';
      default:
        return 'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300';
      case 'medium':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300';
      case 'low':
        return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300';
      default:
        return 'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300';
    }
  };

  const totalQuestions = currentFramework.sections.reduce((sum, section) => 
    sum + section.categories.reduce((catSum, category) => 
      catSum + category.questions.length, 0), 0);

  const getFrameworkBenefits = (frameworkId: string) => {
    const benefits: Record<string, string[]> = {
      'nist': [
        'Comprehensive cybersecurity risk management',
        'Industry-agnostic framework applicable to all sectors',
        'Aligns with federal cybersecurity requirements',
        'Supports business continuity and resilience'
      ],
      'iso27001': [
        'International certification-ready assessment',
        'Systematic approach to information security management',
        'Demonstrates commitment to security best practices',
        'Enhances customer and stakeholder confidence'
      ],
      'cmmc': [
        'Required for DoD contractors and suppliers',
        'Protects Controlled Unclassified Information (CUI)',
        'Ensures supply chain cybersecurity',
        'Maintains eligibility for defense contracts'
      ],
      'privacy': [
        'Comprehensive privacy risk management',
        'Supports GDPR and CCPA compliance efforts',
        'Builds customer trust through privacy protection',
        'Reduces privacy-related business risks'
      ],
      'scrm': [
        'Manages third-party and supplier risks',
        'Protects against supply chain attacks',
        'Ensures vendor security compliance',
        'Reduces operational and reputational risks'
      ],
      'hipaa': [
        'Protects patient health information (ePHI)',
        'Ensures healthcare regulatory compliance',
        'Reduces risk of costly data breaches',
        'Maintains patient trust and confidentiality'
      ],
      'ferpa': [
        'Protects student education records',
        'Ensures educational privacy compliance',
        'Maintains student and parent trust',
        'Reduces risk of privacy violations'
      ]
    };
    return benefits[frameworkId] || [];
  };

  const getPreparationChecklist = (frameworkId: string) => {
    const checklists: Record<string, string[]> = {
      'nist-csf-v2': [
        'Inventory of organizational assets and systems',
        'Current cybersecurity policies and procedures',
        'Recent risk assessments or security audits',
        'Incident response and business continuity plans'
      ],
      'nist-csf-v2-extended': [
        'Complete asset inventory with detailed classifications',
        'Current cybersecurity governance framework documentation',
        'Existing risk management policies and procedures',
        'Identity and access management documentation',
        'Data protection and privacy impact assessments',
        'Network architecture diagrams and security controls',
        'Incident response plans and communication procedures',
        'Business continuity and disaster recovery documentation',
        'Vendor and supplier risk management documentation',
        'Security awareness training program materials',
        'Vulnerability management and patch management records',
        'Security monitoring and logging infrastructure details',
        'Physical security controls and facility documentation',
        'Compliance and audit reports from the past 12 months',
        'Organizational charts showing cybersecurity responsibilities'
      ],
      'nist-csf-v2-standard': [
        'Inventory of organizational assets and systems',
        'Current cybersecurity policies and procedures',
        'Recent risk assessments or security audits',
        'Incident response and business continuity plans'
      ],
      'nist': [
        'Inventory of organizational assets and systems',
        'Current cybersecurity policies and procedures', 
        'Recent risk assessments or security audits',
        'Incident response and business continuity plans'
      ],
      'iso27001': [
        'Information security policies and procedures',
        'Asset inventory and classification',
        'Risk assessment documentation',
        'Security control implementation evidence'
      ],
      'cmmc': [
        'System Security Plan (SSP) documentation', // Existing
        'CUI handling procedures and policies', // Existing
        'Technical security control implementations', // Existing
        'Personnel security and training records', // Existing
        'Incident Response Plan (IRP)',
        'Configuration Management Plan',
        'Risk Assessment Report',
        'Security Assessment Report',
        'Continuous Monitoring Plan',
        'Physical Security Plan',
        'Media Protection Plan',
        'Supply Chain Risk Management Plan',
        'Awareness and Training Records',
        'Audit Logs and Review Records',
        'Vulnerability Scan Reports and Penetration Test Reports'
      ],
      'privacy': [
        'Data inventory and mapping documentation',
        'Privacy policies and consent mechanisms',
        'Data processing agreements with vendors',
        'Privacy impact assessments (PIAs)'
      ],
      'scrm': [
        'Supplier and vendor inventory',
        'Third-party risk assessment procedures',
        'Supply chain security requirements',
        'Vendor management and oversight processes'
      ],
      'hipaa': [
        'ePHI inventory and data flow mapping',
        'Administrative, physical, and technical safeguards',
        'Business associate agreements (BAAs)',
        'Security incident response procedures'
      ],
      'ferpa': [
        'Student education record inventory',
        'Directory information policies',
        'Record access and disclosure procedures',
        'Physical and technical safeguards for records'
      ]
    
    };
    return checklists[frameworkId] || [];
  };

  const handleOrganizationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStartAssessment(organizationInfo as OrganizationInfo, selectedFramework);
  };

  const FrameworkIcon = getFrameworkIcon(currentFramework.id);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumbs */}
      <div className="mb-6">
        <Breadcrumbs items={breadcrumbs } />
      </div>

      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 mb-8">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack }
                className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
                <span>Back</span>
              </button>
              <div className="h-6 w-px bg-gray-300 dark:bg-gray-600" />
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-xl">
                  <FrameworkIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Cybersecurity Framework Assessment
                  </h1>
                  <p className="text-gray-600 dark:text-gray-300">
                    Choose Your Framework & Begin Assessment
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Framework Selection */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
            <div className="flex items-center space-x-3 mb-6">
              <Target className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Select Cybersecurity Framework
              </h2>
            </div>
            
            {/* Framework Statistics */}
            <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                NIST-Based Cybersecurity Assessments
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                {frameworks.map((framework) => (
                  <div key={framework.id } className="bg-white dark:bg-gray-700 p-3 rounded-lg">
                    <div className="font-medium text-gray-900 dark:text-white">{framework.name }</div>
                    <div className="text-blue-600 dark:text-blue-400">
                      {framework.id === 'cmmc' ? '110 controls' : 
                       framework.id === 'privacy' ? '73 questions' :
                       framework.id === 'nist-csf-v2-extended' ? '106 subcategories' : 'questions'}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      ~{framework?.estimatedTime || 'N/A'} minutes
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid gap-6 mb-8">
              {frameworks.map((framework) => {
                const FrameworkIconComponent = getFrameworkIcon(framework.id);
                const isSelected = selectedFramework === framework.id;

                
                return (
                  <button
                    key={framework.id }
                    onClick={() => setSelectedFramework(framework.id)}
                    className={`p-6 border-2 rounded-xl text-left transition-all duration-200 hover:shadow-lg ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-lg'
                        : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600'
                   }`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-xl ${
                        isSelected 
                          ? 'bg-blue-100 dark:bg-blue-900/30' 
                          : 'bg-gray-100 dark:bg-gray-700'
                     }`}>
                        <FrameworkIconComponent className={`w-8 h-8 ${
                          isSelected 
                            ? 'text-blue-600 dark:text-blue-400' 
                            : 'text-gray-600 dark:text-gray-400'
                       }`} />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className={`text-xl font-bold ${
                            isSelected 
                              ? 'text-blue-900 dark:text-blue-100' 
                              : 'text-gray-900 dark:text-white'
                         }`}>
                            {framework.name }
                          </h3>
                          {framework.id === 'nist-csf-v2-extended' && (
                            <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 text-xs font-medium rounded-full">
                              Complete - All 106 Subcategories
                            </span>
                          )}
                          {framework.id === 'cmmc' && (
                            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs font-medium rounded-full">
                              CMMC Level 2 - 110 Controls
                            </span>
                          )}
                          {framework.id === 'privacy' && (
                            <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs font-medium rounded-full">
                              Privacy Framework - 73 Questions
                            </span>
                          )}
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getComplexityColor(framework.complexity)}`}>
                            {framework.complexity }
                          </span>
                        </div>
                        
                        <p className={`text-sm mb-4 ${
                          isSelected 
                            ? 'text-blue-700 dark:text-blue-300' 
                            : 'text-gray-600 dark:text-gray-300'
                       }`}>
                          {framework.description }
                        </p>
                        
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div className="text-center">
                            <div className={`font-bold ${
                              isSelected 
                                ? 'text-blue-600 dark:text-blue-400' 
                                : 'text-gray-900 dark:text-white'
                           }`}>
                              {framework?.estimatedTime || 'N/A'}min
                            </div>
                            <div className="text-gray-600 dark:text-gray-400">Duration</div>
                          </div>
                          <div className="text-center">
                            <div className={`font-bold ${
                              isSelected 
                                ? 'text-blue-600 dark:text-blue-400' 
                                : 'text-gray-900 dark:text-white'
                           }`}>
                              {framework?.sections?.length || 0}
                            </div>
                            <div className="text-gray-600 dark:text-gray-400">Domains</div>
                          </div>
                          <div className="text-center">
                            <div className={`font-bold ${
                              isSelected 
                                ? 'text-blue-600 dark:text-blue-400' 
                                : 'text-gray-900 dark:text-white'
                           }`}>
                              {framework.id === 'cmmc' ? '110' : 
                               framework.id === 'privacy' ? '73' :
                               framework.id === 'nist-csf-v2-extended' ? '106' : '0'}
                            </div>
                            <div className="text-gray-600 dark:text-gray-400">
                              {framework.id === 'cmmc' ? 'Controls' : 
                               framework.id === 'nist-csf-v2-extended' ? 'Subcategories' : 'Questions'}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected Framework Overview */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
            <div className="flex items-center space-x-3 mb-6">
              <FrameworkIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {currentFramework.name } Overview
              </h2>
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-8">
              {currentFramework.description }
            </p>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {currentFramework?.estimatedTime || 'N/A'}
                </div>
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Minutes
                </div>
              </div>
              
              <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">
                  {totalQuestions }
                </div>
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {currentFramework.id === 'cmmc' ? 'Controls' : 'Questions'}
                </div>
              </div>
              
              <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                  {currentFramework.id === 'cmmc' ? '17' : 
                   currentFramework.id === 'privacy' ? '5' :
                   currentFramework.id === 'nist-csf-v2-extended' ? '6' : currentFramework?.sections?.length || 0}
                </div>
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {currentFramework.id === 'cmmc' ? 'Domains' : 'Sections'}
                </div>
              </div>
              
              <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl">
                <div className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                  {currentFramework.id === 'cmmc' ? 'Level 2' : 
                   currentFramework.id === 'privacy' ? 'v1.0' :
                   currentFramework.id === 'nist-csf-v2-extended' ? 'v2.0' : 'v' + (currentFramework?.version || 'N/A')}
                </div>
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {currentFramework.id === 'cmmc' ? 'CMMC Level' : 'Version'}
                </div>
              </div>
            </div>

            {/* Complexity Badge */}
            <div className="flex items-center justify-center mb-8">
              <div className={`px-6 py-3 rounded-full border-2 font-bold text-lg ${getComplexityColor(currentFramework.complexity)}`}>
                {currentFramework.complexity.charAt(0).toUpperCase() + currentFramework.complexity.slice(1)} Complexity
              </div>
            </div>

            {/* Framework Benefits */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Star className="w-6 h-6 mr-3 text-yellow-500" />
                Key Benefits
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {getFrameworkBenefits(currentFramework.id).map((benefit, index) => (
                  <div key={index } className="flex items-start space-x-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{benefit }</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Industry Applicability */}
            {currentFramework.industry && currentFramework.industry.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Building className="w-6 h-6 mr-3 text-blue-500" />
                  Recommended Industries
                </h3>
                <div className="flex flex-wrap gap-3">
                  {currentFramework.industry.map((industry, index) => (
                    <span
                      key={index }
                      className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium border border-blue-200 dark:border-blue-800"
                    >
                      {industry }
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Assessment Sections */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <Target className="w-8 h-8 mr-3 text-green-600 dark:text-green-400" />
              Assessment Coverage
            </h2>
            
            {/* Framework Selection Notice */}
            <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                Assessment Scope
              </h3>
              <p className="text-blue-800 dark:text-blue-200 text-sm">
                {currentFramework.id === 'nist-csf-v2-extended' ? (
                  <>
                    <strong>NIST CSF v2.0 Complete Assessment:</strong> This comprehensive assessment covers all 106 subcategories 
                    across 6 functions for complete NIST CSF v2.0 implementation. Estimated time: 120 minutes.
                  </>
                ) : currentFramework.id === 'cmmc' ? (
                  <>
                    <strong>CMMC Level 2 Assessment:</strong> This comprehensive assessment covers all 110 CMMC controls 
                    across 17 domains for complete DoD compliance evaluation. Estimated time: 120 minutes.
                  </>
                ) : currentFramework.id === 'privacy' ? (
                  <>
                    <strong>NIST Privacy Framework Assessment:</strong> This assessment covers 73 privacy questions 
                    for GDPR, CCPA, and global privacy regulation compliance. Estimated time: 90 minutes.
                  </>
                ) : (
                  <>
                    <strong>Cybersecurity Assessment:</strong> This assessment covers cybersecurity areas 
                    for organizational evaluation.
                  </>
                )}
              </p>
            </div>
            
            <div className="space-y-6">
              {currentFramework.sections.map((section, index) => {
                const sectionQuestions = section.categories.reduce((sum, cat) => sum + cat.questions.length, 0);
                const highPriorityInSection = section.categories.reduce((sum, cat) => 
                  sum + cat.questions.filter(q => q.priority === 'high').length, 0);
                
                return (
                  <div key={section.id } className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                            {index + 1}
                          </div>
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            {section.name }
                          </h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(section.priority)}`}>
                            {section.priority } priority
                          </span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                          {section.description }
                        </p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center space-x-2">
                        <FileText className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          {sectionQuestions } questions
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <AlertCircle className="w-4 h-4 text-red-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          {highPriorityInSection } high priority
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <BarChart3 className="w-4 h-4 text-blue-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          {section.weight }% weight
                        </span>
                      </div>
                    </div>

                    {/* Categories Preview */}
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                      <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Categories ({section.categories.length }):
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {section.categories.map((category, catIndex) => (
                          <span
                            key={catIndex }
                            className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs"
                          >
                            {category.name }
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Preparation Checklist */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <Lightbulb className="w-8 h-8 mr-3 text-yellow-500" />
              Preparation Checklist
            </h2>
            
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Gather these materials before starting your assessment to ensure accurate and comprehensive responses:
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              {getPreparationChecklist(currentFramework.id).map((item, index) => (
                <div key={index } className="flex items-start space-x-3 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <div className="w-6 h-6 border-2 border-yellow-500 rounded flex-shrink-0 mt-0.5"></div>
                  <span className="text-gray-700 dark:text-gray-300">{item }</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Facts */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 sticky top-24">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Quick Facts
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-300">Version</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {currentFramework.version }
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-300">Estimated Time</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {currentFramework?.estimatedTime || 'N/A'} minutes
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-300">Total Questions</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {currentFramework.id === 'cmmc' ? '110' : 
                   currentFramework.id === 'privacy' ? '73' :
                   currentFramework.id === 'nist-csf-v2-extended' ? '106' : totalQuestions || 'N/A'}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-300">{currentFramework.id === 'cmmc' ? 'Domains' : 'Sections'}</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {currentFramework?.sections?.length || 0}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-300">Maturity Levels</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {currentFramework?.maturityLevels?.length || 0}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-300">Framework Type</span>
                <span className="font-medium text-gray-900 dark:text-white capitalize">
                  {currentFramework.id === 'cmmc' ? 'DoD Compliance' : 
                   currentFramework.id === 'nist-csf-v2-extended' ? 'NIST Standard' :
                   currentFramework.id === 'nist-csf-v2-standard' ? 'NIST Lite' :
                   currentFramework.id === 'nist-csf-v2' ? 'NIST Quick Check' :
                   currentFramework.id === 'privacy' ? 'Privacy Regulations' : 'NIST Standard'}
                </span>
              </div>
            </div>

            {/* Maturity Levels */}
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                Maturity Levels
              </h4>
              <div className="space-y-2">
                {currentFramework?.maturityLevels?.map((level, index) => (
                  <div key={index } className="flex items-center space-x-3">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: level.color }}
                    />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white text-sm">
                        {level.name }
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-300">
                        {level.minScore }-{level.maxScore }%
                      </div>
                    </div>
                  </div>
                )) || []}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 space-y-3">
              <button
                onClick={() => setShowOrganizationForm(!showOrganizationForm)}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-xl font-bold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <Play className="w-5 h-5" />
                <span>Start Assessment</span>
              </button>
              
              <button
                onClick={() => onStartAssessment(undefined, selectedFramework)}
                className="w-full border-2 border-blue-600 text-blue-600 dark:text-blue-400 py-3 px-6 rounded-xl font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <ArrowRight className="w-4 h-4" />
                <span>Quick Start</span>
              </button>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
            <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-4 flex items-center">
              <Lightbulb className="w-5 h-5 mr-2" />
              Assessment Tips
            </h3>
            
            <ul className="space-y-3 text-sm text-green-800 dark:text-green-200">
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 mt-0.5 text-green-600" />
                <span>This assessment has {
                  currentFramework.id === 'nist-csf-v2-extended' ? '106 subcategories' :
                  currentFramework.id === 'cmmc' ? '110 controls' :
                  currentFramework.id === 'privacy' ? '73 questions' :
                  'comprehensive coverage'
                } - take your time</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 mt-0.5 text-green-600" />
                <span>Use the guidance and examples provided</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 mt-0.5 text-green-600" />
                <span>Your progress is automatically saved</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 mt-0.5 text-green-600" />
                <span>You can pause and resume at any time</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 mt-0.5 text-green-600" />
                <span>Estimated completion time: {currentFramework?.estimatedTime || 'N/A'} minutes</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Organization Information Modal */}
      {showOrganizationForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Organization Information (Optional)
            </h3>
            
            <form onSubmit={handleOrganizationSubmit } className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Organization Name
                </label>
                <input
                  type="text"
                  value={organizationInfo.name || ''}
                  onChange={(e) => setOrganizationInfo(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter organization name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Industry
                </label>
                <select
                  value={organizationInfo.industry || ''}
                  onChange={(e) => setOrganizationInfo(prev => ({ ...prev, industry: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select industry</option>
                  <option value="Financial Services">Financial Services</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Government">Government</option>
                  <option value="Education">Education</option>
                  <option value="Technology">Technology</option>
                  <option value="Energy & Utilities">Energy & Utilities</option>
                  <option value="Retail">Retail</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Organization Size
                </label>
                <select
                  value={organizationInfo.size || ''}
                  onChange={(e) => setOrganizationInfo(prev => ({ ...prev, size: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select size</option>
                  <option value="Small (1-50 employees)">Small (1-50 employees)</option>
                  <option value="Medium (51-500 employees)">Medium (51-500 employees)</option>
                  <option value="Large (501-5000 employees)">Large (501-5000 employees)</option>
                  <option value="Enterprise (5000+ employees)">Enterprise (5000+ employees)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Assessor Name
                </label>
                <input
                  type="text"
                  value={organizationInfo.assessor || ''}
                  onChange={(e) => setOrganizationInfo(prev => ({ ...prev, assessor: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Your name"
                />
              </div>
              
              <div className="flex space-x-4 mt-8">
                <button
                  type="button"
                  onClick={() => setShowOrganizationForm(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-colors font-medium"
                >
                  Start Assessment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};