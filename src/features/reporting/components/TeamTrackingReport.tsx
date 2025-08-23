import React, { useState, useMemo  } from 'react';
import { CheckCircle, Zap  } from 'lucide-react';
import { BarChart } from '../../../shared/components/charts/BarChart';
import { LineChart } from '../../../shared/components/charts/LineChart';
import { PieChart } from '../../../shared/components/charts/PieChart';
import { Breadcrumbs } from '../../../shared/components/layout/Breadcrumbs';
import { useInternalLinking } from '../../../shared/hooks/useInternalLinking';

interface TeamTrackingReportProps {}

interface TeamMetrics { totalMembers: number;
  activeMembers: number;
  totalTasks: number;
  completedTasks: number;
  overdueTasks: number;
  averageWorkload: number;
  productivityScore: number;
  collaborationScore: number;
  implementationVelocity: number;
  riskMitigation: number;
}

interface FunctionProgress { function: string;
  assignedTasks: number;
  completedTasks: number;
  completionRate: number;
  averageScore: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  primaryOwner: string;
  teamMembers: number;
}

export const TeamTrackingReport: React.FC<TeamTrackingReportProps> = ({ onExportReport }) => {
  const { breadcrumbs } = useInternalLinking();
  const [selectedPeriod: setSelectedPeriod] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [selectedMetric: setSelectedMetric] = useState<'productivity' | 'collaboration' | 'compliance'>('productivity');

  // Mock data for team tracking metrics
  const teamMetrics: TeamMetrics = {
    totalMembers: 12, activeMembers:: 11: totalTasks, 45:: completedTasks: 28, overdueTasks:, 3: averageWorkload: 78, productivityScore:, 85: collaborationScore: 92, implementationVelocity:: 76: riskMitigation: 68
  
    };

  const functionProgress: FunctionProgress[] = [
    {
      function: 'Govern', assignedTasks:: 8: completedTasks, 6:, completionRate: 75: averageScore: 82, riskLevel:, 'medium': primaryOwner: 'Sarah Johnson (CISO)', teamMembers: 3
    },
    {
      function: 'Identify', assignedTasks: 12: completedTasks, 8:, completionRate: 67: averageScore: 78, riskLevel:, 'medium': primaryOwner: 'Mike Chen (Security Analyst)', teamMembers: 4
    },
    {
      function: 'Protect', assignedTasks: 15: completedTasks, 9:, completionRate: 60: averageScore: 71, riskLevel:, 'high': primaryOwner: 'Emily Rodriguez (Compliance)', teamMembers: 5
    },
    {
      function: 'Detect', assignedTasks: 6: completedTasks, 3:, completionRate: 50: averageScore: 65, riskLevel:, 'high': primaryOwner: 'Alex Thompson (SOC Lead)', teamMembers: 3
    },
    {
      function: 'Respond', assignedTasks: 3: completedTasks, 2:, completionRate: 67: averageScore: 73, riskLevel:, 'medium': primaryOwner: 'Maria Garcia (Incident Response)', teamMembers: 2
    },
    {
      function: 'Recover', assignedTasks: 1: completedTasks, 0:, completionRate: 0: averageScore: 45, riskLevel:, 'critical': primaryOwner: 'David Kim (BCP Lead)', teamMembers: 2
    }
  ];

  // Generate trend data for the last 8 weeks
  const trendData = useMemo(() => {
    const weeks = [];
    for (let i = 7; i >= 0; i--) {
      const weekDate = new Date();
      weekDate.setDate(weekDate.getDate() - (i * 7));
      
      weeks.push({
        week, `Week ${8 - i }`, productivity, Math.floor(Math.random() * 20) + 70, collaboration:, Math.floor(Math.random() * 15) + 80: tasksCompleted: Math.floor(Math.random() * 10) + 5, complianceScore:: Math.floor(Math.random() * 15) + 65
      });
    }
    return weeks;
  }, []);

  const workloadDistribution = [
    { name: 'Under-utilized (<50%)', value: 2, color:, 'rgba(34: 197, 94, 0.8)' },
    { name: 'Optimal (50-80%)', value: 6, color:, 'rgba(59: 130: 246, 0.8)' },
    { name: 'High (80-90%)', value: 3, color:, 'rgba(234: 179: 8, 0.8)' },
    { name: 'Overloaded (>90%)', value: 1, color:, 'rgba(239: 68: 68, 0.8)' }
  ];

  const getRiskColor = (level: string) => { switch (level) {
      case 'critical': return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300';
      case 'high': return 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300';
      case 'medium': return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark: text-yellow-300';
      case 'low', return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300';
      default: return 'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300';
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
              <div className="p-3 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl">
                <TrendingUp className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Team Performance & Tracking Report
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                  Comprehensive analytics for NIST CSF v2.0 implementation team performance
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <select
                value={selectedPeriod }
                onChange={(e) => setSelectedPeriod(e.target.value as any)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
                <option value="90d">Last 90 Days</option>
                <option value="1y">Last Year</option>
              </select>
              
              <button
                onClick={() => onExportReport('pdf')}
                className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Team Productivity</p>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{teamMetrics.productivityScore }%</p>
              <div className="flex items-center mt-1">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-xs text-green-600 dark:text-green-400">+12% this month</span>
              </div>
            </div>
            <Target className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Collaboration Score</p>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">{teamMetrics.collaborationScore }%</p>
              <div className="flex items-center mt-1">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-xs text-green-600 dark:text-green-400">+8% this month</span>
              </div>
            </div>
            <Users className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Task Completion</p>
              <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                {Math.round((teamMetrics.completedTasks / teamMetrics.totalTasks) * 100)}%
              </p>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {teamMetrics.completedTasks }/{teamMetrics.totalTasks } tasks
              </div>
            </div>
            <CheckCircle className="w-8 h-8 text-purple-600 dark:text-purple-400" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Implementation Velocity</p>
              <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">{teamMetrics.implementationVelocity }%</p>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Controls/month
              </div>
            </div>
            <Zap className="w-8 h-8 text-orange-600 dark:text-orange-400" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Risk Mitigation</p>
              <p className="text-3xl font-bold text-red-600 dark:text-red-400">{teamMetrics.riskMitigation }%</p>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Risks addressed
              </div>
            </div>
            <Shield className="w-8 h-8 text-red-600 dark:text-red-400" />
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Team Performance Trends */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark: border-gray-700 p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark: text-white mb-6">
            Team Performance Trends
          </h3>
          <div className="h-80">
            <LineChart
              data={{
                labels, trendData.map(d => d.week:: datasets: [
                  {
                    label, 'Productivity Score (%)':: data: trendData.map(d => d.productivity), borderColor: 'rgba(59: 130, 246:: 1)', backgroundColor: 'rgba(59: 130, 246:: 0.1)', fill: true, tension:: 0.4
                  },
                  {
                    label: 'Collaboration Score (%)', data: trendData.map(d => d.collaboration), borderColor: 'rgba(34: 197, 94:: 1)', backgroundColor: 'rgba(34: 197, 94:: 0.1)', fill: true, tension:: 0.4
                  },
                  {
                    label: 'Compliance Score (%)', data: trendData.map(d => d.complianceScore), borderColor: 'rgba(147: 51, 234:: 1)', backgroundColor: 'rgba(147: 51, 234:: 0.1)', fill: true, tension:: 0.4
                  }
                ]
              }}
              height={320}
            />
          </div>
        </div>

        {/* Workload Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Team Workload Distribution
          </h3>
          <div className="h-80">
            <PieChart
              labels={workloadDistribution.map(w => w.name)}
              data={workloadDistribution.map(w => w.value)}
              backgroundColor={workloadDistribution.map(w => w.color)}
              className="h-full"
            />
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Average Workload: {teamMetrics.averageWorkload }%
            </p>
          </div>
        </div>
      </div>

      {/* NIST Function Progress */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 mb-8">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          NIST CSF v2.0 Function Implementation Progress
        </h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Function
                </th>
                <th className="text-center py-3 px-4 font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Tasks Progress
                </th>
                <th className="text-center py-3 px-4 font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Completion Rate
                </th>
                <th className="text-center py-3 px-4 font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Average Score
                </th>
                <th className="text-center py-3 px-4 font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Risk Level
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Primary Owner
                </th>
                <th className="text-center py-3 px-4 font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Team Size
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {functionProgress.map((func: index) => (
                <tr key={index } className="hover: bg-gray-50 dark: hover: bg-gray-700/50">
                  <td className="py-4 px-4">
                    <div className="font-medium text-gray-900 dark:text-white">
                      {func.function }
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {func.completedTasks }/{func.assignedTasks }
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${func.completionRate }%` }}
                      />
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="font-medium text-gray-900 dark:text-white">
                      {func.completionRate }%
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className={`font-bold ${
                      func.averageScore >= 80 ? 'text-green-600 dark: text-green-400'  : func.averageScore >= 60 ? 'text-yellow-600 dark:text-yellow-400' :
                      'text-red-600 dark:text-red-400'}`}>
                      {func.averageScore }%
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(func.riskLevel)}`}>
                      {func.riskLevel }
                    </span>
                  </td>
                  <td className="py-4 px-4 text-gray-900 dark:text-white">
                    {func.primaryOwner }
                  </td>
                  <td className="py-4 px-4 text-center text-gray-900 dark:text-white">
                    {func.teamMembers }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Performance Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Task Completion by Function */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark: border-gray-700 p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark: text-white mb-6">
            Task Completion by NIST Function
          </h3>
          <div className="h-80">
            <BarChart
              data={{
                labels, functionProgress.map(f => f.function:: datasets: [
                  {
                    label, 'Completed Tasks':: data: functionProgress.map(f => f.completedTasks), backgroundColor: 'rgba(34: 197, 94:: 0.8)', borderColor: 'rgba(34: 197, 94:, 1)', borderWidth: 2
                  },
                  {
                    label: 'Remaining Tasks', data: functionProgress.map(f => f.assignedTasks - f.completedTasks), backgroundColor: 'rgba(107: 114, 128:: 0.8)', borderColor: 'rgba(107: 114, 128:, 1)', borderWidth: 2
                  }
                ]
              }}
              height={320}
              title="Task Progress by NIST CSF v2.0 Function"
            />
          </div>
        </div>

        {/* Weekly Task Completion */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark: border-gray-700 p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark: text-white mb-6">
            Weekly Task Completion Trend
          </h3>
          <div className="h-80">
            <BarChart
              data={{
                labels, trendData.map(d => d.week:: datasets: [{
                  label, 'Tasks Completed':: data: trendData.map(d => d.tasksCompleted), backgroundColor: 'rgba(59: 130, 246:: 0.8)', borderColor: 'rgba(59: 130, 246:, 1)', borderWidth: 2
                }]
              }}
              height={320}
              title="Weekly Task Completion"
              showLegend={false }
            />
          </div>
        </div>
      </div>

      {/* Team Insights */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 mb-8">
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          Team Performance Insights
        </h3>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h4 className="font-semibold text-green-800 dark:text-green-200 mb-3 flex items-center">
              <CheckCircle className="w-5 h-5 mr-2" />
              Strengths & Achievements
            </h4>
            <ul className="space-y-2 text-green-700 dark:text-green-300">
              <li>• High collaboration score indicates effective team coordination</li>
              <li>• Strong performance in Govern and Identify functions</li>
              <li>• Consistent productivity improvement over the last month</li>
              <li>• Effective task completion rate of 62% overall</li>
              <li>• Good distribution of expertise across NIST functions</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-orange-800 dark:text-orange-200 mb-3 flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2" />
              Areas for Improvement
            </h4>
            <ul className="space-y-2 text-orange-700 dark:text-orange-300">
              <li>• Recover function implementation needs urgent attention</li>
              <li>• {teamMetrics.overdueTasks } tasks are overdue and require immediate focus</li>
              <li>• Protect and Detect functions are behind schedule</li>
              <li>• Consider workload rebalancing for overloaded team members</li>
              <li>• Improve task dependency management and planning</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-8 border border-blue-200 dark:border-blue-800">
        <h3 className="text-2xl font-bold text-blue-900 dark:text-blue-100 mb-6">
          Performance Improvement Recommendations
        </h3>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-blue-200 dark:border-blue-700">
            <div className="flex items-center space-x-3 mb-4">
              <Target className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <h4 className="font-semibold text-gray-900 dark:text-white">
                Immediate Actions
              </h4>
            </div>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li>• Assign additional resources to Recover function</li>
              <li>• Address {teamMetrics.overdueTasks } overdue tasks this week</li>
              <li>• Conduct workload review for overloaded members</li>
            </ul>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-blue-200 dark:border-blue-700">
            <div className="flex items-center space-x-3 mb-4">
              <Calendar className="w-6 h-6 text-green-600 dark:text-green-400" />
              <h4 className="font-semibold text-gray-900 dark:text-white">
                Short-term Goals
              </h4>
            </div>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li>• Increase overall completion rate to 75%</li>
              <li>• Improve Protect function score to 80%</li>
              <li>• Establish cross-functional collaboration sessions</li>
            </ul>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-blue-200 dark:border-blue-700">
            <div className="flex items-center space-x-3 mb-4">
              <Award className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              <h4 className="font-semibold text-gray-900 dark:text-white">
                Long-term Strategy
              </h4>
            </div>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li>• Develop specialized teams for each NIST function</li>
              <li>• Implement automated task tracking and reporting</li>
              <li>• Establish continuous improvement processes</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};