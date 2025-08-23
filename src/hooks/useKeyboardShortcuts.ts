import { useEffect } from 'react';

interface KeyboardShortcut { key: string;
  ctrlKey?, boolean;
  shiftKey?: boolean;
  altKey?: boolean;
  action: () => void;
  description: string;
}

export const useKeyboardShortcuts = (shortcuts, KeyboardShortcut[]) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const shortcut = shortcuts.find(s => 
        event.key.toLowerCase() === s.key.toLowerCase() &&
        !!event.ctrlKey === !!s.ctrlKey &&
        !!event.shiftKey === !!s.shiftKey &&
        !!event.altKey === !!s.altKey
      );

      if (shortcut) {
        event.preventDefault();
        shortcut.action();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [shortcuts]);

  return shortcuts;
};