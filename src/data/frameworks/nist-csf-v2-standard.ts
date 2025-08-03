export const nistCSFv2StandardFramework = {
  id: 'nist-csf-v2',
  name: 'NIST Cybersecurity Framework (CSF) v2.0',
  description: 'The NIST Cybersecurity Framework v2.0 provides a policy framework of computer security guidance for how private sector organizations in the United States can assess and improve their ability to prevent, detect, and respond to cyber attacks.',
  version: '2.0',
  complexity: 'intermediate',
  estimatedTime: 159,
  industry: ['All Industries', 'Critical Infrastructure', 'Manufacturing', 'Financial Services', 'Healthcare', 'Government'],
  sections: [
    {
      id: 'govern',
      name: 'Govern (GV)',
      description: 'The organization\'s cybersecurity risk management strategy, expectations, and policy are established, communicated, and monitored.',
      weight: 20,
      priority: 'high',
      categories: [
        {
          id: 'gv-oc',
          name: 'Organizational Context (GV.OC)',
          description: 'The circumstances - mission, stakeholder expectations, dependencies, and legal/regulatory requirements - surrounding the organization\'s cybersecurity risk management decisions are understood.',
          weight: 30,
          questions: [
            {
              id: 'gv-oc-01',
              text: 'How effectively does your organization understand its mission, stakeholders, and place in critical infrastructure sectors for cybersecurity risk management?',
              guidance: 'Organizations should clearly understand their mission, identify key stakeholders including customers, suppliers, and regulators, and recognize their role in critical infrastructure. This understanding forms the foundation for all cybersecurity risk management decisions.',
              priority: 'high',
              examples: [
                'Documented organizational mission statement with cybersecurity considerations',
                'Stakeholder mapping including cybersecurity dependencies',
                'Critical infrastructure sector designation and requirements',
                'Regular stakeholder cybersecurity communication and feedback'
              ],
              options: [
                {
                  value: 0,
                  label: 'Not Performed',
                  description: 'The organization has not established understanding of its mission, stakeholders, or critical infrastructure role for cybersecurity purposes.',
                  riskLevel: 'critical'
                },
                {
                  value: 1,
                  label: 'Performed',
                  description: 'The organization has basic understanding of mission and stakeholders but cybersecurity considerations are informal.',
                  riskLevel: 'high'
                },
                {
                  value: 2,
                  label: 'Documented',
                  description: 'Mission, stakeholders, and critical infrastructure role are documented with cybersecurity considerations included.',
                  riskLevel: 'medium'
                },
                {
                  value: 3,
                  label: 'Managed',
                  description: 'Organizational context is regularly reviewed and updated with stakeholder input, fully integrated into cybersecurity strategy.',
                  riskLevel: 'low'
                }
              ]
            },
            {
              id: 'gv-oc-02',
              text: 'How well are legal, regulatory, and contractual requirements regarding cybersecurity identified, understood, and managed?',
              guidance: 'Organizations must identify all applicable cybersecurity laws, regulations, and contractual obligations. This includes sector-specific requirements, data protection laws, and customer contractual obligations.',
              priority: 'high',
              examples: [
                'Legal requirements register including GDPR, CCPA, HIPAA, SOX',
                'Regulatory compliance mapping (SEC, FDA, NIST, FTC)',
                'Contractual cybersecurity obligations tracking',
                'Regular legal and regulatory updates monitoring'
              ],
              options: [
                {
                  value: 0,
                  label: 'Not Performed',
                  description: 'Legal, regulatory, and contractual cybersecurity requirements are not systematically identified or managed.',
                  riskLevel: 'critical'
                },
                {
                  value: 1,
                  label: 'Performed',
                  description: 'Some cybersecurity requirements are known but not comprehensively documented or managed.',
                  riskLevel: 'high'
                },
                {
                  value: 2,
                  label: 'Documented',
                  description: 'Legal, regulatory, and contractual cybersecurity requirements are identified and documented.',
                  riskLevel: 'medium'
                },
                {
                  value: 3,
                  label: 'Managed',
                  description: 'Requirements are continuously monitored, updated, and compliance is actively managed with regular reviews.',
                  riskLevel: 'low'
                }
              ]
            },
            {
              id: 'gv-oc-03',
              text: 'How effectively does your organization understand and document its critical infrastructure dependencies and supply chain relationships?',
              guidance: 'Organizations should map their critical dependencies including technology suppliers, service providers, and infrastructure partners that could impact cybersecurity posture.',
              priority: 'medium',
              examples: [
                'Critical supplier and vendor dependency mapping',
                'Infrastructure interdependency analysis',
                'Supply chain cybersecurity risk assessment',
                'Third-party service provider security requirements'
              ],
              options: [
                {
                  value: 0,
                  label: 'Not Performed',
                  description: 'Critical dependencies and supply chain relationships are not mapped or understood from a cybersecurity perspective.',
                  riskLevel: 'high'
                },
                {
                  value: 1,
                  label: 'Performed',
                  description: 'Some critical dependencies are known but documentation is incomplete.',
                  riskLevel: 'medium'
                },
                {
                  value: 2,
                  label: 'Documented',
                  description: 'Critical dependencies and supply chain relationships are documented with cybersecurity considerations.',
                  riskLevel: 'medium'
                },
                {
                  value: 3,
                  label: 'Managed',
                  description: 'Dependencies are continuously monitored, assessed, and managed with formal supplier cybersecurity programs.',
                  riskLevel: 'low'
                }
              ]
            }
          ]
        },
        {
          id: 'gv-rm',
          name: 'Risk Management Strategy (GV.RM)',
          description: 'The organization\'s priorities, constraints, risk tolerance and assumptions are established and used to support risk decisions.',
          weight: 25,
          questions: [
            {
              id: 'gv-rm-01',
              text: 'How well has your organization established and communicated its cybersecurity risk management strategy including risk appetite and tolerance levels?',
              guidance: 'A clear cybersecurity risk management strategy should define the organization\'s approach to identifying, assessing, and managing cybersecurity risks, including specific risk tolerance levels.',
              priority: 'high',
              examples: [
                'Board-approved cybersecurity risk management strategy',
                'Defined risk appetite statements for different risk categories',
                'Risk tolerance thresholds and escalation procedures',
                'Integration with enterprise risk management program'
              ],
              options: [
                {
                  value: 0,
                  label: 'Not Performed',
                  description: 'No formal cybersecurity risk management strategy exists.',
                  riskLevel: 'critical'
                },
                {
                  value: 1,
                  label: 'Performed',
                  description: 'Basic risk management approach exists but is not formally documented or communicated.',
                  riskLevel: 'high'
                },
                {
                  value: 2,
                  label: 'Documented',
                  description: 'Cybersecurity risk management strategy is documented and communicated with defined risk tolerance.',
                  riskLevel: 'medium'
                },
                {
                  value: 3,
                  label: 'Managed',
                  description: 'Strategy is regularly reviewed, updated, and integrated into all business decisions with board oversight.',
                  riskLevel: 'low'
                }
              ]
            },
            {
              id: 'gv-rm-02',
              text: 'How effectively are organizational cybersecurity risk tolerance and risk criteria defined, documented, and applied consistently?',
              guidance: 'Risk tolerance defines the level of risk the organization is willing to accept. Risk criteria provide the framework for evaluating the significance of cybersecurity risks.',
              priority: 'high',
              examples: [
                'Quantitative and qualitative risk tolerance statements',
                'Risk criteria including impact and likelihood scales',
                'Risk acceptance authorities and escalation procedures',
                'Regular risk tolerance review and adjustment processes'
              ],
              options: [
                {
                  value: 0,
                  label: 'Not Performed',
                  description: 'Risk tolerance and criteria are not defined for cybersecurity risks.',
                  riskLevel: 'critical'
                },
                {
                  value: 1,
                  label: 'Performed',
                  description: 'Basic risk tolerance concepts exist but are not formally defined or consistently applied.',
                  riskLevel: 'high'
                },
                {
                  value: 2,
                  label: 'Documented',
                  description: 'Risk tolerance and criteria are documented and communicated across the organization.',
                  riskLevel: 'medium'
                },
                {
                  value: 3,
                  label: 'Managed',
                  description: 'Risk tolerance is regularly reviewed, consistently applied, and integrated into all cybersecurity decisions.',
                  riskLevel: 'low'
                }
              ]
            }
          ]
        },
        {
          id: 'gv-rr',
          name: 'Roles, Responsibilities & Authorities (GV.RR)',
          description: 'Cybersecurity roles, responsibilities, and authorities to foster accountability, performance assessment, and continuous improvement are established and communicated.',
          weight: 20,
          questions: [
            {
              id: 'gv-rr-01',
              text: 'How clearly are cybersecurity roles, responsibilities, and authorities defined and communicated throughout the organization?',
              guidance: 'All personnel should understand their cybersecurity responsibilities. Clear role definitions prevent gaps in coverage and ensure accountability.',
              priority: 'high',
              examples: [
                'RACI matrix for cybersecurity functions',
                'Job descriptions with cybersecurity responsibilities',
                'Cybersecurity organizational chart with reporting relationships',
                'Regular communication of roles and expectations'
              ],
              options: [
                {
                  value: 0,
                  label: 'Not Performed',
                  description: 'Cybersecurity roles and responsibilities are not defined or communicated.',
                  riskLevel: 'critical'
                },
                {
                  value: 1,
                  label: 'Performed',
                  description: 'Some cybersecurity roles exist but are not clearly defined or consistently understood.',
                  riskLevel: 'high'
                },
                {
                  value: 2,
                  label: 'Documented',
                  description: 'Cybersecurity roles, responsibilities, and authorities are documented and communicated.',
                  riskLevel: 'medium'
                },
                {
                  value: 3,
                  label: 'Managed',
                  description: 'Roles are regularly reviewed, updated, and performance is measured against defined responsibilities.',
                  riskLevel: 'low'
                }
              ]
            },
            {
              id: 'gv-rr-02',
              text: 'How effectively are cybersecurity responsibilities integrated into workforce job functions and performance management?',
              guidance: 'Cybersecurity should be integrated into job descriptions, performance reviews, and career development to ensure sustained accountability.',
              priority: 'medium',
              examples: [
                'Cybersecurity objectives in job descriptions',
                'Security performance metrics in reviews',
                'Cybersecurity training requirements by role',
                'Incentives and consequences for cybersecurity performance'
              ],
              options: [
                {
                  value: 0,
                  label: 'Not Performed',
                  description: 'Cybersecurity responsibilities are not integrated into workforce management.',
                  riskLevel: 'high'
                },
                {
                  value: 1,
                  label: 'Performed',
                  description: 'Some integration exists but is not systematic or consistently applied.',
                  riskLevel: 'medium'
                },
                {
                  value: 2,
                  label: 'Documented',
                  description: 'Cybersecurity responsibilities are formally integrated into job functions and performance management.',
                  riskLevel: 'medium'
                },
                {
                  value: 3,
                  label: 'Managed',
                  description: 'Integration is comprehensive, regularly reviewed, and includes career development and succession planning.',
                  riskLevel: 'low'
                }
              ]
            }
          ]
        },
        {
          id: 'gv-po',
          name: 'Policy (GV.PO)',
          description: 'Organizational cybersecurity policy is established, communicated, and enforced.',
          weight: 15,
          questions: [
            {
              id: 'gv-po-01',
              text: 'How comprehensive and current is your organization\'s cybersecurity policy framework?',
              guidance: 'A comprehensive cybersecurity policy framework should cover all aspects of cybersecurity including governance, risk management, and operational procedures.',
              priority: 'high',
              examples: [
                'Board-approved cybersecurity policy',
                'Comprehensive policy covering all NIST CSF functions',
                'Regular policy review and update procedures',
                'Policy enforcement and compliance monitoring'
              ],
              options: [
                {
                  value: 0,
                  label: 'Not Performed',
                  description: 'No formal cybersecurity policy framework exists.',
                  riskLevel: 'critical'
                },
                {
                  value: 1,
                  label: 'Performed',
                  description: 'Basic cybersecurity policies exist but are incomplete or outdated.',
                  riskLevel: 'high'
                },
                {
                  value: 2,
                  label: 'Documented',
                  description: 'Comprehensive cybersecurity policy framework is documented and current.',
                  riskLevel: 'medium'
                },
                {
                  value: 3,
                  label: 'Managed',
                  description: 'Policy framework is regularly reviewed, updated, and compliance is actively monitored and enforced.',
                  riskLevel: 'low'
                }
              ]
            },
            {
              id: 'gv-po-02',
              text: 'How effectively are cybersecurity policies communicated, understood, and enforced across the organization?',
              guidance: 'Policies must be effectively communicated to all relevant personnel, with mechanisms to ensure understanding and compliance.',
              priority: 'medium',
              examples: [
                'Regular policy training and awareness programs',
                'Policy acknowledgment and compliance tracking',
                'Clear policy violation consequences and enforcement',
                'Regular policy effectiveness assessments'
              ],
              options: [
                {
                  value: 0,
                  label: 'Not Performed',
                  description: 'Policies are not effectively communicated or enforced.',
                  riskLevel: 'high'
                },
                {
                  value: 1,
                  label: 'Performed',
                  description: 'Some policy communication exists but enforcement is inconsistent.',
                  riskLevel: 'medium'
                },
                {
                  value: 2,
                  label: 'Documented',
                  description: 'Systematic policy communication and enforcement procedures are in place.',
                  riskLevel: 'medium'
                },
                {
                  value: 3,
                  label: 'Managed',
                  description: 'Policy effectiveness is regularly measured, and communication/enforcement is continuously improved.',
                  riskLevel: 'low'
                }
              ]
            }
          ]
        },
        {
          id: 'gv-ov',
          name: 'Oversight (GV.OV)',
          description: 'Results of organizational cybersecurity risk management activities are used to inform, improve, and adjust the risk management strategy.',
          weight: 10,
          questions: [
            {
              id: 'gv-ov-01',
              text: 'How effectively does senior leadership and the board provide oversight of cybersecurity risk management activities?',
              guidance: 'Senior leadership and board oversight ensures cybersecurity receives appropriate attention and resources. This includes regular reporting and strategic decision-making.',
              priority: 'high',
              examples: [
                'Regular board cybersecurity risk reporting',
                'Senior leadership cybersecurity committee',
                'Cybersecurity budget approval and resource allocation',
                'Strategic cybersecurity decision-making processes'
              ],
              options: [
                {
                  value: 0,
                  label: 'Not Performed',
                  description: 'No formal senior leadership or board oversight of cybersecurity exists.',
                  riskLevel: 'critical'
                },
                {
                  value: 1,
                  label: 'Performed',
                  description: 'Some senior leadership involvement exists but is ad-hoc and not systematic.',
                  riskLevel: 'high'
                },
                {
                  value: 2,
                  label: 'Documented',
                  description: 'Formal oversight processes are documented with regular reporting to senior leadership and board.',
                  riskLevel: 'medium'
                },
                {
                  value: 3,
                  label: 'Managed',
                  description: 'Oversight is comprehensive, strategic, and drives continuous improvement in cybersecurity risk management.',
                  riskLevel: 'low'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'identify',
      name: 'Identify (ID)',
      description: 'The organization\'s current cybersecurity posture is understood by identifying and prioritizing assets, business environment, governance, risk, and gaps.',
      weight: 18,
      priority: 'high',
      categories: [
        {
          id: 'id-am',
          name: 'Asset Management (ID.AM)',
          description: 'Assets (devices, systems, platforms, data, applications, personnel, facilities) are identified and managed consistent with their relative importance.',
          weight: 40,
          questions: [
            {
              id: 'id-am-01',
              text: 'How comprehensive and current is your organization\'s inventory of all technology assets including hardware, software, and systems?',
              guidance: 'A complete and current asset inventory is fundamental to cybersecurity. This includes all devices, systems, software, and technology components.',
              priority: 'high',
              examples: [
                'Automated network discovery and asset tracking',
                'Hardware inventory including servers, workstations, network devices',
                'Software inventory including applications, operating systems, and licenses',
                'Cloud services and SaaS application inventory'
              ],
              options: [
                {
                  value: 0,
                  label: 'Not Performed',
                  description: 'No systematic technology asset inventory exists.',
                  riskLevel: 'critical'
                },
                {
                  value: 1,
                  label: 'Performed',
                  description: 'Basic asset inventory exists but is incomplete or outdated.',
                  riskLevel: 'high'
                },
                {
                  value: 2,
                  label: 'Documented',
                  description: 'Comprehensive asset inventory is maintained and regularly updated.',
                  riskLevel: 'medium'
                },
                {
                  value: 3,
                  label: 'Managed',
                  description: 'Asset inventory is automated, real-time, and integrated with security management tools.',
                  riskLevel: 'low'
                }
              ]
            },
            {
              id: 'id-am-02',
              text: 'How effectively are software platforms, applications, and systems within the organization inventoried and managed?',
              guidance: 'Software asset management includes tracking all applications, systems, and platforms including cloud services, with version control and licensing information.',
              priority: 'high',
              examples: [
                'Application portfolio inventory and management',
                'Software license tracking and compliance',
                'Cloud service and SaaS inventory',
                'Custom application and system documentation'
              ],
              options: [
                {
                  value: 0,
                  label: 'Not Performed',
                  description: 'Software and applications are not systematically inventoried.',
                  riskLevel: 'critical'
                },
                {
                  value: 1,
                  label: 'Performed',
                  description: 'Some software tracking exists but is incomplete.',
                  riskLevel: 'high'
                },
                {
                  value: 2,
                  label: 'Documented',
                  description: 'Comprehensive software inventory is maintained with version and licensing information.',
                  riskLevel: 'medium'
                },
                {
                  value: 3,
                  label: 'Managed',
                  description: 'Software assets are continuously tracked, managed, and integrated with vulnerability management.',
                  riskLevel: 'low'
                }
              ]
            },
            {
              id: 'id-am-03',
              text: 'How well does your organization map and understand external information systems and organizational relationships?',
              guidance: 'Understanding connections to external systems and business relationships is critical for managing supply chain and third-party risks.',
              priority: 'medium',
              examples: [
                'Network connection mapping to external systems',
                'Business partner and supplier relationship documentation',
                'Data sharing agreements and security requirements',
                'Third-party system integration security controls'
              ],
              options: [
                {
                  value: 0,
                  label: 'Not Performed',
                  description: 'External systems and relationships are not mapped or understood.',
                  riskLevel: 'high'
                },
                {
                  value: 1,
                  label: 'Performed',
                  description: 'Some external connections are known but not comprehensively documented.',
                  riskLevel: 'medium'
                },
                {
                  value: 2,
                  label: 'Documented',
                  description: 'External systems and relationships are documented with security considerations.',
                  riskLevel: 'medium'
                },
                {
                  value: 3,
                  label: 'Managed',
                  description: 'External relationships are continuously monitored and managed with formal security agreements.',
                  riskLevel: 'low'
                }
              ]
            },
            {
              id: 'id-am-04',
              text: 'How effectively are information and data assets identified, classified, and managed according to their relative importance?',
              guidance: 'Data classification helps prioritize protection efforts based on sensitivity and business value. This includes personal data, intellectual property, and business-critical information.',
              priority: 'high',
              examples: [
                'Data classification scheme (public, internal, confidential, restricted)',
                'Data inventory including personal and sensitive data',
                'Information asset ownership and stewardship',
                'Data retention and disposal procedures'
              ],
              options: [
                {
                  value: 0,
                  label: 'Not Performed',
                  description: 'Information and data assets are not identified or classified.',
                  riskLevel: 'critical'
                },
                {
                  value: 1,
                  label: 'Performed',
                  description: 'Basic data identification exists but classification is informal or incomplete.',
                  riskLevel: 'high'
                },
                {
                  value: 2,
                  label: 'Documented',
                  description: 'Information assets are identified and classified with documented procedures.',
                  riskLevel: 'medium'
                },
                {
                  value: 3,
                  label: 'Managed',
                  description: 'Data classification is systematically applied, regularly reviewed, and integrated with protection controls.',
                  riskLevel: 'low'
                }
              ]
            },
            {
              id: 'id-am-05',
              text: 'How well are resources (personnel, equipment, technology, facilities) prioritized based on classification, criticality, and business value?',
              guidance: 'Resource prioritization ensures that the most critical assets receive appropriate protection levels based on their business value and risk exposure.',
              priority: 'medium',
              examples: [
                'Asset criticality assessment and ranking',
                'Business impact analysis for key resources',
                'Resource allocation based on risk and value',
                'Regular reassessment of asset priorities'
              ],
              options: [
                {
                  value: 0,
                  label: 'Not Performed',
                  description: 'Resources are not prioritized based on cybersecurity considerations.',
                  riskLevel: 'high'
                },
                {
                  value: 1,
                  label: 'Performed',
                  description: 'Some prioritization exists but is not systematic or documented.',
                  riskLevel: 'medium'
                },
                {
                  value: 2,
                  label: 'Documented',
                  description: 'Resource prioritization is documented based on classification and business value.',
                  riskLevel: 'medium'
                },
                {
                  value: 3,
                  label: 'Managed',
                  description: 'Prioritization is regularly reviewed, updated, and drives resource allocation decisions.',
                  riskLevel: 'low'
                }
              ]
            }
          ]
        },
        {
          id: 'id-be',
          name: 'Business Environment (ID.BE)',
          description: 'The organization\'s mission, objectives, stakeholders, and activities are understood and prioritized.',
          weight: 25,
          questions: [
            {
              id: 'id-be-01',
              text: 'How well does your organization understand its role in the supply chain and the potential cybersecurity impacts?',
              guidance: 'Understanding supply chain position helps identify upstream and downstream cybersecurity risks and dependencies that could affect business operations.',
              priority: 'medium',
              examples: [
                'Supply chain mapping and risk assessment',
                'Supplier cybersecurity requirements and monitoring',
                'Customer data protection obligations',
                'Critical supplier backup and contingency plans'
              ],
              options: [
                {
                  value: 0,
                  label: 'Not Performed',
                  description: 'Supply chain role and cybersecurity impacts are not understood.',
                  riskLevel: 'high'
                },
                {
                  value: 1,
                  label: 'Performed',
                  description: 'Basic understanding exists but is not comprehensive or documented.',
                  riskLevel: 'medium'
                },
                {
                  value: 2,
                  label: 'Documented',
                  description: 'Supply chain role and cybersecurity impacts are documented and understood.',
                  riskLevel: 'medium'
                },
                {
                  value: 3,
                  label: 'Managed',
                  description: 'Supply chain cybersecurity is actively managed with continuous monitoring and improvement.',
                  riskLevel: 'low'
                }
              ]
            },
            {
              id: 'id-be-02',
              text: 'How effectively has your organization established resilience requirements to support delivery of critical services?',
              guidance: 'Resilience requirements define how the organization maintains critical operations during and after cybersecurity incidents.',
              priority: 'medium',
              examples: [
                'Business continuity and disaster recovery plans',
                'Critical service identification and protection requirements',
                'Recovery time and point objectives',
                'Resilience testing and validation procedures'
              ],
              options: [
                {
                  value: 0,
                  label: 'Not Performed',
                  description: 'Resilience requirements for critical services are not established.',
                  riskLevel: 'high'
                },
                {
                  value: 1,
                  label: 'Performed',
                  description: 'Basic resilience planning exists but requirements are not formally defined.',
                  riskLevel: 'medium'
                },
                {
                  value: 2,
                  label: 'Documented',
                  description: 'Resilience requirements are documented and aligned with critical service delivery.',
                  riskLevel: 'medium'
                },
                {
                  value: 3,
                  label: 'Managed',
                  description: 'Resilience requirements are regularly tested, validated, and improved based on lessons learned.',
                  riskLevel: 'low'
                }
              ]
            }
          ]
        },
        {
          id: 'id-ra',
          name: 'Risk Assessment (ID.RA)',
          description: 'The organization understands cybersecurity risk to organizational operations, assets, and individuals.',
          weight: 35,
          questions: [
            {
              id: 'id-ra-01',
              text: 'How comprehensive and systematic is your organization\'s cybersecurity risk identification process?',
              guidance: 'Risk identification should systematically identify cybersecurity threats, vulnerabilities, and potential impacts across all business functions and assets.',
              priority: 'high',
              examples: [
                'Systematic threat modeling and risk assessment',
                'Vulnerability assessments and penetration testing',
                'Business impact analysis for cybersecurity risks',
                'Industry threat intelligence integration'
              ],
              options: [
                {
                  value: 0,
                  label: 'Not Performed',
                  description: 'No systematic cybersecurity risk identification process exists.',
                  riskLevel: 'critical'
                },
                {
                  value: 1,
                  label: 'Performed',
                  description: 'Ad-hoc risk identification occurs but is not systematic or comprehensive.',
                  riskLevel: 'high'
                },
                {
                  value: 2,
                  label: 'Documented',
                  description: 'Systematic risk identification process is documented and regularly performed.',
                  riskLevel: 'medium'
                },
                {
                  value: 3,
                  label: 'Managed',
                  description: 'Risk identification is continuous, comprehensive, and integrated with threat intelligence.',
                  riskLevel: 'low'
                }
              ]
            },
            {
              id: 'id-ra-02',
              text: 'How effectively does your organization assess and prioritize cybersecurity risks using consistent criteria?',
              guidance: 'Risk assessment should use consistent methodology to evaluate likelihood and impact, enabling proper risk prioritization and resource allocation.',
              priority: 'high',
              examples: [
                'Standardized risk assessment methodology',
                'Quantitative and qualitative risk analysis',
                'Risk prioritization matrix and scoring',
                'Regular risk assessment updates and reviews'
              ],
              options: [
                {
                  value: 0,
                  label: 'Not Performed',
                  description: 'No consistent cybersecurity risk assessment methodology exists.',
                  riskLevel: 'critical'
                },
                {
                  value: 1,
                  label: 'Performed',
                  description: 'Basic risk assessment occurs but methodology is inconsistent.',
                  riskLevel: 'high'
                },
                {
                  value: 2,
                  label: 'Documented',
                  description: 'Consistent risk assessment methodology is documented and applied.',
                  riskLevel: 'medium'
                },
                {
                  value: 3,
                  label: 'Managed',
                  description: 'Risk assessment is comprehensive, regularly updated, and drives strategic decisions.',
                  riskLevel: 'low'
                }
              ]
            },
            {
              id: 'id-ra-03',
              text: 'How well are internal and external cybersecurity threats identified and characterized?',
              guidance: 'Threat identification should consider both internal threats (insider threats, employee errors) and external threats (cybercriminals, nation-states, hacktivists).',
              priority: 'high',
              examples: [
                'Threat landscape analysis and monitoring',
                'Insider threat program and monitoring',
                'External threat intelligence feeds and analysis',
                'Threat actor profiling and capability assessment'
              ],
              options: [
                {
                  value: 0,
                  label: 'Not Performed',
                  description: 'Cybersecurity threats are not systematically identified or characterized.',
                  riskLevel: 'critical'
                },
                {
                  value: 1,
                  label: 'Performed',
                  description: 'Basic threat awareness exists but is not comprehensive or regularly updated.',
                  riskLevel: 'high'
                },
                {
                  value: 2,
                  label: 'Documented',
                  description: 'Internal and external threats are systematically identified and documented.',
                  riskLevel: 'medium'
                },
                {
                  value: 3,
                  label: 'Managed',
                  description: 'Threat intelligence is continuously gathered, analyzed, and integrated into risk management.',
                  riskLevel: 'low'
                }
              ]
            },
            {
              id: 'id-ra-04',
              text: 'How comprehensive is your organization\'s vulnerability identification and assessment program?',
              guidance: 'Vulnerability management should systematically identify, assess, and prioritize vulnerabilities across all systems and applications.',
              priority: 'high',
              examples: [
                'Regular vulnerability scanning and assessment',
                'Penetration testing and red team exercises',
                'Code review and application security testing',
                'Configuration and security baseline assessments'
              ],
              options: [
                {
                  value: 0,
                  label: 'Not Performed',
                  description: 'No systematic vulnerability identification and assessment program exists.',
                  riskLevel: 'critical'
                },
                {
                  value: 1,
                  label: 'Performed',
                  description: 'Ad-hoc vulnerability assessments occur but are not comprehensive or regular.',
                  riskLevel: 'high'
                },
                {
                  value: 2,
                  label: 'Documented',
                  description: 'Systematic vulnerability assessment program is documented and regularly executed.',
                  riskLevel: 'medium'
                },
                {
                  value: 3,
                  label: 'Managed',
                  description: 'Vulnerability management is continuous, comprehensive, and integrated with threat intelligence.',
                  riskLevel: 'low'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'protect',
      name: 'Protect (PR)',
      description: 'Safeguards are implemented to ensure delivery of critical infrastructure services and to limit or contain the impact of potential cybersecurity events.',
      weight: 20,
      priority: 'high',
      categories: [
        {
          id: 'pr-aa',
          name: 'Identity Management & Access Control (PR.AA)',
          description: 'Access to assets and associated facilities is limited to authorized users, processes, and devices.',
          weight: 30,
          questions: [
            {
              id: 'pr-aa-01',
              text: 'How effectively does your organization manage user identities and authentication across all systems and applications?',
              guidance: 'Identity management includes user provisioning, authentication methods, and identity lifecycle management across all organizational systems.',
              priority: 'high',
              examples: [
                'Centralized identity management system (Active Directory, LDAP)',
                'Multi-factor authentication implementation',
                'Single sign-on (SSO) deployment',
                'Identity federation for external partners'
              ],
              options: [
                {
                  value: 0,
                  label: 'Not Performed',
                  description: 'No centralized identity management system exists.',
                  riskLevel: 'critical'
                },
                {
                  value: 1,
                  label: 'Performed',
                  description: 'Basic user account management exists but is not centralized or comprehensive.',
                  riskLevel: 'high'
                },
                {
                  value: 2,
                  label: 'Documented',
                  description: 'Centralized identity management is implemented with documented procedures.',
                  riskLevel: 'medium'
                },
                {
                  value: 3,
                  label: 'Managed',
                  description: 'Identity management is comprehensive, automated, and continuously monitored.',
                  riskLevel: 'low'
                }
              ]
            },
            {
              id: 'pr-aa-02',
              text: 'How comprehensive is your organization\'s implementation of multi-factor authentication for user access?',
              guidance: 'Multi-factor authentication significantly reduces the risk of unauthorized access and should be implemented for all users, especially for privileged accounts.',
              priority: 'critical',
              examples: [
                'MFA for all user accounts',
                'Strong authentication for privileged accounts',
                'Adaptive authentication based on risk',
                'MFA for remote access and cloud services'
              ],
              options: [
                {
                  value: 0,
                  label: 'Not Performed',
                  description: 'Multi-factor authentication is not implemented.',
                  riskLevel: 'critical'
                },
                {
                  value: 1,
                  label: 'Performed',
                  description: 'MFA is implemented for some users or systems but not comprehensive.',
                  riskLevel: 'high'
                },
                {
                  value: 2,
                  label: 'Documented',
                  description: 'MFA is implemented for all users with documented policies and procedures.',
                  riskLevel: 'medium'
                },
                {
                  value: 3,
                  label: 'Managed',
                  description: 'MFA implementation is comprehensive, risk-based, and continuously monitored.',
                  riskLevel: 'low'
                }
              ]
            },
            {
              id: 'pr-aa-03',
              text: 'How effectively are user access rights managed through the complete access lifecycle?',
              guidance: 'Access lifecycle management includes provisioning, modification, review, and deprovisioning of user access rights based on job responsibilities.',
              priority: 'high',
              examples: [
                'Automated user provisioning and deprovisioning',
                'Role-based access control (RBAC) implementation',
                'Regular access reviews and recertification',
                'Segregation of duties enforcement'
              ],
              options: [
                {
                  value: 0,
                  label: 'Not Performed',
                  description: 'User access lifecycle is not systematically managed.',
                  riskLevel: 'critical'
                },
                {
                  value: 1,
                  label: 'Performed',
                  description: 'Basic access management exists but lifecycle processes are manual or incomplete.',
                  riskLevel: 'high'
                },
                {
                  value: 2,
                  label: 'Documented',
                  description: 'Access lifecycle management is documented and systematically implemented.',
                  riskLevel: 'medium'
                },
                {
                  value: 3,
                  label: 'Managed',
                  description: 'Access lifecycle is fully automated, regularly audited, and continuously improved.',
                  riskLevel: 'low'
                }
              ]
            },
            {
              id: 'pr-aa-04',
              text: 'How well are privileged access rights managed and monitored?',
              guidance: 'Privileged access poses the highest risk and requires enhanced controls including approval workflows, monitoring, and regular review.',
              priority: 'critical',
              examples: [
                'Privileged access management (PAM) solution',
                'Just-in-time privileged access',
                'Privileged session monitoring and recording',
                'Regular privileged access reviews and cleanup'
              ],
              options: [
                {
                  value: 0,
                  label: 'Not Performed',
                  description: 'Privileged access is not specifically managed or monitored.',
                  riskLevel: 'critical'
                },
                {
                  value: 1,
                  label: 'Performed',
                  description: 'Some privileged access controls exist but are not comprehensive.',
                  riskLevel: 'high'
                },
                {
                  value: 2,
                  label: 'Documented',
                  description: 'Privileged access management procedures are documented and implemented.',
                  riskLevel: 'medium'
                },
                {
                  value: 3,
                  label: 'Managed',
                  description: 'Privileged access is comprehensively managed with advanced controls and continuous monitoring.',
                  riskLevel: 'low'
                }
              ]
            }
          ]
        },
        {
          id: 'pr-at',
          name: 'Awareness & Training (PR.AT)',
          description: 'The organization\'s personnel are provided with cybersecurity awareness education and are trained to perform their cybersecurity-related duties.',
          weight: 15,
          questions: [
            {
              id: 'pr-at-01',
              text: 'How comprehensive and effective is your organization\'s cybersecurity awareness training program?',
              guidance: 'Cybersecurity awareness training should be provided to all personnel, regularly updated, and tailored to different roles and responsibilities.',
              priority: 'medium',
              examples: [
                'Annual cybersecurity awareness training for all employees',
                'Role-specific security training programs',
                'Phishing simulation and testing',
                'Regular security awareness communications'
              ],
              options: [
                {
                  value: 0,
                  label: 'Not Performed',
                  description: 'No formal cybersecurity awareness training program exists.',
                  riskLevel: 'high'
                },
                {
                  value: 1,
                  label: 'Performed',
                  description: 'Basic security awareness training is provided but is not comprehensive or regular.',
                  riskLevel: 'medium'
                },
                {
                  value: 2,
                  label: 'Documented',
                  description: 'Comprehensive awareness training program is documented and regularly delivered.',
                  riskLevel: 'medium'
                },
                {
                  value: 3,
                  label: 'Managed',
                  description: 'Training effectiveness is measured, continuously improved, and tailored to emerging threats.',
                  riskLevel: 'low'
                }
              ]
            },
            {
              id: 'pr-at-02',
              text: 'How well are privileged users and key cybersecurity personnel trained on their specific responsibilities?',
              guidance: 'Personnel with privileged access or cybersecurity responsibilities require specialized training appropriate to their roles and the sensitivity of their access.',
              priority: 'high',
              examples: [
                'Specialized training for system administrators',
                'Cybersecurity team certification requirements',
                'Security awareness for executives and board members',
                'Third-party and contractor security training'
              ],
              options: [
                {
                  value: 0,
                  label: 'Not Performed',
                  description: 'No specialized training exists for privileged users or cybersecurity personnel.',
                  riskLevel: 'high'
                },
                {
                  value: 1,
                  label: 'Performed',
                  description: 'Some specialized training exists but is not comprehensive or current.',
                  riskLevel: 'medium'
                },
                {
                  value: 2,
                  label: 'Documented',
                  description: 'Specialized training programs are documented and regularly provided.',
                  riskLevel: 'medium'
                },
                {
                  value: 3,
                  label: 'Managed',
                  description: 'Training is comprehensive, competency-based, and continuously updated for emerging threats.',
                  riskLevel: 'low'
                }
              ]
            }
          ]
        },
        {
          id: 'pr-ds',
          name: 'Data Security (PR.DS)',
          description: 'Information and records are managed consistent with the organization\'s risk strategy to protect confidentiality, integrity, and availability.',
          weight: 25,
          questions: [
            {
              id: 'pr-ds-01',
              text: 'How effectively is data protected throughout its lifecycle (creation, processing, storage, transmission, disposal)?',
              guidance: 'Data protection should address all phases of the data lifecycle with appropriate controls for confidentiality, integrity, and availability.',
              priority: 'high',
              examples: [
                'Data encryption in transit and at rest',
                'Data loss prevention (DLP) systems',
                'Secure data disposal and destruction procedures',
                'Data backup and recovery capabilities'
              ],
              options: [
                {
                  value: 0,
                  label: 'Not Performed',
                  description: 'No systematic data protection throughout the lifecycle exists.',
                  riskLevel: 'critical'
                },
                {
                  value: 1,
                  label: 'Performed',
                  description: 'Basic data protection exists but is not comprehensive across the full lifecycle.',
                  riskLevel: 'high'
                },
                {
                  value: 2,
                  label: 'Documented',
                  description: 'Data protection is systematically applied throughout the data lifecycle.',
                  riskLevel: 'medium'
                },
                {
                  value: 3,
                  label: 'Managed',
                  description: 'Data protection is comprehensive, automated, and continuously monitored and improved.',
                  riskLevel: 'low'
                }
              ]
            },
            {
              id: 'pr-ds-02',
              text: 'How comprehensive is your organization\'s data classification and handling procedures?',
              guidance: 'Data should be classified based on sensitivity and business value, with appropriate handling, storage, and transmission requirements for each classification level.',
              priority: 'high',
              examples: [
                'Data classification scheme (public, internal, confidential, restricted)',
                'Automated data classification tools',
                'Classification-based access controls',
                'Data handling procedures for each classification level'
              ],
              options: [
                {
                  value: 0,
                  label: 'Not Performed',
                  description: 'No data classification scheme or handling procedures exist.',
                  riskLevel: 'critical'
                },
                {
                  value: 1,
                  label: 'Performed',
                  description: 'Basic data classification exists but is not consistently applied.',
                  riskLevel: 'high'
                },
                {
                  value: 2,
                  label: 'Documented',
                  description: 'Data classification and handling procedures are documented and systematically applied.',
                  riskLevel: 'medium'
                },
                {
                  value: 3,
                  label: 'Managed',
                  description: 'Data classification is automated, regularly reviewed, and enforcement is monitored.',
                  riskLevel: 'low'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'detect',
      name: 'Detect (DE)',
      description: 'Activities are implemented to identify the occurrence of cybersecurity events in a timely manner.',
      weight: 16,
      priority: 'high',
      categories: [
        {
          id: 'de-ae',
          name: 'Anomalies & Events (DE.AE)',
          description: 'Anomalous activity is detected in a timely manner and the potential impact is understood.',
          weight: 20,
          questions: [
            {
              id: 'de-ae-01',
              text: 'How effectively does your organization establish and maintain baselines of network operations and expected data flows?',
              guidance: 'Network baselines help identify anomalous activities that may indicate cybersecurity events. This includes understanding normal traffic patterns and user behaviors.',
              priority: 'medium',
              examples: [
                'Network traffic baseline monitoring',
                'User behavior analytics (UBA)',
                'System performance baseline establishment',
                'Data flow mapping and monitoring'
              ],
              options: [
                {
                  value: 0,
                  label: 'Not Performed',
                  description: 'No network or operational baselines are established for anomaly detection.',
                  riskLevel: 'high'
                },
                {
                  value: 1,
                  label: 'Performed',
                  description: 'Basic baseline monitoring exists but is limited in scope.',
                  riskLevel: 'medium'
                },
                {
                  value: 2,
                  label: 'Documented',
                  description: 'Comprehensive baselines are documented and used for anomaly detection.',
                  riskLevel: 'medium'
                },
                {
                  value: 3,
                  label: 'Managed',
                  description: 'Baselines are automatically maintained, continuously refined, and integrated with threat detection.',
                  riskLevel: 'low'
                }
              ]
            },
            {
              id: 'de-ae-02',
              text: 'How well are detected cybersecurity events analyzed to understand attack targets and methods?',
              guidance: 'Event analysis helps understand the nature, scope, and potential impact of cybersecurity incidents to inform response decisions.',
              priority: 'high',
              examples: [
                'Security event correlation and analysis',
                'Threat hunting and investigation capabilities',
                'Malware analysis and reverse engineering',
                'Digital forensics and evidence collection'
              ],
              options: [
                {
                  value: 0,
                  label: 'Not Performed',
                  description: 'No systematic analysis of cybersecurity events occurs.',
                  riskLevel: 'high'
                },
                {
                  value: 1,
                  label: 'Performed',
                  description: 'Basic event analysis occurs but is limited and not systematic.',
                  riskLevel: 'medium'
                },
                {
                  value: 2,
                  label: 'Documented',
                  description: 'Systematic event analysis procedures are documented and implemented.',
                  riskLevel: 'medium'
                },
                {
                  value: 3,
                  label: 'Managed',
                  description: 'Event analysis is comprehensive, automated where possible, and continuously improved.',
                  riskLevel: 'low'
                }
              ]
            }
          ]
        },
        {
          id: 'de-cm',
          name: 'Security Continuous Monitoring (DE.CM)',
          description: 'The information system and assets are monitored at discrete intervals to identify cybersecurity events.',
          weight: 50,
          questions: [
            {
              id: 'de-cm-01',
              text: 'How comprehensive is your organization\'s network monitoring and intrusion detection capability?',
              guidance: 'Network monitoring should provide visibility into all network traffic and the ability to detect unauthorized access attempts and malicious activities.',
              priority: 'high',
              examples: [
                'Network intrusion detection system (NIDS)',
                'Network behavior analysis and monitoring',
                'Network segmentation monitoring',
                '24/7 security operations center (SOC) monitoring'
              ],
              options: [
                {
                  value: 0,
                  label: 'Not Performed',
                  description: 'No network monitoring or intrusion detection capabilities exist.',
                  riskLevel: 'critical'
                },
                {
                  value: 1,
                  label: 'Performed',
                  description: 'Basic network monitoring exists but coverage is limited.',
                  riskLevel: 'high'
                },
                {
                  value: 2,
                  label: 'Documented',
                  description: 'Comprehensive network monitoring is implemented with documented procedures.',
                  riskLevel: 'medium'
                },
                {
                  value: 3,
                  label: 'Managed',
                  description: 'Network monitoring is comprehensive, automated, and continuously tuned for effectiveness.',
                  riskLevel: 'low'
                }
              ]
            },
            {
              id: 'de-cm-02',
              text: 'How effectively does your organization monitor physical environment for unauthorized access and tampering?',
              guidance: 'Physical monitoring complements logical controls by detecting unauthorized physical access to facilities, systems, and infrastructure.',
              priority: 'medium',
              examples: [
                'Physical access control systems with logging',
                'Video surveillance and monitoring',
                'Environmental monitoring (temperature, humidity)',
                'Tamper detection on critical systems'
              ],
              options: [
                {
                  value: 0,
                  label: 'Not Performed',
                  description: 'No physical environment monitoring for security purposes exists.',
                  riskLevel: 'high'
                },
                {
                  value: 1,
                  label: 'Performed',
                  description: 'Basic physical monitoring exists but coverage is limited.',
                  riskLevel: 'medium'
                },
                {
                  value: 2,
                  label: 'Documented',
                  description: 'Physical monitoring is systematically implemented with documented procedures.',
                  riskLevel: 'medium'
                },
                {
                  value: 3,
                  label: 'Managed',
                  description: 'Physical monitoring is comprehensive, integrated with logical controls, and continuously improved.',
                  riskLevel: 'low'
                }
              ]
            },
            {
              id: 'de-cm-03',
              text: 'How comprehensive is your organization\'s monitoring of personnel activity for insider threats and policy violations?',
              guidance: 'Personnel monitoring helps detect insider threats, policy violations, and unauthorized activities while respecting privacy and legal requirements.',
              priority: 'medium',
              examples: [
                'User activity monitoring and analytics',
                'Privileged user session monitoring',
                'Data access and usage monitoring',
                'Policy violation detection and alerting'
              ],
              options: [
                {
                  value: 0,
                  label: 'Not Performed',
                  description: 'No personnel activity monitoring for cybersecurity purposes exists.',
                  riskLevel: 'medium'
                },
                {
                  value: 1,
                  label: 'Performed',
                  description: 'Basic activity monitoring exists but is limited in scope.',
                  riskLevel: 'medium'
                },
                {
                  value: 2,
                  label: 'Documented',
                  description: 'Personnel activity monitoring is systematically implemented with clear policies.',
                  riskLevel: 'low'
                },
                {
                  value: 3,
                  label: 'Managed',
                  description: 'Monitoring is comprehensive, privacy-respecting, and integrated with broader security controls.',
                  riskLevel: 'low'
                }
              ]
            }
          ]
        },
        {
          id: 'de-dp',
          name: 'Detection Processes (DE.DP)',
          description: 'Detection processes and procedures are maintained and tested to ensure timely and adequate awareness of anomalous events.',
          weight: 30,
          questions: [
            {
              id: 'de-dp-01',
              text: 'How well-defined and tested are your organization\'s cybersecurity detection processes and procedures?',
              guidance: 'Detection processes should be clearly defined, regularly tested, and continuously improved to ensure effective identification of cybersecurity events.',
              priority: 'high',
              examples: [
                'Documented incident detection procedures',
                'Regular testing of detection capabilities',
                'Detection process improvement based on lessons learned',
                'Integration with incident response procedures'
              ],
              options: [
                {
                  value: 0,
                  label: 'Not Performed',
                  description: 'No formal detection processes or procedures exist.',
                  riskLevel: 'high'
                },
                {
                  value: 1,
                  label: 'Performed',
                  description: 'Basic detection processes exist but are not formally documented or tested.',
                  riskLevel: 'medium'
                },
                {
                  value: 2,
                  label: 'Documented',
                  description: 'Detection processes are documented and regularly tested.',
                  riskLevel: 'medium'
                },
                {
                  value: 3,
                  label: 'Managed',
                  description: 'Detection processes are continuously improved, automated where possible, and regularly validated.',
                  riskLevel: 'low'
                }
              ]
            },
            {
              id: 'de-dp-02',
              text: 'How effectively are detection events communicated to appropriate personnel and stakeholders?',
              guidance: 'Effective communication ensures that cybersecurity events reach the right people at the right time to enable appropriate response actions.',
              priority: 'high',
              examples: [
                'Automated alerting and notification systems',
                'Escalation procedures for different event types',
                'Communication to executive leadership and board',
                'External stakeholder notification procedures'
              ],
              options: [
                {
                  value: 0,
                  label: 'Not Performed',
                  description: 'No formal communication processes for detection events exist.',
                  riskLevel: 'high'
                },
                {
                  value: 1,
                  label: 'Performed',
                  description: 'Basic communication occurs but is not systematic or timely.',
                  riskLevel: 'medium'
                },
                {
                  value: 2,
                  label: 'Documented',
                  description: 'Communication processes are documented with clear roles and timelines.',
                  riskLevel: 'medium'
                },
                {
                  value: 3,
                  label: 'Managed',
                  description: 'Communication is automated, tailored to stakeholder needs, and continuously improved.',
                  riskLevel: 'low'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'respond',
      name: 'Respond (RS)',
      description: 'Activities are implemented to take action regarding a detected cybersecurity incident.',
      weight: 13,
      priority: 'high',
      categories: [
        {
          id: 'rs-rp',
          name: 'Response Planning (RS.RP)',
          description: 'Response processes and procedures are executed and maintained to ensure timely response to detected cybersecurity events.',
          weight: 25,
          questions: [
            {
              id: 'rs-rp-01',
              text: 'How comprehensive and current is your organization\'s cybersecurity incident response plan?',
              guidance: 'An effective incident response plan provides clear procedures for responding to various types of cybersecurity incidents with defined roles and responsibilities.',
              priority: 'high',
              examples: [
                'Comprehensive incident response plan covering all incident types',
                'Defined incident response team roles and responsibilities',
                'Clear escalation procedures and decision criteria',
                'Regular plan testing and tabletop exercises'
              ],
              options: [
                {
                  value: 0,
                  label: 'Not Performed',
                  description: 'No formal cybersecurity incident response plan exists.',
                  riskLevel: 'critical'
                },
                {
                  value: 1,
                  label: 'Performed',
                  description: 'Basic incident response procedures exist but are not comprehensive or current.',
                  riskLevel: 'high'
                },
                {
                  value: 2,
                  label: 'Documented',
                  description: 'Comprehensive incident response plan is documented and regularly updated.',
                  riskLevel: 'medium'
                },
                {
                  value: 3,
                  label: 'Managed',
                  description: 'Response plan is regularly tested, improved, and integrated with business continuity planning.',
                  riskLevel: 'low'
                }
              ]
            }
          ]
        },
        {
          id: 'rs-co',
          name: 'Communications (RS.CO)',
          description: 'Response activities are coordinated with internal and external stakeholders as appropriate.',
          weight: 25,
          questions: [
            {
              id: 'rs-co-01',
              text: 'How effectively are internal stakeholders coordinated during cybersecurity incident response?',
              guidance: 'Internal coordination ensures all relevant parties are informed and can contribute to effective incident response.',
              priority: 'high',
              examples: [
                'Incident response team communication procedures',
                'Executive and board notification protocols',
                'Cross-functional coordination (IT, Legal, HR, Communications)',
                'Regular status updates and situation reporting'
              ],
              options: [
                {
                  value: 0,
                  label: 'Not Performed',
                  description: 'No formal internal coordination procedures for incident response exist.',
                  riskLevel: 'high'
                },
                {
                  value: 1,
                  label: 'Performed',
                  description: 'Basic internal coordination occurs but is not systematic.',
                  riskLevel: 'medium'
                },
                {
                  value: 2,
                  label: 'Documented',
                  description: 'Internal coordination procedures are documented and regularly practiced.',
                  riskLevel: 'medium'
                },
                {
                  value: 3,
                  label: 'Managed',
                  description: 'Coordination is highly effective, automated where possible, and continuously improved.',
                  riskLevel: 'low'
                }
              ]
            },
            {
              id: 'rs-co-02',
              text: 'How well are external stakeholders (customers, partners, authorities) coordinated during cybersecurity incidents?',
              guidance: 'External coordination includes customers, business partners, law enforcement, and regulatory authorities as appropriate to the incident.',
              priority: 'medium',
              examples: [
                'Customer notification procedures and templates',
                'Law enforcement coordination and reporting',
                'Regulatory notification requirements and procedures',
                'Business partner and supplier incident communication'
              ],
              options: [
                {
                  value: 0,
                  label: 'Not Performed',
                  description: 'No external stakeholder coordination procedures exist.',
                  riskLevel: 'high'
                },
                {
                  value: 1,
                  label: 'Performed',
                  description: 'Ad-hoc external coordination occurs but is not systematic.',
                  riskLevel: 'medium'
                },
                {
                  value: 2,
                  label: 'Documented',
                  description: 'External coordination procedures are documented with clear notification requirements.',
                  riskLevel: 'medium'
                },
                {
                  value: 3,
                  label: 'Managed',
                  description: 'External coordination is comprehensive, legally compliant, and supports business objectives.',
                  riskLevel: 'low'
                }
              ]
            }
          ]
        },
        {
          id: 'rs-an',
          name: 'Analysis (RS.AN)',
          description: 'Analysis is conducted to ensure effective response and support recovery activities.',
          weight: 25,
          questions: [
            {
              id: 'rs-an-01',
              text: 'How comprehensive is your organization\'s capability to analyze and investigate cybersecurity incidents?',
              guidance: 'Incident analysis helps understand the scope, impact, and root causes of cybersecurity incidents to inform response and prevention efforts.',
              priority: 'high',
              examples: [
                'Digital forensics capabilities and procedures',
                'Incident timeline reconstruction and analysis',
                'Root cause analysis procedures',
                'Threat attribution and intelligence gathering'
              ],
              options: [
                {
                  value: 0,
                  label: 'Not Performed',
                  description: 'No incident analysis or investigation capabilities exist.',
                  riskLevel: 'high'
                },
                {
                  value: 1,
                  label: 'Performed',
                  description: 'Basic incident analysis occurs but capabilities are limited.',
                  riskLevel: 'medium'
                },
                {
                  value: 2,
                  label: 'Documented',
                  description: 'Incident analysis procedures are documented and systematically applied.',
                  riskLevel: 'medium'
                },
                {
                  value: 3,
                  label: 'Managed',
                  description: 'Analysis capabilities are comprehensive, continuously improved, and support strategic decisions.',
                  riskLevel: 'low'
                }
              ]
            },
            {
              id: 'rs-an-02',
              text: 'How effectively does your organization conduct impact analysis to understand incident effects on operations?',
              guidance: 'Impact analysis helps determine the business effects of cybersecurity incidents and prioritize response efforts.',
              priority: 'medium',
              examples: [
                'Business impact assessment procedures',
                'Financial impact calculation methods',
                'Operational disruption analysis',
                'Reputation and customer impact assessment'
              ],
              options: [
                {
                  value: 0,
                  label: 'Not Performed',
                  description: 'No systematic impact analysis is conducted for cybersecurity incidents.',
                  riskLevel: 'medium'
                },
                {
                  value: 1,
                  label: 'Performed',
                  description: 'Basic impact assessment occurs but is not comprehensive.',
                  riskLevel: 'medium'
                },
                {
                  value: 2,
                  label: 'Documented',
                  description: 'Impact analysis procedures are documented and systematically applied.',
                  riskLevel: 'low'
                },
                {
                  value: 3,
                  label: 'Managed',
                  description: 'Impact analysis is comprehensive, automated where possible, and drives strategic improvements.',
                  riskLevel: 'low'
                }
              ]
            }
          ]
        },
        {
          id: 'rs-mi',
          name: 'Mitigation (RS.MI)',
          description: 'Activities are performed to prevent expansion of an event and mitigate its effects.',
          weight: 25,
          questions: [
            {
              id: 'rs-mi-01',
              text: 'How effective are your organization\'s incident containment and mitigation procedures?',
              guidance: 'Containment prevents incident expansion while mitigation reduces ongoing impact. Both are critical for minimizing damage from cybersecurity incidents.',
              priority: 'high',
              examples: [
                'Network isolation and quarantine procedures',
                'System shutdown and recovery procedures',
                'Malware containment and removal',
                'Data breach containment and notification'
              ],
              options: [
                {
                  value: 0,
                  label: 'Not Performed',
                  description: 'No formal containment or mitigation procedures exist.',
                  riskLevel: 'critical'
                },
                {
                  value: 1,
                  label: 'Performed',
                  description: 'Basic containment procedures exist but are not comprehensive.',
                  riskLevel: 'high'
                },
                {
                  value: 2,
                  label: 'Documented',
                  description: 'Containment and mitigation procedures are documented and regularly practiced.',
                  riskLevel: 'medium'
                },
                {
                  value: 3,
                  label: 'Managed',
                  description: 'Procedures are comprehensive, automated where possible, and continuously improved.',
                  riskLevel: 'low'
                }
              ]
            },
            {
              id: 'rs-mi-02',
              text: 'How well does your organization coordinate mitigation activities with law enforcement and regulatory authorities?',
              guidance: 'Coordination with external authorities may be required for certain incidents and can provide additional resources and expertise.',
              priority: 'medium',
              examples: [
                'Law enforcement coordination procedures',
                'Regulatory reporting and coordination',
                'Information sharing with cybersecurity agencies',
                'Legal evidence preservation procedures'
              ],
              options: [
                {
                  value: 0,
                  label: 'Not Performed',
                  description: 'No procedures exist for coordinating with external authorities.',
                  riskLevel: 'medium'
                },
                {
                  value: 1,
                  label: 'Performed',
                  description: 'Basic coordination capability exists but is not well-defined.',
                  riskLevel: 'medium'
                },
                {
                  value: 2,
                  label: 'Documented',
                  description: 'External coordination procedures are documented and understood.',
                  riskLevel: 'low'
                },
                {
                  value: 3,
                  label: 'Managed',
                  description: 'Coordination is comprehensive, practiced, and supports both legal and operational objectives.',
                  riskLevel: 'low'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'recover',
      name: 'Recover (RC)',
      description: 'Activities are implemented to restore systems or services that were impaired due to a cybersecurity incident.',
      weight: 13,
      priority: 'medium',
      categories: [
        {
          id: 'rc-rp',
          name: 'Recovery Planning (RC.RP)',
          description: 'Recovery processes and procedures are executed and maintained to ensure timely restoration of systems or services affected by cybersecurity events.',
          weight: 40,
          questions: [
            {
              id: 'rc-rp-01',
              text: 'How comprehensive and tested is your organization\'s cybersecurity recovery planning?',
              guidance: 'Recovery planning ensures rapid restoration of critical systems and services following cybersecurity incidents with minimal business disruption.',
              priority: 'high',
              examples: [
                'Disaster recovery plans for cybersecurity incidents',
                'Business continuity procedures',
                'Recovery time and point objectives (RTO/RPO)',
                'Regular recovery testing and validation'
              ],
              options: [
                {
                  value: 0,
                  label: 'Not Performed',
                  description: 'No formal recovery planning for cybersecurity incidents exists.',
                  riskLevel: 'high'
                },
                {
                  value: 1,
                  label: 'Performed',
                  description: 'Basic recovery procedures exist but are not comprehensive or tested.',
                  riskLevel: 'medium'
                },
                {
                  value: 2,
                  label: 'Documented',
                  description: 'Recovery plans are documented and regularly tested.',
                  riskLevel: 'medium'
                },
                {
                  value: 3,
                  label: 'Managed',
                  description: 'Recovery planning is comprehensive, regularly tested, and continuously improved.',
                  riskLevel: 'low'
                }
              ]
            }
          ]
        },
        {
          id: 'rc-im',
          name: 'Improvements (RC.IM)',
          description: 'Organizational cybersecurity is improved by incorporating lessons learned from current and previous detection/response activities.',
          weight: 30,
          questions: [
            {
              id: 'rc-im-01',
              text: 'How effectively does your organization capture and apply lessons learned from cybersecurity incidents?',
              guidance: 'Learning from incidents helps improve cybersecurity posture and prevent similar incidents in the future.',
              priority: 'medium',
              examples: [
                'Post-incident review and lessons learned procedures',
                'Incident database and trend analysis',
                'Process and control improvements based on incidents',
                'Knowledge sharing and training updates'
              ],
              options: [
                {
                  value: 0,
                  label: 'Not Performed',
                  description: 'No systematic capture or application of lessons learned from incidents.',
                  riskLevel: 'medium'
                },
                {
                  value: 1,
                  label: 'Performed',
                  description: 'Some lessons learned activities occur but are not systematic.',
                  riskLevel: 'medium'
                },
                {
                  value: 2,
                  label: 'Documented',
                  description: 'Lessons learned procedures are documented and systematically applied.',
                  riskLevel: 'low'
                },
                {
                  value: 3,
                  label: 'Managed',
                  description: 'Continuous improvement is embedded in cybersecurity culture and drives strategic enhancements.',
                  riskLevel: 'low'
                }
              ]
            }
          ]
        },
        {
          id: 'rc-co',
          name: 'Communications (RC.CO)',
          description: 'Restoration activities are communicated to internal and external stakeholders and executive and management teams.',
          weight: 30,
          questions: [
            {
              id: 'rc-co-01',
              text: 'How effectively does your organization communicate recovery status and progress to internal stakeholders?',
              guidance: 'Clear communication during recovery helps maintain stakeholder confidence and ensures appropriate resource allocation and decision-making.',
              priority: 'medium',
              examples: [
                'Recovery status reporting procedures',
                'Executive and board communication protocols',
                'Employee communication and updates',
                'Recovery milestone reporting'
              ],
              options: [
                {
                  value: 0,
                  label: 'Not Performed',
                  description: 'No formal communication procedures for recovery activities exist.',
                  riskLevel: 'medium'
                },
                {
                  value: 1,
                  label: 'Performed',
                  description: 'Basic recovery communication occurs but is not systematic.',
                  riskLevel: 'medium'
                },
                {
                  value: 2,
                  label: 'Documented',
                  description: 'Recovery communication procedures are documented and regularly practiced.',
                  riskLevel: 'low'
                },
                {
                  value: 3,
                  label: 'Managed',
                  description: 'Communication is comprehensive, timely, and supports stakeholder confidence.',
                  riskLevel: 'low'
                }
              ]
            },
            {
              id: 'rc-co-02',
              text: 'How well does your organization manage external communications during cybersecurity recovery?',
              guidance: 'External recovery communications must balance transparency with security concerns while meeting legal and regulatory requirements.',
              priority: 'medium',
              examples: [
                'Customer communication procedures and templates',
                'Media relations and public communications',
                'Regulatory and compliance reporting',
                'Business partner and supplier notifications'
              ],
              options: [
                {
                  value: 0,
                  label: 'Not Performed',
                  description: 'No external communication procedures for recovery activities exist.',
                  riskLevel: 'medium'
                },
                {
                  value: 1,
                  label: 'Performed',
                  description: 'Ad-hoc external communication occurs but is not systematic.',
                  riskLevel: 'medium'
                },
                {
                  value: 2,
                  label: 'Documented',
                  description: 'External communication procedures are documented and legally compliant.',
                  riskLevel: 'low'
                },
                {
                  value: 3,
                  label: 'Managed',
                  description: 'External communications are strategic, stakeholder-focused, and support business recovery.',
                  riskLevel: 'low'
                }
              ]
            }
          ]
        }
      ]
    }
  ],
  maturityLevels: [
    {
      level: 1,
      name: 'Partial',
      description: 'The organization has partial implementation of cybersecurity practices. Processes are ad-hoc and reactive.',
      color: '#ef4444',
      minScore: 0,
      maxScore: 25,
      characteristics: [
        'Ad-hoc cybersecurity processes',
        'Limited documentation and procedures',
        'Reactive approach to cybersecurity',
        'Inconsistent implementation across organization'
      ]
    },
    {
      level: 2,
      name: 'Risk Informed',
      description: 'The organization has risk management practices approved by management but may not be organization-wide.',
      color: '#f97316',
      minScore: 26,
      maxScore: 50,
      characteristics: [
        'Risk-based cybersecurity practices',
        'Management awareness and approval',
        'Some documentation and procedures',
        'Beginning to integrate cybersecurity into business processes'
      ]
    },
    {
      level: 3,
      name: 'Repeatable',
      description: 'The organization has formalized and documented cybersecurity practices that are regularly updated.',
      color: '#eab308',
      minScore: 51,
      maxScore: 75,
      characteristics: [
        'Formal policies and procedures',
        'Regular updates to cybersecurity practices',
        'Organization-wide implementation',
        'Measurable cybersecurity objectives'
      ]
    }, 
    {
      level: 4,
      name: 'Adaptive',
      description: 'The organization adapts its cybersecurity practices based on lessons learned and predictive indicators.',
      color: '#22c55e',
      minScore: 76,
      maxScore: 100,
      characteristics: [
        'Continuous improvement culture',
        'Predictive and adaptive capabilities',
        'Integration with business strategy',
        'Advanced threat intelligence and analytics'
      ]
    }
  ]
};