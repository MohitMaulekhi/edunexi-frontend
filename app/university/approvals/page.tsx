"use client";

import React, { useState } from "react";
import { LoadingButton } from "@/components/ui/loading-button";
import { InteractiveFeedback } from "@/components/ui/interactive-feedback";
import { AnimatedCard } from "@/components/ui/animated-card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const approvals = [
  {
    id: 1,
    title: "AI Research Internship",
    description:
      "Completed a summer internship focused on AI research in biotechnology.",
    student: "Aarav Sharma",
    dateSubmitted: "2025-09-10",
    category: "internship",
  },
  {
    id: 2,
    title: "Certified Cloud Practitioner",
    description: "AWS Certified Cloud Practitioner certification achieved.",
    student: "Meera Patel",
    dateSubmitted: "2025-09-12",
    category: "certification",
  },
  {
    id: 3,
    title: "Robotics Club Project",
    description:
      "Led a robotics project that participated in a national-level competition.",
    student: "Rohan Verma",
    dateSubmitted: "2025-09-14",
    category: "project",
  },
  {
    id: 4,
    title: "Community Volunteering",
    description:
      "Volunteered for a local NGO to teach coding to school children.",
    student: "Sneha Gupta",
    dateSubmitted: "2025-09-15",
    category: "extracurricular",
  },
  {
    id: 5,
    title: "Data Science Bootcamp",
    description: "Completed a 6-week data science bootcamp covering Python and ML.",
    student: "Aditya Singh",
    dateSubmitted: "2025-09-16",
    category: "certification",
  },
  {
    id: 6,
    title: "Hackathon Winner",
    description: "Won 2nd place in a college-level hackathon for an AI-based app.",
    student: "Kavya Mehra",
    dateSubmitted: "2025-09-17",
    category: "project",
  },
  {
    id: 7,
    title: "Internship at PharmaTech",
    description: "Worked on drug discovery pipelines during a summer internship.",
    student: "Vikram Chauhan",
    dateSubmitted: "2025-09-18",
    category: "internship",
  },
  {
    id: 8,
    title: "Machine Learning Certification",
    description: "Completed a machine learning certification from Coursera.",
    student: "Priya Nair",
    dateSubmitted: "2025-09-19",
    category: "certification",
  },
  {
    id: 9,
    title: "Campus App Development",
    description: "Developed a mobile app for students to track campus events.",
    student: "Rahul Desai",
    dateSubmitted: "2025-09-20",
    category: "project",
  },
  {
    id: 10,
    title: "Music Club Performance",
    description: "Performed in the annual college fest as part of the music club.",
    student: "Ananya Rao",
    dateSubmitted: "2025-09-21",
    category: "extracurricular",
  },
  {
    id: 11,
    title: "Summer Research Paper",
    description: "Published a research paper on renewable energy applications.",
    student: "Ishan Kapoor",
    dateSubmitted: "2025-09-22",
    category: "project",
  },
  {
    id: 12,
    title: "Volunteer Coding Workshop",
    description:
      "Organized a weekend workshop teaching Python basics to high schoolers.",
    student: "Sanya Verma",
    dateSubmitted: "2025-09-23",
    category: "extracurricular",
  },
];

export default function ApprovalsPage() {
  const [loadingStates, setLoadingStates] = useState<{ [key: number]: 'approve' | 'reject' | null }>({});

  const handleApproval = async (id: number, action: 'approve' | 'reject') => {
    setLoadingStates(prev => ({ ...prev, [id]: action }));

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    setLoadingStates(prev => ({ ...prev, [id]: null }));
    // Here you would typically update the approvals list or show success message
  };

  return (
    <div className="min-h-screen bg-[#000000] font-poppins">
      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Page Header - Integrated into content */}
        <div className="mb-8">
          <Link href="/university" className="inline-flex items-center text-sm text-gray-400 hover:text-blue-400 mb-4 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#E5E5E5] to-[#60A5FA] bg-clip-text text-transparent mb-4">
              Pending Approvals
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Review and approve or reject student-submitted achievements
            </p>
          </div>
        </div>

        {/* Approval Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {approvals.map((a, index) => (
            <AnimatedCard
              key={a.id}
              hoverEffect="lift"
              animationDelay={index * 100}
              className="rounded-2xl overflow-hidden bg-black/70 backdrop-blur-md border border-gray-700 p-6 shadow-xl"
            >
              {/* Title & Student */}
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-white tracking-tight">
                    {a.title}
                  </h2>
                  <p className="text-sm text-gray-200 mt-1 tracking-wide">
                    {a.student}
                  </p>
                </div>
                <time className="text-xs text-gray-400">{a.dateSubmitted}</time>
              </div>

              {/* Description */}
              <p className="mt-4 text-gray-300 text-sm">{a.description}</p>

              {/* Category */}
              <p className="mt-2 text-xs text-blue-400 uppercase font-medium">
                {a.category}
              </p>

              {/* Approve / Reject Buttons */}
              <div className="mt-4 flex items-center gap-3">
                <LoadingButton
                  className="ml-auto inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold 
                    bg-gradient-to-r from-blue-900 to-blue-800 text-white shadow-lg 
                    hover:from-blue-800 hover:to-blue-700 transition-all duration-300"
                  loading={loadingStates[a.id] === 'approve'}
                  loadingText="Approving..."
                  onClick={() => handleApproval(a.id, 'approve')}
                >
                  Approve
                </LoadingButton>
                <LoadingButton
                  className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold 
                    bg-gradient-to-r from-red-900 to-red-800 text-white shadow-lg 
                    hover:from-red-800 hover:to-red-700 transition-all duration-300"
                  loading={loadingStates[a.id] === 'reject'}
                  loadingText="Rejecting..."
                  onClick={() => handleApproval(a.id, 'reject')}
                >
                  Reject
                </LoadingButton>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </div>
  );
}
