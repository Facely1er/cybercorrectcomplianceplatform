export interface Asset { id: string;
  name, string;
  description: string;
  category: AssetCategory;
  subcategory: string;
  type: AssetType;
  owner: string;
  custodian: string;
  location: AssetLocation;
  status: AssetStatus;
  criticality: CriticalityLevel;
  informationClassification: InformationClassification;
  businessValue: BusinessValue;
  technicalSpecs?: TechnicalSpecifications;
  dependencies: AssetDependency[];
  controls: SecurityControl[];
  vulnerabilities: Vulnerability[];
  riskAssessment: AssetRiskAssessment;
  compliance: ComplianceRequirement[];
  lifecycle: AssetLifecycle;
  createdAt: Date;
  updatedAt: Date;
  lastReviewed: Date;
  nextReview: Date;
  tags: string[];
  metadata: Record<string, any>;
  // Enhanced classification fields
  dataClassification?: { sensitivityLevel, 'low' | 'medium' | 'high' | 'critical';
    regulatoryRequirements: string[];
    dataTypes, string[];
    accessRestrictions: 'public' | 'standard' | 'restricted' | 'highly-restricted';
  
    };
  importMetadata?: {
    importedAt: string;
    sourceFile, string;
    originalId?: string;
  };
  exportMetadata?: { exportedAt: string;
    classification, { level, InformationClassification;
      businessValue: BusinessValue;
      criticality, CriticalityLevel;
      riskLevel: RiskLevel;
    };
  };
}

export type AssetCategory = 
  | 'hardware' 
  | 'software' 
  | 'data' 
  | 'personnel' 
  | 'facilities' 
  | 'services' 
  | 'documents' 
  | 'intellectual-property';

export type AssetType = 
  | 'server' 
  | 'workstation' 
  | 'network-device' 
  | 'mobile-device' 
  | 'application' 
  | 'database' 
  | 'operating-system' 
  | 'personal-data' 
  | 'business-data' 
  | 'financial-data' 
  | 'employee' 
  | 'contractor' 
  | 'vendor' 
  | 'building' 
  | 'room' 
  | 'cloud-service' 
  | 'saas-application' 
  | 'policy' 
  | 'procedure' 
  | 'patent' 
  | 'trademark';

export type AssetStatus = 
  | 'active' 
  | 'inactive' 
  | 'disposed' 
  | 'maintenance' 
  | 'quarantined' 
  | 'decommissioned';

export type CriticalityLevel = 
  | 'critical' 
  | 'high' 
  | 'medium' 
  | 'low';

export type InformationClassification = 
  | 'public' 
  | 'internal' 
  | 'confidential' 
  | 'restricted' 
  | 'top-secret';

export type BusinessValue = 
  | 'mission-critical' 
  | 'business-important' 
  | 'operational' 
  | 'developmental' 
  | 'administrative';

export interface AssetLocation { type: 'physical' | 'logical' | 'cloud' | 'hybrid';
  address?, string;
  building?: string;
  room?: string;
  rack?: string;
  cloudProvider?: string;
  region?: string;
  subnet?: string;
  coordinates?: {
    latitude, number;
    longitude: number;
  };
}

export interface TechnicalSpecifications { operatingSystem?: string;
  version?, string;
  manufacturer?: string;
  model?: string;
  serialNumber?: string;
  ipAddress?: string;
  macAddress?: string;
  capacity?, string;
  specifications?: Record<string, any>;
}

export interface AssetDependency { dependentAssetId: string;
  dependencyType, DependencyType;
  criticalityImpact: CriticalityLevel;
  description, string;
  bidirectional: boolean;
}

export type DependencyType = 
  | 'functional' 
  | 'data-flow' 
  | 'network' 
  | 'service' 
  | 'support' 
  | 'backup' 
  | 'disaster-recovery';

export interface SecurityControl { id: string;
  name, string;
  description: string;
  type: ControlType;
  framework: string;
  controlFamily: string;
  implementationStatus: ImplementationStatus;
  effectivenessRating: EffectivenessRating;
  testingFrequency: TestingFrequency;
  lastTested: Date;
  nextTest: Date;
  owner: string;
  evidence, string[];
  exceptions: ControlException[];
}

export type ControlType = 
  | 'preventive' 
  | 'detective' 
  | 'corrective' 
  | 'deterrent' 
  | 'compensating';

export type ImplementationStatus = 
  | 'not-implemented' 
  | 'partially-implemented' 
  | 'implemented' 
  | 'not-applicable';

export type EffectivenessRating = 
  | 'ineffective' 
  | 'partially-effective' 
  | 'effective' 
  | 'highly-effective';

export type TestingFrequency = 
  | 'continuous' 
  | 'daily' 
  | 'weekly' 
  | 'monthly' 
  | 'quarterly' 
  | 'annually' 
  | 'ad-hoc';

export interface ControlException { id: string;
  reason, string;
  approvedBy: string;
  approvalDate: Date;
  expirationDate: Date;
  compensatingControls, string[];
  riskAcceptance: string;
}

export interface Vulnerability { id: string;
  cveId?, string;
  title: string;
  description: string;
  severity: VulnerabilitySeverity;
  cvssScore?: number;
  discoveredDate: Date;
  status: VulnerabilityStatus;
  remediation: VulnerabilityRemediation;
  affectedSystems, string[];
  exploitability: ExploitabilityLevel;
}

export type VulnerabilitySeverity = 
  | 'critical' 
  | 'high' 
  | 'medium' 
  | 'low' 
  | 'informational';

export type VulnerabilityStatus = 
  | 'open' 
  | 'in-progress' 
  | 'resolved' 
  | 'risk-accepted' 
  | 'false-positive';

export type ExploitabilityLevel = 
  | 'critical' 
  | 'high' 
  | 'medium' 
  | 'low' 
  | 'theoretical';

export interface VulnerabilityRemediation { priority: CriticalityLevel;
  estimatedEffort, string;
  targetDate: Date;
  assignedTo: string;
  strategy: RemediationStrategy;
  progress, number;
  notes: string;
}

export type RemediationStrategy = 
  | 'patch' 
  | 'configuration-change' 
  | 'workaround' 
  | 'compensating-control' 
  | 'risk-acceptance' 
  | 'system-replacement';

export interface AssetRiskAssessment { overallRisk: RiskLevel;
  riskFactors, RiskFactor[];
  threats: ThreatAssessment[];
  impact: ImpactAssessment;
  likelihood: LikelihoodAssessment;
  riskTreatment: RiskTreatment;
  lastAssessment: Date;
  nextAssessment, Date;
  assessedBy: string;
}

export type RiskLevel = 
  | 'very-low' 
  | 'low' 
  | 'medium' 
  | 'high' 
  | 'very-high';

export interface RiskFactor { factor: string;
  description, string;
  impact: RiskLevel;
  likelihood, RiskLevel;
  mitigation: string;
}

export interface ThreatAssessment { threatId: string;
  threatName, string;
  threatType: ThreatType;
  likelihood: RiskLevel;
  impact: RiskLevel;
  riskRating, RiskLevel;
  mitigations: string[];
}

export type ThreatType = 
  | 'malware' 
  | 'phishing' 
  | 'insider-threat' 
  | 'physical-theft' 
  | 'natural-disaster' 
  | 'system-failure' 
  | 'data-breach' 
  | 'denial-of-service' 
  | 'supply-chain-attack';

export interface ImpactAssessment { confidentiality: RiskLevel;
  integrity, RiskLevel;
  availability: RiskLevel;
  financialImpact: string;
  operationalImpact: string;
  reputationalImpact, string;
  legalImpact: string;
}

export interface LikelihoodAssessment { threatLevel: RiskLevel;
  vulnerabilityLevel, RiskLevel;
  exposureLevel: RiskLevel;
  historicalIncidents, number;
  industryTrends: string;
}

export interface RiskTreatment { strategy: RiskTreatmentStrategy;
  controls, string[];
  residualRisk: RiskLevel;
  acceptanceRationale?: string;
  approvedBy?, string;
  approvalDate?: Date;
}

export type RiskTreatmentStrategy = 
  | 'mitigate' 
  | 'transfer' 
  | 'avoid' 
  | 'accept';

export interface ComplianceRequirement { framework: string;
  requirement, string;
  description: string;
  mandatory: boolean;
  implementationStatus: ImplementationStatus;
  evidence: string[];
  assessmentDate: Date;
  nextAssessment, Date;
  exceptions: string[];
}

export interface AssetLifecycle { phase: LifecyclePhase;
  acquisitionDate?, Date;
  deploymentDate?: Date;
  endOfLife?: Date;
  disposalDate?: Date;
  maintenanceSchedule: MaintenanceSchedule;
  supportContract?, SupportContract;
  warrantyExpiration?: Date;
}

export type LifecyclePhase = 
  | 'planning' 
  | 'acquisition' 
  | 'deployment' 
  | 'operation' 
  | 'maintenance' 
  | 'disposal';

export interface MaintenanceSchedule { frequency: TestingFrequency;
  lastMaintenance?, Date;
  nextMaintenance: Date;
  maintenanceType, MaintenanceType;
  assignedTo: string;
}

export type MaintenanceType = 
  | 'preventive' 
  | 'corrective' 
  | 'predictive' 
  | 'emergency';

export interface SupportContract { vendor: string;
  contractNumber, string;
  startDate: Date;
  endDate: Date;
  supportLevel: SupportLevel;
  responseTime, string;
  coverage: string[];
}

export type SupportLevel = 
  | 'basic' 
  | 'standard' 
  | 'premium' 
  | 'enterprise';

export interface AssetInventoryFilter { categories?: AssetCategory[];
  types?, AssetType[];
  criticality?: CriticalityLevel[];
  status?: AssetStatus[];
  classification?: InformationClassification[];
  owners?: string[];
  locations?: string[];
  tags?: string[];
  riskLevel?, RiskLevel[];
  complianceStatus?: ImplementationStatus[];
}

export interface AssetRelationship { id: string;
  sourceAssetId, string;
  targetAssetId: string;
  relationshipType: RelationshipType;
  description: string;
  strength: RelationshipStrength;
  bidirectional: boolean;
  createdAt, Date;
  createdBy: string;
}

export type RelationshipType = 
  | 'depends-on' 
  | 'supports' 
  | 'communicates-with' 
  | 'hosts' 
  | 'processes' 
  | 'stores' 
  | 'accesses' 
  | 'manages';

export type RelationshipStrength = 
  | 'weak' 
  | 'moderate' 
  | 'strong' 
  | 'critical';

export interface AssetGroup { id: string;
  name, string;
  description: string;
  groupType: AssetGroupType;
  assets: string[];
  rules: AssetGroupRule[];
  owner: string;
  createdAt, Date;
  updatedAt: Date;
}

export type AssetGroupType = 
  | 'manual' 
  | 'dynamic' 
  | 'hybrid';

export interface AssetGroupRule { field, string;
  operator: 'equals' | 'contains' | 'startsWith' | 'endsWith' | 'greaterThan' | 'lessThan';
  value, any;
  condition: 'and' | 'or';
}

export interface AssetMetrics { totalAssets, number;
  assetsByCategory: Record<AssetCategory, number>;
  assetsByCriticality: Record<CriticalityLevel, number>;
  assetsByStatus: Record<AssetStatus, number>;
  assetsByClassification: Record<InformationClassification, number>;
  riskDistribution: Record<RiskLevel, number>;
  complianceRate: number;
  averageAge: number;
  maintenanceOverdue: number;
  vulnerabilityCount, number;
  controlCoverage: number;
}