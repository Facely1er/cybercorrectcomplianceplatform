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
export const getFramework = (frameworkId?: string) => {
  console.log('getFramework called with ID:', frameworkId);
  console.log('Available frameworks:', frameworks.map(f => ({ id: f.id, name: f.name, sectionsCount: f.sections?.length || 0 })));
  const createFallbackFramework = (): Framework => ({
    id: 'nist-csf-v2-fallback',
    name: 'NIST CSF v2.0 (Fallback)',
    description: 'Default NIST Cybersecurity Framework v2.0',
    version: '2.0',
    sections: [],
    maturityLevels: [],
    categories: [],
    subcategories: []
  } as any);
  if (!frameworks || frameworks.length === 0) {
    console.warn('Frameworks array is empty or undefined; using fallback');
    return createFallbackFramework();
  }
  if (!frameworkId) {
    console.log('No frameworkId provided; using first framework:', frameworks[0]?.id);
    return frameworks[0] || createFallbackFramework();
  }
  const foundFramework = frameworks.find(f => f.id === frameworkId);
  if (!foundFramework) {
    console.warn(`Framework with id '${frameworkId}' not found; using fallback`);
    console.log('Available framework IDs:', frameworks.map(f => f.id));
    return createFallbackFramework();
  }
  if (!foundFramework.sections || !Array.isArray(foundFramework.sections)) {
    console.warn(`Framework '${frameworkId}' has invalid sections; using fallback`);
    console.log('Framework sections:', foundFramework.sections);
    return createFallbackFramework();
  }
  console.log(`Successfully loaded framework '${frameworkId}' with ${foundFramework.sections.length} sections`);
  return foundFramework;
};

// Helper to get all available frameworks
export const getAllFrameworks = () => ({
  nistCSFv2Framework,
  nistCSFv2ExtendedFramework,
  nistCSFv2StandardFramework,
  cmmcFramework,
  privacyFramework,
}); 