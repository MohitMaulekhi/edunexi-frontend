import { GoogleGenerativeAI } from "@google/generative-ai";
import { calculateAuthenticityScore, calculateAchievementScore } from "./scoring";
import type { StructuredCertificateData, EvaluationResult } from "@/types/certificate";

interface EvaluationParams {
  fileBuffer: Buffer;
  mimetype: string;
  isVerifiedByFaculty: boolean;
  apiKey: string;
}

export async function evaluateCertificateFile({ fileBuffer, mimetype, isVerifiedByFaculty, apiKey }: EvaluationParams): Promise<EvaluationResult> {
  if (!fileBuffer || !apiKey) { throw new Error("File buffer and Gemini API key are required."); }
  
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });

  const filePart = {
    inlineData: { data: fileBuffer.toString("base64"), mimeType: mimetype },
  };

  // NEW: The detailed prompt that matches your scoring logic
  const prompt = `
    You are an expert academic evaluator. Analyze the provided certificate file and extract its information into a structured JSON object.

    Your primary goal for the achievement score is to find a numerical score.
    1.  Scan for a score (e.g., "90/100", "Grade: 8.5/10", "Score: 95%"). If found, populate 'numericalScore' and 'maxScore'.
    2.  If NO numerical score is found, you MUST evaluate the prestige of the event/issuer and generate a 'prestigeScore' from 1-10. A national hackathon win is a 9 or 10. A webinar participation is a 2 or 3. Do not include 'numericalScore' or 'maxScore' in this case.

    Also, populate the other fields as before: "issuerTier", "verificationStatus", "activityType", "activityScale", "activityOutcome".

    Respond ONLY with the valid JSON object.
  `;
  
  const result = await model.generateContent([prompt, filePart]);
  const text = result.response.text();
  const partialData = JSON.parse(text) as Partial<StructuredCertificateData>;

  // This structure now includes the new optional fields
  const structuredData: StructuredCertificateData = {
    issuerTier: partialData.issuerTier ?? 3,
    verificationStatus: partialData.verificationStatus ?? 0,
    activityType: partialData.activityType ?? 'Workshop',
    activityScale: partialData.activityScale ?? 'local',
    activityOutcome: partialData.activityOutcome ?? 'completed',
    durationHours: partialData.durationHours ?? 40,
    numericalScore: partialData.numericalScore,
    maxScore: partialData.maxScore,
    prestigeScore: partialData.prestigeScore,
  };
  
  const authenticityScore = calculateAuthenticityScore(structuredData);
  const achievementScore = calculateAchievementScore(structuredData);
  
  // Now the returned object correctly matches the EvaluationResult type
  return { authenticityScore, achievementScore, structuredData };
}
