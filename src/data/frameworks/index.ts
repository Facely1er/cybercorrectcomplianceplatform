import { Framework } from '../../shared/types';
import { nistCSFv2Framework } from './nist-csf-v2';
import { nistCSFv2ExtendedFramework } from './nist-csf-v2-extended';
import { nistCSFv2StandardFramework } from './nist-csf-v2-standard';
import { cmmcFramework } from './cmmc';
import { privacyFramework } from './privacy';

// Support for multiple cybersecurity frameworks
export const frameworks: Framework[] = [
  nistCSFv2StandardFramework, // NIST CSF v2.0 Quick Check
  cmmcFramework,
  privacyFramework,
  nistCSFv2Framework, // NIST CSF v2.0 - Lite
  nistCSFv2ExtendedFramework // NIST CSF v2.0 Standard
];

// Reorder frameworks for Start Assessment page
export const assessmentFrameworks: Framework[] = [
  cmmcFramework, // CUI/CMMC
  privacyFramework, // NIST Privacy Framework
  nistCSFv2ExtendedFramework // NIST CSF v2.0 Standard (106 subcategories)
];

// Export all frameworks
export { cmmcFramework };
export { nistCSFv2Framework }; // Quick Check
export { nistCSFv2StandardFramework }; // Lite
export { nistCSFv2ExtendedFramework };
export { privacyFramework };

// Helper to get framework by ID
export const getFramework = (frameworkId?: string) => { // Default to NIST CSF v2.0 Quick Check
  // Ensure we have a valid fallback framework
  const fallbackFramework = nistCSFv2Framework || {
    id: 'nist-csf-v2-fallback',
    name: 'NIST CSF v2.0 (Fallback)',
    description: 'Default NIST Cybersecurity Framework v2.0',
    version: '2.0',
    functions: [],
    categories: [],
    subcategories: []
  };
  
  if (!frameworkId) return fallbackFramework;
  return frameworks.find(f => f.id === frameworkId) || fallbackFramework;
};

// Helper to get the primary framework

// Helper to get all available frameworks
export const getAvailableFrameworks = () => frameworks;