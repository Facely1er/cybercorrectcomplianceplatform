import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Building, Zap, Sparkles, Rocket } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { nistCSFv2Framework } from '../../../data/frameworks/nist-csf-v2';

import { UserProfile } from '../../types';

interface StartScreenProps {
  onStartAssessment: () => void;
  onContinue: () => void;
  userProfile: UserProfile | null;
}

import { cmmcFramework, privacyFramework } from '../../../data/frameworks';

export const StartScreen: React.FC<StartScreenProps> = ({
  onStartAssessment, onContinue, userProfile }) => {
  const { theme } = useTheme();
  const [showQuickStart, setShowQuickStart] = useState(false);
  
  // Memoize handlers to prevent re-render issues
  const handleStartAssessment = useCallback(() => {
    console.log('StartScreen, Starting assessment');
    onStartAssessment();
  
    }, [onStartAssessment]);
  
  const handleContinue = useCallback(() => {
    console.log('StartScreen, Continuing to dashboard');
    onContinue();
  }, [onContinue]);
  
  // Helper function to get feature links
  
    return linkMap[featureTitle] || '/dashboard';
  
    }, []);

  const implementationSteps = [
    {
      step: 1, title: "Assessment", description: "Complete NIST CSF v2.0 assessment to identify current state and gaps", time: "2-3 hours", icon: Target },
    {
      step: 2, title: "Evidence Collection", description: "Systematically collect and validate compliance evidence for each control", time: "2-4 weeks", icon: FileText },
    {
      step: 3, title: "Implementation", description: "Deploy required policies, controls, and procedures based on assessment results", time: "3-6 months", icon: Shield },
    {
      step: 4, title: "Monitoring", description: "Continuous monitoring and real-time compliance status tracking", time: "Ongoing", icon: BarChart3
    }
  ];

  const platformFeatures = [
    {
      title: "Assessment to Implementation", description: "Guided workflow from initial assessment through full NIST CSF v2.0 implementation", icon: Target, color: "blue"
    },
    {
      title: "Evidence Collection", description: "Systematic collection and management of compliance evidence for all controls", icon: FileText, color: "green"
    },
    {
      title: "Real-Time Compliance", description: "Live monitoring of implementation progress and compliance posture", icon: BarChart3, color: "purple"
    },
    {
      title: "Activity Calendar", description: "Automated scheduling of assessments, reviews, and compliance activities", icon: Calendar, color: "orange"
    },
    {
      title: "Assets in Scope", description: "Comprehensive asset inventory and scope management for compliance", icon: Shield, color: "indigo"
    },
    {
      title: "Policies & Controls", description: "Required policies and security controls mapped to NIST CSF v2.0", icon: Award, color: "pink"
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: 'from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 text-blue-600 dark:text-blue-400', green: 'from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 text-green-600 dark:text-green-400', purple: 'from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30 text-purple-600 dark:text-purple-400', orange: 'from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30 text-orange-600 dark:text-orange-400', indigo: 'from-indigo-100 to-indigo-200 dark:from-indigo-900/30 dark:to-indigo-800/30 text-indigo-600 dark:text-indigo-400', pink: 'from-pink-100 to-pink-200 dark:from-pink-900/30 dark:to-pink-800/30 text-pink-600 dark:text-pink-400'
    };
    return colorMap[color] || colorMap.blue;
  };

  return (
    <div className="min-h-screen flex flex-col pt-16 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-green-400/20 to-blue-600/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-pink-600/10 rounded-full blur-3xl"></div>
      </div>

      {/* Hero Section */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Main Hero Content */}
          <div className="text-center mb-20">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-2xl">
                <Shield className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                NIST CSF v2.0
              </span>
              <br />
              <span className="text-gray-900 dark:text-white relative">
                Implementation Platform
                <Sparkles className="absolute -top-4 -right-8 w-8 h-8 text-yellow-400 animate-bounce" />
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed mb-10">
              Complete implementation platform for NIST Cybersecurity Framework v2.0. 
              From initial assessment to full implementation with evidence collection and real-time compliance monitoring.
            </p>

            {/* Implementation Workflow Preview */}
            <div className="flex flex-wrap items-center justify-center gap-8 mb-16 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center space-x-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700">
                <Target className="w-5 h-5 text-blue-500" />
                <span className="font-medium">Assessment</span>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400" />
              <div className="flex items-center space-x-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700">
                <FileText className="w-5 h-5 text-green-500" />
                <span className="font-medium">Evidence Collection</span>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400" />
              <div className="flex items-center space-x-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700">
                <Shield className="w-5 h-5 text-purple-500" />
                <span className="font-medium">Implementation</span>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400" />
              <div className="flex items-center space-x-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700">
                <BarChart3 className="w-5 h-5 text-orange-500" />
                <span className="font-medium">Monitoring</span>
              </div>
            </div>

            {/* Call to Action */}
            <div className="space-y-6">
              <button
                onClick={handleStartAssessment }
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-12 py-6 rounded-2xl font-bold text-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 hover:scale-105 flex items-center space-x-3 mx-auto"
              >
                <Play className="w-6 h-6" />
                <span>Choose Assessment Type</span>
              </button>
              
              <div className="text-center">
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Choose your assessment depth:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-center">
                  <Link
                    to="/assessment-intro"
                    className="border-2 border-red-600 text-red-600 dark:text-red-400 px-6 py-3 rounded-xl font-medium hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <Building className="w-5 h-5" />
                    <span>CMMC Level 2 ({cmmcFramework?.sections?.reduce((sum, section) => sum + section.categories.reduce((catSum, category) => catSum + category.questions.length, 0), 0) || 110} controls)</span>
                  </Link>
                  <Link
                    to="/assessment-intro"
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg flex items-center justify-center space-x-2"
                  >
                    <Eye className="w-5 h-5" />
                    <span>Privacy Framework ({privacyFramework?.sections?.reduce((sum, section) => sum + section.categories.reduce((catSum, category) => catSum + category.questions.length, 0), 0) || 45} questions)</span>
                  </Link>
                  <Link
                    to="/assessment-intro"
                    className="border-2 border-green-600 text-green-600 dark:text-green-400 px-6 py-3 rounded-xl font-medium hover:bg-green-50 dark:hover:bg-green-900/20 transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <Zap className="w-5 h-5" />
                    <span>NIST CSF v2.0 Quick Check ({nistCSFv2Framework?.sections?.reduce((sum, section) => sum + section.categories.reduce((catSum, category) => catSum + category.questions.length, 0), 0) || 10} questions)</span>
                  </Link>
                </div>
              </div>
              
              {userProfile && (
                <button
                  onClick={handleContinue }
                  className="border-2 border-blue-600 text-blue-600 dark:text-blue-400 px-8 py-3 rounded-xl font-bold hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300"
                >
                  Continue to Dashboard
                </button>
              )}
            </div>
          </div>

          {/* Welcome Message for Returning Users */}
          {userProfile && (
            <div className="mb-16 p-10 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-900/20 dark:via-indigo-900/20 dark:to-purple-900/20 rounded-3xl border border-blue-200 dark:border-blue-800 shadow-2xl backdrop-blur-sm">
              <div className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
                    <Rocket className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h2 className="text-4xl font-bold text-blue-900 dark:text-blue-100 mb-4">
                  Welcome back, {userProfile.name }!
                </h2>
                <p className="text-blue-700 dark:text-blue-300 text-xl font-medium">
                  {userProfile.organization } • {userProfile.role }
                </p>
                <div className="mt-6">
                  <Link
                    to="/dashboard"
                    className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors font-medium shadow-lg"
                  >
                    <BarChart3 className="w-5 h-5" />
                    <span>Go to Dashboard</span>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Platform Features */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Complete Implementation Platform
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Everything you need to implement NIST CSF v2.0 from assessment to continuous monitoring
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {platformFeatures.map((feature, index) => (
                <div key={index } className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group">
                  <div className={`flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${getColorClasses(feature.color)} mb-6 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-8 h-8" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 text-center group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {feature.title }
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed">
                    {feature.description }
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Implementation Workflow */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Implementation Workflow
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Structured approach from assessment to full NIST CSF v2.0 implementation
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {implementationSteps.map((step, index) => (
                <div key={index } className="relative">
                  {index < implementationSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 z-10">
                      <ArrowRight className="w-6 h-6 text-blue-500" />
                    </div>
                  )}
                  
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300 text-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-full mx-auto mb-4 font-bold text-lg">
                      {step.step }
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                      {step.title }
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                      {step.description }
                    </p>
                    
                    <div className="text-sm font-medium text-blue-600 dark:text-blue-400">
                      {step.time }
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* NIST CSF v2.0 Framework Showcase */}
          <div className="mb-20">
            <div className="max-w-4xl mx-auto bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border-2 border-blue-200 dark:border-blue-700">
              <div className="text-center">
                <div className="flex items-center justify-center mb-8">
                  <div className="p-6 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-2xl">
                    <Shield className="w-16 h-16 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                
                <h3 className="text-3xl font-bold text-blue-900 dark:text-blue-100 mb-4">
                  {nistCSFv2Framework.name }
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 text-lg mb-8 leading-relaxed">
                  {nistCSFv2Framework.description }
                </p>

                {/* Framework Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                  <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                      {nistCSFv2Framework.sections.length }
                    </div>
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Functions
                    </div>
                  </div>
                  
                  <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">
                      {nistCSFv2Framework.estimatedTime }
                    </div>
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Minutes
                    </div>
                  </div>
                  
                  <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                      {nistCSFv2Framework.sections.reduce((sum, section) => 
                        sum + section.categories.length, 0)}
                    </div>
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Categories
                    </div>
                  </div>
                  
                  <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl">
                    <div className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                      v{nistCSFv2Framework.version }
                    </div>
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Latest
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid lg:grid-cols-2 gap-10 mb-20">
            {/* Start Assessment */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-10 shadow-2xl border border-gray-200 dark:border-gray-700 hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-3 group">
              <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 mb-8 mx-auto group-hover:scale-110 transition-transform duration-300">
                <Target className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                Start Assessment
              </h3>
              
              <p className="text-gray-600 dark:text-gray-300 mb-8 text-center leading-relaxed">
                Begin your NIST CSF v2.0 implementation journey with a comprehensive assessment of your current cybersecurity posture
              </p>
              
              <button
                onClick={handleStartAssessment }
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-5 px-8 rounded-2xl font-bold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 flex items-center justify-center space-x-3 shadow-xl hover:shadow-2xl transform hover:scale-105"
              >
                <Play className="w-5 h-5" />
                <span>Start Assessment</span>
              </button>
            </div>

            {/* Continue to Dashboard */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-10 shadow-2xl border border-gray-200 dark:border-gray-700 hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-3 group">
              <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 mb-8 mx-auto group-hover:scale-110 transition-transform duration-300">
                <BarChart3 className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                Implementation Dashboard
              </h3>
              
              <p className="text-gray-600 dark:text-gray-300 mb-8 text-center leading-relaxed">
                Access the full implementation platform with evidence collection, compliance monitoring, and activity management
              </p>
              
              <Link
                to="/dashboard"
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-5 px-8 rounded-2xl font-bold text-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 flex items-center justify-center space-x-3 shadow-xl hover:shadow-2xl transform hover:scale-105"
              >
                <BarChart3 className="w-5 h-5" />
                <span>Go to Dashboard</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700 py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                NIST CSF v2.0 Platform
              </span>
            </div>
            <div className="text-gray-600 dark:text-gray-300 font-medium">
              © 2024 NIST CSF v2.0 Implementation Platform. Professional cybersecurity framework implementation.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};