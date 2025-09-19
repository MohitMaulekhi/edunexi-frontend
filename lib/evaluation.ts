// File: lib/evaluation.ts

import { GoogleGenerativeAI } from "@google/generative-ai";
import { calculateAuthenticityScore, calculateAchievementScore } from "./scoring";
import type { StructuredCertificateData, EvaluationResult } from "@/types/certificate";

// The parameters have changed to accept the file's content directly
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

  // Convert the buffer to base64 for the API call
  const filePart = {
    inlineData: {
      data: fileBuffer.toString("base64"),
      mimeType: mimetype,
    },
  };

  const prompt = `You are an academic evaluator. Analyze the provided certificate file. Convert the information into a structured JSON object with the following keys: "issuerTier", "verificationStatus", "activityType", "activityScale", "activityOutcome". Context: isVerifiedByFaculty is ${isVerifiedByFaculty}. Respond ONLY with the valid JSON object.`;
  
  const result = await model.generateContent([prompt, filePart]);
  const text = result.response.text();
  const partialData = JSON.parse(text) as Partial<StructuredCertificateData>;
  const structuredData: StructuredCertificateData = {
    issuerTier: partialData.issuerTier ?? 3,
    verificationStatus: partialData.verificationStatus ?? 0,
    activityType: partialData.activityType ?? 'Workshop',
    activityScale: partialData.activityScale ?? 'local',
    activityOutcome: partialData.activityOutcome ?? 'completed',
    durationHours: partialData.durationHours ?? 40,
  };
  
  const authenticityScore = calculateAuthenticityScore(structuredData);
  const achievementScore = calculateAchievementScore(structuredData);
  
  return { authenticityScore, achievementScore, structuredData };
}
