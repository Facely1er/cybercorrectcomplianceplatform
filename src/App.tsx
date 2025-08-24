import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { Shield, Menu, X, Sun, Moon, Home, Target, BarChart3, Play, ChevronLeft, FileText, Users, Calendar } from 'lucide-react';
import { useTheme } from './shared/contexts/ThemeContext';

// Import assessment components
import { AssessmentIntroScreen } from './features/assessment/components/AssessmentIntroScreen';
import { EnhancedAssessmentView } from './features/assessment/components/EnhancedAssessmentView';
import { AdvancedDashboard } from './features/assessment/components/AdvancedDashboard';
import { ReportView } from './features/reporting/components/ReportView';

// Import frameworks and types
import { frameworks, getFramework } from './data/frameworks';
import { AssessmentData, UserProfile, OrganizationInfo, NotificationMessage } from './shared/types';
import { dataService } from './services/dataService';

// Simple Theme Toggle Component
const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  
  const handleThemeToggle = () => {
    console.log('Theme toggle clicked, current:', theme);
    toggleTheme();
  };
  
  return (
    <button
      onClick={handleThemeToggle}
      className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
      aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
    >
      {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
    </button>
  );
};

// Notification System
const NotificationSystem: React.FC<{
  notifications: NotificationMessage[];
  onRemove: (id: string) => void;
}> = ({ notifications, onRemove }) => {
  useEffect(() => {
    notifications.forEach((notification) => {
      if (!notification.persistent) {
        const timer = setTimeout(() => {
          onRemove(notification.id);
        }, 5000);
        return () => clearTimeout(timer);
      }
    });
  }, [notifications, onRemove]);

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`max-w-sm w-full border rounded-lg p-4 shadow-lg animate-slide-up ${
            notification.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' :
            notification.type === 'error' ? 'bg-red-50 border-red-200 text-red-800' :
            notification.type === 'warning' ? 'bg-yellow-50 border-yellow-200 text-yellow-800' :
            'bg-blue-50 border-blue-200 text-blue-800'
          }`}
        >
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">{notification.message}</p>
            <button
              onClick={() => onRemove(notification.id)}
              className="ml-2 text-gray-400 hover:text-gray-600"
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
const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="flex items-center justify-center mb-8">
          <div className="p-4 bg-blue-600 rounded-2xl">
            <Shield className="w-12 h-12 text-white" />
          </div>
        </div>
        
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            CyberCorrect™
          </span>
        </h1>
        
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          Complete cybersecurity compliance platform for NIST CSF v2.0, CMMC, and Privacy frameworks
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
          >
            <Play className="w-5 h-5" />
            <span>Get Started</span>
          </button>
          <button
            onClick={() => navigate('/about')}
            className="border-2 border-blue-600 text-blue-600 dark:text-blue-400 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
          >
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

// Simple About Page
const AboutPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
        <button
          onClick={() => navigate('/')}
          className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 mb-6 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>
        
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          About CyberCorrect™
        </h1>
        
        <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
          CyberCorrect™ is a comprehensive cybersecurity compliance platform designed to help organizations 
          implement and maintain compliance with various cybersecurity frameworks including NIST CSF v2.0, 
          CMMC, and Privacy regulations.
        </p>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
            <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-4 flex items-center">
              <Target className="w-5 h-5 mr-2" />
              Key Features
            </h3>
            <ul className="space-y-2 text-blue-800 dark:text-blue-200 text-sm">
              <li>• NIST CSF v2.0 comprehensive assessments</li>
              <li>• CMMC Level 2 compliance tracking</li>
              <li>• Privacy framework support (GDPR/CCPA)</li>
              <li>• Real-time compliance monitoring</li>
              <li>• Evidence collection and management</li>
              <li>• Team collaboration tools</li>
            </ul>
          </div>
          
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 border border-green-200 dark:border-green-800">
            <h3 className="font-semibold text-green-900 dark:text-green-100 mb-4 flex items-center">
              <BarChart3 className="w-5 h-5 mr-2" />
              Benefits
            </h3>
            <ul className="space-y-2 text-green-800 dark:text-green-200 text-sm">
              <li>• Streamlined compliance processes</li>
              <li>• Automated reporting and analytics</li>
              <li>• Risk assessment and gap analysis</li>
              <li>• Audit readiness preparation</li>
              <li>• Cost reduction through automation</li>
              <li>• Expert guidance and best practices</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

// Simple Coming Soon Component
const ComingSoon: React.FC<{ title: string; description: string }> = ({ title, description }) => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-12 text-center">
        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 bg-blue-100 dark:bg-blue-900/30 rounded-full">
          <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{title}</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">{description}</p>
        <button
          onClick={() => navigate('/dashboard')}
          className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>
      </div>
    </div>
  );
};

// Main App Component
function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // State management for assessments
  const [savedAssessments, setSavedAssessments] = useState<AssessmentData[]>([]);
  const [currentAssessment, setCurrentAssessment] = useState<AssessmentData | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [notifications, setNotifications] = useState<NotificationMessage[]>([]);

  // Load data on app startup
  useEffect(() => {
    const assessments = dataService.getAssessments();
    setSavedAssessments(assessments);
    
    const profile = dataService.getUserProfile();
    setUserProfile(profile);
  }, []);

  const addNotification = (type: 'success' | 'error' | 'warning' | 'info', message: string) => {
    const notification: NotificationMessage = {
      id: Date.now().toString(),
      type,
      message,
      timestamp: new Date(),
      category: 'system',
      priority: type === 'error' ? 'high' : 'medium'
    };
    setNotifications(prev => [...prev, notification]);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  // Assessment handlers
  const handleStartAssessment = (organizationInfo?: OrganizationInfo, selectedFramework?: string) => {
    const frameworkId = selectedFramework || 'nist-csf-v2';
    const framework = getFramework(frameworkId);
    
    const newAssessment: AssessmentData = {
      id: Date.now().toString(),
      frameworkId,
      frameworkName: framework.name,
      responses: {},
      createdAt: new Date(),
      lastModified: new Date(),
      isComplete: false,
      version: '1.0',
      organizationInfo,
      questionNotes: {},
      questionEvidence: {},
      evidenceLibrary: [],
      assessmentVersion: '1.0.0',
      versionHistory: [],
      changeLog: [],
      tags: []
    };

    setCurrentAssessment(newAssessment);
    navigate(`/assessment/${newAssessment.id}`);
    addNotification('success', 'Assessment started successfully');
  };

  const handleSaveAssessment = (assessment: AssessmentData) => {
    dataService.saveAssessment(assessment);
    setSavedAssessments(prev => {
      const index = prev.findIndex(a => a.id === assessment.id);
      if (index >= 0) {
        const updated = [...prev];
        updated[index] = assessment;
        return updated;
      }
      return [...prev, assessment];
    });
    setCurrentAssessment(assessment);
    addNotification('success', 'Assessment saved successfully');
  };

  const handleLoadAssessment = (assessment: AssessmentData) => {
    setCurrentAssessment(assessment);
    navigate(`/assessment/${assessment.id}`);
  };

  const handleDeleteAssessment = (assessmentId: string) => {
    dataService.deleteAssessment(assessmentId);
    setSavedAssessments(prev => prev.filter(a => a.id !== assessmentId));
    addNotification('success', 'Assessment deleted successfully');
  };

  const handleGenerateReport = (assessment: AssessmentData) => {
    navigate(`/report/${assessment.id}`);
  };

  const handleExportAssessment = (assessment: AssessmentData, format: 'json' | 'csv' | 'pdf') => {
    try {
      const dataStr = JSON.stringify(assessment, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${assessment.frameworkName}-${assessment.id}-${new Date().toISOString().split('T')[0]}.json`;
      link.click();
      URL.revokeObjectURL(url);
      addNotification('success', 'Assessment exported successfully');
    } catch (error) {
      addNotification('error', 'Failed to export assessment');
    }
  };

  const isActivePath = (path: string) => location.pathname === path;

  const handleNavClick = (path: string) => {
    console.log(`Navigation clicked: ${path}`);
    setMobileMenuOpen(false);
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <img src="/cybercorrect.png" alt="CyberCorrect Logo" className="w-8 h-8 rounded-lg" />
              <div>
                <h1 className="text-lg font-bold text-gray-900 dark:text-white">CyberCorrect™</h1>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link
                to="/"
                className={`text-sm font-medium transition-colors flex items-center space-x-1 ${
                  isActivePath('/') ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300 hover:text-blue-600'
                }`}
              >
                <Home className="w-4 h-4" />
                <span>Home</span>
              </Link>
              <Link
                to="/dashboard"
                className={`text-sm font-medium transition-colors flex items-center space-x-1 ${
                  isActivePath('/dashboard') ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300 hover:text-blue-600'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                <span>Dashboard</span>
              </Link>
              <Link
                to="/assessment-intro"
                className={`text-sm font-medium transition-colors flex items-center space-x-1 ${
                  isActivePath('/assessment-intro') ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300 hover:text-blue-600'
                }`}
              >
                <Target className="w-4 h-4" />
                <span>Assessment</span>
              </Link>
              <Link
                to="/about"
                className={`text-sm font-medium transition-colors flex items-center space-x-1 ${
                  isActivePath('/about') ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300 hover:text-blue-600'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>About</span>
              </Link>
            </nav>

            {/* Right side controls */}
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
            <button
              onClick={() => handleNavClick('/')}
              className="block w-full text-left px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('/dashboard')}
              className="block w-full text-left px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              Dashboard
            </button>
            <button
              onClick={() => handleNavClick('/assessment-intro')}
              className="block w-full text-left px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              Assessment
            </button>
            <button
              onClick={() => handleNavClick('/about')}
              className="block w-full text-left px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              About
            </button>
          </nav>
        </div>
      )}

      {/* Notification System */}
      <NotificationSystem notifications={notifications} onRemove={removeNotification} />

      {/* Main Content */}
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          
          <Route path="/dashboard" element={
            <AdvancedDashboard
              savedAssessments={savedAssessments}
              onStartAssessment={() => navigate('/assessment-intro')}
              onLoadAssessment={handleLoadAssessment}
              onDeleteAssessment={handleDeleteAssessment}
              onGenerateReport={handleGenerateReport}
              onExportAssessment={handleExportAssessment}
              onImportAssessment={() => {}}
              userProfile={userProfile}
              addNotification={addNotification}
            />
          } />
          
          <Route path="/assessment-intro" element={
            <AssessmentIntroScreen
              frameworks={frameworks}
              onStartAssessment={handleStartAssessment}
              onBack={() => navigate('/dashboard')}
            />
          } />
          
          <Route path="/assessment/:id" element={
            currentAssessment ? (
              <EnhancedAssessmentView
                assessment={currentAssessment}
                onSave={handleSaveAssessment}
                onGenerateReport={handleGenerateReport}
                onBack={() => navigate('/dashboard')}
              />
            ) : (
              <div className="max-w-4xl mx-auto px-4 py-8 text-center">
                <p className="text-gray-600 dark:text-gray-300">Assessment not found</p>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Back to Dashboard
                </button>
              </div>
            )
          } />
          
          <Route path="/report/:id" element={
            (() => {
              const assessmentId = location.pathname.split('/')[2];
              const assessment = savedAssessments.find(a => a.id === assessmentId);
              
              if (!assessment) {
                return (
                  <div className="max-w-4xl mx-auto px-4 py-8 text-center">
                    <p className="text-gray-600 dark:text-gray-300">Report not found</p>
                    <button
                      onClick={() => navigate('/dashboard')}
                      className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Back to Dashboard
                    </button>
                  </div>
                );
              }
              
              const framework = getFramework(assessment.frameworkId);
              
              return (
                <ReportView
                  assessment={assessment}
                  framework={framework}
                  onBack={() => navigate('/dashboard')}
                  onExport={handleExportAssessment}
                  userProfile={userProfile}
                />
              );
            })()
          } />
          
          <Route path="/about" element={<AboutPage />} />
          
          {/* Placeholder routes */}
          <Route path="/compliance/*" element={
            <ComingSoon title="Compliance Status" description="Real-time compliance monitoring features coming soon" />
          } />
          <Route path="/evidence" element={
            <ComingSoon title="Evidence Collection" description="Evidence management features coming soon" />
          } />
          <Route path="/assets" element={
            <ComingSoon title="Asset Management" description="Asset inventory and management features coming soon" />
          } />
          <Route path="/team" element={
            <ComingSoon title="Team Collaboration" description="Team management features coming soon" />
          } />
          <Route path="/reports" element={
            <ComingSoon title="Advanced Reports" description="Advanced reporting features coming soon" />
          } />
          <Route path="/calendar" element={
            <ComingSoon title="Activity Calendar" description="Calendar features coming soon" />
          } />
          <Route path="/tasks" element={
            <ComingSoon title="Task Management" description="Task management features coming soon" />
          } />
          <Route path="/policies" element={
            <ComingSoon title="Policy Management" description="Policy management features coming soon" />
          } />
          <Route path="/controls" element={
            <ComingSoon title="Controls Management" description="Controls management features coming soon" />
          } />
          
          <Route path="*" element={
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-12 text-center">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Page Not Found</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">The page you're looking for doesn't exist.</p>
                <Link
                  to="/"
                  className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Home className="w-4 h-4" />
                  <span>Go Home</span>
                </Link>
              </div>
            </div>
          } />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <AppContent />
  );
}

export default App;