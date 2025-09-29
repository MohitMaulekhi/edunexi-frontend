"use client"

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Award, Upload, Save, X, File, ArrowLeft, Sparkles, ShieldCheck, Calendar } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { saveAchievement } from "@/lib/achievement";
import type { EvaluationResult, AchievementMetadata } from "@/types/certificate";

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

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setCertificateFile(file);
    setIsEvaluating(true);
    setEvaluation(null);
    setError("");

    const uploadFormData = new FormData();
    uploadFormData.append('certificateFile', file);
    uploadFormData.append('isVerifiedByFaculty', 'false'); // You can add a checkbox for this

    try {
      const response = await fetch('/api/evaluate', { method: 'POST', body: uploadFormData });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Failed to evaluate file.");
      setEvaluation(result as EvaluationResult);
    } catch (err: any) {
      setError(err.message);
      setCertificateFile(null);
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!evaluation || !certificateFile || !user) {
      setError("Please upload and evaluate a certificate before submitting.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    const achievementMetadata: AchievementMetadata = {
      title: formData.title,
      description: formData.description,
      category: formData.category,
      date: formData.date,
      studentId: user.id?.toString() || 'unknown',
      aiEvaluation: evaluation,
    };

    try {
      const success = await saveAchievement(token || "", achievementMetadata, [certificateFile]);
      if (success) {
        setSuccess("Achievement submitted successfully! It will now be reviewed.");
        setTimeout(() => router.push('/student/dashboard'), 2000); // Or another relevant page
      } else {
        throw new Error("Failed to save achievement data to the backend.");
      }
    } catch (err: any) {
      setError(err.message || "Failed to submit achievement.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="container mx-auto max-w-3xl">
        <Link href="/student/dashboard" className="inline-flex items-center text-sm text-gray-400 hover:text-white mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Link>
        <h1 className="text-4xl font-bold mb-8">Add New Achievement</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6 bg-gray-800 p-8 rounded-lg">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Achievement Title *</Label>
            <Input id="title" value={formData.title} onChange={(e) => setFormData(f => ({...f, title: e.target.value}))} required placeholder="e.g., Best Paper Award" />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData(f => ({...f, category: value}))} required>
              <SelectTrigger><SelectValue placeholder="Select a category" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="competition">Competition</SelectItem>
                <SelectItem value="certification">Certification</SelectItem>
                <SelectItem value="internship">Internship</SelectItem>
                {/* Add other categories */}
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea id="description" value={formData.description} onChange={(e) => setFormData(f => ({...f, description: e.target.value}))} required placeholder="Describe your achievement..." />
          </div>

          {/* Date */}
          <div className="space-y-2">
            <Label htmlFor="date">Achievement Date *</Label>
            <Input id="date" type="date" value={formData.date} onChange={(e) => setFormData(f => ({...f, date: e.target.value}))} required />
          </div>

          {/* File Upload Section */}
          <div className="space-y-2">
            <Label htmlFor="attachments">Supporting Document *</Label>
            <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center">
              <Input id="attachments" type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={handleFileUpload} className="hidden" disabled={isEvaluating} />
              <Button type="button" variant="outline" onClick={() => document.getElementById("attachments")?.click()} disabled={isEvaluating}>
                <Upload className="h-4 w-4 mr-2" />
                {certificateFile ? certificateFile.name : "Choose File"}
              </Button>
            </div>
          </div>
          
          {isEvaluating && <p className="text-blue-400 text-center">🧠 Evaluating with AI, please wait...</p>}
          
          {/* AI Evaluation Result */}
          {evaluation && (
            <div className="bg-gray-700 border border-green-500/30 rounded-lg p-4 space-y-3">
                <p className="font-bold text-lg text-green-400">✅ AI Evaluation Complete</p>
                <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="text-center">
                        <p className="text-2xl font-bold">{evaluation.achievementScore.toFixed(1)} <span className="text-base font-normal">/ 10</span></p>
                        <p className="text-xs text-gray-400 flex items-center justify-center"><Sparkles className="h-3 w-3 mr-1"/> Achievement Score</p>
                    </div>
                    <div className="text-center">
                        <p className="text-2xl font-bold">{evaluation.authenticityScore.toFixed(1)} <span className="text-base font-normal">/ 10</span></p>
                        <p className="text-xs text-gray-400 flex items-center justify-center"><ShieldCheck className="h-3 w-3 mr-1"/> Authenticity Score</p>
                    </div>
                </div>
            </div>
          )}

          {error && <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>}
          {success && <Alert><AlertDescription>{success}</AlertDescription></Alert>}
          
          <div className="flex justify-end pt-4">
            <Button type="submit" disabled={loading || isEvaluating || !evaluation}>
              <Save className="h-4 w-4 mr-2" />
              {loading ? "Submitting..." : "Submit for Review"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
