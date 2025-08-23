import { Framework } from '../../types';

export const privacyFramework: Framework = {
  id: 'privacy', name: 'NIST Privacy Framework', description: 'A tool for improving privacy through enterprise risk management', version: '1.0', complexity: 'intermediate', estimatedTime: 90, industry: ['All Industries'], prerequisites: ['Understanding of privacy concepts', 'Familiarity with data protection regulations'], certificationBody: 'NIST', lastUpdated: new Date('2020-01-16'), relatedFrameworks: ['NIST CSF', 'ISO 27001', 'GDPR'], applicableRegulations: ['GDPR', 'CCPA', 'PIPEDA', 'LGPD'], maturityLevels: [
    { 
      level: 1, name: 'Partial', description: 'Ad hoc privacy practices', color: '#ef4444', minScore: 0, maxScore: 20, characteristics: ['Reactive privacy approach', 'Limited privacy documentation', 'Informal privacy processes'], typicalOrganizations, ['Small businesses', 'Organizations new to privacy compliance'], nextSteps: ['Establish privacy policies', 'Implement basic privacy controls', 'Begin privacy risk assessment']
    },
    { 
      level: 2, name: 'Risk Informed', description: 'Privacy risk management practices approved by management', color: '#f97316', minScore: 21, maxScore: 40, characteristics: ['Management privacy awareness', 'Basic privacy risk assessment', 'Some documented privacy procedures'], typicalOrganizations, ['Growing companies', 'Organizations with basic data governance'], nextSteps: ['Formalize privacy risk management', 'Expand privacy controls', 'Improve privacy documentation']
    },
    { 
      level: 3, name: 'Repeatable', description: 'Organization-wide approach to managing privacy risk', color: '#eab308', minScore: 41, maxScore: 60, characteristics: ['Consistent privacy processes', 'Regular privacy risk assessments', 'Defined privacy roles and responsibilities'], typicalOrganizations, ['Mid-size enterprises', 'Organizations with established privacy programs'], nextSteps: ['Implement continuous privacy monitoring', 'Enhance privacy incident response', 'Improve privacy metrics']
    },
    { 
      level: 4, name: 'Adaptive', description: 'Organization adapts its privacy practices', color: '#22c55e', minScore: 61, maxScore: 80, characteristics: ['Continuous privacy improvement', 'Privacy by design integration', 'Adaptive privacy controls'], typicalOrganizations, ['Large enterprises', 'Organizations in regulated industries'], nextSteps: ['Optimize privacy processes', 'Enhance privacy engineering', 'Improve privacy automation']
    },
    { 
      level: 5, name: 'Optimized', description: 'Continuous improvement based on privacy lessons learned', color: '#3b82f6', minScore: 81, maxScore: 100, characteristics: ['Predictive privacy capabilities', 'Advanced privacy analytics', 'Continuous privacy optimization'], typicalOrganizations, ['Privacy leaders', 'Data-intensive organizations', 'High-privacy organizations'], nextSteps: ['Share privacy best practices', 'Lead privacy initiatives', 'Mentor other organizations']
    }
  ], sections: [
    {
      id: 'identify-p', name: 'Identify-P', description: 'Develop the organizational understanding to manage privacy risk for individuals, assets, and systems', weight: 25, priority: 'high', estimatedTime: 25, categories: [
        {
          id: 'inventory-mapping', name: 'Inventory and Mapping (ID.IM-P)', description: 'Data processing by systems, products, or services is understood and informs privacy risk management', weight: 25, questions: [
            {
              id: 'privacy.id.im.p1', text: 'Are systems/products/services that process personally identifiable information (PII) inventoried? ' : guidance: 'Maintain a comprehensive inventory of all systems, products, and services that process personally identifiable information. This inventory should include data flows, processing purposes, and data categories.', priority: 'high', references: ['ID.IM-P1'], examples: [
                'Data processing inventory database',
                'System data flow diagrams',
                'Privacy impact assessments',
                'Data mapping documentation'
              ], options: [
                { value: 0, label, 'Not inventoried', description: 'No systematic inventory of PII processing systems' },
                { value: 1, label, 'Partially inventoried', description: 'Some PII processing systems identified but inventory incomplete' },
                { value: 2, label, 'Mostly inventoried', description: 'Comprehensive inventory with regular updates' },
                { value: 3, label, 'Fully inventoried', description: 'Complete, automated, real-time inventory with comprehensive data mapping' }
              ]
            },
            {
              id: 'privacy.id.im.p2', text: 'Are owners or operators of systems/products/services that process PII identified? ' : guidance: 'Clearly identify and document the owners and operators responsible for systems, products, and services that process PII, including their privacy responsibilities.', priority: 'high', references: ['ID.IM-P2'], examples: [
                'Data controller and processor identification',
                'System ownership documentation',
                'Privacy responsibility matrices',
                'Third-party processor agreements'
              ], options: [
                { value: 0, label, 'Not identified', description: 'No clear ownership of PII processing systems' },
                { value: 1, label, 'Partially identified', description: 'Some system owners identified' },
                { value: 2, label, 'Mostly identified', description: 'Clear ownership with documented responsibilities' },
                { value: 3, label, 'Fully identified', description: 'Complete ownership mapping with accountability frameworks' }
              ]
            },
            {
              id: 'privacy.id.im.p3', text: 'Are categories of individuals whose PII is processed identified? ' : guidance: 'Document and maintain an inventory of the categories of individuals whose personal information is processed by your organization.', priority: 'medium', references: ['ID.IM-P3'], examples: [
                'Data subject category documentation',
                'Customer segmentation for privacy',
                'Employee data category mapping',
                'Third-party individual classifications'
              ], options: [
                { value: 0, label, 'Not identified', description: 'No documentation of individual categories' },
                { value: 1, label, 'Basic identification', description: 'Some individual categories documented' },
                { value: 2, label, 'Comprehensive identification', description: 'Most individual categories clearly documented' },
                { value: 3, label, 'Complete identification', description: 'All individual categories comprehensively documented and maintained' }
              ]
            },
            {
              id: 'privacy.id.im.p4', text: 'Are data actions of systems/products/services that process PII inventoried? ' : guidance: 'Document the specific data actions (collect, retain, log, generate, transform, use, disclose, share, transmit, store) performed by each system.', priority: 'high', references: ['ID.IM-P4'], examples: [
                'Data action inventory',
                'Processing activity documentation',
                'Data lifecycle mapping',
                'System data action matrices'
              ], options: [
                { value: 0, label, 'Not inventoried', description: 'No documentation of data actions' },
                { value: 1, label, 'Partially inventoried', description: 'Some data actions documented' },
                { value: 2, label, 'Mostly inventoried', description: 'Comprehensive data action documentation' },
                { value: 3, label, 'Fully inventoried', description: 'Complete data action inventory with automated tracking' }
              ]
            },
            {
              id: 'privacy.id.im.p5', text: 'Are purposes for which PII is processed by systems/products/services inventoried? ' : guidance: 'Document and maintain the specific purposes for which personal information is processed by each system, product, or service.', priority: 'high', references: ['ID.IM-P5'], examples: [
                'Processing purpose documentation',
                'Business justification records',
                'Legal basis documentation',
                'Purpose limitation controls'
              ], options: [
                { value: 0, label, 'Not inventoried', description: 'No documentation of processing purposes' },
                { value: 1, label, 'Basic inventory', description: 'Some processing purposes documented' },
                { value: 2, label, 'Good inventory', description: 'Most processing purposes clearly documented' },
                { value: 3, label, 'Complete inventory', description: 'All processing purposes comprehensively documented and linked to legal bases' }
              ]
            },
            {
              id: 'privacy.id.im.p6', text: 'Are data elements within PII inventoried? ' : guidance: 'Maintain a detailed inventory of the specific data elements that constitute personally identifiable information within your systems.', priority: 'medium', references: ['ID.IM-P6'], examples: [
                'Data element catalogs',
                'PII data dictionaries',
                'Sensitive data classifications',
                'Field-level data mapping'
              ], options: [
                { value: 0, label, 'Not inventoried', description: 'No inventory of PII data elements' },
                { value: 1, label, 'Basic inventory', description: 'Some PII data elements identified' },
                { value: 2, label, 'Good inventory', description: 'Comprehensive PII data element documentation' },
                { value: 3, label, 'Complete inventory', description: 'Detailed PII data element inventory with sensitivity classifications' }
              ]
            },
            {
              id: 'privacy.id.im.p7', text: 'Are PII processing permissions and obligations inventoried? ' : guidance: 'Document the permissions (what you are allowed to do) and obligations (what you must do) related to PII processing.', priority: 'high', references: ['ID.IM-P7'], examples: [
                'Legal basis documentation',
                'Consent records',
                'Contractual obligations',
                'Regulatory requirements mapping'
              ], options: [
                { value: 0, label, 'Not inventoried', description: 'No documentation of permissions and obligations' },
                { value: 1, label, 'Basic inventory', description: 'Some permissions and obligations documented' },
                { value: 2, label, 'Good inventory', description: 'Comprehensive permissions and obligations documentation' },
                { value: 3, label, 'Complete inventory', description: 'Detailed permissions and obligations with automated compliance tracking' }
              ]
            },
            {
              id: 'privacy.id.im.p8', text: 'Are data flows among systems/products/services that process PII inventoried? ' : guidance: 'Map and document how personal information flows between different systems, products, and services within and outside your organization.', priority: 'high', references: ['ID.IM-P8'], examples: [
                'Data flow diagrams',
                'System integration documentation',
                'Cross-border transfer mapping',
                'Third-party data sharing documentation'
              ], options: [
                { value: 0, label, 'Not inventoried', description: 'No documentation of PII data flows' },
                { value: 1, label, 'Basic mapping', description: 'Some data flows documented' },
                { value: 2, label, 'Good mapping', description: 'Comprehensive data flow documentation' },
                { value: 3, label, 'Complete mapping', description: 'Detailed data flow mapping with real-time monitoring' }
              ]
            }
          ]
        },
        {
          id: 'business-environment-p', name: 'Business Environment (ID.BE-P)', description: 'The organization\'s mission, objectives, stakeholders, and activities that involve processing of PII are understood', weight: 20, questions: [
            {
              id: 'privacy.id.be.p1', text: 'Is the organization\'s role in the data processing ecosystem identified and communicated? ' : guidance: 'Understand and document your organization\'s role as a data controller, processor, or both, and communicate this to relevant stakeholders.', priority: 'medium', references: ['ID.BE-P1'], examples: [
                'Data controller/processor role documentation',
                'Privacy notice disclosures',
                'Stakeholder communication materials',
                'Regulatory filing documentation'
              ], options: [
                { value: 0, label, 'Not identified', description: 'Data processing role not defined or communicated' },
                { value: 1, label, 'Partially identified', description: 'Some understanding of data processing role' },
                { value: 2, label, 'Mostly identified', description: 'Clear role definition with stakeholder communication' },
                { value: 3, label, 'Fully identified', description: 'Complete role clarity with comprehensive communication' }
              ]
            },
            {
              id: 'privacy.id.be.p2', text: 'Are PII processing activities prioritized by internal mission and business objectives? ' : guidance: 'Align PII processing activities with your organization\'s mission, objectives, and business priorities to ensure appropriate resource allocation.', priority: 'medium', references: ['ID.BE-P2'], examples: [
                'Business-privacy alignment documentation',
                'Privacy strategy integration',
                'Resource allocation frameworks',
                'Business objective mapping'
              ], options: [
                { value: 0, label, 'Not prioritized', description: 'No alignment between PII processing and business objectives' },
                { value: 1, label, 'Basic prioritization', description: 'Some consideration of business alignment' },
                { value: 2, label, 'Good prioritization', description: 'Clear alignment with business objectives' },
                { value: 3, label, 'Strategic prioritization', description: 'Comprehensive integration with business strategy' }
              ]
            },
            {
              id: 'privacy.id.be.p3', text: 'Are organizational stakeholders with roles and responsibilities for PII processing identified? ' : guidance: 'Identify all internal and external stakeholders who have roles and responsibilities related to personal information processing.', priority: 'medium', references: ['ID.BE-P3'], examples: [
                'Stakeholder identification matrices',
                'Privacy role documentation',
                'Responsibility assignment charts',
                'Cross-functional team structures'
              ], options: [
                { value: 0, label, 'Not identified', description: 'No identification of privacy stakeholders' },
                { value: 1, label, 'Basic identification', description: 'Some key stakeholders identified' },
                { value: 2, label, 'Good identification', description: 'Comprehensive stakeholder mapping' },
                { value: 3, label, 'Complete identification', description: 'Detailed stakeholder analysis with clear accountability' }
              ]
            }
          ]
        },
        {
          id: 'governance-p', name: 'Governance (ID.GV-P)', description: 'The policies, procedures, and processes to manage and monitor privacy risk are understood and inform management decisions', weight: 20, questions: [
            {
              id: 'privacy.id.gv.p1', text: 'Are organizational privacy values and policies understood and used to manage privacy risk? ' : guidance: 'Establish clear privacy values and policies that guide decision-making and risk management throughout the organization.', priority: 'high', references: ['ID.GV-P1'], examples: [
                'Privacy policy framework',
                'Privacy values statement',
                'Risk management policies',
                'Privacy governance documentation'
              ], options: [
                { value: 0, label, 'Not established', description: 'No formal privacy values or policies' },
                { value: 1, label, 'Basic policies', description: 'Some privacy policies exist' },
                { value: 2, label, 'Comprehensive policies', description: 'Well-developed privacy framework' },
                { value: 3, label, 'Integrated policies', description: 'Privacy values fully integrated into organizational culture' }
              ]
            },
            {
              id: 'privacy.id.gv.p2', text: 'Are privacy roles and responsibilities within the organization and third-party relationships understood? ' : guidance: 'Clearly define and communicate privacy roles and responsibilities across the organization and with third parties.', priority: 'high', references: ['ID.GV-P2'], examples: [
                'Privacy role definitions',
                'RACI matrices for privacy',
                'Third-party responsibility agreements',
                'Privacy organizational charts'
              ], options: [
                { value: 0, label, 'Not defined', description: 'No clear privacy roles and responsibilities' },
                { value: 1, label, 'Basic definition', description: 'Some privacy roles identified' },
                { value: 2, label, 'Clear definition', description: 'Well-defined privacy roles and responsibilities' },
                { value: 3, label, 'Comprehensive definition', description: 'Detailed privacy accountability framework' }
              ]
            },
            {
              id: 'privacy.id.gv.p3', text: 'Are legal, regulatory, and contractual requirements regarding privacy understood and managed? ' : guidance: 'Maintain awareness of and compliance with all applicable privacy laws, regulations, and contractual obligations.', priority: 'high', references: ['ID.GV-P3'], examples: [
                'Legal requirements inventory',
                'Regulatory compliance tracking',
                'Contract privacy clause analysis',
                'Compliance monitoring systems'
              ], options: [
                { value: 0, label, 'Not managed', description: 'No systematic tracking of privacy requirements' },
                { value: 1, label, 'Basic awareness', description: 'Some privacy requirements identified' },
                { value: 2, label, 'Good management', description: 'Comprehensive requirements tracking' },
                { value: 3, label, 'Proactive management', description: 'Advanced compliance monitoring with predictive capabilities' }
              ]
            },
            {
              id: 'privacy.id.gv.p4', text: 'Are governance structures and privacy roles established for managing PII? ' : guidance: 'Establish formal governance structures including committees, oversight bodies, and defined roles for managing personal information.', priority: 'medium', references: ['ID.GV-P4'], examples: [
                'Privacy steering committees',
                'Chief Privacy Officer roles',
                'Privacy governance charters',
                'Oversight body structures'
              ], options: [
                { value: 0, label, 'No structures', description: 'No formal privacy governance structures' },
                { value: 1, label, 'Basic structures', description: 'Some privacy governance elements' },
                { value: 2, label, 'Established structures', description: 'Well-defined privacy governance' },
                { value: 3, label, 'Mature structures', description: 'Sophisticated privacy governance with clear accountability' }
              ]
            }
          ]
        },
        {
          id: 'risk-assessment-p', name: 'Risk Assessment (ID.RA-P)', description: 'The organization understands privacy risk to organizational operations (including mission, functions, image, reputation), organizational assets, individuals, other organizations, and the Nation', weight: 20, questions: [
            {
              id: 'privacy.id.ra.p1', text: 'Are potential problematic data actions and associated problems identified? ' : guidance: 'Identify data processing actions that could lead to privacy problems for individuals or the organization.', priority: 'high', references: ['ID.RA-P1'], examples: [
                'Problematic data action inventories',
                'Privacy risk catalogs',
                'Data use case risk analysis',
                'Processing impact assessments'
              ], options: [
                { value: 0, label, 'Not identified', description: 'No identification of problematic data actions' },
                { value: 1, label, 'Basic identification', description: 'Some problematic actions identified' },
                { value: 2, label, 'Good identification', description: 'Comprehensive problematic action analysis' },
                { value: 3, label, 'Systematic identification', description: 'Automated identification with continuous monitoring' }
              ]
            },
            {
              id: 'privacy.id.ra.p2', text: 'Are privacy risks associated with the organization\'s business model identified? ' : guidance: 'Assess how your organization\'s business model creates or amplifies privacy risks for individuals and the organization.', priority: 'medium', references: ['ID.RA-P2'], examples: [
                'Business model privacy analysis',
                'Revenue model risk assessment',
                'Market positioning privacy implications',
                'Competitive advantage privacy risks'
              ], options: [
                { value: 0, label, 'Not assessed', description: 'No business model privacy risk analysis' },
                { value: 1, label, 'Basic assessment', description: 'Some business model risks identified' },
                { value: 2, label, 'Good assessment', description: 'Comprehensive business model risk analysis' },
                { value: 3, label, 'Strategic assessment', description: 'Integrated privacy risk analysis in business strategy' }
              ]
            },
            {
              id: 'privacy.id.ra.p3', text: 'Are privacy risks associated with organizational PII processing identified? ' : guidance: 'Identify and analyze privacy risks arising from all personal information processing activities within the organization.', priority: 'high', references: ['ID.RA-P3'], examples: [
                'Privacy impact assessments',
                'Processing risk evaluations',
                'Data protection impact assessments',
                'Risk register maintenance'
              ], options: [
                { value: 0, label, 'Not identified', description: 'No systematic privacy risk identification' },
                { value: 1, label, 'Basic identification', description: 'Some processing risks identified' },
                { value: 2, label, 'Comprehensive identification', description: 'Systematic privacy risk assessment' },
                { value: 3, label, 'Advanced identification', description: 'Continuous privacy risk monitoring and analysis' }
              ]
            },
            {
              id: 'privacy.id.ra.p4', text: 'Are privacy risks associated with external sharing of PII identified? ' : guidance: 'Assess privacy risks that arise when sharing personal information with third parties, partners, or across borders.', priority: 'high', references: ['ID.RA-P4'], examples: [
                'Third-party sharing risk assessments',
                'Cross-border transfer risk analysis',
                'Partner privacy due diligence',
                'Data sharing agreement risk reviews'
              ], options: [
                { value: 0, label, 'Not assessed', description: 'No external sharing risk analysis' },
                { value: 1, label, 'Basic assessment', description: 'Some external sharing risks identified' },
                { value: 2, label, 'Good assessment', description: 'Comprehensive external sharing risk analysis' },
                { value: 3, label, 'Advanced assessment', description: 'Continuous monitoring of external sharing risks' }
              ]
            },
            {
              id: 'privacy.id.ra.p5', text: 'Are privacy risks associated with PII processing and external participation identified? ' : guidance: 'Identify privacy risks related to individual participation in data processing and their interactions with external entities.', priority: 'medium', references: ['ID.RA-P5'], examples: [
                'Individual participation risk analysis',
                'Consent process risk assessment',
                'Third-party interaction risk evaluation',
                'External touchpoint privacy analysis'
              ], options: [
                { value: 0, label, 'Not identified', description: 'No external participation risk analysis' },
                { value: 1, label, 'Basic identification', description: 'Some participation risks identified' },
                { value: 2, label, 'Good identification', description: 'Comprehensive participation risk analysis' },
                { value: 3, label, 'Systematic identification', description: 'Advanced participation risk monitoring' }
              ]
            },
            {
              id: 'privacy.id.ra.p6', text: 'Are privacy risks that may result from individuals not participating identified? ' : guidance: 'Assess risks that may arise when individuals choose not to participate in data processing or withdraw consent.', priority: 'low', references: ['ID.RA-P6'], examples: [
                'Non-participation impact analysis',
                'Consent withdrawal risk assessment',
                'Service limitation risk evaluation',
                'Alternative processing options analysis'
              ], options: [
                { value: 0, label, 'Not considered', description: 'No non-participation risk analysis' },
                { value: 1, label, 'Basic consideration', description: 'Some non-participation risks identified' },
                { value: 2, label, 'Good analysis', description: 'Comprehensive non-participation risk assessment' },
                { value: 3, label, 'Strategic analysis', description: 'Advanced non-participation scenario planning' }
              ]
            },
            {
              id: 'privacy.id.ra.p7', text: 'Are privacy risks arising from data processing lifecycle activities identified and managed? ' : guidance: 'Identify privacy risks across all stages of the data lifecycle from collection to disposal.', priority: 'medium', references: ['ID.RA-P7'], examples: [
                'Data lifecycle risk mapping',
                'Stage-specific risk assessments',
                'Processing phase risk analysis',
                'Data retention risk evaluation'
              ], options: [
                { value: 0, label, 'Not managed', description: 'No lifecycle privacy risk management' },
                { value: 1, label, 'Basic management', description: 'Some lifecycle risks identified' },
                { value: 2, label, 'Good management', description: 'Comprehensive lifecycle risk analysis' },
                { value: 3, label, 'Advanced management', description: 'Continuous lifecycle risk monitoring' }
              ]
            }
          ]
        },
        {
          id: 'risk-management-strategy-p', name: 'Risk Management Strategy (ID.RM-P)', description: 'The organization\'s priorities, constraints, risk tolerances, and assumptions are established and used to support operational risk decisions', weight: 15, questions: [
            {
              id: 'privacy.id.rm.p1', text: 'Is privacy risk management processes established, managed, and agreed to by organizational stakeholders? ' : guidance: 'Establish formal privacy risk management processes that are understood and accepted by key organizational stakeholders.', priority: 'high', references: ['ID.RM-P1'], examples: [
                'Privacy risk management framework',
                'Stakeholder agreement documentation',
                'Risk governance processes',
                'Risk decision-making protocols'
              ], options: [
                { value: 0, label, 'Not established', description: 'No formal privacy risk management processes' },
                { value: 1, label, 'Basic processes', description: 'Some privacy risk management elements' },
                { value: 2, label, 'Established processes', description: 'Comprehensive privacy risk management framework' },
                { value: 3, label, 'Mature processes', description: 'Advanced privacy risk management with stakeholder buy-in' }
              ]
            },
            {
              id: 'privacy.id.rm.p2', text: 'Are organizational privacy risk tolerances determined and clearly expressed? ' : guidance: 'Define and communicate the organization\'s tolerance for privacy risks across different business contexts and processing activities.', priority: 'medium', references: ['ID.RM-P2'], examples: [
                'Privacy risk tolerance statements',
                'Risk appetite documentation',
                'Context-specific risk thresholds',
                'Risk tolerance communication materials'
              ], options: [
                { value: 0, label, 'Not determined', description: 'No defined privacy risk tolerances' },
                { value: 1, label, 'Basic tolerance', description: 'Some risk tolerance considerations' },
                { value: 2, label, 'Clear tolerance', description: 'Well-defined privacy risk tolerances' },
                { value: 3, label, 'Sophisticated tolerance', description: 'Context-specific privacy risk tolerance framework' }
              ]
            },
            {
              id: 'privacy.id.rm.p3', text: 'Are the organization\'s determination of privacy risk tolerance informed by its role in the data processing ecosystem? ' : guidance: 'Consider your organization\'s specific role (controller, processor, etc.) when establishing privacy risk tolerance levels.', priority: 'medium', references: ['ID.RM-P3'], examples: [
                'Role-based risk tolerance analysis',
                'Ecosystem position risk assessment',
                'Controller/processor risk differentiation',
                'Contextual risk tolerance frameworks'
              ], options: [
                { value: 0, label, 'Not informed', description: 'Risk tolerance not based on ecosystem role' },
                { value: 1, label, 'Basic consideration', description: 'Some ecosystem role consideration' },
                { value: 2, label, 'Good integration', description: 'Risk tolerance aligned with ecosystem role' },
                { value: 3, label, 'Strategic integration', description: 'Sophisticated role-based risk tolerance framework' }
              ]
            },
            {
              id: 'privacy.id.rm.p4', text: 'Are organizational privacy roles and responsibilities coordinated and aligned? ' : guidance: 'Ensure that privacy roles and responsibilities are coordinated across the organization and aligned with risk management objectives.', priority: 'medium', references: ['ID.RM-P4'], examples: [
                'Privacy role coordination mechanisms',
                'Cross-functional privacy teams',
                'Role alignment documentation',
                'Privacy collaboration frameworks'
              ], options: [
                { value: 0, label, 'Not coordinated', description: 'No coordination of privacy roles' },
                { value: 1, label, 'Basic coordination', description: 'Some privacy role coordination' },
                { value: 2, label, 'Good coordination', description: 'Well-coordinated privacy roles' },
                { value: 3, label, 'Optimized coordination', description: 'Sophisticated privacy role alignment and coordination' }
              ]
            },
            {
              id: 'privacy.id.rm.p5', text: 'Are privacy-related information sharing priorities established? ' : guidance: 'Establish clear priorities and criteria for sharing privacy-related information internally and with external stakeholders.', priority: 'low', references: ['ID.RM-P5'], examples: [
                'Information sharing policies',
                'Privacy communication priorities',
                'Stakeholder information frameworks',
                'Transparency reporting guidelines'
              ], options: [
                { value: 0, label, 'Not established', description: 'No privacy information sharing priorities' },
                { value: 1, label, 'Basic priorities', description: 'Some information sharing guidelines' },
                { value: 2, label, 'Clear priorities', description: 'Well-defined information sharing priorities' },
                { value: 3, label, 'Strategic priorities', description: 'Comprehensive privacy information sharing strategy' }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'govern-p', name: 'Govern-P', description: 'Develop and implement the organizational governance structure to enable an ongoing understanding of the organization\'s privacy risk management priorities', weight: 20, priority: 'medium', estimatedTime: 15, categories: [
        {
          id: 'organizational-context-p', name: 'Organizational Context (GV.OC-P)', description: 'Privacy governance and risk management processes are established and managed', weight: 30, questions: [
            {
              id: 'privacy.gv.oc.p1', text: 'Are privacy governance structures established? ' : guidance: 'Establish clear privacy governance structures including privacy committees, privacy officers, and decision-making processes.', priority: 'medium', references: ['GV.OC-P1'], examples: [
                'Privacy steering committee',
                'Chief Privacy Officer appointment',
                'Privacy governance charter',
                'Privacy decision-making processes'
              ], options: [
                { value: 0, label, 'No governance', description: 'No formal privacy governance structure' },
                { value: 1, label, 'Basic governance', description: 'Some privacy governance elements in place' },
                { value: 2, label, 'Good governance', description: 'Well-established privacy governance structure' },
                { value: 3, label, 'Advanced governance', description: 'Sophisticated privacy governance with clear accountability' }
              ]
            },
            {
              id: 'privacy.gv.oc.p2', text: 'Are privacy roles, responsibilities, and authorities to foster accountability established? ' : guidance: 'Define clear privacy roles, responsibilities, and decision-making authorities to ensure accountability throughout the organization.', priority: 'high', references: ['GV.OC-P2'], examples: [
                'Privacy accountability frameworks',
                'Role-based responsibility matrices',
                'Authority delegation documentation',
                'Privacy decision rights'
              ], options: [
                { value: 0, label, 'Not established', description: 'No clear privacy accountability structure' },
                { value: 1, label, 'Basic structure', description: 'Some privacy roles and responsibilities defined' },
                { value: 2, label, 'Clear structure', description: 'Well-defined privacy accountability framework' },
                { value: 3, label, 'Comprehensive structure', description: 'Sophisticated accountability with clear authority delegation' }
              ]
            },
            {
              id: 'privacy.gv.oc.p3', text: 'Are privacy governance oversight bodies established? ' : guidance: 'Establish oversight bodies such as privacy boards or committees to provide governance and strategic direction for privacy initiatives.', priority: 'medium', references: ['GV.OC-P3'], examples: [
                'Privacy board establishment',
                'Oversight committee charters',
                'Governance review processes',
                'Strategic privacy oversight'
              ], options: [
                { value: 0, label, 'No oversight', description: 'No formal privacy oversight bodies' },
                { value: 1, label, 'Basic oversight', description: 'Some privacy oversight mechanisms' },
                { value: 2, label, 'Established oversight', description: 'Formal privacy oversight bodies with clear mandates' },
                { value: 3, label, 'Mature oversight', description: 'Comprehensive privacy oversight with strategic governance' }
              ]
            }
          ]
        },
        {
          id: 'risk-management-p', name: 'Risk Management (GV.RM-P)', description: 'Privacy risk management processes are established, managed, and agreed to by organizational stakeholders', weight: 35, questions: [
            {
              id: 'privacy.gv.rm.p1', text: 'Are privacy risk management strategies established and implemented? ' : guidance: 'Develop and implement comprehensive strategies for managing privacy risks across the organization.', priority: 'high', references: ['GV.RM-P1'], examples: [
                'Privacy risk management strategy',
                'Risk treatment frameworks',
                'Risk response planning',
                'Privacy risk governance'
              ], options: [
                { value: 0, label, 'No strategy', description: 'No formal privacy risk management strategy' },
                { value: 1, label, 'Basic strategy', description: 'Some privacy risk management elements' },
                { value: 2, label, 'Comprehensive strategy', description: 'Well-developed privacy risk management strategy' },
                { value: 3, label, 'Advanced strategy', description: 'Sophisticated privacy risk management with continuous improvement' }
              ]
            },
            {
              id: 'privacy.gv.rm.p2', text: 'Are privacy risk tolerances and thresholds defined and communicated? ' : guidance: 'Define and communicate organizational privacy risk tolerances and thresholds to guide decision-making.', priority: 'medium', references: ['GV.RM-P2'], examples: [
                'Risk tolerance statements',
                'Privacy risk thresholds',
                'Risk appetite communication',
                'Tolerance level documentation'
              ], options: [
                { value: 0, label, 'Not defined', description: 'No defined privacy risk tolerances' },
                { value: 1, label, 'Basic definition', description: 'Some risk tolerance considerations' },
                { value: 2, label, 'Clear definition', description: 'Well-defined and communicated risk tolerances' },
                { value: 3, label, 'Sophisticated definition', description: 'Context-specific risk tolerances with regular review' }
              ]
            },
            {
              id: 'privacy.gv.rm.p3', text: 'Are privacy risk management processes tailored to address organizational needs? ' : guidance: 'Tailor privacy risk management processes to fit your organization\'s specific context, industry, and regulatory environment.', priority: 'medium', references: ['GV.RM-P3'], examples: [
                'Customized risk processes',
                'Industry-specific risk management',
                'Context-aware risk frameworks',
                'Tailored risk methodologies'
              ], options: [
                { value: 0, label, 'Not tailored', description: 'Generic privacy risk management approach' },
                { value: 1, label, 'Basic tailoring', description: 'Some customization of risk processes' },
                { value: 2, label, 'Good tailoring', description: 'Well-tailored privacy risk management' },
                { value: 3, label, 'Advanced tailoring', description: 'Sophisticated customization based on organizational needs' }
              ]
            }
          ]
        },
        {
          id: 'policy-p', name: 'Policy (GV.PO-P)', description: 'Organizational privacy policy is established and communicated', weight: 20, questions: [
            {
              id: 'privacy.gv.po.p1', text: 'Is organizational privacy policy developed, disseminated, and implemented? ' : guidance: 'Develop comprehensive privacy policies and ensure they are effectively communicated and implemented throughout the organization.', priority: 'high', references: ['GV.PO-P1'], examples: [
                'Privacy policy development',
                'Policy dissemination programs',
                'Implementation tracking',
                'Policy compliance monitoring'
              ], options: [
                { value: 0, label, 'No policy', description: 'No formal privacy policy' },
                { value: 1, label, 'Basic policy', description: 'Basic privacy policy with limited implementation' },
                { value: 2, label, 'Comprehensive policy', description: 'Well-developed policy with good implementation' },
                { value: 3, label, 'Advanced policy', description: 'Comprehensive policy with full organizational integration' }
              ]
            },
            {
              id: 'privacy.gv.po.p2', text: 'Are privacy policies regularly reviewed and updated? ' : guidance: 'Establish processes for regularly reviewing and updating privacy policies to ensure they remain current and effective.', priority: 'medium', references: ['GV.PO-P2'], examples: [
                'Policy review schedules',
                'Update management processes',
                'Version control systems',
                'Stakeholder review processes'
              ], options: [
                { value: 0, label, 'No review process', description: 'Privacy policies not regularly reviewed' },
                { value: 1, label, 'Ad-hoc reviews', description: 'Occasional policy reviews' },
                { value: 2, label, 'Regular reviews', description: 'Systematic policy review and update process' },
                { value: 3, label, 'Continuous improvement', description: 'Continuous policy monitoring and improvement' }
              ]
            }
          ]
        },
        {
          id: 'awareness-training-gov-p', name: 'Awareness and Training (GV.AT-P)', description: 'The organization ensures that personnel are provided with privacy awareness education and are adequately trained', weight: 10, questions: [
            {
              id: 'privacy.gv.at.p1', text: 'Are privacy awareness programs developed and implemented? ' : guidance: 'Develop and implement comprehensive privacy awareness programs for all personnel.', priority: 'medium', references: ['GV.AT-P1'], examples: [
                'Privacy awareness campaigns',
                'General privacy training',
                'Privacy communication programs',
                'Awareness measurement tools'
              ], options: [
                { value: 0, label, 'No program', description: 'No privacy awareness program' },
                { value: 1, label, 'Basic program', description: 'Some privacy awareness activities' },
                { value: 2, label, 'Comprehensive program', description: 'Systematic privacy awareness program' },
                { value: 3, label, 'Advanced program', description: 'Sophisticated awareness program with continuous reinforcement' }
              ]
            },
            {
              id: 'privacy.gv.at.p2', text: 'Are role-based privacy training programs established? ' : guidance: 'Establish specialized privacy training programs tailored to different roles and responsibilities within the organization.', priority: 'medium', references: ['GV.AT-P2'], examples: [
                'Role-specific privacy training',
                'Specialized privacy curricula',
                'Function-based training programs',
                'Competency-based training'
              ], options: [
                { value: 0, label, 'No role-based training', description: 'No specialized privacy training by role' },
                { value: 1, label, 'Basic role training', description: 'Some role-specific privacy training' },
                { value: 2, label, 'Comprehensive role training', description: 'Well-developed role-based privacy training' },
                { value: 3, label, 'Advanced role training', description: 'Sophisticated role-based training with continuous development' }
              ]
            }
          ]
        },
        {
          id: 'monitoring-p', name: 'Monitoring (GV.MT-P)', description: 'The organization monitors and evaluates the effectiveness of its privacy program', weight: 5, questions: [
            {
              id: 'privacy.gv.mt.p1', text: 'Are privacy program performance monitored and evaluated? ' : guidance: 'Monitor and evaluate the effectiveness of privacy program components through metrics, assessments, and reviews.', priority: 'medium', references: ['GV.MT-P1'], examples: [
                'Privacy program metrics',
                'Performance monitoring systems',
                'Privacy effectiveness assessments',
                'Program evaluation processes'
              ], options: [
                { value: 0, label, 'No monitoring', description: 'No privacy program performance monitoring' },
                { value: 1, label, 'Basic monitoring', description: 'Some privacy program monitoring' },
                { value: 2, label, 'Good monitoring', description: 'Systematic privacy program performance monitoring' },
                { value: 3, label, 'Advanced monitoring', description: 'Comprehensive performance monitoring with continuous improvement' }
              ]
            },
            {
              id: 'privacy.gv.mt.p2', text: 'Are privacy program changes informed by monitoring and evaluation results? ' : guidance: 'Use monitoring and evaluation results to inform improvements and changes to the privacy program.', priority: 'low', references: ['GV.MT-P2'], examples: [
                'Performance-based program changes',
                'Monitoring-informed improvements',
                'Evaluation-driven updates',
                'Continuous improvement processes'
              ], options: [
                { value: 0, label, 'No feedback loop', description: 'Monitoring results not used for program improvements' },
                { value: 1, label, 'Basic feedback', description: 'Some use of monitoring results for improvements' },
                { value: 2, label, 'Good feedback', description: 'Systematic use of monitoring for program improvements' },
                { value: 3, label, 'Advanced feedback', description: 'Sophisticated feedback loop with continuous adaptation' }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'control-p', name: 'Control-P', description: 'Develop and implement appropriate activities to enable organizations or individuals to manage data with sufficient granularity', weight: 25, priority: 'high', estimatedTime: 25, categories: [
        {
          id: 'data-processing-management', name: 'Data Processing Management (CT.DM-P)', description: 'Data are managed consistent with the organization\'s privacy strategy to increase predictability and manage privacy risk', weight: 70, questions: [
            {
              id: 'privacy.ct.dm.p1', text: 'Are data processing practices managed to limit PII processing to the identified purpose(s)? ' : guidance: 'Implement controls to ensure that PII is only processed for the specific, legitimate purposes for which it was collected.', priority: 'high', references: ['CT.DM-P1'], examples: [
                'Purpose limitation controls',
                'Data use policies',
                'Processing approval workflows',
                'Data access controls based on purpose'
              ], options: [
                { value: 0, label, 'Not managed', description: 'No controls on PII processing purposes' },
                { value: 1, label, 'Basic management', description: 'Some purpose limitation controls' },
                { value: 2, label, 'Good management', description: 'Comprehensive purpose limitation with monitoring' },
                { value: 3, label, 'Advanced management', description: 'Automated purpose limitation with continuous compliance monitoring' }
              ]
            },
            {
              id: 'privacy.ct.dm.p2', text: 'Are data quality practices implemented to ensure PII quality throughout the data lifecycle? ' : guidance: 'Implement practices to ensure the accuracy, completeness, and currency of personal information throughout its lifecycle.', priority: 'medium', references: ['CT.DM-P2'], examples: [
                'Data quality management systems',
                'PII accuracy verification',
                'Data cleansing processes',
                'Quality monitoring procedures'
              ], options: [
                { value: 0, label, 'No quality practices', description: 'No formal PII quality management' },
                { value: 1, label, 'Basic quality practices', description: 'Some data quality controls' },
                { value: 2, label, 'Good quality practices', description: 'Comprehensive data quality management' },
                { value: 3, label, 'Advanced quality practices', description: 'Automated data quality with continuous monitoring' }
              ]
            },
            {
              id: 'privacy.ct.dm.p3', text: 'Are data retention and disposal practices implemented for PII? ' : guidance: 'Implement clear practices for retaining personal information only as long as necessary and securely disposing of it when no longer needed.', priority: 'high', references: ['CT.DM-P3'], examples: [
                'Data retention schedules',
                'Secure disposal procedures',
                'Automated retention management',
                'Disposal verification processes'
              ], options: [
                { value: 0, label, 'No practices', description: 'No formal retention or disposal practices' },
                { value: 1, label, 'Basic practices', description: 'Some retention and disposal controls' },
                { value: 2, label, 'Good practices', description: 'Comprehensive retention and disposal management' },
                { value: 3, label, 'Advanced practices', description: 'Automated retention and disposal with audit trails' }
              ]
            },
            {
              id: 'privacy.ct.dm.p4', text: 'Are PII processing activities limited to the minimum necessary to achieve the identified purpose? ' : guidance: 'Implement data minimization practices to ensure only the minimum necessary personal information is processed.', priority: 'high', references: ['CT.DM-P4'], examples: [
                'Data minimization policies',
                'Minimum necessary assessments',
                'Collection limitation controls',
                'Processing scope reviews'
              ], options: [
                { value: 0, label, 'Not limited', description: 'No data minimization practices' },
                { value: 1, label, 'Basic limitation', description: 'Some data minimization efforts' },
                { value: 2, label, 'Good limitation', description: 'Systematic data minimization practices' },
                { value: 3, label, 'Advanced limitation', description: 'Automated data minimization with continuous optimization' }
              ]
            },
            {
              id: 'privacy.ct.dm.p5', text: 'Are PII confidentiality and integrity maintained? ' : guidance: 'Implement measures to maintain the confidentiality and integrity of personal information throughout processing.', priority: 'high', references: ['CT.DM-P5'], examples: [
                'Encryption controls',
                'Access controls',
                'Integrity verification',
                'Confidentiality protections'
              ], options: [
                { value: 0, label, 'Not maintained', description: 'No specific confidentiality and integrity controls' },
                { value: 1, label, 'Basic protections', description: 'Some confidentiality and integrity measures' },
                { value: 2, label, 'Good protections', description: 'Comprehensive confidentiality and integrity controls' },
                { value: 3, label, 'Advanced protections', description: 'Sophisticated protection with continuous monitoring' }
              ]
            },
            {
              id: 'privacy.ct.dm.p6', text: 'Are PII processing permissions and obligations determined and managed? ' : guidance: 'Determine and manage the permissions and obligations associated with personal information processing activities.', priority: 'high', references: ['CT.DM-P6'], examples: [
                'Legal basis management',
                'Consent management',
                'Permission tracking',
                'Obligation compliance'
              ], options: [
                { value: 0, label, 'Not managed', description: 'No management of processing permissions and obligations' },
                { value: 1, label, 'Basic management', description: 'Some permission and obligation tracking' },
                { value: 2, label, 'Good management', description: 'Comprehensive permission and obligation management' },
                { value: 3, label, 'Advanced management', description: 'Automated permission and obligation tracking with compliance monitoring' }
              ]
            },
            {
              id: 'privacy.ct.dm.p7', text: 'Are the PII processing permissions and obligations communicated to individuals? ' : guidance: 'Communicate processing permissions and obligations to individuals in a clear and understandable manner.', priority: 'high', references: ['CT.DM-P7'], examples: [
                'Privacy notices',
                'Consent forms',
                'Processing disclosures',
                'Rights information'
              ], options: [
                { value: 0, label, 'Not communicated', description: 'No communication of processing permissions and obligations' },
                { value: 1, label, 'Basic communication', description: 'Some communication of processing information' },
                { value: 2, label, 'Good communication', description: 'Clear communication of permissions and obligations' },
                { value: 3, label, 'Advanced communication', description: 'Sophisticated communication with personalized information' }
              ]
            },
            {
              id: 'privacy.ct.dm.p8', text: 'Are PII processing authorizations managed and tracked? ' : guidance: 'Manage and track authorizations for personal information processing to ensure compliance with established permissions.', priority: 'medium', references: ['CT.DM-P8'], examples: [
                'Authorization management systems',
                'Processing approval workflows',
                'Authorization tracking',
                'Compliance monitoring'
              ], options: [
                { value: 0, label, 'Not managed', description: 'No management of processing authorizations' },
                { value: 1, label, 'Basic management', description: 'Some authorization tracking' },
                { value: 2, label, 'Good management', description: 'Comprehensive authorization management' },
                { value: 3, label, 'Advanced management', description: 'Automated authorization management with real-time tracking' }
              ]
            }
          ]
        },
        {
          id: 'data-processing-policies', name: 'Data Processing Policies, Processes, and Procedures (CT.PO-P)', description: 'Policies, processes, and procedures for authorizing processing are established and managed', weight: 30, questions: [
            {
              id: 'privacy.ct.po.p1', text: 'Are policies for data processing established, communicated, and enforced? ' : guidance: 'Develop, communicate, and enforce comprehensive policies governing all aspects of personal data processing.', priority: 'high', references: ['CT.PO-P1'], examples: [
                'Data processing policies',
                'Privacy policy communications',
                'Policy enforcement mechanisms',
                'Regular policy training'
              ], options: [
                { value: 0, label, 'No policies', description: 'No formal data processing policies' },
                { value: 1, label, 'Basic policies', description: 'Some data processing policies exist' },
                { value: 2, label, 'Comprehensive policies', description: 'Well-developed policies with enforcement' },
                { value: 3, label, 'Optimized policies', description: 'Comprehensive policies with continuous improvement' }
              ]
            },
            {
              id: 'privacy.ct.po.p2', text: 'Are processes established to receive and respond to complaints about privacy practices? ' : guidance: 'Establish formal processes for receiving, investigating, and responding to complaints about privacy practices.', priority: 'medium', references: ['CT.PO-P2'], examples: [
                'Privacy complaint processes',
                'Complaint investigation procedures',
                'Response mechanisms',
                'Resolution tracking'
              ], options: [
                { value: 0, label, 'No processes', description: 'No formal complaint processes' },
                { value: 1, label, 'Basic processes', description: 'Some complaint handling mechanisms' },
                { value: 2, label, 'Good processes', description: 'Comprehensive complaint management processes' },
                { value: 3, label, 'Advanced processes', description: 'Sophisticated complaint handling with continuous improvement' }
              ]
            },
            {
              id: 'privacy.ct.po.p3', text: 'Are processes established to address privacy risks associated with new technologies or programs? ' : guidance: 'Establish processes to identify and address privacy risks when implementing new technologies, systems, or programs.', priority: 'high', references: ['CT.PO-P3'], examples: [
                'Privacy impact assessment processes',
                'Technology review procedures',
                'Risk assessment for new initiatives',
                'Privacy by design implementation'
              ], options: [
                { value: 0, label, 'No processes', description: 'No processes for new technology privacy risks' },
                { value: 1, label, 'Basic processes', description: 'Some consideration of privacy in new initiatives' },
                { value: 2, label, 'Good processes', description: 'Systematic privacy risk assessment for new technologies' },
                { value: 3, label, 'Advanced processes', description: 'Comprehensive privacy by design with automated risk assessment' }
              ]
            },
            {
              id: 'privacy.ct.po.p4', text: 'Are processes established for conducting privacy risk assessments? ' : guidance: 'Establish formal processes for conducting regular and systematic privacy risk assessments.', priority: 'high', references: ['CT.PO-P4'], examples: [
                'Privacy risk assessment methodologies',
                'Assessment scheduling and tracking',
                'Risk evaluation criteria',
                'Assessment reporting processes'
              ], options: [
                { value: 0, label, 'No processes', description: 'No formal privacy risk assessment processes' },
                { value: 1, label, 'Basic processes', description: 'Some privacy risk assessment activities' },
                { value: 2, label, 'Good processes', description: 'Systematic privacy risk assessment processes' },
                { value: 3, label, 'Advanced processes', description: 'Comprehensive risk assessment with continuous monitoring' }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'communicate-p', name: 'Communicate-P', description: 'Develop and implement appropriate activities to enable organizations and individuals to have a reliable understanding about how PII is processed', weight: 15, priority: 'medium', estimatedTime: 15, categories: [
        {
          id: 'awareness-training-p', name: 'Awareness and Training (CM.AW-P)', description: 'Individuals and organizations have the knowledge and skills to manage privacy risks', weight: 25, questions: [
            {
              id: 'privacy.cm.aw.p1', text: 'Are individuals and organizations provided with privacy awareness and training? ' : guidance: 'Provide regular privacy awareness training to all personnel and communicate privacy practices to individuals whose data is processed.', priority: 'medium', references: ['CM.AW-P1'], examples: [
                'Privacy awareness training programs',
                'Privacy notices and communications',
                'Role-specific privacy training',
                'Public privacy education materials'
              ], options: [
                { value: 0, label, 'No training', description: 'No privacy awareness or training programs' },
                { value: 1, label, 'Basic training', description: 'Some privacy awareness activities' },
                { value: 2, label, 'Regular training', description: 'Systematic privacy training with regular updates' },
                { value: 3, label, 'Advanced training', description: 'Comprehensive privacy training with continuous reinforcement' }
              ]
            },
            {
              id: 'privacy.cm.aw.p2', text: 'Are privacy communications tailored to the audience? ' : guidance: 'Tailor privacy communications to different audiences to ensure effective understanding and engagement.', priority: 'low', references: ['CM.AW-P2'], examples: [
                'Audience-specific privacy notices',
                'Tailored communication materials',
                'Role-based privacy information',
                'Stakeholder-specific communications'
              ], options: [
                { value: 0, label, 'Not tailored', description: 'Generic privacy communications for all audiences' },
                { value: 1, label, 'Basic tailoring', description: 'Some audience-specific communications' },
                { value: 2, label, 'Good tailoring', description: 'Well-tailored communications for different audiences' },
                { value: 3, label, 'Advanced tailoring', description: 'Sophisticated audience-specific communication strategy' }
              ]
            }
          ]
        },
        {
          id: 'data-subject-participation', name: 'Data Subject Participation (CM.DS-P)', description: 'Individuals are provided with the means to participate in decisions about the processing of their PII', weight: 75, questions: [
            {
              id: 'privacy.cm.ds.p1', text: 'Are mechanisms for data subject participation and control provided? ' : guidance: 'Implement mechanisms that allow individuals to exercise their privacy rights, including access, correction, deletion, and portability of their personal data.', priority: 'high', references: ['CM.DS-P1'], examples: [
                'Data subject request portals',
                'Privacy preference centers',
                'Consent management platforms',
                'Data subject rights fulfillment processes'
              ], options: [
                { value: 0, label, 'No mechanisms', description: 'No data subject participation mechanisms' },
                { value: 1, label, 'Basic mechanisms', description: 'Some data subject rights processes' },
                { value: 2, label, 'Good mechanisms', description: 'Comprehensive data subject rights with reasonable response times' },
                { value: 3, label, 'Advanced mechanisms', description: 'Automated data subject rights with real-time fulfillment' }
              ]
            },
            {
              id: 'privacy.cm.ds.p2', text: 'Are individuals\' privacy preferences respected and implemented? ' : guidance: 'Respect and implement individuals\' privacy preferences and choices regarding their personal information.', priority: 'high', references: ['CM.DS-P2'], examples: [
                'Privacy preference systems',
                'Choice implementation mechanisms',
                'Preference tracking systems',
                'Opt-out/opt-in controls'
              ], options: [
                { value: 0, label, 'Not respected', description: 'No consideration of individual privacy preferences' },
                { value: 1, label, 'Basic respect', description: 'Some privacy preference mechanisms' },
                { value: 2, label, 'Good respect', description: 'Comprehensive privacy preference implementation' },
                { value: 3, label, 'Advanced respect', description: 'Sophisticated preference management with real-time implementation' }
              ]
            },
            {
              id: 'privacy.cm.ds.p3', text: 'Are the privacy notices provided to individuals about PII processing? ' : guidance: 'Provide clear, comprehensive privacy notices to individuals about how their personal information is processed.', priority: 'high', references: ['CM.DS-P3'], examples: [
                'Privacy policy documents',
                'Processing notices',
                'Data collection notifications',
                'Rights information disclosures'
              ], options: [
                { value: 0, label, 'No notices', description: 'No privacy notices provided' },
                { value: 1, label, 'Basic notices', description: 'Some privacy information provided' },
                { value: 2, label, 'Good notices', description: 'Comprehensive privacy notices' },
                { value: 3, label: 'Advanced notices', description, 'Dynamic: personalized privacy notices with real-time updates'  }
              ]
            },
            {
              id: 'privacy.cm.ds.p4', text: 'Are individuals able to exercise their rights related to PII processing? ' : guidance: 'Enable individuals to effectively exercise their privacy rights, including access, rectification, erasure, and portability.', priority: 'high', references: ['CM.DS-P4'], examples: [
                'Rights exercise portals',
                'Request fulfillment processes',
                'Rights response systems',
                'Appeal mechanisms'
              ], options: [
                { value: 0, label, 'Cannot exercise', description: 'No mechanisms for individuals to exercise privacy rights' },
                { value: 1, label, 'Limited exercise', description: 'Some privacy rights exercise capabilities' },
                { value: 2, label, 'Good exercise', description: 'Comprehensive privacy rights exercise with reasonable timeframes' },
                { value: 3, label, 'Advanced exercise', description: 'Automated privacy rights exercise with immediate fulfillment' }
              ]
            },
            {
              id: 'privacy.cm.ds.p5', text: 'Are individuals able to provide consent for PII processing? ' : guidance: 'Implement mechanisms that allow individuals to provide meaningful consent for personal information processing.', priority: 'high', references: ['CM.DS-P5'], examples: [
                'Consent management platforms',
                'Consent collection mechanisms',
                'Consent tracking systems',
                'Withdrawal mechanisms'
              ], options: [
                { value: 0, label, 'No consent mechanisms', description: 'No formal consent collection or management' },
                { value: 1, label, 'Basic consent', description: 'Some consent collection mechanisms' },
                { value: 2, label, 'Good consent', description: 'Comprehensive consent management with clear choices' },
                { value: 3, label, 'Advanced consent', description: 'Sophisticated consent management with granular controls' }
              ]
            },
            {
              id: 'privacy.cm.ds.p6', text: 'Are individuals able to withdraw consent for PII processing? ' : guidance: 'Enable individuals to easily withdraw their consent for personal information processing when consent is the legal basis.', priority: 'medium', references: ['CM.DS-P6'], examples: [
                'Consent withdrawal mechanisms',
                'Opt-out systems',
                'Withdrawal processing systems',
                'Preference management tools'
              ], options: [
                { value: 0, label, 'Cannot withdraw', description: 'No consent withdrawal mechanisms' },
                { value: 1, label, 'Limited withdrawal', description: 'Some consent withdrawal capabilities' },
                { value: 2, label, 'Good withdrawal', description: 'Easy consent withdrawal with clear processes' },
                { value: 3, label, 'Advanced withdrawal', description: 'Immediate consent withdrawal with automated processing cessation' }
              ]
            },
            {
              id: 'privacy.cm.ds.p7', text: 'Are individuals able to access their PII and related information? ' : guidance: 'Provide individuals with the ability to access their personal information and related processing details.', priority: 'high', references: ['CM.DS-P7'], examples: [
                'Data access portals',
                'Subject access request processes',
                'Personal data dashboards',
                'Processing information disclosure'
              ], options: [
                { value: 0, label, 'No access', description: 'No mechanisms for individuals to access their PII' },
                { value: 1, label, 'Limited access', description: 'Some data access capabilities' },
                { value: 2, label, 'Good access', description: 'Comprehensive data access with reasonable timeframes' },
                { value: 3, label, 'Advanced access', description: 'Real-time data access with comprehensive processing information' }
              ]
            },
            {
              id: 'privacy.cm.ds.p8', text: 'Are individuals able to have their PII corrected or deleted? ' : guidance: 'Enable individuals to request correction of inaccurate personal information or deletion when appropriate.', priority: 'medium', references: ['CM.DS-P8'], examples: [
                'Data correction systems',
                'Deletion request processes',
                'Data rectification workflows',
                'Erasure mechanisms'
              ], options: [
                { value: 0, label, 'No correction/deletion', description: 'No mechanisms for data correction or deletion' },
                { value: 1, label, 'Limited capabilities', description: 'Some correction or deletion capabilities' },
                { value: 2, label, 'Good capabilities', description: 'Comprehensive correction and deletion processes' },
                { value: 3, label, 'Advanced capabilities', description: 'Automated correction and deletion with immediate processing' }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'protect-p', name: 'Protect-P', description: 'Develop and implement appropriate data processing safeguards', weight: 15, priority: 'low', estimatedTime: 10, categories: [
        {
          id: 'data-processing-ecosystem', name: 'Data Processing Ecosystem (PR.DS-P)', description: 'PII is managed throughout the data lifecycle to reduce privacy risks', weight: 70, questions: [
            {
              id: 'privacy.pr.ds.p1', text: 'Are data processing ecosystem risks identified and managed? ' : guidance: 'Identify and manage privacy risks throughout the data processing ecosystem, including third-party processors and data transfers.', priority: 'medium', references: ['PR.DS-P1'], examples: [
                'Third-party privacy risk assessments',
                'Data processing agreements',
                'Cross-border transfer mechanisms',
                'Vendor privacy due diligence'
              ], options: [
                { value: 0, label, 'Not managed', description: 'No ecosystem privacy risk management' },
                { value: 1, label, 'Basic management', description: 'Some third-party privacy controls' },
                { value: 2, label, 'Good management', description: 'Comprehensive ecosystem risk management' },
                { value: 3, label, 'Advanced management', description: 'Sophisticated ecosystem risk management with continuous monitoring' }
              ]
            },
            {
              id: 'privacy.pr.ds.p2', text: 'Are data processing environment risks identified and managed? ' : guidance: 'Identify and manage privacy risks within the data processing environment, including infrastructure and operational risks.', priority: 'medium', references: ['PR.DS-P2'], examples: [
                'Infrastructure privacy assessments',
                'Environmental risk evaluations',
                'Processing environment controls',
                'Operational privacy safeguards'
              ], options: [
                { value: 0, label, 'Not managed', description: 'No processing environment risk management' },
                { value: 1, label, 'Basic management', description: 'Some environmental privacy controls' },
                { value: 2, label, 'Good management', description: 'Comprehensive environmental risk management' },
                { value: 3, label, 'Advanced management', description: 'Sophisticated environmental risk management with monitoring' }
              ]
            },
            {
              id: 'privacy.pr.ds.p3', text: 'Are PII processing activities continuously monitored? ' : guidance: 'Implement continuous monitoring of personal information processing activities to detect and respond to privacy risks.', priority: 'high', references: ['PR.DS-P3'], examples: [
                'Processing activity monitoring',
                'Real-time privacy dashboards',
                'Automated privacy alerts',
                'Continuous compliance monitoring'
              ], options: [
                { value: 0, label, 'Not monitored', description: 'No continuous monitoring of PII processing' },
                { value: 1, label, 'Basic monitoring', description: 'Some processing activity monitoring' },
                { value: 2, label, 'Good monitoring', description: 'Comprehensive continuous monitoring' },
                { value: 3, label, 'Advanced monitoring', description: 'Sophisticated real-time monitoring with automated responses' }
              ]
            },
            {
              id: 'privacy.pr.ds.p4', text: 'Are audit logs for PII processing maintained and monitored? ' : guidance: 'Maintain comprehensive audit logs of personal information processing activities and monitor them for compliance and security.', priority: 'medium', references: ['PR.DS-P4'], examples: [
                'PII processing audit logs',
                'Log monitoring systems',
                'Audit trail maintenance',
                'Log analysis and reporting'
              ], options: [
                { value: 0, label, 'No audit logs', description: 'No audit logging for PII processing' },
                { value: 1, label, 'Basic logging', description: 'Some PII processing audit logs' },
                { value: 2, label, 'Good logging', description: 'Comprehensive audit logging with regular review' },
                { value: 3, label, 'Advanced logging', description: 'Sophisticated audit logging with automated analysis' }
              ]
            },
            {
              id: 'privacy.pr.ds.p5', text: 'Are response and recovery plans maintained for privacy events? ' : guidance: 'Maintain and regularly test response and recovery plans for privacy incidents and breaches.', priority: 'high', references: ['PR.DS-P5'], examples: [
                'Privacy incident response plans',
                'Breach response procedures',
                'Recovery planning',
                'Incident response testing'
              ], options: [
                { value: 0, label, 'No plans', description: 'No privacy incident response or recovery plans' },
                { value: 1, label, 'Basic plans', description: 'Some privacy incident response capabilities' },
                { value: 2, label, 'Good plans', description: 'Comprehensive incident response and recovery plans' },
                { value: 3, label, 'Advanced plans', description: 'Sophisticated incident response with automated recovery capabilities' }
              ]
            },
            {
              id: 'privacy.pr.ds.p6', text: 'Are technical privacy enhancing technologies implemented? ' : guidance: 'Implement technical privacy enhancing technologies to minimize privacy risks and protect personal information.', priority: 'low', references: ['PR.DS-P6'], examples: [
                'Differential privacy implementation',
                'Data anonymization techniques',
                'Pseudonymization methods',
                'Privacy-preserving analytics'
              ], options: [
                { value: 0, label, 'Not implemented', description: 'No privacy enhancing technologies' },
                { value: 1, label, 'Basic implementation', description: 'Some privacy enhancing technologies' },
                { value: 2, label, 'Good implementation', description: 'Comprehensive privacy enhancing technology suite' },
                { value: 3, label, 'Advanced implementation', description: 'Sophisticated privacy enhancing technologies with continuous innovation' }
              ]
            },
            {
              id: 'privacy.pr.ds.p7', text: 'Are safeguards implemented for PII sharing? ' : guidance: 'Implement appropriate safeguards when sharing personal information with third parties or across borders.', priority: 'high', references: ['PR.DS-P7'], examples: [
                'Data sharing agreements',
                'Transfer impact assessments',
                'Cross-border transfer safeguards',
                'Third-party privacy controls'
              ], options: [
                { value: 0, label, 'No safeguards', description: 'No safeguards for PII sharing' },
                { value: 1, label, 'Basic safeguards', description: 'Some PII sharing protections' },
                { value: 2, label, 'Good safeguards', description: 'Comprehensive PII sharing safeguards' },
                { value: 3, label, 'Advanced safeguards', description: 'Sophisticated sharing safeguards with continuous monitoring' }
              ]
            },
            {
              id: 'privacy.pr.ds.p8', text: 'Are safeguards implemented for PII disposal? ' : guidance: 'Implement secure methods for disposing of personal information when it is no longer needed.', priority: 'medium', references: ['PR.DS-P8'], examples: [
                'Secure disposal procedures',
                'Data destruction verification',
                'Disposal audit trails',
                'Sanitization methods'
              ], options: [
                { value: 0, label, 'No safeguards', description: 'No secure PII disposal safeguards' },
                { value: 1, label, 'Basic safeguards', description: 'Some PII disposal protections' },
                { value: 2, label, 'Good safeguards', description: 'Comprehensive secure disposal procedures' },
                { value: 3, label, 'Advanced safeguards', description: 'Sophisticated disposal safeguards with verification and audit trails' }
              ]
            }
          ]
        },
        {
          id: 'protective-technology-p', name: 'Protective Technology (PR.PT-P)', description: 'Technical solutions are managed to ensure the security and privacy of PII', weight: 30, questions: [
            {
              id: 'privacy.pr.pt.p1', text: 'Are technical privacy solutions implemented and maintained? ' : guidance: 'Implement and maintain technical solutions specifically designed to protect privacy and personal information.', priority: 'medium', references: ['PR.PT-P1'], examples: [
                'Privacy-by-design systems',
                'Technical privacy controls',
                'Privacy-preserving architectures',
                'Privacy technology maintenance'
              ], options: [
                { value: 0, label, 'Not implemented', description: 'No technical privacy solutions' },
                { value: 1, label, 'Basic implementation', description: 'Some technical privacy measures' },
                { value: 2, label, 'Good implementation', description: 'Comprehensive technical privacy solutions' },
                { value: 3, label, 'Advanced implementation', description: 'Sophisticated privacy-by-design technical architecture' }
              ]
            },
            {
              id: 'privacy.pr.pt.p2', text: 'Are cryptographic protections implemented for PII? ' : guidance: 'Implement appropriate cryptographic protections for personal information at rest, in transit, and in use.', priority: 'high', references: ['PR.PT-P2'], examples: [
                'PII encryption at rest',
                'Secure transmission protocols',
                'Cryptographic key management',
                'Homomorphic encryption'
              ], options: [
                { value: 0, label, 'Not implemented', description: 'No cryptographic protections for PII' },
                { value: 1, label, 'Basic protection', description: 'Some cryptographic measures for PII' },
                { value: 2, label, 'Good protection', description: 'Comprehensive cryptographic protection' },
                { value: 3, label, 'Advanced protection', description: 'Sophisticated cryptographic protections with advanced techniques' }
              ]
            },
            {
              id: 'privacy.pr.pt.p3', text: 'Are access controls implemented for PII processing systems? ' : guidance: 'Implement robust access controls to restrict access to personal information processing systems based on need-to-know principles.', priority: 'high', references: ['PR.PT-P3'], examples: [
                'Role-based access controls',
                'Multi-factor authentication',
                'Privileged access management',
                'Access monitoring and logging'
              ], options: [
                { value: 0, label, 'No controls', description: 'No access controls for PII processing systems' },
                { value: 1, label, 'Basic controls', description: 'Some access control measures' },
                { value: 2, label, 'Good controls', description: 'Comprehensive access control implementation' },
                { value: 3, label, 'Advanced controls', description: 'Sophisticated access controls with continuous monitoring' }
              ]
            },
            {
              id: 'privacy.pr.pt.p4', text: 'Are system and network security controls implemented for PII processing? ' : guidance: 'Implement appropriate system and network security controls to protect personal information processing environments.', priority: 'medium', references: ['PR.PT-P4'], examples: [
                'Network segmentation',
                'Intrusion detection systems',
                'Security monitoring',
                'Vulnerability management'
              ], options: [
                { value: 0, label, 'No controls', description: 'No specific security controls for PII processing systems' },
                { value: 1, label, 'Basic controls', description: 'Some security measures for PII processing' },
                { value: 2, label, 'Good controls', description: 'Comprehensive security controls for PII processing' },
                { value: 3, label, 'Advanced controls', description: 'Sophisticated security architecture with continuous protection' }
              ]
            }
          ]
        }
      ]
    }
  ]
};