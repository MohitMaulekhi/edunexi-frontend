export interface StructuredCertificateData {
  issuerTier: 1 | 2 | 3;
  verificationStatus: 0 | 1 | 2;
  activityType: 'Competition' | 'Internship' | 'MOOC' | 'Publication' | 'Workshop' | 'Volunteer';
  activityScale: 'international' | 'national' | 'state' | 'local';
  activityOutcome: 'winner' | 'participant' | 'completed';
  durationHours: number;
  numericalScore?: number; // e.g., 90
  maxScore?: number;       // e.g., 100
  prestigeScore?: number;  // A score from 1-10 if no numerical score is found
}

export interface EvaluationResult {
  authenticityScore: number;
  achievementScore: number;
  structuredData: StructuredCertificateData; // This field is crucial
}

export interface AchievementMetadata {
  title: string;
  description: string;
  category: string;
  date: string;
  studentId: string;
  aiEvaluation: EvaluationResult; // Embed the full AI scores and data
}
