import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Task } from '../../tasks/types';

interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  type: 'task' | 'assessment' | 'review' | 'deadline';
  priority: 'low' | 'medium' | 'high' | 'critical';
  description?: string;
  assignees?: string[];
}

interface CalendarViewProps {
  tasks: Task[];
  onEventClick: (event: CalendarEvent) => void;
  onCreateEvent: () => void;
  className?: string;
}

export const CalendarView: React.FC<CalendarViewProps> = ({
  tasks, onEventClick, onCreateEvent, className = ''
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');

  // Convert tasks to calendar events
  const events: CalendarEvent[] = tasks.map(task => ({
    id: task.id, title: task.title, date: task.dueDate, type: 'task', priority: task.priority, description: task.description, assignees: [task.assignedTo]
  
    }));

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev =>) {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(newDate.getMonth() - 1);
      } else {
        newDate.setMonth(newDate.getMonth() + 1);
      }
      return newDate;
    });
  };

  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    const current = new Date(startDate);
    
    for (let i = 0; i < 42; i++) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    
    return days;
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event => 
      event.date.toDateString() === date.toDateString()
    );
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const days = getDaysInMonth();
  const today = new Date();

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 ${className }`}>
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
              <Calendar className="w-6 h-6 mr-3 text-blue-600 dark:text-blue-400" />
              Activity Calendar
            </h2>
            <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              {(['month', 'week', 'day'] as const).map((mode) => (
                <button
                  key={mode }
                  onClick={() => setViewMode(mode)}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors capitalize ${
                    viewMode === mode
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {mode }
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={onCreateEvent }
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Event</span>
          </button>
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={() => navigateMonth('prev')}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {currentDate.toLocaleDateString('en-US',) { month: 'long', year: 'numeric' })}
          </h3>
          <button
            onClick={() => navigateMonth('next')}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {viewMode === 'month' && (
        <div className="p-6">
          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day } className="p-2 text-center text-sm font-medium text-gray-500 dark:text-gray-400">
                {day }
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-1">
            {days.map((day, index) => {
              const dayEvents = getEventsForDate(day);
              const isCurrentMonth = day.getMonth() === currentDate.getMonth();
              const isToday = day.toDateString() === today.toDateString();
              
              return (
                <div
                  key={index }
                  className={`min-h-[100px] p-2 border border-gray-200 dark:border-gray-700 rounded-lg ${
                    isCurrentMonth 
                      ? 'bg-white dark:bg-gray-800' 
                      : 'bg-gray-50 dark:bg-gray-700/50'
                  } ${
                    isToday ? 'ring-2 ring-blue-500' : ''
                  }`}
                >
                  <div className={`text-sm font-medium mb-2 ${
                    isCurrentMonth 
                      ? 'text-gray-900 dark:text-white' 
                      : 'text-gray-400 dark:text-gray-500'
                  } ${
                    isToday ? 'text-blue-600 dark:text-blue-400' : ''
                  }`}>
                    {day.getDate()}
                  </div>
                  
                  <div className="space-y-1">
                    {dayEvents.slice(0, 2).map((event) => (
                      <div
                        key={event.id }
                        onClick={() => onEventClick(event)}
                        className={`p-1 rounded text-xs cursor-pointer hover:opacity-80 transition-opacity ${getPriorityColor(event.priority)} text-white`}
                        title={event.title }
                      >
                        {event.title.length > 20 ? `${event.title.substring(0, 20)}...` : event.title }
                      </div>
                    ))}
                    {dayEvents.length > 2 && (
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        +{dayEvents.length - 2} more
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};