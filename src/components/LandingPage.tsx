import React from 'react';
import { Link } from 'react-router-dom';

export const LandingPage: React.FC = () => {
	return (
		<div className="min-h-screen flex items-center justify-center p-12">
			<div className="max-w-3xl w-full bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-200 dark:border-gray-700 p-10 text-center">
				<h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">CyberCorrect Compliance Platform</h1>
				<p className="text-gray-600 dark:text-gray-300 mb-8">Welcome. This landing page is temporarily simplified while we stabilize the build.</p>
				<div className="flex items-center justify-center gap-4">
					<Link to="/assessment-intro" className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700">Start Assessment</Link>
					<Link to="/dashboard" className="px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">Go to Dashboard</Link>
				</div>
			</div>
		</div>
	);
};