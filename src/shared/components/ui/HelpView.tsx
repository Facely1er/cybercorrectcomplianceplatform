import React from 'react';

export const HelpView: React.FC = () => {
	return (
		<div className="min-h-screen flex items-center justify-center p-12">
			<div className="max-w-2xl w-full bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-200 dark:border-gray-700 p-8 text-center">
				<h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Help & Support</h1>
				<p className="text-gray-600 dark:text-gray-300">
					This help view is temporarily simplified while we stabilize the build. If you need assistance, contact support@ermits.com.
				</p>
			</div>
		</div>
	);
};