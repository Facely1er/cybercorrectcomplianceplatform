import React, { useState, useEffect } from 'react';
import { Breadcrumbs } from '../../../shared/components/layout/Breadcrumbs';
import { useInternalLinking } from '../../../shared/hooks/useInternalLinking';
import {  ArrowLeft, Shield, Plus, Search, Filter, Download, Upload, Edit3, Trash2, Eye, 
  AlertCircle, CheckCircle, Clock, XCircle, Target, Settings, BarChart3, Award, 
  Users, Calendar, FileText, TrendingUp, Star, Flag, Activity, Zap, Bell, 
  ChevronDown, ChevronRight, RefreshCw, Globe, Lock, Database, Server,
  Layers, Network, Code, Gauge, PieChart, LineChart, MapPin, Briefcase
} from 'lucide-react';
import { Control, ControlStatus, ImplementationStatus, ControlType, AssessmentFrequency } from '../types';
 

interface ControlsManagementViewProps {
  onBack: () => void;
  addNotification: (type: 'success' | 'error' | 'warning' | 'info', message: string) => void;
}

export const ControlsManagementView: React.FC<ControlsManagementViewProps> = ({
  onBack,
  addNotification
}) => {
  const { breadcrumbs } = useInternalLinking();
  const [controls, setControls] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterFunction, setFilterFunction] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'kanban'>('grid');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingControl, setEditingControl] = useState<any | null>(null);
  const [selectedControls, setSelectedControls] = useState<string[]>([]);
  const [expandedControl, setExpandedControl] = useState<string | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(true);
  
  const [formData, setFormData] = useState({
    controlId: '',
    name: '',
    description: '',
    nistFunction: 'Identify',
    nistCategory: '',
    nistSubcategory: '',
    status: 'not-implemented' as ControlStatus,
    priority: 'medium' as 'low' | 'medium' | 'high' | 'critical',
    owner: '',
    controlType: 'administrative' as ControlType,
    implementationApproach: 'manual' as 'manual' | 'automated' | 'hybrid' | 'outsourced' | 'cloud-native'
  });

  // Enhanced mock data for demonstration
  useEffect(() => {
    const mockControls: any[] = [
      {
        id: 'ctrl-001',
        controlId: 'ID.AM-1',
        name: 'Asset Inventory and Documentation',
        description: 'Maintain comprehensive inventory of physical devices, systems, platforms, and applications within the organization',
        framework: 'nist-csf-v2',
        nistFunction: 'Identify',
        nistCategory: 'Asset Management',
        nistSubcategory: 'ID.AM-01',
        controlFamily: 'Asset Management',
        controlType: 'administrative',
        implementationApproach: 'automated',
        status: 'operational',
        priority: 'high',
        owner: 'IT Infrastructure Manager',
        implementers: ['IT Operations Team', 'Security Team', 'Network Team'],
        validators: ['CISO', 'Internal Audit', 'Compliance Officer'],
        lastAssessed: new Date(2024, 6, 15),
        nextAssessment: new Date(2024, 9, 15),
        assessmentFrequency: 'quarterly' as AssessmentFrequency,
        implementation: {
          actualDate: new Date(2024, 0, 15),
          method: 'Automated discovery with centralized CMDB and manual validation procedures',
          tools: ['Lansweeper Enterprise', 'ServiceNow CMDB', 'Microsoft SCCM', 'Network Discovery Tools'],
          procedures: ['Asset Discovery SOP v2.1', 'CMDB Update Process', 'Asset Classification Guide'],
          configuration: { 
            discovery_frequency: 'daily', 
            validation_frequency: 'weekly',
            classification_rules: 'automated',
            approval_workflow: 'enabled'
          },
          deployment: {
            scope: ['All Corporate Networks', 'Data Centers', 'Cloud Infrastructure', 'Remote Offices'],
            phases: [
              {
                id: 'phase-1',
                name: 'Core Infrastructure Discovery',
                description: 'Deploy discovery tools across primary data centers',
                startDate: new Date(2023, 11, 1),
                endDate: new Date(2024, 0, 15),
                scope: ['Primary Data Center', 'Core Network Infrastructure'],
                prerequisites: ['Network access approval', 'Tool deployment'],
                deliverables: ['Asset inventory database', 'Discovery procedures'],
                status: 'completed' as const
              }
            ],
            rollbackPlan: 'Revert to manual spreadsheet inventory with weekly updates as temporary measure'
          },
          validation: {
            criteria: ['95% discovery accuracy', 'Real-time inventory updates', '100% critical asset coverage'],
            methods: ['Automated scanning validation', 'Manual spot checks', 'Quarterly audit reviews'],
            results: [
              {
                id: 'val-001',
                date: new Date(2024, 6, 1),
                validator: 'Senior Security Analyst',
                method: 'Automated scan validation',
                outcome: 'pass' as const,
                findings: ['Discovery accuracy: 97.2%', 'Critical assets: 100% coverage'],
                evidence: ['scan-report-q2-2024.pdf', 'validation-checklist.xlsx']
              }
            ]
          }
        },
        testing: {
          testPlan: {
            id: 'tp-001',
            objectives: ['Verify inventory accuracy', 'Test discovery coverage', 'Validate asset classification'],
            scope: ['All asset types', 'All network segments', 'Cloud and on-premise systems'],
            methods: ['Automated discovery validation', 'Manual verification', 'Cross-reference audits'],
            criteria: ['95% accuracy threshold', '<24h discovery latency', 'Zero critical asset gaps'],
            responsibilities: { 
              tester: 'IT Security Team', 
              reviewer: 'CISO', 
              approver: 'IT Director' 
            },
            timeline: 'Quarterly validation with monthly spot checks'
          },
          schedule: {
            frequency: 'quarterly' as AssessmentFrequency,
            nextTest: new Date(2024, 9, 15),
            lastTest: new Date(2024, 6, 15),
            plannedTests: [
              {
                id: 'test-q4-2024',
                scheduledDate: new Date(2024, 9, 15),
                testType: 'compliance' as const,
                scope: ['All discovered assets', 'New network segments'],
                assignedTo: 'Security Team Lead',
                estimatedDuration: '2 days'
              }
            ]
          },
          results: [
            {
              id: 'test-result-q2-2024',
              testDate: new Date(2024, 6, 15),
              testType: 'Compliance validation',
              tester: 'Senior Security Analyst',
              outcome: 'pass' as const,
              score: 97,
              findings: [
                {
                  type: 'improvement' as const,
                  severity: 'low' as const,
                  description: 'Some IoT devices require manual classification',
                  remediation: 'Update discovery rules for IoT device identification',
                  dueDate: new Date(2024, 7, 30),
                  assignedTo: 'Network Administrator',
                  status: 'in-progress' as const
                }
              ],
              evidence: ['asset-inventory-report-q2.pdf', 'discovery-accuracy-metrics.xlsx'],
              recommendations: ['Enhance IoT discovery rules', 'Implement automated tagging'],
              nextTestDate: new Date(2024, 9, 15)
            }
          ],
          automation: {
            enabled: true,
            tools: ['Lansweeper API', 'PowerShell Scripts', 'Python Automation'],
            scripts: ['daily_discovery_validation.py', 'asset_classification_check.ps1'],
            schedule: 'Daily automated checks with weekly reporting',
            alerting: {
              onFailure: true,
              recipients: ['it-security@company.com', 'ops-team@company.com'],
              escalation: ['ciso@company.com', 'it-director@company.com']
            }
          }
        },
        monitoring: {
          metrics: [
            {
              id: 'metric-discovery-accuracy',
              name: 'Asset Discovery Accuracy',
              description: 'Percentage of assets accurately discovered and properly classified',
              type: 'operational' as const,
              dataSource: 'Lansweeper + CMDB',
              collectionMethod: 'Automated API polling',
              frequency: 'Real-time with daily aggregation',
              thresholds: {
                normal: { min: 95 },
                warning: { min: 90, max: 94 },
                critical: { max: 89 }
              },
              currentValue: 97.2,
              trend: 'improving' as const,
              lastUpdated: new Date()
            },
            {
              id: 'metric-coverage',
              name: 'Critical Asset Coverage',
              description: 'Percentage of critical assets included in inventory',
              type: 'security' as const,
              dataSource: 'Asset Management System',
              collectionMethod: 'Automated validation',
              frequency: 'Hourly updates',
              thresholds: {
                normal: { min: 100 },
                warning: { min: 98, max: 99 },
                critical: { max: 97 }
              },
              currentValue: 100,
              trend: 'stable' as const,
              lastUpdated: new Date()
            }
          ],
          alerting: {
            enabled: true,
            channels: ['email', 'slack', 'dashboard'],
            thresholds: { 
              accuracy: 90,
              coverage: 95,
              response_time: 300
            },
            escalation: [
              {
                condition: 'accuracy < 85',
                delay: 15,
                recipients: ['ciso@company.com'],
                actions: ['Generate incident ticket', 'Schedule emergency review']
              }
            ],
            suppression: [
              {
                condition: 'maintenance_window',
                duration: 240,
                reason: 'Scheduled maintenance activities'
              }
            ]
          },
          reporting: {
            dashboards: ['Asset Management Executive Dashboard', 'IT Operations Dashboard'],
            reports: ['Monthly Asset Report', 'Quarterly Compliance Report', 'Annual Security Assessment'],
            schedule: { 
              daily: 'Asset Status Summary',
              weekly: 'Discovery Metrics Report',
              monthly: 'Executive Asset Report'
            },
            recipients: { 
              daily: ['it-ops@company.com'],
              weekly: ['it-director@company.com'],
              monthly: ['executive-team@company.com']
            },
            formats: ['PDF', 'Excel', 'PowerBI Dashboard']
          },
          automation: {
            dataCollection: {
              automated: true,
              sources: ['Lansweeper', 'SCCM', 'Cloud APIs', 'Network Scanners'],
              frequency: 'Continuous with 15-minute updates'
            },
            analysis: {
              automated: true,
              algorithms: ['Asset Classification ML', 'Anomaly Detection', 'Risk Scoring'],
              ml_enabled: true
            },
            response: {
              automated: true,
              actions: [
                {
                  trigger: 'new_asset_detected',
                  action: 'auto_classify_and_notify',
                  parameters: { notify_threshold: 'medium_risk' },
                  approval_required: false,
                  notification: true
                }
              ]
            }
          }
        },
        evidence: ['asset-inventory-q2-2024.xlsx', 'discovery-validation-report.pdf', 'cmdb-audit-results.pdf'],
        policies: ['pol-asset-management', 'pol-data-classification'],
        assets: ['all-organizational-assets'],
        dependencies: [],
        effectiveness: {
          implementationScore: 95,
          operationalScore: 97,
          complianceScore: 98,
          costEffectiveness: 88,
          riskReduction: 85,
          maturityLevel: 4,
          lastMeasured: new Date(2024, 6, 15),
          trend: 'improving' as const,
          benchmarkComparison: {
            industry: 92,
            sector: 89,
            size: 94
          }
        },
        costs: {
          implementation: {
            capital: 75000,
            operational: 25000,
            timeline: '4 months'
          },
          maintenance: {
            annual: 35000,
            resources: ['2 FTE IT Staff', '0.5 FTE Security Analyst', 'Tool licensing']
          },
          testing: {
            frequency: 'quarterly',
            cost: 8000,
            resources: ['Security Team', 'External Auditor']
          },
          training: {
            initial: 15000,
            ongoing: 7500,
            frequency: 'annually'
          }
        },
        risks: [
          {
            id: 'risk-001',
            description: 'Shadow IT assets may remain undiscovered',
            impact: 'medium' as const,
            likelihood: 'medium' as const,
            riskLevel: 'medium' as const,
            mitigation: 'Implement network segmentation monitoring and user education',
            owner: 'IT Security Manager',
            dueDate: new Date(2024, 8, 30),
            status: 'mitigated' as const
          }
        ],
        exceptions: []
      },
      {
        id: 'ctrl-002',
        name: 'Multi-Factor Authentication Implementation',
        description: 'Deploy and enforce multi-factor authentication for all user accounts accessing organizational systems and sensitive data',
        framework: 'nist-csf-v2',
        nistFunction: 'Protect',
        nistCategory: 'Identity Management, Authentication and Access Control',
        nistSubcategory: 'PR.AA-01',
        controlFamily: 'Access Control',
        controlType: 'technical',
        implementationApproach: 'hybrid',
        status: 'in-progress',
        priority: 'critical',
        owner: 'Identity and Access Management Lead',
        implementers: ['IAM Team', 'Security Architecture', 'Help Desk'],
        validators: ['CISO', 'Security Architecture Review Board'],
        lastAssessed: new Date(2024, 6, 1),
        nextAssessment: new Date(2024, 7, 1),
        assessmentFrequency: 'monthly' as AssessmentFrequency,
        implementation: {
          plannedDate: new Date(2024, 8, 31),
          actualDate: undefined,
          method: 'Phased rollout prioritizing privileged accounts, then standard users',
          tools: ['Microsoft Entra ID', 'RSA SecurID', 'Duo Security', 'Hardware tokens'],
          procedures: ['MFA Enrollment Guide', 'Exception Request Process', 'Support Procedures'],
          configuration: { 
            enforced_groups: ['Domain Admins', 'Privileged Users', 'Finance Team'],
            grace_period: '30 days',
            backup_codes: 'enabled',
            trusted_devices: 'limited'
          },
          deployment: {
            scope: ['All Active Directory Users', 'Cloud Applications', 'VPN Access'],
            phases: [
              {
                id: 'phase-mfa-1',
                name: 'Privileged Account MFA',
                description: 'Deploy MFA for all administrative and privileged accounts',
                startDate: new Date(2024, 5, 1),
                endDate: new Date(2024, 6, 15),
                scope: ['Domain Admins', 'Service Accounts', 'Database Admins'],
                prerequisites: ['MFA tool deployment', 'Admin training completed'],
                deliverables: ['100% privileged account coverage', 'Emergency access procedures'],
                status: 'completed' as const
              },
              {
                id: 'phase-mfa-2',
                name: 'Standard User Rollout',
                description: 'Gradual deployment to all standard user accounts',
                startDate: new Date(2024, 6, 15),
                endDate: new Date(2024, 8, 31),
                scope: ['All standard users', 'Contractors', 'Vendors'],
                prerequisites: ['User communication plan', 'Help desk training'],
                deliverables: ['95% user adoption', 'Support documentation'],
                status: 'in-progress' as const
              }
            ],
            rollbackPlan: 'Disable MFA enforcement while maintaining user enrollments for rapid re-enablement'
          },
          validation: {
            criteria: ['100% privileged account coverage', '95% standard user adoption', 'Support ticket volume <5/day'],
            methods: ['Automated enrollment reporting', 'User satisfaction surveys', 'Security testing'],
            results: [
              {
                id: 'val-mfa-001',
                date: new Date(2024, 6, 15),
                validator: 'IAM Security Architect',
                method: 'Automated compliance scan',
                outcome: 'partial' as const,
                findings: ['Privileged accounts: 100%', 'Standard users: 67%', 'Guest accounts: 0%'],
                evidence: ['mfa-compliance-report.pdf', 'enrollment-metrics.xlsx']
              }
            ]
          }
        },
        testing: {
          testPlan: {
            id: 'tp-mfa-002',
            objectives: ['Verify MFA bypass prevention', 'Test emergency access procedures', 'Validate user experience'],
            scope: ['All authentication methods', 'All user types', 'Emergency scenarios'],
            methods: ['Penetration testing', 'Social engineering simulation', 'User acceptance testing'],
            criteria: ['Zero bypass vulnerabilities', 'Emergency access <5 minutes', '90% user satisfaction'],
            responsibilities: { 
              tester: 'External Security Firm', 
              reviewer: 'Security Architecture Team', 
              approver: 'CISO' 
            },
            timeline: 'Monthly security testing with quarterly comprehensive review'
          },
          schedule: {
            frequency: 'monthly' as AssessmentFrequency,
            nextTest: new Date(2024, 7, 15),
            lastTest: new Date(2024, 6, 15),
            plannedTests: [
              {
                id: 'test-mfa-aug-2024',
                scheduledDate: new Date(2024, 7, 15),
                testType: 'security' as const,
                scope: ['Bypass attempts', 'Social engineering', 'Emergency procedures'],
                assignedTo: 'External Penetration Testing Team',
                estimatedDuration: '3 days'
              }
            ]
          },
          results: [
            {
              id: 'test-mfa-jul-2024',
              testDate: new Date(2024, 6, 15),
              testType: 'Security penetration test',
              tester: 'CyberSec Solutions Inc.',
              outcome: 'partial' as const,
              score: 82,
              findings: [
                {
                  type: 'deficiency' as const,
                  severity: 'medium' as const,
                  description: 'SMS-based MFA vulnerable to SIM swapping attacks',
                  remediation: 'Migrate to authenticator app or hardware tokens for critical accounts',
                  dueDate: new Date(2024, 8, 30),
                  assignedTo: 'IAM Team Lead',
                  status: 'in-progress' as const
                }
              ],
              evidence: ['pentest-report-jul-2024.pdf', 'vulnerability-details.xlsx'],
              recommendations: ['Implement FIDO2 tokens', 'Enhanced user training', 'SMS deprecation plan'],
              nextTestDate: new Date(2024, 7, 15)
            }
          ],
          automation: {
            enabled: true,
            tools: ['Azure AD Reports API', 'PowerShell MFA Module', 'Custom monitoring scripts'],
            scripts: ['mfa_compliance_check.ps1', 'enrollment_monitoring.py'],
            schedule: 'Daily compliance checks with real-time alerting',
            alerting: {
              onFailure: true,
              recipients: ['iam-team@company.com', 'security-ops@company.com'],
              escalation: ['security-manager@company.com']
            }
          }
        },
        monitoring: {
          metrics: [
            {
              id: 'metric-mfa-adoption',
              name: 'MFA Adoption Rate',
              description: 'Percentage of eligible users with MFA enabled and configured',
              type: 'security' as const,
              dataSource: 'Microsoft Entra ID + Duo Security',
              collectionMethod: 'API integration with real-time sync',
              frequency: 'Real-time updates every 15 minutes',
              thresholds: {
                normal: { min: 95 },
                warning: { min: 85, max: 94 },
                critical: { max: 84 }
              },
              currentValue: 87,
              trend: 'improving' as const,
              lastUpdated: new Date()
            }
          ],
          alerting: {
            enabled: true,
            channels: ['email', 'teams', 'security-dashboard'],
            thresholds: { 
              adoption: 85,
              failed_attempts: 10,
              bypass_attempts: 1
            },
            escalation: [],
            suppression: []
          },
          reporting: {
            dashboards: ['Identity Security Dashboard', 'Executive Security Metrics'],
            reports: ['Weekly MFA Status', 'Monthly Security Metrics'],
            schedule: { 
              weekly: 'MFA adoption and usage statistics',
              monthly: 'Comprehensive identity security report'
            },
            recipients: { 
              weekly: ['iam-team@company.com'],
              monthly: ['security-leadership@company.com']
            },
            formats: ['PDF Executive Summary', 'Excel Detailed Metrics']
          },
          automation: {
            dataCollection: {
              automated: true,
              sources: ['Azure AD', 'Duo Admin API', 'Authentication Logs'],
              frequency: 'Real-time streaming with 15-minute batching'
            },
            analysis: {
              automated: true,
              algorithms: ['Usage Pattern Analysis', 'Risk Scoring', 'Behavioral Analytics'],
              ml_enabled: true
            },
            response: {
              automated: true,
              actions: [
                {
                  trigger: 'adoption_below_threshold',
                  action: 'notify_user_manager',
                  parameters: { threshold: 85 },
                  approval_required: false,
                  notification: true
                }
              ]
            }
          }
        },
        evidence: ['mfa-policy-v2.pdf', 'enrollment-procedures.docx', 'pentest-results-2024.pdf'],
        policies: ['pol-identity-management', 'pol-access-control'],
        assets: ['active-directory', 'office365', 'vpn-systems'],
        dependencies: [
          {
            dependentControlId: 'ctrl-003',
            dependencyType: 'prerequisite' as const,
            criticality: 'high' as const,
            description: 'Privileged access management requires MFA foundation'
          }
        ],
        effectiveness: {
          implementationScore: 75,
          operationalScore: 82,
          complianceScore: 78,
          costEffectiveness: 85,
          riskReduction: 75,
          maturityLevel: 3,
          lastMeasured: new Date(2024, 6, 1),
          trend: 'improving' as const,
          benchmarkComparison: {
            industry: 68,
            sector: 71,
            size: 76
          }
        },
        costs: {
          implementation: {
            capital: 125000,
            operational: 45000,
            timeline: '6 months'
          },
          maintenance: {
            annual: 65000,
            resources: ['1 FTE IAM Specialist', '0.5 FTE Help Desk', 'Tool licensing', 'Training']
          },
          testing: {
            frequency: 'monthly',
            cost: 12000,
            resources: ['Security Team', 'External Penetration Testers']
          },
          training: {
            initial: 25000,
            ongoing: 15000,
            frequency: 'quarterly'
          }
        },
        risks: [
          {
            id: 'risk-mfa-001',
            description: 'User resistance to MFA adoption may slow deployment',
            impact: 'medium' as const,
            likelihood: 'high' as const,
            riskLevel: 'medium' as const,
            mitigation: 'Comprehensive change management and user training program',
            owner: 'Change Management Lead',
            dueDate: new Date(2024, 7, 31),
            status: 'mitigated' as const
          }
        ],
        exceptions: [
          {
            id: 'exc-mfa-001',
            reason: 'Legacy system incompatibility',
            justification: 'Critical production system cannot support modern authentication',
            approvedBy: 'CISO',
            approvedAt: new Date(2024, 5, 15),
            expirationDate: new Date(2024, 11, 31),
            compensatingControls: ['Network segmentation', 'Enhanced monitoring', 'Quarterly access review'],
            residualRisk: 'Medium - System isolated with additional monitoring',
            reviewSchedule: 'Monthly review with quarterly risk assessment',
            conditions: ['No external network access', 'Dedicated secure network segment']
          }
        ]
      },
      {
        id: 'ctrl-003',
        name: 'Incident Response and Communication',
        description: 'Establish comprehensive incident response capabilities with defined procedures, communication protocols, and recovery processes',
        framework: 'nist-csf-v2',
        nistFunction: 'Respond',
        nistCategory: 'Response Planning',
        nistSubcategory: 'RS.RP-01',
        controlFamily: 'Incident Response',
        controlType: 'administrative',
        implementationApproach: 'manual',
        status: 'implemented',
        priority: 'high',
        owner: 'Incident Response Manager',
        implementers: ['Security Operations Center', 'IT Operations', 'Communications Team'],
        validators: ['CISO', 'Legal Counsel', 'Executive Leadership'],
        lastAssessed: new Date(2024, 5, 20),
        nextAssessment: new Date(2024, 8, 20),
        assessmentFrequency: 'quarterly' as AssessmentFrequency,
        implementation: {
          actualDate: new Date(2024, 3, 30),
          method: 'NIST-based incident response framework with automated tools integration',
          tools: ['Splunk SOAR', 'PagerDuty', 'Slack Enterprise', 'Zoom Enterprise'],
          procedures: ['IR Playbook v3.2', 'Communication Plan', 'Evidence Collection Guide'],
          configuration: { 
            escalation_tiers: '3-tier structure',
            notification_delay: '15 minutes',
            communication_channels: 'multiple-redundant'
          },
          deployment: {
            scope: ['All IT Systems', 'OT Networks', 'Cloud Infrastructure'],
            phases: [],
            rollbackPlan: 'Manual incident coordination with phone tree backup'
          },
          validation: {
            criteria: ['15-minute initial response', '1-hour stakeholder notification', '24-hour preliminary assessment'],
            methods: ['Tabletop exercises', 'Simulated incidents', 'Post-incident reviews'],
            results: []
          }
        },
        testing: {
          testPlan: {
            id: 'tp-ir-003',
            objectives: ['Test response procedures', 'Validate communication protocols', 'Measure response times'],
            scope: ['All incident types', 'All team members', 'External stakeholders'],
            methods: ['Tabletop exercises', 'Red team simulations', 'Communication drills'],
            criteria: ['Response time <15 minutes', 'Communication completeness 100%', 'Coordination effectiveness >90%'],
            responsibilities: { 
              tester: 'Incident Response Team', 
              reviewer: 'Security Manager', 
              approver: 'CISO' 
            },
            timeline: 'Quarterly tabletop with annual full-scale exercise'
          },
          schedule: {
            frequency: 'quarterly' as AssessmentFrequency,
            nextTest: new Date(2024, 8, 15),
            lastTest: new Date(2024, 5, 15),
            plannedTests: []
          },
          results: [
            {
              id: 'test-ir-q2-2024',
              testDate: new Date(2024, 5, 15),
              testType: 'Tabletop exercise - Ransomware scenario',
              tester: 'Incident Response Team',
              outcome: 'pass' as const,
              score: 92,
              findings: [
                {
                  type: 'improvement' as const,
                  severity: 'low' as const,
                  description: 'External communication templates need updates',
                  remediation: 'Update customer notification templates with regulatory requirements',
                  dueDate: new Date(2024, 7, 15),
                  assignedTo: 'Communications Manager',
                  status: 'completed' as const
                }
              ],
              evidence: ['tabletop-exercise-report.pdf', 'participant-feedback.xlsx'],
              recommendations: ['Enhanced automation', 'Additional cross-training'],
              nextTestDate: new Date(2024, 8, 15)
            }
          ],
          automation: {
            enabled: true,
            tools: ['Splunk SOAR', 'Custom Python scripts'],
            scripts: ['incident_classification.py', 'auto_notification.py'],
            schedule: 'Continuous monitoring with automated initial response',
            alerting: {
              onFailure: true,
              recipients: ['soc@company.com'],
              escalation: ['incident-manager@company.com']
            }
          }
        },
        monitoring: {
          metrics: [
            {
              id: 'metric-response-time',
              name: 'Mean Time to Response',
              description: 'Average time from incident detection to initial response',
              type: 'operational' as const,
              dataSource: 'Incident Management System',
              collectionMethod: 'Automated ticket analysis',
              frequency: 'Real-time with hourly aggregation',
              thresholds: {
                normal: { max: 15 },
                warning: { min: 15, max: 30 },
                critical: { min: 30 }
              },
              currentValue: 12,
              trend: 'stable' as const,
              lastUpdated: new Date()
            }
          ],
          alerting: {
            enabled: true,
            channels: ['pagerduty', 'teams', 'sms'],
            thresholds: { response_time: 15 },
            escalation: [],
            suppression: []
          },
          reporting: {
            dashboards: ['SOC Operations Dashboard'],
            reports: ['Monthly Incident Report'],
            schedule: { monthly: 'Incident response metrics and trends' },
            recipients: { monthly: ['security-leadership@company.com'] },
            formats: ['PDF', 'PowerBI']
          },
          automation: {
            dataCollection: {
              automated: true,
              sources: ['Incident Management System', 'SOAR Platform'],
              frequency: 'Real-time'
            },
            analysis: {
              automated: true,
              algorithms: ['Incident Classification', 'Trend Analysis'],
              ml_enabled: false
            },
            response: {
              automated: true,
              actions: []
            }
          }
        },
        evidence: ['incident-response-plan.pdf', 'communication-procedures.docx', 'tabletop-results.pdf'],
        policies: ['pol-incident-response', 'pol-crisis-communication'],
        assets: ['security-tools', 'communication-systems'],
        dependencies: [],
        effectiveness: {
          implementationScore: 92,
          operationalScore: 89,
          complianceScore: 95,
          costEffectiveness: 78,
          riskReduction: 80,
          maturityLevel: 4,
          lastMeasured: new Date(2024, 5, 20),
          trend: 'stable' as const
        },
        costs: {
          implementation: {
            capital: 95000,
            operational: 35000,
            timeline: '5 months'
          },
          maintenance: {
            annual: 55000,
            resources: ['1.5 FTE SOC Analysts', 'Tool subscriptions', 'Training']
          },
          testing: {
            frequency: 'quarterly',
            cost: 15000,
            resources: ['Internal Team', 'External Facilitator']
          },
          training: {
            initial: 20000,
            ongoing: 12000,
            frequency: 'quarterly'
          }
        },
        risks: [],
        exceptions: []
      }
    ];

    setControls(mockControls);
  }, []);

  useEffect(() => {
    if (editingControl) {
      setFormData({
        controlId: editingControl.controlId || editingControl.nistSubcategory,
        name: editingControl.name,
        description: editingControl.description,
        nistFunction: editingControl.nistFunction,
        nistCategory: editingControl.nistCategory,
        nistSubcategory: editingControl.nistSubcategory,
        status: editingControl.status,
        priority: editingControl.priority,
        owner: editingControl.owner,
        controlType: editingControl.controlType,
        implementationApproach: editingControl.implementationApproach
      });
    } else {
      setFormData({
        controlId: '',
        name: '',
        description: '',
        nistFunction: 'Identify',
        nistCategory: '',
        nistSubcategory: '',
        status: 'not-implemented',
        priority: 'medium',
        owner: '',
        controlType: 'administrative',
        implementationApproach: 'manual'
      });
    }
  }, [editingControl]);

  const filteredControls = controls.filter(control => {
    const matchesSearch = control.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         control.controlId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         control.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFunction = filterFunction === 'all' || control.nistFunction === filterFunction;
    const matchesStatus = filterStatus === 'all' || control.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || control.priority === filterPriority;
    
    return matchesSearch && matchesFunction && matchesStatus && matchesPriority;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'implemented':
        return <CheckCircle className="w-5 h-5 text-blue-500" />;
      case 'in-progress':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'planned':
        return <Calendar className="w-5 h-5 text-purple-500" />;
      case 'not-implemented':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'under-review':
        return <Eye className="w-5 h-5 text-orange-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational':
        return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border-green-200 dark:border-green-800';
      case 'implemented':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-800';
      case 'in-progress':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800';
      case 'planned':
        return 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 border-purple-200 dark:border-purple-800';
      case 'not-implemented':
        return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 border-red-200 dark:border-red-800';
      case 'under-review':
        return 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 border-orange-200 dark:border-orange-800';
      default:
        return 'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-800';
    }
  };

  const getFunctionColor = (func: string) => {
    switch (func) {
      case 'Govern':
        return 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300';
      case 'Identify':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300';
      case 'Protect':
        return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300';
      case 'Detect':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300';
      case 'Respond':
        return 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300';
      case 'Recover':
        return 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300';
      default:
        return 'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'text-red-600 dark:text-red-400';
      case 'high':
        return 'text-orange-600 dark:text-orange-400';
      case 'medium':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'low':
        return 'text-green-600 dark:text-green-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  const getEffectivenessColor = (score: number) => {
    if (score >= 90) return 'text-green-600 dark:text-green-400';
    if (score >= 75) return 'text-blue-600 dark:text-blue-400';
    if (score >= 60) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'declining':
        return <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />;
      default:
        return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  const handleCreateControl = () => {
    setEditingControl(null);
    setShowCreateForm(true);
  };

  const handleEditControl = (control: any) => {
    setEditingControl(control);
    setShowCreateForm(true);
  };

  const handleSaveControl = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.description.trim() || !formData.controlId.trim()) {
      addNotification('error', 'Control ID, name, and description are required');
      return;
    }

    const controlData: any = {
      id: editingControl?.id || `ctrl-${Date.now()}`,
      controlId: formData.controlId,
      name: formData.name,
      description: formData.description,
      framework: 'nist-csf-v2',
      nistFunction: formData.nistFunction,
      nistCategory: formData.nistCategory,
      nistSubcategory: formData.nistSubcategory,
      controlFamily: formData.nistCategory,
      controlType: formData.controlType,
      implementationApproach: formData.implementationApproach,
      status: formData.status,
      priority: formData.priority,
      owner: formData.owner,
      implementers: [],
      validators: [],
      lastAssessed: new Date(),
      nextAssessment: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      assessmentFrequency: 'quarterly' as AssessmentFrequency,
      // Add other required fields with defaults
      implementation: {
        method: 'To be defined',
        tools: [],
        procedures: [],
        configuration: {},
        deployment: { scope: [], phases: [], rollbackPlan: '' },
        validation: { criteria: [], methods: [], results: [] }
      },
      testing: {
        testPlan: {
          id: `tp-${Date.now()}`,
          objectives: [],
          scope: [],
          methods: [],
          criteria: [],
          responsibilities: {},
          timeline: ''
        },
        schedule: {
          frequency: 'quarterly' as AssessmentFrequency,
          nextTest: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
          plannedTests: []
        },
        results: [],
        automation: {
          enabled: false,
          tools: [],
          scripts: [],
          schedule: 'manual',
          alerting: { onFailure: false, recipients: [], escalation: [] }
        }
      },
      monitoring: {
        metrics: [],
        alerting: {
          enabled: false,
          channels: [],
          thresholds: {},
          escalation: [],
          suppression: []
        },
        reporting: {
          dashboards: [],
          reports: [],
          schedule: {},
          recipients: {},
          formats: []
        },
        automation: {
          dataCollection: { automated: false, sources: [], frequency: 'manual' },
          analysis: { automated: false, algorithms: [], ml_enabled: false },
          response: { automated: false, actions: [] }
        }
      },
      evidence: [],
      policies: [],
      assets: [],
      dependencies: [],
      effectiveness: {
        implementationScore: 0,
        operationalScore: 0,
        complianceScore: 0,
        costEffectiveness: 0,
        riskReduction: 0,
        maturityLevel: 1,
        lastMeasured: new Date(),
        trend: 'stable' as const
      },
      costs: {
        implementation: { capital: 0, operational: 0, timeline: 'TBD' },
        maintenance: { annual: 0, resources: [] },
        testing: { frequency: 'quarterly', cost: 0, resources: [] },
        training: { initial: 0, ongoing: 0, frequency: 'annually' }
      },
      risks: [],
      exceptions: []
    };

    if (editingControl) {
      setControls(prev => prev.map(c => c.id === editingControl.id ? controlData : c));
      addNotification('success', 'Control updated successfully');
    } else {
      setControls(prev => [...prev, controlData]);
      addNotification('success', 'Control created successfully');
    }

    setShowCreateForm(false);
    setEditingControl(null);
  };

  const handleDeleteControl = (controlId: string) => {
    if (window.confirm('Are you sure you want to delete this control?')) {
      setControls(prev => prev.filter(c => c.id !== controlId));
      addNotification('success', 'Control deleted successfully');
    }
  };

  const handleViewControl = (control: any) => {
    addNotification('info', `Viewing control details: ${control.controlId}`);
  };

  const handleExportControls = () => {
    const dataStr = JSON.stringify(controls, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `nist-controls-export-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    addNotification('success', 'Controls exported successfully');
  };

  const handleImportControls = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const importedControls = JSON.parse(event.target?.result as string);
            if (Array.isArray(importedControls)) {
              setControls(prev => [...prev, ...importedControls]);
              addNotification('success', `Imported ${importedControls.length} controls`);
            } else {
              addNotification('error', 'Invalid file format');
            }
          } catch (error) {
            addNotification('error', 'Failed to parse file');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const functions = ['all', 'Govern', 'Identify', 'Protect', 'Detect', 'Respond', 'Recover'];
  const statuses = ['all', 'not-implemented', 'planned', 'in-progress', 'implemented', 'operational', 'under-review'];
  const priorities = ['all', 'low', 'medium', 'high', 'critical'];

  // Enhanced statistics
  const stats = {
    total: controls.length,
    operational: controls.filter(c => c.status === 'operational').length,
    implemented: controls.filter(c => c.status === 'implemented').length,
    inProgress: controls.filter(c => c.status === 'in-progress').length,
    notImplemented: controls.filter(c => c.status === 'not-implemented').length,
    avgEffectiveness: controls.length > 0 ? Math.round(controls.reduce((sum, c) => sum + c.effectiveness.implementationScore, 0) / controls.length) : 0,
    highPriority: controls.filter(c => c.priority === 'critical' || c.priority === 'high').length,
    costEffectiveControls: controls.filter(c => c.effectiveness.costEffectiveness >= 80).length
  };

  const implementationPercentage = controls.length > 0 ? Math.round(((stats.operational + stats.implemented) / controls.length) * 100) : 0;

  // Chart data for function distribution
  const functionDistribution = controls.reduce((acc, control) => {
    acc[control.nistFunction] = (acc[control.nistFunction] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const effectivenessDistribution = controls.reduce((acc, control) => {
    const score = control.effectiveness.implementationScore;
    const range = score >= 90 ? 'Excellent (90-100%)' :
                  score >= 75 ? 'Good (75-89%)' :
                  score >= 60 ? 'Fair (60-74%)' : 'Poor (<60%)';
    acc[range] = (acc[range] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Breadcrumbs items={breadcrumbs} />
      </div>

      {/* Breadcrumbs */}
      <div className="mb-6">
        {/* Breadcrumbs component would go here */}
      </div>

      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl shadow-xl border border-blue-200 dark:border-blue-800 mb-8">
        <div className="p-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <button
                onClick={onBack}
                className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-2 rounded-lg hover:bg-white/50 dark:hover:bg-gray-800/50"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Dashboard</span>
              </button>
              <div className="h-8 w-px bg-blue-200 dark:bg-blue-700" />
              <div className="flex items-center space-x-4">
                <div className="p-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg">
                  <Shield className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-blue-900 dark:text-blue-100">
                    NIST CSF v2.0 Controls Management
                  </h1>
                  <p className="text-blue-700 dark:text-blue-300 text-lg">
                    Monitor, implement, and optimize security controls across all framework functions
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{implementationPercentage}%</div>
                <div className="text-sm text-blue-700 dark:text-blue-300">Implementation Rate</div>
              </div>
              
              <button
                onClick={() => setAutoRefresh(!autoRefresh)}
                className={`p-2 rounded-lg transition-colors ${autoRefresh 
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}
                title={autoRefresh ? 'Auto-refresh enabled' : 'Auto-refresh disabled'}
              >
                <RefreshCw className={`w-5 h-5 ${autoRefresh ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Statistics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Controls</p>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                {stats.total}
              </p>
              <div className="flex items-center space-x-1 mt-1">
                <Globe className="w-4 h-4 text-blue-500" />
                <span className="text-xs text-blue-600 dark:text-blue-400">NIST CSF v2.0</span>
              </div>
            </div>
            <Shield className="w-10 h-10 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Operational</p>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform">
                {stats.operational}
              </p>
              <div className="flex items-center space-x-1 mt-1">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-xs text-green-600 dark:text-green-400">Fully operational</span>
              </div>
            </div>
            <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">In Progress</p>
              <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 group-hover:scale-110 transition-transform">
                {stats.inProgress}
              </p>
              <div className="flex items-center space-x-1 mt-1">
                <Clock className="w-4 h-4 text-yellow-500" />
                <span className="text-xs text-yellow-600 dark:text-yellow-400">Active deployment</span>
              </div>
            </div>
            <Clock className="w-10 h-10 text-yellow-600 dark:text-yellow-400 group-hover:scale-110 transition-transform" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">High Priority</p>
              <p className="text-3xl font-bold text-red-600 dark:text-red-400 group-hover:scale-110 transition-transform">
                {stats.highPriority}
              </p>
              <div className="flex items-center space-x-1 mt-1">
                <Flag className="w-4 h-4 text-red-500" />
                <span className="text-xs text-red-600 dark:text-red-400">Requires attention</span>
              </div>
            </div>
            <Flag className="w-10 h-10 text-red-600 dark:text-red-400 group-hover:scale-110 transition-transform" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Effectiveness</p>
              <p className={`text-3xl font-bold group-hover:scale-110 transition-transform ${getEffectivenessColor(stats.avgEffectiveness)}`}>
                {stats.avgEffectiveness}%
              </p>
              <div className="flex items-center space-x-1 mt-1">
                <Award className="w-4 h-4 text-purple-500" />
                <span className="text-xs text-purple-600 dark:text-purple-400">Performance rating</span>
              </div>
            </div>
            <Award className="w-10 h-10 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform" />
          </div>
        </div>
      </div>

      {/* Implementation Progress and Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Overall Implementation Progress */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
              <BarChart3 className="w-6 h-6 mr-3 text-blue-600 dark:text-blue-400" />
              Implementation Progress
            </h3>
            <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">{implementationPercentage}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 mb-6">
            <div
              className="bg-gradient-to-r from-blue-500 to-green-500 h-4 rounded-full transition-all duration-500 shadow-sm"
              style={{ width: `${implementationPercentage}%` }}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="text-lg font-bold text-green-600 dark:text-green-400">
                {stats.operational + stats.implemented}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-300">Implemented</div>
            </div>
            <div className="text-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <div className="text-lg font-bold text-yellow-600 dark:text-yellow-400">
                {stats.inProgress}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-300">In Progress</div>
            </div>
          </div>
        </div>

        {/* Function Distribution Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
            <PieChart className="w-6 h-6 mr-3 text-purple-600 dark:text-purple-400" />
            Controls by NIST Function
          </h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <p className="text-gray-500 dark:text-gray-400">Chart visualization would go here</p>
          </div>
        </div>
      </div>

      {/* Enhanced Search and Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 mb-8 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 mb-6">
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search controls by name, ID, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              {(['grid', 'list', 'kanban'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                    viewMode === mode
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={handleImportControls}
                className="flex items-center space-x-2 px-4 py-3 text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <Upload className="w-4 h-4" />
                <span>Import</span>
              </button>
              <button
                onClick={handleExportControls}
                className="flex items-center space-x-2 px-4 py-3 text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
              <button
                onClick={handleCreateControl}
                className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl font-medium"
              >
                <Plus className="w-4 h-4" />
                <span>Add Control</span>
              </button>
            </div>
          </div>
        </div>

        {/* Advanced Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <select
            value={filterFunction}
            onChange={(e) => setFilterFunction(e.target.value)}
            className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All NIST Functions</option>
            {functions.slice(1).map(func => (
              <option key={func} value={func}>{func}</option>
            ))}
          </select>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Implementation Status</option>
            {statuses.slice(1).map(status => (
              <option key={status} value={status}>
                {status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </option>
            ))}
          </select>
          
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Priority Levels</option>
            {priorities.slice(1).map(priority => (
              <option key={priority} value={priority}>
                {priority.charAt(0).toUpperCase() + priority.slice(1)} Priority
              </option>
            ))}
          </select>
          
          <button
            onClick={() => {
              setFilterFunction('all');
              setFilterStatus('all');
              setFilterPriority('all');
              setSearchTerm('');
            }}
            className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Enhanced Controls Display */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
              <Activity className="w-6 h-6 mr-3 text-blue-600 dark:text-blue-400" />
              Security Controls ({filteredControls.length})
            </h2>
            <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
              <span>{stats.operational} operational</span>
              <span>•</span>
              <span>{stats.inProgress} in progress</span>
              <span>•</span>
              <span>{stats.notImplemented} not implemented</span>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          {filteredControls.length === 0 ? (
            <div className="text-center py-16">
              <Shield className="w-20 h-20 text-gray-400 mx-auto mb-6" />
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3">
                No Controls Found
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {controls.length === 0 
                  ? 'Start by adding your first security control'
                  : 'Try adjusting your search criteria or filters'
                }
              </p>
              {controls.length === 0 && (
                <button
                  onClick={handleCreateControl}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add First Control
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {filteredControls.map((control) => (
                <div key={control.id} className="border border-gray-200 dark:border-gray-700 rounded-xl p-8 hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-gray-50/50 to-blue-50/30 dark:from-gray-800/50 dark:to-blue-900/10">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-3">
                        {getStatusIcon(control.status)}
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                            {control.controlId}: {control.name}
                          </h3>
                          <div className="flex items-center space-x-3 mt-2">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(control.status)}`}>
                              {control.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getFunctionColor(control.nistFunction)}`}>
                              {control.nistFunction}
                            </span>
                            <span className={`text-sm font-bold ${getPriorityColor(control.priority)}`}>
                              {control.priority.toUpperCase()} PRIORITY
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6">
                        {control.description}
                      </p>
                    </div>
                    
                    <div className="text-right ml-6">
                      <div className="mb-4">
                        <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 flex items-center">
                          {control.effectiveness.maturityLevel}
                          <Star className="w-6 h-6 ml-1" />
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">Maturity Level</div>
                      </div>
                      <div className="flex items-center justify-end">
                        {getTrendIcon(control.effectiveness.trend)}
                        <span className="text-sm text-gray-600 dark:text-gray-300 ml-1 capitalize">
                          {control.effectiveness.trend}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Detailed Information Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
                    <div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">Category</span>
                      <div className="font-medium text-gray-900 dark:text-white">{control.nistCategory}</div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">Subcategory</span>
                      <div className="font-medium text-gray-900 dark:text-white">{control.nistSubcategory}</div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">Owner</span>
                      <div className="font-medium text-gray-900 dark:text-white">{control.owner}</div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">Next Assessment</span>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {control.nextAssessment.toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  
                  {/* Effectiveness Metrics */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                      <div className={`text-2xl font-bold ${getEffectivenessColor(control.effectiveness.implementationScore)}`}>
                        {control.effectiveness.implementationScore}%
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-300 mt-1">Implementation</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                      <div className={`text-2xl font-bold ${getEffectivenessColor(control.effectiveness.operationalScore)}`}>
                        {control.effectiveness.operationalScore}%
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-300 mt-1">Operational</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
                      <div className={`text-2xl font-bold ${getEffectivenessColor(control.effectiveness.complianceScore)}`}>
                        {control.effectiveness.complianceScore}%
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-300 mt-1">Compliance</div>
                    </div>
                    <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl border border-orange-200 dark:border-orange-800">
                      <div className={`text-2xl font-bold ${getEffectivenessColor(control.effectiveness.riskReduction)}`}>
                        {control.effectiveness.riskReduction}%
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-300 mt-1">Risk Reduction</div>
                    </div>
                  </div>

                  {/* Expandable Details */}
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                    <button
                      onClick={() => setExpandedControl(expandedControl === control.id ? null : control.id)}
                      className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors mb-4"
                    >
                      {expandedControl === control.id ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                      <span className="font-medium">View Detailed Information</span>
                    </button>

                    {expandedControl === control.id && (
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
                        {/* Implementation Details */}
                        <div className="space-y-6">
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                              <Settings className="w-5 h-5 mr-2 text-blue-500" />
                              Implementation Details
                            </h4>
                            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 space-y-3">
                              <div>
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Method:</span>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{control.implementation.method}</p>
                              </div>
                              <div>
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Tools:</span>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {control.implementation.tools.map((tool: string, index: number) => (
                                    <span key={index} className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs rounded">
                                      {tool}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Monitoring Metrics */}
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                              <Gauge className="w-5 h-5 mr-2 text-green-500" />
                              Live Monitoring
                            </h4>
                            <div className="space-y-3">
                              {control.monitoring.metrics.map((metric: any, index: number) => (
                                <div key={index} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                      {metric.name}
                                    </span>
                                    <div className="flex items-center space-x-2">
                                      <span className={`text-lg font-bold ${getEffectivenessColor(metric.currentValue)}`}>
                                        {metric.currentValue}%
                                      </span>
                                      {getTrendIcon(metric.trend)}
                                    </div>
                                  </div>
                                  <p className="text-xs text-gray-600 dark:text-gray-400">{metric.description}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Testing and Validation */}
                        <div className="space-y-6">
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                              <Target className="w-5 h-5 mr-2 text-purple-500" />
                              Testing Results
                            </h4>
                            <div className="space-y-3">
                              {control.testing.results.slice(0, 2).map((result: any, index: number) => (
                                <div key={index} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                      {result.testType}
                                    </span>
                                    <div className="flex items-center space-x-2">
                                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                                        result.outcome === 'pass' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' :
                                        result.outcome === 'partial' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300' :
                                        'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
                                      }`}>
                                        {result.outcome}
                                      </span>
                                      {result.score && (
                                        <span className="text-sm font-bold text-gray-900 dark:text-white">
                                          {result.score}%
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                  <p className="text-xs text-gray-600 dark:text-gray-400">
                                    {result.testDate.toLocaleDateString()} • {result.tester}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Cost Information */}
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                              <DollarSign className="w-5 h-5 mr-2 text-green-500" />
                              Cost Analysis
                            </h4>
                            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <span className="text-gray-600 dark:text-gray-300">Implementation:</span>
                                  <div className="font-bold text-gray-900 dark:text-white">
                                    ${control.costs.implementation.capital.toLocaleString()}
                                  </div>
                                </div>
                                <div>
                                  <span className="text-gray-600 dark:text-gray-300">Annual Maintenance:</span>
                                  <div className="font-bold text-gray-900 dark:text-white">
                                    ${control.costs.maintenance.annual.toLocaleString()}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
                      <button
                        onClick={() => handleViewControl(control)}
                        className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                      >
                        <Eye className="w-4 h-4" />
                        <span>View Details</span>
                      </button>
                      
                      <button
                        onClick={() => addNotification('info', 'Control testing initiated')}
                        className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium"
                      >
                        <CheckCircle className="w-4 h-4" />
                        <span>Test Control</span>
                      </button>
                      
                      <button
                        onClick={() => handleEditControl(control)}
                        className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors font-medium"
                      >
                        <Edit3 className="w-4 h-4" />
                        <span>Edit</span>
                      </button>
                      
                      <button
                        onClick={() => addNotification('info', 'Monitoring dashboard opened')}
                        className="flex items-center space-x-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
                      >
                        <BarChart3 className="w-4 h-4" />
                        <span>Monitor</span>
                      </button>
                      
                      <button
                        onClick={() => addNotification('info', 'Evidence collection opened')}
                        className="flex items-center space-x-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
                      >
                        <FileText className="w-4 h-4" />
                        <span>Evidence</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Control Form Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200 dark:border-gray-700 mx-4">
            <div className="flex items-center space-x-3 mb-6">
              <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {editingControl ? 'Edit Security Control' : 'Add New Security Control'}
              </h3>
            </div>
            
            <div onSubmit={handleSaveControl} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Control ID *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.controlId}
                    onChange={(e) => setFormData(prev => ({ ...prev, controlId: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., ID.AM-01, PR.AA-01"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    NIST Function *
                  </label>
                  <select
                    required
                    value={formData.nistFunction}
                    onChange={(e) => setFormData(prev => ({ ...prev, nistFunction: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {functions.slice(1).map(func => (
                      <option key={func} value={func}>{func}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Control Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter descriptive control name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description *
                </label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Describe the control objective, implementation approach, and expected outcomes"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    NIST Category
                  </label>
                  <input
                    type="text"
                    value={formData.nistCategory}
                    onChange={(e) => setFormData(prev => ({ ...prev, nistCategory: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Asset Management, Identity Management"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    NIST Subcategory
                  </label>
                  <input
                    type="text"
                    value={formData.nistSubcategory}
                    onChange={(e) => setFormData(prev => ({ ...prev, nistSubcategory: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., ID.AM-01, PR.AA-01"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Implementation Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as ControlStatus }))}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {statuses.slice(1).map(status => (
                      <option key={status} value={status}>
                        {status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Priority Level
                  </label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value as any }))}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {priorities.slice(1).map(priority => (
                      <option key={priority} value={priority}>
                        {priority.charAt(0).toUpperCase() + priority.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Control Type
                  </label>
                  <select
                    value={formData.controlType}
                    onChange={(e) => setFormData(prev => ({ ...prev, controlType: e.target.value as ControlType }))}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="preventive">Preventive</option>
                    <option value="detective">Detective</option>
                    <option value="corrective">Corrective</option>
                    <option value="deterrent">Deterrent</option>
                    <option value="compensating">Compensating</option>
                    <option value="administrative">Administrative</option>
                    <option value="technical">Technical</option>
                    <option value="physical">Physical</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Control Owner *
                </label>
                <input
                  type="text"
                  required
                  value={formData.owner}
                  onChange={(e) => setFormData(prev => ({ ...prev, owner: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Person or team responsible for this control"
                />
              </div>
              
              <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateForm(false);
                    setEditingControl(null);
                  }}
                  className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={handleSaveControl}
                  className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium shadow-lg"
                >
                  {editingControl ? 'Update Control' : 'Create Control'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};