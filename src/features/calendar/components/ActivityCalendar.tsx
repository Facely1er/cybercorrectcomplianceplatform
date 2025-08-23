import React from 'react';
;

interface ActivityCalendarProps {
  className?: string;
}

export const ActivityCalendar: React.FC<ActivityCalendarProps> = ({ className = '' }) => {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 ${className }`}>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
        <Calendar className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
        Upcoming Activities
      </h3>
      
      <div className="space-y-3">
        <div className="flex items-center space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <CheckSquare className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <div>
            <div className="font-medium text-gray-900 dark:text-white">Assessment Review</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Due tomorrow</div>
          </div>
        </div>
        
        <div className="flex items-center space-x-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
          <Clock className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
          <div>
            <div className="font-medium text-gray-900 dark:text-white">Policy Update</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Due in 3 days</div>
          </div>
        </div>
        
        <div className="flex items-center space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <Users className="w-5 h-5 text-green-600 dark:text-green-400" />
          <div>
            <div className="font-medium text-gray-900 dark:text-white">Team Meeting</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Next week</div>
          </div>
        </div>
      </div>
    </div>
  );
};