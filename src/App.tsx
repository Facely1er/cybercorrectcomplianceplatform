import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { Shield, Menu, X, Sun, Moon, Home, Target, BarChart3, Play, ChevronLeft } from 'lucide-react';
import { useTheme } from './shared/contexts/ThemeContext';

// Simple Theme Toggle Component
const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
      aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
    >
      {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
    </button>
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

// Simple Dashboard
const Dashboard: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Cybersecurity Compliance Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Manage your cybersecurity assessments and compliance progress
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Assessments</p>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">0</p>
            </div>
            <Target className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Completed</p>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">0</p>
            </div>
            <BarChart3 className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">In Progress</p>
              <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">0</p>
            </div>
            <Shield className="w-8 h-8 text-orange-600 dark:text-orange-400" />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Start Your First Assessment
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Begin your cybersecurity compliance journey with our guided assessment tools
        </p>
        <button className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors">
          Start Assessment
        </button>
      </div>
    </div>
  );
};

// Simple About Page
const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
        <button
          onClick={() => window.history.back()}
          className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 mb-6"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back</span>
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
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-12 text-center">
        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 bg-blue-100 dark:bg-blue-900/30 rounded-full">
          <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{title}</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">{description}</p>
        <Link
          to="/dashboard"
          className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </Link>
      </div>
    </div>
  );
};

// Main App Component
function AppContent() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActivePath = (path: string) => location.pathname === path;

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
                to="/about"
                className={`text-sm font-medium transition-colors flex items-center space-x-1 ${
                  isActivePath('/about') ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300 hover:text-blue-600'
                }`}
              >
                <Target className="w-4 h-4" />
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
            <Link 
              to="/" 
              className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg" 
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/dashboard" 
              className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg" 
              onClick={() => setMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link 
              to="/about" 
              className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg" 
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Cybersecurity Compliance Dashboard
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                  Manage your cybersecurity assessments and compliance progress
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Assessments</p>
                      <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">0</p>
                    </div>
                    <Target className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Completed</p>
                      <p className="text-3xl font-bold text-green-600 dark:text-green-400">0</p>
                    </div>
                    <BarChart3 className="w-8 h-8 text-green-600 dark:text-green-400" />
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">In Progress</p>
                      <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">0</p>
                    </div>
                    <Shield className="w-8 h-8 text-orange-600 dark:text-orange-400" />
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 text-center">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Start Your First Assessment
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Begin your cybersecurity compliance journey with our guided assessment tools
                </p>
                <button className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors">
                  Start Assessment
                </button>
              </div>
            </div>
          } />
          
          <Route path="/about" element={<AboutPage />} />
          
          {/* Simple placeholders for other routes */}
          <Route path="/assessment-intro" element={
            <ComingSoon title="Assessment Setup" description="Framework selection and assessment configuration coming soon" />
          } />
          
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
            <ComingSoon title="Controls Management" description="Security controls management coming soon" />
          } />
          
          <Route path="/settings" element={
            <ComingSoon title="Settings" description="Application settings coming soon" />
          } />
          
          <Route path="/help" element={
            <ComingSoon title="Help & Support" description="Help documentation coming soon" />
          } />
          
          {/* Fallback route */}
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