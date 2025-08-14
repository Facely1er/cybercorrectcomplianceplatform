import React, { useState } from 'react';
import { 
  ChevronLeft, BookOpen, Play, Target, BarChart3, FileText, 
  ChevronDown, ChevronRight, Shield, Users, Settings, HelpCircle,
  Download, Upload, Eye, Edit3, Trash2, Filter, Search
} from 'lucide-react';
import { Breadcrumbs } from '../layout/Breadcrumbs';
import { useInternalLinking } from '../../hooks/useInternalLinking';

interface UserManualProps {
  onBack: () => void;
}

export const UserManual: React.FC<UserManualProps> = ({ onBack }) => {
  const [activeSection, setActiveSection] = useState('getting-started');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const { breadcrumbs } = useInternalLinking();

  const sections = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: Play,
      content: [
        {
          title: 'Welcome to the Cybersecurity Maturity Assessment Tool',
          content: `This comprehensive platform helps organizations identify compliance gaps, improve their security posture, and track progress using industry-standard frameworks. Whether you're a CISO, security manager, or compliance officer, this tool provides the insights you need to strengthen your compliance and security posture.`
        },
        {
          title: 'System Requirements',
          content: `
            • Modern web browser (Chrome, Firefox, Safari, Edge)
            • Internet connection for initial setup
            • JavaScript enabled
            • Minimum screen resolution: 1024x768
            • Local storage enabled for data persistence
          `
        },
        {
          title: 'First Time Setup',
          content: `
            1. **Create Your Profile**: Set up your user profile with organization details
            2. **Choose Framework**: Select the cybersecurity framework that best fits your needs
            3. **Review Templates**: Consider using industry-specific templates to accelerate your assessment
            4. **Start Assessment**: Begin answering questions with built-in guidance
          `
        }
      ]
    },
    {
      id: 'frameworks',
      title: 'Supported Frameworks',
      icon: Shield,
      content: [
        {
          title: 'NIST Cybersecurity Framework (CSF)',
          content: `
            **Overview**: The most widely adopted cybersecurity framework, providing a policy framework of computer security guidance.
            
            **Best For**: Organizations of all sizes across all industries
            **Estimated Time**: 120 minutes
            **Sections**: Identify, Protect, Detect, Respond, Recover
            
            **Key Features**:
            • Comprehensive risk management approach
            • Flexible implementation guidance
            • Industry-agnostic design
            • Strong focus on business outcomes
          `
        },
        {
          title: 'ISO/IEC 27001:2022',
          content: `
            **Overview**: International standard for information security management systems (ISMS).
            
            **Best For**: Organizations seeking formal certification
            **Estimated Time**: 180 minutes
            **Sections**: Context, Leadership, Planning, Support, Operation, Performance Evaluation, Improvement
            
            **Key Features**:
            • Certification-ready assessment
            • Process-oriented approach
            • Continuous improvement focus
            • Global recognition
          `
        },
        {
          title: 'CMMC (Cybersecurity Maturity Model Certification)',
          content: `
            **Overview**: Department of Defense cybersecurity standard for contractors.
            
            **Best For**: DoD contractors and suppliers
            **Estimated Time**: 240 minutes
            **Levels**: Foundational, Advanced, Expert
            
            **Key Features**:
            • CUI protection requirements
            • Maturity-based progression
            • Third-party assessment ready
            • DoD compliance focus
          `
        },
        {
          title: 'NIST Privacy Framework',
          content: `
            **Overview**: Tool for improving privacy through enterprise risk management.
            
            **Best For**: Organizations handling personal data
            **Estimated Time**: 90 minutes
            **Sections**: Identify-P, Govern-P, Control-P, Communicate-P
            
            **Key Features**:
            • Privacy risk management
            • GDPR/CCPA alignment
            • Data protection focus
            • Stakeholder communication
          `
        },
        {
          title: 'Supply Chain Risk Management (NIST SP 800-161)',
          content: `
            **Overview**: Cyber supply chain risk management practices.
            
            **Best For**: Organizations with complex supply chains
            **Estimated Time**: 150 minutes
            **Sections**: Governance, Risk Assessment, Mitigation, Monitoring
            
            **Key Features**:
            • Supplier risk assessment
            • Third-party risk management
            • Critical infrastructure focus
            • End-to-end supply chain view
          `
        }
      ]
    },
    {
      id: 'assessment-process',
      title: 'Assessment Process',
      icon: Target,
      content: [
        {
          title: 'Starting an Assessment',
          content: `
            **Step 1: Framework Selection**
            Choose the framework that best aligns with your organization's needs:
            • Consider your industry requirements
            • Review compliance obligations
            • Assess available resources and time
            
            **Step 2: Template Selection (Optional)**
            Use industry-specific templates to:
            • Accelerate the assessment process
            • Start with baseline responses
            • Leverage best practices
            
            **Step 3: Organization Information**
            Provide context about your organization:
            • Company name and industry
            • Assessment scope and objectives
            • Key stakeholders and contacts
          `
        },
        {
          title: 'Answering Questions',
          content: `
            **Question Types**:
            • **Implementation Questions**: Assess current state of controls
            • **Maturity Questions**: Evaluate process maturity levels
            • **Risk Questions**: Identify and assess risks
            
            **Response Options**:
            • **Not Implemented** (0 points): Control not in place
            • **Partially Implemented** (1 point): Basic implementation
            • **Largely Implemented** (2 points): Comprehensive implementation
            • **Fully Implemented** (3 points): Complete implementation with optimization
            
            **Using Guidance**:
            • Click "Show Guidance" for detailed explanations
            • Review examples and best practices
            • Consider references to framework controls
          `
        },
        {
          title: 'Navigation and Progress',
          content: `
            **Navigation Features**:
            • **Quick Navigation**: Jump between sections and categories
            • **Progress Tracking**: Monitor completion percentage
            • **Auto-save**: Automatic progress saving every 5 seconds
            • **Manual Save**: Save progress at any time
            
            **Progress Indicators**:
            • Overall completion percentage
            • Section-level progress
            • Question completion status
            • Time estimates for remaining work
          `
        }
      ]
    },
    {
      id: 'dashboard',
      title: 'Dashboard Features',
      icon: BarChart3,
      content: [
        {
          title: 'Assessment Management',
          content: `
            **Saved Assessments**:
            • View all saved assessments
            • Filter by framework, status, or date
            • Search by organization or assessor name
            • Sort by completion, score, or modification date
            
            **Assessment Actions**:
            • **Continue**: Resume incomplete assessments
            • **View Report**: Generate and view assessment reports
            • **Export**: Download assessment data (JSON, CSV)
            • **Delete**: Remove assessments (with confirmation)
            
            **Quick Statistics**:
            • Total number of assessments
            • Completed vs. in-progress counts
            • Average maturity scores
            • Recent activity summary
          `
        },
        {
          title: 'Templates and Comparison',
          content: `
            **Template Library**:
            • Browse industry-specific templates
            • Filter by industry and framework
            • Preview template details and pre-filled responses
            • Start assessments from templates
            
            **Assessment Comparison**:
            • Compare multiple assessments side-by-side
            • Track improvement over time
            • Identify trends and patterns
            • Generate comparison reports
          `
        }
      ]
    },
    {
      id: 'reports',
      title: 'Reports and Analytics',
      icon: FileText,
      content: [
        {
          title: 'Report Generation',
          content: `
            **Report Types**:
            • **Executive Summary**: High-level overview for leadership
            • **Detailed Analysis**: Comprehensive technical assessment
            • **Gap Analysis**: Specific recommendations for improvement
            • **Comparison Report**: Progress tracking over time
            
            **Report Sections**:
            • **Executive Summary**: Key findings and recommendations
            • **Maturity Scoring**: Overall and section-level scores
            • **Gap Analysis**: Areas needing improvement
            • **Action Plan**: Prioritized recommendations
            • **Appendices**: Detailed question responses
          `
        },
        {
          title: 'Export Options',
          content: `
            **Export Formats**:
            • **PDF**: Professional reports for stakeholders
            • **JSON**: Raw data for integration with other tools
            • **CSV**: Spreadsheet-compatible format for analysis
            
            **Export Features**:
            • Custom branding options
            • Selective section inclusion
            • Multiple language support
            • Automated generation
          `
        },
        {
          title: 'Analytics and Insights',
          content: `
            **Maturity Scoring**:
            • Overall maturity percentage
            • Section-level breakdown
            • Category performance analysis
            • Trend analysis over time
            
            **Gap Analysis**:
            • Priority-ranked improvement areas
            • Risk-based recommendations
            • Resource allocation guidance
            • Timeline suggestions
          `
        }
      ]
    },
    {
      id: 'user-management',
      title: 'User Management',
      icon: Users,
      content: [
        {
          title: 'User Profiles',
          content: `
            **Profile Information**:
            • Personal details (name, email, role)
            • Organization information
            • Professional certifications
            • Contact preferences
            
            **Profile Benefits**:
            • Personalized dashboard experience
            • Relevant framework recommendations
            • Industry-specific guidance
            • Progress tracking across assessments
          `
        },
        {
          title: 'Preferences and Settings',
          content: `
            **Assessment Preferences**:
            • Default framework selection
            • Auto-save frequency
            • Notification settings
            • Report format preferences
            
            **Display Settings**:
            • Theme selection (light/dark)
            • Language preferences
            • Dashboard layout
            • Accessibility options
          `
        }
      ]
    },
    {
      id: 'data-management',
      title: 'Data Management',
      icon: Settings,
      content: [
        {
          title: 'Data Storage and Security',
          content: `
            **Local Storage**:
            • All data stored locally in your browser
            • No data transmitted to external servers
            • Complete privacy and control
            • Offline capability for assessments
            
            **Data Security**:
            • Client-side encryption
            • Secure data handling
            • No third-party data sharing
            • GDPR compliant design
          `
        },
        {
          title: 'Import and Export',
          content: `
            **Data Export**:
            • Export all assessment data
            • Backup for disaster recovery
            • Migration to other systems
            • Compliance documentation
            
            **Data Import**:
            • Import previous assessments
            • Restore from backups
            • Migrate from other tools
            • Bulk data loading
          `
        },
        {
          title: 'Data Retention',
          content: `
            **Retention Policies**:
            • Configurable retention periods
            • Automatic cleanup options
            • Manual data management
            • Compliance with organizational policies
            
            **Data Cleanup**:
            • Remove old assessments
            • Clear temporary data
            • Reset application state
            • Secure data deletion
          `
        }
      ]
    }
  ];

  const faqs = [
    {
      question: 'How long does a typical assessment take?',
      answer: 'Assessment time varies by framework: NIST CSF (120 min), ISO 27001 (180 min), CMMC (240 min), Privacy Framework (90 min), and SCRM (150 min). Using templates can reduce time by 30-40%.'
    },
    {
      question: 'Can I save my progress and continue later?',
      answer: 'Yes, the tool automatically saves your progress every 5 seconds. You can also manually save at any time and resume your assessment from where you left off.'
    },
    {
      question: 'How are maturity scores calculated?',
      answer: 'Scores are calculated based on your responses: Not Implemented (0%), Partially (25%), Largely (50%), Fully Implemented (75%). Section scores are weighted averages, and the overall score combines all sections.'
    },
    {
      question: 'Can I compare assessments over time?',
      answer: 'Yes, the comparison feature allows you to track progress across multiple assessments, identify improvement trends, and measure the effectiveness of security investments.'
    },
    {
      question: 'What export formats are available?',
      answer: 'You can export assessments in PDF (for reports), JSON (for data integration), and CSV (for spreadsheet analysis). Reports include executive summaries, detailed analysis, and gap assessments.'
    },
    {
      question: 'Is my data secure and private?',
      answer: 'Yes, all data is stored locally in your browser. No information is transmitted to external servers, ensuring complete privacy and security of your assessment data.'
    },
    {
      question: 'Can I customize the assessment questions?',
      answer: 'While you cannot modify the standard framework questions, you can use templates that include pre-filled responses based on industry best practices and common implementations.'
    },
    {
      question: 'How do I choose the right framework?',
      answer: 'Consider your industry (healthcare = NIST CSF + Privacy, DoD contractors = CMMC, all industries = NIST CSF), compliance requirements, and organizational maturity level. The tool provides guidance for each framework.'
    }
  ];

  const shortcuts = [
    { key: 'Ctrl + S', action: 'Save progress' },
    { key: 'Ctrl + N', action: 'Start new assessment' },
    { key: 'Ctrl + R', action: 'Generate report' },
    { key: 'Ctrl + F', action: 'Search assessments' },
    { key: 'Ctrl + E', action: 'Export data' },
    { key: 'Ctrl + H', action: 'Show/hide help' }
  ];

  const currentSection = sections.find(s => s.id === activeSection);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumbs */}
      <div className="mb-6">
        <Breadcrumbs items={breadcrumbs} />
      </div>

      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 mb-8">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
                <span>Back</span>
              </button>
              <div className="h-6 w-px bg-gray-300 dark:bg-gray-600" />
              <div className="flex items-center space-x-3">
                <BookOpen className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  User Manual
                </h1>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <Download className="w-4 h-4" />
                <span>Download PDF</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 sticky top-24">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Table of Contents
              </h2>
              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full text-left p-3 rounded-lg transition-colors flex items-center space-x-3 ${
                      activeSection === section.id
                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <section.icon className="w-5 h-5" />
                    <span className="font-medium">{section.title}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-8">
          {/* Current Section Content */}
          {currentSection && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
              <div className="flex items-center space-x-3 mb-6">
                <currentSection.icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {currentSection.title}
                </h2>
              </div>
              
              <div className="space-y-8">
                {currentSection.content.map((item, index) => (
                  <div key={index}>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                      {item.title}
                    </h3>
                    <div className="prose prose-gray dark:prose-invert max-w-none">
                      <div className="whitespace-pre-line text-gray-600 dark:text-gray-300 leading-relaxed">
                        {item.content}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Reference Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Keyboard Shortcuts */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Settings className="w-6 h-6 mr-3 text-blue-600 dark:text-blue-400" />
                Keyboard Shortcuts
              </h3>
              <div className="space-y-3">
                {shortcuts.map((shortcut, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-300">{shortcut.action}</span>
                    <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded text-sm font-mono">
                      {shortcut.key}
                    </kbd>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Target className="w-6 h-6 mr-3 text-green-600 dark:text-green-400" />
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button className="w-full text-left p-3 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-3">
                  <Play className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span className="text-gray-700 dark:text-gray-300">Start New Assessment</span>
                </button>
                <button className="w-full text-left p-3 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-3">
                  <FileText className="w-5 h-5 text-green-600 dark:text-green-400" />
                  <span className="text-gray-700 dark:text-gray-300">View Templates</span>
                </button>
                <button className="w-full text-left p-3 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-3">
                  <BarChart3 className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  <span className="text-gray-700 dark:text-gray-300">Compare Assessments</span>
                </button>
                <button className="w-full text-left p-3 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-3">
                  <Download className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                  <span className="text-gray-700 dark:text-gray-300">Export Data</span>
                </button>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <HelpCircle className="w-8 h-8 mr-3 text-blue-600 dark:text-blue-400" />
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg">
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <span className="font-medium text-gray-900 dark:text-white">
                      {faq.question}
                    </span>
                    {expandedFaq === index ? (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-500" />
                    )}
                  </button>
                  
                  {expandedFaq === index && (
                    <div className="px-4 pb-4">
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Support Section */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200 dark:border-blue-800 p-8">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Need Additional Help?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Our support team is here to help you get the most out of your cybersecurity assessment experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium" disabled>
                Contact your administrator for support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};