import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { WordTokenizer, PorterStemmer } from 'natural';
import type { AiAnalysisResult } from "@/types/shared";

// Our custom NLP "model": A dictionary mapping skills to relevant keywords.
const skillDictionary: { [key: string]: string[] } = {
  // Technical Skills - Data & Machine Learning
  "Data Analysis": ["data", "analysis", "analyze", "analyzed", "metrics", "report", "insights", "analytics", "dashboard", "bi"],
  "Machine Learning": ["ml", "machine", "learning", "ai", "artificial", "intelligence"],
  "Natural Language Processing (NLP)": ["nlp", "text", "sentiment", "classify", "classification", "topic", "modeling", "ner"],
  "Computer Vision (CV)": ["image", "images", "vision", "detect", "detection", "recognition", "video", "ocr"],
  "Predictive Modeling": ["predict", "prediction", "forecast", "forecasting", "model", "regression"],
  "Data Visualization": ["visualize", "visualization", "tableau", "powerbi", "charts", "graphs", "d3"],
  "Python": ["python", "pandas", "numpy", "scikit-learn", "tensorflow", "pytorch", "matplotlib", "seaborn"],

  // Technical Skills - Software, Web & Cloud
  "Web Development": ["website", "web", "app", "develop", "frontend", "backend", "react", "next.js", "api"],
  "Mobile Development": ["mobile", "android", "ios", "flutter", "react native", "swift"],
  "Cloud Computing": ["aws", "azure", "gcp", "cloud", "serverless", "docker", "kubernetes"],
  "Databases": ["sql", "mysql", "postgresql", "mongodb", "database", "query"],
  "Version Control (Git)": ["git", "github", "gitlab", "version", "control", "commit"],

  // Technical Skills - Design & Creative
  "UI/UX Design": ["ui", "ux", "design", "wireframe", "prototype", "user", "experience", "interface"],
  "Graphic Design": ["graphic", "figma", "canva", "photoshop", "illustrator", "visual", "brand"],
  "Video Editing & Production": ["video", "editing", "premiere", "final cut", "after effects", "motion", "animation", "production"],
  "3D Modeling": ["3d", "blender", "autocad", "maya", "modeling", "rendering", "cgi"],

  // Professional Soft Skills (Action-Oriented)
  "Leadership": ["led", "lead", "leadership", "headed", "spearheaded", "directed", "oversaw", "managed a team"],
  "Project Management": ["manage", "managed", "organized", "organize", "coordinate", "plan", "planning", "agile", "scrum"],
  "Strategic Planning": ["strategy", "strategic", "planning", "roadmap", "initiative"],
  "Collaboration": ["collaborated", "team", "worked with", "partnered", "cross-functional"],
  "Public Speaking": ["spoke", "presented", "presentation", "hosted", "speech", "talk"],
  "Technical Writing": ["wrote", "write", "document", "documentation", "report", "technical"],
  "Research & Analysis": ["research", "researched", "analyzed", "investigated", "study"],
  "Problem Solving": ["problem", "solution", "solved", "debugged", "troubleshoot", "optimized", "enhanced"],
  "Community Engagement": ["community", "engage", "outreach", "volunteer", "volunteering", "social", "service"],
  "Event Management": ["event", "hosted", "organized", "managed event", "conference", "workshop"],
  "Fundraising": ["fundraising", "donations", "raised", "sponsor", "sponsorship", "grant"],
  "Mentoring & Teaching": ["taught", "teach", "mentored", "trained", "guided", "instructed"],
  "Client Relations": ["client", "stakeholder", "customer", "partner", "relationship"],
  "Content Creation": ["content", "created", "wrote", "blog", "social media", "posts"],
};

// Pre-process the dictionary by stemming all keywords for flexible matching.
const stemmedSkillDictionary: { [key: string]: string[] } = {};
for (const skill in skillDictionary) {
  const keywords = skillDictionary[skill];
  stemmedSkillDictionary[skill] = keywords.map(keyword => PorterStemmer.stem(keyword));
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const description = formData.get('description') as string | null;
    const file = formData.get('file') as File | null;
    const organization = formData.get('organization') as string | null;
    const role = formData.get('role') as string | null;
    const startDate = formData.get('startDate') as string | null;
    const endDate = formData.get('endDate') as string | null;

    if (!description && !file) {
      return NextResponse.json({ error: 'A description or a file is required.' }, { status: 400 });
    }

    // --- STEP 1: Feature Engineering & Context Building ---
    let combinedText = description || '';
    if (organization) combinedText += ` at ${organization}`;
    if (role) combinedText += ` as a ${role}`;

    let durationText: string | null = null;
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays > 0) {
          if (diffDays > 30) {
              const diffMonths = Math.round(diffDays / 30);
              durationText = `${diffMonths} month${diffMonths > 1 ? 's' : ''}`;
          } else {
              durationText = `${diffDays} day${diffDays > 1 ? 's' : ''}`;
          }
      }
    }
    if (durationText) combinedText += ` for a duration of ${durationText}`;
    
    // --- STEP 2: Computer Vision with Gemini API for OCR ---
    if (file) {
      console.log("Starting CV task: OCR with Gemini API...");
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) throw new Error("GEMINI_API_KEY is not set.");

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

      const fileBuffer = Buffer.from(await file.arrayBuffer());
      const filePart = {
        inlineData: { data: fileBuffer.toString("base64"), mimeType: file.type },
      };

      const prompt = "Perform OCR on this document and return only the raw, extracted text. Do not add any commentary, formatting, or markdown.";
      
      const result = await model.generateContent([prompt, filePart]);
      const extractedText = result.response.text();
      combinedText += ` ${extractedText}`;
      console.log("OCR task complete. Extracted text:", extractedText);
    }
    // --- End of CV Step ---

    // --- STEP 3: Developer-Implemented NLP for Skill Tagging ---
    console.log("Starting NLP task: Skill Tagging...");
    const tokenizer = new WordTokenizer();
    const tokens = tokenizer.tokenize(combinedText.toLowerCase());
    const stemmedTokens = tokens.map(token => PorterStemmer.stem(token));
    
    const identifiedSkills = new Set<string>();

    for (const skill in stemmedSkillDictionary) {
      const stemmedKeywords = stemmedSkillDictionary[skill];
      for (const keyword of stemmedKeywords) {
        if (stemmedTokens.includes(keyword)) {
          identifiedSkills.add(skill);
          break; 
        }
      }
    }
    console.log("NLP task complete. Skills found:", identifiedSkills);
    // --- End of NLP Step ---

    const analysis: AiAnalysisResult = {
      suggestedSkills: Array.from(identifiedSkills),
      organization,
      role,
      durationText,
    };

    return NextResponse.json(analysis, { status: 200 });

  } catch (error: any) {
    console.error("ML Pipeline Error:", error);
    return NextResponse.json({ error: error.message || "Failed to perform ML analysis." }, { status: 500 });
  }
}
