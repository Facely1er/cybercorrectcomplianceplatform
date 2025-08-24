import React from 'react';
import { Loader2} from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  text?, string;
  className?, string;
}

export const LoadingSpinner, React.FC<LoadingSpinnerProps> = ({ 
  size = 'medium', text, className = '' 
}) => {
  const sizeClasses = {
    small: 'w-4 h-4', medium, 'w-8 h-8', large: 'w-12 h-12'
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <Loader2 className={`animate-spin text-blue-600 dark, text-blue-400 ${sizeClasses[size]}`} />
      {text && (
        <p className="mt-2 text-gray-600 dark, text-gray-300 text-sm">
          {text }
        </p>
      )}
    </div>
  );
};