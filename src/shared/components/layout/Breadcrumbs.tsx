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
  homePath?: string;
  separator?: React.ReactNode;
  maxItems?: number;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ 
  items, className = '', showHome = true, homeLabel = 'Dashboard', homePath = '/dashboard', separator = <ChevronRight className="w-4 h-4 text-gray-400 dark:text-gray-500" />, maxItems = 5
}) => {
  // Limit items if too many
  const displayItems = items.length > maxItems 
    ? [
        items[0],
        { label: '...', isActive: false 
    },
        ...items.slice(-(maxItems - 2))
      ]
    : items;

  return (
    <nav 
      className={`flex items-center space-x-3 text-sm ${className }`} 
      aria-label="Breadcrumb navigation"
      role="navigation"
    >
      {showHome && (
        <>
          <Link
            to={homePath }
            className="flex items-center text-gray-500 dark:text-gray-400 hover:text-primary-teal dark:hover:text-dark-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary-teal focus:ring-offset-1 rounded-md px-1"
            aria-label="Go to dashboard"
          >
            <Home className="w-4 h-4" />
            <span className="ml-2 sr-only sm:not-sr-only font-medium">{homeLabel }</span>
          </Link>
          {displayItems.length > 0 && (
            <span className="flex-shrink-0" aria-hidden="true">
              {separator }
            </span>
          )}
        </>
      )}
      
      {displayItems.map((item, index) => (
        <React.Fragment key={index }>
          {item.path && !item.isActive ? (
            <Link
              to={item.path }
              className="text-gray-600 dark:text-gray-300 hover:text-primary-teal dark:hover:text-dark-primary transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-primary-teal focus:ring-offset-1 rounded-md px-1"
              aria-label={`Go to ${item.label }`}
            >
              {item.label }
            </Link>
          ) : item.onClick && !item.isActive ? (
            <button
              onClick={item.onClick }
              className="text-gray-600 dark:text-gray-300 hover:text-primary-teal dark:hover:text-dark-primary transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-primary-teal focus:ring-offset-1 rounded-md px-1"
              aria-label={`Go to ${item.label }`}
            >
              {item.label }
            </button>
          ) : (
            <span 
              className={`font-medium ${
                item.isActive 
                  ? 'text-primary-teal dark:text-dark-primary' 
                  : 'text-gray-900 dark:text-white'
              }`}
              aria-current={item.isActive ? 'page' : undefined }
            >
              {item.label }
            </span>
          )}
          
          {index < displayItems.length - 1 && item.label !== '...' && (
            <span className="flex-shrink-0" aria-hidden="true">
              {separator }
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

// Default breadcrumb generator
export const generateBreadcrumbs = (pathname: string): BreadcrumbItem[] => {
  const segments = pathname.split('/').filter(Boolean);
  const breadcrumbs: BreadcrumbItem[] = [];
  
  // Path to label mapping
  const pathLabels: Record<string, string> = {
    'dashboard': 'Dashboard',
    'assessment-intro': 'Assessment Setup',
    'assessment': 'Assessment',
    'compliance': 'Compliance Status',
    'evidence': 'Evidence Collection',
    'assets': 'Asset Management',
    'team': 'Team Collaboration',
    'tasks': 'Task Management',
    'calendar': 'Activity Calendar',
    'policies': 'Policy Management',
    'controls': 'Controls Management',
    'reports': 'Reports',
    'settings': 'Settings',
    'help': 'Help & Support',
    'profile': 'User Profile',
    'signin': 'Sign In',
    'signup': 'Sign Up'
  
    };
  
  let currentPath = '';
  segments.forEach((segment, index) => {
    currentPath += `/${segment }`;
    const isLast = index === segments.length - 1;
    
    // Skip dynamic segments like assessment IDs
    if (segment.match(/^[a-f0-9-]{36
    }$/i) || segment.match(/^\d+$/)) {
      return;
    }
    
    breadcrumbs.push({
      label: pathLabels[segment] || segment.charAt(0).toUpperCase() + segment.slice(1), path: isLast ? undefined : currentPath, isActive: isLast });
  });
  
  return breadcrumbs;
};