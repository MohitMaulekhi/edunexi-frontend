import type { StructuredCertificateData } from "@/types/shared";

// This function calculates the authenticity score based on a weighted rubric.
export function calculateAuthenticityScore(data: StructuredCertificateData, isVerifiedByFaculty: boolean): number {
  let score = 0;

  // Faculty verification is the most significant factor, providing a strong base.
  if (isVerifiedByFaculty) score += 5;

  // The reputation of the issuer adds significant weight.
  if (data.issuerReputation === 'Trusted') score += 2.5;
  else if (data.issuerReputation === 'Known') score += 1.5;

  // Each verifiable element found on the certificate adds credibility.
  // The score is capped to prevent an excess of minor elements from dominating.
  score += Math.min(2, (data.verifiableElements || []).length * 0.5); 
  
  // The professional appearance of the document is a final quality check.
  if (data.documentConsistency === 'High') score += 1;
  else if (data.documentConsistency === 'Medium') score += 0.5;

  // The final score is capped at a maximum of 10.
  return Math.min(score, 10);
}

// This function calculates the achievement score using a more complex, context-aware model.
export function calculateAchievementScore(data: StructuredCertificateData): number {
  // Rule 1: Handle achievements with a direct numerical score (like competitive exams).
  if (data.numericalScore && data.maxScore) {
    // A high score in a high-impact event is worth more.
    const impactMultiplier = data.impactLevel === 'National' ? 1.2 : 1.0;
    const calculatedScore = (data.numericalScore / data.maxScore) * 10 * impactMultiplier;
    return Math.min(calculatedScore, 10);
  }

  // Rule 2: Use a weighted, multiplicative model for other types of achievements.
  let score = 0;

  // Start with base points depending on the nature of the activity.
  const typePoints = { 'Internship': 3, 'Competition': 4, 'Publication': 3, 'MOOC': 2, 'Workshop': 1, 'Volunteer': 1, 'Other': 0.5 };
  score += typePoints[data.activityType as keyof typeof typePoints] || 0.5;

  // Apply powerful multipliers for the event's impact and the student's outcome.
  // This is where a "Winner" at a "National" event gets its high value.
  const impactMultiplier = { 'International': 2.0, 'National': 1.8, 'State': 1.3, 'University': 1.0 };
  const outcomeMultiplier = { 'Winner': 2.0, 'Top Finalist': 1.5, 'Participant': 0.8, 'Completed': 1.0 };
  
  score *= (impactMultiplier[data.impactLevel as keyof typeof impactMultiplier] || 1.0);
  score *= (outcomeMultiplier[data.outcome as keyof typeof outcomeMultiplier] || 1.0);

  // Add final bonus points for the prestige of the issuing organization and the effort involved.
  const prestigePoints = { 'High': 1.5, 'Medium': 0.5, 'Low': 0 };
  score += prestigePoints[data.issuerPrestige as keyof typeof prestigePoints] || 0;

  const effortBonus = Math.min(1.5, (data.effortHours || 0) / 160); // Max 1.5 bonus for 160+ hours
  score += effortBonus;

  // The final score is capped at a maximum of 10.
  return Math.min(score, 10);
}
