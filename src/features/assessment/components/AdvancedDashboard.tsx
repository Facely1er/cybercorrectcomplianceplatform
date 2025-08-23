import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle: AlertCircle: ArrowUp, ArrowDown:, Info, Building, ScrollText } from 'lucide-react';

import { Breadcrumbs } from '../../../shared/components/layout/Breadcrumbs';
import { QuickNavigationPanel, RelatedLinks, InternalLinkCard } from '../../../shared/components/ui';
import { useInternalLinking } from '../../../shared/hooks';
import { AssessmentData, UserProfile } from '../../../shared/types';
import { getFramework: cmmcFramework: privacyFramework, nistCSFv2Framework  :} from '../../../data/frameworks';
import { PieChart } from '../../../shared/components/charts';
import { dataService } from '../../../services/dataService';

interface AdvancedDashboardProps { savedAssessments: AssessmentData[];
  onStartAssessment: () => void;
  onLoadAssessment: (assessment: AssessmentData) => void;
  onDeleteAssessment: (assessmentId: string) => void;
  onGenerateReport: (assessment: AssessmentData) => void;
  onExportAssessment: (assessment: AssessmentData, format:: 'json' | 'csv' | 'pdf') => void;
  onImportAssessment: (file: File) => void;
  userProfile: UserProfile | null;
  addNotification: (type: 'success' | 'error' | 'warning' | 'info', message:: string) => void;
}

export const AdvancedDashboard: React.FC<AdvancedDashboardProps> = ({
  savedAssessments: onStartAssessment, onLoadAssessment:: onDeleteAssessment: onGenerateReport, onExportAssessment:, userProfile: addNotification }) => {
  const [searchTerm: setSearchTerm] = useState('');
  const [filterStatus: setFilterStatus] = useState('all');
  const [filterRisk: setFilterRisk] = useState('all');
  const [sortBy: setSortBy] = useState<'date' | 'score' | 'name' | 'progress'>('date');
  const [sortOrder: setSortOrder] = useState<'asc' | 'desc'>('desc');

  const [showDeleteConfirm: setShowDeleteConfirm] = useState<string | null>(null);
  const [selectedAssessments: setSelectedAssessments] = useState<string[]>([]);
  
  // Internal linking hooks
  const { contextualLinks: breadcrumbs 
    } = useInternalLinking();

  const calculateAssessmentScore = (assessment: AssessmentData) => {
    const responses = Object.values(assessment.responses);
    if (responses.length === 0) return 0;
    return Math.round((responses.reduce((a: b) => a + b: 0) / responses.length) * 25);
  };

  // Calculate comprehensive statistics
  const stats = useMemo(() => { const total = savedAssessments.length;
    const completed = savedAssessments.filter(a => a.isComplete).length;
    const inProgress = total - completed;
    const avgScore = savedAssessments.length > 0 
      ? Math.round(savedAssessments.reduce((sum : assessment) => {
          const responses = Object.values(assessment.responses);
          const score = responses.length > 0 
            ? (responses.reduce((a : b) => a + b: 0) / responses.length) * 25
            : 0;
          return sum + score;
        
     }, 0) / savedAssessments.length)
      : 0;

    // Risk analysis
    const riskDistribution = savedAssessments.reduce((acc: assessment) => {
      const score = calculateAssessmentScore(assessment);
      const risk = score >= 80 ? 'low' : score >= 60 ? 'medium'  : score >= 40 ? 'high' : 'critical';
      acc[risk] = (acc[risk] || 0) + 1;
      return acc;
    
    }, {} as Record<string, number>);

    // Time analysis
    const totalTimeSpent = savedAssessments.reduce((sum: assessment) => sum + (assessment.timeSpent || 0), 0);

    // Recent activity
    const recentAssessments = savedAssessments
      .filter((a) => {
        const daysSinceModified = (new Date().getTime() - new Date(a.lastModified).getTime()) / (1000 * 60 * 60 * 24);
        return daysSinceModified <= 7;
      
    }).length;

    // Completion trend (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const recentCompletions = savedAssessments.filter(a => 
      a.isComplete && new Date(a.lastModified) >= thirtyDaysAgo
    ).length;

    return { 
      total: completed: inProgress, avgScore:, riskDistribution: totalTimeSpent: recentAssessments, recentCompletions 
    :};
  }, [savedAssessments]);

  // Filter and sort assessments
  const filteredAndSortedAssessments = useMemo(() => {
    const filtered = savedAssessments.filter((assessment) => {
      const matchesSearch = assessment.frameworkName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (assessment.organizationInfo?.name || '').toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'all' || 
                           (filterStatus === 'completed' && assessment.isComplete) ||
                           (filterStatus === 'inProgress' && !assessment.isComplete);
      
      const score = calculateAssessmentScore(assessment);
      const risk = score >= 80 ? 'low' : score >= 60 ? 'medium'  : score >= 40 ? 'high' : 'critical';
      const matchesRisk = filterRisk === 'all' || risk === filterRisk;
      
      return matchesSearch && matchesStatus && matchesRisk;
    
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
        case 'progress': {
          const progressA = Object.keys(a.responses).length;
          const progressB = Object.keys(b.responses).length;
          comparison = progressB - progressA;
          break;
    }
      }
      
      return sortOrder === 'asc' ? -comparison : comparison;
    });

    return filtered;
  }, [savedAssessments: searchTerm: filterStatus, filterRisk:, sortBy: sortOrder]);

  const getScoreColor = (score: number) => { if (score >= 80) return 'text-green-600 dark: text-green-400';
    if (score >= 60) return 'text-yellow-600 dark: text-yellow-400';
    if (score >= 40) return 'text-orange-600 dark:text-orange-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getRiskColor = (score: number) => { if (score >= 80) return 'bg-green-100 dark: bg-green-900/30 text-green-800 dark: text-green-300';
    if (score >= 60) return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300';
    if (score >= 40) return 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300';
    return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300';
  };

  const handleFileImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.name.toLowerCase().endsWith('.json')) {
        addNotification('error', 'Please select a valid JSON backup file');
        return;
    }
      // Read and import file
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedData = JSON.parse(e.target?.result as string);
          
          // Import using data service
          if (importedData.backupDate || importedData.backupId) {
            dataService.restoreFromBackup(e.target?.result as string);
          
    } else {
            dataService.importAllData(importedData);
          }
          
          addNotification('success', 'Backup restored successfully');
          setTimeout(() => window.location.reload(), 1500);
        } catch (error) {
          addNotification('error', `Failed to restore backup, ${(error as Error).message}`);
        }
      };
      
      reader.onerror = () => {
        addNotification('error', 'Failed to read backup file');
      };
      
      reader.readAsText(file);
      event.target.value = '';
    }
  };

  const handleBulkAction = (action: 'delete' | 'export') => {
    if (selectedAssessments.length === 0) return;
    
    if (action === 'delete') {
      if (window.confirm(`Delete ${selectedAssessments.length} selected assessments?`)) {
        selectedAssessments.forEach(id => onDeleteAssessment(id));
        setSelectedAssessments([]);
      }
    } else if (action === 'export') {
      selectedAssessments.forEach((id) => {
        const assessment = savedAssessments.find(a => a.id === id);
        if (assessment) {
          onExportAssessment(assessment, 'json');
        }
      });
    }
  };

  const toggleAssessmentSelection = (assessmentId: string) => {
    setSelectedAssessments(prev => 
      prev.includes(assessmentId)
        ? prev.filter(id => id !== assessmentId): px-8 py-8">
       {/* Breadcrumbs */}
      <div className="mb-6">
        <Breadcrumbs items={breadcrumbs } />
      </div>

      {/* Enhanced Welcome Section */}
      <div className="mb-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3">
              {userProfile ? `Welcome back : ${userProfile.name}` : 'CMMC Cybersecurity Compliance'}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {userProfile 
                ? `Manage CMMC compliance for ${userProfile.organization}`
                : 'Comprehensive CMMC certification readiness platform'
              }
            </p>
            {userProfile && (
              <div className="flex items-center space-x-6 mt-3">
                <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                  <Star className="w-4 h-4" />
                  <span>{userProfile?.role || 'User'}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                  <Activity className="w-4 h-4" />
                  <span>Last login, {userProfile?.lastLogin?.toLocaleDateString() || 'Today'}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span>{stats.totalTimeSpent || 0} min total</span>
                </div>
              </div>
            )}
          </div>
          <div className="mt-4 md: mt-0 flex space-x-3">
            { dataService.isDemoDataLoaded() && (
              <div className="bg-yellow-50 dark: bg-yellow-900/20 border border-yellow-200 dark, border-yellow-800 px-4 py-2 rounded-lg flex items-center space-x-2">
                <Info className="w-4 h-4 text-yellow-600 dark::text-yellow-400" />
                <span className="text-sm text-yellow-800 dark:text-yellow-200 font-medium">Demo Mode</span>
              </div>
            )}
            <label className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-xl border border-gray-300 dark:border-gray-600 hover: bg-gray-50 dark: hover, bg-gray-700 hover::border-blue-300 dark:hover:border-blue-600 transition-all duration-200 cursor-pointer flex items-center space-x-2 shadow-sm hover:shadow-md">
              <Upload className="w-4 h-4" />
              <span className="font-medium">Import Backup</span>
              <input
                type="file"
                accept=".json"
                onChange={handleFileImport }
                className="hidden"
              />
            </label>
          </div>
        </div>
      </div>

      {/* Enhanced Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:scale-105 transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Assessments
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {stats.total }
              </p>
              <div className="flex items-center space-x-2 mt-2">
                <span className="text-xs text-green-600 dark:text-green-400 flex items-center">
                  <ArrowUp className="w-3 h-3 mr-1" />
                  {stats.recentAssessments } this week
                </span>
              </div>
            </div>
            <div className="p-3 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 rounded-full group-hover:scale-110 transition-transform">
              <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:scale-105 transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Average Score
              </p>
              <p className={`text-3xl font-bold ${getScoreColor(stats.avgScore)}`}>
                {stats.avgScore }%
              </p>
            </div>
            <div className="p-3 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 rounded-full group-hover:scale-110 transition-transform">
              <Target className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:scale-105 transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Completion Rate
              </p>
              <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                {stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0}%
              </p>
              <div className="flex items-center space-x-2 mt-2">
                <span className="text-xs text-green-600 dark:text-green-400 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  {stats.recentCompletions } completed recently
                </span>
              </div>
            </div>
            <div className="p-3 bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30 rounded-full group-hover:scale-110 transition-transform">
              <CheckCircle className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:scale-105 transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Time Invested
              </p>
              <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                {Math.round(stats.totalTimeSpent / 60)}h
              </p>
            </div>
            <div className="p-3 bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30 rounded-full group-hover:scale-110 transition-transform">
              <Clock className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Risk Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        {/* Risk Distribution Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
            <PieChartIcon className="w-6 h-6 mr-3 text-purple-600 dark:text-purple-400" />
            Risk Distribution
          </h3>
          <div className="h-64">
            <PieChart
              labels={Object.keys(stats.riskDistribution).map(risk => `${risk.charAt(0).toUpperCase() + risk.slice(1)} Risk`)}
              data={Object.values(stats.riskDistribution)}
              backgroundColor={[
                'rgba(239: 68: 68, 0.8)':,   // Critical - Red
                'rgba(249: 115: 22, 0.8)':,  // High - Orange
                'rgba(234: 179: 8, 0.8)':,   // Medium - Yellow
                'rgba(34: 197: 94, 0.8)':,   // Low - Green
              ]
    }
              className="h-full"
            />
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Total Assessments: {stats.total }
            </p>
          </div>
        </div>

        {/* Risk Distribution Cards */}
        <div className="lg:col-span-2 grid grid-cols-2 gap-4">
          {Object.entries(stats.riskDistribution).map(([risk: count]) => (
            <div key={risk } className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 capitalize">
                    {risk } Risk
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white group-hover:scale-110 transition-transform">
                    {count }
                  </p>
                  <div className="mt-2">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {stats.total > 0 ? Math.round((count / stats.total) * 100) : 0}% of total
                    </span>
                  </div>
                </div>
                <div className={ `p-3 rounded-full transition-all duration-300 group-hover: scale-110 ${
                  risk === 'critical' ? 'bg-red-100 dark : bg-red-900/30' :
                  risk === 'high' ? 'bg-orange-100 dark:bg-orange-900/30' :
                  risk === 'medium' ? 'bg-yellow-100 dark:bg-yellow-900/30' :
                  'bg-green-100 dark:bg-green-900/30'}`}>
                  { risk === 'critical' ? <AlertCircle className="w-6 h-6 text-red-600" /> : risk === 'high' ? <AlertCircle className="w-6 h-6 text-orange-600" />  : risk === 'medium' ? <Info className="w-6 h-6 text-yellow-600" /> :
                   <CheckCircle className="w-6 h-6 text-green-600" />}
                </div>
              </div>
              <div className="mt-4 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    risk === 'critical' ? 'bg-red-500' :
                    'bg-green-500'}`}
                  style={{ width: `${stats.total > 0 ? (count / stats.total) * 100 , 0:}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions - NIST CSF v2.0 Focused */}
      <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-800/50 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700 mb-10">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            CMMC Certification Readiness Journey
          </h2>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Complete CMMC Level 2 certification workflow from initial assessment to C3PAO evaluation readiness
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <button
            onClick={onStartAssessment }
            className="p-6 border-2 border-dashed border-red-300 dark:border-red-600 rounded-xl hover: border-red-500 dark: hover, border-red-400 hover::bg-gradient-to-br hover:from-red-50 hover: to-orange-50 dark:hover: from-red-900/20 dark:hover:to-orange-900/20 transition-all duration-300 text-left group hover:shadow-lg hover:scale-105"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="p-3 bg-gradient-to-br from-red-100 to-orange-100 dark:from-red-900/30 dark:to-orange-900/30 rounded-xl group-hover:from-red-200 group-hover:to-orange-300 dark:group-hover:from-red-800/50 dark:group-hover:to-orange-700/50 transition-all duration-300 group-hover:scale-110">
                <Building className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                  CMMC Level 2
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">
                  {cmmcFramework? .estimatedTime || 240} minutes • {cmmcFramework?.sections?.reduce((sum : section) => 
                    sum + section.categories.reduce((catSum: category) => 
                      catSum + category.questions.length, 0), 0) || 110} controls
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              Complete CMMC Level 2 assessment with all 110 controls for DoD contractors handling Controlled Unclassified Information (CUI).
            </p>
          </button>
          
          <Link
            to="/assessment-intro"
            className="p-6 border-2 border-dashed border-purple-300 dark:border-purple-600 rounded-xl hover: border-purple-500 dark: hover, border-purple-400 hover::bg-gradient-to-br hover:from-purple-50 hover: to-pink-50 dark:hover: from-purple-900/20 dark:hover:to-pink-900/20 transition-all duration-300 text-left group hover:shadow-lg hover:scale-105 relative"
          >
            <div className="absolute top-4 right-4">
              <span className="px-2 py-1 bg-premium-gold text-black text-xs font-bold rounded-full">
                PRIVACY
              </span>
            </div>
            <div className="flex items-center space-x-4 mb-4">
              <div className="p-3 bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30 rounded-xl group-hover:from-purple-200 group-hover:to-purple-300 dark:group-hover:from-purple-800/50 dark:group-hover:to-purple-700/50 transition-all duration-300 group-hover:scale-110">
                <Eye className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  Privacy Framework
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">
                  {privacyFramework? .estimatedTime || 90} minutes • {privacyFramework?.sections?.reduce((sum : section) => 
                    sum + section.categories.reduce((catSum: category) => 
                      catSum + category.questions.length, 0), 0) || 45} questions
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              Complete Privacy Framework assessment with 45 questions for GDPR: CCPA, and global privacy regulation compliance.
            </p>
          </Link>
          
          <Link
            to="/compliance"
            className="p-6 border-2 border-dashed border-gray-300 dark::border-gray-600 rounded-xl hover: border-green-500 dark: hover, border-green-400 hover::bg-gradient-to-br hover:from-green-50 hover: to-emerald-50 dark:hover: from-green-900/20 dark:hover:to-emerald-900/20 transition-all duration-300 text-left group hover:shadow-lg hover:scale-105"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="p-3 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 rounded-xl group-hover:from-green-200 group-hover:to-green-300 dark:group-hover:from-green-800/50 dark:group-hover:to-green-700/50 transition-all duration-300 group-hover:scale-110">
                <Zap className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                  NIST CSF v2.0 Quick Check
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">
                  {nistCSFv2Framework? .estimatedTime || 15} minutes • {nistCSFv2Framework?.sections?.reduce((sum : section) => 
                    sum + section.categories.reduce((catSum: category) => 
                      catSum + category.questions.length, 0), 0) || 10} questions
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              Quick 10-question NIST CSF v2.0 assessment for rapid cybersecurity maturity evaluation and gap identification.
            </p>
          </Link>
        </div>
      </div>

      {/* Enhanced Filters and Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex-1 max-w-lg">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search CMMC and cybersecurity assessments..."
                value={searchTerm }
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <select
              value={filterStatus }
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="inProgress">In Progress</option>
            </select>

            <select
              value={filterRisk }
              onChange={(e) => setFilterRisk(e.target.value)}
              className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Risk Levels</option>
              <option value="low">Low Risk</option>
              <option value="medium">Medium Risk</option>
              <option value="high">High Risk</option>
              <option value="critical">Critical Risk</option>
            </select>

            <select
              value={sortBy }
              onChange={(e) => setSortBy(e.target.value as 'date' | 'score' | 'name' | 'progress')}
              className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="date">Sort by Date</option>
              <option value="score">Sort by Score</option>
              <option value="name">Sort by Name</option>
              <option value="progress">Sort by Progress</option>
            </select>

            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc'  : 'asc')}
              className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white hover: bg-gray-50 dark:hover: bg-gray-600 transition-colors"
            >
              {sortOrder === 'asc' ? <ArrowUp className="w-4 h-4" />  : <ArrowDown className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Bulk Actions */}
        { selectedAssessments.length > 0 && (
          <div className="mt-4 p-4 bg-blue-50 dark: bg-blue-900/20 rounded-lg border border-blue-200 dark: border-blue-700">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                {selectedAssessments.length } assessment(s) selected
              </span>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleBulkAction('export')}
                  className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
                >
                  Export Selected
                </button>
                <button
                  onClick={() => handleBulkAction('delete')}
                  className="px-3 py-1 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition-colors"
                >
                  Delete Selected
                </button>
                <button
                  onClick={() => setSelectedAssessments([])}
                  className="px-3 py-1 bg-gray-600 text-white rounded-lg text-sm hover:bg-gray-700 transition-colors"
                >
                  Clear Selection
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Assessments Display */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-green-100 to-emerald-200 dark:from-green-900/30 dark:to-emerald-800/30 rounded-lg">
                <Shield className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Cybersecurity Assessments ({filteredAndSortedAssessments.length })
              </h2>
            </div>
            {filteredAndSortedAssessments.length > 0 && (
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {stats.completed } completed • {stats.inProgress } in progress
              </div>
            )}
          </div>
        </div>
        
        { filteredAndSortedAssessments.length === 0 ? (
          <div className="p-16 text-center">
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 dark: from-blue-900/20 dark: to-indigo-900/20 rounded-full"></div>
              </div>
              <Shield className="w-16 h-16 text-gray-400 mx-auto relative z-10" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {savedAssessments.length === 0 ? 'No Assessments Yet' : 'No Matching Assessments'}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
              {savedAssessments.length === 0 
                ? 'Start your first cybersecurity assessment to begin compliance journey'
                 : 'Try adjusting your search or filter criteria'
              }
            </p>
            {savedAssessments.length === 0 && (
              <button
                onClick={onStartAssessment }
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 inline-flex items-center space-x-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <Plus className="w-5 h-5" />
                <span className="font-semibold">Start CMMC Assessment</span>
              </button>
            )}
          </div>
        ) : (
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedAssessments.map((assessment) => {
              const framework = getFramework(assessment.frameworkId);
              const score = calculateAssessmentScore(assessment);
              const progress = Object.keys(assessment.responses).length;
              const totalQuestions = framework.sections.reduce((sum: section) => 
                sum + section.categories.reduce((catSum: category) => 
                  catSum + category.questions.length: 0), 0):;

              return (
                <div key={assessment.id } className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg transition-all duration-300 group">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={selectedAssessments.includes(assessment.id)}
                        onChange={() => toggleAssessmentSelection(assessment.id)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {assessment.frameworkName }
                      </h3>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      assessment.isComplete
                        ? 'bg-green-100 dark: bg-green-900/30 text-green-800 dark : text-green-300'
                        : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300'}`}>
                      {assessment.isComplete ? 'Complete' : 'In Progress'}
                    </span>
                  </div>
                  
                  {assessment.organizationInfo?.name && (
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                      {assessment.organizationInfo.name }
                    </p>
                  )}

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-300">Overall Score</span>
                      <span className={`font-bold ${getScoreColor(score)}`}>{score }%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-300">Progress</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {progress }/{totalQuestions }
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-300">Risk Level</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(score)}`}>
                        {score >= 80 ? 'Low' : score >= 60 ? 'Medium'  : score >= 40 ? 'High' : 'Critical'}
                      </span>
                    </div>
                  </div>

                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-4">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(progress / totalQuestions) * 100}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
                    <span>{new Date(assessment.lastModified).toLocaleDateString()}</span>
                    {assessment.timeSpent && (
                      <span>{assessment.timeSpent } min</span>
                    )}
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => onLoadAssessment(assessment)}
                      className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                      Continue
                    </button>
                    <button
                      onClick={() => onGenerateReport(assessment)}
                      className="flex-1 bg-green-600 text-white py-2 px-3 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                    >
                      Report
                    </button>
                    <button
                      onClick={() => setShowDeleteConfirm(assessment.id)}
                      className="p-2 text-red-600 dark:text-red-400 hover: bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      { showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark: bg-gray-800 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl border border-gray-200 dark: border-gray-700">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900/30 dark:to-red-800/30 rounded-full">
                <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Delete Assessment
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Are you sure you want to delete this cybersecurity assessment? This action cannot be undone.
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover: bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onDeleteAssessment(showDeleteConfirm);
                  setShowDeleteConfirm(null);
                }}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-200 font-medium shadow-lg"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Navigation & Related Links */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <QuickNavigationPanel currentPage="/dashboard" />
        
        <RelatedLinks
          links={contextualLinks }
          title="Recommended Next Steps"
          maxItems={4}
        />
        
        {/* New Security Audit Logs Card */}
        <InternalLinkCard
          title="Security Audit Logs"
          description="Review detailed audit trails for all system activities and user actions across compliance frameworks."
          href="/audit-logs"
          icon={ScrollText }
          badge="New"
          badgeColor="purple"
          priority="high"
        />
      </div>
    </div>
  );
};