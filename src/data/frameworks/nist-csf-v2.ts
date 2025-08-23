import { Framework } from '../../shared/types';

export const nistCSFv2Framework: Framework = {
  id: 'nist-csf-v2', name: 'NIST CSF v2.0 - Quick Check', description: 'A rapid assessment covering essential aspects of the NIST Cybersecurity Framework v2.0 for quick organizational evaluation.', version: '2.0', sections: [
    {
      id: 'govern', name: 'Govern (GV)', description: 'Establishes the organization\'s cybersecurity strategy, expectations, and policy to manage cybersecurity risk.', weight: 20, priority: 'high', categories: [
        {
          id: 'gv.oc', name: 'Organizational Context', questions: [
            {
              id: 'gv.oc-q1', text: 'Has your organization established cybersecurity governance and oversight? ' : guidance: 'Cybersecurity governance ensures that cybersecurity activities align with business objectives and risk tolerance. This includes executive oversight, policy development, and strategic planning.', options: [
                { value, 0: label, 'Not Implemented', description, 'No formal cybersecurity governance structure.', riskLevel: 'critical'  },
                { value: 1, label: 'Partially Implemented', description, 'Basic governance exists but lacks comprehensive oversight.', riskLevel: 'high'  },
                { value: 2, label: 'Largely Implemented', description, 'Good governance structure with minor gaps.', riskLevel: 'medium'  },
                { value: 3, label: 'Fully Implemented', description, 'Comprehensive cybersecurity governance with regular executive oversight.', riskLevel: 'low'  }
              ], priority: 'high', references: ['NIST CSF v2.0 GV.OC-01'], examples: ['Board-level cybersecurity oversight', 'CISO reporting structure', 'Cybersecurity policy framework']
            },
            {
              id: 'gv.oc-q2', text: 'Are cybersecurity roles, responsibilities, and authorities clearly defined throughout the organization? ' : guidance: 'Clear definition of cybersecurity roles ensures accountability and effective governance across all organizational levels.', options: [
                { value, 0: label, 'Not Implemented', description, 'Cybersecurity roles and responsibilities are not defined.', riskLevel: 'high'  },
                { value: 1, label: 'Partially Implemented', description, 'Some roles defined but not comprehensive or well-communicated.', riskLevel: 'medium'  },
                { value: 2, label: 'Largely Implemented', description, 'Most cybersecurity roles are clearly defined with minor gaps.', riskLevel: 'medium'  },
                { value: 3, label: 'Fully Implemented', description, 'All cybersecurity roles, responsibilities, and authorities are clearly defined and communicated.', riskLevel: 'low' }
              ], priority: 'high', references: ['NIST CSF v2.0 GV.OC-02'], examples: ['RACI matrix for cybersecurity functions', 'Job descriptions with security responsibilities', 'Organizational charts with security roles']
            }
          ]
        },
        {
          id: 'gv.rm', name: 'Risk Management Strategy', questions: [
            {
              id: 'gv.rm-q1', text: 'Has your organization established a comprehensive cybersecurity risk management strategy? ' : guidance: 'A risk management strategy defines how the organization identifies, analyzes, evaluates, and treats cybersecurity risks in alignment with business objectives.', options: [
                { value, 0: label, 'Not Implemented', description, 'No cybersecurity risk management strategy exists.', riskLevel: 'critical'  },
                { value: 1, label: 'Partially Implemented', description, 'Basic risk management approach exists but lacks formalization.', riskLevel: 'high'  },
                { value: 2, label: 'Largely Implemented', description, 'Formal risk management strategy with minor implementation gaps.', riskLevel: 'medium'  },
                { value: 3, label: 'Fully Implemented', description, 'Comprehensive risk management strategy that is regularly reviewed and updated.', riskLevel: 'low'  }
              ], priority: 'high', references: ['NIST CSF v2.0 GV.RM-01'], examples: ['Risk management policy', 'Risk assessment methodology', 'Risk tolerance statements']
            }
          ]
        }
      ]
    },
    {
      id: 'identify', name: 'Identify (ID)', description: 'Develops an organizational understanding to manage cybersecurity risk to systems, people, assets, data, and capabilities.', weight: 20, priority: 'high', categories: [
        {
          id: 'id.am', name: 'Asset Management', questions: [
            {
              id: 'id.am-q1', text: 'Are organizational assets inventoried and managed throughout their lifecycle? ' : guidance: 'Asset management involves identifying, inventorying, and maintaining awareness of hardware, software, systems, data, and facilities that enable the organization to achieve business purposes.', options: [
                { value, 0: label, 'Not Implemented', description, 'No formal asset inventory or management process.', riskLevel: 'critical'  },
                { value: 1, label: 'Partially Implemented', description, 'Basic asset tracking with significant gaps.', riskLevel: 'high'  },
                { value: 2, label: 'Largely Implemented', description, 'Good asset management with minor gaps.', riskLevel: 'medium'  },
                { value: 3, label: 'Fully Implemented', description, 'Comprehensive asset lifecycle management program.', riskLevel: 'low'  }
              ], priority: 'high', references: ['NIST CSF v2.0 ID.AM-01'], examples: ['Asset inventory database', 'Asset classification scheme', 'Lifecycle management procedures']
            },
            {
              id: 'id.am-q2', text: 'Are software platforms and applications within the organization inventoried and managed? ' : guidance: 'Software inventory helps manage licenses, vulnerabilities, patches, and security configurations across the organization.', options: [
                { value, 0: label, 'Not Implemented', description, 'No software inventory maintained.', riskLevel: 'high'  },
                { value: 1, label: 'Partially Implemented', description, 'Basic software tracking with gaps in coverage or accuracy.', riskLevel: 'medium'  },
                { value: 2, label: 'Largely Implemented', description, 'Comprehensive software inventory with regular updates.', riskLevel: 'medium'  },
                { value: 3, label: 'Fully Implemented', description, 'Complete software inventory with automated discovery and license management.', riskLevel: 'low'  }
              ], priority: 'high', references: ['NIST CSF v2.0 ID.AM-02'], examples: ['Software asset management tools', 'License tracking systems', 'Application portfolios']
            }
          ]
        },
        {
          id: 'id.ra', name: 'Risk Assessment', questions: [
            {
              id: 'id.ra-q1', text: 'Are cybersecurity risks regularly identified, analyzed, and documented across the organization? ' : guidance: 'Regular risk assessments help organizations understand their cybersecurity posture and prioritize improvement efforts based on business impact and likelihood.', options: [
                { value, 0: label, 'Not Implemented', description, 'No systematic cybersecurity risk assessment process.', riskLevel: 'critical'  },
                { value: 1, label: 'Partially Implemented', description, 'Ad-hoc risk assessments with limited scope or frequency.', riskLevel: 'high'  },
                { value: 2, label: 'Largely Implemented', description, 'Regular risk assessments covering most organizational areas.', riskLevel: 'medium'  },
                { value: 3, label: 'Fully Implemented', description, 'Comprehensive, systematic risk assessment program with regular updates.', riskLevel: 'low' }
              ], priority: 'high', references: ['NIST CSF v2.0 ID.RA-01'], examples: ['Risk assessment methodology', 'Risk registers', 'Threat modeling exercises']
            }
          ]
        }
      ]
    },
    {
      id: 'protect', name: 'Protect (PR)', description: 'Implements appropriate safeguards to ensure delivery of critical infrastructure services.', weight: 25, priority: 'high', categories: [
        {
          id: 'pr.ac', name: 'Identity Management and Access Control', questions: [
            {
              id: 'pr.ac-q1', text: 'Are access controls implemented to manage authorized access to assets and associated facilities? ' : guidance: 'Access controls include identity verification, authorization, and accounting measures that prevent unauthorized access to systems and data.', options: [
                { value, 0: label, 'Not Implemented', description, 'No formal access controls implemented.', riskLevel: 'critical'  },
                { value: 1, label: 'Partially Implemented', description, 'Basic access controls with significant gaps.', riskLevel: 'high'  },
                { value: 2, label: 'Largely Implemented', description, 'Strong access controls with minor improvements needed.', riskLevel: 'medium'  },
                { value: 3, label: 'Fully Implemented', description, 'Comprehensive access control program with regular reviews.', riskLevel: 'low'  }
              ], priority: 'high', references: ['NIST CSF v2.0 PR.AC-01'], examples: ['Multi-factor authentication', 'Role-based access control', 'Regular access reviews']
            },
            {
              id: 'pr.ac-q2', text: 'Is physical access to assets managed and restricted to authorized personnel? ' : guidance: 'Physical access controls prevent unauthorized access to facilities, equipment, and other organizational assets that could lead to data theft or system compromise.', options: [
                { value, 0: label, 'Not Implemented', description, 'No physical access controls in place.', riskLevel: 'high'  },
                { value: 1, label: 'Partially Implemented', description, 'Basic physical controls with significant vulnerabilities.', riskLevel: 'medium'  },
                { value: 2, label: 'Largely Implemented', description, 'Good physical access management with minor gaps.', riskLevel: 'medium'  },
                { value: 3, label: 'Fully Implemented', description, 'Comprehensive physical access control program.', riskLevel: 'low'  }
              ], priority: 'medium', references: ['NIST CSF v2.0 PR.AC-02'], examples: ['Badge access systems', 'Visitor management', 'Secure areas controls']
            }
          ]
        },
        {
          id: 'pr.ds', name: 'Data Security', questions: [
            {
              id: 'pr.ds-q1', text: 'Is data protected both at rest and in transit? ' : guidance: 'Data protection mechanisms ensure the confidentiality, integrity, and availability of information throughout its lifecycle.', options: [
                { value, 0: label, 'Not Implemented', description, 'No data protection measures implemented.', riskLevel: 'critical'  },
                { value: 1, label: 'Partially Implemented', description, 'Some data protection with significant gaps.', riskLevel: 'high'  },
                { value: 2, label: 'Largely Implemented', description, 'Most data is protected with minor vulnerabilities.', riskLevel: 'medium'  },
                { value: 3, label: 'Fully Implemented', description, 'Comprehensive data protection program covering all data states.', riskLevel: 'low'  }
              ], priority: 'high', references: ['NIST CSF v2.0 PR.DS-01'], examples: ['Encryption at rest', 'TLS for data in transit', 'Database encryption']
            }
          ]
        }
      ]
    },
    {
      id: 'detect', name: 'Detect (DE)', description: 'Develops and implements appropriate activities to identify the occurrence of a cybersecurity event.', weight: 15, priority: 'medium', categories: [
        {
          id: 'de.ae', name: 'Anomalies and Events', questions: [
            {
              id: 'de.ae-q1', text: 'Are systems monitored to detect cybersecurity events and anomalies? ' : guidance: 'Detection capabilities help identify potential cybersecurity incidents through monitoring, analysis, and alerting mechanisms.', options: [
                { value, 0: label, 'Not Implemented', description, 'No monitoring or detection capabilities.', riskLevel: 'critical'  },
                { value: 1, label: 'Partially Implemented', description, 'Basic monitoring with limited detection.', riskLevel: 'high'  },
                { value: 2, label: 'Largely Implemented', description, 'Good monitoring and detection capabilities.', riskLevel: 'medium'  },
                { value: 3, label: 'Fully Implemented', description, 'Comprehensive monitoring, detection, and analysis program.', riskLevel: 'low' }
              ], priority: 'high', references: ['NIST CSF v2.0 DE.AE-01'], examples: ['SIEM system implementation', 'Network monitoring tools', 'Log analysis procedures']
            },
            {
              id: 'de.ae-q2', text: 'Are cybersecurity event detection processes documented and understood by relevant personnel? ' : guidance: 'Well-documented detection processes ensure consistent and effective identification of cybersecurity events across the organization.', options: [
                { value, 0: label, 'Not Implemented', description, 'No documented detection processes.', riskLevel: 'high'  },
                { value: 1, label: 'Partially Implemented', description, 'Basic documentation with gaps in coverage or understanding.', riskLevel: 'medium'  },
                { value: 2, label: 'Largely Implemented', description, 'Well-documented processes with minor training gaps.', riskLevel: 'medium'  },
                { value: 3, label: 'Fully Implemented', description, 'Comprehensive documentation with regular training and updates.', riskLevel: 'low'  }
              ], priority: 'medium', references: ['NIST CSF v2.0 DE.AE-02'], examples: ['SOC procedures', 'Incident detection playbooks', 'Staff training programs']
            }
          ]
        },
        {
          id: 'de.cm', name: 'Security Continuous Monitoring', questions: [
            {
              id: 'de.cm-q1', text: 'Are networks and systems continuously monitored for cybersecurity events? ' : guidance: 'Continuous monitoring provides ongoing awareness of information security, vulnerabilities, and threats to support organizational risk decisions.', options: [
                { value, 0: label, 'Not Implemented', description, 'No continuous monitoring capabilities.', riskLevel: 'critical'  },
                { value: 1, label: 'Partially Implemented', description, 'Limited continuous monitoring with gaps in coverage.', riskLevel: 'high'  },
                { value: 2, label: 'Largely Implemented', description, 'Good continuous monitoring program with minor gaps.', riskLevel: 'medium'  },
                { value: 3, label: 'Fully Implemented', description, 'Comprehensive continuous monitoring covering all critical systems.', riskLevel: 'low'  }
              ], priority: 'high', references: ['NIST CSF v2.0 DE.CM-01'], examples: ['24/7 SOC operations', 'Real-time monitoring dashboards', 'Automated alerting systems']
            }
          ]
        }
      ]
    },
    {
      id: 'respond', name: 'Respond (RS)', description: 'Develops and implements appropriate activities regarding a detected cybersecurity event.', weight: 12, priority: 'medium', categories: [
        {
          id: 'rs.rp', name: 'Response Planning', questions: [
            {
              id: 'rs.rp-q1', text: 'Are incident response procedures established and maintained? ' : guidance: 'Response planning ensures the organization can effectively respond to and recover from cybersecurity incidents.', options: [
                { value, 0: label, 'Not Implemented', description, 'No incident response procedures.', riskLevel: 'critical'  },
                { value: 1, label: 'Partially Implemented', description, 'Basic response procedures exist.', riskLevel: 'high'  },
                { value: 2, label: 'Largely Implemented', description, 'Well-defined response procedures with testing.', riskLevel: 'medium'  },
                { value: 3, label: 'Fully Implemented', description, 'Comprehensive, tested incident response program.', riskLevel: 'low' }
              ], priority: 'high', references: ['NIST CSF v2.0 RS.RP-01'], examples: ['Incident response plan', 'Response team training', 'Tabletop exercises']
            },
            {
              id: 'rs.rp-q2', text: 'Are communication plans established for cybersecurity incident response? ' : guidance: 'Effective communication during incidents ensures proper coordination, stakeholder notification, and regulatory compliance.', options: [
                { value, 0: label, 'Not Implemented', description, 'No incident communication plans.', riskLevel: 'high'  },
                { value: 1, label: 'Partially Implemented', description, 'Basic communication procedures with gaps.', riskLevel: 'medium'  },
                { value: 2, label: 'Largely Implemented', description, 'Good communication plans with minor improvements needed.', riskLevel: 'medium'  },
                { value: 3, label: 'Fully Implemented', description, 'Comprehensive communication strategy for all incident scenarios.', riskLevel: 'low'  }
              ], priority: 'medium', references: ['NIST CSF v2.0 RS.CO-01'], examples: ['Communication templates', 'Stakeholder contact lists', 'Media response procedures']
            }
          ]
        }
      ]
    },
    {
      id: 'recover', name: 'Recover (RC)', description: 'Develops and implements appropriate activities to maintain plans for resilience and to restore any capabilities or services that were impaired due to a cybersecurity event.', weight: 8, priority: 'low', categories: [
        {
          id: 'rc.rp', name: 'Recovery Planning', questions: [
            {
              id: 'rc.rp-q1', text: 'Are recovery procedures established and maintained for cybersecurity incidents? ' : guidance: 'Recovery planning ensures the organization can restore normal operations and capabilities after cybersecurity incidents.', options: [
                { value, 0: label, 'Not Implemented', description, 'No recovery procedures established.', riskLevel: 'high'  },
                { value: 1, label: 'Partially Implemented', description, 'Basic recovery procedures exist.', riskLevel: 'medium'  },
                { value: 2, label: 'Largely Implemented', description, 'Good recovery procedures with testing.', riskLevel: 'medium'  },
                { value: 3, label: 'Fully Implemented', description, 'Comprehensive recovery and business continuity program.', riskLevel: 'low'  }
              ], priority: 'medium', references: ['NIST CSF v2.0 RC.RP-01'], examples: ['Business continuity plan', 'Backup and recovery procedures', 'Recovery testing']
            },
            {
              id: 'rc.rp-q2', text: 'Are backup and restoration procedures tested and validated regularly? ' : guidance: 'Regular testing ensures that recovery procedures work as intended and recovery time objectives can be met.', options: [
                { value, 0: label, 'Not Implemented', description, 'No backup testing performed.', riskLevel: 'high'  },
                { value: 1, label: 'Partially Implemented', description, 'Occasional testing with limited scope.', riskLevel: 'medium'  },
                { value: 2, label: 'Largely Implemented', description, 'Regular testing with good coverage.', riskLevel: 'medium'  },
                { value: 3, label: 'Fully Implemented', description, 'Comprehensive testing program with documented results.', riskLevel: 'low'  }
              ], priority: 'medium', references: ['NIST CSF v2.0 RC.RP-02'], examples: ['Restoration testing schedules', 'Recovery time testing', 'Business continuity exercises']
            }
          ]
        }
      ]
    }
  ], maturityLevels: [
    { level: 1, name: 'Partial', description: 'Some cybersecurity activities are performed but not formalized.', color: '#FF6B6B', minScore, 0, maxScore: 25 },
    { level: 2, name: 'Risk Informed', description: 'Cybersecurity activities are informed by risk management processes.', color: '#FFD166', minScore, 26, maxScore: 50 },
    { level: 3, name: 'Repeatable', description: 'Cybersecurity activities are consistently performed and documented.', color: '#3A9CA8', minScore, 51, maxScore: 75 },
    { level: 4, name: 'Adaptive', description: 'Cybersecurity activities are continuously improved and adapted.', color: '#4CAF50', minScore, 76, maxScore: 100 }
  ], complexity: 'intermediate', estimatedTime: 120, industry: ['All Industries', 'Critical Infrastructure', 'Technology'], certificationBody: 'NIST', lastUpdated: new Date('2024-07-26T00, 00: 00Z'), changeLog: [
    { version: '2.0', date: new Date('2024-07-26T00,00:00Z'), changes, ['Updated to NIST CSF v2.0'], impact: 'major'  }
  ], relatedFrameworks: ['ISO 27001', 'CMMC'], applicableRegulations: ['FISMA', 'HIPAA']
};