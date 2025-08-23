import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
;

export const SimpleLandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleStartClick = () => {
    console.log('Navigate to assessment-intro');
    navigate('/assessment-intro');
  };

  const handleDashboardClick = () => {
    console.log('Navigate to dashboard');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-4 text-center">
        {/* Logo */}
        <div className="flex items-center justify-center mb-8">
          <div className="p-4 bg-blue-600 rounded-2xl">
            <Shield className="w-12 h-12 text-white" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
          NIST CSF v2.0 Implementation Platform
        </h1>

        <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
          Complete cybersecurity framework implementation from assessment to continuous monitoring
        </p>

        {/* Primary Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button
            onClick={handleStartClick }
            className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors inline-flex items-center justify-center space-x-3"
          >
            <Play className="w-5 h-5" />
            <span>Start Assessment</span>
          </button>
          
          <button
            onClick={handleDashboardClick }
            className="border-2 border-blue-600 text-blue-600 dark:text-blue-400 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors inline-flex items-center justify-center space-x-3"
          >
            <BarChart3 className="w-5 h-5" />
            <span>Dashboard</span>
          </button>
        </div>

        {/* Alternative Link Methods */}
        <div className="space-y-6">
          {/* Method 1: React Router Link (Declarative) */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              React Router Links (Declarative)
            </h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/assessment-intro"
                className="bg-green-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-green-700 transition-colors inline-flex items-center justify-center space-x-3"
              >
                <Target className="w-5 h-5" />
                <span>Start Assessment (Link)</span>
              </Link>
              
              <Link
                to="/dashboard"
                className="border-2 border-green-600 text-green-600 dark:text-green-400 px-8 py-4 rounded-xl font-semibold hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors inline-flex items-center justify-center space-x-3"
              >
                <BarChart3 className="w-5 h-5" />
                <span>Dashboard (Link)</span>
              </Link>
            </div>
          </div>

          {/* Method 2: useNavigate Hook */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              useNavigate Hook (Programmatic)
            </h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleStartClick }
                className="bg-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-purple-700 transition-colors inline-flex items-center justify-center space-x-3"
              >
                <Play className="w-5 h-5" />
                <span>Start Assessment (Navigate)</span>
              </button>
              
              <button
                onClick={handleDashboardClick }
                className="border-2 border-purple-600 text-purple-600 dark:text-purple-400 px-8 py-4 rounded-xl font-semibold hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors inline-flex items-center justify-center space-x-3"
              >
                <BarChart3 className="w-5 h-5" />
                <span>Dashboard (Navigate)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Debug Info */}
        <div className="mt-12 p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800">
          <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-3">
            Debug Information
          </h3>
          <div className="text-sm text-yellow-700 dark:text-yellow-300 space-y-2">
            <p>Current URL: {window.location.pathname }</p>
            <p>Check browser console for navigation logs</p>
            <p>Try both Link and Navigate methods above</p>
          </div>
        </div>
      </div>
    </div>
  );
};