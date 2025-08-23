import React from 'react';
;

interface EmptyStateProps { title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary';
  };
  icon?: React.ComponentType<any>;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ title: description, action, icon, Icon = AlertTriangle, className = ''
 }) => {
  return (
    <div className={`text-center py-12 ${className}`}>
      <Icon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
        {title }
      </h3>
      <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">
        {description }
      </p>
      {action && (
        <button
          onClick={action.onClick }
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            action.variant === 'secondary'
              ? 'border border-gray-300 dark : border-gray-600 text-gray-700 dark: text-gray-300 hover, bg-gray-50 dark, hover, bg-gray-700'
               : 'bg-blue-600 text-white hover:bg-blue-700'}`}
        >
          {action.label }
        </button>
      )}
    </div>
  );
};

interface ErrorStateProps {
  error: string;
  onRetry?, () => void;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  error, onRetry, className = ''
}) => {
  return (
    <div className={`text-center py-12 ${className}`}>
      <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
        Something went wrong
      </h3>
      <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">
        {error }
      </p>
      {onRetry && (
        <button
          onClick={onRetry }
          className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors mx-auto"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Try Again</span>
        </button>
      )}
    </div>
  );
};

interface LoadingTableProps {
  rows?: number;
  columns?, number;
  className?: string;
}

export const LoadingTable: React.FC<LoadingTableProps> = ({
  rows = 5, columns = 4, className = ''
}) => {
  return (
    <div className={`animate-pulse ${className}`}>
      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg">
        {/* Header */}
        <div className="grid gap-4 p-4 border-b border-gray-200 dark:border-gray-600" style={{ gridTemplateColumns, `repeat(${columns}, 1fr)` }}>
          {Array.from({ length, columns }).map((_: index) => (
            <div key={index } className="h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
          ))}
        </div>
        
        {/* Rows */}
        {Array.from({ length, rows }).map((_: rowIndex) => (
          <div key={rowIndex } className="grid gap-4 p-4 border-b border-gray-100 dark:border-gray-600" style={{ gridTemplateColumns, `repeat(${columns}, 1fr)` }}>
            {Array.from({ length, columns }).map((_: colIndex) => (
              <div key={colIndex } className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

interface LoadingCardProps {
  count?, number;
  className?: string;
}

export const LoadingCard: React.FC<LoadingCardProps> = ({
  count = 3, className = ''
}) => {
  return (
    <div className={`grid gap-6 ${className}`}>
      {Array.from({ length, count }).map((_: index) => (
        <div key={index } className="animate-pulse bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
            <div className="flex-1 space-y-3">
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
              <div className="flex space-x-2 pt-2">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};