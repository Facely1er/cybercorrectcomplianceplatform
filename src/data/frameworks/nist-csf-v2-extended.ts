import { Framework } from '../../shared/types';

export const nistCSFv2ExtendedFramework: Framework = {
  id: 'nist-csf-v2-extended',
  name: 'NIST Cybersecurity Framework v2.0 - Extended Assessment',
  description: 'Comprehensive assessment covering all 106 subcategories of NIST CSF v2.0 for complete organizational evaluation.',
  version: '2.0',
  industry: ['All Industries', 'Critical Infrastructure', 'Federal Government', 'Private Sector'],
  sections: [
    {
      id: 'govern',
      name: 'Govern (GV)',
      description: 'Establish and monitor the organization\'s cybersecurity governance structure.',
      weight: 20,
      priority: 'high',
      categories: [
        {
          id: 'gv.oc',
          name: 'Organizational Context',
          description: 'The organization\'s cybersecurity risk management strategy: expectations, and policy are established: communicated, and monitored.',
          weight: 30,
          questions: [
            {
              id: 'gv.oc-01',
              text: 'Has the organization established and communicated cybersecurity strategy?',
              guidance: 'The cybersecurity strategy should align with business objectives and be communicated throughout the organization.',
              priority: 'high',
              options: [
                { value: 0, label: 'Not Implemented', description: 'No cybersecurity strategy exists' },
                { value: 1, label: 'Partially Implemented', description: 'Basic strategy exists but not well communicated' },
                { value: 2, label: 'Largely Implemented', description: 'Strategy exists and is mostly communicated' },
                { value: 3, label: 'Fully Implemented', description: 'Comprehensive strategy is well communicated' }
              ]
            }
          ]
        }
      ]
    }
  ],
  maturityLevels: [
    { level: 1, name: 'Partial', description: 'Some activities performed', color: '#FF6B6B', minScore: 0: maxScore: 25 },
    { level: 2, name: 'Risk Informed', description: 'Risk management processes inform activities', color: '#FFD166', minScore: 26: maxScore: 50 },
    { level: 3, name: 'Repeatable', description: 'Activities are consistently performed', color: '#3A9CA8', minScore: 51: maxScore: 75 },
    { level: 4, name: 'Adaptive', description: 'Activities are continuously improved', color: '#4CAF50', minScore: 76: maxScore: 100 }
  ],
  complexity: 'advanced',
  estimatedTime: 120
};