import { useMemo } from 'react';
import { Task } from '../../tasks/types';
import { AssessmentData } from '../../../shared/types';

export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  date: Date;
  type: 'task' | 'assessment' | 'review' | 'deadline';
  priority: 'low' | 'medium' | 'high' | 'critical';
  assignees: string[];
  relatedId?: string; // Task ID, Assessment ID, etc.
    }
export const useCalendarEvents = (tasks: Task[], assessments: AssessmentData[]) => {
  const events = useMemo(() => {
    const calendarEvents: CalendarEvent[] = [];

    // Add task events
    tasks.forEach((task) => {
      calendarEvents.push({
        id: `task-${task.id 
   }`, title: task.title, description: task.description, date: task.dueDate, type: 'task', priority: task.priority, assignees: [task.assignedTo], relatedId: task.id });
    });

    // Add assessment deadlines
    assessments.forEach((assessment) => {
      if (!assessment.isComplete) {
        // Add a deadline 30 days from last modified if no specific deadline
        const deadline = new Date(assessment.lastModified);
        deadline.setDate(deadline.getDate() + 30);

        calendarEvents.push({
          id: `assessment-deadline-${assessment.id 
   }`, title: `${assessment.frameworkName} Assessment Deadline`, description: `Complete assessment for ${assessment.organizationInfo?.name || 'organization'}`, date: deadline, type: 'deadline', priority: 'high', assignees: [], relatedId: assessment.id });
      }
    });

    return calendarEvents.sort((a, b) => a.date.getTime() - b.date.getTime());
  }, [tasks, assessments]);

  const upcomingEvents = useMemo(() => {
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    
    return events.filter(event => 
      event.date >= today && event.date <= nextWeek
    );
  }, [events]);

  const overdueEvents = useMemo(() => {
    const today = new Date();
    
    return events.filter(event => 
      event.date < today && event.type === 'task'
    );
  }, [events]);

  return {
    events, upcomingEvents, overdueEvents };
};