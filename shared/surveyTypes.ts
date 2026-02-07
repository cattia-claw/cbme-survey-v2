/**
 * Type definitions for the CBME survey form
 */

export interface SurveyFormData {
  // Basic Information
  campus: string;
  profession: string;
  respondentName: string;
  title: string;
  department: string;
  email: string;
  
  // EPA Design & Implementation
  epaDesignCompletion: number;
  epaCount: string;
  epaEntrustmentLevel: number;
  epaMilestoneDescription: number;
  epaTeacherUnderstanding: number;
  epaVerificationProcess: number;
  epaRevisionCycle: string;
  epaChallenges?: string;
  epaSupport?: string[];
  epaSupportOther?: string;
  
  // Assessment Tools
  toolMinicex: number;
  toolDops: number;
  toolMsf: number;
  toolObservationFrequency: string;
  toolBurden: number;
  toolCalibration: string;
  toolFeedbackQuality: number;
  toolFeedbackTiming: string;
  toolOtherTools?: string;
  toolChallenges?: string;
  
  // CCC Operations
  cccEstablishment: string;
  cccMemberCount: string;
  cccFrequency: string;
  cccClarity: number;
  cccPrescription: string;
  cccCaseRecordStandard: string;
  cccRemediationTracking: string;
  cccChallenges?: string;
  cccChallengesOther?: string;
  
  // e-Portfolio Systems
  eportImplementation: string;
  eportType?: string[];
  eportTypeOther?: string;
  eportFunctionality: number;
  eportSatisfaction: number;
  eportAnalyticsUsage: number;
  eportMobile: string;
  eportSuggestions?: string;
  
  // Faculty Training
  trainingCompletion: string;
  trainingTopics?: string[];
  trainingMethods?: string[];
  trainingMethodsOther?: string;
  trainingEngagement: number;
  trainingSeedTeacher: string;
  trainingSupportMechanism?: string[];
  trainingSupportMechanismOther?: string;
  trainingNeeds?: string;
  
  // Learner Engagement
  learnerUnderstanding: number;
  learnerEngagement: number;
  learnerSatisfaction: number;
  learnerEffectiveness: number;
  learnerFeedbackSeekingFrequency: number;
  learnerSelfAssessmentHabit: number;
  learnerFeedback?: string;
  learnerOtherFeedback?: string;
  
  // Overall Assessment
  overallProgress: number;
  challengeRanking?: string[];
  challengeOtherText?: string;
  successStories?: string;
  suggestions?: string;
}

export type SurveyPage = 
  | 'welcome'
  | 'basic-info'
  | 'epa'
  | 'tools'
  | 'ccc'
  | 'eport'
  | 'training'
  | 'learner'
  | 'overall';

export const SURVEY_PAGES: SurveyPage[] = [
  'welcome',
  'basic-info',
  'epa',
  'tools',
  'ccc',
  'eport',
  'training',
  'learner',
  'overall',
];

export const PAGE_TITLES: Record<SurveyPage, string> = {
  welcome: '歡迎與說明',
  'basic-info': '基本資訊',
  epa: 'EPA 設計與實施',
  tools: '評量工具使用',
  ccc: 'CCC 運作',
  eport: 'e-Portfolio 系統',
  training: '師資培訓',
  learner: '學員參與與反應',
  overall: '整體評估與需求',
};
