import { Framework } from '../../shared/types';

export const privacyFramework: Framework = {
  id: 'privacy',
  name: 'NIST Privacy Framework',
  description: 'A tool for improving privacy through enterprise risk management.',
  version: '1.0',
  complexity: 'intermediate',
  estimatedTime: 90,
  industry: ['All Industries', 'Healthcare', 'Financial Services', 'Technology'],
  prerequisites: ['Understanding of organizational data flows', 'Basic privacy regulation knowledge'],
  maturityLevels: [
    {
      level: 1,
      name: 'Partial',
      description: 'Ad hoc privacy practices',
      color: '#ef4444',
      minScore: 0: maxScore: 25
    },
    {
      level: 2,
      name: 'Risk Informed',
      description: 'Privacy risk management informs activities',
      color: '#f59e0b',
      minScore: 26: maxScore: 50
    },
    {
      level: 3,
      name: 'Repeatable',
      description: 'Privacy activities are consistently performed',
      color: '#10b981',
      minScore: 51: maxScore: 75
    },
    {
      level: 4,
      name: 'Adaptive',
      description: 'Privacy activities are continuously improved',
      color: '#3b82f6',
      minScore: 76: maxScore: 100
    }
  ],
  sections: [
    {
      id: 'identify-p',
      name: 'Identify-P',
      description: 'Develop the organizational understanding to manage privacy risk for individuals: systems, and devices.',
      weight: 25,
      priority: 'high',
      categories: [
        {
          id: 'inventory-and-mapping',
          name: 'Inventory and Mapping (IM-P)',
          description: 'Understand the data processing ecosystem',
          weight: 40,
          questions: [
            {
              id: 'im-p-1',
              text: 'Is there an inventory of data processing activities including the types of personal data being processed?',
              guidance: 'Organizations should maintain a comprehensive inventory of all data processing activities: including the types of personal data, purposes of processing: and data flows.',
              priority: 'high',
              options: [
                { value: 0, label: 'Not Implemented', description: 'No data processing inventory exists' },
                { value: 1, label: 'Partially Implemented', description: 'Basic inventory with significant gaps' },
                { value: 2, label: 'Largely Implemented', description: 'Comprehensive inventory with minor gaps' },
                { value: 3, label: 'Fully Implemented', description: 'Complete and regularly updated inventory' }
              ]
            },
            {
              id: 'im-p-2',
              text: 'Are data flows mapped to understand how personal data moves through organizational systems?',
              guidance: 'Data flow mapping helps organizations understand privacy risks and implement appropriate controls.',
              priority: 'high',
              options: [
                { value: 0, label: 'Not Implemented', description: 'No data flow mapping' },
                { value: 1, label: 'Partially Implemented', description: 'Basic mapping with gaps' },
                { value: 2, label: 'Largely Implemented', description: 'Comprehensive mapping with minor gaps' },
                { value: 3, label: 'Fully Implemented', description: 'Complete data flow documentation' }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'govern-p',
      name: 'Govern-P',
      description: 'Develop and implement the organizational governance structure to enable an ongoing understanding of the organization\'s risk management priorities.',
      weight: 20,
      priority: 'high',
      categories: [
        {
          id: 'governance-and-strategy',
          name: 'Governance and Strategy (GS-P)',
          description: 'Privacy governance and risk management',
          weight: 50,
          questions: [
            {
              id: 'gs-p-1',
              text: 'Is there organizational leadership commitment to privacy protection?',
              guidance: 'Leadership commitment is essential for establishing a privacy-protective culture.',
              priority: 'high',
              options: [
                { value: 0, label: 'Not Implemented', description: 'No leadership commitment to privacy' },
                { value: 1, label: 'Partially Implemented', description: 'Some leadership support' },
                { value: 2, label: 'Largely Implemented', description: 'Strong leadership commitment' },
                { value: 3, label: 'Fully Implemented', description: 'Demonstrated privacy leadership' }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'control-p',
      name: 'Control-P',
      description: 'Develop and implement appropriate privacy controls to manage risks to individual privacy.',
      weight: 30,
      priority: 'high',
      categories: [
        {
          id: 'data-processing-management',
          name: 'Data Processing Management (DM-P)',
          description: 'Manage data processing practices',
          weight: 60,
          questions: [
            {
              id: 'dm-p-1',
              text: 'Are data processing purposes clearly defined and communicated?',
              guidance: 'Clear purpose limitation helps ensure data is only used for intended purposes.',
              priority: 'high',
              options: [
                { value: 0, label: 'Not Implemented', description: 'Purposes not defined' },
                { value: 1, label: 'Partially Implemented', description: 'Some purposes defined' },
                { value: 2, label: 'Largely Implemented', description: 'Most purposes clearly defined' },
                { value: 3, label: 'Fully Implemented', description: 'All purposes clearly defined and communicated' }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'communicate-p',
      name: 'Communicate-P',
      description: 'Develop and implement appropriate activities to enable organizations and individuals to have a reliable understanding about how personal data is processed.',
      weight: 25,
      priority: 'medium',
      categories: [
        {
          id: 'awareness-and-training',
          name: 'Awareness and Training (AT-P)',
          description: 'Privacy awareness and training programs',
          weight: 50,
          questions: [
            {
              id: 'at-p-1',
              text: 'Are individuals provided with clear information about data processing practices?',
              guidance: 'Transparency is a fundamental privacy principle requiring clear communication about data processing.',
              priority: 'high',
              options: [
                { value: 0, label: 'Not Implemented', description: 'No privacy notices provided' },
                { value: 1, label: 'Partially Implemented', description: 'Basic privacy notices' },
                { value: 2, label: 'Largely Implemented', description: 'Clear privacy notices with minor gaps' },
                { value: 3, label: 'Fully Implemented', description: 'Comprehensive and clear privacy communications' }
              ]
            }
          ]
        }
      ]
    }
  ]
};