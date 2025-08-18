import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import { 
  Shield, BarChart3, Settings, HelpCircle, Menu, X, Home, ChevronDown,
  Activity, FileText, Calendar, Users, CheckSquare, Target, Award, Building, Eye,
  Mail, ExternalLink, TrendingUp, Zap
} from 'lucide-react';
import { ThemeProvider, useTheme } from './shared/contexts/ThemeContext';
import { ThemeToggle } from './shared/components/ui/ThemeToggle';
import { ErrorBoundary } from './components/ErrorBoundary';
import { NotificationSystem } from './shared/components/ui/NotificationSystem';
import { errorMonitoring } from './lib/errorMonitoring';
import { performanceMonitoring } from './lib/performanceMonitoring';
import { enhancedDataService } from './services/enhancedDataService';
import { assessmentService } from './services/assessmentService';
import { ErrorState, EmptyState } from './shared/components/ui/LoadingStates';
import { LandingPage } from './components/LandingPage';
import { AssessmentIntroScreen } from './features/assessment/components/AssessmentIntroScreen';
import { SignInPage } from './features/auth';
import { AdvancedDashboard } from './features/assessment/components/AdvancedDashboard';
import { RealTimeComplianceStatus } from './features/compliance/components/RealTimeComplianceStatus';
import { EvidenceCollectionDashboard } from './features/evidence/components/EvidenceCollectionDashboard';
import { AdvancedReportingDashboard } from './features/reporting/components/AdvancedReportingDashboard';
import { AssessmentReportsPage } from './features/reporting/components/AssessmentReportsPage';
import { TeamTrackingReport } from './features/reporting/components/TeamTrackingReport';
import { ComplianceCalendarView } from './features/calendar/components/ComplianceCalendarView';
import { PolicyManagementView } from './features/policies';
import { ControlsManagementView } from './features/controls/components/ControlsManagementView';
import { TeamCollaborationDashboard } from './features/collaboration/components/TeamCollaborationDashboard';
import { TaskManagementDashboard } from './features/tasks/components/TaskManagementDashboard';
import { AssetDashboard } from './features/assets/components/AssetDashboard';
import { AssetInventoryView } from './features/assets/components/AssetInventoryView';
import { AssetCreationForm } from './features/assets/components/AssetCreationForm';
import { EnhancedAssessmentView } from './features/assessment/components/EnhancedAssessmentView';
import { ReportView } from './features/reporting/components/ReportView';
import { NistStandardCompliancePage, NistExtendedCompliancePage, CmmcCompliancePage, PrivacyCompliancePage } from './features/compliance';
import { SettingsView } from './shared/components/ui/SettingsView';
import { HelpView } from './shared/components/ui/HelpView';
import { ProductionReadinessWidget } from './components/ProductionReadinessWidget';
import { getFramework, frameworks, nistCSFv2Framework, nistCSFv2ExtendedFramework, cmmcFramework, privacyFramework } from './data/frameworks';
import { assessmentFrameworks } from './data/frameworks';
import { AssessmentData, NotificationMessage } from './shared/types';
import { dataService } from './services/dataService';
import { Analytics } from "@vercel/analytics/react";

// Assessment Wrapper Component
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
          <p className="text-gray-600 dark:text-gray-300 mb-4">The assessment you're looking for doesn't exist.</p>
          <button 
            onClick={onBack}
            className="px-4 py-2 bg-primary-teal text-white rounded-lg hover:bg-primary-teal/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-teal focus:ring-offset-2"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }
  
  // Validate that the assessment has a valid framework
  try {
    const framework = getFramework(assessment.frameworkId);
    if (!framework || !framework.sections || framework.sections.length === 0) {
      return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Framework Error</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              The framework for this assessment (ID: {assessment.frameworkId}) could not be loaded.
            </p>
            <button 
              onClick={onBack}
              className="px-4 py-2 bg-primary-teal text-white rounded-lg hover:bg-primary-teal/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-teal focus:ring-offset-2"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      );
    }
  } catch (error) {
    console.error('Framework validation error:', error);
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Framework Loading Error</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            There was an error loading the framework data for this assessment.
          </p>
          <button 
            onClick={onBack}
            className="px-4 py-2 bg-primary-teal text-white rounded-lg hover:bg-primary-teal/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-teal focus:ring-offset-2"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <EnhancedAssessmentView
      assessment={assessment}
      onSave={onSave}
      onGenerateReport={onGenerateReport}
      onBack={onBack}
    />
  );
};

// Report Wrapper Component  
const ReportWrapper: React.FC<{
  savedAssessments: AssessmentData[];
  onBack: () => void;
  onExport: (assessment: AssessmentData, format: string) => void;
}> = ({ savedAssessments, onBack, onExport }) => {
  const { id } = useParams<{ id: string }>();
  const assessment = savedAssessments.find(a => a.id === id);
  
  if (!assessment) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Report Not Found</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">The assessment report you're looking for doesn't exist.</p>
          <button 
            onClick={onBack}
            className="px-4 py-2 bg-primary-teal text-white rounded-lg hover:bg-primary-teal/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-teal focus:ring-offset-2"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <ReportView
      assessment={assessment}
      onBack={onBack}
      onExport={onExport}
    />
  );
};

// Dropdown Navigation Component
interface DropdownNavItemProps {
  label: string;
  icon: React.ComponentType<any>;
  items: Array<{
    label: string;
    href: string;
    icon: React.ComponentType<any>;
    description?: string;
  }>;
  currentPath: string;
}

const DropdownNavItem: React.FC<DropdownNavItemProps> = ({ label, icon: Icon, items, currentPath }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const isActive = items.some(item => currentPath === item.href);
  
  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        className={`flex items-center space-x-2 px-2 py-2 rounded-lg text-sm font-medium transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary-teal focus:ring-offset-2 ${
          isActive
            ? 'bg-primary-teal/10 dark:bg-dark-primary/20 text-primary-teal dark:text-dark-primary'
            : 'text-gray-600 dark:text-gray-300 hover:text-primary-teal dark:hover:text-dark-primary hover:bg-primary-teal/10 dark:hover:bg-dark-primary/20'
        }`}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Icon className="w-4 h-4" aria-hidden="true" />
        <span>{label}</span>
        <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>
      
      {isOpen && (
        <div 
          className="absolute top-full left-0 w-64 bg-surface dark:bg-dark-surface rounded-xl shadow-enhanced border border-support-gray dark:border-dark-support py-2 z-50"
          role="menu"
          aria-label={`${label} submenu`}
        >
          {items.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`flex items-center space-x-3 px-4 py-3 hover:bg-primary-teal/10 dark:hover:bg-dark-primary/20 hover:text-primary-teal dark:hover:text-dark-primary transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-teal ${
                currentPath === item.href
                  ? 'bg-primary-teal/10 dark:bg-dark-primary/20 text-primary-teal dark:text-dark-primary'
                  : 'text-gray-700 dark:text-dark-text'
              }`}
              role="menuitem"
            >
              <item.icon className="w-4 h-4 text-gray-400 dark:text-gray-500" aria-hidden="true" />
              <div>
                <div className="font-medium">{item.label}</div>
                {item.description && (
                  <div className="text-xs text-gray-500 dark:text-gray-400">{item.description}</div>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useTheme();
  
  // Enhanced state management with localStorage
  const [notifications, setNotifications] = useState<NotificationMessage[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAssetForm, setShowAssetForm] = useState(false);

  // Use local data service directly for better reliability
  const [savedAssessments, setSavedAssessments] = useState<AssessmentData[]>([]);
  const [assets, setAssets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Initialize monitoring on app start
  useEffect(() => {
    errorMonitoring.initialize();
    performanceMonitoring.initialize();
    
    // Load data from localStorage
    try {
      const assessments = dataService.getAssessments();
      const assetData = dataService.getAssets();
      setSavedAssessments(assessments);
      setAssets(assetData);
      
      // Load demo data if this is first visit and no data exists
      if (assessments.length === 0 && assetData.length === 0 && !dataService.isDemoDataLoaded()) {
        const shouldLoadDemo = !localStorage.getItem('demo-declined') && window.confirm(
          'Welcome to CyberCorrect™! Would you like to load demo data to explore the platform?\n\n' +
          'Demo data includes:\n' +
          '• Sample CMMC Level 2 assessment\n' +
          '• Example assets and compliance tasks\n' +
          '• Mock evidence collections\n\n' +
          'You can clear this demo data anytime in Settings when ready for real business use.'
        );
        
        if (shouldLoadDemo) {
          dataService.loadDemoData();
          setSavedAssessments(dataService.getAssessments());
          setAssets(dataService.getAssets());
          addNotification('info', 'Demo data loaded successfully! Go to Settings > Data Management to clear when ready for real business use.');
        } else {
          // Remember user declined demo data
          localStorage.setItem('demo-declined', 'true');
        }
      }
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Navigation menu structure
  const navigationMenus = [
    {
     label: 'Assessment',
     icon: Target,
      items: [
        {
         label: 'Start Assessment',
         href: '/assessment-intro',
         icon: Target,
         description: 'Begin cybersecurity framework assessment'
        },
        {
         label: 'CMMC Assessment',
         href: '/compliance/cmmc',
         icon: Building,
         description: 'CMMC Level 2 certification readiness'
        },
        {
         label: 'Privacy Assessment',
         href: '/compliance/privacy',
         icon: Eye,
         description: 'GDPR, CCPA & privacy regulations'
        },
        {
          label: 'NIST CSF v2.0',
          href: '/compliance/nist-extended',
          icon: Award,
          description: 'Comprehensive 106-subcategory assessment'
        }
      ]
    },
    {
     label: 'Implementation',
     icon: Settings,
      items: [
        {
         label: 'Evidence Collection',
         href: '/evidence',
         icon: FileText,
         description: 'Manage compliance documentation'
        },
        {
         label: 'Policy Management',
         href: '/policies',
         icon: Shield,
         description: 'Required policies and procedures'
        },
        {
         label: 'Controls Management',
         href: '/controls',
         icon: CheckSquare,
         description: 'Security controls implementation'
        },
        {
         label: 'Asset Management',
         href: '/assets',
         icon: BarChart3,
         description: 'Inventory and scope management'
        }
      ]
    },
    {
     label: 'Monitoring',
     icon: Activity,
      items: [
        {
          label: 'Compliance Status',
          href: '/compliance',
         icon: Activity,
          description: 'Real-time implementation progress'
        },
        {
         label: 'Real-Time Status',
         href: '/compliance/status',
         icon: TrendingUp,
         description: 'Live compliance monitoring'
        },
        {
          label: 'Activity Calendar',
          href: '/calendar',
          icon: Calendar,
          description: 'Schedule compliance activities'
        }
      ]
    },
    {
     label: 'Collaboration',
      icon: Users,
      items: [
        {
         label: 'Team Collaboration',
          href: '/team',
          icon: Users,
          description: 'Coordinate implementation efforts'
        },
        {
          label: 'Task Management',
          href: '/tasks',
          icon: CheckSquare,
          description: 'Track tasks and deliverables'
        }
      ]
    },
    {
     label: 'Reports',
     icon: FileText,
     items: [
       {
         label: 'Assessment Reports',
         href: '/reports',
         icon: FileText,
         description: 'Generate detailed reports'
       },
       {
         label: 'Advanced Analytics',
         href: '/reports/advanced',
         icon: BarChart3,
         description: 'Comprehensive analytics dashboard'
       },
       {
         label: 'Team Performance',
         href: '/reports/team',
         icon: Users,
         description: 'Team productivity and tracking'
       }
     ]
    }
  ];

  // Simple notification handlers
  const addNotification = (type: 'success' | 'error' | 'warning' | 'info', message: string) => {
    const notification: NotificationMessage = {
      id: Date.now().toString(),
      type,
      message,
      timestamp: new Date()
    };
    setNotifications(prev => [...prev, notification]);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  // Simple assessment handlers
  const startAssessment = () => {
    console.log('Starting assessment - navigating to /assessment-intro');
    navigate('/assessment-intro');
  };

  const createAssessment = async (organizationInfo?: any, selectedFramework?: string) => {
    console.log('Creating new assessment');
    
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

      // Save using local data service directly
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
    console.log('Saving assessment:', assessment.id);
    
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
    console.log('Deleting assessment:', assessmentId);
    
    try {
      dataService.deleteAssessment(assessmentId);
      setSavedAssessments(prev => prev.filter(a => a.id !== assessmentId));
      addNotification('success', 'Assessment deleted successfully');
    } catch (error) {
      console.error('Failed to delete assessment:', error);
      addNotification('error', 'Failed to delete assessment');
    }
  };

  // Asset management handlers
  const createAsset = async (assetData: any) => {
    try {
      const newAsset = {
        ...assetData,
        id: Date.now().toString(),
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      dataService.saveAsset(newAsset);
      setAssets(prev => [...prev, newAsset]);
      addNotification('success', 'Asset created successfully');
    } catch (error) {
      console.error('Failed to create asset:', error);
      addNotification('error', 'Failed to create asset');
    }
  };

  const isHomePage = location.pathname === '/';
  
  // Show loading screen while data loads
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-primary-teal border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading application data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Skip Links for Screen Readers */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary-teal focus:text-white focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
      >
        Skip to main content
      </a>
      <a 
        href="#navigation" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-20 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary-teal focus:text-white focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
      >
        Skip to navigation
      </a>
      
      <ErrorBoundary>
        {/* Header - always visible */}
        <header id="navigation" className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Left: Logo */}
              <Link
                to="/"
                className="flex items-center space-x-3 hover:opacity-80 transition-opacity flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-primary-teal focus:ring-offset-2 rounded-lg"
              >
                <img src="/cybercorrect.png" alt="CyberCorrect Logo" className="w-11 h-11 rounded-lg" />
                <div>
                  <h1 className="text-xl font-bold text-gray-900 dark:text-white">CyberCorrect™</h1>
                  <p className="text-xs text-gray-500 dark:text-gray-400">by ERMITS</p>
                </div>
              </Link>

              {/* Center: Navigation */}
              <nav className="hidden lg:flex items-center justify-center space-x-0.5 flex-1 mx-4" role="navigation" aria-label="Main navigation">
                <Link
                  to="/"
                  className={`flex items-center space-x-2 px-2 py-2 rounded-lg text-sm font-medium transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary-teal focus:ring-offset-2 ${
                    location.pathname === '/'
                      ? 'bg-primary-teal/10 dark:bg-dark-primary/20 text-primary-teal dark:text-dark-primary'
                      : 'text-gray-600 dark:text-gray-300 hover:text-primary-teal dark:hover:text-dark-primary'
                  }`}
                >
                  <Home className="w-4 h-4" aria-hidden="true" />
                  <span>Home</span>
                </Link>
                
                <Link
                  to="/dashboard"
                  className={`flex items-center space-x-2 px-2 py-2 rounded-lg text-sm font-medium transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary-teal focus:ring-offset-2 ${
                    location.pathname === '/dashboard'
                      ? 'bg-primary-teal/10 dark:bg-dark-primary/20 text-primary-teal dark:text-dark-primary'
                      : 'text-gray-600 dark:text-gray-300 hover:text-primary-teal dark:hover:text-dark-primary'
                  }`}
                >
                  <BarChart3 className="w-4 h-4" aria-hidden="true" />
                  <span>Dashboard</span>
                </Link>
                
                {/* Dropdown Menus */}
                {navigationMenus.map((menu) => (
                  <DropdownNavItem
                    key={menu.label}
                    label={menu.label}
                    icon={menu.icon}
                    items={menu.items}
                    currentPath={location.pathname}
                  />
                ))}
              </nav>

              {/* Right: Actions */}
              <div className="flex items-center space-x-2 flex-shrink-0">
                <ThemeToggle />
                <Link
                  to="/signin"
                  className="p-2 rounded-lg bg-support-gray/50 dark:bg-dark-surface text-gray-600 dark:text-gray-300 hover:bg-primary-teal/10 dark:hover:bg-dark-primary/20 hover:text-primary-teal dark:hover:text-dark-primary transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary-teal focus:ring-offset-2"
                  title="Sign In"
                  aria-label="Sign In"
                >
                  <Users className="w-5 h-5" aria-hidden="true" />
                </Link>
                <Link
                  to="/settings"
                  className="p-2 rounded-lg bg-support-gray/50 dark:bg-dark-surface text-gray-600 dark:text-gray-300 hover:bg-primary-teal/10 dark:hover:bg-dark-primary/20 hover:text-primary-teal dark:hover:text-dark-primary transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary-teal focus:ring-offset-2"
                  aria-label="Settings"
                >
                  <Settings className="w-5 h-5" aria-hidden="true" />
                </Link>
                <Link
                  to="/help"
                  className="p-2 rounded-lg bg-support-gray/50 dark:bg-dark-surface text-gray-600 dark:text-gray-300 hover:bg-primary-teal/10 dark:hover:bg-dark-primary/20 hover:text-primary-teal dark:hover:text-dark-primary transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary-teal focus:ring-offset-2"
                  aria-label="Help"
                >
                  <HelpCircle className="w-5 h-5" aria-hidden="true" />
                </Link>
                
                {/* Mobile Menu Button */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="lg:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-teal focus:ring-offset-2"
                  aria-expanded={mobileMenuOpen}
                  aria-controls="mobile-menu"
                  aria-label="Toggle mobile menu"
                >
                  {mobileMenuOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
                </button>
              </div>
            </div>
          </div>
        </header>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div id="mobile-menu" className="md:hidden bg-surface dark:bg-dark-surface border-t border-support-gray dark:border-dark-support">
            <nav className="px-4 py-2 space-y-1" role="navigation" aria-label="Mobile navigation">
              <Link
                to="/"
                className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 dark:text-dark-text hover:bg-primary-teal/10 dark:hover:bg-dark-primary/20 hover:text-primary-teal dark:hover:text-dark-primary transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-teal"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Home className="w-4 h-4" aria-hidden="true" />
                <span>Home</span>
              </Link>
              
              <Link
                to="/dashboard"
                className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 dark:text-dark-text hover:bg-primary-teal/10 dark:hover:bg-dark-primary/20 hover:text-primary-teal dark:hover:text-dark-primary transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-teal"
                onClick={() => setMobileMenuOpen(false)}
              >
                <BarChart3 className="w-4 h-4" aria-hidden="true" />
                <span>Dashboard</span>
              </Link>
              
              {/* Mobile menu items - flattened structure */}
              {navigationMenus.map((menu) =>
                menu.items.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 dark:text-dark-text hover:bg-primary-teal/10 dark:hover:bg-dark-primary/20 hover:text-primary-teal dark:hover:text-dark-primary transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-teal"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <item.icon className="w-4 h-4" aria-hidden="true" />
                    <span>{item.label}</span>
                  </Link>
                ))
              )}
              
              <Link
                to="/signin"
                className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 dark:text-dark-text hover:bg-primary-teal/10 dark:hover:bg-dark-primary/20 hover:text-primary-teal dark:hover:text-dark-primary transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-teal"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Users className="w-4 h-4" aria-hidden="true" />
                <span>Sign In</span>
              </Link>
              
              <Link
                to="/reports"
                className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 dark:text-dark-text hover:bg-primary-teal/10 dark:hover:bg-dark-primary/20 hover:text-primary-teal dark:hover:text-dark-primary transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-teal"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Award className="w-4 h-4" aria-hidden="true" />
                <span>Reports</span>
              </Link>
            </nav>
          </div>
        )}
      </ErrorBoundary>

      {/* Main Content */}
      <main id="main-content" role="main">
        <ErrorBoundary>
          <Routes>
            {/* Homepage */}
            <Route path="/" element={
              <ErrorBoundary>
                <LandingPage />
              </ErrorBoundary>
            } />
            
            {/* Authentication */}
            <Route path="/signin" element={
              <ErrorBoundary>
                <SignInPage />
              </ErrorBoundary>
            } />
            
            {/* Assessment Flow */}
            <Route path="/assessment-intro" element={
              <ErrorBoundary>
              <AssessmentIntroScreen
                frameworks={assessmentFrameworks}
                onStartAssessment={createAssessment}
                onBack={() => navigate('/')}
              />
              </ErrorBoundary>
            } />
            
            {/* Specific Framework Assessment Routes */}
            <Route path="/nist-standard" element={
              <AssessmentIntroScreen
                frameworks={[nistCSFv2Framework]}
                onStartAssessment={createAssessment}
                onBack={() => navigate('/')}
              />
            } />
            
            <Route path="/nist-extended" element={
              <AssessmentIntroScreen
                frameworks={[nistCSFv2ExtendedFramework]}
                onStartAssessment={createAssessment}
                onBack={() => navigate('/')}
              />
            } />
            
            <Route path="/cmmc-assessment" element={
              <AssessmentIntroScreen
                frameworks={[cmmcFramework]}
                onStartAssessment={createAssessment}
                onBack={() => navigate('/')}
              />
            } />
            
            <Route path="/nist-lite" element={
              <AssessmentIntroScreen
                frameworks={[nistCSFv2Framework]}
                onStartAssessment={createAssessment}
                onBack={() => navigate('/')}
              />
            } />
            
            <Route path="/privacy-assessment" element={
              <AssessmentIntroScreen
                frameworks={[privacyFramework]}
                onStartAssessment={createAssessment}
                onBack={() => navigate('/')}
              />
            } />
            
            <Route path="/privacy-policy" element={
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Privacy Policy</h1>
                  <p className="text-gray-600 dark:text-gray-300">
                    This application stores all data locally in your browser. No personal information is transmitted to external servers.
                  </p>
                </div>
              </div>
            } />
            
            <Route path="/terms" element={
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Terms of Service</h1>
                  <p className="text-gray-600 dark:text-gray-300">
                    By using this application, you agree to use it for legitimate cybersecurity assessment purposes only.
                  </p>
                </div>
              </div>
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
                onExport={(assessment, format) => {
                  try {
                    const framework = getFramework(assessment.frameworkId);
                    reportService.exportReport(assessment, framework, { 
                      format,
                      includeExecutiveSummary: true,
                      includeDetailedAnalysis: true,
                      includeRecommendations: true,
                      includeGapAnalysis: true,
                      includeNextSteps: true,
                      branding: {
                        organizationName: assessment.organizationInfo?.name || 'Organization'
                      }
                    });
                    addNotification('success', `Report exported as ${format.toUpperCase()}`);
                  } catch (error) {
                    addNotification('error', `Failed to export report: ${(error as Error).message}`);
                  }
                }}
              />
            } />
            
            {/* Dashboard */}
            <Route path="/dashboard" element={
              <ErrorBoundary>
              <AdvancedDashboard
                savedAssessments={savedAssessments}
                onStartAssessment={startAssessment}
                onLoadAssessment={(assessment) => navigate(`/assessment/${assessment.id}`)}
                onDeleteAssessment={deleteAssessment}
                onGenerateReport={(assessment) => navigate(`/report/${assessment.id}`)}
                onExportAssessment={(assessment, format) => {
                  try {
                    const framework = getFramework(assessment.frameworkId);
                    reportService.exportReport(assessment, framework, { format });
                    addNotification('success', `Assessment exported as ${format.toUpperCase()}`);
                  } catch (error) {
                    addNotification('error', 'Failed to export assessment');
                  }
                }}
                onImportAssessment={() => addNotification('info', 'Import feature')}
                userProfile={null}
                addNotification={addNotification}
              />
              </ErrorBoundary>
            } />
            
            {/* New Compliance Pages */}
            <Route path="/compliance/nist-standard" element={
              <NistStandardCompliancePage />
            } />

            <Route path="/compliance/nist-extended" element={
              <NistExtendedCompliancePage />
            } />

            <Route path="/compliance/cmmc" element={
              <CmmcCompliancePage />
            } />

            <Route path="/compliance/privacy" element={
              <PrivacyCompliancePage />
            } />

            {/* Existing Compliance Status page, now under /compliance/status */}
            <Route path="/compliance/status" element={
              <RealTimeComplianceStatus
                onViewDetails={() => addNotification('info', 'View details')}
                onAcknowledgeAlert={() => addNotification('success', 'Alert acknowledged')}
              />
            } />
            {/* Implementation Pages */}
            <Route path="/compliance" element={
              <RealTimeComplianceStatus
                onViewDetails={() => addNotification('info', 'View details')}
                onAcknowledgeAlert={() => addNotification('success', 'Alert acknowledged')}
              />
            } />
            
            <Route path="/evidence" element={
              <EvidenceCollectionDashboard
                onBack={() => navigate('/dashboard')}
                addNotification={addNotification}
              />
            } />
            
            <Route path="/policies" element={
              <PolicyManagementView
                onBack={() => navigate('/dashboard')}
                addNotification={addNotification}
              />
            } />
            
            <Route path="/controls" element={
              <ControlsManagementView
                onBack={() => navigate('/dashboard')}
                addNotification={addNotification}
              />
            } />
            
            <Route path="/team" element={
              <TeamCollaborationDashboard
                onBack={() => navigate('/dashboard')}
                addNotification={addNotification}
              />
            } />
            
            <Route path="/tasks" element={
              <TaskManagementDashboard
                onBack={() => navigate('/dashboard')}
                addNotification={addNotification}
              />
            } />
            
            <Route path="/calendar" element={
              <ComplianceCalendarView
                onBack={() => navigate('/dashboard')}
                addNotification={addNotification}
              />
            } />
            
            <Route path="/assets" element={
              <AssetDashboard
                assets={assets}
                onViewAsset={() => addNotification('info', 'Asset view feature')}
                onCreateAsset={() => setShowAssetForm(true)}
                onViewInventory={() => addNotification('info', 'Asset inventory view')}
                onViewCategories={() => addNotification('info', 'Asset categories view')}
                onViewDependencies={() => addNotification('info', 'Asset dependencies view')}
                onViewWorkflow={() => addNotification('info', 'Asset workflow view')}
                onViewRoadmap={() => addNotification('info', 'Asset roadmap view')}
                onViewActionPlan={() => addNotification('info', 'Asset action plan view')}
              />
            } />
            
            <Route path="/reports" element={
              <AssessmentReportsPage
                savedAssessments={savedAssessments}
                onGenerateReport={(assessment) => navigate(`/report/${assessment.id}`)}
                onExportReport={(assessment, format) => {
                  try {
                    const framework = getFramework(assessment.frameworkId);
                    reportService.exportReport(assessment, framework, { format });
                    addNotification('success', `Report exported as ${format.toUpperCase()}`);
                  } catch (error) {
                    addNotification('error', 'Failed to export report');
                  }
                }}
                onStartAssessment={startAssessment}
                userProfile={null}
                addNotification={addNotification}
              />
            } />
            
            <Route path="/reports/advanced" element={
              <AdvancedReportingDashboard
                savedAssessments={savedAssessments}
                userProfile={null}
                onExportReport={(format) => addNotification('info', `Export ${format} feature`)}
              />
            } />
            
            <Route path="/reports/team" element={
              <TeamTrackingReport
                onBack={() => navigate('/dashboard')}
                onExportReport={(format) => addNotification('info', `Export ${format} feature`)}
              />
            } />
            
            <Route path="/settings" element={
              <SettingsView
                onBack={() => navigate('/dashboard')}
                addNotification={addNotification}
              />
            } />
            
            <Route path="/help" element={
              <HelpView
                onBack={() => navigate('/dashboard')}
              />
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