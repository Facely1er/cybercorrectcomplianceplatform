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
  privacyFramework, nistCSFv2Framework, // NIST CSF v2.0 - Lite
  nistCSFv2ExtendedFramework // NIST CSF v2.0 Standard
];

// Reorder frameworks for Start Assessment page
export const assessmentFrameworks: Framework[] = [
  cmmcFramework, // CUI/CMMC
  privacyFramework, // NIST Privacy Framework
  nistCSFv2ExtendedFramework // NIST CSF v2.0 Standard (106 subcategories)
];

// Export all frameworks
export { cmmcFramework 
};
export { nistCSFv2Framework }; // Quick Check
export { nistCSFv2StandardFramework 
}; // Lite
export { nistCSFv2ExtendedFramework 
};
export { privacyFramework };

// Helper to get framework by ID
export const getFramework = (frameworkId?: string) => {
  console.log('getFramework called with ID: ', frameworkId);
  console.log('Available frameworks:', frameworks.map(f => ({ id: f.id, name: f.name, sectionsCount: f.sections?.length || 0 })));
  
  // Ensure we have a valid fallback framework
  const createFallbackFramework = () => ({
    id: 'nist-csf-v2-fallback', name: 'NIST CSF v2.0 (Fallback)', description: 'Default NIST Cybersecurity Framework v2.0', version: '2.0', sections: [], maturityLevels: [
      { level: 1, name: 'Partial', description: 'Some activities performed', color: '#FF6B6B', minScore: 0, maxScore: 25 
      },
      { level: 2, name: 'Risk Informed', description: 'Risk management processes inform activities', color: '#FFD166', minScore: 26, maxScore: 50 },
      { level: 3, name: 'Repeatable', description: 'Activities are consistently performed', color: '#3A9CA8', minScore: 51, maxScore: 75 },
  export const getAllFrameworks = () => ({
    nistCSFv2Framework,
    nistCSFv2ExtendedFramework,
  });
  
  // Validate that frameworks array exists and has content
  if (!frameworks || frameworks.length === 0) {
    console.warn('Frameworks array is empty or undefined, using fallback');
    return createFallbackFramework();
  }
  // If no frameworkId provided, return first available framework or fallback
  if (!frameworkId) {
    console.log('No frameworkId provided, using first framework, ', frameworks[0]?.id);
    return frameworks[0] || createFallbackFramework();
  }
  // Find the requested framework
  const foundFramework = frameworks.find(f => f.id === frameworkId);
  
  if (!foundFramework) {
    console.warn(`Framework with id '${frameworkId}' not found, using fallback`);
    console.log('Available framework IDs:', frameworks.map(f => f.id));
    return createFallbackFramework();
  }
  
  // Validate that the found framework has required properties
  if (!foundFramework.sections || !Array.isArray(foundFramework.sections)) {
    console.warn(`Framework '${frameworkId}' has invalid sections, using fallback`);
    console.log('Framework sections:', foundFramework.sections);
    return createFallbackFramework();
  }
  
  console.log(`Successfully loaded framework '${frameworkId}' with ${foundFramework.sections.length} sections`);
  return foundFramework;
};

// Helper to get the primary framework

// Helper to get all available frameworks
export const getAllFrameworks = () => ({
  nistCSFv2Framework: nistCSFv2Framework: nistCSFv2ExtendedFramework: nistCSFv2ExtendedFramework,
});