import React from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ExternalLink,
  Code,
  Calendar,
  ExternalLinkIcon,
} from "lucide-react";
import Link from "next/link";

const dummyPortfolio = [
  {
    title: "AI Chatbot for Campus Helpdesk",
    description:
      "Developed a chatbot using Python and NLP to automate student queries and support.",
    tech: ["Python", "TensorFlow", "React"],
    link: "https://github.com/example/ai-chatbot",
    year: 2025,
    status: "Completed",
  },
  {
    title: "Personal Portfolio Website",
    description:
      "Designed and built a personal website to showcase projects and achievements.",
    tech: ["Next.js", "Tailwind CSS"],
    link: "https://student-portfolio.com",
    year: 2024,
    status: "Live",
  },
  {
    title: "Smart Attendance System",
    description:
      "Created a facial recognition-based attendance system for classrooms.",
    tech: ["OpenCV", "Flask", "SQLite"],
    link: "",
    year: 2023,
    status: "In Progress",
  },
];

const getTechColor = (tech: string) => {
  const colors: { [key: string]: string } = {
    Python: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    TensorFlow: "bg-orange-500/20 text-orange-400 border-orange-500/30",
    React: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
    "Next.js": "bg-gray-500/20 text-gray-400 border-gray-500/30",
    "Tailwind CSS": "bg-teal-500/20 text-teal-400 border-teal-500/30",
    OpenCV: "bg-green-500/20 text-green-400 border-green-500/30",
    Flask: "bg-red-500/20 text-red-400 border-red-500/30",
    SQLite: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  };
  return colors[tech] || "bg-gray-500/20 text-gray-400 border-gray-500/30";
};

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "completed":
      return "bg-green-500/20 text-green-400 border-green-500/30";
    case "live":
      return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    case "in progress":
      return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    default:
      return "bg-gray-500/20 text-gray-400 border-gray-500/30";
  }
};

const page = () => {
  return (
    <div className="min-h-screen bg-[#000000] font-poppins">
      <div className="mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/student"
            className="inline-flex items-center text-sm text-gray-400 hover:text-blue-400 mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#E5E5E5] to-[#60A5FA] bg-clip-text text-transparent mb-4">
              My Portfolio
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Showcase your projects, skills, and technical achievements
            </p>
          </div>
        </div>

        {/* Portfolio Grid */}
        <div className="grid gap-8">
          {dummyPortfolio.map((item, idx) => (
            <div
              key={idx}
              className="bg-black/70 backdrop-blur-md border border-gray-700 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
            >
              {/* Project Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Code className="h-6 w-6 text-blue-500" />
                    <h2 className="text-2xl font-bold text-white">
                      {item.title}
                    </h2>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {item.year}
                    </div>
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                        item.status
                      )}`}
                    >
                      {item.status}
                    </span>
                  </div>
                </div>
                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <ExternalLink className="h-5 w-5" />
                  </a>
                )}
              </div>

              {/* Project Description */}
              <p className="text-gray-300 leading-relaxed mb-6">
                {item.description}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 mb-6">
                {item.tech.map((tech, i) => (
                  <span
                    key={i}
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getTechColor(
                      tech
                    )}`}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                {item.link && (
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLinkIcon className="w-4 h-4 mr-2" />
                      View Project
                    </a>
                  </Button>
                )}
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 hover:from-blue-700 hover:via-indigo-600 hover:to-purple-600"
                >
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-black/70 backdrop-blur-md border border-gray-700 rounded-3xl p-8 shadow-xl max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Add New Project
            </h3>
            <p className="text-gray-300 mb-6">
              Keep building and showcasing your technical skills with new
              projects.
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 hover:from-blue-700 hover:via-indigo-600 hover:to-purple-600"
            >
              Create Project
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
