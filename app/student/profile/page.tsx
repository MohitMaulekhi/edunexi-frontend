import React from 'react'
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail, User, Calendar, Edit, Award, BookOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const dummyProfile = {
  name: 'Aarav Sharma',
  email: 'aarav.sharma@student.edu',
  roll: '2025CS101',
  branch: 'Computer Science',
  year: '3rd Year',
  semester: 'Semester 5',
  cgpa: '3.82',
  avatar: '/placeholder-user.jpg',
  bio: 'Passionate about AI, open source, and building impactful tech solutions. Loves hackathons and cricket.',
  achievements: 12,
  projects: 8,
  joinDate: 'August 2023'
}

const page = () => {
  return (
    <div className="min-h-screen bg-[#000000] font-poppins">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/student" className="inline-flex items-center text-sm text-gray-400 hover:text-blue-400 mb-4 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#E5E5E5] to-[#60A5FA] bg-clip-text text-transparent mb-4">
              My Profile
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Manage your personal information and academic details
            </p>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-black/70 backdrop-blur-md border border-gray-700 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <div className="text-center">
                <div className="relative w-32 h-32 mx-auto mb-6">
                  <Image 
                    src={dummyProfile.avatar} 
                    alt="Profile Avatar" 
                    fill
                    className="rounded-full border-4 border-blue-500/30 object-cover"
                  />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">{dummyProfile.name}</h2>
                <p className="text-gray-400 mb-1">{dummyProfile.email}</p>
                <p className="text-blue-400 font-medium">{dummyProfile.roll}</p>
                
                <div className="mt-6 pt-6 border-t border-gray-700">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-blue-400">{dummyProfile.achievements}</div>
                      <div className="text-xs text-gray-400">Achievements</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-400">{dummyProfile.projects}</div>
                      <div className="text-xs text-gray-400">Projects</div>
                    </div>
                  </div>
                </div>

                <Button className="w-full mt-6 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 hover:from-blue-700 hover:via-indigo-600 hover:to-purple-600">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
            </div>
          </div>

          {/* Details Cards */}
          <div className="lg:col-span-2 space-y-8">
            {/* Academic Information */}
            <div className="bg-black/70 backdrop-blur-md border border-gray-700 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                <Image 
                  src="/logo.svg" 
                  alt="EduNexi Logo" 
                  width={24} 
                  height={24} 
                  className="mr-3"
                />
                Academic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-400">Department</label>
                    <p className="text-white font-medium">{dummyProfile.branch}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Current Year</label>
                    <p className="text-white font-medium">{dummyProfile.year}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">CGPA</label>
                    <p className="text-green-400 font-bold text-lg">{dummyProfile.cgpa}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-400">Current Semester</label>
                    <p className="text-white font-medium">{dummyProfile.semester}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Enrollment Date</label>
                    <p className="text-white font-medium">{dummyProfile.joinDate}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bio Section */}
            <div className="bg-black/70 backdrop-blur-md border border-gray-700 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                <User className="h-6 w-6 mr-3 text-purple-500" />
                About Me
              </h3>
              <p className="text-gray-300 leading-relaxed">{dummyProfile.bio}</p>
            </div>

            {/* Quick Actions */}
            <div className="bg-black/70 backdrop-blur-md border border-gray-700 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <h3 className="text-xl font-bold text-white mb-6">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/student/achievements">
                  <Button variant="outline" className="w-full justify-start">
                    <Award className="w-4 h-4 mr-2" />
                    View Achievements
                  </Button>
                </Link>
                <Link href="/student/portfolio">
                  <Button variant="outline" className="w-full justify-start">
                    <BookOpen className="w-4 h-4 mr-2" />
                    View Portfolio
                  </Button>
                </Link>
                <Button variant="outline" className="w-full justify-start">
                  <Mail className="w-4 h-4 mr-2" />
                  Contact Support
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="w-4 h-4 mr-2" />
                  Academic Calendar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
