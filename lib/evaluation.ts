import { GoogleGenerativeAI } from "@google/generative-ai";
import type { EvaluationResult } from "@/types/shared";

interface EvaluationParams {
  fileBuffer: Buffer;
  mimetype: string;
  isVerifiedByFaculty: boolean;
  apiKey: string;
}

export async function evaluateCertificateFile({ fileBuffer, mimetype, isVerifiedByFaculty, apiKey }: EvaluationParams): Promise<EvaluationResult> {
  if (!fileBuffer || !apiKey) {
    throw new Error("File buffer and Gemini API key are required.");
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

  const filePart = {
    inlineData: { data: fileBuffer.toString("base64"), mimeType: mimetype },
  };

  const prompt = `
    **CRITICAL INSTRUCTION: You are an expert academic evaluator. Your task is to perform a new, independent evaluation by following three steps precisely.**

    **STEP 1: EXTRACT METRICS**
    First, analyze the provided certificate file and extract the following metrics into a structured JSON object. Use your knowledge to infer significance (e.g., SIH is a 'National' 'Competition').
    - **activityType:** 'Competition', 'Internship', 'MOOC', 'Publication', 'Workshop', 'Volunteer', 'Other'.
    - **impactLevel:** 'International', 'National', 'State', 'University'.
    - **outcome:** 'Winner', 'Top Finalist' (e.g., top 5% percentile), 'Participant', 'Completed'.
    - **effortHours:** (Number) Estimate total hours.
    - **issuerPrestige:** 'High', 'Medium', 'Low'.
    - **issuerReputation:** 'Trusted', 'Known', 'Unknown'.
    - **verifiableElements:** (Array of strings) Find any: 'QR Code', 'Unique ID', 'Official Domain', 'Digital Signature'. If none, provide an empty array [].
    - **documentConsistency:** 'High', 'Medium', 'Low'.
    - **numericalScore / maxScore:** (Optional Numbers) Extract if a score/percentile is present (e.g., 99.5 percentile becomes numericalScore: 99.5, maxScore: 100).

    **STEP 2: CALCULATE SCORES**
    Next, you MUST use the metrics you extracted in Step 1 to calculate two scores based on the following strict rubric. Show your work in your reasoning.

    **Authenticity Score Rubric (out of 10):**
    - Start with a base score of 0.
    - If 'isVerifiedByFaculty' is true, add 5 points.
    - If 'issuerReputation' is 'Trusted', add 2.5 points. If 'Known', add 1.5 points.
    - For each item in 'verifiableElements', add 0.5 points (max 2 points total).
    - If 'documentConsistency' is 'High', add 1 point. If 'Medium', add 0.5 points.
    - The final score is the sum, capped at 10.

    **Achievement Score Rubric (out of 10):**
    - **Case A (Numerical Score Exists):** If 'numericalScore' and 'maxScore' were found (e.g., for an exam), the score is (numericalScore / maxScore) * 10. If the 'impactLevel' is 'National' or 'International', add a bonus of 2 points.
    - **Case B (No Numerical Score):**
        - Start with base points for 'activityType': {'Internship': 3, 'Competition': 4, 'Publication': 3, 'MOOC': 2, 'Workshop': 1, 'Volunteer': 1, 'Other': 0.5}.
        - Multiply this base by an 'impactMultiplier': {'International': 2.0, 'National': 1.8, 'State': 1.3, 'University': 1.0}.
        - Multiply the result by an 'outcomeMultiplier': {'Winner': 2.0, 'Top Finalist': 1.5, 'Participant': 0.8, 'Completed': 1.0}.
        - Add bonus points for 'issuerPrestige': {'High': 1.5, 'Medium': 0.5, 'Low': 0}.
        - Add an 'effortBonus' of (effortHours / 160), capped at 1.5 points.
    - The final score is the calculated value, capped at 10.

    **STEP 3: FORMAT FINAL RESPONSE**
    Finally, produce a single JSON object with the following schema. The scores in this object MUST match your calculations from Step 2.
    {
      "achievementScore": <number>,
      "authenticityScore": <number>,
      "summary": "<string: A one-sentence summary of the evaluation>",
      "structuredData": { <object: The complete set of metrics you extracted in Step 1> }
    }

    **FINAL SANITY CHECK (Before responding):**
    - Review your generated JSON. Does the structured data logically align with the significance of the event? For example, if you identify a document as a major national award, the 'impactLevel' must be 'National' and the 'issuerPrestige' must be 'High'. You MUST correct any internal inconsistencies before responding.

    Respond ONLY with this valid JSON object.
  `;

  // Pass the isVerifiedByFaculty context into the prompt
  const fullPrompt = `${prompt}\n\n**CONTEXT FOR THIS EVALUATION:**\n- isVerifiedByFaculty: ${isVerifiedByFaculty}`;

  const result = await model.generateContent([fullPrompt, filePart]);
  let text = result.response.text().replace(/```json|```/g, "").trim();
  
  const aiResponse = JSON.parse(text);

  // The AI now returns the complete, final EvaluationResult object directly.
  return aiResponse as EvaluationResult;
}

