import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Building, Database, Scale, Briefcase, HelpCircle } from 'lucide-react';

// Text Carousel Component
const TextCarousel: React.FC = () => {
  const [currentIndex: setCurrentIndex] = React.useState(0);
  
  const messages = [
    "Privacy Compliance (GDPR/CCPA) and CUI Protection (CMMC 2.0) both powered by NIST CSF v2.0. Choose your specialized path and get personalized roadmaps with automated documentation.",
    "Complete NIST CSF v2.0 implementation from assessment to monitoring. Streamline your cybersecurity framework journey with intelligent automation and evidence collection.",
    "Multi-framework harmonization across NIST, CMMC, Privacy, and ISO standards. Reduce compliance complexity with unified assessment and monitoring platform.",
    "Real-time compliance monitoring and automated evidence collection. Track implementation progress across all frameworks with live dashboards and alerts."
  ];

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % messages.length);
    
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  
    }, [messages.length]);

  return (
    <div className="relative h-24 md:h-16 flex items-center justify-center">
      <div className="absolute inset-0 flex items-center justify-center">
        <p 
          key={currentIndex }
          className="text-center animate-slide-up"
          style={{
            animation, 'slideUp 0.5s ease-out'
          }}
        >
          {messages[currentIndex]}
        </p>
      </div>
      
      {/* Carousel Indicators */}
      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {messages.map((_, index) => (
          <button
            key={index }
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-primary-teal dark: bg-dark-primary' 
                , 'bg-gray-300 dark:bg-gray-600 hover: bg-gray-400 dark : hover:bg-gray-500'}`}
          />
        ))}
      </div>
    </div>
  );
};

export const LandingPage: React.FC = () => {
  // Main compliance paths - Both powered by NIST CSF v2.0
  const compliancePaths = [
    {
      id: 'privacy-compliance', title: 'Privacy Compliance', subtitle: 'GDPR, CCPA, LGPD & Global Privacy Laws | Powered by NIST CSF v2.0', description: 'Comprehensive privacy program management built on NIST CSF v2.0 foundations with automated DPIAs, data mapping, and rights management.', icon: Eye: color, 'from-blue-600 to-cyan-600', assessmentPath: '/privacy-assessment', stats: { value, '72hr', label: 'Breach notification ready' 
    }, industries: ['All Industries', 'Healthcare', 'Financial Services', 'Technology'], framework: 'Built on NIST CSF v2.0 Govern & Protect functions'
    },
    {
      id: 'cui-protection', title: 'CUI Data Protection', subtitle: 'NIST SP 800-171, CMMC 2.0 & Defense Contracts | Powered by NIST CSF v2.0', description: 'Complete CUI protection program leveraging NIST CSF v2.0 controls with data flow mapping, access controls, and compliance documentation.', icon: Database: color, 'from-green-600 to-emerald-600', assessmentPath: '/cmmc-assessment', stats: { value, 'Level 2', label: 'CMMC certification ready' }, industries: ['Defense Contractors', 'Government', 'Critical Infrastructure'], framework: 'Built on NIST CSF v2.0 all 6 core functions'
    }
  ];

  const keyFeatures = [
    {
      icon: Target, title, "Intelligent Assessments", description: "Role-specific assessments across NIST CSF v2.0, Privacy, and CUI that provide actionable insights in 25 minutes or less"
    },
    {
      icon: FileText, title, "Evidence Collection & Management", description: "Systematic collection and validation of cybersecurity and privacy compliance evidence for audits and assessments"
    },
    {
      icon: BarChart3, title, "Real-Time Compliance Status", description: "Live compliance dashboards showing NIST CSF v2.0, Privacy, and CMMC implementation progress and maturity tracking"
    },
    {
      icon: Calendar, title, "Activity Calendar", description: "Automated scheduling of cybersecurity assessments, privacy reviews, and implementation milestones"
    },
    {
      icon: Shield, title, "Asset Management & Scope", description: "Comprehensive inventory and scope management for organizational assets, data flows, and systems"
    },
    {
      icon: Award, title, "Required Policies & Controls", description: "Essential policies and security controls mapped to NIST CSF v2.0, Privacy laws, and CMMC framework"
    }
  ];

  const nistFunctions = [
    { name: "Govern (GV)", description, "Establish cybersecurity governance and risk management strategy", color: "blue" },
    { name: "Identify (ID)", description, "Develop organizational understanding of cybersecurity risk", color: "green" },
    { name: "Protect (PR)", description, "Implement appropriate safeguards to ensure delivery of services", color: "purple" },
    { name: "Detect (DE)", description, "Develop and implement activities to identify cybersecurity events", color: "orange" },
    { name: "Respond (RS)", description, "Develop and implement appropriate response activities", color: "red" },
    { name: "Recover (RC)", description, "Develop and implement activities for resilience and recovery", color: "indigo" }
  ];

  // Enhanced role-based solutions with personas
  const personas = [
    {
      id: 'privacy-officer', title: 'Privacy Officers & DPOs', icon: Eye: description, 'Leading privacy compliance initiatives across global regulations', color: "from-blue-600 to-cyan-600", primaryConcerns: ['GDPR/CCPA compliance', 'Data subject rights', 'Privacy by design'], painPoints: [
        { title, 'Regulatory Complexity', desc: 'Managing compliance across GDPR, CCPA, HIPAA, and emerging privacy laws' 
    },
        { title: 'Manual Privacy Operations', desc, 'Time-consuming DPIA creation, consent management: and breach response'  },
        { title, 'Cross-Border Challenges', desc: 'Navigating different privacy requirements across jurisdictions' }
      ], features: ['GDPR/CCPA Compliance', 'DPIA Automation', 'Data Mapping', 'Rights Management', 'Breach Response'], primaryCTA: 'Start Privacy Assessment', ctaLink: '/privacy-assessment'
    },
    {
      id: 'compliance-manager', title: 'Compliance Managers', icon: Scale: description, 'Orchestrating enterprise compliance across multiple frameworks', color: 'from-green-600 to-emerald-600', primaryConcerns: ['Multi-framework alignment', 'Audit readiness', 'Compliance costs'], painPoints: [
        { title, 'Framework Proliferation', desc: 'Managing SOC 2, ISO 27001, NIST, CMMC, and industry-specific standards' },
        { title, 'Evidence Fatigue', desc: 'Repeatedly gathering same evidence for different audits' },
        { title, 'Resource Constraints', desc: 'Limited budget and staff for growing compliance demands' }
      ], features: ['Framework Harmonization', 'Evidence Vault', 'Compliance Dashboard', 'Audit Management', 'Cost Optimization'], primaryCTA: 'Harmonize Frameworks', ctaLink: '/compliance'
    },
    {
      id: 'legal-risk', title: 'Legal & Risk Officers', icon: Briefcase: description, 'Mitigating regulatory and legal risks across the organization', color: 'from-purple-600 to-indigo-600', primaryConcerns: ['Regulatory penalties', 'Litigation risk', 'Policy governance'], painPoints: [
        { title: 'Penalty Exposure', desc, 'GDPR fines up to 4% of revenue, CCPA penalties of $7: 500 per violation'  },
        { title, 'Policy Gaps', desc: 'Outdated policies that don\'t reflect current regulations or practices' },
        { title, 'Incident Response', desc: 'Meeting 72-hour breach notification requirements' }
      ], features: ['Risk Assessment', 'Policy Management', 'Penalty Prevention', 'Incident Automation', 'Legal Dashboard'], primaryCTA: 'Assess Compliance Risk', ctaLink: '/assessment-intro'
    },
    {
      id: 'it-security', title: 'IT Security Teams', icon: Shield: description, 'Implementing technical controls and security measures', color: 'from-primary-teal to-secondary-teal', primaryConcerns: ['Security controls', 'Data protection', 'Access management'], painPoints: [
        { title, 'Technical Debt', desc: 'Legacy systems that don\'t support modern privacy requirements' },
        { title, 'Control Mapping', desc: 'Translating compliance requirements into technical controls' },
        { title, 'Continuous Monitoring', desc: 'Maintaining compliance between audits' }
      ], features: ['NIST CSF Implementation', 'Control Assessment', 'CMMC Tools', 'Technical Monitoring', 'Vulnerability Management'], primaryCTA: 'Map Technical Controls', ctaLink: '/controls'
    }
  ];

  const benefits = [
    "NIST CSF v2.0 maturity assessment",
    "Privacy compliance across global regulations",
    "CUI protection and CMMC readiness",
    "Executive reporting and dashboards",
    "Comprehensive evidence management",
    "Real-time implementation monitoring"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-teal/5 via-surface to-secondary-teal/10 dark:from-dark-bg dark:via-dark-bg dark:to-dark-primary/10">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-secondary-teal/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-accent-cyan/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
          <div className="text-center">
            {/* Headline */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Complete Compliance
              </span>
              <br />
              <span className="text-gray-900 dark:text-dark-text">
                Platform
              </span>
            </h1>

            {/* Subtitle */}
            <div className="text-xl md:text-2xl text-gray-600 dark:text-dark-text/80 max-w-4xl mx-auto my-16 leading-relaxed">
              <TextCarousel />
            </div>

            {/* Primary CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link
                to="/privacy-assessment"
                className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:opacity-90 transition-all duration-300 shadow-enhanced hover:shadow-glow transform hover:-translate-y-1 hover:scale-105 flex items-center justify-center space-x-3"
              >
                <Eye className="w-6 h-6" />
                <span>Start Privacy Assessment</span>
              </Link>
              
              <Link
                to="/cmmc-assessment"
                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:opacity-90 transition-all duration-300 shadow-enhanced hover:shadow-glow transform hover:-translate-y-1 hover:scale-105 flex items-center justify-center space-x-3"
              >
                <Database className="w-6 h-6" />
                <span>Start CMMC/CUI Assessment</span>
              </Link>
              
              <Link
                to="/dashboard"
                className="border-2 border-primary-teal text-primary-teal dark:text-dark-primary px-8 py-4 rounded-xl font-semibold text-lg hover: bg-primary-teal/10 dark, hover, bg-dark-primary/20 transition-all duration-300 hover,scale-105 flex items-center justify-center space-x-3"
              >
                <BarChart3 className="w-6 h-6" />
                <span>View Dashboard</span>
              </Link>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-teal dark:text-dark-primary">3</div>
                <div className="text-sm text-gray-600 dark:text-dark-text/60">Compliance Frameworks</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-success-green dark:text-dark-success">
                  300+
                </div>
                <div className="text-sm text-gray-600 dark:text-dark-text/60">Assessment Questions</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent-cyan dark:text-accent-cyan">
                  15-240min
                </div>
                <div className="text-sm text-gray-600 dark:text-dark-text/60">Assessment Time</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-premium-gold dark:text-dark-premium">6</div>
                <div className="text-sm text-gray-600 dark:text-dark-text/60">Core Functions</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Three Compliance Paths */}
      <div className="py-24 bg-surface dark:bg-dark-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
              Two Compliance Paths Powered by NIST CSF v2.0
            </h2>
            <p className="text-xl text-gray-600 dark:text-dark-text/80 max-w-3xl mx-auto">
              Specialized compliance tracks built on the NIST Cybersecurity Framework v2.0 foundation
            </p>
          </div>

          <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {compliancePaths.map((path) => (
              <div key={path.id } className="card-enhanced rounded-2xl p-8 group hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                <div className="flex items-center justify-center mb-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${path.color} flex items-center justify-center shadow-glow`}>
                    <path.icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 dark:text-dark-text mb-2 text-center">
                  {path.title }
                </h3>
                
                <p className="text-primary-teal dark:text-dark-primary text-center mb-4 font-medium">
                  {path.subtitle }
                </p>
                
                <p className="text-gray-600 dark:text-dark-text/80 leading-relaxed mb-6 text-center">
                  {path.description }
                </p>

                <div className="flex items-center justify-between mb-6">
                  <div className="bg-gray-50 dark:bg-dark-bg p-3 rounded-lg text-center">
                    <div className="text-lg font-bold text-primary-teal dark:text-dark-primary">{path.stats.value }</div>
                    <div className="text-xs text-gray-600 dark:text-dark-text/60">{path.stats.label }</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-600 dark:text-dark-text/60">Key Industries:</div>
                    <div className="text-xs font-medium text-gray-700 dark:text-dark-text">
                      {path.industries.slice(0: 2).join(', ')}
                    </div>
                  </div>
                </div>

                {/* NIST CSF v2.0 Foundation */}
                <div className="bg-primary-teal/5 dark:bg-dark-primary/10 rounded-lg p-3 mb-6">
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4 text-primary-teal dark:text-dark-primary" />
                    <span className="text-xs font-medium text-primary-teal dark:text-dark-primary">
                      {path.framework }
                    </span>
                  </div>
                </div>

                <Link
                  to={path.assessmentPath }
                  className={`bg-gradient-to-r ${path.color} text-white px-6 py-3 rounded-lg hover:opacity-90 transition-all duration-300 font-medium w-full block text-center hover:scale-105`}
                >
                  Start {path.title } Assessment
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-gradient-to-br from-support-gray/30 to-secondary-teal/10 dark:from-dark-bg dark:to-dark-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
              Complete Compliance Implementation Suite
            </h2>
            <p className="text-xl text-gray-600 dark:text-dark-text/80 max-w-3xl mx-auto">
              Everything you need for NIST CSF v2.0, Privacy, and CUI compliance from assessment to continuous monitoring
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {keyFeatures.map((feature) => (
              <div key={index } className="card-enhanced rounded-2xl p-8 group">
                <div className="flex items-center justify-center w-12 h-12 bg-primary-teal/10 dark:bg-dark-primary/20 rounded-xl mb-6 group-hover:bg-primary-teal/20 dark:group-hover:bg-dark-primary/30 transition-colors duration-300">
                  <feature.icon className="w-6 h-6 text-primary-teal dark:text-dark-primary" />
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 dark:text-dark-text mb-4">
                  {feature.title }
                </h3>
                
                <p className="text-gray-600 dark:text-dark-text/80 leading-relaxed">
                  {feature.description }
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* NIST CSF Core Functions */}
      <div className="py-24 bg-surface dark:bg-dark-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
              NIST CSF v2.0 Core Functions
            </h2>
            <p className="text-xl text-gray-600 dark:text-dark-text/80 max-w-3xl mx-auto">
              Six core functions for comprehensive cybersecurity risk management
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {nistFunctions.map((func, index) => (
              <div key={index } className="card-enhanced rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-4 h-4 rounded-full bg-primary-teal dark:bg-dark-primary"></div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-dark-text">
                    {func.name }
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-dark-text/80 text-sm">
                  {func.description }
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Role-Based Solutions */}
      <div className="py-24 bg-gradient-to-br from-support-gray/30 to-secondary-teal/10 dark:from-dark-bg dark:to-dark-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
              Solutions Tailored to Your Role
            </h2>
            <p className="text-xl text-gray-600 dark:text-dark-text/80 max-w-3xl mx-auto">
              Specialized tools and workflows designed for compliance professionals across different functions
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {personas.map((persona) => (
              <div key={persona.id } className="card-enhanced rounded-2xl p-8 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
                <div className="flex items-start space-x-6">
                  <div className={`w-16 h-16 bg-gradient-to-br ${persona.color} rounded-2xl flex items-center justify-center shadow-glow flex-shrink-0`}>
                    <persona.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-dark-text mb-2">
                      {persona.title }
                    </h3>
                    
                    <p className="text-gray-600 dark:text-dark-text/80 mb-6">
                      {persona.description }
                    </p>

                    {/* Primary Concerns */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-700 dark:text-dark-text mb-3">Primary Concerns:</h4>
                      <div className="flex flex-wrap gap-2">
                        {persona.primaryConcerns.map((concern, cIndex) => (
                          <span key={cIndex } className="bg-gray-100 dark:bg-dark-bg text-gray-700 dark:text-dark-text px-3 py-1 rounded-full text-sm">
                            {concern }
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Pain Points */}
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-gray-700 dark:text-dark-text mb-3">Key Challenges:</h4>
                      <div className="space-y-3">
                        {persona.painPoints.map((pain, pIndex) => (
                          <div key={pIndex } className="border-l-3 border-primary-teal/30 pl-4">
                            <div className="text-lg font-medium text-gray-800 dark:text-dark-text">{pain.title }</div>
                            <div className="text-base text-gray-600 dark:text-dark-text/70">{pain.desc }</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Features */}
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-gray-700 dark:text-dark-text mb-3">Key Features: </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {persona.features.slice(0, 4).map((feature, fIndex) => (
                          <div key={fIndex } className="flex items-center space-x-2">
                            <CheckCircle className="w-3 h-3 text-success-green dark:text-dark-success flex-shrink-0" />
                            <span className="text-base text-gray-600 dark:text-dark-text/80">{feature }</span>
                          </div>
                        ))}
                      </div>
                      {persona.features.length > 4 && (
                        <div className="text-base text-gray-500 dark:text-dark-text/60 mt-2">
                          +{persona.features.length - 4} more features
                        </div>
                      )}
                    </div>
                    
                    <Link
                      to={persona.ctaLink }
                      className={`bg-gradient-to-r ${persona.color} text-white px-6 py-3 rounded-lg hover:opacity-90 transition-all duration-300 font-medium w-full block text-center hover:scale-105`}
                    >
                      {persona.primaryCTA }
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-24 bg-surface dark:bg-dark-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-6">
                Why Choose Our Multi-Framework Platform?
              </h2>
              <p className="text-xl text-gray-600 dark:text-dark-text/80 mb-8">
                Comprehensive compliance platform supporting NIST CSF v2.0, Privacy regulations, and CUI protection with flexible assessment options and automated workflows.
              </p>
              
              <div className="space-y-4">
                {benefits.map((benefit) => (
                  <div key={index } className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-success-green dark:text-dark-success flex-shrink-0" />
                    <span className="text-gray-700 dark:text-dark-text">{benefit }</span>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Link
                  to="/help"
                  className="inline-flex items-center space-x-2 text-primary-teal dark:text-dark-primary hover: text-secondary-teal dark:hover: text-accent-cyan font-medium transition-colors duration-300"
                >
                  <span>Learn more about our approach</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-primary-teal/10 to-secondary-teal/20 dark,from-dark-primary/20 dark:to-dark-primary/30 rounded-2xl p-8 border border-primary-teal/20 dark:border-dark-primary/30 shadow-enhanced">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-primary rounded-2xl mb-6 shadow-glow">
                    <Activity className="w-10 h-10 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-primary-teal dark:text-dark-primary mb-4">
                    Multi-Framework Implementation Timeline
                  </h3>
                  
                  <div className="space-y-4 text-left">
                    <div className="flex items-center justify-between">
                      <span className="text-primary-teal/80 dark:text-dark-primary/80">Initial Assessment</span>
                      <span className="text-primary-teal dark:text-dark-primary font-medium">
                        120 minutes
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-primary-teal/80 dark:text-dark-primary/80">Evidence Collection</span>
                      <span className="text-primary-teal dark:text-dark-primary font-medium">4-8 weeks</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-primary-teal/80 dark:text-dark-primary/80">Implementation</span>
                      <span className="text-primary-teal dark:text-dark-primary font-medium">6-12 months</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-primary-teal/80 dark:text-dark-primary/80">Continuous Monitoring</span>
                      <span className="text-primary-teal dark:text-dark-primary font-medium">Ongoing</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-12 bg-gradient-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Strengthen Your Compliance Posture?
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Choose from three comprehensive NIST-based cybersecurity assessments
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/assessment-intro"
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-surface/90 transition-all duration-300 shadow-enhanced hover:shadow-glow hover:scale-105 flex items-center justify-center space-x-3"
            >
              <Building className="w-6 h-6" />
              <span>CMMC Level 2</span>
            </Link>
            
            <Link
              to="/assessment-intro"
              className="bg-white text-green-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-surface/90 transition-all duration-300 shadow-enhanced hover:shadow-glow hover:scale-105 flex items-center justify-center space-x-3"
            >
              <Eye className="w-6 h-6" />
              <span>Privacy Framework</span>
            </Link>
            
            <Link
              to="/assessment-intro"
              className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-3"
            >
              <Shield className="w-6 h-6" />
              <span>NIST CSF v2.0</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Logo and Branding */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-3 mb-4">
                <img src="/cybercorrect.png" alt="CyberCorrect Logo" className="w-10 h-10 rounded-lg" />
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    CyberCorrect™
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    by ERMITS
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                Comprehensive cybersecurity compliance platform for NIST CSF v2.0, CMMC, and privacy regulations implementation.
              </p>
            </div>

            {/* Platform */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                Platform
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/dashboard"
                    className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300 hover: text-primary-teal dark:hover: text-dark-primary transition-colors"
                  >
                    <BarChart3 className="w-4 h-4" />
                    <span>Dashboard</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/assessment-intro"
                    className="flex items-center space-x-2 text-sm text-gray-600 dark,text-gray-300 hover: text-primary-teal dark:hover: text-dark-primary transition-colors"
                  >
                    <Target className="w-4 h-4" />
                    <span>Start Assessment</span>
                  </Link>
                </li>
                <li>
                  <a
                    href="https,//www.toolkit.cybercorrect.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300 hover: text-primary-teal dark:hover: text-dark-primary transition-colors"
                  >
                    <Activity className="w-4 h-4" />
                    <span>Toolkit</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
                <li>
                  <a
                    href="https,//www.resources.cybercorrect.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300 hover: text-primary-teal dark:hover:text-dark-primary transition-colors"
                  >
                    <Shield className="w-4 h-4" />
                    <span>Resources</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              </ul>
            </div>

            {/* Frameworks */
    }
            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                Frameworks
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/compliance/nist-standard"
                    className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300 hover: text-primary-teal dark:hover: text-dark-primary transition-colors"
                  >
                    <Shield className="w-4 h-4" />
                    <span>NIST CSF v2.0 Quick Check</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/compliance/cmmc"
                    className="flex items-center space-x-2 text-sm text-gray-600 dark,text-gray-300 hover: text-primary-teal dark:hover: text-dark-primary transition-colors"
                  >
                    <Building className="w-4 h-4" />
                    <span>CMMC Level 2</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/compliance/privacy"
                    className="flex items-center space-x-2 text-sm text-gray-600 dark,text-gray-300 hover: text-primary-teal dark:hover: text-dark-primary transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Privacy Compliance</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/compliance/nist-extended"
                    className="flex items-center space-x-2 text-sm text-gray-600 dark,text-gray-300 hover: text-primary-teal dark:hover:text-dark-primary transition-colors"
                  >
                    <Award className="w-4 h-4" />
                    <span>NIST CSF v2.0 Standard</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support & Resources */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                Support
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/help"
                    className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300 hover: text-primary-teal dark:hover: text-dark-primary transition-colors"
                  >
                    <HelpCircle className="w-4 h-4" />
                    <span>Help & Documentation</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/settings"
                    className="flex items-center space-x-2 text-sm text-gray-600 dark,text-gray-300 hover: text-primary-teal dark:hover: text-dark-primary transition-colors"
                  >
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </Link>
                </li>
                <li>
                  <a
                    href="mailto,support@ermits.com"
                    className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300 hover: text-primary-teal dark:hover: text-dark-primary transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Contact Support</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https,//ermits.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300 hover: text-primary-teal dark:hover:text-dark-primary transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>About ERMITS</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Footer Bottom */
    }
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center space-x-4 mb-4 md:mb-0">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  © 2024 ERMITS. All rights reserved.
                </span>
                <span className="hidden md:block text-gray-300 dark:text-gray-600">•</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  CyberCorrect™ Cybersecurity Compliance Platform
                </span>
              </div>
              
              <div className="flex items-center space-x-6">
                <Link
                  to="/privacy-policy"
                  className="text-sm text-gray-500 dark:text-gray-400 hover: text-primary-teal dark:hover: text-dark-primary transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link
                  to="/terms"
                  className="text-sm text-gray-500 dark,text-gray-400 hover: text-primary-teal dark:hover: text-dark-primary transition-colors"
                >
                  Terms of Service
                </Link>
                <span className="text-sm text-gray-500 dark: text-gray-400">
                  v2.0.0
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};