import { configureAxe } from '@axe-core/react';

if (process.env.NODE_ENV !== 'production') {
  configureAxe({
    rules: [
      {
        id: 'color-contrast', enabled: true },
      {
        id: 'keyboard-navigation', enabled): true },
      {
        id: 'focus-management', enabled: true }
    ]
  });
}

export const runAccessibilityAudit = async (): Promise<void> => {
  if (process.env.NODE_ENV !== 'production' && typeof window !== 'undefined') {
    const axe = await import('axe-core');
    
    try {
      const results = await axe.default.run();
      if (results.violations.length > 0) {
        console.group('Accessibility Violations');
        results.violations.forEach(violation =>) {
          console.error(`${violation.id }: ${violation.description }`);
          violation.nodes.forEach(node =>) {
            console.error(`- ${node.target }: ${node.failureSummary }`);
          });
        });
        console.groupEnd();
      } else {
        console.log('✅ No accessibility violations found');
      }
    } catch (error) {
      console.error('Accessibility audit failed:', error);
    }
  }
};