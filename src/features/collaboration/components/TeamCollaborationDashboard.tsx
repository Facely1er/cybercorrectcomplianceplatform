import React, { useState } from 'react';
import { UserMessageSquareCheckCircle } from 'lucide-react';
import { Breadcrumbs } from '../../../shared/components/layout/Breadcrumbs';
import { useInternalLinking } from '../../../shared/hooks/useInternalLinking';

interface TeamCollaborationDashboardProps {, message: string) => void;
}

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  nistFunctions: string[];
  assignedTasks: number;
  completedTasks: number;
  lastActive: Date;
  avatar?: string;
  expertise: string[];
  workload: number;
}

export const TeamCollaborationDashboard: React.FC<TeamCollaborationDashboardProps> = ({, addNotification }) => {
  const { breadcrumbs } = useInternalLinking();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterFunction, setFilterFunction] = useState('all');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteFormData, setInviteFormData] = useState({
    email: '', role: 'member', functions: [] as string[], message: ''
  });

  // Mock team data
  const teamMembers: TeamMember[] = [
    {
      id: 'tm-001', name: 'Sarah Johnson', email: 'sarah.johnson@company.com', role: 'CISO', department: 'Information Security', nistFunctions: ['Govern', 'Identify', 'Protect', 'Detect', 'Respond', 'Recover'], assignedTasks: 12, completedTasks: 8, lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      expertise: ['Risk Management', 'Governance', 'Compliance'], workload: 85
    
    },
    {
      id: 'tm-002', name: 'Mike Chen', email: 'mike.chen@company.com', role: 'Security Analyst', department: 'Information Security', nistFunctions: ['Identify', 'Detect', 'Respond'], assignedTasks: 15, completedTasks: 12, lastActive: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      expertise: ['Vulnerability Management', 'Incident Response', 'SIEM'], workload: 78
    
    },
    {
      id: 'tm-003', name: 'Emily Rodriguez', email: 'emily.rodriguez@company.com', role: 'Compliance Officer', department: 'Legal & Compliance', nistFunctions: ['Govern', 'Identify'], assignedTasks: 8, completedTasks: 6, lastActive: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      expertise: ['CMMC', 'NIST SP 800-171', 'Documentation'], workload: 65
    
    },
    {
      id: 'tm-004', name: 'Alex Thompson', email: 'alex.thompson@company.com', role: 'Network Administrator', department: 'IT Operations', nistFunctions: ['Protect', 'Detect'], assignedTasks: 10, completedTasks: 7, lastActive: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
      expertise: ['Network Security', 'Monitoring', 'Infrastructure'], workload: 72
    }
  ];

  const getRoleColor = (role: string) => {
    switch (role.toLowerCase()) {
      case 'ciso':
        return 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300';
      case 'security analyst':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300';
      case 'compliance officer':
        return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300';
      case 'network administrator':
        return 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300';
      default:
        return 'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300';
    }
  };

  const getWorkloadColor = (workload: number) => {
    if (workload >= 90) return 'text-red-600 dark:text-red-400';
    if (workload >= 75) return 'text-orange-600 dark:text-orange-400';
    if (workload >= 50) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-green-600 dark:text-green-400';
  };

  const filteredMembers = teamMembers.filter(member =>) {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || member.role.toLowerCase().includes(filterRole.toLowerCase());
    const matchesFunction = filterFunction === 'all' || member.nistFunctions.includes(filterFunction);
    
    return matchesSearch && matchesRole && matchesFunction;
  });

  const handleInviteTeamMember = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inviteFormData.email.trim()) {
      addNotification('error', 'Email address is required');
      return;
    }

    // Simulate sending invitation
    addNotification('success', `Invitation sent to ${inviteFormData.email 
   }`);
    setShowInviteModal(false);
    
    // Reset form
    setInviteFormData({
      email: '', role: 'member', functions: [], message: ''
    
    });
  };

  const teamStats = {
    totalMembers: teamMembers.length, avgWorkload: Math.round(teamMembers.reduce((sum, member) => sum + member.workload, 0) / teamMembers.length), totalTasks: teamMembers.reduce((sum, member) => sum + member.assignedTasks, 0), completedTasks: teamMembers.reduce((sum, member) => sum + member.completedTasks, 0), overloadedMembers: teamMembers.filter(member => member.workload >= 85).length };

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
              <div className="p-3 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-xl">
                <Users className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Team Collaboration
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                  Coordinate NIST CSF v2.0 implementation across your team
                </p>
              </div>
            </div>
            
            <button
              onClick={() => setShowInviteModal(true)}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <UserPlus className="w-4 h-4" />
              <span>Invite Member</span>
            </button>
          </div>
        </div>
      </div>

      {/* Team Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Team Members</p>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{teamStats.totalMembers }</p>
            </div>
            <Users className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Workload</p>
              <p className={`text-3xl font-bold ${getWorkloadColor(teamStats.avgWorkload)}`}>
                {teamStats.avgWorkload }%
              </p>
            </div>
            <BarChart3 className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Tasks</p>
              <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{teamStats.totalTasks }</p>
            </div>
            <CheckSquare className="w-8 h-8 text-purple-600 dark:text-purple-400" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Completed</p>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">{teamStats.completedTasks }</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Overloaded</p>
              <p className="text-3xl font-bold text-red-600 dark:text-red-400">{teamStats.overloadedMembers }</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 mb-8 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex-1 max-w-lg">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search team members..."
                value={searchTerm }
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex space-x-4">
            <select
              value={filterRole }
              onChange={(e) => setFilterRole(e.target.value)}
              className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Roles</option>
              <option value="ciso">CISO</option>
              <option value="security">Security Analyst</option>
              <option value="compliance">Compliance Officer</option>
              <option value="admin">Administrator</option>
            </select>
            
            <select
              value={filterFunction }
              onChange={(e) => setFilterFunction(e.target.value)}
              className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Functions</option>
              <option value="Govern">Govern</option>
              <option value="Identify">Identify</option>
              <option value="Protect">Protect</option>
              <option value="Detect">Detect</option>
              <option value="Respond">Respond</option>
              <option value="Recover">Recover</option>
            </select>
          </div>
        </div>
      </div>

      {/* Team Members Grid */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Team Members ({filteredMembers.length })
          </h2>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredMembers.map((member) => (
              <div key={member.id } className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 dark:text-blue-400 font-bold text-lg">
                        {member.name.split(' ').map(n => n.charAt(0)).join('')}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {member.name }
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {member.email }
                      </p>
                    </div>
                  </div>
                  
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleColor(member.role)}`}>
                    {member.role }
                  </span>
                </div>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-300">Department:</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {member.department }
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-300">Tasks:</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {member.completedTasks }/{member.assignedTasks }
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-300">Workload:</span>
                    <span className={`text-sm font-medium ${getWorkloadColor(member.workload)}`}>
                      {member.workload }%
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-300">Last Active:</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {member.lastActive.toLocaleTimeString()}
                    </span>
                  </div>
                </div>

                {/* NIST Functions */}
                <div className="mb-4">
                  <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">NIST Functions:</div>
                  <div className="flex flex-wrap gap-1">
                    {member.nistFunctions.map((func, index) => (
                      <span
                        key={index }
                        className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs rounded"
                      >
                        {func }
                      </span>
                    ))}
                  </div>
                </div>

                {/* Expertise */}
                <div className="mb-4">
                  <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">Expertise:</div>
                  <div className="flex flex-wrap gap-1">
                    {member.expertise.map((skill, index) => (
                      <span
                        key={index }
                        className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs rounded"
                      >
                        {skill }
                      </span>
                    ))}
                  </div>
                </div>

                {/* Workload Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600 dark:text-gray-300">Workload Distribution</span>
                    <span className={`text-sm font-medium ${getWorkloadColor(member.workload)}`}>
                      {member.workload }%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        member.workload >= 90 ? 'bg-red-500' :
                        member.workload >= 75 ? 'bg-orange-500' :
                        member.workload >= 50 ? 'bg-yellow-500' : 'bg-green-500'
                     }`}
                      style={{ width: `${member.workload}%` }}
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      const memberDetails = `Team Member Details:

Name: ${member.name}
Email: ${member.email}
Role: ${member.role}
Department: ${member.department}

NIST Functions: ${member.nistFunctions.join(', ')}
Expertise: ${member.expertise.join(', ')}

Task Statistics:
• Assigned Tasks: ${member.assignedTasks}
• Completed Tasks: ${member.completedTasks}
• Completion Rate: ${Math.round((member.completedTasks / member.assignedTasks) * 100)}%
• Current Workload: ${member.workload}%

Activity:
• Last Active: ${member.lastActive.toLocaleString()}
• Status: Active

Workload Assessment: ${
  member.workload >= 90 ? 'Overloaded - needs support' :
  member.workload >= 75 ? 'High workload - monitor closely' :
  member.workload >= 50 ? 'Optimal workload' :
  'Under-utilized - can take on more tasks'}`;
                      
                      addNotification('info', memberDetails);
                    }}
                    className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    View Profile
                  </button>
                  <button
                    onClick={() => addNotification('info', `Messaging ${member.name}`)}
                    className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => addNotification('info', `Assigning tasks to ${member.name}`)}
                    className="p-2 text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-lg transition-colors"
                  >
                    <CheckSquare className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {filteredMembers.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No Team Members Found
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                No team members match your current search and filter criteria
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Invite Team Member
            </h3>
            
            <form onSubmit={handleInviteTeamMember } className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={inviteFormData.email }
                  onChange={(e) => setInviteFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="colleague@company.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Role
                </label>
                <select
                  value={inviteFormData.role }
                  onChange={(e) => setInviteFormData(prev => ({ ...prev, role: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="member">Team Member</option>
                  <option value="admin">Administrator</option>
                  <option value="viewer">Viewer</option>
                  <option value="editor">Editor</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  NIST Functions (Optional)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['Govern', 'Identify', 'Protect', 'Detect', 'Respond', 'Recover'].map((func) => (
                    <label key={func } className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={inviteFormData.functions.includes(func)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setInviteFormData(prev => ({
                              ...prev, functions: [...prev.functions, func]
                            }));
                          } else {
                            setInviteFormData(prev => ({
                              ...prev, functions: prev.functions.filter(f => f !== func)
                            }));
                          }
                        }}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{func }</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Invitation Message (Optional)
                </label>
                <textarea
                  value={inviteFormData.message }
                  onChange={(e) => setInviteFormData(prev => ({ ...prev, message: e.target.value }))}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Welcome to our NIST CSF v2.0 implementation team..."
                />
              </div>
              
              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowInviteModal(false);
                    setInviteFormData({
                      email: '', role: 'member', functions: [], message: ''
                    });
                  }}
                  className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
                >
                  Send Invitation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};