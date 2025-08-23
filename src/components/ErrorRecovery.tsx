import React from 'react';
import { Home, ChevronLeft } from 'lucide-react';

interface ErrorRecoveryProps {
  error: string;
  onRetry?: () => void;
  onGoBack?: () => void;
  onGoHome?: () => void;
  showActions?: boolean;
  className?: string;
}

export const ErrorRecovery: React.FC<ErrorRecoveryProps> = ({
  error, onRetry, onGoBack, onGoHome, showActions = true, className = ''
}) => {
  return (
    <div className={`text-center py-12 px-4 ${className}`}>
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 bg-red-100 dark:bg-red-900/30 rounded-full">
          <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          Something went wrong
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
          {error }
        </p>

        {showActions && (
          <div className="space-y-3">
            {onRetry && (
              <button
                onClick={onRetry }
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center space-x-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Try Again</span>
              </button>
            )}
            
            <div className="grid grid-cols-2 gap-3">
              {onGoBack && (
                <button
                  onClick={onGoBack }
                  className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-lg hover: bg-gray-200 dark, hover:bg-gray-600 transition-colors font-medium flex items-center justify-center space-x-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Go Back</span>
                </button>
              )}
              
              {onGoHome && (
                <button
                  onClick={onGoHome }
                  className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-lg hover: bg-gray-200 dark, hover:bg-gray-600 transition-colors font-medium flex items-center justify-center space-x-2"
                >
                  <Home className="w-4 h-4" />
                  <span>Home</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};