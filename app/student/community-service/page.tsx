"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Save,
  ArrowLeft,
  Heart,
  Lightbulb,
  Tags,
  File as FileIcon,
  Building,
  User,
  Clock,
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import type { AiAnalysisResult } from "@/types/shared";

// A new, more detailed component to display the full impact analysis.
const ImpactAnalysisDisplay = ({ analysis }: { analysis: AiAnalysisResult }) => {
  // A color palette and function to assign unique colors to each skill tag.
  const colors = [
    { bg: "bg-blue-500/10", border: "border-blue-500/30", text: "text-blue-300" },
    { bg: "bg-green-500/10", border: "border-green-500/30", text: "text-green-300" },
    { bg: "bg-yellow-500/10", border: "border-yellow-500/30", text: "text-yellow-300" },
    { bg: "bg-indigo-500/10", border: "border-indigo-500/30", text: "text-indigo-300" },
    { bg: "bg-teal-500/10", border: "border-teal-500/30", text: "text-teal-300" },
    { bg: "bg-red-500/10", border: "border-red-500/30", text: "text-red-300" },
  ];

  const getSkillColor = (skill: string) => {
    // A simple hash function to get a consistent color based on the skill name
    let hash = 0;
    for (let i = 0; i < skill.length; i++) {
      hash = skill.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash % colors.length);
    return colors[index];
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-black/30 backdrop-blur-lg border border-purple-500/20 rounded-2xl p-6 space-y-6 shadow-lg shadow-purple-500/10"
    >
      <div className="text-center">
        <h3 className="font-bold text-xl text-white flex items-center justify-center">
          <Lightbulb className="h-5 w-5 mr-3 text-purple-400" />
          Impact & Skill Analysis
        </h3>
        <p className="text-sm text-gray-400 mt-2">
          Based on your input, here is a summary of your contribution for your portfolio.
        </p>
      </div>

      {/* Key Details Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center border-b border-gray-800 pb-4">
        <div>
          <Building className="h-5 w-5 mx-auto text-gray-500 mb-1" />
          <p className="text-xs text-gray-400">Organization</p>
          <p className="font-semibold text-white">{analysis.organization || 'N/A'}</p>
        </div>
        <div>
          <User className="h-5 w-5 mx-auto text-gray-500 mb-1" />
          <p className="text-xs text-gray-400">Role</p>
          <p className="font-semibold text-white">{analysis.role || 'N/A'}</p>
        </div>
        <div>
          <Clock className="h-5 w-5 mx-auto text-gray-500 mb-1" />
          <p className="text-xs text-gray-400">Duration</p>
          <p className="font-semibold text-white">{analysis.durationText || 'N/A'}</p>
        </div>
      </div>

      {/* Identified Skills Section */}
      <div>
        <h4 className="font-semibold text-center text-gray-300 mb-3">Identified Skills</h4>
        <div className="flex flex-wrap gap-2 justify-center">
          {(analysis.suggestedSkills || []).length > 0 ? (
            analysis.suggestedSkills.map(skill => {
              const color = getSkillColor(skill);
              return (
                <div key={skill} className={`${color.bg} ${color.border} ${color.text} text-xs px-3 py-1.5 rounded-full flex items-center`}>
                  <Tags className="h-3 w-3 mr-1.5" />
                  {skill}
                </div>
              );
            })
          ) : (
            <p className="text-sm text-gray-500">No specific skills were identified. Try adding more detail to your description.</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default function NewCommunityServicePage() {
  const { user } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({
    organization: "",
    role: "",
    startDate: "",
    endDate: "",
    description: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<AiAnalysisResult | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleNlpAnalysis = async () => {
    if (!formData.description && !file) {
      setError("Please provide a description or upload a document to analyze.");
      return;
    }
    setIsAnalyzing(true);
    setAnalysis(null);
    setError("");

    try {
      const analysisFormData = new FormData();
      if (formData.description) analysisFormData.append('description', formData.description);
      if (formData.organization) analysisFormData.append('organization', formData.organization);
      if (formData.role) analysisFormData.append('role', formData.role);
      if (formData.startDate) analysisFormData.append('startDate', formData.startDate);
      if (formData.endDate) analysisFormData.append('endDate', formData.endDate);
      if (file) {
        analysisFormData.append('file', file);
      }
      
      const response = await fetch('/api/analyze-service', {
        method: 'POST',
        body: analysisFormData,
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Failed to perform ML analysis.");
      }

      setAnalysis(result as AiAnalysisResult);
    } catch (err: any) {
      setError(err.message ?? "An error occurred during analysis.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting form data:", { formData, analysis });
    setSuccess("Community service successfully logged!");
    setTimeout(() => router.push("/student/dashboard"), 2000);
  };

  return (
    <div className="min-h-screen bg-[#000000] font-poppins text-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/student/dashboard"
              className="inline-flex items-center text-sm text-gray-400 hover:text-white transition-colors duration-200"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Link>
            <div className="flex items-center space-x-4 mt-4">
               <Heart className="h-8 w-8 text-primary flex-shrink-0" />
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-200 to-purple-400 bg-clip-text text-transparent">
                  Log Community Service
                </h1>
                <p className="text-gray-400 mt-1">
                  Document your volunteer work and identify the skills you've gained.
                </p>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-8 bg-black/50 backdrop-blur-lg border border-purple-500/20 p-8 rounded-2xl shadow-2xl shadow-purple-500/10"
          >
            {/* Form Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="organization">Organization Name</Label>
                <Input id="organization" placeholder="e.g., Data for Good Foundation" onChange={e => setFormData(f => ({...f, organization: e.target.value}))} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Your Role</Label>
                <Input id="role" placeholder="e.g., Data Analyst Volunteer" onChange={e => setFormData(f => ({...f, role: e.target.value}))} />
              </div>
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input id="startDate" type="date" onChange={e => setFormData(f => ({...f, startDate: e.target.value}))} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input id="endDate" type="date" onChange={e => setFormData(f => ({...f, endDate: e.target.value}))} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description of Activities</Label>
              <Textarea id="description" placeholder="Describe your project, tools used, and contributions..." className="min-h-[120px]" onChange={e => setFormData(f => ({...f, description: e.target.value}))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="file">Supporting Document (Optional)</Label>
               <div className="border-2 border-dashed border-purple-500/30 rounded-lg p-6 text-center">
                  <input id="file" type="file" className="hidden" onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)} />
                  <Button type="button" variant="outline" onClick={() => document.getElementById("file")?.click()}>
                    <FileIcon className="h-4 w-4 mr-2" />
                    {file ? file.name : "Upload a file"}
                  </Button>
               </div>
            </div>

            {/* Analysis Section */}
            <div className="pt-4 border-t border-gray-800 space-y-6">
               <div className="flex flex-col items-center">
                 <Button type="button" variant="outline" onClick={handleNlpAnalysis} disabled={isAnalyzing || (!formData.description && !file)}>
                    <Lightbulb className="h-4 w-4 mr-2" />
                    {isAnalyzing ? "Identifying Skills..." : "Identify Skills with ML"}
                  </Button>
                  <p className="text-xs text-gray-500 mt-2">Use CV and NLP to extract key skills from your input.</p>
               </div>

                <AnimatePresence>
                  {analysis && <ImpactAnalysisDisplay analysis={analysis} />}
                </AnimatePresence>
            </div>

            {/* Error/Success */}
            {error && <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>}
            {success && <Alert><AlertDescription>{success}</AlertDescription></Alert>}

            {/* Submission */}
            <div className="flex justify-end pt-4">
              <Button type="submit" className="bg-gradient-to-r from-blue-600 to-purple-500">
                <Save className="h-4 w-4 mr-2" />
                Save Service Record
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

