import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Zap } from 'lucide-react';

interface QuickNavigationPanelProps {
  currentPage?: string;
  className?: string;
  showTitle?: boolean;
}

export const QuickNavigationPanel: React.FC<QuickNavigationPanelProps> = ({
  currentPage, className = '', showTitle = true }) => {
  const quickLinks = [
    {
      title: 'Start Assessment', description: 'Begin NIST CSF v2.0 evaluation', href: '/assessment-intro', icon: Target, category: 'assessment', priority: 'high'
    },
    {
      title: 'Compliance Status', description: 'Real-time implementation progress', href: '/compliance', icon: Shield, category: 'monitoring', priority: 'high'
    },
    {
      title: 'Evidence Collection', description: 'Manage compliance documentation', href: '/evidence', icon: FileText, category: 'documentation', priority: 'medium'
    },
    {
      title: 'Asset Management', description: 'Inventory and scope management', href: '/assets', icon: BarChart3, category: 'management', priority: 'medium'
    },
    {
      title: 'Team Collaboration', description: 'Coordinate implementation efforts', href: '/team', icon: Users, category: 'collaboration', priority: 'medium'
    },
    {
      title: 'Activity Calendar', description: 'Schedule compliance activities', href: '/calendar', icon: Calendar, category: 'planning', priority: 'low'
    },
    {
      title: 'Policy Management', description: 'Required policies and procedures', href: '/policies', icon: Award, category: 'governance', priority: 'medium'
    },
    {
      title: 'Controls Management', description: 'Security controls implementation', href: '/controls', icon: CheckCircle, category: 'governance', priority: 'medium'
    }
  ];

  const getCategoryColor = (category: string) => {
    const colors = {
      assessment: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800', monitoring: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800', documentation: 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800', management: 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800', collaboration: 'bg-pink-50 dark:bg-pink-900/20 border-pink-200 dark:border-pink-800', planning: 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800', governance: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800'
    };
    return colors[category] || colors.assessment;
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <AlertTriangle className="w-3 h-3 text-red-500" />;
      case 'medium': return <Clock className="w-3 h-3 text-yellow-500" />;
      case 'low': return <CheckCircle className="w-3 h-3 text-green-500" />;
      default: return null;
    }
  };

  // Filter out current page
  const filteredLinks = quickLinks.filter(link => link.href !== currentPage);

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 ${className 
    }`}>
      {showTitle && (
        <div className="flex items-center space-x-3 mb-6">
          <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Quick Navigation
          </h3>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filteredLinks.map((link, index) => (
          <Link
            key={index }
            to={link.href }
            className={`group p-4 rounded-lg border hover:shadow-md transition-all duration-200 ${getCategoryColor(link.category)}`}
            aria-label={`Navigate to ${link.title }: ${link.description }`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-2">
                <link.icon className="w-4 h-4 text-gray-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                <span className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {link.title }
                </span>
              </div>
              {getPriorityIcon(link.priority)}
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-300 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
              {link.description }
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};