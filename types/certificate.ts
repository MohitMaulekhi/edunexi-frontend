// The result from the AI evaluation API
export interface EvaluationResult {
  authenticityScore: number;
  achievementScore: number;
  // structuredData can be included here if you wish to save it
}

// The final data object passed to your saveAchievement function
export interface AchievementMetadata {
  title: string;
  description: string;
  category: string;
  date: string;
  studentId: string;
  aiEvaluation: EvaluationResult; // Embed the AI scores
}
