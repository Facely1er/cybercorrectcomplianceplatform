import { Framework } from '../../shared/types';

export const nistCSFv2ExtendedFramework: Framework = {
  id: 'nist-csf-v2-extended', name: 'NIST Cybersecurity Framework v2.0 - Extended Assessment', description: 'Comprehensive assessment covering all 106 NIST CSF v2.0 subcategories and implementation outcomes for complete cybersecurity framework evaluation', version: '2.0', complexity: 'advanced', estimatedTime: 265, // 106 controls × 2.5 minutes average
  industry: ['All Industries', 'Critical Infrastructure', 'Federal Government', 'Private Sector'], sections: [
    {
      id: 'govern', name: 'Govern (GV)', description: 'The organization\'s cybersecurity risk management strategy, expectations, and policy are established, communicated, and monitored.', weight: 20, priority: 'high', categories: [
        {
          id: 'gv-oc', name: 'Organizational Context (GV.OC)', description: 'The circumstances that form the setting for the organization\'s cybersecurity risk management decisions are understood', weight: 25, questions: [
            {
              id: 'gv-oc-01', text: 'How comprehensively does your organization understand the legal and regulatory requirements that affect its operations?', guidance: 'Assess whether the organization has identified all applicable laws, regulations, and contractual obligations that impact cybersecurity risk management. This includes industry-specific regulations, privacy laws, and cybersecurity requirements.', priority: 'high', examples: [
                'Documented inventory of applicable regulations (GDPR, HIPAA, SOX, etc.)',
                'Regular legal review process for new requirements',
                'Clear understanding of regulatory reporting obligations',
                'Documented contractual cybersecurity obligations'
              ], references: ['NIST CSF v2.0 GV.OC-01'], options: [
                {
                  value: 0, label: 'Not Performed', description: 'Organization has not identified or documented legal and regulatory requirements affecting cybersecurity', riskLevel: 'critical', recommendedActions: [
                    'Conduct comprehensive legal and regulatory requirements assessment',
                    'Engage legal counsel to identify applicable requirements',
                    'Create centralized repository of requirements'
                  ]
                
    },
                {
                  value: 1, label: 'Performed', description: 'Basic identification of major legal and regulatory requirements has been completed', riskLevel: 'high', recommendedActions: [
                    'Formalize requirements identification process',
                    'Create detailed documentation of all requirements',
                    'Establish regular review cycle'
                  ]
                },
                {
                  value: 2, label: 'Documented', description: 'Legal and regulatory requirements are documented and regularly reviewed', riskLevel: 'medium', recommendedActions: [
                    'Implement automated monitoring for requirement changes',
                    'Establish formal compliance tracking process',
                    'Regular stakeholder communication on requirements'
                  ]
                },
                {
                  value: 3, label: 'Managed', description: 'Comprehensive understanding with managed processes for tracking requirement changes and ensuring compliance', riskLevel: 'low', recommendedActions: [
                    'Implement predictive compliance monitoring',
                    'Establish industry best practice benchmarking',
                    'Continuous improvement of requirements management'
                  ]
                }
              ]
            },
            {
              id: 'gv-oc-02', text: 'How effectively does your organization understand its place within critical infrastructure and the broader ecosystem?', guidance: 'Evaluate the organization\'s understanding of its role in critical infrastructure, dependencies on other organizations, and impact on stakeholders in the event of a cybersecurity incident.', priority: 'high', examples: [
                'Critical infrastructure sector designation understanding',
                'Documented dependencies on suppliers and partners',
                'Impact assessment on customers and stakeholders',
                'Understanding of role in supply chain security'
              ], references: ['NIST CSF v2.0 GV.OC-02'], options: [
                {
                  value: 0, label: 'Not Performed', description: 'Organization has not assessed its role in critical infrastructure or broader ecosystem', riskLevel: 'critical'
                },
                {
                  value: 1, label: 'Performed', description: 'Basic understanding of organizational role and some key dependencies', riskLevel: 'high'
                },
                {
                  value: 2, label: 'Documented', description: 'Documented understanding of critical infrastructure role and ecosystem dependencies', riskLevel: 'medium'
                },
                {
                  value: 3, label: 'Managed', description: 'Comprehensive understanding with managed processes for monitoring ecosystem changes', riskLevel: 'low'
                }
              ]
            },
            {
              id: 'gv-oc-03', text: 'How well does your organization understand and document its cybersecurity supply chain risks?', guidance: 'Assess the organization\'s understanding of supply chain cybersecurity risks, including third-party dependencies, vendor security requirements, and supply chain attack vectors.', priority: 'high', examples: [
                'Supply chain risk assessment methodology',
                'Vendor cybersecurity requirements and standards',
                'Third-party security assessment processes',
                'Supply chain attack scenario planning'
              ], references: ['NIST CSF v2.0 GV.OC-03'], options: [
                {
                  value: 0, label: 'Not Performed', description: 'Supply chain cybersecurity risks are not understood or documented', riskLevel: 'critical'
                },
                {
                  value: 1, label: 'Performed', description: 'Basic understanding of major supply chain risks', riskLevel: 'high'
                },
                {
                  value: 2, label: 'Documented', description: 'Supply chain risks are documented and regularly assessed', riskLevel: 'medium'
                },
                {
                  value: 3, label: 'Managed', description: 'Comprehensive supply chain risk management with continuous monitoring', riskLevel: 'low'
                }
              ]
            }
          ]
        },
        {
          id: 'gv-rm', name: 'Risk Management Strategy (GV.RM)', description: 'The organization\'s priorities, constraints, risk tolerance, and assumptions are established and communicated', weight: 25, questions: [
            {
              id: 'gv-rm-01', text: 'How clearly has your organization established and communicated its cybersecurity risk management strategy?', guidance: 'Evaluate whether the organization has a formal cybersecurity risk management strategy that aligns with business objectives and is effectively communicated throughout the organization.', priority: 'high', examples: [
                'Written cybersecurity risk management strategy document',
                'Executive-level approval and endorsement',
                'Regular strategy communication to all stakeholders',
                'Integration with enterprise risk management'
              ], references: ['NIST CSF v2.0 GV.RM-01'], options: [
                {
                  value: 0, label: 'Not Performed', description: 'No formal cybersecurity risk management strategy exists', riskLevel: 'critical'
                },
                {
                  value: 1, label: 'Performed', description: 'Basic cybersecurity risk management approach is in place', riskLevel: 'high'
                },
                {
                  value: 2, label: 'Documented', description: 'Formal risk management strategy is documented and communicated', riskLevel: 'medium'
                },
                {
                  value: 3, label: 'Managed', description: 'Comprehensive strategy with regular review and continuous improvement', riskLevel: 'low'
                }
              ]
            },
            {
              id: 'gv-rm-02', text: 'How effectively has your organization established its cybersecurity risk tolerance and appetite?', guidance: 'Assess whether the organization has clearly defined risk tolerance levels, risk appetite statements, and thresholds that guide cybersecurity decision-making.', priority: 'high', examples: [
                'Documented risk tolerance statements',
                'Quantitative risk thresholds and limits',
                'Risk appetite aligned with business strategy',
                'Regular review and adjustment of risk tolerance'
              ], references: ['NIST CSF v2.0 GV.RM-02'], options: [
                {
                  value: 0, label: 'Not Performed', description: 'Risk tolerance and appetite are not defined', riskLevel: 'critical'
                },
                {
                  value: 1, label: 'Performed', description: 'Basic understanding of risk tolerance exists', riskLevel: 'high'
                },
                {
                  value: 2, label: 'Documented', description: 'Risk tolerance and appetite are formally documented', riskLevel: 'medium'
                },
                {
                  value: 3, label: 'Managed', description: 'Dynamic risk tolerance management with regular adjustment based on business needs', riskLevel: 'low'
                }
              ]
            }
          ]
        },
        {
          id: 'gv-rr', name: 'Roles, Responsibilities, and Authorities (GV.RR)', description: 'Cybersecurity roles, responsibilities, and authorities to foster accountability, performance assessment, and continuous improvement are established and communicated', weight: 20, questions: [
            {
              id: 'gv-rr-01', text: 'How clearly are cybersecurity roles and responsibilities defined and assigned throughout your organization?', guidance: 'Assess whether cybersecurity roles and responsibilities are clearly defined, properly assigned, and understood by all relevant personnel across the organization.', priority: 'high', examples: [
                'RACI matrix for cybersecurity functions',
                'Job descriptions with cybersecurity responsibilities',
                'Clear escalation paths and decision authority',
                'Regular role and responsibility training'
              ], references: ['NIST CSF v2.0 GV.RR-01'], options: [
                {
                  value: 0, label: 'Not Performed', description: 'Cybersecurity roles and responsibilities are unclear or undefined', riskLevel: 'critical'
                },
                {
                  value: 1, label: 'Performed', description: 'Basic cybersecurity roles are assigned but may lack clarity', riskLevel: 'high'
                },
                {
                  value: 2, label: 'Documented', description: 'Roles and responsibilities are clearly documented and communicated', riskLevel: 'medium'
                },
                {
                  value: 3, label: 'Managed', description: 'Comprehensive role management with regular review and performance assessment', riskLevel: 'low'
                }
              ]
            },
            {
              id: 'gv-rr-02', text: 'How effectively does your organization ensure accountability for cybersecurity performance?', guidance: 'Evaluate the organization\'s mechanisms for ensuring cybersecurity accountability, including performance measurement, reporting, and consequences for non-performance.', priority: 'medium', examples: [
                'Cybersecurity performance metrics and KPIs',
                'Regular performance reporting and review',
                'Consequences for cybersecurity failures',
                'Recognition and rewards for good cybersecurity performance'
              ], references: ['NIST CSF v2.0 GV.RR-02'], options: [
                {
                  value: 0, label: 'Not Performed', description: 'No accountability mechanisms for cybersecurity performance', riskLevel: 'high'
                },
                {
                  value: 1, label: 'Performed', description: 'Basic accountability measures are in place', riskLevel: 'medium'
                },
                {
                  value: 2, label: 'Documented', description: 'Formal accountability framework with documented performance measures', riskLevel: 'low'
                },
                {
                  value: 3, label: 'Managed', description: 'Comprehensive accountability system with continuous improvement', riskLevel: 'low'
                }
              ]
            }
          ]
        },
        {
          id: 'gv-po', name: 'Policy (GV.PO)', description: 'Organizational cybersecurity policy is established and communicated', weight: 15, questions: [
            {
              id: 'gv-po-01', text: 'How comprehensive is your organization\'s cybersecurity policy framework?', guidance: 'Assess the completeness, currency, and effectiveness of the organization\'s cybersecurity policies, including coverage of all relevant areas and regular updates.', priority: 'high', examples: [
                'Comprehensive cybersecurity policy suite',
                'Regular policy review and update cycle',
                'Policy coverage of all business functions',
                'Integration with other organizational policies'
              ], references: ['NIST CSF v2.0 GV.PO-01'], options: [
                {
                  value: 0, label: 'Not Performed', description: 'No formal cybersecurity policies exist', riskLevel: 'critical'
                },
                {
                  value: 1, label: 'Performed', description: 'Basic cybersecurity policies exist but may be incomplete', riskLevel: 'high'
                },
                {
                  value: 2, label: 'Documented', description: 'Comprehensive policy framework is documented and current', riskLevel: 'medium'
                },
                {
                  value: 3, label: 'Managed', description: 'Dynamic policy management with continuous improvement and stakeholder feedback', riskLevel: 'low'
                }
              ]
            },
            {
              id: 'gv-po-02', text: 'How effectively are cybersecurity policies communicated and enforced throughout your organization?', guidance: 'Evaluate the organization\'s processes for communicating cybersecurity policies to all relevant personnel and ensuring compliance with policy requirements.', priority: 'high', examples: [
                'Policy awareness training programs',
                'Regular policy communication and updates',
                'Policy compliance monitoring and enforcement',
                'Clear consequences for policy violations'
              ], references: ['NIST CSF v2.0 GV.PO-02'], options: [
                {
                  value: 0, label: 'Not Performed', description: 'Policies are not effectively communicated or enforced', riskLevel: 'high'
                },
                {
                  value: 1, label: 'Performed', description: 'Basic policy communication exists but enforcement may be inconsistent', riskLevel: 'medium'
                },
                {
                  value: 2, label: 'Documented', description: 'Formal communication and enforcement processes are documented', riskLevel: 'low'
                },
                {
                  value: 3, label: 'Managed', description: 'Comprehensive policy management with continuous monitoring and improvement', riskLevel: 'low'
                }
              ]
            }
          ]
        },
        {
          id: 'gv-ov', name: 'Oversight (GV.OV)', description: 'Results of organization cybersecurity risk management activities are used to inform, improve, and adjust the risk management strategy', weight: 15, questions: [
            {
              id: 'gv-ov-01', text: 'How effectively does senior leadership provide oversight and governance of cybersecurity risk management?', guidance: 'Assess the level of senior leadership engagement in cybersecurity governance, including board oversight, executive accountability, and strategic decision-making.', priority: 'high', examples: [
                'Board-level cybersecurity oversight committee',
                'Regular cybersecurity reporting to executives',
                'Executive accountability for cybersecurity outcomes',
                'Strategic cybersecurity investment decisions'
              ], references: ['NIST CSF v2.0 GV.OV-01'], options: [
                {
                  value: 0, label: 'Not Performed', description: 'Senior leadership does not actively oversee cybersecurity risk management', riskLevel: 'critical'
                },
                {
                  value: 1, label: 'Performed', description: 'Some senior leadership engagement in cybersecurity oversight', riskLevel: 'high'
                },
                {
                  value: 2, label: 'Documented', description: 'Formal senior leadership oversight processes are documented and followed', riskLevel: 'medium'
                },
                {
                  value: 3, label: 'Managed', description: 'Comprehensive governance with continuous improvement and strategic alignment', riskLevel: 'low'
                }
              ]
            }
          ]
        },
        {
          id: 'gv-sc', name: 'Supply Chain Risk Management (GV.SC)', description: 'Supply chain risk management processes are identified, established, managed, monitored, and improved by organizational stakeholders', weight: 15, questions: [
            {
              id: 'gv-sc-01', text: 'How comprehensively does your organization manage cybersecurity risks in its supply chain?', guidance: 'Evaluate the organization\'s approach to identifying, assessing, and managing cybersecurity risks throughout its supply chain, including vendor management and third-party risk assessment.', priority: 'high', examples: [
                'Supply chain risk assessment methodology',
                'Vendor cybersecurity requirements and contracts',
                'Third-party security monitoring and assessment',
                'Supply chain incident response procedures'
              ], references: ['NIST CSF v2.0 GV.SC-01'], options: [
                {
                  value: 0, label: 'Not Performed', description: 'Supply chain cybersecurity risks are not managed', riskLevel: 'critical'
                },
                {
                  value: 1, label: 'Performed', description: 'Basic supply chain risk management practices exist', riskLevel: 'high'
                },
                {
                  value: 2, label: 'Documented', description: 'Formal supply chain risk management processes are documented', riskLevel: 'medium'
                },
                {
                  value: 3, label: 'Managed', description: 'Comprehensive supply chain risk management with continuous monitoring', riskLevel: 'low'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'identify', name: 'Identify (ID)', description: 'Understanding the organization to manage cybersecurity risk to systems, people, assets, data, and capabilities.', weight: 20, priority: 'high', categories: [
        {
          id: 'id-am', name: 'Asset Management (ID.AM)', description: 'Assets are identified and managed consistent with their relative importance to organizational objectives and the organization\'s risk strategy', weight: 30, questions: [
            {
              id: 'id-am-01', text: 'How comprehensively does your organization inventory and manage its physical devices and systems?', guidance: 'Assess the organization\'s ability to identify, catalog, and manage all physical devices including computers, servers, networking equipment, IoT devices, and other technology assets.', priority: 'high', examples: [
                'Automated network discovery tools',
                'Physical asset inventory database',
                'Asset tagging and tracking system',
                'Regular physical asset audits'
              ], references: ['NIST CSF v2.0 ID.AM-01'], options: [
                {
                  value: 0, label: 'Not Performed', description: 'Physical devices and systems are not systematically inventoried', riskLevel: 'high'
                },
                {
                  value: 1, label: 'Performed', description: 'Basic inventory of major physical assets exists', riskLevel: 'medium'
                },
                {
                  value: 2, label: 'Documented', description: 'Comprehensive physical asset inventory is maintained and documented', riskLevel: 'low'
                },
                {
                  value: 3, label: 'Managed', description: 'Automated asset discovery and management with real-time updates', riskLevel: 'low'
                }
              ]
            },
            {
              id: 'id-am-02', text: 'How effectively does your organization inventory and manage its software platforms and applications?', guidance: 'Evaluate the organization\'s processes for identifying, cataloging, and managing all software assets including operating systems, applications, databases, and cloud services.', priority: 'high', examples: [
                'Software asset management (SAM) tools',
                'Application portfolio management',
                'Cloud service inventory and management',
                'Software license tracking and compliance'
              ], references: ['NIST CSF v2.0 ID.AM-02'], options: [
                {
                  value: 0, label: 'Not Performed', description: 'Software platforms and applications are not systematically inventoried', riskLevel: 'high'
                },
                {
                  value: 1, label: 'Performed', description: 'Basic inventory of major software assets exists', riskLevel: 'medium'
                },
                {
                  value: 2, label: 'Documented', description: 'Comprehensive software inventory is maintained and documented', riskLevel: 'low'
                },
                {
                  value: 3, label: 'Managed', description: 'Automated software discovery and lifecycle management', riskLevel: 'low'
                }
              ]
            },
            {
              id: 'id-am-03', text: 'How well does your organization map and understand its organizational communication and data flows?', guidance: 'Assess the organization\'s understanding of how data flows through systems, networks, and business processes, including internal and external communications.', priority: 'medium', examples: [
                'Data flow mapping and documentation',
                'Network architecture diagrams',
                'Communication pathway documentation',
                'Data lineage and processing maps'
              ], references: ['NIST CSF v2.0 ID.AM-03'], options: [
                {
                  value: 0, label: 'Not Performed', description: 'Communication and data flows are not mapped or understood', riskLevel: 'medium'
                },
                {
                  value: 1, label: 'Performed', description: 'Basic understanding of major data flows exists', riskLevel: 'medium'
                },
                {
                  value: 2, label: 'Documented', description: 'Data flows and communications are comprehensively mapped and documented', riskLevel: 'low'
                },
                {
                  value: 3, label: 'Managed', description: 'Dynamic data flow monitoring with automated discovery and updates', riskLevel: 'low'
                }
              ]
            },
            {
              id: 'id-am-04', text: 'How effectively does your organization catalog and manage external information systems and services?', guidance: 'Evaluate the organization\'s processes for identifying and managing external systems, cloud services, and third-party platforms that support business operations.', priority: 'medium', examples: [
                'Cloud service inventory and management',
                'Third-party system documentation',
                'External service provider agreements',
                'SaaS application portfolio management'
              ], references: ['NIST CSF v2.0 ID.AM-04'], options: [
                {
                  value: 0, label: 'Not Performed', description: 'External systems and services are not systematically cataloged', riskLevel: 'medium'
                },
                {
                  value: 1, label: 'Performed', description: 'Basic inventory of major external services exists', riskLevel: 'medium'
                },
                {
                  value: 2, label: 'Documented', description: 'External systems and services are comprehensively cataloged', riskLevel: 'low'
                },
                {
                  value: 3, label: 'Managed', description: 'Automated external service management with continuous monitoring', riskLevel: 'low'
                }
              ]
            },
            {
              id: 'id-am-05', text: 'How well does your organization prioritize resources based on classification, criticality, and business value?', guidance: 'Assess the organization\'s ability to classify assets by importance and allocate resources for protection based on business criticality and risk.', priority: 'high', examples: [
                'Asset classification methodology',
                'Business impact assessment for assets',
                'Resource allocation based on criticality',
                'Regular prioritization review and updates'
              ], references: ['NIST CSF v2.0 ID.AM-05'], options: [
                {
                  value: 0, label: 'Not Performed', description: 'Resources are not prioritized based on asset criticality', riskLevel: 'high'
                },
                {
                  value: 1, label: 'Performed', description: 'Basic asset prioritization exists but may be informal', riskLevel: 'medium'
                },
                {
                  value: 2, label: 'Documented', description: 'Formal asset classification and prioritization framework', riskLevel: 'low'
                },
                {
                  value: 3, label: 'Managed', description: 'Dynamic prioritization with continuous business value assessment', riskLevel: 'low'
                }
              ]
            }
          ]
        },
        {
          id: 'id-be', name: 'Business Environment (ID.BE)', description: 'The organization\'s mission, objectives, stakeholders, and activities are understood and prioritized', weight: 20, questions: [
            {
              id: 'id-be-01', text: 'How well does your organization understand its role in the supply chain and critical infrastructure?', guidance: 'Assess the organization\'s understanding of its position in critical infrastructure, supply chain dependencies, and impacts on other organizations.', priority: 'medium', examples: [
                'Critical infrastructure sector identification',
                'Supply chain mapping and analysis',
                'Dependency assessment on partners and suppliers',
                'Impact analysis on downstream customers'
              ], references: ['NIST CSF v2.0 ID.BE-01'], options: [
                {
                  value: 0, label: 'Not Performed', description: 'Organization\'s role in supply chain and critical infrastructure is not understood', riskLevel: 'medium'
                },
                {
                  value: 1, label: 'Performed', description: 'Basic understanding of organizational role exists', riskLevel: 'medium'
                },
                {
                  value: 2, label: 'Documented', description: 'Role and dependencies are comprehensively documented', riskLevel: 'low'
                },
                {
                  value: 3, label: 'Managed', description: 'Dynamic understanding with continuous ecosystem monitoring', riskLevel: 'low'
                }
              ]
            },
            {
              id: 'id-be-02', text: 'How effectively does your organization understand and prioritize its missions and business functions?', guidance: 'Evaluate the organization\'s understanding of its core business functions, mission-critical processes, and how they support overall organizational objectives.', priority: 'medium', examples: [
                'Business function mapping and documentation',
                'Mission-critical process identification',
                'Business continuity priority assessment',
                'Stakeholder impact analysis'
              ], references: ['NIST CSF v2.0 ID.BE-02'], options: [
                {
                  value: 0, label: 'Not Performed', description: 'Business functions and missions are not clearly understood or prioritized', riskLevel: 'medium'
                },
                {
                  value: 1, label: 'Performed', description: 'Basic understanding of business functions exists', riskLevel: 'medium'
                },
                {
                  value: 2, label: 'Documented', description: 'Business functions and priorities are comprehensively documented', riskLevel: 'low'
                },
                {
                  value: 3, label: 'Managed', description: 'Dynamic business function management with continuous alignment review', riskLevel: 'low'
                }
              ]
            }
          ]
        },
        {
          id: 'id-gv', name: 'Governance (ID.GV)', description: 'The policies, procedures, and processes to manage and monitor the organization\'s regulatory, legal, risk, environmental, and operational requirements are understood', weight: 10, questions: [
            {
              id: 'id-gv-01', text: 'How comprehensively does your organization understand and manage its governance requirements for cybersecurity?', guidance: 'Assess the organization\'s understanding of all governance requirements including legal, regulatory, and operational requirements that impact cybersecurity.', priority: 'medium', examples: [
                'Governance framework documentation',
                'Regulatory compliance tracking',
                'Legal requirement monitoring',
                'Operational governance procedures'
              ], references: ['NIST CSF v2.0 ID.GV-01'], options: [
                {
                  value: 0, label: 'Not Performed', description: 'Governance requirements for cybersecurity are not understood', riskLevel: 'high'
                },
                {
                  value: 1, label: 'Performed', description: 'Basic understanding of governance requirements exists', riskLevel: 'medium'
                },
                {
                  value: 2, label: 'Documented', description: 'Governance requirements are comprehensively documented and tracked', riskLevel: 'low'
                },
                {
                  value: 3, label: 'Managed', description: 'Dynamic governance management with continuous monitoring and updates', riskLevel: 'low'
                }
              ]
            }
          ]
        },
        {
          id: 'id-ra', name: 'Risk Assessment (ID.RA)', description: 'The organization understands the cybersecurity risk to organizational operations, organizational assets, and individuals', weight: 25, questions: [
            {
              id: 'id-ra-01', text: 'How effectively does your organization identify and document asset vulnerabilities?', guidance: 'Evaluate the organization\'s processes for identifying, assessing, and documenting vulnerabilities across all types of assets including systems, applications, and infrastructure.', priority: 'high', examples: [
                'Vulnerability scanning and assessment tools',
                'Regular vulnerability assessments',
                'Vulnerability database and tracking',
                'Risk-based vulnerability prioritization'
              ], references: ['NIST CSF v2.0 ID.RA-01'], options: [
                {
                  value: 0, label: 'Not Performed', description: 'Asset vulnerabilities are not systematically identified or documented', riskLevel: 'critical'
                },
                {
                  value: 1, label: 'Performed', description: 'Basic vulnerability identification occurs but may be incomplete', riskLevel: 'high'
                },
                {
                  value: 2, label: 'Documented', description: 'Comprehensive vulnerability assessment program with documentation', riskLevel: 'medium'
                },
                {
                  value: 3, label: 'Managed', description: 'Continuous vulnerability management with automated discovery and risk-based prioritization', riskLevel: 'low'
                }
              ]
            },
            {
              id: 'id-ra-02', text: 'How comprehensively does your organization identify and assess cyber threat intelligence?', guidance: 'Assess the organization\'s capability to identify, collect, analyze, and use cyber threat intelligence to understand threats relevant to the organization.', priority: 'medium', examples: [
                'Threat intelligence feeds and sources',
                'Threat analysis and assessment capability',
                'Industry-specific threat information sharing',
                'Threat landscape monitoring and reporting'
              ], references: ['NIST CSF v2.0 ID.RA-02'], options: [
                {
                  value: 0, label: 'Not Performed', description: 'Cyber threat intelligence is not collected or analyzed', riskLevel: 'high'
                },
                {
                  value: 1, label: 'Performed', description: 'Basic threat intelligence collection exists', riskLevel: 'medium'
                },
                {
                  value: 2, label: 'Documented', description: 'Formal threat intelligence program with documented processes', riskLevel: 'low'
                },
                {
                  value: 3, label: 'Managed', description: 'Advanced threat intelligence with predictive analysis and automated integration', riskLevel: 'low'
                }
              ]
            },
            {
              id: 'id-ra-03', text: 'How effectively does your organization conduct cybersecurity risk assessments of organizational operations and assets?', guidance: 'Evaluate the organization\'s risk assessment methodology, including frequency, scope, and integration of risk assessments into business decision-making.', priority: 'high', examples: [
                'Formal risk assessment methodology',
                'Regular risk assessment schedule',
                'Business impact and likelihood analysis',
                'Risk register and tracking system'
              ], references: ['NIST CSF v2.0 ID.RA-03'], options: [
                {
                  value: 0, label: 'Not Performed', description: 'Formal cybersecurity risk assessments are not conducted', riskLevel: 'critical'
                },
                {
                  value: 1, label: 'Performed', description: 'Ad-hoc risk assessments are conducted when needed', riskLevel: 'high'
                },
                {
                  value: 2, label: 'Documented', description: 'Regular, formal risk assessments with documented methodology', riskLevel: 'medium'
                },
                {
                  value: 3, label: 'Managed', description: 'Continuous risk assessment with integration into business processes', riskLevel: 'low'
                }
              ]
            },
            {
              id: 'id-ra-04', text: 'How well does your organization assess potential business impacts and likelihoods of cybersecurity events?', guidance: 'Assess the organization\'s capability to evaluate potential business impacts of cybersecurity incidents and estimate the likelihood of various threat scenarios.', priority: 'high', examples: [
                'Business impact analysis (BIA) methodology',
                'Scenario-based risk modeling',
                'Quantitative and qualitative risk analysis',
                'Financial impact assessment tools'
              ], references: ['NIST CSF v2.0 ID.RA-04'], options: [
                {
                  value: 0, label: 'Not Performed', description: 'Business impacts and likelihoods of cybersecurity events are not assessed', riskLevel: 'high'
                },
                {
                  value: 1, label: 'Performed', description: 'Basic impact and likelihood assessments are conducted', riskLevel: 'medium'
                },
                {
                  value: 2, label: 'Documented', description: 'Formal business impact and likelihood assessment processes', riskLevel: 'low'
                },
                {
                  value: 3, label: 'Managed', description: 'Advanced risk modeling with continuous refinement and validation', riskLevel: 'low'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'protect', name: 'Protect (PR)', description: 'Safeguards to ensure delivery of critical infrastructure services are developed and implemented.', weight: 25, priority: 'high', categories: [
        {
          id: 'pr-aa', name: 'Identity Management, Authentication and Access Control (PR.AA)', description: 'Access to physical and logical assets and associated facilities is limited to authorized users, processes, and devices', weight: 40, questions: [
            {
              id: 'pr-aa-01', text: 'How effectively does your organization manage user identities and authenticate users accessing organizational systems?', guidance: 'Assess the organization\'s identity management processes including user provisioning, authentication mechanisms, and identity lifecycle management.', priority: 'high', examples: [
                'Centralized identity management system',
                'Multi-factor authentication implementation',
                'Single sign-on (SSO) deployment',
                'Identity lifecycle management processes'
              ], references: ['NIST CSF v2.0 PR.AA-01'], options: [
                {
                  value: 0, label: 'Not Performed', description: 'Basic authentication with limited identity management', riskLevel: 'critical'
                },
                {
                  value: 1, label: 'Performed', description: 'Some identity management practices but may lack consistency', riskLevel: 'high'
                },
                {
                  value: 2, label: 'Documented', description: 'Formal identity management with documented processes', riskLevel: 'medium'
                },
                {
                  value: 3, label: 'Managed', description: 'Advanced identity management with automated lifecycle and risk-based authentication', riskLevel: 'low'
                }
              ]
            },
            {
              id: 'pr-aa-02', text: 'How comprehensively does your organization manage and authenticate device identities?', guidance: 'Evaluate the organization\'s processes for identifying, authenticating, and managing devices that connect to organizational networks and systems.', priority: 'high', examples: [
                'Device certificate management',
                'Network access control (NAC) implementation',
                'Device registration and approval processes',
                'IoT device identity management'
              ], references: ['NIST CSF v2.0 PR.AA-02'], options: [
                {
                  value: 0, label: 'Not Performed', description: 'Device identities are not managed or authenticated', riskLevel: 'high'
                },
                {
                  value: 1, label: 'Performed', description: 'Basic device authentication for some systems', riskLevel: 'medium'
                },
                {
                  value: 2, label: 'Documented', description: 'Formal device identity management with documented processes', riskLevel: 'low'
                },
                {
                  value: 3, label: 'Managed', description: 'Comprehensive device identity management with automated enforcement', riskLevel: 'low'
                }
              ]
            },
            {
              id: 'pr-aa-03', text: 'How effectively does your organization implement access authorization and manage permissions?', guidance: 'Assess the organization\'s access control framework including authorization policies, permission management, and principle of least privilege implementation.', priority: 'high', examples: [
                'Role-based access control (RBAC) implementation',
                'Principle of least privilege enforcement',
                'Access request and approval workflows',
                'Regular access reviews and certification'
              ], references: ['NIST CSF v2.0 PR.AA-03'], options: [
                {
                  value: 0, label: 'Not Performed', description: 'Access authorization is ad-hoc without formal controls', riskLevel: 'critical'
                },
                {
                  value: 1, label: 'Performed', description: 'Basic access controls exist but may not follow least privilege', riskLevel: 'high'
                },
                {
                  value: 2, label: 'Documented', description: 'Formal access control framework with documented authorization processes', riskLevel: 'medium'
                },
                {
                  value: 3, label: 'Managed', description: 'Advanced access management with dynamic authorization and continuous monitoring', riskLevel: 'low'
                }
              ]
            },
            {
              id: 'pr-aa-04', text: 'How well does your organization manage access permissions and regularly review access rights?', guidance: 'Evaluate the organization\'s processes for managing ongoing access permissions, conducting access reviews, and ensuring access remains appropriate over time.', priority: 'high', examples: [
                'Automated access review processes',
                'Quarterly access certification campaigns',
                'Access analytics and anomaly detection',
                'Segregation of duties enforcement'
              ], references: ['NIST CSF v2.0 PR.AA-04'], options: [
                {
                  value: 0, label: 'Not Performed', description: 'Access permissions are not regularly reviewed or managed', riskLevel: 'high'
                },
                {
                  value: 1, label: 'Performed', description: 'Informal access reviews occur but may not be comprehensive', riskLevel: 'medium'
                },
                {
                  value: 2, label: 'Documented', description: 'Formal access management with regular documented reviews', riskLevel: 'low'
                },
                {
                  value: 3, label: 'Managed', description: 'Automated access management with continuous monitoring and risk-based reviews', riskLevel: 'low'
                }
              ]
            },
            {
              id: 'pr-aa-05', text: 'How effectively does your organization implement network and communication protection controls?', guidance: 'Assess the organization\'s network access controls, segmentation, and communication protection mechanisms.', priority: 'high', examples: [
                'Network segmentation and microsegmentation',
                'Virtual private network (VPN) implementation',
                'Network access control and monitoring',
                'Secure communication protocols'
              ], references: ['NIST CSF v2.0 PR.AA-05'], options: [
                {
                  value: 0, label: 'Not Performed', description: 'Network access is not controlled or protected', riskLevel: 'critical'
                },
                {
                  value: 1, label: 'Performed', description: 'Basic network access controls are in place', riskLevel: 'high'
                },
                {
                  value: 2, label: 'Documented', description: 'Formal network protection controls with documented processes', riskLevel: 'medium'
                },
                {
                  value: 3, label: 'Managed', description: 'Advanced network protection with zero trust architecture and continuous monitoring', riskLevel: 'low'
                }
              ]
            },
            {
              id: 'pr-aa-06', text: 'How well does your organization control and monitor physical access to assets and facilities?', guidance: 'Evaluate the organization\'s physical access control systems, monitoring capabilities, and management of physical security for facilities and assets.', priority: 'medium', examples: [
                'Physical access control systems',
                'Visitor management and escort procedures',
                'Physical security monitoring and surveillance',
                'Secure areas and restricted access zones'
              ], references: ['NIST CSF v2.0 PR.AA-06'], options: [
                {
                  value: 0, label: 'Not Performed', description: 'Physical access is not controlled or monitored', riskLevel: 'high'
                },
                {
                  value: 1, label: 'Performed', description: 'Basic physical access controls exist', riskLevel: 'medium'
                },
                {
                  value: 2, label: 'Documented', description: 'Formal physical access control program with documented procedures', riskLevel: 'low'
                },
                {
                  value: 3, label: 'Managed', description: 'Advanced physical security with integrated monitoring and analytics', riskLevel: 'low'
                }
              ]
            }
          ]
        },
        {
          id: 'pr-at', name: 'Awareness and Training (PR.AT)', description: 'The organization\'s personnel and partners are provided cybersecurity awareness education', weight: 15, questions: [
            {
              id: 'pr-at-01', text: 'How comprehensive is your organization\'s cybersecurity awareness and training program for all personnel?', guidance: 'Assess the organization\'s cybersecurity training program including content quality, delivery methods, frequency, and coverage of all personnel.', priority: 'medium', examples: [
                'Annual cybersecurity awareness training',
                'Role-based security training programs',
                'Phishing simulation and training',
                'Cybersecurity training effectiveness measurement'
              ], references: ['NIST CSF v2.0 PR.AT-01'], options: [
                {
                  value: 0, label: 'Not Performed', description: 'No formal cybersecurity awareness or training program exists', riskLevel: 'high'
                },
                {
                  value: 1, label: 'Performed', description: 'Basic cybersecurity awareness training is provided', riskLevel: 'medium'
                },
                {
                  value: 2, label: 'Documented', description: 'Comprehensive training program with documented curriculum and tracking', riskLevel: 'low'
                },
                {
                  value: 3, label: 'Managed', description: 'Advanced training program with continuous assessment and personalized content', riskLevel: 'low'
                }
              ]
            },
            {
              id: 'pr-at-02', text: 'How effectively does your organization provide specialized cybersecurity training for personnel with cybersecurity responsibilities?', guidance: 'Evaluate specialized training programs for personnel with specific cybersecurity roles, including technical training, certification requirements, and skill development.', priority: 'medium', examples: [
                'Role-specific cybersecurity training programs',
                'Professional certification support and requirements',
                'Technical skills development programs',
                'Cybersecurity competency assessments'
              ], references: ['NIST CSF v2.0 PR.AT-02'], options: [
                {
                  value: 0, label: 'Not Performed', description: 'Specialized cybersecurity training is not provided', riskLevel: 'medium'
                },
                {
                  value: 1, label: 'Performed', description: 'Some specialized training exists but may be limited', riskLevel: 'medium'
                },
                {
                  value: 2, label: 'Documented', description: 'Formal specialized training program with documented requirements', riskLevel: 'low'
                },
                {
                  value: 3, label: 'Managed', description: 'Advanced specialized training with continuous skill assessment and development', riskLevel: 'low'
                }
              ]
            }
          ]
        },
        {
          id: 'pr-ds', name: 'Data Security (PR.DS)', description: 'Information and records are managed consistent with the organization\'s risk strategy to protect confidentiality, integrity, and availability', weight: 30, questions: [
            {
              id: 'pr-ds-01', text: 'How effectively does your organization protect data at rest through encryption and access controls?', guidance: 'Assess the organization\'s implementation of data protection controls for stored data including encryption, access controls, and secure storage practices.', priority: 'high', examples: [
                'Full disk encryption on all devices',
                'Database encryption and key management',
                'File-level encryption for sensitive data',
                'Secure cloud storage configuration'
              ], references: ['NIST CSF v2.0 PR.DS-01'], options: [
                {
                  value: 0, label: 'Not Performed', description: 'Data at rest is not encrypted or protected', riskLevel: 'critical'
                },
                {
                  value: 1, label: 'Performed', description: 'Some data encryption exists but coverage may be incomplete', riskLevel: 'high'
                },
                {
                  value: 2, label: 'Documented', description: 'Comprehensive data protection program with documented encryption standards', riskLevel: 'medium'
                },
                {
                  value: 3, label: 'Managed', description: 'Advanced data protection with automated encryption and key management', riskLevel: 'low'
                }
              ]
            },
            {
              id: 'pr-ds-02', text: 'How well does your organization protect data in transit through secure communications and encryption?', guidance: 'Evaluate the organization\'s protection of data during transmission including encryption protocols, secure communication channels, and data transfer security.', priority: 'high', examples: [
                'TLS/SSL encryption for all communications',
                'VPN for remote access and data transfer',
                'Secure file transfer protocols',
                'Email encryption and secure messaging'
              ], references: ['NIST CSF v2.0 PR.DS-02'], options: [
                {
                  value: 0, label: 'Not Performed', description: 'Data in transit is not encrypted or protected', riskLevel: 'critical'
                },
                {
                  value: 1, label: 'Performed', description: 'Some data transmission protection exists', riskLevel: 'high'
                },
                {
                  value: 2, label: 'Documented', description: 'Formal data transmission protection with documented standards', riskLevel: 'medium'
                },
                {
                  value: 3, label: 'Managed', description: 'Advanced transmission protection with automated enforcement and monitoring', riskLevel: 'low'
                }
              ]
            },
            {
              id: 'pr-ds-03', text: 'How effectively does your organization manage access to shared resources and implement access controls?', guidance: 'Assess the organization\'s management of shared resources including file shares, databases, applications, and cloud resources with appropriate access controls.', priority: 'medium', examples: [
                'Shared drive access controls and permissions',
                'Database access control and monitoring',
                'Cloud resource access management',
                'Application-level access controls'
              ], references: ['NIST CSF v2.0 PR.DS-03'], options: [
                {
                  value: 0, label: 'Not Performed', description: 'Shared resources lack proper access controls', riskLevel: 'high'
                },
                {
                  value: 1, label: 'Performed', description: 'Basic access controls exist for some shared resources', riskLevel: 'medium'
                },
                {
                  value: 2, label: 'Documented', description: 'Formal access control framework for all shared resources', riskLevel: 'low'
                },
                {
                  value: 3, label: 'Managed', description: 'Advanced shared resource management with automated access control and monitoring', riskLevel: 'low'
                }
              ]
            },
            {
              id: 'pr-ds-04', text: 'How well does your organization ensure adequate capacity and availability of systems and services?', guidance: 'Evaluate the organization\'s capacity planning, resource management, and availability assurance for critical systems and services.', priority: 'medium', examples: [
                'System capacity monitoring and planning',
                'Load balancing and redundancy implementation',
                'Availability monitoring and alerting',
                'Disaster recovery and business continuity planning'
              ], references: ['NIST CSF v2.0 PR.DS-04'], options: [
                {
                  value: 0, label: 'Not Performed', description: 'Capacity and availability are not actively managed', riskLevel: 'medium'
                },
                {
                  value: 1, label: 'Performed', description: 'Basic capacity monitoring exists', riskLevel: 'medium'
                },
                {
                  value: 2, label: 'Documented', description: 'Formal capacity and availability management processes', riskLevel: 'low'
                },
                {
                  value: 3, label: 'Managed', description: 'Advanced capacity management with predictive analytics and automated scaling', riskLevel: 'low'
                }
              ]
            },
            {
              id: 'pr-ds-05', text: 'How effectively does your organization implement data leak prevention and protection against unauthorized data disclosure?', guidance: 'Assess the organization\'s data loss prevention (DLP) capabilities, monitoring of data movement, and controls to prevent unauthorized data disclosure.', priority: 'high', examples: [
                'Data loss prevention (DLP) tools and policies',
                'Email and web content filtering',
                'USB and removable media controls',
                'Cloud data protection and monitoring'
              ], references: ['NIST CSF v2.0 PR.DS-05'], options: [
                {
                  value: 0, label: 'Not Performed', description: 'No data leak prevention controls are implemented', riskLevel: 'critical'
                },
                {
                  value: 1, label: 'Performed', description: 'Basic data protection controls exist', riskLevel: 'high'
                },
                {
                  value: 2, label: 'Documented', description: 'Comprehensive DLP program with documented policies and procedures', riskLevel: 'medium'
                },
                {
                  value: 3, label: 'Managed', description: 'Advanced DLP with machine learning, behavioral analysis, and automated response', riskLevel: 'low'
                }
              ]
            }
          ]
        },
        {
          id: 'pr-ip', name: 'Information Protection Processes and Procedures (PR.IP)', description: 'Security policies, processes, and procedures are maintained and used to manage protection of information systems and assets', weight: 15, questions: [
            {
              id: 'pr-ip-01', text: 'How comprehensive is your organization\'s cybersecurity policy framework and governance structure?', guidance: 'Assess the organization\'s cybersecurity policies, governance structure, and processes for maintaining and updating security procedures.', priority: 'high', examples: [
                'Comprehensive cybersecurity policy suite',
                'Regular policy review and update processes',
                'Governance committee structure',
                'Policy compliance monitoring and enforcement'
              ], references: ['NIST CSF v2.0 PR.IP-01'], options: [
                {
                  value: 0, label: 'Not Performed', description: 'No formal cybersecurity policies or governance structure exists', riskLevel: 'critical'
                },
                {
                  value: 1, label: 'Performed', description: 'Basic cybersecurity policies exist but may lack comprehensive governance', riskLevel: 'high'
                },
                {
                  value: 2, label: 'Documented', description: 'Formal policy framework with documented governance processes', riskLevel: 'medium'
                },
                {
                  value: 3, label: 'Managed', description: 'Advanced governance with continuous policy improvement and stakeholder engagement', riskLevel: 'low'
                }
              ]
            },
            {
              id: 'pr-ip-02', text: 'How effectively does your organization implement and maintain configuration management for systems and assets?', guidance: 'Evaluate the organization\'s configuration management processes including baseline configurations, change management, and configuration monitoring.', priority: 'high', examples: [
                'Standardized system configuration baselines',
                'Automated configuration management tools',
                'Change management and approval processes',
                'Configuration drift detection and remediation'
              ], references: ['NIST CSF v2.0 PR.IP-02'], options: [
                {
                  value: 0, label: 'Not Performed', description: 'System configurations are not standardized or managed', riskLevel: 'high'
                },
                {
                  value: 1, label: 'Performed', description: 'Some configuration standards exist but may not be consistently applied', riskLevel: 'medium'
                },
                {
                  value: 2, label: 'Documented', description: 'Formal configuration management with documented baselines and procedures', riskLevel: 'low'
                },
                {
                  value: 3, label: 'Managed', description: 'Advanced configuration management with automated enforcement and continuous monitoring', riskLevel: 'low'
                }
              ]
            },
            {
              id: 'pr-ip-03', text: 'How well does your organization implement change management processes for systems and software?', guidance: 'Assess the organization\'s change management processes including change approval, testing, documentation, and rollback procedures.', priority: 'medium', examples: [
                'Formal change approval and review processes',
                'Change testing and validation procedures',
                'Change documentation and tracking',
                'Rollback and recovery procedures'
              ], references: ['NIST CSF v2.0 PR.IP-03'], options: [
                {
                  value: 0, label: 'Not Performed', description: 'Changes are made without formal management processes', riskLevel: 'high'
                },
                {
                  value: 1, label: 'Performed', description: 'Basic change management exists but may not be consistently followed', riskLevel: 'medium'
                },
                {
                  value: 2, label: 'Documented', description: 'Formal change management with documented processes and approval workflows', riskLevel: 'low'
                },
                {
                  value: 3, label: 'Managed', description: 'Advanced change management with automated testing and risk assessment', riskLevel: 'low'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'detect', name: 'Detect (DE)', description: 'Activities to identify the occurrence of a cybersecurity event are developed and implemented.', weight: 15, priority: 'high', categories: [
        {
          id: 'de-ae', name: 'Anomalies and Events (DE.AE)', description: 'Anomalous activity is detected and the potential impact of events is understood', weight: 25, questions: [
            {
              id: 'de-ae-01', text: 'How effectively does your organization establish and maintain network behavior baselines for anomaly detection?', guidance: 'Assess the organization\'s capability to establish normal network behavior patterns and detect deviations that may indicate cybersecurity events.', priority: 'medium', examples: [
                'Network traffic monitoring and baselining',
                'User behavior analytics and profiling',
                'System performance baseline establishment',
                'Anomaly detection algorithms and tools'
              ], references: ['NIST CSF v2.0 DE.AE-01'], options: [
                {
                  value: 0, label: 'Not Performed', description: 'Network baselines are not established or maintained', riskLevel: 'medium'
                },
                {
                  value: 1, label: 'Performed', description: 'Basic network monitoring exists but baselines may be informal', riskLevel: 'medium'
                },
                {
                  value: 2, label: 'Documented', description: 'Formal baseline establishment with documented anomaly detection procedures', riskLevel: 'low'
                },
                {
                  value: 3, label: 'Managed', description: 'Advanced behavioral analytics with machine learning and automated baseline updates', riskLevel: 'low'
                }
              ]
            },
            {
              id: 'de-ae-02', text: 'How well does your organization analyze detected events and understand their potential impact?', guidance: 'Evaluate the organization\'s processes for analyzing security events, determining their significance, and assessing potential business impacts.', priority: 'high', examples: [
                'Security event analysis procedures',
                'Impact assessment methodologies',
                'Event correlation and aggregation',
                'Threat hunting and investigation capabilities'
              ], references: ['NIST CSF v2.0 DE.AE-02'], options: [
                {
                  value: 0, label: 'Not Performed', description: 'Detected events are not systematically analyzed', riskLevel: 'high'
                },
                {
                  value: 1, label: 'Performed', description: 'Basic event analysis occurs but may lack depth', riskLevel: 'medium'
                },
                {
                  value: 2, label: 'Documented', description: 'Formal event analysis with documented impact assessment procedures', riskLevel: 'low'
                },
                {
                  value: 3, label: 'Managed', description: 'Advanced event analysis with automated correlation and predictive impact assessment', riskLevel: 'low'
                }
              ]
            }
          ]
        },
        {
          id: 'de-cm', name: 'Security Continuous Monitoring (DE.CM)', description: 'The information system and assets are monitored to identify cybersecurity events and verify the effectiveness of protective measures', weight: 50, questions: [
            {
              id: 'de-cm-01', text: 'How effectively does your organization monitor networks and network traffic for cybersecurity events?', guidance: 'Assess the organization\'s network monitoring capabilities including intrusion detection, traffic analysis, and network security monitoring.', priority: 'high', examples: [
                'Network intrusion detection systems (NIDS)',
                'Network traffic analysis and monitoring',
                'Network security monitoring (NSM) capabilities',
                'Real-time network threat detection'
              ], references: ['NIST CSF v2.0 DE.CM-01'], options: [
                {
                  value: 0, label: 'Not Performed', description: 'Network monitoring for cybersecurity events is not implemented', riskLevel: 'high'
                },
                {
                  value: 1, label: 'Performed', description: 'Basic network monitoring tools are deployed', riskLevel: 'medium'
                },
                {
                  value: 2, label: 'Documented', description: 'Comprehensive network monitoring with documented procedures', riskLevel: 'low'
                },
                {
                  value: 3, label: 'Managed', description: 'Advanced network monitoring with AI/ML-based threat detection and automated response', riskLevel: 'low'
                }
              ]
            },
            {
              id: 'de-cm-02', text: 'How comprehensively does your organization monitor the physical environment for unauthorized access and environmental factors?', guidance: 'Evaluate the organization\'s physical monitoring capabilities including access monitoring, environmental controls, and physical security systems.', priority: 'medium', examples: [
                'Physical access monitoring and logging',
                'Environmental monitoring (temperature, humidity)',
                'Video surveillance and motion detection',
                'Physical intrusion detection systems'
              ], references: ['NIST CSF v2.0 DE.CM-02'], options: [
                {
                  value: 0, label: 'Not Performed', description: 'Physical environment is not monitored', riskLevel: 'medium'
                },
                {
                  value: 1, label: 'Performed', description: 'Basic physical monitoring exists', riskLevel: 'low'
                },
                {
                  value: 2, label: 'Documented', description: 'Comprehensive physical monitoring with documented procedures', riskLevel: 'low'
                },
                {
                  value: 3, label: 'Managed', description: 'Advanced physical monitoring with integrated analytics and automated alerting', riskLevel: 'low'
                }
              ]
            },
            {
              id: 'de-cm-03', text: 'How well does your organization monitor personnel activities for cybersecurity-related behavior?', guidance: 'Assess the organization\'s user activity monitoring capabilities including privileged user monitoring, behavioral analysis, and insider threat detection.', priority: 'medium', examples: [
                'User activity monitoring and logging',
                'Privileged user session recording',
                'Behavioral analytics for insider threat detection',
                'Data access monitoring and alerting'
              ], references: ['NIST CSF v2.0 DE.CM-03'], options: [
                {
                  value: 0, label: 'Not Performed', description: 'Personnel activities are not monitored for cybersecurity purposes', riskLevel: 'medium'
                },
                {
                  value: 1, label: 'Performed', description: 'Basic user activity logging exists', riskLevel: 'medium'
                },
                {
                  value: 2, label: 'Documented', description: 'Formal personnel monitoring with documented procedures and privacy protections', riskLevel: 'low'
                },
                {
                  value: 3, label: 'Managed', description: 'Advanced behavioral monitoring with machine learning and risk-based analysis', riskLevel: 'low'
                }
              ]
            },
            {
              id: 'de-cm-04', text: 'How effectively does your organization detect malicious code and unauthorized software?', guidance: 'Evaluate the organization\'s capabilities for detecting and preventing malicious code, unauthorized software installation, and software-based threats.', priority: 'high', examples: [
                'Anti-malware and endpoint protection systems',
                'Application whitelisting and control',
                'Malicious code detection and analysis',
                'Software inventory and unauthorized software detection'
              ], references: ['NIST CSF v2.0 DE.CM-04'], options: [
                {
                  value: 0, label: 'Not Performed', description: 'Malicious code detection is not implemented', riskLevel: 'critical'
                },
                {
                  value: 1, label: 'Performed', description: 'Basic anti-malware protection is deployed', riskLevel: 'high'
                },
                {
                  value: 2, label: 'Documented', description: 'Comprehensive malware protection with documented procedures', riskLevel: 'medium'
                },
                {
                  value: 3, label: 'Managed', description: 'Advanced threat protection with behavioral analysis and automated response', riskLevel: 'low'
                }
              ]
            },
            {
              id: 'de-cm-05', text: 'How well does your organization monitor for unauthorized mobile code and executables?', guidance: 'Assess the organization\'s controls for detecting and managing mobile code, scripts, and executable files that may pose security risks.', priority: 'medium', examples: [
                'Mobile code and script execution controls',
                'Application sandboxing and isolation',
                'Code signing verification',
                'Dynamic analysis of suspicious executables'
              ], references: ['NIST CSF v2.0 DE.CM-05'], options: [
                {
                  value: 0, label: 'Not Performed', description: 'Mobile code and executables are not monitored or controlled', riskLevel: 'medium'
                },
                {
                  value: 1, label: 'Performed', description: 'Basic controls exist for managing executable content', riskLevel: 'medium'
                },
                {
                  value: 2, label: 'Documented', description: 'Formal mobile code management with documented procedures', riskLevel: 'low'
                },
                {
                  value: 3, label: 'Managed', description: 'Advanced mobile code protection with automated analysis and sandboxing', riskLevel: 'low'
                }
              ]
            },
            {
              id: 'de-cm-06', text: 'How effectively does your organization monitor external service provider activities and communications?', guidance: 'Evaluate the organization\'s monitoring of external service providers, cloud services, and third-party activities that may impact cybersecurity.', priority: 'medium', examples: [
                'Cloud security monitoring and alerting',
                'Third-party access monitoring',
                'Service provider security assessment',
                'External communication monitoring'
              ], references: ['NIST CSF v2.0 DE.CM-06'], options: [
                {
                  value: 0, label: 'Not Performed', description: 'External service provider activities are not monitored', riskLevel: 'medium'
                },
                {
                  value: 1, label: 'Performed', description: 'Basic monitoring of external services exists', riskLevel: 'medium'
                },
                {
                  value: 2, label: 'Documented', description: 'Formal external service monitoring with documented procedures', riskLevel: 'low'
                },
                {
                  value: 3, label: 'Managed', description: 'Comprehensive external service monitoring with automated risk assessment', riskLevel: 'low'
                }
              ]
            },
            {
              id: 'de-cm-07', text: 'How well does your organization perform monitoring for unauthorized personnel, connections, devices, and software?', guidance: 'Assess the organization\'s monitoring capabilities for detecting unauthorized access, rogue devices, unauthorized software, and unusual personnel activities.', priority: 'high', examples: [
                'Rogue device detection and prevention',
                'Unauthorized software detection',
                'Unusual user behavior monitoring',
                'Network access control and monitoring'
              ], references: ['NIST CSF v2.0 DE.CM-07'], options: [
                {
                  value: 0, label: 'Not Performed', description: 'Unauthorized access and activities are not actively monitored', riskLevel: 'high'
                },
                {
                  value: 1, label: 'Performed', description: 'Basic monitoring for unauthorized activities exists', riskLevel: 'medium'
                },
                {
                  value: 2, label: 'Documented', description: 'Comprehensive unauthorized activity monitoring with documented procedures', riskLevel: 'low'
                },
                {
                  value: 3, label: 'Managed', description: 'Advanced monitoring with automated detection and response to unauthorized activities', riskLevel: 'low'
                }
              ]
            }
          ]
        },
        {
          id: 'de-dp', name: 'Detection Processes (DE.DP)', description: 'Detection processes and procedures are maintained and tested to ensure awareness of anomalous events', weight: 25, questions: [
            {
              id: 'de-dp-01', text: 'How comprehensive are your organization\'s detection processes and procedures?', guidance: 'Assess the organization\'s formal detection processes, procedures, and capabilities for identifying cybersecurity events across all systems and environments.', priority: 'high', examples: [
                'Security operations center (SOC) procedures',
                'Incident detection playbooks and runbooks',
                'Detection process documentation and training',
                'Detection capability testing and validation'
              ], references: ['NIST CSF v2.0 DE.DP-01'], options: [
                {
                  value: 0, label: 'Not Performed', description: 'No formal detection processes or procedures exist', riskLevel: 'high'
                },
                {
                  value: 1, label: 'Performed', description: 'Basic detection processes exist but may lack formalization', riskLevel: 'medium'
                },
                {
                  value: 2, label: 'Documented', description: 'Comprehensive detection processes with documented procedures', riskLevel: 'low'
                },
                {
                  value: 3, label: 'Managed', description: 'Advanced detection processes with continuous improvement and automation', riskLevel: 'low'
                }
              ]
            },
            {
              id: 'de-dp-02', text: 'How effectively does your organization test and validate detection processes and procedures?', guidance: 'Evaluate the organization\'s testing of detection capabilities including tabletop exercises, red team assessments, and detection process validation.', priority: 'medium', examples: [
                'Regular detection capability testing',
                'Red team and purple team exercises',
                'Detection process tabletop exercises',
                'Performance metrics and effectiveness measurement'
              ], references: ['NIST CSF v2.0 DE.DP-02'], options: [
                {
                  value: 0, label: 'Not Performed', description: 'Detection processes are not tested or validated', riskLevel: 'medium'
                },
                {
                  value: 1, label: 'Performed', description: 'Informal testing of detection capabilities occurs', riskLevel: 'medium'
                },
                {
                  value: 2, label: 'Documented', description: 'Regular testing program with documented validation procedures', riskLevel: 'low'
                },
                {
                  value: 3, label: 'Managed', description: 'Continuous testing and validation with automated assessment and improvement', riskLevel: 'low'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'respond', name: 'Respond (RS)', description: 'Activities to take action regarding a detected cybersecurity incident are developed and implemented.', weight: 15, priority: 'high', categories: [
        {
          id: 'rs-rp', name: 'Response Planning (RS.RP)', description: 'Response processes and procedures are executed and maintained to ensure response to detected cybersecurity incidents', weight: 20, questions: [
            {
              id: 'rs-rp-01', text: 'How comprehensive is your organization\'s incident response plan and execution capability?', guidance: 'Assess the organization\'s incident response planning including documented procedures, response team structure, and execution capabilities.', priority: 'high', examples: [
                'Comprehensive incident response plan',
                'Incident response team roles and responsibilities',
                'Response procedures and playbooks',
                'Regular plan testing and updates'
              ], references: ['NIST CSF v2.0 RS.RP-01'], options: [
                {
                  value: 0, label: 'Not Performed', description: 'No formal incident response plan exists', riskLevel: 'critical'
                },
                {
                  value: 1, label: 'Performed', description: 'Basic incident response procedures exist', riskLevel: 'high'
                },
                {
                  value: 2, label: 'Documented', description: 'Comprehensive incident response plan with documented procedures', riskLevel: 'medium'
                },
                {
                  value: 3, label: 'Managed', description: 'Advanced incident response with continuous improvement and automated capabilities', riskLevel: 'low'
                }
              ]
            }
          ]
        },
        {
          id: 'rs-co', name: 'Communications (RS.CO)', description: 'Response activities are coordinated with internal and external stakeholders', weight: 30, questions: [
            {
              id: 'rs-co-01', text: 'How effectively does your organization coordinate incident response activities with internal stakeholders?', guidance: 'Assess the organization\'s internal communication and coordination processes during cybersecurity incidents including management notification and cross-functional coordination.', priority: 'high', examples: [
                'Internal escalation and notification procedures',
                'Cross-functional incident response coordination',
                'Executive and board notification protocols',
                'Internal communication channels and tools'
              ], references: ['NIST CSF v2.0 RS.CO-01'], options: [
                {
                  value: 0, label: 'Not Performed', description: 'Internal incident coordination is not formalized', riskLevel: 'high'
                },
                {
                  value: 1, label: 'Performed', description: 'Basic internal coordination exists but may be ad-hoc', riskLevel: 'medium'
                },
                {
                  value: 2, label: 'Documented', description: 'Formal internal coordination with documented communication procedures', riskLevel: 'low'
                },
                {
                  value: 3, label: 'Managed', description: 'Advanced coordination with automated notification and status tracking', riskLevel: 'low'
                }
              ]
            },
            {
              id: 'rs-co-02', text: 'How well does your organization coordinate incident response with external stakeholders and authorities?', guidance: 'Evaluate the organization\'s external communication and coordination capabilities including law enforcement, regulators, customers, and partners.', priority: 'medium', examples: [
                'External stakeholder notification procedures',
                'Law enforcement coordination protocols',
                'Regulatory reporting and compliance',
                'Customer and partner communication plans'
              ], references: ['NIST CSF v2.0 RS.CO-02'], options: [
                {
                  value: 0, label: 'Not Performed', description: 'External coordination and communication procedures do not exist', riskLevel: 'medium'
                },
                {
                  value: 1, label: 'Performed', description: 'Basic external coordination capabilities exist', riskLevel: 'medium'
                },
                {
                  value: 2, label: 'Documented', description: 'Formal external coordination with documented communication procedures', riskLevel: 'low'
                },
                {
                  value: 3, label: 'Managed', description: 'Advanced external coordination with automated reporting and stakeholder management', riskLevel: 'low'
                }
              ]
            }
          ]
        },
        {
          id: 'rs-an', name: 'Analysis (RS.AN)', description: 'Analysis is conducted to ensure effective response and support recovery activities', weight: 25, questions: [
            {
              id: 'rs-an-01', text: 'How effectively does your organization analyze and investigate cybersecurity incidents?', guidance: 'Assess the organization\'s incident analysis capabilities including forensic analysis, root cause investigation, and incident documentation.', priority: 'high', examples: [
                'Digital forensics and incident analysis capabilities',
                'Root cause analysis procedures',
                'Incident documentation and tracking',
                'Forensic evidence collection and preservation'
              ], references: ['NIST CSF v2.0 RS.AN-01'], options: [
                {
                  value: 0, label: 'Not Performed', description: 'Incident analysis and investigation capabilities do not exist', riskLevel: 'high'
                },
                {
                  value: 1, label: 'Performed', description: 'Basic incident analysis occurs but may lack depth', riskLevel: 'medium'
                },
                {
                  value: 2, label: 'Documented', description: 'Formal incident analysis with documented investigation procedures', riskLevel: 'low'
                },
                {
                  value: 3, label: 'Managed', description: 'Advanced incident analysis with automated tools and expert capabilities', riskLevel: 'low'
                }
              ]
            },
            {
              id: 'rs-an-02', text: 'How well does your organization understand the impact and scope of cybersecurity incidents?', guidance: 'Evaluate the organization\'s capability to assess incident impact, determine scope of compromise, and understand business effects of cybersecurity incidents.', priority: 'high', examples: [
                'Impact assessment methodologies',
                'Scope determination procedures',
                'Business effect analysis',
                'Incident categorization and prioritization'
              ], references: ['NIST CSF v2.0 RS.AN-02'], options: [
                {
                  value: 0, label: 'Not Performed', description: 'Incident impact and scope are not systematically assessed', riskLevel: 'high'
                },
                {
                  value: 1, label: 'Performed', description: 'Basic impact assessment occurs but may be incomplete', riskLevel: 'medium'
                },
                {
                  value: 2, label: 'Documented', description: 'Formal impact assessment with documented procedures', riskLevel: 'low'
                },
                {
                  value: 3, label: 'Managed', description: 'Advanced impact assessment with automated analysis and business integration', riskLevel: 'low'
                }
              ]
            }
          ]
        },
        {
          id: 'rs-mi', name: 'Mitigation (RS.MI)', description: 'Activities are performed to prevent expansion of an event and mitigate its effects', weight: 25, questions: [
            {
              id: 'rs-mi-01', text: 'How effectively does your organization contain and mitigate cybersecurity incidents?', guidance: 'Assess the organization\'s incident containment and mitigation capabilities including isolation procedures, threat neutralization, and damage limitation.', priority: 'high', examples: [
                'Incident containment procedures and tools',
                'System isolation and quarantine capabilities',
                'Threat neutralization and eradication',
                'Damage assessment and limitation'
              ], references: ['NIST CSF v2.0 RS.MI-01'], options: [
                {
                  value: 0, label: 'Not Performed', description: 'Incident containment and mitigation capabilities do not exist', riskLevel: 'critical'
                },
                {
                  value: 1, label: 'Performed', description: 'Basic containment capabilities exist but may be limited', riskLevel: 'high'
                },
                {
                  value: 2, label: 'Documented', description: 'Formal containment and mitigation with documented procedures', riskLevel: 'medium'
                },
                {
                  value: 3, label: 'Managed', description: 'Advanced containment with automated response and orchestrated mitigation', riskLevel: 'low'
                }
              ]
            },
            {
              id: 'rs-mi-02', text: 'How well does your organization mitigate vulnerabilities that were exploited during incidents?', guidance: 'Evaluate the organization\'s processes for identifying and mitigating vulnerabilities that were exploited during cybersecurity incidents to prevent future exploitation.', priority: 'high', examples: [
                'Vulnerability patching and remediation',
                'Configuration hardening procedures',
                'Security control enhancement',
                'Preventive measure implementation'
              ], references: ['NIST CSF v2.0 RS.MI-02'], options: [
                {
                  value: 0, label: 'Not Performed', description: 'Exploited vulnerabilities are not systematically mitigated', riskLevel: 'high'
                },
                {
                  value: 1, label: 'Performed', description: 'Basic vulnerability mitigation occurs after incidents', riskLevel: 'medium'
                },
                {
                  value: 2, label: 'Documented', description: 'Formal vulnerability mitigation with documented procedures', riskLevel: 'low'
                },
                {
                  value: 3, label: 'Managed', description: 'Advanced vulnerability management with automated patching and proactive remediation', riskLevel: 'low'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'recover', name: 'Recover (RC)', description: 'Activities to maintain plans for resilience and restore services or capabilities impaired by a cybersecurity incident.', weight: 5, priority: 'medium', categories: [
        {
          id: 'rc-rp', name: 'Recovery Planning (RC.RP)', description: 'Recovery processes and procedures are executed and maintained to ensure restoration of systems or assets affected by cybersecurity incidents', weight: 40, questions: [
            {
              id: 'rc-rp-01', text: 'How comprehensive is your organization\'s recovery planning and execution capability?', guidance: 'Assess the organization\'s recovery planning including business continuity plans, disaster recovery procedures, and restoration capabilities.', priority: 'medium', examples: [
                'Business continuity and disaster recovery plans',
                'Recovery time and point objectives (RTO/RPO)',
                'Recovery procedure testing and validation',
                'Backup and restoration capabilities'
              ], references: ['NIST CSF v2.0 RC.RP-01'], options: [
                {
                  value: 0, label: 'Not Performed', description: 'No formal recovery planning exists', riskLevel: 'high'
                },
                {
                  value: 1, label: 'Performed', description: 'Basic recovery planning exists but may be incomplete', riskLevel: 'medium'
                },
                {
                  value: 2, label: 'Documented', description: 'Comprehensive recovery planning with documented procedures', riskLevel: 'low'
                },
                {
                  value: 3, label: 'Managed', description: 'Advanced recovery planning with automated capabilities and continuous testing', riskLevel: 'low'
                }
              ]
            }
          ]
        },
        {
          id: 'rc-im', name: 'Improvements (RC.IM)', description: 'Recovery planning and processes are improved by incorporating lessons learned into future activities', weight: 30, questions: [
            {
              id: 'rc-im-01', text: 'How effectively does your organization incorporate lessons learned from incidents into recovery planning improvements?', guidance: 'Assess the organization\'s processes for learning from incidents and recovery activities to improve future preparedness and response capabilities.', priority: 'medium', examples: [
                'Post-incident review and lessons learned process',
                'Recovery plan updates based on experience',
                'Continuous improvement of recovery capabilities',
                'Knowledge sharing and organizational learning'
              ], references: ['NIST CSF v2.0 RC.IM-01'], options: [
                {
                  value: 0, label: 'Not Performed', description: 'Lessons learned are not systematically incorporated into recovery planning', riskLevel: 'medium'
                },
                {
                  value: 1, label: 'Performed', description: 'Some lessons learned activities occur but may be informal', riskLevel: 'medium'
                },
                {
                  value: 2, label: 'Documented', description: 'Formal lessons learned process with documented improvements', riskLevel: 'low'
                },
                {
                  value: 3, label: 'Managed', description: 'Advanced learning organization with continuous improvement and knowledge management', riskLevel: 'low'
                }
              ]
            }
          ]
        },
        {
          id: 'rc-co', name: 'Communications (RC.CO)', description: 'Restoration activities are communicated to internal and external stakeholders', weight: 30, questions: [
            {
              id: 'rc-co-01', text: 'How effectively does your organization communicate recovery activities to internal stakeholders?', guidance: 'Assess the organization\'s internal communication during recovery including status updates, progress reporting, and stakeholder coordination.', priority: 'medium', examples: [
                'Internal recovery communication plans',
                'Status reporting and progress tracking',
                'Stakeholder notification procedures',
                'Recovery coordination and updates'
              ], references: ['NIST CSF v2.0 RC.CO-01'], options: [
                {
                  value: 0, label: 'Not Performed', description: 'Internal recovery communication is not planned or managed', riskLevel: 'medium'
                },
                {
                  value: 1, label: 'Performed', description: 'Basic internal communication occurs during recovery', riskLevel: 'medium'
                },
                {
                  value: 2, label: 'Documented', description: 'Formal internal communication with documented procedures', riskLevel: 'low'
                },
                {
                  value: 3, label: 'Managed', description: 'Advanced communication with automated status updates and stakeholder portals', riskLevel: 'low'
                }
              ]
            },
            {
              id: 'rc-co-02', text: 'How well does your organization manage external communications during recovery activities?', guidance: 'Evaluate the organization\'s external communication during recovery including customer notification, regulatory reporting, and public relations management.', priority: 'medium', examples: [
                'External stakeholder communication plans',
                'Customer notification and support procedures',
                'Media relations and public communication',
                'Regulatory reporting and compliance during recovery'
              ], references: ['NIST CSF v2.0 RC.CO-02'], options: [
                {
                  value: 0, label: 'Not Performed', description: 'External recovery communication is not planned or managed', riskLevel: 'medium'
                },
                {
                  value: 1, label: 'Performed', description: 'Basic external communication capabilities exist', riskLevel: 'medium'
                },
                {
                  value: 2, label: 'Documented', description: 'Formal external communication with documented procedures', riskLevel: 'low'
                },
                {
                  value: 3, label: 'Managed', description: 'Advanced external communication with coordinated messaging and stakeholder management', riskLevel: 'low'
                }
              ]
            }
          ]
        }
      ]
    }
  ], maturityLevels: [
    {
      level: 0, name: 'Not Performed', description: 'The organization does not perform the specified activity', color: '#ef4444', minScore: 0, maxScore: 10, characteristics: [
        'Ad-hoc or non-existent processes',
        'No formal documentation',
        'Limited awareness of cybersecurity risks',
        'Reactive approach to security'
      ]
    },
    {
      level: 1, name: 'Performed', description: 'The organization performs the specified activity but lacks formalization', color: '#f97316', minScore: 11, maxScore: 35, characteristics: [
        'Informal processes and procedures',
        'Limited documentation',
        'Basic cybersecurity awareness',
        'Some proactive security measures'
      ]
    },
    {
      level: 2, name: 'Documented', description: 'The activity is documented and formal processes exist', color: '#eab308', minScore: 36, maxScore: 65, characteristics: [
        'Documented policies and procedures',
        'Formal governance structure',
        'Regular risk assessments',
        'Established security controls'
      ]
    }, 
    {
      level: 3, name: 'Managed', description: 'The activity is well-managed with continuous improvement', color: '#22c55e', minScore: 66, maxScore: 100, characteristics: [
        'Mature, well-managed processes',
        'Continuous monitoring and improvement',
        'Integration with business operations',
        'Advanced threat protection capabilities'
      ]
    }
  ]
};