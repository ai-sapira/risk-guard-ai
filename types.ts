export enum Role {
  INSURANCE_ADMIN = 'INSURANCE_ADMIN',
  COMPANY_ADMIN = 'COMPANY_ADMIN',
  EMPLOYEE = 'EMPLOYEE'
}

export interface Company {
  id: string;
  name: string;
  sector: string;
  riskScore: number;
  employees: number;
  status: 'Active' | 'Onboarding' | 'Inactive';
  trend: 'up' | 'down' | 'stable';
  logo?: string;
}

export interface Campaign {
  id: string;
  name: string;
  type: 'Phishing' | 'Smishing' | 'Ransomware';
  status: 'Scheduled' | 'Active' | 'Completed';
  targetGroup: string;
  clickRate: number;
  compromiseRate: number;
  date: string;
  isAiGenerated?: boolean;
}

export interface TrainingModule {
  id: string;
  title: string;
  description: string;
  duration: string; // e.g., "5 min"
  completed: boolean;
  type: 'Video' | 'Quiz' | 'Interactive';
}

export interface RiskMetric {
  category: string;
  score: number; // 0-100
  description: string;
}

// Gemini AI Response Types
export interface AiCampaignPlan {
  campaignName: string;
  targetAudience: string;
  emailTemplates: Array<{
    subject: string;
    bodyPreview: string;
    difficultyLevel: string;
  }>;
  schedule: string;
  reasoning: string;
}