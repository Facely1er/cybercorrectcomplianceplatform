import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  ChevronLeft, ChevronRight, Save, FileText, Clock, 
  CheckCircle, AlertCircle, Info, BookOpen, Target,
  BarChart3, Users, Shield, Bookmark, BookmarkCheck,
  Play, Pause, RotateCcw, MessageSquare, Flag,
  Lightbulb, ExternalLink, Timer, TrendingUp,
  AlertTriangle, HelpCircle, Zap, Star, History
} from 'lucide-react';
import { Breadcrumbs } from '../../../shared/components/layout/Breadcrumbs';
import { useInternalLinking } from '../../../shared/hooks/useInternalLinking';
import { AssessmentData, Framework, Question, AssessmentSession } from '../../../shared/types';
import { EvidenceManager } from './EvidenceManager';

interface EnhancedAssessmentViewProps {
  assessment: AssessmentData;
  framework: Framework;
  onSave: (assessment: AssessmentData) => void;
  onGenerateReport: (assessment: AssessmentData) => void;
  onBack: () => void;
}

export const EnhancedAssessmentView: React.FC<EnhancedAssessmentViewProps> = ({
  assessment,
  framework,
  onSave,
  onGenerateReport,
  onBack
}) => {
  // Debug: Track component renders
  console.log('EnhancedAssessmentView rendering');
  
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, number>>(assessment.responses);
  const [bookmarks, setBookmarks] = useState<string[]>(assessment.bookmarks || []);
  const [showGuidance, setShowGuidance] = useState<string | null>(null);
  const [autoSave, setAutoSave] = useState(true);
  const [lastSaved, setLastSaved] = useState<Date>(assessment.lastModified);
  const [sessionStartTime] = useState<Date>(new Date());
  const [questionStartTime, setQuestionStartTime] = useState<Date>(new Date());
  const [timeSpentPerQuestion, setTimeSpentPerQuestion] = useState<Record<string, number>>({});
  const [notes, setNotes] = useState<Record<string, string>>(
    assessment.questionNotes ? assessment.questionNotes : 
    assessment.notes ? JSON.parse(assessment.notes) : {}
  );
  const [showNotes, setShowNotes] = useState(false);
  const [showTimer, setShowTimer] = useState(true);
  const [sessionTime, setSessionTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [confidence, setConfidence] = useState<Record<string, number>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<string[]>([]);
  const [questionEvidence, setQuestionEvidence] = useState<Record<string, any[]>>(
    assessment.questionEvidence || {}
  );
  const [evidenceLibrary, setEvidenceLibrary] = useState<any[]>(
    assessment.evidenceLibrary || []
  );
  const [showVersionHistory, setShowVersionHistory] = useState(false);
  const [showAssignmentPanel, setShowAssignmentPanel] = useState(false);
  const [questionAssignments, setQuestionAssignments] = useState<Record<string, string[]>>(
    assessment.questionAssignments || {}
  );
  const [availableTeamMembers, setAvailableTeamMembers] = useState<Array<{
    id: string;
    name: string;
    email: string;
    role: string;
  }>>([
    { id: 'user-001', name: 'Sarah Johnson', email: 'sarah@company.com', role: 'CISO' },
    { id: 'user-002', name: 'Mike Chen', email: 'mike@company.com', role: 'Security Analyst' },
    { id: 'user-003', name: 'Emily Rodriguez', email: 'emily@company.com', role: 'Compliance Officer' }
  ]);
  
  // Use centralized breadcrumb logic
  const { breadcrumbs } = useInternalLinking();
  
  const timerRef = useRef<NodeJS.Timeout>();

  const currentSection = framework.sections[currentSectionIndex];
  const currentCategory = currentSection?.categories[currentCategoryIndex];
  const currentQuestion = currentCategory?.questions[currentQuestionIndex];

  // Timer functionality
  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(() => {
        setSessionTime(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPaused]);

  // Track time spent on each question
  useEffect(() => {
    if (currentQuestion) {
      setQuestionStartTime(new Date());
    }
  }, [currentQuestion?.id]);

  const handleSave = useCallback(() => {
    console.log('handleSave called - auto-save triggered');
    
    const totalTimeSpent = Math.round((new Date().getTime() - sessionStartTime.getTime()) / 60000);
    
    const updatedAssessment: AssessmentData = {
      ...assessment,
      responses,
      bookmarks,
      lastModified: new Date(),
      isComplete: answeredQuestions === totalQuestions,
      timeSpent: (assessment.timeSpent || 0) + totalTimeSpent,
      questionNotes: notes,
      notes: assessment.notes, // Keep legacy notes field for backward compatibility
      questionEvidence,
      evidenceLibrary,
      assessmentVersion: assessment.assessmentVersion || '1.0.0',
      versionHistory: assessment.versionHistory || [],
      changeLog: [
        ...(assessment.changeLog || []),
        {
          id: Date.now().toString(),
          timestamp: new Date(),
          changeType: 'response_modified',
          changedBy: 'Current User',
          impact: 'medium',
          reviewRequired: false,
          automatedChange: false,
          rollbackable: true,
          confidenceLevel: 'high'
        }
      ],
      customFields: {
        ...assessment.customFields,
        timeSpentPerQuestion,
        confidence,
        flaggedQuestions,
        sessionData: {
          startTime: sessionStartTime,
          duration: totalTimeSpent
        }
      }
    };
    
    onSave(updatedAssessment);
    setLastSaved(new Date());
  }, [
    assessment,
    responses,
    bookmarks,
    notes,
    questionEvidence,
    evidenceLibrary,
    timeSpentPerQuestion,
    confidence,
    flaggedQuestions,
    sessionStartTime,
    onSave
  ]);

  // Auto-save functionality
  useEffect(() => {
    console.log('Auto-save useEffect triggered - checking conditions');
    console.log('autoSave:', autoSave, 'responses length:', Object.keys(responses).length, 'notes length:', Object.keys(notes).length);
    
    if (autoSave && (Object.keys(responses).length > 0 || Object.keys(notes).length > 0)) {
      console.log('Auto-save conditions met - setting timer');
      const timer = setTimeout(() => {
        console.log('Auto-save timer fired - calling handleSave');
        handleSave();
      }, 5000);

      return () => clearTimeout(timer);
    } else {
      console.log('Auto-save conditions not met');
    }
  }, [responses, autoSave, bookmarks, notes, handleSave]);

  // Calculate progress
  const totalQuestions = framework.sections.reduce((sum, section) => 
    sum + section.categories.reduce((catSum, category) => 
      catSum + category.questions.length, 0), 0);
  
  const answeredQuestions = Object.keys(responses).length;
  const progressPercentage = Math.round((answeredQuestions / totalQuestions) * 100);

  const handleResponseChange = useCallback((questionId: string, value: number) => {
    console.log('handleResponseChange called for question:', questionId, 'value:', value);
    
    // Track time spent on previous question
    if (currentQuestion && timeSpentPerQuestion[currentQuestion.id] === undefined) {
      const timeSpent = Math.round((new Date().getTime() - questionStartTime.getTime()) / 1000);
      setTimeSpentPerQuestion(prev => ({
        ...prev,
        [currentQuestion.id]: timeSpent
      }));
    }

    setResponses(prev => ({
      ...prev,
      [questionId]: value
    }));
  }, [currentQuestion, questionStartTime, timeSpentPerQuestion]);

  const handleBookmark = useCallback((questionId: string) => {
    setBookmarks(prev => 
      prev.includes(questionId)
        ? prev.filter(id => id !== questionId)
        : [...prev, questionId]
    );
  }, []);

  const handleFlag = useCallback((questionId: string) => {
    setFlaggedQuestions(prev => 
      prev.includes(questionId)
        ? prev.filter(id => id !== questionId)
        : [...prev, questionId]
    );
  }, []);

  const handleNoteChange = useCallback((questionId: string, note: string) => {
    setNotes(prev => ({
      ...prev,
      [questionId]: note
    }));
  }, []);

  const handleConfidenceChange = useCallback((questionId: string, level: number) => {
    setConfidence(prev => ({
      ...prev,
      [questionId]: level
    }));
  }, []);

  const handleAddEvidence = useCallback((questionId: string, evidence: any) => {
    setQuestionEvidence(prev => ({
      ...prev,
      [questionId]: [...(prev[questionId] || []), evidence]
    }));
  }, []);

  const handleRemoveEvidence = useCallback((questionId: string, evidenceId: string) => {
    setQuestionEvidence(prev => ({
      ...prev,
      [questionId]: (prev[questionId] || []).filter(e => e.evidenceId !== evidenceId)
    }));
  }, []);

  const handleUploadEvidence = useCallback((file: File, metadata: any) => {
    const uploadFile = async () => {
      try {
        const { fileService } = await import('../../../services/fileService');
        const uploadResult = await fileService.uploadFile(file);
        
        const newEvidence = {
          id: uploadResult.id,
          name: uploadResult.name,
          uploadedBy: 'Current User',
          uploadedAt: uploadResult.uploadedAt,
          fileSize: uploadResult.size,
          mimeType: uploadResult.type,
          filePath: uploadResult.url,
          ...metadata
        };

        // Add to evidence library
        setEvidenceLibrary(prev => [...prev, newEvidence]);

        // Auto-link to current question
        const questionEvidence = {
          evidenceId: newEvidence.id,
          relevance: 'primary' as const,
          linkedAt: new Date(),
          linkedBy: 'Current User',
          confidence: 'high' as const
        };

        handleAddEvidence(currentQuestion.id, questionEvidence);
      } catch (error) {
        console.error('Failed to upload evidence:', error);
        alert('Failed to upload file: ' + (error as Error).message);
      }
    };
    
    uploadFile();
  }, [currentQuestion, handleAddEvidence]);

  const handleAssignQuestion = useCallback((questionId: string, assignedTo: string[]) => {
    setQuestionAssignments(prev => ({
      ...prev,
      [questionId]: assignedTo
    }));

    // Auto-save assignment changes
    const updatedAssessment: AssessmentData = {
      ...assessment,
      questionAssignments: {
        ...questionAssignments,
        [questionId]: assignedTo
      },
      lastModified: new Date()
    };
    
    onSave(updatedAssessment);
  }, [assessment, questionAssignments, onSave]);

  const handleCreateTasksFromQuestion = useCallback(async (questionId: string) => {
    if (!currentQuestion) return;
    
    const assignedUsers = questionAssignments[questionId] || [];
    if (assignedUsers.length === 0) {
      addNotification('warning', 'Please assign team members to this question first');
      return;
    }

    try {
      const { taskService } = await import('../../../services/taskService');
      
      const taskPromises = assignedUsers.map(async (userId) => {
        const newTask = {
          title: `Complete ${currentQuestion.text}`,
          description: `Answer and provide evidence for: ${currentQuestion.text}`,
          type: 'assessment' as const,
          priority: currentQuestion.priority === 'high' ? 'high' as const : 'medium' as const,
          status: 'not-started' as const,
          nistFunction: currentSection.name.split(' ')[0] as any,
          nistCategory: currentCategory.name,
          nistSubcategory: currentQuestion.id,
          relatedControlId: currentQuestion.id,
          assignedTo: [userId],
          assignedBy: 'current-user',
          dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
          estimatedHours: 2,
          progress: 0,
          dependencies: [],
          subtasks: [],
          attachments: [],
          comments: [],
          evidence: [],
          approvalRequired: false,
          tags: ['assessment', 'auto-generated'],
          metadata: {
            businessImpact: 'medium' as const,
            technicalComplexity: 'medium' as const,
            riskReduction: 10,
            complianceImpact: [framework.name],
            successCriteria: ['Question completed', 'Evidence provided']
          }
        };
        
        return taskService.createTask(newTask, 'current-user');
      });
      
      await Promise.all(taskPromises);
      addNotification('success', `Created ${assignedUsers.length} task(s) for this question`);
    } catch (error) {
      console.error('Failed to create tasks:', error);
      addNotification('error', 'Failed to create tasks: ' + (error as Error).message);
    }
  }, [currentQuestion, questionAssignments, assessment, currentSection, currentCategory, framework.name]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const getQuestionRiskLevel = (question: Question, response?: number) => {
    if (response === undefined) return 'unknown';
    if (response === 0) return 'critical';
    if (response === 1) return 'high';
    if (response === 2) return 'medium';
    return 'low';
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'critical': return 'text-red-600 dark:text-red-400';
      case 'high': return 'text-orange-600 dark:text-orange-400';
      case 'medium': return 'text-yellow-600 dark:text-yellow-400';
      case 'low': return 'text-green-600 dark:text-green-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  const goToNextQuestion = useCallback(() => {
    const section = framework.sections[currentSectionIndex];
    const category = section.categories[currentCategoryIndex];
    
    if (currentQuestionIndex < category.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (currentCategoryIndex < section.categories.length - 1) {
      setCurrentCategoryIndex(currentCategoryIndex + 1);
      setCurrentQuestionIndex(0);
    } else if (currentSectionIndex < framework.sections.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
      setCurrentCategoryIndex(0);
      setCurrentQuestionIndex(0);
    }
  }, [currentSectionIndex, currentCategoryIndex, currentQuestionIndex, framework.sections]);

  const goToPreviousQuestion = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else if (currentCategoryIndex > 0) {
      setCurrentCategoryIndex(currentCategoryIndex - 1);
      const prevCategory = framework.sections[currentSectionIndex].categories[currentCategoryIndex - 1];
      setCurrentQuestionIndex(prevCategory.questions.length - 1);
    } else if (currentSectionIndex > 0) {
      setCurrentSectionIndex(currentSectionIndex - 1);
      const prevSection = framework.sections[currentSectionIndex - 1];
      setCurrentCategoryIndex(prevSection.categories.length - 1);
      const prevCategory = prevSection.categories[prevSection.categories.length - 1];
      setCurrentQuestionIndex(prevCategory.questions.length - 1);
    }
  }, [currentSectionIndex, currentCategoryIndex, currentQuestionIndex, framework.sections]);

  if (!currentQuestion) {
    return <div>Loading...</div>;
  }

  const isBookmarked = bookmarks.includes(currentQuestion.id);
  const isFlagged = flaggedQuestions.includes(currentQuestion.id);
  const currentResponse = responses[currentQuestion.id];
  const riskLevel = getQuestionRiskLevel(currentQuestion, currentResponse);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumbs */}
      <div className="mb-6">
        <Breadcrumbs items={breadcrumbs} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Enhanced Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 sticky top-24">
            {/* Session Timer */}
            {showTimer && (
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-t-xl">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-gray-900 dark:text-white flex items-center space-x-2">
                    <Timer className="w-4 h-4 text-green-600 dark:text-green-400" />
                    <span>Session Time</span>
                  </h4>
                  <button
                    onClick={() => setIsPaused(!isPaused)}
                    className="p-1 rounded-full hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
                  >
                    {isPaused ? <Play className="w-4 h-4 text-green-600" /> : <Pause className="w-4 h-4 text-green-600" />}
                  </button>
                </div>
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {formatTime(sessionTime)}
                </div>
                <div className="text-xs text-green-700 dark:text-green-300 mt-1">
                  Avg: {Math.round(sessionTime / Math.max(answeredQuestions, 1))}s per question
                </div>
              </div>
            )}

            {/* Progress Overview */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900 dark:text-white flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span>Progress</span>
                </h3>
                <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {progressPercentage}%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 mb-4 overflow-hidden shadow-inner">
                <div
                  className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 h-4 rounded-full transition-all duration-500 shadow-lg relative overflow-hidden"
                  style={{ width: `${progressPercentage}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="text-gray-700 dark:text-gray-200">
                  <span className="font-medium">{answeredQuestions}</span> / {totalQuestions} completed
                </div>
                <div className="text-gray-700 dark:text-gray-200">
                  <span className="font-medium">{bookmarks.length}</span> bookmarked
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h4 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center space-x-2">
                <Zap className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                <span>Quick Actions</span>
              </h4>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleBookmark(currentQuestion.id)}
                  className={`p-2 rounded-lg text-xs font-medium transition-all duration-200 flex items-center justify-center space-x-1 ${
                    isBookmarked
                      ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-yellow-50 dark:hover:bg-yellow-900/20'
                  }`}
                >
                  {isBookmarked ? <BookmarkCheck className="w-3 h-3" /> : <Bookmark className="w-3 h-3" />}
                  <span>Bookmark</span>
                </button>
                
                <button
                  onClick={() => handleFlag(currentQuestion.id)}
                  className={`p-2 rounded-lg text-xs font-medium transition-all duration-200 flex items-center justify-center space-x-1 ${
                    isFlagged
                      ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20'
                  }`}
                >
                  <Flag className="w-3 h-3" />
                  <span>Flag</span>
                </button>
                
                <button
                  onClick={() => setShowNotes(!showNotes)}
                  className={`p-2 rounded-lg text-xs font-medium transition-all duration-200 flex items-center justify-center space-x-1 ${
                    showNotes || notes[currentQuestion.id]
                      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                  }`}
                >
                  <MessageSquare className="w-3 h-3" />
                  <span>Notes</span>
                  {notes[currentQuestion.id] && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                  )}
                </button>
                
                <button
                  onClick={() => setShowHints(!showHints)}
                  className="p-2 rounded-lg text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-200 flex items-center justify-center space-x-1"
                >
                  <Lightbulb className="w-3 h-3" />
                  <span>Hints</span>
                </button>
              </div>
            </div>

            {/* Auto-save Toggle */}
            <div className="p-6 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-700 dark:to-blue-900/20 rounded-b-xl">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={autoSave}
                  onChange={(e) => setAutoSave(e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-offset-2 transform hover:scale-110 transition-transform"
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  Auto-save
                </span>
              </label>
              {lastSaved && (
                <div className="text-xs text-gray-600 dark:text-gray-300 mt-3 flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>Last saved: {lastSaved.toLocaleTimeString()}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Enhanced Main Content */}
        <div className="lg:col-span-3">
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-xl border border-gray-200 dark:border-gray-700">
            {/* Enhanced Header */}
            <div className="p-8 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-white to-blue-50 dark:from-gray-800 dark:to-blue-900/20 rounded-t-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-xl">
                    <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                      {framework.name} Assessment
                    </h1>
                    <div className="flex items-center space-x-4 mt-1">
                      <p className="text-gray-600 dark:text-gray-300">
                        Version {framework.version} • {framework.complexity} complexity
                      </p>
                      {currentResponse !== undefined && (
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          riskLevel === 'critical' ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300' :
                          riskLevel === 'high' ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300' :
                          riskLevel === 'medium' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300' :
                          'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                        }`}>
                          Risk: {riskLevel}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setShowAssignmentPanel(!showAssignmentPanel)}
                    className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-3 rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 font-medium"
                  >
                    <Users className="w-5 h-5" />
                    <span>Assign Tasks</span>
                  </button>
                  
                  <button
                    onClick={handleSave}
                    className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 font-medium"
                  >
                    <Save className="w-5 h-5" />
                    <span>Save Progress</span>
                  </button>
                  
                  <button
                    onClick={() => onGenerateReport(assessment)}
                    className="flex items-center space-x-2 bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 font-medium"
                  >
                    <FileText className="w-5 h-5" />
                    <span>Generate Report</span>
                  </button>
                  
                  <button
                    onClick={() => setShowVersionHistory(true)}
                    className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-3 rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 font-medium"
                  >
                    <History className="w-5 h-5" />
                    <span>Version History</span>
                  </button>
                </div>
              </div>

              {/* Enhanced Breadcrumb */}
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600">
                <span>{framework.name}</span>
                <ChevronRight className="w-4 h-4" />
                <span>{currentSection.name}</span>
                <ChevronRight className="w-4 h-4" />
                <span>{currentCategory.name}</span>
                <ChevronRight className="w-4 h-4" />
                <span>Question {currentQuestionIndex + 1}</span>
                {isBookmarked && <BookmarkCheck className="w-4 h-4 text-yellow-500" />}
                {isFlagged && <Flag className="w-4 h-4 text-red-500" />}
              </div>
            </div>

            {/* Enhanced Question Content */}
            <div className="p-8">
              {/* Question */}
              <div className="bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/30 dark:from-gray-700/50 dark:via-blue-900/10 dark:to-indigo-900/10 rounded-2xl p-8 mb-8 border border-gray-200 dark:border-gray-600 shadow-lg">
                <div className="flex items-start space-x-3 mb-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                    {currentQuestionIndex + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-4">
                      <span className={`text-sm font-bold px-3 py-1 rounded-full ${
                        currentQuestion.priority === 'high' ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300' :
                        currentQuestion.priority === 'medium' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300' :
                        'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                      }`}>
                        {currentQuestion.priority.charAt(0).toUpperCase() + currentQuestion.priority.slice(1)} Priority
                      </span>
                      {currentQuestion.references && (
                        <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded">
                          Ref: {currentQuestion.references.join(', ')}
                        </span>
                      )}
                    </div>
                    
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-6 leading-relaxed">
                      {currentQuestion.text}
                    </h4>
                    
                    {/* Enhanced Guidance */}
                    {currentQuestion.guidance && (
                      <div className="mb-6">
                        <button
                          onClick={() => setShowGuidance(showGuidance === currentQuestion.id ? null : currentQuestion.id)}
                          className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-all duration-200 bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transform hover:scale-105"
                        >
                          <BookOpen className="w-5 h-5" />
                          <span className="font-medium">
                            {showGuidance === currentQuestion.id ? 'Hide' : 'Show'} Guidance
                          </span>
                        </button>
                        
                        {showGuidance === currentQuestion.id && (
                          <div className="mt-4 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200 dark:border-blue-700 shadow-lg animate-slide-up">
                            <p className="text-blue-800 dark:text-blue-200 leading-relaxed mb-4">
                              {currentQuestion.guidance}
                            </p>
                            
                            {currentQuestion.examples && currentQuestion.examples.length > 0 && (
                              <div className="mt-4">
                                <h5 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Examples:</h5>
                                <ul className="list-disc list-inside space-y-1 text-blue-700 dark:text-blue-300">
                                  {currentQuestion.examples.map((example, index) => (
                                    <li key={index} className="text-sm">{example}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Enhanced Answer Options */}
                    <div className="space-y-4 mb-6">
                      {currentQuestion.options.map((option) => (
                        <label
                          key={option.value}
                          className={`flex items-center space-x-4 p-6 rounded-xl border-2 cursor-pointer transition-all duration-200 transform hover:scale-105 ${
                            responses[currentQuestion.id] === option.value
                              ? 'border-blue-500 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 shadow-lg'
                              : 'border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500 hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50/30 dark:hover:from-gray-700/50 dark:hover:to-blue-900/10 hover:shadow-md'
                          }`}
                        >
                          <input
                            type="radio"
                            name={currentQuestion.id}
                            value={option.value}
                            checked={responses[currentQuestion.id] === option.value}
                            onChange={() => handleResponseChange(currentQuestion.id, option.value)}
                            className="text-blue-600 focus:ring-blue-500 focus:ring-offset-2 w-5 h-5 transform hover:scale-110 transition-transform"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <div className="font-bold text-gray-900 dark:text-white text-lg">
                                {option.label}
                              </div>
                              {option.riskLevel && (
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  option.riskLevel === 'critical' ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300' :
                                  option.riskLevel === 'high' ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300' :
                                  option.riskLevel === 'medium' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300' :
                                  'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                                }`}>
                                  {option.riskLevel} risk
                                </span>
                              )}
                            </div>
                            {option.description && (
                              <div className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                {option.description}
                              </div>
                            )}
                            {option.recommendedActions && option.recommendedActions.length > 0 && (
                              <div className="mt-2">
                                <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Recommended Actions:</div>
                                <ul className="text-xs text-gray-600 dark:text-gray-300 space-y-1">
                                  {option.recommendedActions.map((action, index) => (
                                    <li key={index} className="flex items-start space-x-1">
                                      <span className="text-blue-500 mt-1">•</span>
                                      <span>{action}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </label>
                      ))}
                    </div>

                    {/* Assignment Panel */}
                    {showAssignmentPanel && (
                      <div className="mb-6 p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border border-purple-200 dark:border-purple-700 shadow-lg">
                        <div className="flex items-center space-x-2 mb-4">
                          <Users className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                          <h5 className="font-semibold text-purple-900 dark:text-purple-100">
                            Assign Question to Team Members
                          </h5>
                        </div>
                        
                        <div className="space-y-3">
                          {availableTeamMembers.map(member => (
                            <label key={member.id} className="flex items-center space-x-3 p-3 bg-white dark:bg-gray-700 rounded-lg border border-purple-200 dark:border-purple-600">
                              <input
                                type="checkbox"
                                checked={questionAssignments[currentQuestion.id]?.includes(member.id) || false}
                                onChange={(e) => {
                                  const currentAssignments = questionAssignments[currentQuestion.id] || [];
                                  if (e.target.checked) {
                                    handleAssignQuestion(currentQuestion.id, [...currentAssignments, member.id]);
                                  } else {
                                    handleAssignQuestion(currentQuestion.id, currentAssignments.filter(id => id !== member.id));
                                  }
                                }}
                                className="rounded border-purple-300 text-purple-600 focus:ring-purple-500"
                              />
                              <div className="flex-1">
                                <div className="font-medium text-gray-900 dark:text-white">
                                  {member.name}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-300">
                                  {member.role} • {member.email}
                                </div>
                              </div>
                            </label>
                          ))}
                        </div>
                        
                        <div className="mt-4 flex space-x-3">
                          <button
                            onClick={() => handleCreateTasksFromQuestion(currentQuestion.id)}
                            disabled={!questionAssignments[currentQuestion.id]?.length}
                            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          >
                            Create Tasks for Assigned Members
                          </button>
                          <button
                            onClick={() => setShowAssignmentPanel(false)}
                            className="border border-purple-600 text-purple-600 dark:text-purple-400 px-4 py-2 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Confidence Level */}
                    {currentResponse !== undefined && (
                      <div className="mb-6 p-4 bg-white/50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          How confident are you in this response?
                        </label>
                        <div className="flex space-x-2">
                          {[1, 2, 3, 4, 5].map((level) => (
                            <button
                              key={level}
                              onClick={() => handleConfidenceChange(currentQuestion.id, level)}
                              className={`p-2 rounded-lg transition-all duration-200 ${
                                confidence[currentQuestion.id] === level
                                  ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300'
                                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-yellow-50 dark:hover:bg-yellow-900/20'
                              }`}
                            >
                              <Star className={`w-4 h-4 ${confidence[currentQuestion.id] >= level ? 'fill-current' : ''}`} />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Notes Section */}
                    {showNotes && (
                      <div className="mb-6 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200 dark:border-blue-700 shadow-lg">
                        <div className="flex items-center space-x-2 mb-4">
                          <MessageSquare className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                          <h5 className="font-semibold text-blue-900 dark:text-blue-100">
                            Question Notes & Comments
                          </h5>
                        </div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Add your observations, context, or additional information:
                        </label>
                        <textarea
                          value={notes[currentQuestion.id] || ''}
                          onChange={(e) => handleNoteChange(currentQuestion.id, e.target.value)}
                          placeholder="Add your notes, observations, evidence references, or additional context for this question..."
                          className="w-full p-4 border border-blue-300 dark:border-blue-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-blue-400 dark:placeholder-blue-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200"
                          rows={4}
                        />
                        <div className="mt-3 flex items-center justify-between">
                          <div className="text-xs text-blue-700 dark:text-blue-300">
                            💡 Tip: Notes are automatically saved and can be viewed in reports
                          </div>
                          <div className="text-xs text-blue-600 dark:text-blue-400">
                            {notes[currentQuestion.id]?.length || 0} characters
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Hints Section */}
                    {showHints && currentQuestion.examples && (
                      <div className="mb-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-700">
                        <div className="flex items-center space-x-2 mb-3">
                          <Lightbulb className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                          <h5 className="font-semibold text-purple-900 dark:text-purple-100">Helpful Hints</h5>
                        </div>
                        <ul className="space-y-2 text-purple-800 dark:text-purple-200">
                          {currentQuestion.examples.map((hint, index) => (
                            <li key={index} className="flex items-start space-x-2 text-sm">
                              <span className="text-purple-500 mt-1">💡</span>
                              <span>{hint}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Evidence Manager */}
                    <EvidenceManager
                      questionId={currentQuestion.id}
                      questionEvidence={questionEvidence[currentQuestion.id] || []}
                      evidenceLibrary={evidenceLibrary}
                      onAddEvidence={handleAddEvidence}
                      onRemoveEvidence={handleRemoveEvidence}
                      onUploadEvidence={handleUploadEvidence}
                      className="mb-6"
                    />

                    {/* Current Assignments Display */}
                    {questionAssignments[currentQuestion.id]?.length > 0 && (
                      <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-700">
                        <div className="flex items-center space-x-2 mb-3">
                          <Users className="w-4 h-4 text-green-600 dark:text-green-400" />
                          <h5 className="font-semibold text-green-900 dark:text-green-100">
                            Assigned Team Members
                          </h5>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {questionAssignments[currentQuestion.id].map(userId => {
                            const member = availableTeamMembers.find(m => m.id === userId);
                            return (
                              <span
                                key={userId}
                                className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-sm rounded-full flex items-center space-x-2"
                              >
                                <span>{member?.name || 'Unknown User'}</span>
                                <span className="text-xs">({member?.role})</span>
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Enhanced Navigation */}
              <div className="flex items-center justify-between bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-700/50 dark:to-blue-900/20 p-6 rounded-xl border border-gray-200 dark:border-gray-600">
                <button
                  onClick={goToPreviousQuestion}
                  disabled={currentSectionIndex === 0 && currentCategoryIndex === 0 && currentQuestionIndex === 0}
                  className="flex items-center space-x-2 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-white dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 font-medium shadow-lg hover:shadow-xl"
                >
                  <ChevronLeft className="w-5 h-5" />
                  <span>Previous</span>
                </button>

                <div className="text-center">
                  <div className="text-sm font-bold text-gray-900 dark:text-white">
                    Question {currentQuestionIndex + 1} of {currentCategory.questions.length} in {currentCategory.name}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                    {Math.round(((currentQuestionIndex + 1) / currentCategory.questions.length) * 100)}% of category complete
                  </div>
                  {timeSpentPerQuestion[currentQuestion.id] && (
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Time spent: {timeSpentPerQuestion[currentQuestion.id]}s
                    </div>
                  )}
                </div>

                <button
                  onClick={goToNextQuestion}
                  disabled={
                    currentSectionIndex === framework.sections.length - 1 &&
                    currentCategoryIndex === currentSection.categories.length - 1 &&
                    currentQuestionIndex === currentCategory.questions.length - 1
                  }
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 font-medium shadow-lg hover:shadow-xl"
                >
                  <span>Next</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};