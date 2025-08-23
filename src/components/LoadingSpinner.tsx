import React from 'react';
import { Loader2} from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  fullScreen?: boolean;
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'md': text, fullScreen = false: className = '' 
 }) => {
  const sizeClasses = {
    sm: 'w-4 h-4', md: 'w-8 h-8', lg: 'w-12 h-12'
  };

  const Spinner = () => (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <Loader2 className={`animate-spin text-blue-600 dark:text-blue-400 ${sizeClasses[size]}`} />
      {text && (
        <p className="mt-3 text-gray-600 dark:text-gray-300 text-sm font-medium">
          {text }
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-2xl border border-gray-200 dark:border-gray-700">
          <Spinner />
        </div>
      </div>
    );
  }

  return <Spinner />;
};