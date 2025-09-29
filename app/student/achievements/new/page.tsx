"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Upload,
  Save,
  ArrowLeft,
  Trophy,
  ShieldCheck,
  Award,
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { saveAchievement } from "@/lib/achievement";
import type { EvaluationResult, AchievementMetadata, StructuredCertificateData } from "@/types/shared";
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, Tooltip, Legend } from 'recharts';
import { motion, AnimatePresence } from "framer-motion";

// A dedicated, professionally designed analytics component
const AnalyticsDisplay = ({ evaluation }: { evaluation: EvaluationResult }) => {
  const { structuredData, summary, achievementScore, authenticityScore } = evaluation;

  const impactPoints: Record<StructuredCertificateData['impactLevel'], number> = {
    'International': 4, 'National': 3, 'State': 2, 'University': 1
  };
  const outcomePoints: Record<StructuredCertificateData['outcome'], number> = {
    'Winner': 3, 'Top Finalist': 2, 'Participant': 0.5, 'Completed': 1
  };
  const prestigePoints: Record<StructuredCertificateData['issuerPrestige'], number> = {
    'High': 2, 'Medium': 1, 'Low': 0
  };

  const chartData = [
    { name: 'Impact', value: impactPoints[structuredData.impactLevel] || 1 },
    { name: 'Outcome', value: outcomePoints[structuredData.outcome] || 1 },
    { name: 'Prestige', value: prestigePoints[structuredData.issuerPrestige] || 0 },
    { name: 'Effort (hrs)', value: Math.min(1.5, (structuredData.effortHours || 0) / 100) },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-black/30 backdrop-blur-lg border border-blue-500/20 rounded-2xl p-6 space-y-6 shadow-lg shadow-blue-500/10"
    >
      <div className="text-center">
        <h3 className="font-bold text-xl text-white">AI Evaluation Analysis</h3>
        <p className="text-sm text-gray-400 mt-2 italic">"{summary}"</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
        {/* Scores */}
        <div className="md:col-span-2 space-y-4">
          <div className="text-center bg-black/40 p-4 rounded-xl border border-gray-700">
            <p className="text-4xl font-bold text-green-400">{achievementScore.toFixed(1)}</p>
            <p className="text-xs text-gray-400 flex items-center justify-center mt-1"><Trophy className="h-4 w-4 mr-2"/> Achievement Score</p>
          </div>
           <div className="text-center bg-black/40 p-4 rounded-xl border border-gray-700">
            <p className="text-4xl font-bold text-yellow-400">{authenticityScore.toFixed(1)}</p>
            <p className="text-xs text-gray-400 flex items-center justify-center mt-1"><ShieldCheck className="h-4 w-4 mr-2"/> Authenticity Score</p>
          </div>
        </div>
        {/* Chart */}
        <div className="md:col-span-3 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
              <PolarGrid stroke="#4A5568" />
              <PolarAngleAxis dataKey="name" tick={{ fill: '#A0AEC0', fontSize: 12 }} />
              <Radar name="Score Breakdown" dataKey="value" stroke="#38B2AC" fill="#38B2AC" fillOpacity={0.7} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1A202C',
                  border: '1px solid #4A5568',
                  borderRadius: '0.5rem',
                }}
              />
              <Legend wrapperStyle={{ fontSize: '0.8rem' }}/>
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
};


export default function NewAchievementPage() {
  const { user, token } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({ title: "", description: "", category: "", date: "" });
  const [certificateFile, setCertificateFile] = useState<File | null>(null);
  const [evaluation, setEvaluation] = useState<EvaluationResult | null>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isVerifiedByFaculty, setIsVerifiedByFaculty] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    const file = e.target.files?.[0];
    if (!file) return;

    setCertificateFile(file);
    setIsEvaluating(true);
    setEvaluation(null);

    const uploadFormData = new FormData();
    uploadFormData.append("certificateFile", file);
    uploadFormData.append("isVerifiedByFaculty", String(isVerifiedByFaculty));

    try {
      const res = await fetch("/api/evaluate", { method: "POST", body: uploadFormData });

      if (!res.ok) {
        const result = await res.json();
        throw new Error(result.error || `${res.status} ${res.statusText}`);
      }
      const result = await res.json();
      setEvaluation(result as EvaluationResult);
    } catch (err: any) {
      setError(`Evaluation failed: ${err?.message ?? String(err)}`);
      setCertificateFile(null);
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!evaluation || !certificateFile || !user) {
      setError("Please upload a certificate and wait for the AI evaluation before submitting.");
      return;
    }

    setLoading(true);

    const achievementMetadata: AchievementMetadata = {
      title: formData.title,
      description: formData.description,
      category: formData.category,
      date: formData.date,
      studentId: user.id?.toString() || "unknown",
      aiEvaluation: evaluation,
    };

    try {
      const ok = await saveAchievement(
        token || "",
        achievementMetadata,
        [certificateFile]
      );
      if (!ok) throw new Error("The server failed to save your achievement. Please try again.");
      setSuccess("Achievement submitted successfully! It will be reviewed by the faculty shortly.");
      setTimeout(() => router.push("/student/achievements"), 2000);
    } catch (err: any) {
      setError(err?.message ?? "Failed to submit achievement. Please contact support if the issue persists.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#000000] font-poppins text-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="relative max-w-3xl mx-auto bg-black/50 backdrop-blur-lg border border-blue-500/20 p-8 rounded-3xl shadow-2xl shadow-blue-500/10">
          {/* Neon Glow Effect */}
          <div className="absolute top-0 right-0 -z-10 h-1/2 w-1/2 bg-gradient-to-l from-blue-600/20 to-purple-600/10 rounded-full blur-[120px]" />
          
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/student/achievements"
              className="inline-flex items-center text-sm text-gray-400 hover:text-white transition-colors duration-200"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Achievements
            </Link>
            <div className="flex items-center space-x-4 mt-4">
               <Award className="h-8 w-8 text-primary flex-shrink-0" />
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-200 to-blue-400 bg-clip-text text-transparent">
                  Submit a New Achievement
                </h1>
                <p className="text-gray-400 mt-1">
                  Upload your certificate for an instant AI-powered evaluation.
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-8"
          >
            <div className="space-y-2">
              <Label htmlFor="title">Achievement Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData((f) => ({ ...f, title: e.target.value }))
                }
                placeholder="e.g., Winner of Smart India Hackathon 2025"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(v) =>
                    setFormData((f) => ({ ...f, category: v }))
                  }
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Competition">Competition</SelectItem>
                    <SelectItem value="Certification">Certification</SelectItem>
                    <SelectItem value="Internship">Internship</SelectItem>
                    <SelectItem value="Research">Research Publication</SelectItem>
                    <SelectItem value="Volunteer">Volunteer</SelectItem>
                    <SelectItem value="Workshop">Workshop</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Date of Achievement</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData((f) => ({ ...f, date: e.target.value }))
                  }
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Brief Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData((f) => ({ ...f, description: e.target.value }))
                }
                placeholder="Describe your role, the context, and the impact of your achievement."
                required
              />
            </div>

            <div className="space-y-4 pt-4 border-t border-gray-800">
              <Label htmlFor="attachments">Verification Document</Label>
              <div className="border-2 border-dashed border-blue-500/30 rounded-lg p-6 text-center">
                <input
                  id="attachments"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    document.getElementById("attachments")?.click()
                  }
                  disabled={isEvaluating}
                  className="w-full sm:w-auto"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  {certificateFile ? certificateFile.name : "Upload Certificate"}
                </Button>
                <p className="text-xs text-gray-500 mt-2">PDF, PNG, or JPG accepted</p>
              </div>
               <div className="flex items-center gap-3 pt-2">
                <input
                  id="verified"
                  type="checkbox"
                  checked={isVerifiedByFaculty}
                  onChange={(e) => setIsVerifiedByFaculty(e.target.checked)}
                />
                <label htmlFor="verified" className="text-sm text-gray-400">
                  This achievement has been pre-verified by a faculty member.
                </label>
              </div>
            </div>
            
            <AnimatePresence>
              {isEvaluating && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-4"
                >
                  <div className="animate-spin h-6 w-6 border-2 border-blue-400 border-t-transparent rounded-full mx-auto mb-3"></div>
                  {/* ✅ FIXED: The text is now more professional and self-explanatory */}
                  <p className="text-blue-400 text-sm">Analyzing Document. This process may take a moment.</p>
                </motion.div>
              )}

              {evaluation && (
                <AnalyticsDisplay evaluation={evaluation} />
              )}
            </AnimatePresence>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {success && (
              <Alert>
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}

            <div className="flex justify-end pt-4">
              <Button
                type="submit"
                disabled={loading || isEvaluating || !evaluation}
                className="bg-gradient-to-r from-blue-600 to-purple-500"
              >
                <Save className="h-4 w-4 mr-2" />
                {loading ? "Submitting..." : "Submit for Faculty Review"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

