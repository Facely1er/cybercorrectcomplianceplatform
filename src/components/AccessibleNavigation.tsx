import React, { useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

interface NavItem {
  label: string;
  href?: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  children?: NavItem[];
  description?: string;
}

interface AccessibleNavigationProps {
  items: NavItem[];
  className?: string;
}

export const AccessibleNavigation: React.FC<AccessibleNavigationProps> = ({ 
  items, className = '' 
}) => {
  const [openDropdowns, setOpenDropdowns] = useState<Set<string>>(new Set());

  const location = useLocation();
  const navRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = (label: string) => {
    setOpenDropdowns((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(label)) {
        newSet.delete(label);
      } else {
        newSet.add(label);
      }
      return newSet;
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent, item: NavItem) => {
    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (item.children) {
          toggleDropdown(item.label);
        } else if (item.href) {
          window.location.href = item.href;
        }
        break;
      case 'Escape':
        setOpenDropdowns(new Set());
        setFocusedItem(null);
        break;
      case 'ArrowDown':
        event.preventDefault();
        // Focus next item logic
        break;
      case 'ArrowUp':
        event.preventDefault();
        // Focus previous item logic
        break;
    }
  };

  const isActive = (href: string) => location.pathname === href;

  return (
    <nav 
      ref={navRef }
      className={`${className}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <ul className="flex items-center space-x-1" role="menubar">
        {items.map((item) => (
          <li key={item.label } className="relative" role="none">
            {item.children ? (
              <div
                className="relative"
                onMouseEnter={() => toggleDropdown(item.label)}
                onMouseLeave={() => toggleDropdown(item.label)}
              >
                <button
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-300 ${
                    item.children?.some(child => child.href && isActive(child.href))
                      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                      : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20'}`}
                  onKeyDown={(e) => handleKeyDown(e, item)}
                  aria-expanded={openDropdowns.has(item.label)}
                  aria-haspopup="true"
                  role="menuitem"
                >
                  <item.icon className="w-4 h-4" aria-hidden="true" />
                  <span>{item.label }</span>
                  <ChevronDown 
                    className={`w-3 h-3 transition-transform ${
                      openDropdowns.has(item.label) ? 'rotate-180' : ''}`} 
                    aria-hidden="true"
                  />
                </button>
                
                {openDropdowns.has(item.label) && (
                  <div 
                    className="absolute top-full left-0 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50"
                    role="menu"
                    aria-label={`${item.label} submenu`}
                  >
                    {item.children.map((child) => (
                      <Link
                        key={child.href }
                        to={child.href!}
                        className={`flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${
                          isActive(child.href!)
                            ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                            : 'text-gray-700 dark:text-gray-300'}`}
                        role="menuitem"
                        aria-label={`${child.label}: ${child.description || ''}`}
                      >
                        <child.icon className="w-4 h-4" aria-hidden="true" />
                        <div>
                          <div className="font-medium">{child.label }</div>
                          {child.description && (
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              {child.description }
                            </div>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                to={item.href!}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-300 ${
                  isActive(item.href!)
                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                    : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20'}`}
                role="menuitem"
                aria-label={item.description || item.label }
              >
                <item.icon className="w-4 h-4" aria-hidden="true" />
                <span>{item.label }</span>
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};