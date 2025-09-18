"use client";

import React from "react";

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
  return (
    <div className="min-h-screen py-12 bg-gradient-to-tr from-gray-950 via-black to-gray-900 text-white font-sans">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <header className="mb-8 text-center">
          <h1 className="text-5xl font-extrabold text-white drop-shadow-lg">
            Pending Approvals
          </h1>
          <p className="mt-2 text-gray-300">
            Review and approve or reject student-submitted achievements.
          </p>
        </header>

        {/* Approval Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {approvals.map((a) => (
            <div
              key={a.id}
              className="rounded-2xl overflow-hidden bg-white/10 backdrop-blur-lg border border-white/10 p-6 
                hover:scale-105 transform transition-all duration-300 shadow-2xl hover:shadow-blue-900/40 cursor-pointer"
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
                <button className="ml-auto inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold 
                  bg-gradient-to-r from-blue-900 to-blue-800 text-white shadow-lg 
                  hover:from-blue-800 hover:to-blue-700 transition-all duration-300"
                >
                  Approve
                </button>
                <button className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold 
                  bg-gradient-to-r from-red-900 to-red-800 text-white shadow-lg 
                  hover:from-red-800 hover:to-red-700 transition-all duration-300"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
