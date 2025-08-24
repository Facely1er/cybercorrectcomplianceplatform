import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import { 
  Shield, BarChart3, Settings, HelpCircle, Menu, X, Home, ChevronDown,
  Activity, FileText, Calendar, Users, CheckSquare, Target, Award, Building, Eye
} from 'lucide-react';
import { ThemeProvider, useTheme } from './shared/contexts/ThemeContext';
import { ThemeToggle } from './shared/components/ui/ThemeToggle';
import { getFramework, assessmentFrameworks } from './data/frameworks';
import { AssessmentData, NotificationMessage } from './shared/types';
import { dataService } from './services/dataService';
import { Analytics } from "@vercel/analytics/react";

// Simple Error Boundary
class SimpleErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean}> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error('Error caught:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Something went wrong</h2>
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
const SimpleNotificationSystem: React.FC<{
  notifications: NotificationMessage[];
  onRemove: (id: string) => void;
}> = ({ notifications, onRemove }) => {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`max-w-sm w-full border rounded-lg p-4 shadow-lg ${
            notification.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' :
            notification.type === 'error' ? 'bg-red-50 border-red-200 text-red-800' :
            notification.type === 'warning' ? 'bg-yellow-50 border-yellow-200 text-yellow-800' :
            'bg-blue-50 border-blue-200 text-blue-800'
          }`}
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

// Simple Landing Page
const SimpleLandingPage: React.FC = () => {
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

// Simple Assessment Intro
const SimpleAssessmentIntro: React.FC<{
  frameworks: any[];
  onStartAssessment: (orgInfo?: any, framework?: string) => void;
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
          <ChevronDown className="w-4 h-4 rotate-90" />
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

// Simple Dashboard
const SimpleDashboard: React.FC<{
  savedAssessments: AssessmentData[];
  onStartAssessment: () => void;
  onLoadAssessment: (assessment: AssessmentData) => void;
  onDeleteAssessment: (id: string) => void;
  addNotification: (type: string, message: string) => void;
}> = ({ savedAssessments, onStartAssessment, onLoadAssessment, onDeleteAssessment, addNotification }) => {
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
            {savedAssessments.map((assessment) => (
              <div key={assessment.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {assessment.frameworkName}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Last modified: {new Date(assessment.lastModified).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onLoadAssessment(assessment)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm"
                    >
                      Continue
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm('Delete this assessment?')) {
                          onDeleteAssessment(assessment.id);
                        }
                      }}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Simple Assessment View
const SimpleAssessmentView: React.FC<{
  assessment: AssessmentData;
  onSave: (assessment: AssessmentData) => void;
  onBack: () => void;
}> = ({ assessment, onSave, onBack }) => {
  const [currentResponses, setCurrentResponses] = useState(assessment.responses);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  const framework = getFramework(assessment.frameworkId);
  
  if (!framework || !framework.sections) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Framework Error
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
  
  const currentQuestion = allQuestions[currentQuestionIndex];
  
  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
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
  
  const handleSave = () => {
    const updatedAssessment = {
      ...assessment,
      responses: currentResponses,
      lastModified: new Date(),
      isComplete: Object.keys(currentResponses).length === allQuestions.length
    };
    onSave(updatedAssessment);
  };
  
  const handleResponseChange = (questionId: string, value: number) => {
    setCurrentResponses(prev => ({ ...prev, [questionId]: value }));
  };
  
  const progress = (currentQuestionIndex + 1) / allQuestions.length * 100;
  
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
                <ChevronDown className="w-4 h-4 rotate-90" />
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
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Save
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
                <p className="text-blue-800 dark:text-blue-200">
                  {currentQuestion.guidance}
                </p>
              </div>
            )}
          </div>
          
          {/* Response Options */}
          <div className="space-y-3 mb-8">
            {currentQuestion.options.map((option: any) => (
              <button
                key={option.value}
                onClick={() => handleResponseChange(currentQuestion.id, option.value)}
                className={`w-full p-4 text-left border-2 rounded-lg transition-colors ${
                  currentResponses[currentQuestion.id] === option.value
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
                }`}
              >
                <div className="font-semibold text-gray-900 dark:text-white mb-1">
                  {option.label}
                </div>
                {option.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {option.description}
                  </p>
                )}
              </button>
            ))}
          </div>
          
          {/* Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
              disabled={currentQuestionIndex === 0}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
            >
              <ChevronDown className="w-4 h-4 rotate-90" />
              <span>Previous</span>
            </button>
            
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {currentQuestionIndex + 1} of {allQuestions.length}
            </span>
            
            <button
              onClick={() => setCurrentQuestionIndex(Math.min(allQuestions.length - 1, currentQuestionIndex + 1))}
              disabled={currentQuestionIndex === allQuestions.length - 1}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              <span>Next</span>
              <ChevronDown className="w-4 h-4 -rotate-90" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
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

// Assessment Wrapper Component
const AssessmentWrapper: React.FC<{
  savedAssessments: AssessmentData[];
  onSave: (assessment: AssessmentData) => void;
  onBack: () => void;
}> = ({ savedAssessments, onSave, onBack }) => {
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
    <SimpleAssessmentView
      assessment={assessment}
      onSave={onSave}
      onBack={onBack}
    />
  );
};

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

  const createAssessment = async (organizationInfo?: any, selectedFramework?: string) => {
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
        <SimpleErrorBoundary>
          <Routes>
            <Route path="/" element={<SimpleLandingPage />} />
            
            <Route path="/dashboard" element={
              <SimpleDashboard
                savedAssessments={savedAssessments}
                onStartAssessment={startAssessment}
                onLoadAssessment={(assessment) => navigate(`/assessment/${assessment.id}`)}
                onDeleteAssessment={deleteAssessment}
                addNotification={addNotification}
              />
            } />
            
            <Route path="/assessment-intro" element={
              <SimpleAssessmentIntro
                frameworks={assessmentFrameworks}
                onStartAssessment={createAssessment}
                onBack={() => navigate('/')}
              />
            } />
            
            <Route path="/assessment/:id" element={
              <AssessmentWrapper 
                savedAssessments={savedAssessments}
                onSave={saveAssessment}
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
        </SimpleErrorBoundary>
      </main>

      <SimpleNotificationSystem 
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