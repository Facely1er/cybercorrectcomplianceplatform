import React from 'react';
import { WifiOff, Wifi } from 'lucide-react';

interface OfflineNoticeProps {
  isOnline: boolean;
  showNotice: boolean;
}

export const OfflineNotice: React.FC<OfflineNoticeProps> = ({ isOnline, showNotice }) => {
  if (!showNotice && isOnline) return null;

  return (
    <div className={`fixed top-20 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ${
      showNotice ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
      <div className={`px-6 py-3 rounded-full shadow-lg border ${
        isOnline 
          ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200'
          : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200'}`}>
        <div className="flex items-center space-x-2">
          {isOnline ? (
            <Wifi className="w-4 h-4" />
          ) : (
            <WifiOff className="w-4 h-4" />
          )}
          <span className="text-sm font-medium">
            {isOnline ? 'Back online' : 'You are offline - changes saved locally'}
          </span>
        </div>
      </div>
    </div>
  );
};