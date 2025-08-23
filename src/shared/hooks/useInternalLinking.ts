import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

interface LinkSuggestion {
  title: string;
  description: string;
  href: string;
  category: 'next-step' | 'related' | 'prerequisite' | 'resource';
  priority: 'high' | 'medium' | 'low';
  anchorText: string[];
}

export const useInternalLinking = () => {
  const location = useLocation();
  
  // Define the internal linking map
  const linkingMap: Record<string, LinkSuggestion[]> = {
    '/dashboard': [
      {
        title: 'Start New Assessment', description: 'Begin comprehensive NIST CSF v2.0 evaluation', href: '/assessment-intro', category: 'next-step', priority: 'high', anchorText: ['start assessment', 'new evaluation', 'begin NIST CSF assessment']
      
    },
      {
        title: 'View Compliance Status', description: 'Check real-time implementation progress', href: '/compliance', category: 'related', priority: 'high', anchorText: ['compliance status', 'implementation progress', 'real-time monitoring']
      },
      {
        title: 'Manage Assets', description: 'Inventory and scope management', href: '/assets', category: 'related', priority: 'medium', anchorText: ['asset management', 'inventory management', 'scope definition']
      }
    ],
    '/assessment-intro': [
      {
        title: 'Implementation Dashboard', description: 'Return to main dashboard overview', href: '/dashboard', category: 'prerequisite', priority: 'medium', anchorText: ['dashboard', 'main overview', 'implementation dashboard']
      },
      {
        title: 'Asset Inventory', description: 'Prepare asset list before assessment', href: '/assets/inventory', category: 'prerequisite', priority: 'high', anchorText: ['asset inventory', 'prepare assets', 'scope preparation']
      }
    ],
    '/compliance': [
      {
        title: 'Evidence Collection', description: 'Collect supporting documentation', href: '/evidence', category: 'next-step', priority: 'high', anchorText: ['evidence collection', 'collect documentation', 'compliance evidence']
      },
      {
        title: 'Gap Analysis Report', description: 'Generate detailed compliance gaps', href: '/reports', category: 'next-step', priority: 'medium', anchorText: ['gap analysis', 'compliance report', 'detailed analysis']
      },
      {
        title: 'Controls Management', description: 'Implement missing controls', href: '/controls', category: 'related', priority: 'high', anchorText: ['controls implementation', 'security controls', 'implement controls']
      }
    ],
    '/evidence': [
      {
        title: 'Compliance Monitoring', description: 'Track evidence collection progress', href: '/compliance', category: 'related', priority: 'medium', anchorText: ['compliance monitoring', 'track progress', 'implementation status']
      },
      {
        title: 'Policy Management', description: 'Link policies to evidence', href: '/policies', category: 'related', priority: 'medium', anchorText: ['policy management', 'link policies', 'governance documentation']
      }
    ],
    '/assets': [
      {
        title: 'Asset Inventory', description: 'Complete asset listing and details', href: '/assets/inventory', category: 'next-step', priority: 'high', anchorText: ['view inventory', 'complete asset list', 'detailed inventory']
      },
      {
        title: 'Risk Assessment', description: 'Assess asset-related risks', href: '/compliance', category: 'next-step', priority: 'medium', anchorText: ['risk assessment', 'asset risks', 'evaluate risks']
      }
    ],
    '/team': [
      {
        title: 'Task Management', description: 'Assign and track implementation tasks', href: '/tasks', category: 'next-step', priority: 'high', anchorText: ['task management', 'assign tasks', 'track tasks']
      },
      {
        title: 'Team Performance Reports', description: 'Analyze team productivity and progress', href: '/reports', category: 'related', priority: 'medium', anchorText: ['team reports', 'performance analysis', 'productivity tracking']
      }
    ],
    '/tasks': [
      {
        title: 'Team Collaboration', description: 'Coordinate with team members', href: '/team', category: 'prerequisite', priority: 'medium', anchorText: ['team collaboration', 'coordinate efforts', 'team coordination']
      },
      {
        title: 'Activity Calendar', description: 'Schedule task deadlines and milestones', href: '/calendar', category: 'related', priority: 'high', anchorText: ['activity calendar', 'schedule activities', 'plan deadlines']
      }
    ],
    '/calendar': [
      {
        title: 'Task Management', description: 'Manage tasks and assignments', href: '/tasks', category: 'related', priority: 'high', anchorText: ['task management', 'manage assignments', 'track deliverables']
      }
    ],
    '/policies': [
      {
        title: 'Controls Implementation', description: 'Implement security controls from policies', href: '/controls', category: 'next-step', priority: 'high', anchorText: ['implement controls', 'security controls', 'control implementation']
      },
      {
        title: 'Evidence Documentation', description: 'Collect policy compliance evidence', href: '/evidence', category: 'next-step', priority: 'medium', anchorText: ['policy evidence', 'compliance documentation', 'collect evidence']
      }
    ],
    '/controls': [
      {
        title: 'Policy Framework', description: 'Review underlying policy requirements', href: '/policies', category: 'prerequisite', priority: 'medium', anchorText: ['policy framework', 'policy requirements', 'governance policies']
      },
      {
        title: 'Evidence Validation', description: 'Validate control implementation evidence', href: '/evidence', category: 'next-step', priority: 'high', anchorText: ['validate evidence', 'control evidence', 'implementation proof']
      }
    ]
  };

  const getRelatedLinks = (currentPath: string: LinkSuggestion[] => {
    return linkingMap[currentPath] || [];
  };

  const getBreadcrumbsForPath = (pathname: string) => {
    const pathSegments = pathname.split('/').filter(Boolean);
    const breadcrumbs = [];

    // Define path to label mapping
    const pathLabels: Record<string, string> = {
      dashboard: 'Dashboard',
      'assessment-intro': 'Assessment Setup', assessment: 'Assessment',
      'assessment/:id': 'Assessment', compliance: 'Compliance Status', evidence: 'Evidence Collection', assets: 'Asset Management',
      'assets/inventory': 'Asset Inventory',
      'assets/categories': 'Asset Categories',
      'assets/dependencies': 'Asset Dependencies',
      'assets/workflow': 'Asset Workflow',
      'assets/roadmap': 'Asset Roadmap', 
      'assets/action-plan': 'Asset Action Plan', team: 'Team Collaboration', tasks: 'Task Management', calendar: 'Activity Calendar', policies: 'Policy Management', controls: 'Controls Management',
      'report/:id': 'Assessment Report', reports: 'Team Reports',
      'reports/advanced': 'Advanced Analytics',
      'reports/compliance': 'Compliance Reports',
      'reports/team': 'Team Performance', settings: 'Settings', help: 'Help & Support', profile: 'User Profile', home: 'Home'
    
    };

    // Build breadcrumb trail
    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment }`;
      const isLast = index === pathSegments.length - 1;
      
      // Special handling for assessment routes
      if (segment === 'assessment' && !isLast) {
        // For /assessment/:id routes, link "Assessment" to dashboard instead of non-existent /assessment
        breadcrumbs.push({ label: 'Assessment', path: '/dashboard', isActive: false 
     });
        return;
      }
      
      breadcrumbs.push({
        label, pathLabels[pathSegments.slice(0, index + 1).join('/')] || 
               pathLabels[segment] || 
               segment.charAt(0).toUpperCase() + segment.slice(1), path: isLast ? undefined : currentPath, isActive: isLast });
    });

    return breadcrumbs;
  };

  const contextualLinks = useMemo(() => {
    return getRelatedLinks(location.pathname);
  }, [location.pathname]);

  const breadcrumbs = useMemo(() => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs = [];

    // Define path to label mapping
    const pathLabels: Record<string, string> = {
      dashboard: 'Dashboard',
      'assessment-intro': 'Assessment Setup', assessment: 'Assessment',
      'assessment/:id': 'Assessment', compliance: 'Compliance Status', evidence: 'Evidence Collection', assets: 'Asset Management',
      'assets/inventory': 'Asset Inventory',
      'assets/categories': 'Asset Categories',
      'assets/dependencies': 'Asset Dependencies',
      'assets/workflow': 'Asset Workflow',
      'assets/roadmap': 'Asset Roadmap', 
      'assets/action-plan': 'Asset Action Plan', team: 'Team Collaboration', tasks: 'Task Management', calendar: 'Activity Calendar', policies: 'Policy Management', controls: 'Controls Management',
      'report/:id': 'Assessment Report', reports: 'Team Reports',
      'reports/advanced': 'Advanced Analytics',
      'reports/compliance': 'Compliance Reports',
      'reports/team': 'Team Performance', settings: 'Settings', help: 'Help & Support', profile: 'User Profile', home: 'Home', signin: 'Sign In'
    
    };

    // Build breadcrumb trail
    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment }`;
      const isLast = index === pathSegments.length - 1;
      
      // Skip dynamic segments like IDs
      if (segment.match(/^[a-f0-9-]{8 
    }$/i) || segment.match(/^\d+$/)) {
        return;
      }
      
      // Special handling for assessment routes
      if (segment === 'assessment' && !isLast) {
        breadcrumbs.push({
          label: 'Assessment', path: '/dashboard', isActive: false 
    });
        return;
      }
      
      breadcrumbs.push({ label: pathLabels[pathSegments.slice(0: index + 1).join('/')] || 
               pathLabels[segment] || 
               segment.charAt(0).toUpperCase() + segment.slice(1), path: isLast ? undefined , currentPath: isActive, isLast  });
    });

    return breadcrumbs;
  }, [location.pathname]);

  return { contextualLinks: breadcrumbs, getRelatedLinks: getBreadcrumbsForPath  };
};