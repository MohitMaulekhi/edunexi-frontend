// This is the structure of the data returned by the AI
export interface StructuredCertificateData {
  // Achievement Metrics
  activityType: 'Competition' | 'Internship' | 'MOOC' | 'Publication' | 'Workshop' | 'Volunteer' | 'Other';
  impactLevel: 'International' | 'National' | 'State' | 'University';
  outcome: 'Winner' | 'Top Finalist' | 'Participant' | 'Completed';
  effortHours: number;
  issuerPrestige: 'High' | 'Medium' | 'Low';
  numericalScore?: number;
  maxScore?: number;

  // Authenticity Metrics
  verifiableElements: ('QR Code' | 'Unique ID' | 'Official Domain' | 'Digital Signature')[];
  issuerReputation: 'Trusted' | 'Known' | 'Unknown';
  documentConsistency: 'High' | 'Medium' | 'Low';
}

// The response from our API, now including a textual summary
export interface EvaluationResult {
  achievementScore: number;
  authenticityScore: number;
  summary: string;
  structuredData: StructuredCertificateData;
}

// The final data object for submission
export interface AchievementMetadata {
  title: string;
  description: string;
  category: string;
  date: string;
  studentId: string;
  aiEvaluation: EvaluationResult;
}

// The result from our developer-implemented NLP model
export interface AiAnalysisResult {
  suggestedSkills: string[];
  organization?: string | null;
  role?: string | null;
  durationText?: string | null;
}
