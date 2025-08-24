import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import { 
  Shield, BarChart3, Settings, HelpCircle, Menu, X, Home, ChevronDown,
  Activity, FileText, Calendar, Users, CheckSquare, Target, Award, Building, Eye,
  Play, Download, Plus, ChevronLeft, ChevronRight, Save, AlertTriangle, 
  Clock, Lightbulb, TrendingUp, RefreshCw
} from 'lucide-react';
import { Analytics } from "@vercel/analytics/react";

// Import types
import { AssessmentData, Framework, NotificationMessage, UserProfile, OrganizationInfo } from './shared/types';

// Import theme context
import { ThemeProvider, useTheme } from './shared/contexts/ThemeContext';

// Import frameworks
import { getFramework, frameworks } from './data/frameworks';

// Import services
import { dataService } from './services/dataService';

// Theme Toggle Component
const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
      aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
    >
      {theme === 'light' ? <ChevronDown className="w-5 h-5" /> : <Target className="w-5 h-5" />}
    </button>
  );
};

// Simple Error Boundary
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
          <div className="text-center">
            <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Something went wrong</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// Simple Notification System
const NotificationSystem: React.FC<{
  notifications: NotificationMessage[];
  onRemove: (id: string) => void;
}> = ({ notifications, onRemove }) => {
  useEffect(() => {
    notifications.forEach((notification) => {
      const timer = setTimeout(() => {
        onRemove(notification.id);
      }, 5000);

      return () => clearTimeout(timer);
    });
  }, [notifications, onRemove]);

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success': return 'bg-green-50 border-green-200 text-green-800';
      case 'error': return 'bg-red-50 border-red-200 text-red-800';
      case 'warning': return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      default: return 'bg-blue-50 border-blue-200 text-blue-800';
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`max-w-sm w-full border rounded-lg p-4 shadow-lg ${getNotificationColor(notification.type)}`}
        >
          <div className="flex items-start">
            <div className="flex-1">
              <p className="text-sm font-medium">{notification.message}</p>
            </div>
            <button
              onClick={() => onRemove(notification.id)}
              className="ml-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

// Landing Page
const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <div className="flex items-center justify-center mb-8">
            <div className="p-4 bg-blue-600 rounded-2xl">
              <Shield className="w-12 h-12 text-white" />
            </div>
          </div>
          
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              CyberCorrect™
            </span>
            <br />
            Compliance Platform
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Complete cybersecurity compliance platform for NIST CSF v2.0, CMMC, and Privacy frameworks
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/assessment-intro')}
              className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors"
            >
              Start Assessment
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-colors"
            >
              View Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Assessment Intro Screen
const AssessmentIntroScreen: React.FC<{
  frameworks: Framework[];
  onStartAssessment: (orgInfo?: OrganizationInfo, framework?: string) => void;
  onBack: () => void;
}> = ({ frameworks, onStartAssessment, onBack }) => {
  const [selectedFramework, setSelectedFramework] = useState(frameworks[0]?.id || '');
  
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 mb-6"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
        
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Choose Assessment Framework
        </h1>
        
        <div className="space-y-4 mb-8">
          {frameworks.map((framework) => (
            <button
              key={framework.id}
              onClick={() => setSelectedFramework(framework.id)}
              className={`w-full p-6 text-left border-2 rounded-xl transition-colors ${
                selectedFramework === framework.id
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
              }`}
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {framework.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {framework.description}
              </p>
              <div className="mt-4 text-sm text-blue-600 dark:text-blue-400">
                Estimated time: {framework.estimatedTime || 'N/A'} minutes
              </div>
            </button>
          ))}
        </div>
        
        <button
          onClick={() => onStartAssessment(undefined, selectedFramework)}
          className="w-full bg-blue-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors"
        >
          Start Assessment
        </button>
      </div>
    </div>
  );
};

// Dashboard Component
const Dashboard: React.FC<{
  savedAssessments: AssessmentData[];
  onStartAssessment: () => void;
  onLoadAssessment: (assessment: AssessmentData) => void;
  onDeleteAssessment: (id: string) => void;
  addNotification: (type: string, message: string) => void;
}> = ({ savedAssessments, onStartAssessment, onLoadAssessment, onDeleteAssessment, addNotification }) => {
  
  const calculateScore = (assessment: AssessmentData) => {
    const responses = Object.values(assessment.responses);
    if (responses.length === 0) return 0;
    return Math.round((responses.reduce((a, b) => a + b, 0) / responses.length) * 25);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Cybersecurity Compliance Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Manage your cybersecurity assessments and compliance progress
        </p>
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Total Assessments
          </h3>
          <p className="text-3xl font-bold text-blue-600">{savedAssessments.length}</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Completed
          </h3>
          <p className="text-3xl font-bold text-green-600">
            {savedAssessments.filter(a => a.isComplete).length}
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            In Progress
          </h3>
          <p className="text-3xl font-bold text-orange-600">
            {savedAssessments.filter(a => !a.isComplete).length}
          </p>
        </div>
      </div>
      
      {/* Start Assessment */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 mb-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Start New Assessment
          </h2>
          <button
            onClick={onStartAssessment}
            className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors"
          >
            Begin Assessment
          </button>
        </div>
      </div>
      
      {/* Assessments List */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Your Assessments
          </h2>
        </div>
        
        {savedAssessments.length === 0 ? (
          <div className="p-12 text-center">
            <Shield className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No Assessments Yet
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Start your first cybersecurity assessment
            </p>
          </div>
        ) : (
          <div className="p-6 space-y-4">
            {savedAssessments.map((assessment) => {
              const score = calculateScore(assessment);
              const progress = Object.keys(assessment.responses).length;
              const framework = getFramework(assessment.frameworkId);
              const totalQuestions = framework?.sections?.reduce((sum, section) => 
                sum + section.categories.reduce((catSum, category) => 
                  catSum + category.questions.length, 0), 0) || 0;

              return (
                <div key={assessment.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        {assessment.frameworkName}
                      </h3>
                      {assessment.organizationInfo?.name && (
                        <p className="text-gray-600 dark:text-gray-300 mb-2">
                          {assessment.organizationInfo.name}
                        </p>
                      )}
                      <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                        <span>Score: <span className="font-medium text-gray-900 dark:text-white">{score}%</span></span>
                        <span>Progress: <span className="font-medium text-gray-900 dark:text-white">{progress}/{totalQuestions}</span></span>
                        <span>Modified: {new Date(assessment.lastModified).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        assessment.isComplete
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                      }`}>
                        {assessment.isComplete ? 'Complete' : 'In Progress'}
                      </span>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-4">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${totalQuestions > 0 ? (progress / totalQuestions) * 100 : 0}%` }}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => onLoadAssessment(assessment)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium"
                      >
                        Continue
                      </button>
                      {assessment.isComplete && (
                        <Link
                          to={`/report/${assessment.id}`}
                          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm font-medium"
                        >
                          View Report
                        </Link>
                      )}
                    </div>
                    <button
                      onClick={() => {
                        if (window.confirm('Delete this assessment? This action cannot be undone.')) {
                          onDeleteAssessment(assessment.id);
                        }
                      }}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 text-sm font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

// Assessment View Component
const AssessmentView: React.FC<{
  assessment: AssessmentData;
  onSave: (assessment: AssessmentData) => void;
  onGenerateReport: (assessment: AssessmentData) => void;
  onBack: () => void;
}> = ({ assessment, onSave, onGenerateReport, onBack }) => {
  const [currentResponses, setCurrentResponses] = useState(assessment.responses);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [notes, setNotes] = useState(assessment.questionNotes || {});
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  
  const framework = getFramework(assessment.frameworkId);
  
  if (!framework || !framework.sections || !Array.isArray(framework.sections)) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Framework Loading Error
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            The framework data for this assessment could not be loaded properly.
            Framework ID: {assessment.frameworkId}
          </p>
          <button 
            onClick={onBack}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }
  
  // Get all questions
  const allQuestions = framework.sections.flatMap(section =>
    section.categories.flatMap(category =>
      category.questions.map(question => ({
        ...question,
        sectionName: section.name,
        categoryName: category.name
      }))
    )
  );
  
  if (allQuestions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No Questions Available
          </h2>
          <button 
            onClick={onBack}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }
  
  const currentQuestion = allQuestions[currentQuestionIndex];
  const progress = (currentQuestionIndex + 1) / allQuestions.length * 100;
  
  // Auto-save functionality
  useEffect(() => {
    if (!hasUnsavedChanges) return;
    
    const autoSaveTimer = setTimeout(() => {
      handleSave();
    }, 5000);

    return () => clearTimeout(autoSaveTimer);
  }, [currentResponses, notes, hasUnsavedChanges]);
  
  const handleSave = () => {
    const updatedAssessment = {
      ...assessment,
      responses: currentResponses,
      questionNotes: notes,
      lastModified: new Date(),
      isComplete: Object.keys(currentResponses).length === allQuestions.length
    };
    onSave(updatedAssessment);
    setHasUnsavedChanges(false);
  };
  
  const handleResponseChange = (questionId: string, value: number) => {
    setCurrentResponses(prev => ({ ...prev, [questionId]: value }));
    setHasUnsavedChanges(true);
  };

  const handleNotesChange = (questionId: string, note: string) => {
    setNotes(prev => ({ ...prev, [questionId]: note }));
    setHasUnsavedChanges(true);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <button
                onClick={onBack}
                className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 mb-2"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back to Dashboard</span>
              </button>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                {assessment.frameworkName}
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Question {currentQuestionIndex + 1} of {allQuestions.length}
              </p>
            </div>
            <button
              onClick={handleSave}
              disabled={!hasUnsavedChanges}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-4 h-4" />
              <span>Save</span>
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-4">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
      
      {/* Question Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-4">
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm">
                {currentQuestion.sectionName}
              </span>
              <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-sm">
                {currentQuestion.categoryName}
              </span>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {currentQuestion.text}
            </h2>
            
            {currentQuestion.guidance && (
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800 mb-6">
                <div className="flex items-start space-x-3">
                  <Lightbulb className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Guidance</h3>
                    <p className="text-blue-800 dark:text-blue-200">
                      {currentQuestion.guidance}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Response Options */}
          <div className="space-y-3 mb-8">
            {currentQuestion.options?.map((option: any) => (
              <button
                key={option.value}
                onClick={() => handleResponseChange(currentQuestion.id, option.value)}
                className={`w-full p-4 text-left border-2 rounded-lg transition-colors ${
                  currentResponses[currentQuestion.id] === option.value
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                    currentResponses[currentQuestion.id] === option.value
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-300 dark:border-gray-600'
                  }`}>
                    {currentResponses[currentQuestion.id] === option.value && (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900 dark:text-white mb-1">
                      {option.label}
                    </div>
                    {option.description && (
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        {option.description}
                      </p>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Notes Section */}
          <div className="mb-8">
            <label className="block text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Additional Notes (Optional)
            </label>
            <textarea
              value={notes[currentQuestion.id] || ''}
              onChange={(e) => handleNotesChange(currentQuestion.id, e.target.value)}
              placeholder="Add any additional context, implementation details, or concerns..."
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>
          
          {/* Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
              disabled={currentQuestionIndex === 0}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>
            
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {currentQuestionIndex + 1} of {allQuestions.length}
            </span>
            
            <button
              onClick={() => setCurrentQuestionIndex(Math.min(allQuestions.length - 1, currentQuestionIndex + 1))}
              disabled={currentQuestionIndex === allQuestions.length - 1}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Completion Actions */}
          {currentQuestionIndex === allQuestions.length - 1 && Object.keys(currentResponses).length === allQuestions.length && (
            <div className="mt-8 p-6 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
              <div className="text-center">
                <CheckSquare className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-green-800 dark:text-green-300 mb-2">
                  Assessment Complete!
                </h3>
                <p className="text-green-600 dark:text-green-400 mb-6">
                  You've answered all questions. Generate your report to see results.
                </p>
                <button
                  onClick={() => onGenerateReport(assessment)}
                  className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  Generate Report
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Assessment Wrapper
const AssessmentWrapper: React.FC<{
  savedAssessments: AssessmentData[];
  onSave: (assessment: AssessmentData) => void;
  onGenerateReport: (assessment: AssessmentData) => void;
  onBack: () => void;
}> = ({ savedAssessments, onSave, onGenerateReport, onBack }) => {
  const { id } = useParams<{ id: string }>();
  const assessment = savedAssessments.find(a => a.id === id);
  
  if (!assessment) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Assessment Not Found</h2>
          <button 
            onClick={onBack}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <AssessmentView
      assessment={assessment}
      onSave={onSave}
      onGenerateReport={onGenerateReport}
      onBack={onBack}
    />
  );
};

// Simple Report View
const ReportView: React.FC<{
  assessment: AssessmentData;
  onBack: () => void;
}> = ({ assessment, onBack }) => {
  const framework = getFramework(assessment.frameworkId);
  
  if (!framework) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Framework Not Found</h2>
          <button onClick={onBack} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const responses = Object.values(assessment.responses);
  const overallScore = responses.length > 0 
    ? Math.round((responses.reduce((a, b) => a + b, 0) / responses.length) * 25)
    : 0;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 mb-6"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Assessment Report
          </h1>
          <h2 className="text-xl text-gray-600 dark:text-gray-300 mb-6">
            {assessment.frameworkName}
          </h2>
          
          <div className="text-6xl font-bold text-blue-600 dark:text-blue-400 mb-4">
            {overallScore}%
          </div>
          
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Overall Maturity Score
          </p>
        </div>

        {assessment.organizationInfo && (
          <div className="mb-8 p-6 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Organization Information</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600 dark:text-gray-300">Name:</span>
                <div className="font-medium text-gray-900 dark:text-white">{assessment.organizationInfo.name}</div>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-300">Industry:</span>
                <div className="font-medium text-gray-900 dark:text-white">{assessment.organizationInfo.industry}</div>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-300">Size:</span>
                <div className="font-medium text-gray-900 dark:text-white">{assessment.organizationInfo.size}</div>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-300">Assessor:</span>
                <div className="font-medium text-gray-900 dark:text-white">{assessment.organizationInfo.assessor}</div>
              </div>
            </div>
          </div>
        )}

        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Assessment completed on {new Date(assessment.lastModified).toLocaleDateString()}
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            {Object.keys(assessment.responses).length} questions answered
          </p>
        </div>
      </div>
    </div>
  );
};

// Report Wrapper
const ReportWrapper: React.FC<{
  savedAssessments: AssessmentData[];
  onBack: () => void;
}> = ({ savedAssessments, onBack }) => {
  const { id } = useParams<{ id: string }>();
  const assessment = savedAssessments.find(a => a.id === id);
  
  if (!assessment) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Report Not Found</h2>
          <button 
            onClick={onBack}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }
  
  return <ReportView assessment={assessment} onBack={onBack} />;
};

// Simple placeholder for complex features
const SimplePlaceholder: React.FC<{ title: string; description: string }> = ({ title, description }) => (
  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-12 text-center">
      <Shield className="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{title}</h2>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  </div>
);

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useTheme();
  
  const [notifications, setNotifications] = useState<NotificationMessage[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [savedAssessments, setSavedAssessments] = useState<AssessmentData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const assessments = dataService.getAssessments();
      setSavedAssessments(assessments);
      
      if (assessments.length === 0 && !dataService.isDemoDataLoaded()) {
        const shouldLoadDemo = !localStorage.getItem('demo-declined') && window.confirm(
          'Welcome to CyberCorrect™! Would you like to load demo data to explore the platform?'
        );
        
        if (shouldLoadDemo) {
          dataService.loadDemoData();
          setSavedAssessments(dataService.getAssessments());
        } else {
          localStorage.setItem('demo-declined', 'true');
        }
      }
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const addNotification = (type: 'success' | 'error' | 'warning' | 'info', message: string) => {
    const notification: NotificationMessage = {
      id: Date.now().toString(),
      type,
      message,
      timestamp: new Date()
    };
    setNotifications(prev => [...prev, notification]);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== notification.id));
    }, 5000);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const startAssessment = () => {
    navigate('/assessment-intro');
  };

  const createAssessment = async (organizationInfo?: OrganizationInfo, selectedFramework?: string) => {
    try {
      const framework = getFramework(selectedFramework);
      const newAssessment: AssessmentData = {
        id: Date.now().toString(),
        frameworkId: framework.id,
        frameworkName: framework.name,
        responses: {},
        createdAt: new Date(),
        lastModified: new Date(),
        isComplete: false,
        version: framework.version,
        organizationInfo,
        questionNotes: {},
        questionEvidence: {},
        evidenceLibrary: [],
        assessmentVersion: '1.0.0',
        versionHistory: [],
        changeLog: []
      };

      dataService.saveAssessment(newAssessment);
      setSavedAssessments(prev => [...prev, newAssessment]);
      navigate(`/assessment/${newAssessment.id}`);
      addNotification('success', 'Assessment started successfully');
    } catch (error) {
      console.error('Failed to create assessment:', error);
      addNotification('error', 'Failed to create assessment');
    }
  };

  const saveAssessment = async (assessment: AssessmentData) => {
    try {
      dataService.saveAssessment(assessment);
      setSavedAssessments(prev => prev.map(a => a.id === assessment.id ? assessment : a));
      addNotification('success', 'Assessment saved successfully');
    } catch (error) {
      console.error('Failed to save assessment:', error);
      addNotification('error', 'Failed to save assessment');
    }
  };

  const deleteAssessment = async (assessmentId: string) => {
    try {
      dataService.deleteAssessment(assessmentId);
      setSavedAssessments(prev => prev.filter(a => a.id !== assessmentId));
      addNotification('success', 'Assessment deleted successfully');
    } catch (error) {
      console.error('Failed to delete assessment:', error);
      addNotification('error', 'Failed to delete assessment');
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-3">
              <img src="/cybercorrect.png" alt="CyberCorrect Logo" className="w-8 h-8 rounded-lg" />
              <div>
                <h1 className="text-lg font-bold text-gray-900 dark:text-white">CyberCorrect™</h1>
              </div>
            </Link>

            <nav className="hidden md:flex items-center space-x-6">
              <Link
                to="/"
                className={`text-sm font-medium transition-colors ${
                  location.pathname === '/' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300 hover:text-blue-600'
                }`}
              >
                Home
              </Link>
              <Link
                to="/dashboard"
                className={`text-sm font-medium transition-colors ${
                  location.pathname === '/dashboard' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300 hover:text-blue-600'
                }`}
              >
                Dashboard
              </Link>
              <Link
                to="/assessment-intro"
                className={`text-sm font-medium transition-colors ${
                  location.pathname === '/assessment-intro' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300 hover:text-blue-600'
                }`}
              >
                Assessment
              </Link>
            </nav>

            <div className="flex items-center space-x-2">
              <ThemeToggle />
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <nav className="px-4 py-2 space-y-1">
            <Link to="/" className="block px-3 py-2 text-gray-700 dark:text-gray-300" onClick={() => setMobileMenuOpen(false)}>
              Home
            </Link>
            <Link to="/dashboard" className="block px-3 py-2 text-gray-700 dark:text-gray-300" onClick={() => setMobileMenuOpen(false)}>
              Dashboard
            </Link>
            <Link to="/assessment-intro" className="block px-3 py-2 text-gray-700 dark:text-gray-300" onClick={() => setMobileMenuOpen(false)}>
              Assessment
            </Link>
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main>
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            
            <Route path="/dashboard" element={
              <Dashboard
                savedAssessments={savedAssessments}
                onStartAssessment={startAssessment}
                onLoadAssessment={(assessment) => navigate(`/assessment/${assessment.id}`)}
                onDeleteAssessment={deleteAssessment}
                addNotification={addNotification}
              />
            } />
            
            <Route path="/assessment-intro" element={
              <AssessmentIntroScreen
                frameworks={frameworks}
                onStartAssessment={createAssessment}
                onBack={() => navigate('/')}
              />
            } />
            
            <Route path="/assessment/:id" element={
              <AssessmentWrapper 
                savedAssessments={savedAssessments}
                onSave={saveAssessment}
                onGenerateReport={(assessment) => navigate(`/report/${assessment.id}`)}
                onBack={() => navigate('/dashboard')}
              />
            } />
            
            <Route path="/report/:id" element={
              <ReportWrapper 
                savedAssessments={savedAssessments}
                onBack={() => navigate('/dashboard')}
              />
            } />
            
            {/* Simplified placeholders for other routes */}
            <Route path="/signin" element={
              <SimplePlaceholder title="Sign In" description="Authentication feature coming soon" />
            } />
            
            <Route path="/compliance/*" element={
              <SimplePlaceholder title="Compliance Status" description="Real-time compliance monitoring coming soon" />
            } />
            
            <Route path="/evidence" element={
              <SimplePlaceholder title="Evidence Collection" description="Evidence management features coming soon" />
            } />
            
            <Route path="/policies" element={
              <SimplePlaceholder title="Policy Management" description="Policy management features coming soon" />
            } />
            
            <Route path="/controls" element={
              <SimplePlaceholder title="Controls Management" description="Security controls management coming soon" />
            } />
            
            <Route path="/team" element={
              <SimplePlaceholder title="Team Collaboration" description="Team features coming soon" />
            } />
            
            <Route path="/tasks" element={
              <SimplePlaceholder title="Task Management" description="Task management features coming soon" />
            } />
            
            <Route path="/calendar" element={
              <SimplePlaceholder title="Activity Calendar" description="Calendar features coming soon" />
            } />
            
            <Route path="/assets" element={
              <SimplePlaceholder title="Asset Management" description="Asset management features coming soon" />
            } />
            
            <Route path="/reports/*" element={
              <SimplePlaceholder title="Reports" description="Reporting features coming soon" />
            } />
            
            <Route path="/settings" element={
              <SimplePlaceholder title="Settings" description="Settings page coming soon" />
            } />
            
            <Route path="/help" element={
              <SimplePlaceholder title="Help" description="Help documentation coming soon" />
            } />
          </Routes>
        </ErrorBoundary>
      </main>

      <NotificationSystem 
        notifications={notifications}
        onRemove={removeNotification}
      />
      <Analytics />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;