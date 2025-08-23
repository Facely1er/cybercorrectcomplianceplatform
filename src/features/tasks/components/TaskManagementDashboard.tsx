import React, { useState, useMemo } from 'react';
import { MessageSquare, Paperclip, CheckCircle, XCircle } from 'lucide-react';
import { Task, TaskFilter, TaskMetrics, TaskStatus, TaskPriority, TaskType } from '../types';
import { useAuth } from '../../../shared/hooks/useAuth';
import { dataService } from '../../../services/dataService';
import { Breadcrumbs } from '../../../shared/components/layout/Breadcrumbs';
import { useInternalLinking } from '../../../shared/hooks/useInternalLinking';

interface TaskManagementDashboardProps {, message: string) => void;
}

export const TaskManagementDashboard: React.FC<TaskManagementDashboardProps> = ({, addNotification }) => {
  const { user, currentOrganization } = useAuth();
  const { breadcrumbs } = useInternalLinking();
  const [activeView, setActiveView] = useState<'kanban' | 'list' | 'calendar'>('kanban');
  const [filters, setFilters] = useState<TaskFilter>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [filterAssignee, setFilterAssignee] = useState('all');
  const [taskFormData, setTaskFormData] = useState({
    title: '', description: '', type: 'assessment' as TaskType, priority: 'medium' as TaskPriority, nistFunction: 'Identify', nistCategory: '', nistSubcategory: '', assignedTo: '', dueDate: '', estimatedHours: 8, tags: '', businessImpact: 'medium' as 'low' | 'medium' | 'high' | 'critical', technicalComplexity: 'medium' as 'low' | 'medium' | 'high', framework: 'NIST CSF v2.0' as string });

  // Load tasks on component mount and when user/organization changes
  React.useEffect(() => {
    if (user) {
      loadTasks();
    }
  }, [user, currentOrganization]);

  const loadTasks = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      // Load tasks from centralized data service
      const fetchedTasks = dataService.getTasks();
      setTasks(fetchedTasks);
    
    } catch (error) {
      console.error('Failed to load tasks:', error);
      setTasks([]); // Start with empty array if loading fails
      addNotification('warning', 'Failed to load tasks from storage');
    
    } finally {
      setLoading(false);
    }
  };

  const metrics: TaskMetrics = useMemo(() => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.status === 'completed').length;
    const overdueTasks = tasks.filter(t => new Date(t.dueDate) < new Date() && t.status !== 'completed').length;
    
    const tasksByStatus = tasks.reduce((acc, task) => {
      acc[task.status] = (acc[task.status] || 0) + 1;
      return acc;
    }, {} as Record<TaskStatus, number>);

    const tasksByPriority = tasks.reduce((acc, task) => {
      acc[task.priority] = (acc[task.priority] || 0) + 1;
      return acc;
    }, {} as Record<TaskPriority, number>);

    const tasksByFunction = tasks.reduce((acc, task) => {
      acc[task.nistFunction] = (acc[task.nistFunction] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const upcomingDeadlines = tasks.filter(t =>) {
      const daysUntilDue = (new Date(t.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24);
      return daysUntilDue <= 7 && daysUntilDue > 0 && t.status !== 'completed';
    }).length;

    const blockedTasks = tasks.filter(t => t.status === 'blocked').length;

    return {
      totalTasks, completedTasks, overdueTasks, tasksByStatus, tasksByPriority, tasksByFunction, tasksByAssignee: {}, averageCompletionTime: 0, upcomingDeadlines, blockedTasks };
  }, [tasks]);

  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case 'completed': return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300';
      case 'in-progress': return 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300';
      case 'blocked': return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300';
      case 'review': return 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300';
      case 'overdue': return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300';
      default: return 'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300';
    }
  };

  const getPriorityColor = (priority: TaskPriority) => {
    switch (priority) {
      case 'critical': return 'text-red-600 dark:text-red-400';
      case 'high': return 'text-orange-600 dark:text-orange-400';
      case 'medium': return 'text-yellow-600 dark:text-yellow-400';
      case 'low': return 'text-green-600 dark:text-green-400';
    }
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter(task =>) {
      const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           task.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesFunction = !filters.nistFunction?.length || filters.nistFunction.includes(task.nistFunction);
      const matchesType = !filters.type?.length || filters.type.includes(task.type);
      const matchesStatus = !filters.status?.length || filters.status.includes(task.status);
      const matchesPriority = !filters.priority?.length || filters.priority.includes(task.priority);
      const matchesAssignee = filterAssignee === 'all' || task.assignedTo.includes(filterAssignee);
      
      return matchesSearch && matchesFunction && matchesType && matchesStatus && matchesPriority && matchesAssignee;
    });
  }, [tasks, searchTerm, filters, filterAssignee]);

  const kanbanColumns = [
    { id: 'not-started', title: 'Not Started', tasks: filteredTasks.filter(t => t.status === 'not-started') },
    { id: 'in-progress', title: 'In Progress', tasks: filteredTasks.filter(t => t.status === 'in-progress') },
    { id: 'blocked', title: 'Blocked', tasks: filteredTasks.filter(t => t.status === 'blocked') },
    { id: 'review', title: 'Review', tasks: filteredTasks.filter(t => t.status === 'review') },
    { id: 'completed', title: 'Completed', tasks: filteredTasks.filter(t => t.status === 'completed') }
  ];

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!taskFormData.title.trim() || !taskFormData.description.trim()) {
      addNotification('error', 'Title and description are required');
      return;
    }
    
    if (!taskFormData.assignedTo) {
      addNotification('error', 'Please assign the task to a team member');
      return;
    }
    
    if (!user) {
      addNotification('error', 'User not authenticated');
      return;
    }

    if (!taskFormData.dueDate) {
      addNotification('error', 'Due date is required');
      return;
    }
    const newTask: Task = {
      id: `task-${Date.now()}`, title: taskFormData.title, description: taskFormData.description, type: taskFormData.type, priority: taskFormData.priority, status: 'not-started', nistFunction: taskFormData.nistFunction as any, nistCategory: taskFormData.nistCategory, nistSubcategory: taskFormData.nistSubcategory, relatedControlId: taskFormData.nistSubcategory.toLowerCase().replace('.', '.'), assignedTo: [taskFormData.assignedTo], assignedBy: user.id, createdAt: new Date(), updatedAt: new Date(), dueDate: new Date(taskFormData.dueDate), startDate: undefined, completedAt: undefined, estimatedHours: taskFormData.estimatedHours, actualHours: undefined, progress: 0, dependencies: [], subtasks: [], attachments: [], comments: [], evidence: [], approvalRequired: false, tags: taskFormData.tags ? taskFormData.tags.split(',').map(t => t.trim()).filter(Boolean) : [taskFormData.type, taskFormData.nistFunction.toLowerCase()], metadata: {
        businessImpact: taskFormData.businessImpact, technicalComplexity: taskFormData.technicalComplexity, riskReduction: 10, complianceImpact: [taskFormData.framework || 'NIST CSF v2.0'], successCriteria: ['Task completed on time', 'Deliverables approved']
      }
    };

    try {
      // Save using data service directly
      dataService.saveTask(newTask);
      
      setTasks(prev => [...prev, newTask]);
      addNotification('success', `Task "${newTask.title 
   }" assigned to ${taskFormData.assignedTo} successfully`);
      setShowCreateTask(false);
      
      // Reset form
      setTaskFormData({
        title: '', description: '', type: 'assessment', priority: 'medium', nistFunction: 'Identify', nistCategory: '', nistSubcategory: '', assignedTo: '', dueDate: '', estimatedHours: 8, tags: '', businessImpact: 'medium', technicalComplexity: 'medium', framework: 'NIST CSF v2.0'
      
    });
    } catch (error) {
      console.error('Failed to create task:', error);
      addNotification('error', 'Failed to assign task');
    }
  };

  const handleUpdateTaskStatus = async (taskId: string, newStatus: TaskStatus) => {
    if (!user) {
      addNotification('error', 'User not authenticated');
      return;
    }
    
    const task = tasks.find(t => t.id === taskId);
    if (!task) {
      addNotification('error', 'Task not found');
      return;
    }

    try {
      const updatedTask = { 
        ...task, status: newStatus, updatedAt: new Date(), completedAt: newStatus === 'completed' ? new Date() : task.completedAt, progress: newStatus === 'completed' ? 100 : task.progress };
      
      // Save using data service directly
      dataService.saveTask(updatedTask);
      
      setTasks(prev => prev.map(t => t.id === taskId ? updatedTask : t));
      addNotification('success', `Task status updated to ${newStatus.replace('-', ' ')
   }`);
    } catch (error) {
      console.error('Failed to update task:', error);
      addNotification('error', 'Failed to update task status');
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    if (!user) return;
    
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        // Delete using data service directly
        dataService.deleteTask(taskId);
        setTasks(prev => prev.filter(t => t.id !== taskId));
        addNotification('success', 'Task deleted successfully');
      
    } catch (error) {
        console.error('Failed to delete task:', error);
        addNotification('error', 'Failed to delete task');
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumbs */}
      <div className="mb-6">
        <Breadcrumbs items={breadcrumbs } />
      </div>

      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 mb-8">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl">
                <CheckSquare className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Compliance Task Management
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                  Track compliance implementation tasks and deliverables across Privacy, CMMC, and NIST CSF v2.0 frameworks
                </p>
              </div>
            </div>
            
            <button
              onClick={() => setShowCreateTask(true)}
              className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Create Task</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 md:gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Tasks</p>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{metrics.totalTasks }</p>
            </div>
            <CheckSquare className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Completed</p>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">{metrics.completedTasks }</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Overdue</p>
              <p className="text-3xl font-bold text-red-600 dark:text-red-400">{metrics.overdueTasks }</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Blocked</p>
              <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">{metrics.blockedTasks }</p>
            </div>
            <XCircle className="w-8 h-8 text-orange-600 dark:text-orange-400" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Due This Week</p>
              <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{metrics.upcomingDeadlines }</p>
            </div>
            <Calendar className="w-8 h-8 text-purple-600 dark:text-purple-400" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Completion Rate</p>
              <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                {metrics.totalTasks > 0 ? Math.round((metrics.completedTasks / metrics.totalTasks) * 100) : 0}%
              </p>
            </div>
            <Target className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
          </div>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 mb-8 p-6">
        <div className="flex flex-col space-y-4 mb-6">
          <div className="flex-1 max-w-lg">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchTerm }
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              {(['kanban', 'list', 'calendar'] as const).map((view) => (
                <button
                  key={view }
                  onClick={() => setActiveView(view)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                    activeView === view
                      ? 'bg-green-600 text-white'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                 }`}
                >
                  {view }
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <select
            onChange={(e) => setFilters(prev => ({ 
              ...prev, nistFunction: e.target.value === 'all' ? undefined : [e.target.value] 
            }))}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="all">All Functions</option>
            <option value="Govern">Govern</option>
            <option value="Identify">Identify</option>
            <option value="Protect">Protect</option>
            <option value="Detect">Detect</option>
            <option value="Respond">Respond</option>
            <option value="Recover">Recover</option>
            <option value="Privacy">Privacy</option>
            <option value="CMMC">CMMC</option>
          </select>

          <select
            onChange={(e) => setFilters(prev => ({ 
              ...prev, priority: e.target.value === 'all' ? undefined : [e.target.value as TaskPriority] 
            }))}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="all">All Priorities</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
            <option value="privacy">Privacy</option>
            <option value="cmmc">CMMC</option>
          </select>

          <select
            onChange={(e) => setFilters(prev => ({ 
              ...prev, status: e.target.value === 'all' ? undefined : [e.target.value as TaskStatus] 
            }))}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="not-started">Not Started</option>
            <option value="in-progress">In Progress</option>
            <option value="blocked">Blocked</option>
            <option value="review">Review</option>
            <option value="completed">Completed</option>
          </select>
          
          <select
            onChange={(e) => setFilterAssignee(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="all">All Assignees</option>
            <option value="user-001">Sarah Johnson (CISO)</option>
            <option value="user-002">Mike Chen (Security Analyst)</option>
            <option value="user-003">Emily Rodriguez (Compliance)</option>
            <option value="team-security">Security Team</option>
            <option value="team-compliance">Compliance Team</option>
          </select>
        </div>
      </div>

      {/* Kanban Board */}
      {activeView === 'kanban' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {kanbanColumns.map((column) => (
              <div key={column.id } className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {column.title }
                  </h3>
                  <span className="bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full text-xs font-medium">
                    {column.tasks.length }
                  </span>
                </div>

                <div className="space-y-3 min-h-[400px]">
                  {column.tasks.map((task) => (
                    <div key={task.id } className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow bg-white dark:bg-gray-800">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                            {task.title }
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                            {task.description }
                          </p>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(task.priority)}`}>
                          {task.priority }
                        </span>
                      </div>

                      <div className="flex items-center justify-between mb-3">
                        <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs rounded">
                          {task.nistSubcategory || task.relatedControlId }
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {task.dueDate.toLocaleDateString()}
                        </span>
                      </div>

                      <div className="flex items-center justify-between mb-3">
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Progress: {task.progress }%
                        </div>
                        <div className="flex items-center space-x-1">
                          {task.comments.length > 0 && (
                            <span className="flex items-center space-x-1 text-xs text-gray-500">
                              <MessageSquare className="w-3 h-3" />
                              <span>{task.comments.length }</span>
                            </span>
                          )}
                          {task.attachments.length > 0 && (
                            <span className="flex items-center space-x-1 text-xs text-gray-500">
                              <Paperclip className="w-3 h-3" />
                              <span>{task.attachments.length }</span>
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-3">
                        <div
                          className="bg-green-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${task.progress}%` }}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex -space-x-2">
                          {task.assignedTo.slice(0, 3).map((userId, index) => (
                            <div key={index } className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-white dark:border-gray-800">
                              {userId.charAt(userId.length - 1)}
                            </div>
                          ))}
                          {task.assignedTo.length > 3 && (
                            <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-white dark:border-gray-800">
                              +{task.assignedTo.length - 3}
                            </div>
                          )}
                        </div>
                        
                        <div className="flex space-x-1">
                          <button
                            onClick={() => {
                              const taskDetails = `Task Details:

Title: ${task.title}
Description: ${task.description}
Type: ${task.type}
Priority: ${task.priority}
Status: ${task.status}
NIST Function: ${task.nistFunction}
Control ID: ${task.relatedControlId}

Assigned To: ${task.assignedTo.join(', ')}
Assigned By: ${task.assignedBy}
Due Date: ${task.dueDate.toLocaleDateString()}
Progress: ${task.progress}%
Estimated Hours: ${task.estimatedHours}

Business Impact: ${task.metadata.businessImpact}
Technical Complexity: ${task.metadata.technicalComplexity}
Risk Reduction: ${task.metadata.riskReduction}%

Created: ${task.createdAt.toLocaleDateString()}
Updated: ${task.updatedAt.toLocaleDateString()}`;
                              
                              addNotification('info', taskDetails);
                            }}
                            className="p-1 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteTask(task.id)}
                            className="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      
                      {/* Quick Status Update */}
                      <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex space-x-1">
                          <button
                            onClick={() => handleUpdateTaskStatus(task.id, 'in-progress')}
                            disabled={task.status === 'in-progress'}
                            className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-2 py-1 rounded hover:bg-blue-200 dark:hover:bg-blue-800/50 disabled:opacity-50 transition-colors"
                          >
                            Start
                          </button>
                          <button
                            onClick={() => handleUpdateTaskStatus(task.id, 'completed')}
                            disabled={task.status === 'completed'}
                            className="text-xs bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-2 py-1 rounded hover:bg-green-200 dark:hover:bg-green-800/50 disabled:opacity-50 transition-colors"
                          >
                            Complete
                          </button>
                          <button
                            onClick={() => handleUpdateTaskStatus(task.id, 'blocked')}
                            disabled={task.status === 'blocked'}
                            className="text-xs bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 px-2 py-1 rounded hover:bg-red-200 dark:hover:bg-red-800/50 disabled:opacity-50 transition-colors"
                          >
                            Block
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* List View */}
      {activeView === 'list' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Task
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    NIST Function
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Assignee
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Priority
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Due Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Progress
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredTasks.map((task) => (
                  <tr key={task.id } className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {task.title }
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {task.nistSubcategory || task.relatedControlId || task.nistFunction }
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white">
                      {task.nistFunction }
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex -space-x-2">
                        {task.assignedTo.slice(0, 2).map((userId, index) => (
                          <div key={index } className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-white dark:border-gray-800">
                            {userId.charAt(userId.length - 1)}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`font-medium ${getPriorityColor(task.priority)}`}>
                        {task.priority }
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                        {task.status.replace('-', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white">
                      {task.dueDate.toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: `${task.progress}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          {task.progress }%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            const taskDetails = `Task Details:

Title: ${task.title}
Description: ${task.description}
Type: ${task.type}
Priority: ${task.priority}
Status: ${task.status}
NIST Function: ${task.nistFunction}
Control ID: ${task.relatedControlId}

Assigned To: ${task.assignedTo.join(', ')}
Assigned By: ${task.assignedBy}
Due Date: ${task.dueDate.toLocaleDateString()}
Progress: ${task.progress}%
Estimated Hours: ${task.estimatedHours}

Business Impact: ${task.metadata.businessImpact}
Technical Complexity: ${task.metadata.technicalComplexity}
Risk Reduction: ${task.metadata.riskReduction}%

Created: ${task.createdAt.toLocaleDateString()}
Updated: ${task.updatedAt.toLocaleDateString()}`;
                            
                            addNotification('info', taskDetails);
                          }}
                          className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => addNotification('info', 'Task editing feature coming soon')}
                          className="p-2 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-lg transition-colors"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteTask(task.id)}
                          className="p-2 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Create Task Modal */}
      {showCreateTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-2xl w-full mx-4 shadow-2xl border border-gray-200 dark:border-gray-700 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Create Compliance Task
            </h3>
            
            <form onSubmit={handleCreateTask } className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Task Title *
                </label>
                <input
                  type="text"
                  required
                  value={taskFormData.title }
                  onChange={(e) => setTaskFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter task title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description *
                </label>
                <textarea
                  required
                  value={taskFormData.description }
                  onChange={(e) => setTaskFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                  placeholder="Describe the compliance task objectives and deliverables (Privacy, CMMC, or NIST CSF v2.0)"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Task Type *
                  </label>
                  <select
                    required
                    value={taskFormData.type }
                    onChange={(e) => setTaskFormData(prev => ({ ...prev, type: e.target.value as TaskType }))}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="assessment">Assessment</option>
                    <option value="evidence-collection">Evidence Collection</option>
                    <option value="policy-development">Policy Development</option>
                    <option value="control-implementation">Control Implementation</option>
                    <option value="testing-validation">Testing & Validation</option>
                    <option value="documentation">Documentation</option>
                    <option value="training">Training</option>
                    <option value="review-approval">Review & Approval</option>
                    <option value="monitoring">Monitoring</option>
                    <option value="remediation">Remediation</option>
                    <option value="privacy-assessment">Privacy Assessment</option>
                    <option value="data-mapping">Data Mapping</option>
                    <option value="consent-management">Consent Management</option>
                    <option value="breach-response">Breach Response</option>
                    <option value="dpia-creation">DPIA Creation</option>
                    <option value="vendor-assessment">Vendor Assessment</option>
                    <option value="cmmc-implementation">CMMC Implementation</option>
                    <option value="cui-protection">CUI Protection</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Priority *
                  </label>
                  <select
                    required
                    value={taskFormData.priority }
                    onChange={(e) => setTaskFormData(prev => ({ ...prev, priority: e.target.value as TaskPriority }))}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Compliance Framework *
                  </label>
                  <select
                    required
                    value={taskFormData.nistFunction }
                    onChange={(e) => setTaskFormData(prev => ({ ...prev, nistFunction: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="Govern">Govern</option>
                    <option value="Identify">Identify</option>
                    <option value="Protect">Protect</option>
                    <option value="Detect">Detect</option>
                    <option value="Respond">Respond</option>
                    <option value="Recover">Recover</option>
                    <option value="Privacy">Privacy</option>
                    <option value="CMMC">CMMC</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Framework Category
                  </label>
                  <input
                    type="text"
                    value={taskFormData.nistCategory }
                    onChange={(e) => setTaskFormData(prev => ({ ...prev, nistCategory: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="e.g., Asset Management, Data Protection, Access Control"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Control/Requirement ID
                  </label>
                  <input
                    type="text"
                    value={taskFormData.nistSubcategory }
                    onChange={(e) => setTaskFormData(prev => ({ ...prev, nistSubcategory: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="e.g., ID.AM-01, PR.DS-01, CMMC.AC.1.001"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Assigned To *
                  </label>
                  <select
                    required
                    value={taskFormData.assignedTo }
                    onChange={(e) => setTaskFormData(prev => ({ ...prev, assignedTo: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Select team member</option>
                    <option value="user-001">Sarah Johnson (CISO)</option>
                    <option value="user-002">Mike Chen (Security Analyst)</option>
                    <option value="user-003">Emily Rodriguez (Compliance Officer)</option>
                    <option value="user-004">Data Protection Officer</option>
                    <option value="user-005">Privacy Manager</option>
                    <option value="team-it">IT Team</option>
                    <option value="team-security">Security Team</option>
                    <option value="team-compliance">Compliance Team</option>
                    <option value="team-privacy">Privacy Team</option>
                    <option value="team-legal">Legal Team</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Due Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={taskFormData.dueDate }
                    onChange={(e) => setTaskFormData(prev => ({ ...prev, dueDate: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Estimated Hours
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={taskFormData.estimatedHours }
                    onChange={(e) => setTaskFormData(prev => ({ ...prev, estimatedHours: parseInt(e.target.value) || 8 }))}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateTask(false);
                    setTaskFormData({
                      title: '', description: '', type: 'assessment', priority: 'medium', nistFunction: 'Identify', nistCategory: '', nistSubcategory: '', assignedTo: '', dueDate: '', estimatedHours: 8, tags: '', businessImpact: 'medium', technicalComplexity: 'medium', framework: 'NIST CSF v2.0'
                    });
                  }}
                  className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-medium"
                >
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};