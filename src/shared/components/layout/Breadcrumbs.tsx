import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path?: string;
  onClick?: () => void;
  isActive?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
  showHome?: boolean;
  homeLabel?: string;
  separator?: React.ReactNode;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ 
  items, 
  className = '',
  showHome = true,
  homeLabel = 'Dashboard',
  separator = <ChevronRight className="w-4 h-4 text-gray-400 dark:text-gray-500" />
}) => {
  return (
    <nav 
      className={`flex items-center space-x-3 text-sm ${className}`} 
      aria-label="Breadcrumb navigation"
      role="navigation"
    >
      {showHome && (
        <>
          <Link
            to="/dashboard"
            className="flex items-center text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            aria-label="Go to dashboard"
          >
            <Home className="w-4 h-4" />
            <span className="ml-2 sr-only sm:not-sr-only">{homeLabel}</span>
          </Link>
          {items.length > 0 && separator}
        </>
      )}
      
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {item.path && !item.isActive ? (
            <Link
              to={item.path}
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
              aria-label={`Go to ${item.label}`}
            >
              {item.label}
            </Link>
          ) : item.onClick && !item.isActive ? (
            <button
              onClick={item.onClick}
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
              aria-label={`Go to ${item.label}`}
            >
              {item.label}
            </button>
          ) : (
            <span 
              className={`font-medium ${
                item.isActive 
                  ? 'text-blue-600 dark:text-blue-400' 
                  : 'text-gray-900 dark:text-white'
              }`}
              aria-current={item.isActive ? 'page' : undefined}
            >
              {item.label}
            </span>
          )}
          {index < items.length - 1 && separator}
        </React.Fragment>
      ))}
    </nav>
  );
};