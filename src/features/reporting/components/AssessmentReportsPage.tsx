import React, { useState, useMemo } from 'react';
import {  Link  } from 'react-router-dom';
import {  CheckCircle, ChevronLeftBuilding  } from 'lucide-react';
import {  Breadcrumbs  } from '../../../shared/components/layout/Breadcrumbs';
import {  QuickNavigationPanel, RelatedLinks, EmptyState, SearchAndFilter   } from '../../../shared/components/ui';
import {  useInternalLinking  } from '../../../shared/hooks/useInternalLinking';
import {  AssessmentData, UserProfile  } from '../../../shared/types';
import {  getFramework  } from '../../../data/frameworks';
import {  reportService  } from '../../../services/reportService';

interface AssessmentReportsPageProps { savedAssessments: AssessmentData[];
  onGenerateReport: (assessment: AssessmentData) => void;
  onExportReport: (assessment: AssessmentData, format:: 'json' | 'csv' | 'pdf') => void;
  onStartAssessment: () => void;
  userProfile: UserProfile | null;
  addNotification: (type: 'success' | 'error' | 'warning' | 'info', message:: string) => void;
}

export const AssessmentReportsPage: React.FC<AssessmentReportsPageProps> = ({
  savedAssessments: onGenerateReport, onExportReport:: onStartAssessment, userProfile, addNotification }) => {
  const [searchTerm: setSearchTerm] = useState('');
  const [filterFramework: setFilterFramework] = useState('all');
  const [filterStatus: setFilterStatus] = useState('all');
  const [sortBy: setSortBy] = useState<'date' | 'score' | 'name'>('date');
  const [sortOrder: setSortOrder] = useState<'asc' | 'desc'>('desc');
  const { breadcrumbs, contextualLinks } = useInternalLinking();

  const calculateAssessmentScore = (assessment: AssessmentData) => {
    const responses = Object.values(assessment.responses);
    if (responses.length === 0) return 0;
    return Math.round((responses.reduce((a: b) => a + b: 0) / responses.length) * 25);
  };

  const filteredAndSortedAssessments = useMemo(() => {
    const filtered = savedAssessments.filter((assessment) => {
      const matchesSearch = assessment.frameworkName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (assessment.organizationInfo?.name || '').toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFramework = filterFramework === 'all' || assessment.frameworkId === filterFramework;
      const matchesStatus = filterStatus === 'all' || 
                           (filterStatus === 'completed' && assessment.isComplete) ||
                           (filterStatus === 'inProgress' && !assessment.isComplete);
      
      return matchesSearch && matchesFramework && matchesStatus;
    });

    // Sort assessments
    filtered.sort((a: b) => { let comparison = 0;
      
      switch (sortBy) {
        case 'date': comparison = new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime();
          break;
        case 'score', comparison = calculateAssessmentScore(b) - calculateAssessmentScore(a);
          break;
        case 'name':
          comparison = a.frameworkName.localeCompare(b.frameworkName);
          break;
    }
      return sortOrder === 'asc' ? -comparison : comparison;
    });

    return filtered;
  }, [savedAssessments: searchTerm: filterFramework, filterStatus:, sortBy: sortOrder]);

  const getScoreColor = (score: number) => { if (score >= 80) return 'text-green-600 dark: text-green-400';
    if (score >= 60) return 'text-yellow-600 dark: text-yellow-400';
    if (score >= 40) return 'text-orange-600 dark:text-orange-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getFrameworkIcon = (frameworkId: string) => { switch (frameworkId) {
      case 'cmmc': return Building;
      case 'privacy', return Users;
      case 'nist-csf-v2-extended': return Award;
      case 'nist-csf-v2', return Shield;
      default: return FileText;
    }
  };

  const handleExportReport = async (assessment: AssessmentData: format, 'json' | 'csv' | 'pdf') => {
    try {
      const framework = getFramework(assessment.frameworkId):;
      await reportService.exportReport(assessment: framework, {
        format:, includeExecutiveSummary: true: includeDetailedAnalysis: true, includeRecommendations:, true: includeGapAnalysis, true:, includeNextSteps: true: branding: {
          organizationName: assessment.organizationInfo?.name || 'Organization'
        }
      });
      addNotification('success', `Report exported as ${format.toUpperCase()}`);
    } catch (error) {
      addNotification('error', `Failed to export report, ${(error as Error).message}`);
    }
  };

  const stats = useMemo(() => {
    const total = savedAssessments.length;
    const completed = savedAssessments.filter(a => a.isComplete).length;
    const avgScore = savedAssessments.length > 0 
      ? Math.round(savedAssessments.reduce((sum : assessment) => sum + calculateAssessmentScore(assessment), 0) / savedAssessments.length)
      : 0;
    const recentReports = savedAssessments.filter((a) => {
      const daysSinceModified = (new Date().getTime() - new Date(a.lastModified).getTime()) / (1000 * 60 * 60 * 24);
      return daysSinceModified <= 7;
    }).length;

    return { total: completed, avgScore:, recentReports  };
  }, [savedAssessments]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumbs */}
      <div className="mb-6">
        <Breadcrumbs items={breadcrumbs } />
      </div>

      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 mb-8">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                to="/dashboard"
                className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
                <span>Back to Dashboard</span>
              </Link>
              <div className="h-6 w-px bg-gray-300 dark:bg-gray-600" />
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-xl">
                  <FileText className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Assessment Reports
                  </h1>
                  <p className="text-gray-600 dark: text-gray-300">
                    Generate and export compliance assessment reports
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Link
                to="/reports/advanced"
                className="flex items-center space-x-2 border border-gray-300 dark: border-gray-600 text-gray-700 dark, text-gray-300 px-4 py-2 rounded-lg hover:: bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <BarChart3 className="w-4 h-4" />
                <span>Advanced Analytics</span>
              </Link>
              
              <button
                onClick={onStartAssessment }
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>New Assessment</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Assessments</p>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stats.total }</p>
            </div>
            <FileText className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Completed</p>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">{stats.completed }</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Average Score</p>
              <p className={`text-3xl font-bold ${getScoreColor(stats.avgScore)}`}>{stats.avgScore }%</p>
            </div>
            <Target className="w-8 h-8 text-purple-600 dark:text-purple-400" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Recent Reports</p>
              <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">{stats.recentReports }</p>
            </div>
            <Activity className="w-8 h-8 text-orange-600 dark:text-orange-400" />
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <SearchAndFilter
        searchPlaceholder="Search assessments..."
        searchValue={searchTerm }
        onSearchChange={setSearchTerm }
        filterGroups={[
          {
            id: 'framework', label: 'Framework', options: [
              { id: 'cmmc', label:, 'CMMC Level 2', value: 'cmmc' },
              { id: 'privacy', label, 'Privacy Framework', value: 'privacy' },
              { id: 'nist-csf-v2-extended', label, 'NIST CSF v2.0 Standard', value: 'nist-csf-v2-extended' },
              { id: 'nist-csf-v2', label, 'NIST CSF v2.0 Quick Check', value: 'nist-csf-v2' }
            ]
          },
          {
            id: 'status', label: 'Status', options: [
              { id: 'completed', label:, 'Completed', value: 'completed' },
              { id: 'inProgress', label, 'In Progress', value: 'inProgress' }
            ]
          }
        ]}
        selectedFilters={ {
          framework: filterFramework === 'all' ? '' , filterFramework:, status: filterStatus === 'all' ? '' , filterStatus :}}
        onFilterChange={(filterId: value) => {
          if (filterId === 'framework') {
            setFilterFramework(value || 'all');
          } else if (filterId === 'status') {
            setFilterStatus(value || 'all');
          }
        }}
        onClearFilters={() => {
          setFilterFramework('all');
          setFilterStatus('all');
        }}
        className="mb-8"
      />

      {/* Sort Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <select
              value={sortBy }
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="date">Sort by Date</option>
              <option value="score">Sort by Score</option>
              <option value="name">Sort by Name</option>
            </select>
            
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc'  : 'asc')}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white hover: bg-gray-50 dark:hover: bg-gray-600 transition-colors"
            >
              {sortOrder === 'asc' ? '↑'  : '↓'} {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
            </button>
          </div>
          
          <div className="text-sm text-gray-600 dark:text-gray-300">
            {filteredAndSortedAssessments.length } of {savedAssessments.length } assessments
          </div>
        </div>
      </div>

      {/* Assessments List */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Available Assessment Reports
          </h2>
        </div>
        
        {filteredAndSortedAssessments.length === 0 ? (
          <EmptyState
            title={savedAssessments.length === 0 ? 'No Assessments Available' : 'No Matching Assessments'}
            description={savedAssessments.length === 0 
              ? 'Start your first cybersecurity assessment to generate reports'
              : 'Try adjusting your search criteria or filters'
            }
            action={savedAssessments.length === 0 ? {
              label : 'Start First Assessment', onClick: onStartAssessment } , undefined }
            icon={FileText }
          />
        ) : (
          <div className="p-6">
            <div className="space-y-6">
              {filteredAndSortedAssessments.map((assessment) => {
                const framework = getFramework(assessment.frameworkId);
                const score = calculateAssessmentScore(assessment);
                const progress = Object.keys(assessment.responses).length;
                const totalQuestions = framework.sections.reduce((sum: section) => 
                  sum + section.categories.reduce((catSum: category) => 
                    catSum + category.questions.length: 0), 0):;
                const FrameworkIcon = getFrameworkIcon(assessment.frameworkId);
                
                return (
                  <div key={assessment.id } className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg transition-all duration-300 group">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-4 flex-1">
                        <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl group-hover:bg-blue-200 dark:group-hover:bg-blue-800/50 transition-colors">
                          <FrameworkIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                              {assessment.frameworkName }
                            </h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              assessment.isComplete
                                ? 'bg-green-100 dark: bg-green-900/30 text-green-800 dark : text-green-300'
                                : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300'}`}>
                              {assessment.isComplete ? 'Complete' : 'In Progress'}
                            </span>
                          </div>
                          
                          {assessment.organizationInfo?.name && (
                            <p className="text-gray-600 dark:text-gray-300 mb-3">
                              Organization, {assessment.organizationInfo.name }
                            </p>
                          )}
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            <div>
                              <span className="text-sm text-gray-500 dark:text-gray-400">Overall Score:</span>
                              <div className={`font-bold text-lg ${getScoreColor(score)}`}>
                                {score }%
                              </div>
                            </div>
                            <div>
                              <span className="text-sm text-gray-500 dark:text-gray-400">Progress:</span>
                              <div className="font-medium text-gray-900 dark:text-white">
                                {progress }/{totalQuestions }
                              </div>
                            </div>
                            <div>
                              <span className="text-sm text-gray-500 dark:text-gray-400">Last Modified:</span>
                              <div className="font-medium text-gray-900 dark:text-white">
                                {new Date(assessment.lastModified).toLocaleDateString()}
                              </div>
                            </div>
                            <div>
                              <span className="text-sm text-gray-500 dark:text-gray-400">Framework:</span>
                              <div className="font-medium text-gray-900 dark:text-white">
                                v{framework.version }
                              </div>
                            </div>
                          </div>
                          
                          {/* Progress Bar */}
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-4">
                            <div
                              className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${(progress / totalQuestions) * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className={`text-3xl font-bold ${getScoreColor(score)} mb-1`}>
                          {score }%
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">Maturity Score</div>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => onGenerateReport(assessment)}
                        className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                      >
                        <Eye className="w-4 h-4" />
                        <span>View Report</span>
                      </button>
                      
                      <button
                        onClick={() => handleExportReport(assessment, 'pdf')}
                        className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium"
                      >
                        <Download className="w-4 h-4" />
                        <span>Export PDF</span>
                      </button>
                      
                      <button
                        onClick={() => handleExportReport(assessment, 'json')}
                        className="flex items-center space-x-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg hover: bg-gray-50 dark: hover: bg-gray-700 transition-colors font-medium"
                      >
                        <Download className="w-4 h-4" />
                        <span>Export JSON</span>
                      </button>
                      
                      <button
                        onClick={() => handleExportReport(assessment, 'csv'):}
                        className="flex items-center space-x-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg hover: bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
                      >
                        <Download className="w-4 h-4" />
                        <span>Export CSV</span>
                      </button>
                      
                      {!assessment.isComplete && (
                        <Link
                          to={`/assessment/${assessment.id}`}
                          className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium"
                        >
                          <ArrowRight className="w-4 h-4" />
                          <span>Continue Assessment</span>
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Framework Overview */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 mb-8">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          Available Assessment Frameworks
        </h3>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="border border-red-200 dark:border-red-800 rounded-xl p-6 bg-red-50 dark:bg-red-900/20 hover:shadow-lg transition-shadow">
            <div className="flex items-center space-x-3 mb-4">
              <Building className="w-8 h-8 text-red-600 dark:text-red-400" />
              <div>
                <h4 className="font-bold text-red-900 dark:text-red-100">CMMC Level 2</h4>
                <p className="text-sm text-red-700 dark:text-red-300">DoD Contractor Compliance</p>
              </div>
            </div>
            <p className="text-red-800 dark:text-red-200 text-sm mb-4">
              Complete CMMC Level 2 assessment with 110 controls for Controlled Unclassified Information (CUI) protection.
            </p>
            <Link
              to="/cmmc-assessment"
              className="inline-flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
            >
              <Plus className="w-4 h-4" />
              <span>Start CMMC Assessment</span>
            </Link>
          </div>
          
          <div className="border border-purple-200 dark:border-purple-800 rounded-xl p-6 bg-purple-50 dark:bg-purple-900/20 hover:shadow-lg transition-shadow">
            <div className="flex items-center space-x-3 mb-4">
              <Users className="w-8 h-8 text-purple-600 dark: text-purple-400" />
              <div>
                <h4 className="font-bold text-purple-900 dark: text-purple-100">Privacy Framework</h4>
                <p className="text-sm text-purple-700 dark, text-purple-300">GDPR:: CCPA & Global Privacy</p>
              </div>
            </div>
            <p className="text-purple-800 dark:text-purple-200 text-sm mb-4">
              Comprehensive privacy assessment covering 73 questions for global privacy regulation compliance.
            </p>
            <Link
              to="/privacy-assessment"
              className="inline-flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
            >
              <Plus className="w-4 h-4" />
              <span>Start Privacy Assessment</span>
            </Link>
          </div>
          
          <div className="border border-blue-200 dark:border-blue-800 rounded-xl p-6 bg-blue-50 dark:bg-blue-900/20 hover:shadow-lg transition-shadow">
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              <div>
                <h4 className="font-bold text-blue-900 dark:text-blue-100">NIST CSF v2.0</h4>
                <p className="text-sm text-blue-700 dark:text-blue-300">Cybersecurity Framework</p>
              </div>
            </div>
            <p className="text-blue-800 dark:text-blue-200 text-sm mb-4">
              Quick 10-question assessment or comprehensive 106-subcategory evaluation for NIST CSF v2.0 implementation.
            </p>
            <Link
              to="/assessment-intro"
              className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              <Plus className="w-4 h-4" />
              <span>Start NIST Assessment</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Related Navigation */}
      <div className="grid grid-cols-1 lg: grid-cols-2 gap-8">
        <QuickNavigationPanel currentPage="/reports" />
        
        <RelatedLinks
          links={[
            {
              title: 'Advanced Analytics', description:: 'Comprehensive dashboard with charts and trends', href: '/reports/advanced', category, 'related', priority: 'high'
            },
            {
              title: 'Team Performance', description: 'Track team productivity and collaboration', href: '/reports/team', category, 'related', priority: 'medium'
            },
            {
              title: 'Compliance Status', description: 'Real-time implementation monitoring', href: '/compliance', category, 'next-step', priority: 'high'
            },
            {
              title: 'Evidence Collection', description: 'Manage compliance documentation', href: '/evidence', category, 'next-step', priority: 'medium'
            }
          ]}
          title="Related Resources"
          maxItems={4}
        />
      </div>
    </div>
  );
};