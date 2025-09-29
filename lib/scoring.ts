import type { StructuredCertificateData } from "@/types/certificate";

export function calculateAuthenticityScore(data: StructuredCertificateData): number {
  let score = 2;
  if (data.verificationStatus === 2) score += 5;
  else if (data.verificationStatus === 1) score += 1;
  if (data.issuerTier === 1) score += 2;
  else if (data.issuerTier === 2) score += 1;
  return Math.min(score, 10);
}

// This function is now updated with the new rules
export function calculateAchievementScore(data: StructuredCertificateData): number {
  // Rule 1: If a numerical score exists, use it.
  if (data.numericalScore && data.maxScore) {
    const calculatedScore = (data.numericalScore / data.maxScore) * 10;
    return Math.min(calculatedScore, 10); // Ensure it doesn't exceed 10
  }

  // Rule 2: If no numerical score, use the AI's prestige score.
  if (data.prestigeScore) {
    return Math.min(data.prestigeScore, 10);
  }

  // Fallback Rule: If neither exists, use the original category-based logic.
  const basePoints: Record<string, number> = { 'Internship': 6, 'Competition': 5, 'MOOC': 4, 'Publication': 4, 'Workshop': 2, 'Volunteer': 1 };
  let score = basePoints[data.activityType] ?? 1;
  const scaleBonus: Record<string, number> = { international: 3, national: 2, state: 1, local: 0 };
  score += scaleBonus[data.activityScale] ?? 0;
  if (data.activityType === 'Competition' && data.activityOutcome === 'winner') score += 1;
  const durationBonus = Math.floor(data.durationHours / 40) * 0.5;
  score += Math.min(durationBonus, 2);

  return Math.min(score, 10);
}
