 import { Framework } from '../../types';

export const cmmcFramework: Framework = {
  id: 'cmmc', name: 'CMMC (Cybersecurity Maturity Model Certification)', description: 'Department of Defense cybersecurity standard for contractors', version: '2.0', complexity: 'advanced', estimatedTime: 240, industry: ['Government', 'Defense'], maturityLevels: [
    { level: 1, name: 'Foundational', description: 'Basic cyber hygiene', color: '#22c55e', minScore: 0, maxScore: 50 },
    { level: 2, name: 'Advanced', description: 'Intermediate cyber hygiene', color: '#eab308', minScore: 51, maxScore: 80 },
    { level: 3, name: 'Expert', description: 'Advanced/progressive cybersecurity', color: '#3b82f6', minScore: 81, maxScore: 100 }
  ], sections: [
    {
      id: 'access-control', name: 'Access Control (AC)', description: 'Limit information system access to authorized users, processes, and devices', weight: 20, priority: 'high', categories: [
        {
          id: 'access-control', name: 'Access Control', description: 'Control access to systems and information', weight: 100, questions: [
            {
              id: 'cmmc.ac.3.1.1', text: 'Limit system access to authorized users, processes acting on behalf of authorized users, and devices (including other systems).', guidance: 'Access control policies control access between active entities or subjects and passive entities or objects in systems.', priority: 'high', references: ['3.1.1'], examples: ['User access controls', 'Authentication systems', 'Authorization mechanisms', 'Access reviews'], options: [
                { value: 0, label: 'Not implemented', description: 'No access controls in place' },
                { value: 1, label: 'Partially implemented', description: 'Basic access controls for some systems' },
                { value: 2, label: 'Largely implemented', description: 'Comprehensive access controls with some gaps' },
                { value: 3, label: 'Fully implemented', description: 'Complete access control framework' }
              ]
            },
            {
              id: 'cmmc.ac.3.1.2', text: 'Limit system access to the types of transactions and functions that authorized users are permitted to execute.', guidance: 'Organizations may choose to define access privileges or other attributes by account, by type of account, or a combination of both.', priority: 'high', references: ['3.1.2'], examples: ['Role-based access control', 'Function-based restrictions', 'Transaction controls', 'Privilege management'], options: [
                { value: 0, label: 'Not implemented', description: 'No transaction/function restrictions' },
                { value: 1, label: 'Partially implemented', description: 'Basic restrictions for some functions' },
                { value: 2, label: 'Largely implemented', description: 'Most transactions properly restricted' },
                { value: 3, label: 'Fully implemented', description: 'Complete transaction and function controls' }
              ]
            },
            {
              id: 'cmmc.ac.3.1.3', text: 'Control the flow of CUI in accordance with approved authorizations.', guidance: 'Information flow control regulates where information can travel within a system and between systems.', priority: 'high', references: ['3.1.3'], examples: ['Information flow controls', 'Data flow restrictions', 'Network segmentation', 'Content filtering'], options: [
                { value: 0, label: 'Not implemented', description: 'No information flow controls' },
                { value: 1, label: 'Partially implemented', description: 'Basic flow controls for some data' },
                { value: 2, label: 'Largely implemented', description: 'Most information flows controlled' },
                { value: 3, label: 'Fully implemented', description: 'Complete information flow control' }
              ]
            },
            {
              id: 'cmmc.ac.3.1.4', text: 'Separate the duties of individuals to reduce the risk of malevolent activity without collusion.', guidance: 'Separation of duties addresses the potential for abuse of authorized privileges and helps to reduce the risk of malevolent activity.', priority: 'medium', references: ['3.1.4'], examples: ['Segregation of duties', 'Dual approval processes', 'Role separation', 'Check and balance controls'], options: [
                { value: 0, label: 'Not implemented', description: 'No separation of duties' },
                { value: 1, label: 'Partially implemented', description: 'Basic separation for critical functions' },
                { value: 2, label: 'Largely implemented', description: 'Most duties properly separated' },
                { value: 3, label: 'Fully implemented', description: 'Complete separation of duties framework' }
              ]
            },
            {
              id: 'cmmc.ac.3.1.5', text: 'Employ the principle of least privilege, including for specific security functions and privileged accounts.', guidance: 'Organizations employ the principle of least privilege for specific duties and authorized accesses for users and processes.', priority: 'high', references: ['3.1.5'], examples: ['Least privilege access', 'Privilege escalation controls', 'Administrative access restrictions', 'Just-in-time access'], options: [
                { value: 0, label: 'Not implemented', description: 'No least privilege controls' },
                { value: 1, label: 'Partially implemented', description: 'Basic least privilege for some accounts' },
                { value: 2, label: 'Largely implemented', description: 'Most accounts follow least privilege' },
                { value: 3, label: 'Fully implemented', description: 'Complete least privilege implementation' }
              ]
            },
            {
              id: 'cmmc.ac.3.1.6', text: 'Use non-privileged accounts or roles when accessing nonsecurity functions.', guidance: 'This requirement limits exposure when operating from within privileged accounts or roles.', priority: 'high', references: ['3.1.6'], examples: ['Standard user accounts', 'Role-based access', 'Administrative separation', 'Account switching'], options: [
                { value: 0, label: 'Not implemented', description: 'Users operate with privileged accounts' },
                { value: 1, label: 'Partially implemented', description: 'Some users use non-privileged accounts' },
                { value: 2, label: 'Largely implemented', description: 'Most users operate with standard accounts' },
                { value: 3, label: 'Fully implemented', description: 'Complete separation of privileged/non-privileged use' }
              ]
            },
            {
              id: 'cmmc.ac.3.1.7', text: 'Prevent non-privileged users from executing privileged functions and capture the execution of such functions in audit logs.', guidance: 'Privileged functions include establishing system accounts, performing system integrity checks, conducting patching operations.', priority: 'high', references: ['3.1.7'], examples: ['Privilege enforcement', 'Function restrictions', 'Privileged activity logging', 'Access controls'], options: [
                { value: 0, label: 'Not implemented', description: 'No privileged function restrictions' },
                { value: 1, label: 'Partially implemented', description: 'Basic restrictions and some logging' },
                { value: 2, label: 'Largely implemented', description: 'Most privileged functions restricted and logged' },
                { value: 3, label: 'Fully implemented', description: 'Complete privileged function control and logging' }
              ]
            },
            {
              id: 'cmmc.ac.3.1.8', text: 'Limit unsuccessful logon attempts.', guidance: 'Due to the potential for denial of service, automatic lockouts are typically temporary and automatically release after a predetermined period.', priority: 'medium', references: ['3.1.8'], examples: ['Account lockout policies', 'Failed login thresholds', 'Delay algorithms', 'Lockout duration'], options: [
                { value: 0, label: 'Not implemented', description: 'No failed logon attempt limits' },
                { value: 1, label: 'Partially implemented', description: 'Basic lockout for some systems' },
                { value: 2, label: 'Largely implemented', description: 'Lockout policies on most systems' },
                { value: 3, label: 'Fully implemented', description: 'Complete failed logon attempt management' }
              ]
            },
            {
              id: 'cmmc.ac.3.1.9', text: 'Provide privacy and security notices consistent with applicable CUI rules.', guidance: 'System use notifications can be implemented using messages or warning banners displayed before individuals log in.', priority: 'low', references: ['3.1.9'], examples: ['Login banners', 'Security notices', 'Privacy warnings', 'Usage agreements'], options: [
                { value: 0, label: 'Not implemented', description: 'No system use notifications' },
                { value: 1, label: 'Partially implemented', description: 'Basic notices on some systems' },
                { value: 2, label: 'Largely implemented', description: 'Notices on most systems' },
                { value: 3, label: 'Fully implemented', description: 'Comprehensive system use notifications' }
              ]
            },
            {
              id: 'cmmc.ac.3.1.10', text: 'Use session lock with pattern-hiding displays to prevent access and viewing of data after a period of inactivity.', guidance: 'Session locks are temporary actions taken when users stop work and move away from the immediate vicinity of the system.', priority: 'medium', references: ['3.1.10'], examples: ['Screen savers', 'Session timeouts', 'Auto-lock', 'Pattern hiding displays'], options: [
                { value: 0, label: 'Not implemented', description: 'No session lock controls' },
                { value: 1, label: 'Partially implemented', description: 'Basic session locks on some systems' },
                { value: 2, label: 'Largely implemented', description: 'Session locks with pattern hiding on most systems' },
                { value: 3, label: 'Fully implemented', description: 'Complete session lock implementation' }
              ]
            },
            {
              id: 'cmmc.ac.3.1.11', text: 'Terminate (automatically) a user session after a defined condition.', guidance: 'This requirement addresses the termination of user-initiated logical sessions in contrast to network connections.', priority: 'medium', references: ['3.1.11'], examples: ['Session timeouts', 'Automatic logoff', 'Inactivity termination', 'Time-based restrictions'], options: [
                { value: 0, label: 'Not implemented', description: 'No automatic session termination' },
                { value: 1, label: 'Partially implemented', description: 'Basic session termination on some systems' },
                { value: 2, label: 'Largely implemented', description: 'Automatic termination on most systems' },
                { value: 3, label: 'Fully implemented', description: 'Complete session termination management' }
              ]
            },
            {
              id: 'cmmc.ac.3.1.12', text: 'Monitor and control remote access sessions.', guidance: 'Automated monitoring and control of remote access sessions allows organizations to detect cyber-attacks.', priority: 'high', references: ['3.1.12'], examples: ['Remote access monitoring', 'VPN controls', 'Session tracking', 'Access auditing'], options: [
                { value: 0, label: 'Not implemented', description: 'No remote access monitoring' },
                { value: 1, label: 'Partially implemented', description: 'Basic monitoring of some remote access' },
                { value: 2, label: 'Largely implemented', description: 'Most remote access monitored and controlled' },
                { value: 3, label: 'Fully implemented', description: 'Complete remote access monitoring and control' }
              ]
            },
            {
              id: 'cmmc.ac.3.1.13', text: 'Employ cryptographic mechanisms to protect the confidentiality of remote access sessions.', guidance: 'Cryptographic standards include FIPS-validated cryptography and NSA-approved cryptography.', priority: 'high', references: ['3.1.13'], examples: ['VPN encryption', 'Secure protocols', 'Encrypted tunnels', 'Cryptographic protection'], options: [
                { value: 0, label: 'Not implemented', description: 'No encryption for remote access' },
                { value: 1, label: 'Partially implemented', description: 'Basic encryption for some remote access' },
                { value: 2, label: 'Largely implemented', description: 'Most remote access properly encrypted' },
                { value: 3, label: 'Fully implemented', description: 'Complete remote access encryption' }
              ]
            },
            {
              id: 'cmmc.ac.3.1.14', text: 'Route remote access via managed access control points.', guidance: 'Routing remote access through managed access control points enhances explicit, organizational control over such connections.', priority: 'medium', references: ['3.1.14'], examples: ['VPN gateways', 'Remote access servers', 'Managed endpoints', 'Centralized access points'], options: [
                { value: 0, label: 'Not implemented', description: 'No managed access control points' },
                { value: 1, label: 'Partially implemented', description: 'Some remote access through managed points' },
                { value: 2, label: 'Largely implemented', description: 'Most remote access via managed points' },
                { value: 3, label: 'Fully implemented', description: 'All remote access through managed control points' }
              ]
            },
            {
              id: 'cmmc.ac.3.1.15', text: 'Authorize remote execution of privileged commands and remote access to security-relevant information.', guidance: 'Controlling such access from remote locations helps to ensure that unauthorized individuals are not able to execute such commands.', priority: 'high', references: ['3.1.15'], examples: ['Remote admin authorization', 'Privileged command controls', 'Security function access', 'Remote management'], options: [
                { value: 0, label: 'Not implemented', description: 'No authorization for remote privileged access' },
                { value: 1, label: 'Partially implemented', description: 'Basic authorization for some remote privileged functions' },
                { value: 2, label: 'Largely implemented', description: 'Most remote privileged access authorized' },
                { value: 3, label: 'Fully implemented', description: 'Complete authorization for remote privileged access' }
              ]
            },
            {
              id: 'cmmc.ac.3.1.16', text: 'Authorize wireless access prior to allowing such connections.', guidance: 'Establishing usage restrictions and configuration/connection requirements for wireless access provides criteria for authorization decisions.', priority: 'medium', references: ['3.1.16'], examples: ['Wireless access policies', 'Connection authorization', 'Device registration', 'Access approval'], options: [
                { value: 0, label: 'Not implemented', description: 'No wireless access authorization' },
                { value: 1, label: 'Partially implemented', description: 'Basic authorization for some wireless access' },
                { value: 2, label: 'Largely implemented', description: 'Most wireless access properly authorized' },
                { value: 3, label: 'Fully implemented', description: 'Complete wireless access authorization' }
              ]
            },
            {
              id: 'cmmc.ac.3.1.17', text: 'Protect wireless access using authentication and encryption.', guidance: 'Organizations authenticate individuals and devices to help protect wireless access to the system.', priority: 'high', references: ['3.1.17'], examples: ['WPA3 encryption', 'Wireless authentication', 'Secure wireless protocols', 'Device authentication'], options: [
                { value: 0, label: 'Not implemented', description: 'No wireless security controls' },
                { value: 1, label: 'Partially implemented', description: 'Basic wireless authentication and encryption' },
                { value: 2, label: 'Largely implemented', description: 'Strong wireless security on most networks' },
                { value: 3, label: 'Fully implemented', description: 'Complete wireless authentication and encryption' }
              ]
            },
            {
              id: 'cmmc.ac.3.1.18', text: 'Control connection of mobile devices.', guidance: 'Due to the large variety of mobile devices with different technical characteristics, organizational restrictions may vary.', priority: 'medium', references: ['3.1.18'], examples: ['Mobile device management', 'Device controls', 'Connection policies', 'BYOD restrictions'], options: [
                { value: 0, label: 'Not implemented', description: 'No mobile device connection controls' },
                { value: 1, label: 'Partially implemented', description: 'Basic controls for some mobile devices' },
                { value: 2, label: 'Largely implemented', description: 'Most mobile device connections controlled' },
                { value: 3, label: 'Fully implemented', description: 'Complete mobile device connection management' }
              ]
            },
            {
              id: 'cmmc.ac.3.1.19', text: 'Encrypt CUI on mobile devices and mobile computing platforms.', guidance: 'Organizations can employ full-device encryption or container-based encryption to protect the confidentiality of CUI.', priority: 'high', references: ['3.1.19'], examples: ['Device encryption', 'Container encryption', 'Mobile data protection', 'Full disk encryption'], options: [
                { value: 0, label: 'Not implemented', description: 'No encryption on mobile devices' },
                { value: 1, label: 'Partially implemented', description: 'Basic encryption on some mobile devices' },
                { value: 2, label: 'Largely implemented', description: 'Encryption on most mobile devices with CUI' },
                { value: 3, label: 'Fully implemented', description: 'Complete mobile device encryption' }
              ]
            },
            {
              id: 'cmmc.ac.3.1.20', text: 'Verify and control/limit connections to and use of external systems.', guidance: 'External systems are systems for which organizations typically have no direct supervision and authority.', priority: 'medium', references: ['3.1.20'], examples: ['External system controls', 'Cloud service restrictions', 'Third-party connections', 'System verification'], options: [
                { value: 0, label: 'Not implemented', description: 'No external system controls' },
                { value: 1, label: 'Partially implemented', description: 'Basic controls for some external systems' },
                { value: 2, label: 'Largely implemented', description: 'Most external system connections controlled' },
                { value: 3, label: 'Fully implemented', description: 'Complete external system verification and control' }
              ]
            },
            {
              id: 'cmmc.ac.3.1.21', text: 'Limit use of portable storage devices on external systems.', guidance: 'Limits include complete prohibition of use or restrictions on how the devices may be used and under what conditions.', priority: 'medium', references: ['3.1.21'], examples: ['USB restrictions', 'Portable media controls', 'External storage policies', 'Device limitations'], options: [
                { value: 0, label: 'Not implemented', description: 'No portable storage device restrictions' },
                { value: 1, label: 'Partially implemented', description: 'Basic restrictions on some portable devices' },
                { value: 2, label: 'Largely implemented', description: 'Most portable storage use properly limited' },
                { value: 3, label: 'Fully implemented', description: 'Complete portable storage device control' }
              ]
            },
            {
              id: 'cmmc.ac.3.1.22', text: 'Control CUI posted or processed on publicly accessible systems.', guidance: 'This requirement addresses systems that are controlled by the organization and accessible to the public.', priority: 'medium', references: ['3.1.22'], examples: ['Public system controls', 'Content review', 'Publication authorization', 'Information screening'], options: [
                { value: 0, label: 'Not implemented', description: 'No controls for publicly accessible systems' },
                { value: 1, label: 'Partially implemented', description: 'Basic controls for some public systems' },
                { value: 2, label: 'Largely implemented', description: 'Most public systems properly controlled' },
                { value: 3, label: 'Fully implemented', description: 'Complete control of CUI on public systems' }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'awareness-training', name: 'Awareness and Training (AT)', description: 'Ensure that organizational personnel are adequately trained', weight: 8, priority: 'medium', categories: [
        {
          id: 'security-training', name: 'Security Training', description: 'Provide security awareness and training', weight: 100, questions: [
            {
              id: 'cmmc.at.3.2.1', text: 'Ensure that managers, systems administrators, and users of organizational systems are made aware of the security risks associated with their activities and of the applicable policies, standards, and procedures related to the security of those systems.', guidance: 'Organizations determine the content and frequency of security awareness training based on specific organizational requirements.', priority: 'medium', references: ['3.2.1'], examples: ['Security awareness programs', 'Training materials', 'Risk communication', 'Policy training'], options: [
                { value: 0, label: 'Not implemented', description: 'No security awareness training' },
                { value: 1, label: 'Partially implemented', description: 'Basic training for some personnel' },
                { value: 2, label: 'Largely implemented', description: 'Regular training with some gaps' },
                { value: 3, label: 'Fully implemented', description: 'Comprehensive training program for all personnel' }
              ]
            },
            {
              id: 'cmmc.at.3.2.2', text: 'Ensure that personnel are trained to carry out their assigned information security-related duties and responsibilities.', guidance: 'Organizations determine the content and frequency of security training based on assigned duties, roles, and responsibilities.', priority: 'medium', references: ['3.2.2'], examples: ['Role-based training', 'Job-specific security training', 'Responsibility training', 'Skills development'], options: [
                { value: 0, label: 'Not implemented', description: 'No role-based security training' },
                { value: 1, label: 'Partially implemented', description: 'Basic training for some roles' },
                { value: 2, label: 'Largely implemented', description: 'Training for most security-related roles' },
                { value: 3, label: 'Fully implemented', description: 'Complete role-based security training program' }
              ]
            },
            {
              id: 'cmmc.at.3.2.3', text: 'Provide security awareness training on recognizing and reporting potential indicators of insider threat.', guidance: 'Potential indicators include behaviors such as inordinate job dissatisfaction, attempts to gain unauthorized access to information.', priority: 'medium', references: ['3.2.3'], examples: ['Insider threat training', 'Threat recognition', 'Reporting procedures', 'Behavioral indicators'], options: [
                { value: 0, label: 'Not implemented', description: 'No insider threat training' },
                { value: 1, label: 'Partially implemented', description: 'Basic insider threat awareness for some staff' },
                { value: 2, label: 'Largely implemented', description: 'Most personnel trained on insider threats' },
                { value: 3, label: 'Fully implemented', description: 'Complete insider threat recognition and reporting training' }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'audit-accountability', name: 'Audit and Accountability (AU)', description: 'Create, protect, and retain information system audit records', weight: 12, priority: 'medium', categories: [
        {
          id: 'audit-logging', name: 'Audit Logging', description: 'Implement audit logging and monitoring', weight: 100, questions: [
            {
              id: 'cmmc.au.3.3.1', text: 'Create and retain system audit logs and records to the extent needed to enable the monitoring, analysis, investigation, and reporting of unlawful or unauthorized system activity.', guidance: 'Organizations identify event types for which a logging functionality is needed as those events which are significant and relevant.', priority: 'medium', references: ['3.3.1'], examples: ['Audit logging systems', 'Event identification', 'Log management', 'Activity monitoring'], options: [
                { value: 0, label: 'Not implemented', description: 'No audit logging' },
                { value: 1, label: 'Partially implemented', description: 'Basic logging for some systems' },
                { value: 2, label: 'Largely implemented', description: 'Comprehensive logging with some gaps' },
                { value: 3, label: 'Fully implemented', description: 'Complete audit logging and retention' }
              ]
            },
            {
              id: 'cmmc.au.3.3.2', text: 'Ensure that the actions of individual system users can be uniquely traced to those users, so they can be held accountable for their actions.', guidance: 'This requirement ensures that the contents of the audit record include the information needed to link the audit event to the actions of an individual.', priority: 'medium', references: ['3.3.2'], examples: ['User activity tracking', 'Individual accountability', 'Action tracing', 'User identification'], options: [
                { value: 0, label: 'Not implemented', description: 'No user action tracing' },
                { value: 1, label: 'Partially implemented', description: 'Basic tracing for some users' },
                { value: 2, label: 'Largely implemented', description: 'Most user actions traceable' },
                { value: 3, label: 'Fully implemented', description: 'Complete user action traceability' }
              ]
            },
            {
              id: 'cmmc.au.3.3.3', text: 'Review and update logged events.', guidance: 'The intent of this requirement is to periodically re-evaluate which logged events will continue to be included in the list of events to be logged.', priority: 'low', references: ['3.3.3'], examples: ['Log review processes', 'Event type updates', 'Logging policy review', 'Event list maintenance'], options: [
                { value: 0, label: 'Not implemented', description: 'No review of logged events' },
                { value: 1, label: 'Partially implemented', description: 'Occasional review of some event types' },
                { value: 2, label: 'Largely implemented', description: 'Regular review and updates of most events' },
                { value: 3, label: 'Fully implemented', description: 'Complete periodic review and update process' }
              ]
            },
            {
              id: 'cmmc.au.3.3.4', text: 'Alert in the event of an audit logging process failure.', guidance: 'Audit logging process failures include software and hardware errors, failures in audit record capturing mechanisms.', priority: 'medium', references: ['3.3.4'], examples: ['Logging failure alerts', 'System monitoring', 'Failure notifications', 'Alert mechanisms'], options: [
                { value: 0, label: 'Not implemented', description: 'No audit failure alerts' },
                { value: 1, label: 'Partially implemented', description: 'Basic alerts for some logging failures' },
                { value: 2, label: 'Largely implemented', description: 'Alerts for most audit logging failures' },
                { value: 3, label: 'Fully implemented', description: 'Complete audit logging failure alerting' }
              ]
            },
            {
              id: 'cmmc.au.3.3.5', text: 'Correlate audit record review, analysis, and reporting processes for investigation and response to indications of unlawful, unauthorized, suspicious, or unusual activity.', guidance: 'Correlating audit record review, analysis, and reporting processes helps to ensure that they do not operate independently.', priority: 'medium', references: ['3.3.5'], examples: ['Log correlation', 'Analysis integration', 'Investigation coordination', 'Response correlation'], options: [
                { value: 0, label: 'Not implemented', description: 'No audit record correlation' },
                { value: 1, label: 'Partially implemented', description: 'Basic correlation for some processes' },
                { value: 2, label: 'Largely implemented', description: 'Most audit processes correlated' },
                { value: 3, label: 'Fully implemented', description: 'Complete audit record correlation' }
              ]
            },
            {
              id: 'cmmc.au.3.3.6', text: 'Provide audit record reduction and report generation to support on-demand analysis and reporting.', guidance: 'Audit record reduction is a process that manipulates collected audit information and organizes such information in a summary format.', priority: 'low', references: ['3.3.6'], examples: ['Log analysis tools', 'Report generation', 'Data reduction', 'Summary reporting'], options: [
                { value: 0, label: 'Not implemented', description: 'No audit record reduction capabilities' },
                { value: 1, label: 'Partially implemented', description: 'Basic reduction and reporting for some data' },
                { value: 2, label: 'Largely implemented', description: 'Regular reduction and reporting capabilities' },
                { value: 3, label: 'Fully implemented', description: 'Complete audit record reduction and reporting' }
              ]
            },
            {
              id: 'cmmc.au.3.3.7', text: 'Provide a system capability that compares and synchronizes internal system clocks with an authoritative source to generate time stamps for audit records.', guidance: 'Internal system clocks are used to generate time stamps, which include date and time expressed in Coordinated Universal Time (UTC).', priority: 'low', references: ['3.3.7'], examples: ['Time synchronization', 'NTP servers', 'Clock management', 'Timestamp accuracy'], options: [
                { value: 0, label: 'Not implemented', description: 'No time synchronization' },
                { value: 1, label: 'Partially implemented', description: 'Basic time sync for some systems' },
                { value: 2, label: 'Largely implemented', description: 'Time synchronization on most systems' },
                { value: 3, label: 'Fully implemented', description: 'Complete system time synchronization' }
              ]
            },
            {
              id: 'cmmc.au.3.3.8', text: 'Protect audit information and audit logging tools from unauthorized access, modification, and deletion.', guidance: 'Audit information includes all information needed to successfully audit system activity. This requirement focuses on technical protection.', priority: 'medium', references: ['3.3.8'], examples: ['Log protection', 'Access controls', 'Audit tool security', 'Information integrity'], options: [
                { value: 0, label: 'Not implemented', description: 'No audit information protection' },
                { value: 1, label: 'Partially implemented', description: 'Basic protection for some audit data' },
                { value: 2, label: 'Largely implemented', description: 'Most audit information protected' },
                { value: 3, label: 'Fully implemented', description: 'Complete audit information protection' }
              ]
            },
            {
              id: 'cmmc.au.3.3.9', text: 'Limit management of audit logging functionality to a subset of privileged users.', guidance: 'Individuals with privileged access who are also the subject of an audit may affect the reliability of audit information.', priority: 'medium', references: ['3.3.9'], examples: ['Audit privilege separation', 'Limited admin access', 'Role segregation', 'Audit independence'], options: [
                { value: 0, label: 'Not implemented', description: 'No limits on audit management' },
                { value: 1, label: 'Partially implemented', description: 'Basic limits for some audit functions' },
                { value: 2, label: 'Largely implemented', description: 'Most audit management properly limited' },
                { value: 3, label: 'Fully implemented', description: 'Complete audit management privilege limitation' }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'configuration-management', name: 'Configuration Management (CM)', description: 'Establish and maintain baseline configurations and inventories', weight: 12, priority: 'medium', categories: [
        {
          id: 'configuration-control', name: 'Configuration Control', description: 'Manage system configurations', weight: 100, questions: [
            {
              id: 'cmmc.cm.3.4.1', text: 'Establish and maintain baseline configurations and inventories of organizational systems (including hardware, software, firmware, and documentation) throughout the respective system development life cycles.', guidance: 'Baseline configurations are documented, formally reviewed, and agreed-upon specifications for systems.', priority: 'medium', references: ['3.4.1'], examples: ['Configuration baselines', 'System inventories', 'Documentation standards', 'Lifecycle management'], options: [
                { value: 0, label: 'Not implemented', description: 'No configuration baselines or inventories' },
                { value: 1, label: 'Partially implemented', description: 'Basic baselines for some systems' },
                { value: 2, label: 'Largely implemented', description: 'Most systems have documented baselines' },
                { value: 3, label: 'Fully implemented', description: 'Complete baseline configuration and inventory management' }
              ]
            },
            {
              id: 'cmmc.cm.3.4.2', text: 'Establish and enforce security configuration settings for information technology products employed in organizational systems.', guidance: 'Configuration settings are the set of parameters that can be changed in hardware, software, or firmware components.', priority: 'medium', references: ['3.4.2'], examples: ['Security settings', 'Hardening standards', 'Configuration guides', 'Setting enforcement'], options: [
                { value: 0, label: 'Not implemented', description: 'No security configuration standards' },
                { value: 1, label: 'Partially implemented', description: 'Basic settings for some systems' },
                { value: 2, label: 'Largely implemented', description: 'Security settings on most systems' },
                { value: 3, label: 'Fully implemented', description: 'Complete security configuration management' }
              ]
            },
            {
              id: 'cmmc.cm.3.4.3', text: 'Track, review, approve or disapprove, and log changes to organizational systems.', guidance: 'Configuration change control involves the systematic proposal, justification, implementation, testing, review, and disposition of changes.', priority: 'medium', references: ['3.4.3'], examples: ['Change control board', 'Change tracking system', 'Approval processes', 'Change documentation'], options: [
                { value: 0, label: 'Not implemented', description: 'No change control process' },
                { value: 1, label: 'Partially implemented', description: 'Basic change controls for some systems' },
                { value: 2, label: 'Largely implemented', description: 'Most changes properly controlled' },
                { value: 3, label: 'Fully implemented', description: 'Complete change management process' }
              ]
            },
            {
              id: 'cmmc.cm.3.4.4', text: 'Analyze the security impact of changes prior to implementation.', guidance: 'Personnel with information security responsibilities conduct security impact analyses with the necessary skills and technical expertise.', priority: 'medium', references: ['3.4.4'], examples: ['Security impact assessment', 'Risk analysis', 'Change impact evaluation', 'Security review process'], options: [
                { value: 0, label: 'Not implemented', description: 'No security impact analysis' },
                { value: 1, label: 'Partially implemented', description: 'Basic analysis for major changes' },
                { value: 2, label: 'Largely implemented', description: 'Most changes have security analysis' },
                { value: 3, label: 'Fully implemented', description: 'Complete security impact analysis process' }
              ]
            },
            {
              id: 'cmmc.cm.3.4.5', text: 'Define, document, approve, and enforce physical and logical access restrictions associated with changes to organizational systems.', guidance: 'Any changes to hardware, software, or firmware components can potentially have significant effects on overall security.', priority: 'medium', references: ['3.4.5'], examples: ['Change access controls', 'Authorization requirements', 'Physical restrictions', 'Logical controls'], options: [
                { value: 0, label: 'Not implemented', description: 'No access restrictions for changes' },
                { value: 1, label: 'Partially implemented', description: 'Basic restrictions for some changes' },
                { value: 2, label: 'Largely implemented', description: 'Most changes have proper access restrictions' },
                { value: 3, label: 'Fully implemented', description: 'Complete change access restriction framework' }
              ]
            },
            {
              id: 'cmmc.cm.3.4.6', text: 'Employ the principle of least functionality by configuring organizational systems to provide only essential capabilities.', guidance: 'Systems can provide a wide variety of functions and services. Some may not be necessary for essential organizational missions.', priority: 'medium', references: ['3.4.6'], examples: ['Service minimization', 'Feature disabling', 'Function restriction', 'Essential capabilities'], options: [
                { value: 0, label: 'Not implemented', description: 'No least functionality principles applied' },
                { value: 1, label: 'Partially implemented', description: 'Basic functionality restriction on some systems' },
                { value: 2, label: 'Largely implemented', description: 'Most systems configured for least functionality' },
                { value: 3, label: 'Fully implemented', description: 'Complete least functionality implementation' }
              ]
            },
            {
              id: 'cmmc.cm.3.4.7', text: 'Restrict, disable, or prevent the use of nonessential programs, functions, ports, protocols, and services.', guidance: 'Restricting the use of nonessential software includes restricting the roles allowed to approve program execution.', priority: 'medium', references: ['3.4.7'], examples: ['Port restrictions', 'Service disabling', 'Protocol controls', 'Program restrictions'], options: [
                { value: 0, label: 'Not implemented', description: 'No restrictions on nonessential services' },
                { value: 1, label: 'Partially implemented', description: 'Basic restrictions on some services' },
                { value: 2, label: 'Largely implemented', description: 'Most nonessential services restricted' },
                { value: 3, label: 'Fully implemented', description: 'Complete restriction of nonessential functions' }
              ]
            },
            {
              id: 'cmmc.cm.3.4.8', text: 'Apply deny-by-exception (blacklisting) policy to prevent the use of unauthorized software or deny-all, permit-by-exception (whitelisting) policy to allow the execution of authorized software.', guidance: 'Whitelisting is the stronger of the two policies for restricting software program execution.', priority: 'medium', references: ['3.4.8'], examples: ['Application whitelisting', 'Software blacklisting', 'Execution control', 'Program authorization'], options: [
                { value: 0, label: 'Not implemented', description: 'No software execution controls' },
                { value: 1, label: 'Partially implemented', description: 'Basic blacklisting or whitelisting on some systems' },
                { value: 2, label: 'Largely implemented', description: 'Software controls on most systems' },
                { value: 3, label: 'Fully implemented', description: 'Complete software execution control policy' }
              ]
            },
            {
              id: 'cmmc.cm.3.4.9', text: 'Control and monitor user-installed software.', guidance: 'Users can install software in organizational systems if provided the necessary privileges. Organizations identify permitted and prohibited actions.', priority: 'medium', references: ['3.4.9'], examples: ['Software installation controls', 'User permissions', 'Installation monitoring', 'Approval processes'], options: [
                { value: 0, label: 'Not implemented', description: 'No control over user-installed software' },
                { value: 1, label: 'Partially implemented', description: 'Basic controls for some user installations' },
                { value: 2, label: 'Largely implemented', description: 'Most user software installations controlled' },
                { value: 3, label: 'Fully implemented', description: 'Complete user-installed software control and monitoring' }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'identification-authentication', name: 'Identification and Authentication (IA)', description: 'Identify and authenticate users and processes', weight: 15, priority: 'high', categories: [
        {
          id: 'user-identification', name: 'User Identification', description: 'Identify and authenticate users', weight: 100, questions: [
            {
              id: 'cmmc.ia.3.5.1', text: 'Identify system users, processes acting on behalf of users, and devices.', guidance: 'Common device identifiers include Media Access Control (MAC), Internet Protocol (IP) addresses, or device-unique token identifiers.', priority: 'high', references: ['3.5.1'], examples: ['User identification', 'Device identification', 'Process identification', 'Unique identifiers'], options: [
                { value: 0, label: 'Not implemented', description: 'No user or device identification' },
                { value: 1, label: 'Partially implemented', description: 'Basic identification for some users/devices' },
                { value: 2, label: 'Largely implemented', description: 'Most users and devices properly identified' },
                { value: 3, label: 'Fully implemented', description: 'Complete identification framework' }
              ]
            },
            {
              id: 'cmmc.ia.3.5.2', text: 'Authenticate (or verify) the identities of users, processes, or devices, as a prerequisite to allowing access to organizational systems.', guidance: 'Individual authenticators include passwords, key cards, cryptographic devices, and one-time password devices.', priority: 'high', references: ['3.5.2'], examples: ['User authentication', 'Device authentication', 'Multi-factor authentication', 'Identity verification'], options: [
                { value: 0, label: 'Not implemented', description: 'No authentication required' },
                { value: 1, label: 'Partially implemented', description: 'Basic authentication for some systems' },
                { value: 2, label: 'Largely implemented', description: 'Most systems require authentication' },
                { value: 3, label: 'Fully implemented', description: 'Complete authentication framework' }
              ]
            },
            {
              id: 'cmmc.ia.3.5.3', text: 'Use multifactor authentication for local and network access to privileged accounts and for network access to non-privileged accounts.', guidance: 'Multifactor authentication requires the use of two or more different factors to authenticate.', priority: 'high', references: ['3.5.3'], examples: ['MFA for admin accounts', 'Token-based authentication', 'Biometric authentication', 'Smart card authentication'], options: [
                { value: 0, label: 'Not implemented', description: 'No multifactor authentication' },
                { value: 1, label: 'Partially implemented', description: 'MFA for some accounts' },
                { value: 2, label: 'Largely implemented', description: 'MFA for most privileged and network accounts' },
                { value: 3, label: 'Fully implemented', description: 'Complete MFA implementation' }
              ]
            },
            {
              id: 'cmmc.ia.3.5.4', text: 'Employ replay-resistant authentication mechanisms for network access to privileged and non-privileged accounts.', guidance: 'Authentication processes resist replay attacks if it is impractical to successfully authenticate by recording or replaying previous authentication messages.', priority: 'medium', references: ['3.5.4'], examples: ['Challenge-response authentication', 'Time-based tokens', 'Nonce-based authentication', 'Replay protection'], options: [
                { value: 0, label: 'Not implemented', description: 'No replay-resistant authentication' },
                { value: 1, label: 'Partially implemented', description: 'Replay resistance for some accounts' },
                { value: 2, label: 'Largely implemented', description: 'Most network access uses replay-resistant authentication' },
                { value: 3, label: 'Fully implemented', description: 'Complete replay-resistant authentication' }
              ]
            },
            {
              id: 'cmmc.ia.3.5.5', text: 'Prevent reuse of identifiers for a defined period.', guidance: 'Preventing reuse of identifiers implies preventing the assignment of previously used individual, group, role, or device identifiers.', priority: 'low', references: ['3.5.5'], examples: ['Identifier lifecycle management', 'Reuse prevention', 'Identifier retirement', 'Waiting periods'], options: [
                { value: 0, label: 'Not implemented', description: 'No identifier reuse controls' },
                { value: 1, label: 'Partially implemented', description: 'Basic reuse prevention for some identifiers' },
                { value: 2, label: 'Largely implemented', description: 'Most identifiers protected from reuse' },
                { value: 3, label: 'Fully implemented', description: 'Complete identifier reuse prevention' }
              ]
            },
            {
              id: 'cmmc.ia.3.5.6', text: 'Disable identifiers after a defined period of inactivity.', guidance: 'Inactive identifiers pose a risk to organizational information because attackers may exploit an inactive identifier.', priority: 'medium', references: ['3.5.6'], examples: ['Account inactivity policies', 'Automatic disabling', 'Identifier lifecycle', 'Inactive account management'], options: [
                { value: 0, label: 'Not implemented', description: 'No inactivity-based disabling' },
                { value: 1, label: 'Partially implemented', description: 'Basic inactivity controls for some accounts' },
                { value: 2, label: 'Largely implemented', description: 'Most inactive identifiers properly disabled' },
                { value: 3, label: 'Fully implemented', description: 'Complete inactivity-based identifier management' }
              ]
            },
            {
              id: 'cmmc.ia.3.5.7', text: 'Enforce a minimum password complexity and change of characters when new passwords are created.', guidance: 'This requirement applies to single-factor authentication using passwords as individual or group authenticators.', priority: 'medium', references: ['3.5.7'], examples: ['Password complexity rules', 'Character requirements', 'Password policies', 'Complexity enforcement'], options: [
                { value: 0, label: 'Not implemented', description: 'No password complexity requirements' },
                { value: 1, label: 'Partially implemented', description: 'Basic complexity for some passwords' },
                { value: 2, label: 'Largely implemented', description: 'Complexity requirements for most passwords' },
                { value: 3, label: 'Fully implemented', description: 'Complete password complexity enforcement' }
              ]
            },
            {
              id: 'cmmc.ia.3.5.8', text: 'Prohibit password reuse for a specified number of generations.', guidance: 'Password lifetime restrictions do not apply to temporary passwords.', priority: 'low', references: ['3.5.8'], examples: ['Password history', 'Reuse prevention', 'Generation tracking', 'Password cycles'], options: [
                { value: 0, label: 'Not implemented', description: 'No password reuse restrictions' },
                { value: 1, label: 'Partially implemented', description: 'Basic reuse prevention for some accounts' },
                { value: 2, label: 'Largely implemented', description: 'Password reuse restricted for most accounts' },
                { value: 3, label: 'Fully implemented', description: 'Complete password reuse prevention' }
              ]
            },
            {
              id: 'cmmc.ia.3.5.9', text: 'Allow temporary password use for system logons with an immediate change to a permanent password.', guidance: 'Changing temporary passwords to permanent passwords immediately after system logon ensures the necessary strength of the authentication mechanism.', priority: 'low', references: ['3.5.9'], examples: ['Temporary password policies', 'Forced password changes', 'Initial logon requirements', 'Password transitions'], options: [
                { value: 0, label: 'Not implemented', description: 'No temporary password controls' },
                { value: 1, label: 'Partially implemented', description: 'Basic temporary password handling' },
                { value: 2, label: 'Largely implemented', description: 'Most temporary passwords require immediate change' },
                { value: 3, label: 'Fully implemented', description: 'Complete temporary password management' }
              ]
            },
            {
              id: 'cmmc.ia.3.5.10', text: 'Store and transmit only cryptographically-protected passwords.', guidance: 'Cryptographically-protected passwords use salted one-way cryptographic hashes of passwords.', priority: 'high', references: ['3.5.10'], examples: ['Password hashing', 'Encryption in transit', 'Secure storage', 'Cryptographic protection'], options: [
                { value: 0, label: 'Not implemented', description: 'Passwords stored/transmitted in plaintext' },
                { value: 1, label: 'Partially implemented', description: 'Some passwords cryptographically protected' },
                { value: 2, label: 'Largely implemented', description: 'Most passwords properly protected' },
                { value: 3, label: 'Fully implemented', description: 'All passwords cryptographically protected' }
              ]
            },
            {
              id: 'cmmc.ia.3.5.11', text: 'Obscure feedback of authentication information.', guidance: 'The feedback from systems does not provide any information that would allow unauthorized individuals to compromise authentication mechanisms.', priority: 'low', references: ['3.5.11'], examples: ['Password masking', 'Feedback obscuring', 'Authentication hiding', 'Input protection'], options: [
                { value: 0, label: 'Not implemented', description: 'Authentication information visible during entry' },
                { value: 1, label: 'Partially implemented', description: 'Basic feedback obscuring on some systems' },
                { value: 2, label: 'Largely implemented', description: 'Most authentication feedback properly obscured' },
                { value: 3, label: 'Fully implemented', description: 'Complete authentication feedback obscuring' }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'incident-response', name: 'Incident Response (IR)', description: 'Establish operational incident handling capability', weight: 10, priority: 'high', categories: [
        {
          id: 'incident-handling', name: 'Incident Handling', description: 'Handle security incidents', weight: 100, questions: [
            {
              id: 'cmmc.ir.3.6.1', text: 'Establish an operational incident-handling capability for organizational systems that includes preparation, detection, analysis, containment, recovery, and user response activities.', guidance: 'Organizations recognize that incident handling capability is dependent on the capabilities of organizational systems and the mission/business processes.', priority: 'high', references: ['3.6.1'], examples: ['Incident response team', 'Response procedures', 'Detection capabilities', 'Recovery processes'], options: [
                { value: 0, label: 'Not implemented', description: 'No incident response capability' },
                { value: 1, label: 'Partially implemented', description: 'Basic incident response procedures' },
                { value: 2, label: 'Largely implemented', description: 'Established incident response with some gaps' },
                { value: 3, label: 'Fully implemented', description: 'Complete incident response capability' }
              ]
            },
            {
              id: 'cmmc.ir.3.6.2', text: 'Track, document, and report incidents to designated officials and/or authorities both internal and external to the organization.', guidance: 'Tracking and documenting system security incidents includes maintaining records about each incident and other pertinent information.', priority: 'high', references: ['3.6.2'], examples: ['Incident tracking system', 'Incident documentation', 'Internal reporting', 'External notifications'], options: [
                { value: 0, label: 'Not implemented', description: 'No incident tracking or reporting' },
                { value: 1, label: 'Partially implemented', description: 'Basic incident documentation' },
                { value: 2, label: 'Largely implemented', description: 'Most incidents properly tracked and reported' },
                { value: 3, label: 'Fully implemented', description: 'Complete incident tracking and reporting' }
              ]
            },
            {
              id: 'cmmc.ir.3.6.3', text: 'Test the organizational incident response capability.', guidance: 'Organizations test incident response capabilities to determine the effectiveness of the capabilities and to identify potential weaknesses.', priority: 'medium', references: ['3.6.3'], examples: ['Incident response exercises', 'Plan testing', 'Tabletop exercises', 'Capability assessment'], options: [
                { value: 0, label: 'Not implemented', description: 'No incident response testing' },
                { value: 1, label: 'Partially implemented', description: 'Occasional testing of some capabilities' },
                { value: 2, label: 'Largely implemented', description: 'Regular testing with some gaps' },
                { value: 3, label: 'Fully implemented', description: 'Complete incident response testing program' }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'maintenance', name: 'Maintenance (MA)', description: 'Perform maintenance on organizational systems', weight: 8, priority: 'low', categories: [
        {
          id: 'system-maintenance', name: 'System Maintenance', description: 'Maintain organizational systems', weight: 100, questions: [
            {
              id: 'cmmc.ma.3.7.1', text: 'Perform maintenance on organizational systems.', guidance: 'This requirement addresses the information security aspects of the system maintenance program and applies to all types of maintenance.', priority: 'medium', references: ['3.7.1'], examples: ['Preventive maintenance', 'System updates', 'Hardware maintenance', 'Software maintenance'], options: [
                { value: 0, label: 'Not implemented', description: 'No regular system maintenance' },
                { value: 1, label: 'Partially implemented', description: 'Basic maintenance for some systems' },
                { value: 2, label: 'Largely implemented', description: 'Regular maintenance with some gaps' },
                { value: 3, label: 'Fully implemented', description: 'Complete system maintenance program' }
              ]
            },
            {
              id: 'cmmc.ma.3.7.2', text: 'Provide controls on the tools, techniques, mechanisms, and personnel used to conduct system maintenance.', guidance: 'This requirement addresses security-related issues with maintenance tools that are not within the organizational system boundaries.', priority: 'medium', references: ['3.7.2'], examples: ['Tool control procedures', 'Personnel screening', 'Maintenance authorization', 'Security controls'], options: [
                { value: 0, label: 'Not implemented', description: 'No maintenance tool controls' },
                { value: 1, label: 'Partially implemented', description: 'Basic controls for some tools' },
                { value: 2, label: 'Largely implemented', description: 'Most maintenance activities controlled' },
                { value: 3, label: 'Fully implemented', description: 'Complete maintenance control program' }
              ]
            },
            {
              id: 'cmmc.ma.3.7.3', text: 'Ensure equipment removed for off-site maintenance is sanitized of any CUI.', guidance: 'This requirement addresses the information security aspects of system maintenance that are performed off-site.', priority: 'high', references: ['3.7.3'], examples: ['Data sanitization', 'Equipment cleaning', 'CUI removal', 'Off-site maintenance procedures'], options: [
                { value: 0, label: 'Not implemented', description: 'No sanitization for off-site maintenance' },
                { value: 1, label: 'Partially implemented', description: 'Basic sanitization for some equipment' },
                { value: 2, label: 'Largely implemented', description: 'Most equipment properly sanitized' },
                { value: 3, label: 'Fully implemented', description: 'Complete sanitization for off-site maintenance' }
              ]
            },
            {
              id: 'cmmc.ma.3.7.4', text: 'Check media containing diagnostic and test programs for malicious code before the media are used in organizational systems.', guidance: 'If organizations determine that media contain malicious code, the incident is handled consistent with incident handling policies.', priority: 'medium', references: ['3.7.4'], examples: ['Media scanning', 'Malware detection', 'Tool validation', 'Security checks'], options: [
                { value: 0, label: 'Not implemented', description: 'No scanning of maintenance media' },
                { value: 1, label: 'Partially implemented', description: 'Basic scanning for some media' },
                { value: 2, label: 'Largely implemented', description: 'Most maintenance media properly scanned' },
                { value: 3, label: 'Fully implemented', description: 'Complete maintenance media security checking' }
              ]
            },
            {
              id: 'cmmc.ma.3.7.5', text: 'Require multifactor authentication to establish nonlocal maintenance sessions via external network connections and terminate such connections when nonlocal maintenance is complete.', guidance: 'The authentication techniques employed reflect the network access requirements for multifactor authentication.', priority: 'high', references: ['3.7.5'], examples: ['Remote maintenance MFA', 'Session management', 'Connection termination', 'Authentication controls'], options: [
                { value: 0, label: 'Not implemented', description: 'No MFA for remote maintenance' },
                { value: 1, label: 'Partially implemented', description: 'MFA for some remote maintenance' },
                { value: 2, label: 'Largely implemented', description: 'Most remote maintenance uses MFA' },
                { value: 3, label: 'Fully implemented', description: 'Complete MFA and session management for remote maintenance' }
              ]
            },
            {
              id: 'cmmc.ma.3.7.6', text: 'Supervise the maintenance activities of maintenance personnel without required access authorization.', guidance: 'Individuals not previously identified as authorized maintenance personnel may require privileged access to organizational systems.', priority: 'medium', references: ['3.7.6'], examples: ['Personnel supervision', 'Access authorization', 'Maintenance oversight', 'Temporary access controls'], options: [
                { value: 0, label: 'Not implemented', description: 'No supervision of unauthorized maintenance personnel' },
                { value: 1, label: 'Partially implemented', description: 'Basic supervision for some maintenance activities' },
                { value: 2, label: 'Largely implemented', description: 'Most unauthorized maintenance personnel supervised' },
                { value: 3, label: 'Fully implemented', description: 'Complete supervision of all unauthorized maintenance personnel' }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'media-protection', name: 'Media Protection (MP)', description: 'Protect information system media', weight: 12, priority: 'medium', categories: [
        {
          id: 'media-handling', name: 'Media Handling', description: 'Handle and protect media', weight: 100, questions: [
            {
              id: 'cmmc.mp.3.8.1', text: 'Protect (i.e., physically control and securely store) system media containing CUI, both paper and digital.', guidance: 'System media includes digital and non-digital media. Protecting digital media includes limiting access to design specifications.', priority: 'medium', references: ['3.8.1'], examples: ['Media storage controls', 'Physical security', 'Access restrictions', 'Secure storage'], options: [
                { value: 0, label: 'Not implemented', description: 'No media protection controls' },
                { value: 1, label: 'Partially implemented', description: 'Basic protection for some media' },
                { value: 2, label: 'Largely implemented', description: 'Most media properly protected' },
                { value: 3, label: 'Fully implemented', description: 'Complete media protection program' }
              ]
            },
            {
              id: 'cmmc.mp.3.8.2', text: 'Limit access to CUI on system media to authorized users.', guidance: 'Access can be limited by physically controlling system media and secure storage areas.', priority: 'medium', references: ['3.8.2'], examples: ['Access controls', 'Media libraries', 'Authorization procedures', 'User restrictions'], options: [
                { value: 0, label: 'Not implemented', description: 'No access controls for media' },
                { value: 1, label: 'Partially implemented', description: 'Basic access controls for some media' },
                { value: 2, label: 'Largely implemented', description: 'Most media access properly controlled' },
                { value: 3, label: 'Fully implemented', description: 'Complete media access control' }
              ]
            },
            {
              id: 'cmmc.mp.3.8.3', text: 'Sanitize or destroy system media containing CUI before disposal or release for reuse.', guidance: 'This requirement applies to all system media, digital and non-digital, subject to disposal or reuse.', priority: 'high', references: ['3.8.3'], examples: ['Data sanitization', 'Media destruction', 'Disposal procedures', 'Reuse controls'], options: [
                { value: 0, label: 'Not implemented', description: 'No media sanitization process' },
                { value: 1, label: 'Partially implemented', description: 'Basic sanitization for some media' },
                { value: 2, label: 'Largely implemented', description: 'Most media properly sanitized' },
                { value: 3, label: 'Fully implemented', description: 'Complete media sanitization program' }
              ]
            },
            {
              id: 'cmmc.mp.3.8.4', text: 'Mark media with necessary CUI markings and distribution limitations.', guidance: 'The term security marking refers to the application or use of human-readable security attributes.', priority: 'medium', references: ['3.8.4'], examples: ['CUI markings', 'Distribution labels', 'Security markings', 'Media labeling'], options: [
                { value: 0, label: 'Not implemented', description: 'No media marking requirements' },
                { value: 1, label: 'Partially implemented', description: 'Basic marking for some media' },
                { value: 2, label: 'Largely implemented', description: 'Most media properly marked' },
                { value: 3, label: 'Fully implemented', description: 'Complete media marking program' }
              ]
            },
            {
              id: 'cmmc.mp.3.8.5', text: 'Control access to media containing CUI and maintain accountability for media during transport outside of controlled areas.', guidance: 'Controlled areas are areas or spaces for which organizations provide physical or procedural controls.', priority: 'medium', references: ['3.8.5'], examples: ['Transport controls', 'Media accountability', 'Chain of custody', 'Transport security'], options: [
                { value: 0, label: 'Not implemented', description: 'No transport controls for media' },
                { value: 1, label: 'Partially implemented', description: 'Basic transport controls for some media' },
                { value: 2, label: 'Largely implemented', description: 'Most media transport properly controlled' },
                { value: 3, label: 'Fully implemented', description: 'Complete media transport control and accountability' }
              ]
            },
            {
              id: 'cmmc.mp.3.8.6', text: 'Implement cryptographic mechanisms to protect the confidentiality of CUI stored on digital media during transport unless otherwise protected by alternative physical safeguards.', guidance: 'This requirement applies to portable storage devices (e.g., USB memory sticks, digital video disks, compact disks).', priority: 'high', references: ['3.8.6'], examples: ['Transport encryption', 'Portable device encryption', 'Cryptographic protection', 'Physical safeguards'], options: [
                { value: 0, label: 'Not implemented', description: 'No encryption for media transport' },
                { value: 1, label: 'Partially implemented', description: 'Encryption for some portable media' },
                { value: 2, label: 'Largely implemented', description: 'Most transported media encrypted' },
                { value: 3, label: 'Fully implemented', description: 'Complete cryptographic protection for media transport' }
              ]
            },
            {
              id: 'cmmc.mp.3.8.7', text: 'Control the use of removable media on system components.', guidance: 'This requirement restricts the use of certain types of media on systems, for example, restricting or prohibiting the use of flash drives.', priority: 'medium', references: ['3.8.7'], examples: ['Removable media policies', 'USB controls', 'Media restrictions', 'Device controls'], options: [
                { value: 0, label: 'Not implemented', description: 'No removable media controls' },
                { value: 1, label: 'Partially implemented', description: 'Basic controls for some removable media' },
                { value: 2, label: 'Largely implemented', description: 'Most removable media use controlled' },
                { value: 3, label: 'Fully implemented', description: 'Complete removable media control program' }
              ]
            },
            {
              id: 'cmmc.mp.3.8.8', text: 'Prohibit the use of portable storage devices when such devices have no identifiable owner.', guidance: 'Requiring identifiable owners for portable storage devices reduces overall risk by allowing organizations to assign responsibility.', priority: 'medium', references: ['3.8.8'], examples: ['Device ownership requirements', 'Portable device policies', 'Owner identification', 'Accountability measures'], options: [
                { value: 0, label: 'Not implemented', description: 'No ownership requirements for portable devices' },
                { value: 1, label: 'Partially implemented', description: 'Basic ownership tracking for some devices' },
                { value: 2, label: 'Largely implemented', description: 'Most portable devices have identifiable owners' },
                { value: 3, label: 'Fully implemented', description: 'Complete portable device ownership program' }
              ]
            },
            {
              id: 'cmmc.mp.3.8.9', text: 'Protect the confidentiality of backup CUI at storage locations.', guidance: 'Organizations can employ cryptographic mechanisms or alternative physical controls to protect the confidentiality of backup information.', priority: 'high', references: ['3.8.9'], examples: ['Backup encryption', 'Secure storage', 'Physical controls', 'Backup protection'], options: [
                { value: 0, label: 'Not implemented', description: 'No protection for backup CUI' },
                { value: 1, label: 'Partially implemented', description: 'Basic protection for some backups' },
                { value: 2, label: 'Largely implemented', description: 'Most backup CUI properly protected' },
                { value: 3, label: 'Fully implemented', description: 'Complete backup CUI protection program' }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'personnel-security', name: 'Personnel Security (PS)', description: 'Ensure the trustworthiness of personnel', weight: 6, priority: 'medium', categories: [
        {
          id: 'personnel-screening', name: 'Personnel Screening', description: 'Screen and manage personnel', weight: 100, questions: [
            {
              id: 'cmmc.ps.3.9.1', text: 'Screen individuals prior to authorizing access to organizational systems containing CUI.', guidance: 'Personnel security screening activities involve the evaluation of individual conduct, integrity, judgment, loyalty, reliability, and stability.', priority: 'medium', references: ['3.9.1'], examples: ['Background checks', 'Personnel screening', 'Access authorization', 'Security clearances'], options: [
                { value: 0, label: 'Not implemented', description: 'No personnel screening process' },
                { value: 1, label: 'Partially implemented', description: 'Basic screening for some positions' },
                { value: 2, label: 'Largely implemented', description: 'Most personnel properly screened' },
                { value: 3, label: 'Fully implemented', description: 'Complete personnel screening program' }
              ]
            },
            {
              id: 'cmmc.ps.3.9.2', text: 'Ensure that organizational systems containing CUI are protected during and after personnel actions such as terminations and transfers.', guidance: 'Protecting CUI during and after personnel actions may include returning system-related property and conducting exit interviews.', priority: 'high', references: ['3.9.2'], examples: ['Termination procedures', 'Property return', 'Access revocation', 'Exit interviews'], options: [
                { value: 0, label: 'Not implemented', description: 'No personnel action protections' },
                { value: 1, label: 'Partially implemented', description: 'Basic protections for some personnel actions' },
                { value: 2, label: 'Largely implemented', description: 'Most personnel actions properly handled' },
                { value: 3, label: 'Fully implemented', description: 'Complete personnel action protection program' }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'physical-protection', name: 'Physical Protection (PE)', description: 'Limit physical access to organizational systems', weight: 8, priority: 'medium', categories: [
        {
          id: 'physical-access', name: 'Physical Access', description: 'Control physical access to systems', weight: 100, questions: [
            {
              id: 'cmmc.pe.3.10.1', text: 'Limit physical access to organizational systems, equipment, and the respective operating environments to authorized individuals.', guidance: 'This requirement applies to employees, individuals with permanent physical access authorization credentials, and visitors.', priority: 'medium', references: ['3.10.1'], examples: ['Physical access controls', 'Badge systems', 'Visitor management', 'Facility security'], options: [
                { value: 0, label: 'Not implemented', description: 'No physical access controls' },
                { value: 1, label: 'Partially implemented', description: 'Basic physical access controls' },
                { value: 2, label: 'Largely implemented', description: 'Most areas properly protected' },
                { value: 3, label: 'Fully implemented', description: 'Complete physical access control program' }
              ]
            },
            {
              id: 'cmmc.pe.3.10.2', text: 'Protect and monitor the physical facility and support infrastructure for organizational systems.', guidance: 'Monitoring of physical access includes publicly accessible areas within organizational facilities.', priority: 'medium', references: ['3.10.2'], examples: ['Environmental controls', 'Infrastructure monitoring', 'Facility protection', 'Support systems'], options: [
                { value: 0, label: 'Not implemented', description: 'No facility protection or monitoring' },
                { value: 1, label: 'Partially implemented', description: 'Basic facility protection' },
                { value: 2, label: 'Largely implemented', description: 'Most facilities properly protected and monitored' },
                { value: 3, label: 'Fully implemented', description: 'Complete facility protection and monitoring' }
              ]
            },
            {
              id: 'cmmc.pe.3.10.3', text: 'Escort visitors and monitor visitor activity.', guidance: 'Individuals with permanent physical access authorization credentials are not considered visitors.', priority: 'low', references: ['3.10.3'], examples: ['Visitor escort procedures', 'Activity monitoring', 'Guest management', 'Supervised access'], options: [
                { value: 0, label: 'Not implemented', description: 'No visitor escort or monitoring' },
                { value: 1, label: 'Partially implemented', description: 'Basic visitor escort for some areas' },
                { value: 2, label: 'Largely implemented', description: 'Most visitors properly escorted and monitored' },
                { value: 3, label: 'Fully implemented', description: 'Complete visitor escort and monitoring program' }
              ]
            },
            {
              id: 'cmmc.pe.3.10.4', text: 'Maintain audit logs of physical access.', guidance: 'Organizations have flexibility in the types of audit logs employed. Audit logs can be procedural, automated, or some combination.', priority: 'low', references: ['3.10.4'], examples: ['Access logs', 'Entry/exit records', 'Log review procedures', 'Access monitoring'], options: [
                { value: 0, label: 'Not implemented', description: 'No physical access logging' },
                { value: 1, label: 'Partially implemented', description: 'Basic access logging' },
                { value: 2, label: 'Largely implemented', description: 'Regular log maintenance and review' },
                { value: 3, label: 'Fully implemented', description: 'Complete physical access logging program' }
              ]
            },
            {
              id: 'cmmc.pe.3.10.5', text: 'Control and manage physical access devices.', guidance: 'Physical access devices include keys, locks, combinations, and card readers.', priority: 'medium', references: ['3.10.5'], examples: ['Key management', 'Access card systems', 'Lock controls', 'Device management'], options: [
                { value: 0, label: 'Not implemented', description: 'No physical access device controls' },
                { value: 1, label: 'Partially implemented', description: 'Basic control of some access devices' },
                { value: 2, label: 'Largely implemented', description: 'Most physical access devices controlled' },
                { value: 3, label: 'Fully implemented', description: 'Complete physical access device management' }
              ]
            },
            {
              id: 'cmmc.pe.3.10.6', text: 'Enforce safeguarding measures for CUI at alternate work sites.', guidance: 'Alternate work sites may include government facilities or the private residences of employees.', priority: 'medium', references: ['3.10.6'], examples: ['Remote work security', 'Home office controls', 'Alternate site protections', 'Telework security'], options: [
                { value: 0, label: 'Not implemented', description: 'No alternate work site safeguards' },
                { value: 1, label: 'Partially implemented', description: 'Basic safeguards for some alternate sites' },
                { value: 2, label: 'Largely implemented', description: 'Most alternate work sites properly secured' },
                { value: 3, label: 'Fully implemented', description: 'Complete alternate work site safeguarding' }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'risk-assessment', name: 'Risk Assessment (RA)', description: 'Manage risk to organizational operations, assets, and individuals', weight: 10, priority: 'high', categories: [
        {
          id: 'risk-assessment', name: 'Risk Assessment', description: 'Assess and manage organizational risks', weight: 100, questions: [
            {
              id: 'cmmc.ra.3.11.1', text: 'Periodically assess the risk to organizational operations (including mission, functions, image, or reputation), organizational assets, and individuals, resulting from the operation of organizational systems and the associated processing, storage, or transmission of CUI.', guidance: 'Clearly defined system boundaries are a prerequisite for effective risk assessments.', priority: 'high', references: ['3.11.1'], examples: ['Risk assessments', 'Threat analysis', 'Vulnerability assessment', 'Impact analysis'], options: [
                { value: 0, label: 'Not implemented', description: 'No periodic risk assessments' },
                { value: 1, label: 'Partially implemented', description: 'Basic risk assessment for some systems' },
                { value: 2, label: 'Largely implemented', description: 'Regular risk assessments with some gaps' },
                { value: 3, label: 'Fully implemented', description: 'Complete periodic risk assessment program' }
              ]
            },
            {
              id: 'cmmc.ra.3.11.2', text: 'Scan for vulnerabilities in organizational systems and applications periodically and when new vulnerabilities affecting those systems and applications are identified.', guidance: 'Organizations determine the required vulnerability scanning for all system components, ensuring potential sources of vulnerabilities are not overlooked.', priority: 'medium', references: ['3.11.2'], examples: ['Vulnerability scanning', 'Security assessments', 'Penetration testing', 'Weakness identification'], options: [
                { value: 0, label: 'Not implemented', description: 'No vulnerability scanning' },
                { value: 1, label: 'Partially implemented', description: 'Basic scanning for some systems' },
                { value: 2, label: 'Largely implemented', description: 'Regular vulnerability scanning with some gaps' },
                { value: 3, label: 'Fully implemented', description: 'Complete vulnerability scanning program' }
              ]
            },
            {
              id: 'cmmc.ra.3.11.3', text: 'Remediate vulnerabilities in accordance with risk assessments.', guidance: 'Vulnerabilities discovered through scanning are remediated with consideration of the related assessment of risk.', priority: 'high', references: ['3.11.3'], examples: ['Vulnerability remediation', 'Patch management', 'Risk-based prioritization', 'Mitigation strategies'], options: [
                { value: 0, label: 'Not implemented', description: 'No vulnerability remediation process' },
                { value: 1, label: 'Partially implemented', description: 'Basic remediation for critical vulnerabilities' },
                { value: 2, label: 'Largely implemented', description: 'Most vulnerabilities remediated based on risk' },
                { value: 3, label: 'Fully implemented', description: 'Complete risk-based vulnerability remediation' }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'security-assessment', name: 'Security Assessment (CA)', description: 'Assess, authorize, and monitor the security of organizational systems', weight: 8, priority: 'medium', categories: [
        {
          id: 'security-assessment', name: 'Security Assessment', description: 'Assess security controls and systems', weight: 100, questions: [
            {
              id: 'cmmc.ca.3.12.1', text: 'Periodically assess the security controls in organizational systems to determine if the controls are effective in their application.', guidance: 'Organizations assess security controls in organizational systems and the environments in which those systems operate.', priority: 'medium', references: ['3.12.1'], examples: ['Security control assessments', 'Control testing', 'Effectiveness evaluation', 'Security reviews'], options: [
                { value: 0, label: 'Not implemented', description: 'No security control assessments' },
                { value: 1, label: 'Partially implemented', description: 'Basic assessments for some controls' },
                { value: 2, label: 'Largely implemented', description: 'Regular control assessments with some gaps' },
                { value: 3, label: 'Fully implemented', description: 'Complete security control assessment program' }
              ]
            },
            {
              id: 'cmmc.ca.3.12.2', text: 'Develop and implement plans of action designed to correct deficiencies and reduce or eliminate vulnerabilities in organizational systems.', guidance: 'The plan of action is a key document in the information security program.', priority: 'medium', references: ['3.12.2'], examples: ['Remediation plans', 'Action item tracking', 'Deficiency correction', 'Vulnerability mitigation'], options: [
                { value: 0, label: 'Not implemented', description: 'No plans of action for deficiencies' },
                { value: 1, label: 'Partially implemented', description: 'Basic plans for critical deficiencies' },
                { value: 2, label: 'Largely implemented', description: 'Most deficiencies have remediation plans' },
                { value: 3, label: 'Fully implemented', description: 'Complete deficiency management and remediation' }
              ]
            },
            {
              id: 'cmmc.ca.3.12.3', text: 'Monitor security controls on an ongoing basis to ensure the continued effectiveness of the controls.', guidance: 'Continuous monitoring programs facilitate ongoing awareness of threats, vulnerabilities, and information security.', priority: 'medium', references: ['3.12.3'], examples: ['Continuous monitoring', 'Control effectiveness tracking', 'Security metrics', 'Performance monitoring'], options: [
                { value: 0, label: 'Not implemented', description: 'No ongoing security control monitoring' },
                { value: 1, label: 'Partially implemented', description: 'Basic monitoring for some controls' },
                { value: 2, label: 'Largely implemented', description: 'Regular monitoring with some gaps' },
                { value: 3, label: 'Fully implemented', description: 'Complete continuous security control monitoring' }
              ]
            },
            {
              id: 'cmmc.ca.3.12.4', text: 'Develop, document, and periodically update system security plans that describe system boundaries, system environments of operation, how security requirements are implemented, and the relationships with or connections to other systems.', guidance: 'System security plans relate security requirements to a set of security controls.', priority: 'high', references: ['3.12.4'], examples: ['System security plans', 'Security documentation', 'Plan updates', 'Boundary descriptions'], options: [
                { value: 0, label: 'Not implemented', description: 'No system security plans' },
                { value: 1, label: 'Partially implemented', description: 'Basic plans for some systems' },
                { value: 2, label: 'Largely implemented', description: 'Most systems have current security plans' },
                { value: 3, label: 'Fully implemented', description: 'Complete system security planning program' }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'system-communications-protection', name: 'System and Communications Protection (SC)', description: 'Monitor, control, and protect communications at external and internal boundaries', weight: 15, priority: 'high', categories: [
        {
          id: 'communications-protection', name: 'Communications Protection', description: 'Protect system communications', weight: 100, questions: [
            {
              id: 'cmmc.sc.3.13.1', text: 'Monitor, control, and protect communications (i.e., information transmitted or received by organizational systems) at the external boundaries and key internal boundaries of organizational systems.', guidance: 'Communications can be monitored, controlled, and protected at boundary components and by restricting or prohibiting interfaces.', priority: 'high', references: ['3.13.1'], examples: ['Boundary protection', 'Firewall systems', 'Network monitoring', 'Traffic control'], options: [
                { value: 0, label: 'Not implemented', description: 'No boundary communications protection' },
                { value: 1, label: 'Partially implemented', description: 'Basic boundary protection' },
                { value: 2, label: 'Largely implemented', description: 'Most communications properly protected' },
                { value: 3, label: 'Fully implemented', description: 'Complete boundary communications protection' }
              ]
            },
            {
              id: 'cmmc.sc.3.13.2', text: 'Employ architectural designs, software development techniques, and systems engineering principles that promote effective information security within organizational systems.', guidance: 'Organizations apply systems security engineering principles to new development systems or systems undergoing major upgrades.', priority: 'medium', references: ['3.13.2'], examples: ['Secure architecture', 'Security engineering', 'Design principles', 'Development practices'], options: [
                { value: 0, label: 'Not implemented', description: 'No security engineering principles applied' },
                { value: 1, label: 'Partially implemented', description: 'Basic security principles for some systems' },
                { value: 2, label: 'Largely implemented', description: 'Security engineering principles widely applied' },
                { value: 3, label: 'Fully implemented', description: 'Complete security engineering program' }
              ]
            },
            {
              id: 'cmmc.sc.3.13.3', text: 'Separate user functionality from system management functionality.', guidance: 'System management functionality includes functions necessary to administer databases, network components, workstations, or servers.', priority: 'medium', references: ['3.13.3'], examples: ['Function separation', 'Administrative interfaces', 'User/admin segregation', 'Role separation'], options: [
                { value: 0, label: 'Not implemented', description: 'No separation of user and management functions' },
                { value: 1, label: 'Partially implemented', description: 'Basic separation for some functions' },
                { value: 2, label: 'Largely implemented', description: 'Most functions properly separated' },
                { value: 3, label: 'Fully implemented', description: 'Complete functional separation' }
              ]
            },
            {
              id: 'cmmc.sc.3.13.4', text: 'Prevent unauthorized and unintended information transfer via shared system resources.', guidance: 'The control of information in shared system resources is also commonly referred to as object reuse and residual information protection.', priority: 'medium', references: ['3.13.4'], examples: ['Resource clearing', 'Information isolation', 'Memory protection', 'Data residue prevention'], options: [
                { value: 0, label: 'Not implemented', description: 'No protection against information transfer via shared resources' },
                { value: 1, label: 'Partially implemented', description: 'Basic protection for some shared resources' },
                { value: 2, label: 'Largely implemented', description: 'Most shared resources properly protected' },
                { value: 3, label: 'Fully implemented', description: 'Complete shared resource information protection' }
              ]
            },
            {
              id: 'cmmc.sc.3.13.5', text: 'Implement subnetworks for publicly accessible system components that are physically or logically separated from internal networks.', guidance: 'Subnetworks that are physically or logically separated from internal networks are referred to as demilitarized zones (DMZs).', priority: 'high', references: ['3.13.5'], examples: ['DMZ implementation', 'Network segmentation', 'Public system isolation', 'Boundary separation'], options: [
                { value: 0, label: 'Not implemented', description: 'No subnetworks for publicly accessible components' },
                { value: 1, label: 'Partially implemented', description: 'Basic segmentation for some public components' },
                { value: 2, label: 'Largely implemented', description: 'Most public components in separate subnetworks' },
                { value: 3, label: 'Fully implemented', description: 'Complete subnetwork implementation for public components' }
              ]
            },
            {
              id: 'cmmc.sc.3.13.6', text: 'Deny network communications traffic by default and allow network communications traffic by exception (i.e., deny all, permit by exception).', guidance: 'A deny-all, permit-by-exception network communications traffic policy ensures that only those connections which are essential and approved are allowed.', priority: 'high', references: ['3.13.6'], examples: ['Default deny policies', 'Whitelist approach', 'Exception-based access', 'Traffic restrictions'], options: [
                { value: 0, label: 'Not implemented', description: 'No default deny network policy' },
                { value: 1, label: 'Partially implemented', description: 'Deny-by-default for some network segments' },
                { value: 2, label: 'Largely implemented', description: 'Most network traffic follows deny-by-default' },
                { value: 3: label: 'Fully implemented', description: 'Complete deny-all: permit-by-exception policy'  }
              ]
            },
            {
              id: 'cmmc.sc.3.13.7', text: 'Prevent remote devices from simultaneously establishing non-remote connections with organizational systems and communicating via some other connection to resources in external networks (i.e., split tunneling).', guidance: 'Split tunneling allows unauthorized external connections, making the system more vulnerable to attack and to exfiltration of organizational information.', priority: 'medium', references: ['3.13.7'], examples: ['Split tunneling prevention', 'VPN controls', 'Connection restrictions', 'Remote device management'], options: [
                { value: 0, label: 'Not implemented', description: 'No split tunneling prevention' },
                { value: 1, label: 'Partially implemented', description: 'Basic controls for some remote devices' },
                { value: 2, label: 'Largely implemented', description: 'Most remote devices prevent split tunneling' },
                { value: 3, label: 'Fully implemented', description: 'Complete split tunneling prevention' }
              ]
            },
            {
              id: 'cmmc.sc.3.13.8', text: 'Implement cryptographic mechanisms to prevent unauthorized disclosure of CUI during transmission unless otherwise protected by alternative physical safeguards.', guidance: 'This requirement applies to internal and external networks and any system components that can transmit information.', priority: 'high', references: ['3.13.8'], examples: ['Transmission encryption', 'Data in transit protection', 'Cryptographic protocols', 'Communication security'], options: [
                { value: 0, label: 'Not implemented', description: 'No encryption for CUI transmission' },
                { value: 1, label: 'Partially implemented', description: 'Basic encryption for some CUI transmissions' },
                { value: 2, label: 'Largely implemented', description: 'Most CUI transmissions encrypted' },
                { value: 3, label: 'Fully implemented', description: 'Complete CUI transmission encryption' }
              ]
            },
            {
              id: 'cmmc.sc.3.13.9', text: 'Terminate network connections associated with communications sessions at the end of the sessions or after a defined period of inactivity.', guidance: 'This requirement applies to internal and external networks.', priority: 'medium', references: ['3.13.9'], examples: ['Session termination', 'Connection timeouts', 'Automatic disconnect', 'Resource deallocation'], options: [
                { value: 0, label: 'Not implemented', description: 'No automatic network connection termination' },
                { value: 1, label: 'Partially implemented', description: 'Basic termination for some connections' },
                { value: 2, label: 'Largely implemented', description: 'Most connections properly terminated' },
                { value: 3, label: 'Fully implemented', description: 'Complete network connection termination management' }
              ]
            },
            {
              id: 'cmmc.sc.3.13.10', text: 'Establish and manage cryptographic keys for cryptography employed in organizational systems.', guidance: 'Cryptographic key management and establishment can be performed using manual procedures or mechanisms supported by manual procedures.', priority: 'high', references: ['3.13.10'], examples: ['Key management systems', 'Key lifecycle', 'Cryptographic controls', 'Key distribution'], options: [
                { value: 0, label: 'Not implemented', description: 'No cryptographic key management' },
                { value: 1, label: 'Partially implemented', description: 'Basic key management for some systems' },
                { value: 2, label: 'Largely implemented', description: 'Most cryptographic keys properly managed' },
                { value: 3, label: 'Fully implemented', description: 'Complete cryptographic key management program' }
              ]
            },
            {
              id: 'cmmc.sc.3.13.11', text: 'Employ FIPS-validated cryptography when used to protect the confidentiality of CUI.', guidance: 'Cryptographic standards include FIPS-validated cryptography and/or NSA-approved cryptography.', priority: 'high', references: ['3.13.11'], examples: ['FIPS 140-2 compliance', 'Validated algorithms', 'Approved cryptography', 'Standards compliance'], options: [
                { value: 0, label: 'Not implemented', description: 'No FIPS-validated cryptography' },
                { value: 1, label: 'Partially implemented', description: 'FIPS-validated crypto for some CUI protection' },
                { value: 2, label: 'Largely implemented', description: 'Most CUI protected with FIPS-validated crypto' },
                { value: 3, label: 'Fully implemented', description: 'Complete FIPS-validated cryptography for CUI' }
              ]
            },
            {
              id: 'cmmc.sc.3.13.12', text: 'Prohibit remote activation of collaborative computing devices and provide indication of devices in use to users present at the device.', guidance: 'Collaborative computing devices include networked white boards, cameras, and microphones.', priority: 'low', references: ['3.13.12'], examples: ['Device activation controls', 'Usage indicators', 'Remote activation prevention', 'Collaborative device management'], options: [
                { value: 0, label: 'Not implemented', description: 'No controls on collaborative device activation' },
                { value: 1, label: 'Partially implemented', description: 'Basic controls for some collaborative devices' },
                { value: 2, label: 'Largely implemented', description: 'Most collaborative devices properly controlled' },
                { value: 3, label: 'Fully implemented', description: 'Complete collaborative device activation control' }
              ]
            },
            {
              id: 'cmmc.sc.3.13.13', text: 'Control and monitor the use of mobile code.', guidance: 'Mobile code technologies include Java, JavaScript, ActiveX, Postscript, PDF, Flash animations, and VBScript.', priority: 'medium', references: ['3.13.13'], examples: ['Mobile code policies', 'Code execution controls', 'JavaScript restrictions', 'Active content filtering'], options: [
                { value: 0, label: 'Not implemented', description: 'No mobile code controls' },
                { value: 1, label: 'Partially implemented', description: 'Basic controls for some mobile code' },
                { value: 2, label: 'Largely implemented', description: 'Most mobile code properly controlled' },
                { value: 3, label: 'Fully implemented', description: 'Complete mobile code control and monitoring' }
              ]
            },
            {
              id: 'cmmc.sc.3.13.14', text: 'Control and monitor the use of Voice over Internet Protocol (VoIP) technologies.', guidance: 'VoIP has different requirements, features, functionality, availability, and service limitations when compared with Plain Old Telephone Service (POTS).', priority: 'low', references: ['3.13.14'], examples: ['VoIP security policies', 'Voice communication controls', 'Protocol restrictions', 'VoIP monitoring'], options: [
                { value: 0, label: 'Not implemented', description: 'No VoIP controls' },
                { value: 1, label: 'Partially implemented', description: 'Basic VoIP security controls' },
                { value: 2, label: 'Largely implemented', description: 'Most VoIP use properly controlled' },
                { value: 3, label: 'Fully implemented', description: 'Complete VoIP control and monitoring' }
              ]
            },
            {
              id: 'cmmc.sc.3.13.15', text: 'Protect the authenticity of communications sessions.', guidance: 'Authenticity protection includes protecting against man-in-the-middle attacks, session hijacking, and the insertion of false information.', priority: 'medium', references: ['3.13.15'], examples: ['Session authentication', 'Communication integrity', 'Anti-tampering', 'Session protection'], options: [
                { value: 0, label: 'Not implemented', description: 'No session authenticity protection' },
                { value: 1, label: 'Partially implemented', description: 'Basic session protection for some communications' },
                { value: 2, label: 'Largely implemented', description: 'Most communication sessions protected' },
                { value: 3, label: 'Fully implemented', description: 'Complete communications session authenticity protection' }
              ]
            },
            {
              id: 'cmmc.sc.3.13.16', text: 'Protect the confidentiality of CUI at rest.', guidance: 'Information at rest refers to the state of information when it is not in process or in transit and is located on storage devices.', priority: 'high', references: ['3.13.16'], examples: ['Data at rest encryption', 'Storage protection', 'Database encryption', 'File system encryption'], options: [
                { value: 0, label: 'Not implemented', description: 'No protection for CUI at rest' },
                { value: 1, label: 'Partially implemented', description: 'Basic protection for some CUI at rest' },
                { value: 2, label: 'Largely implemented', description: 'Most CUI at rest properly protected' },
                { value: 3, label: 'Fully implemented', description: 'Complete CUI at rest protection' }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'system-information-integrity', name: 'System and Information Integrity (SI)', description: 'Identify, report, and correct information and information system flaws', weight: 12, priority: 'high', categories: [
        {
          id: 'information-integrity', name: 'Information Integrity', description: 'Maintain system and information integrity', weight: 100, questions: [
            {
              id: 'cmmc.si.3.14.1', text: 'Identify, report, and correct system flaws in a timely manner.', guidance: 'Organizations identify systems that are affected by announced software and firmware flaws including potential vulnerabilities.', priority: 'high', references: ['3.14.1'], examples: ['Vulnerability management', 'Patch management', 'Flaw remediation', 'System updates'], options: [
                { value: 0, label: 'Not implemented', description: 'No flaw identification or correction process' },
                { value: 1, label: 'Partially implemented', description: 'Basic flaw management for critical systems' },
                { value: 2, label: 'Largely implemented', description: 'Most flaws properly identified and corrected' },
                { value: 3, label: 'Fully implemented', description: 'Complete flaw management program' }
              ]
            },
            {
              id: 'cmmc.si.3.14.2', text: 'Provide protection from malicious code at designated locations within organizational systems.', guidance: 'Designated locations include system entry and exit points which may include firewalls, remote-access servers, workstations.', priority: 'high', references: ['3.14.2'], examples: ['Antivirus software', 'Anti-malware systems', 'Signature updates', 'Malware detection'], options: [
                { value: 0, label: 'Not implemented', description: 'No malicious code protection' },
                { value: 1, label: 'Partially implemented', description: 'Basic malware protection on some systems' },
                { value: 2, label: 'Largely implemented', description: 'Malware protection on most systems' },
                { value: 3, label: 'Fully implemented', description: 'Complete malicious code protection program' }
              ]
            },
            {
              id: 'cmmc.si.3.14.3', text: 'Monitor system security alerts and advisories and take action in response.', guidance: 'There are many publicly available sources of system security alerts and advisories.', priority: 'medium', references: ['3.14.3'], examples: ['Security alert monitoring', 'Advisory tracking', 'Threat response', 'Security bulletins'], options: [
                { value: 0, label: 'Not implemented', description: 'No security alert monitoring' },
                { value: 1, label: 'Partially implemented', description: 'Basic monitoring of some security alerts' },
                { value: 2, label: 'Largely implemented', description: 'Regular monitoring and response to alerts' },
                { value: 3, label: 'Fully implemented', description: 'Complete security alert management program' }
              ]
            },
            {
              id: 'cmmc.si.3.14.4', text: 'Update malicious code protection mechanisms when new releases are available.', guidance: 'Malicious code protection mechanisms include anti-virus signature definitions and reputation-based technologies.', priority: 'medium', references: ['3.14.4'], examples: ['Signature updates', 'Definition updates', 'Protection updates', 'Automated updating'], options: [
                { value: 0, label: 'Not implemented', description: 'No malicious code protection updates' },
                { value: 1, label: 'Partially implemented', description: 'Basic updates for some protection mechanisms' },
                { value: 2, label: 'Largely implemented', description: 'Regular updates for most protection systems' },
                { value: 3, label: 'Fully implemented', description: 'Complete malicious code protection update program' }
              ]
            },
            {
              id: 'cmmc.si.3.14.5', text: 'Perform periodic scans of organizational systems and real-time scans of files from external sources as files are downloaded, opened, or executed.', guidance: 'Periodic scans of organizational systems and real-time scans of files from external sources can detect malicious code.', priority: 'medium', references: ['3.14.5'], examples: ['System scanning', 'File scanning', 'Real-time protection', 'Malware detection'], options: [
                { value: 0, label: 'Not implemented', description: 'No system or file scanning' },
                { value: 1, label: 'Partially implemented', description: 'Basic scanning for some systems' },
                { value: 2, label: 'Largely implemented', description: 'Regular scanning on most systems' },
                { value: 3, label: 'Fully implemented', description: 'Complete system and file scanning program' }
              ]
            },
            {
              id: 'cmmc.si.3.14.6', text: 'Monitor organizational systems, including inbound and outbound communications traffic, to detect attacks and indicators of potential attacks.', guidance: 'System monitoring includes external and internal monitoring.', priority: 'medium', references: ['3.14.6'], examples: ['Network monitoring', 'Traffic analysis', 'Intrusion detection', 'Attack detection'], options: [
                { value: 0, label: 'Not implemented', description: 'No system monitoring for attacks' },
                { value: 1, label: 'Partially implemented', description: 'Basic monitoring for some systems' },
                { value: 2, label: 'Largely implemented', description: 'Comprehensive monitoring with some gaps' },
                { value: 3, label: 'Fully implemented', description: 'Complete system monitoring for attack detection' }
              ]
            },
            {
              id: 'cmmc.si.3.14.7', text: 'Identify unauthorized use of organizational systems.', guidance: 'System monitoring can detect unauthorized use of organizational systems.', priority: 'medium', references: ['3.14.7'], examples: ['Usage monitoring', 'Unauthorized access detection', 'Behavioral analysis', 'Activity monitoring'], options: [
                { value: 0, label: 'Not implemented', description: 'No monitoring for unauthorized system use' },
                { value: 1, label: 'Partially implemented', description: 'Basic monitoring for some unauthorized use' },
                { value: 2, label: 'Largely implemented', description: 'Most unauthorized use properly detected' },
                { value: 3, label: 'Fully implemented', description: 'Complete unauthorized use identification program' }
              ]
            }
          ]
        }
      ]
    }
  ]
};