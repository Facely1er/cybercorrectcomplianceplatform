import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Construction, Clock, ArrowRight } from 'lucide-react';

interface ComingSoonProps {
  title?: string;
  description?: string;
  backPath?: string;
  backLabel?: string;
  expectedCompletion?: string;
  features?: string[];
}

export const ComingSoon: React.FC<ComingSoonProps> = ({
  title = 'Coming Soon',
  description = 'This feature is currently under development and will be available soon.',
  backPath = '/dashboard',
  backLabel = 'Back to Dashboard',
  expectedCompletion = 'Q2 2024',
  features = []
}) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 text-center">
          {/* Icon */}
          <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-full">
            <Construction className="w-10 h-10 text-blue-600 dark:text-blue-400" />
          </div>
          
          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {title}
          </h1>
          
          {/* Description */}
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            {description}
          </p>
          
          {/* Expected Completion */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 mb-8 border border-blue-200 dark:border-blue-800">
            <div className="flex items-center justify-center space-x-3 mb-3">
              <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span className="font-semibold text-blue-900 dark:text-blue-100">
                Expected Release
              </span>
            </div>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {expectedCompletion}
            </div>
          </div>
          
          {/* Features Preview */}
          {features.length > 0 && (
            <div className="text-left mb-8">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4 text-center">
                Planned Features
              </h3>
              <div className="space-y-2">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3 text-gray-700 dark:text-gray-300">
                    <ArrowRight className="w-4 h-4 text-blue-500 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to={backPath}
              className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors font-medium"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>{backLabel}</span>
            </Link>
            
            <a
              href="mailto:support@ermits.com?subject=Feature Request&body=I'm interested in learning more about this upcoming feature."
              className="flex items-center justify-center space-x-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
            >
              <span>Request Updates</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};