import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, Database, BarChart3, Shield, FileText, Target, Calendar } from 'lucide-react';

export const LandingPage: React.FC = () => {
  const features = [
    {
      icon: Target,
      title: 'Intelligent Assessments',
      description:
        'Role-specific assessments across NIST CSF v2.0, Privacy, and CUI that provide actionable insights.',
    },
    {
      icon: FileText,
      title: 'Evidence Collection',
      description:
        'Systematic collection and validation of cybersecurity and privacy evidence for audits and assessments.',
    },
    {
      icon: BarChart3,
      title: 'Real-Time Status',
      description:
        'Live dashboards showing NIST CSF v2.0, Privacy, and CMMC implementation progress and maturity.',
    },
    {
      icon: Calendar,
      title: 'Activity Planning',
      description:
        'Automated scheduling of assessments, privacy reviews, and implementation milestones.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-teal/5 via-surface to-secondary-teal/10 dark:from-dark-bg dark:via-dark-bg dark:to-dark-primary/10">
      {/* Hero */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-primary bg-clip-text text-transparent">Complete Compliance</span>
            <br />
            <span className="text-gray-900 dark:text-dark-text">Platform</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 dark:text-dark-text/80 max-w-4xl mx-auto my-10 leading-relaxed">
            Privacy (GDPR/CCPA) and CUI (CMMC 2.0) tracks, both powered by NIST CSF v2.0. Choose your path and
            get a personalized roadmap with automated documentation.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
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
              className="border-2 border-primary-teal text-primary-teal dark:text-dark-primary px-8 py-4 rounded-xl font-semibold text-lg hover:bg-primary-teal/10 dark:hover:bg-dark-primary/20 transition-all duration-300 flex items-center justify-center space-x-3"
            >
              <BarChart3 className="w-6 h-6" />
              <span>View Dashboard</span>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-teal dark:text-dark-primary">3</div>
              <div className="text-sm text-gray-600 dark:text-dark-text/60">Compliance Frameworks</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-success-green dark:text-dark-success">300+</div>
              <div className="text-sm text-gray-600 dark:text-dark-text/60">Assessment Questions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent-cyan">15–240 min</div>
              <div className="text-sm text-gray-600 dark:text-dark-text/60">Assessment Time</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-premium-gold dark:text-dark-premium">6</div>
              <div className="text-sm text-gray-600 dark:text-dark-text/60">Core Functions</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="py-20 bg-surface dark:bg-dark-surface">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-10">Key Capabilities</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div key={f.title} className="card-enhanced rounded-2xl p-6">
                <div className="w-12 h-12 rounded-xl bg-primary-teal/10 text-primary-teal flex items-center justify-center mb-4">
                  <f.icon className="w-6 h-6" />
                </div>
                <div className="font-semibold mb-2">{f.title}</div>
                <div className="text-sm text-gray-600 dark:text-dark-text/70">{f.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trust */}
      <div className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-3 text-gray-700 dark:text-dark-text/80">
            <Shield className="w-5 h-5" />
            <span>Powered by NIST CSF v2.0 • Privacy and CUI compliance tracks</span>
          </div>
        </div>
      </div>
    </div>
  );
};