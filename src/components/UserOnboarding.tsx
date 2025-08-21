import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, CheckCircle, Target, BarChart3, Shield, FileText } from 'lucide-react';

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface UserOnboardingProps {
  isFirstVisit: boolean;
  onComplete: () => void;
  onSkip: () => void;
}

export const UserOnboarding: React.FC<UserOnboardingProps> = ({
  isFirstVisit,
  onComplete,
  onSkip
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(isFirstVisit);

  const steps: OnboardingStep[] = [
    {
      id: 'welcome',
      title: 'Welcome to CyberCorrect™',
      description: 'Your comprehensive cybersecurity compliance platform for NIST CSF v2.0, CMMC, and Privacy frameworks.',
      icon: Shield
    },
    {
      id: 'assessment',
      title: 'Start with an Assessment',
      description: 'Begin by choosing a framework assessment to evaluate your current cybersecurity posture.',
      icon: Target,
      action: {
        label: 'Start Assessment',
        onClick: () => window.location.href = '/assessment-intro'
      }
    },
    {
      id: 'dashboard',
      title: 'Monitor Your Progress',
      description: 'Use the dashboard to track implementation progress and view real-time compliance status.',
      icon: BarChart3,
      action: {
        label: 'View Dashboard',
        onClick: () => window.location.href = '/dashboard'
      }
    },
    {
      id: 'evidence',
      title: 'Collect Evidence',
      description: 'Systematically collect and manage compliance evidence for audits and assessments.',
      icon: FileText,
      action: {
        label: 'Manage Evidence',
        onClick: () => window.location.href = '/evidence'
      }
    }
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    setIsVisible(false);
    localStorage.setItem('onboarding-completed', 'true');
    onComplete();
  };

  const handleSkip = () => {
    setIsVisible(false);
    localStorage.setItem('onboarding-skipped', 'true');
    onSkip();
  };

  if (!isVisible) return null;

  const currentStepData = steps[currentStep];
  const IconComponent = currentStepData.icon;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-gray-200 dark:border-gray-700">
        {/* Progress Indicator */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex space-x-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index <= currentStep ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              />
            ))}
          </div>
          <button
            onClick={handleSkip}
            className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          >
            Skip tour
          </button>
        </div>

        {/* Step Content */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-blue-100 dark:bg-blue-900/30 rounded-full">
            <IconComponent className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
            {currentStepData.title}
          </h3>
          
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            {currentStepData.description}
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-4">
          {currentStepData.action && (
            <button
              onClick={currentStepData.action.onClick}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              {currentStepData.action.label}
            </button>
          )}
          
          <div className="flex space-x-3">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-3 px-6 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>
            
            <button
              onClick={nextStep}
              className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center space-x-2"
            >
              <span>{currentStep === steps.length - 1 ? 'Get Started' : 'Next'}</span>
              {currentStep === steps.length - 1 ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};