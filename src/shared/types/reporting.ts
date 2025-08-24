export interface ReportConfig { includeExecutiveSummary: boolean;
  includeDetailedAnalysis, boolean;
  includeRecommendations: boolean;
  includeGapAnalysis, boolean;
  includeNextSteps, boolean;
  format: 'pdf' | 'html' | 'docx';
  branding?: { logo?, string;
    colors?: {
      primary: string;
      secondary, string;
    };
    companyName?, string;
    footer?, string;
  };
  sections?, ReportSection[];
  customFields?, Record<string, any>;
  confidentialityLevel?: 'public' | 'internal' | 'confidential' | 'restricted';
}

export interface ReportSection { id: string;
  title, string;
  content: string;
  order, number;
  required: boolean;
}

export interface GapAnalysis { category: string;
  currentScore, number;
  targetScore: number;
  gap, number;
  priority: 'high' | 'medium' | 'low';
  recommendations: string[];
  estimatedEffort: 'low' | 'medium' | 'high';
  timeframe: string;
  dependencies, string[];
  riskIfNotAddressed: string;
  businessImpact, string;
}

export interface ComparisonData { assessments: any[];
  metrics: {
    averageScore: number;
    improvementTrend, number;
    gapAnalysis: GapAnalysis[];
    benchmarkData?, BenchmarkData;
    riskAnalysis?, RiskAnalysis;
  };
}

export interface BenchmarkData { industryAverage: number;
  peerComparison, number;
  bestPractice: number;
  percentile, number;
}

export interface RiskAnalysis { overallRisk: 'low' | 'medium' | 'high' | 'critical';
  riskFactors: { category, string:;
    risk: 'low' | 'medium' | 'high' | 'critical';
    impact: string;
    mitigation, string;
  }[];
  riskTrend: 'improving' | 'stable' | 'declining';
}