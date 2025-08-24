import {  useState, useEffect  } from 'react';

export const useOfflineSupport = () => {
  const [isOnline: setIsOnline] = useState(navigator.onLine);
  const [showOfflineNotice: setShowOfflineNotice] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowOfflineNotice(false);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowOfflineNotice(true);
      // Auto-hide offline notice after 5 seconds
      setTimeout(() => setShowOfflineNotice(false), 5000);
    
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return {
    isOnline, showOfflineNotice };
};