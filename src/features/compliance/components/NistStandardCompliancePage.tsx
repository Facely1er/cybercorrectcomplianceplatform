import React from 'react';
import { Shield, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

export const NistStandardCompliancePage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 text-center">
        <div className="flex items-center justify-center mb-6">
          <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-2xl">
            <Shield className="w-12 h-12 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          NIST CSF v2.0 Standard Compliance
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
          This page provides an overview of your compliance status with the NIST Cybersecurity Framework v2.0 Standard.
        </p>
        <div className="flex items-center justify-center space-x-4">
          <Link
            to="/assessment-intro"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Info className="w-5 h-5" />
            <span>View Assessment</span>
          </Link>
          <Link
            to="/compliance/status"
            className="border border-blue-600 text-blue-600 dark:text-blue-400 px-6 py-3 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors flex items-center space-x-2"
          >
            <Info className="w-5 h-5" />
            <span>View Compliance Status</span>
          </Link>
        </div>
      </div>
    </div>
  );
};