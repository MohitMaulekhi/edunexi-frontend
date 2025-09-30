"use client";

import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/ui/navbar";
import BubbleBackground from "@/components/ui/BubbleBg";
import { Linkedin } from "lucide-react";

const team = [
  {
    name: "Lakshay Rawat",
    role: "Founder & CEO",
    bio: "Edunexi leader bridging education & industry. Data team Head at NSUT Placement Cell.",
    image:
      "https://media.licdn.com/dms/image/v2/D5603AQEL7sHSasZYKQ/profile-displayphoto-shrink_200_200/B56ZXdtWvmGsAg-/0/1743181411686?e=1761782400&v=beta&t=Vji5DIlMFBEp4egIobWsxrPwSZzL8zceyfQ_ek_vbio",
    socials: { linkedin: "https://www.linkedin.com/in/lakshay-r-1b8166287/" },
  },
  {
    name: "Mohit Maulekhi",
    role: "CTO & Lead Architect",
    bio: "Full-stack developer specializing in secure, scalable platforms for educational institutions. GSOC’25 contributor.",
    image:
      "https://media.licdn.com/dms/image/v2/D5603AQFBoaH8nOMHNQ/profile-displayphoto-scale_200_200/B56ZhpdTkXHcAY-/0/1754115947364?e=1761782400&v=beta&t=bHmkMLDiEbZFNJNGll1NzL3nvIqq9ogOwvyTMYpCmrc",
    socials: { linkedin: "https://www.linkedin.com/in/mohitmaulekhi/" },
  },
    {
    name: "Daivik Awasthi",
    role: "Head of Machine Learning",
    bio: "AI innovator advancing Edunexi’s analytics and personalization to maximize value for students and institutions.",
    image:
      "https://media.licdn.com/dms/image/v2/D5603AQGK0pP8LYdpsg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1727942237903?e=1761782400&v=beta&t=K96YxXa0LdTpuDTKDfcIENp9D46UYPAcELoBrf7spJY",
    socials: { linkedin: "https://www.linkedin.com/in/daivik-awasthi/" },
  },
  {
    name: "Tushar Saini",
    role: "Lead Backend Developer",
    bio: "Backend engineer architecting reliable, scalable infrastructure for Edunexi and connecting institutions worldwide.",
    image:
      "https://media.licdn.com/dms/image/v2/D4D03AQE3Qhg12B84pQ/profile-displayphoto-scale_200_200/B4DZmXBojkGwAY-/0/1759175414383?e=1761782400&v=beta&t=SvGaCTHbj49hjZuBTpXykks7eqTewQ-4-sFwN-HOvpA",
    socials: { linkedin: "https://www.linkedin.com/in/tushar-saini-9943b9288/" },
  },
    {
    name: "Navya Dudpuri",
    role: "Head of UI, Marketing & Outreach",
    bio: "Design and outreach leader creating intuitive user experiences while driving marketing and community engagement.",
    image:
      "https://media.licdn.com/dms/image/v2/D4D03AQHZRP8AP9jeDA/profile-displayphoto-scale_200_200/B4DZiUveGTG8Ak-/0/1754842131360?e=1761782400&v=beta&t=FvG39yBd9-aMSyXM6yyev3SByH4lJGlfCmnbV_Y6QfI",
    socials: { linkedin: "https://www.linkedin.com/in/navya-dudpuri-529211323/" },
  },
    {
    name: "Aditi Verma",
    role: "Head of University Relations",
    bio: "Dedicated to strengthening partnerships with universities and streamlining student data management and recognition.",
    image:
      "https://media.licdn.com/dms/image/v2/D5603AQFT-YjcSfVq5A/profile-displayphoto-shrink_200_200/B56ZUSWqXWGUAY-/0/1739769688216?e=1761782400&v=beta&t=tEfy_tYhK6M7O3XCNd8Z13abbhFZ56YNvfG4GxrHxfc",
    socials: { linkedin: "https://www.linkedin.com/in/aditi-verma-7b04a228b/" },
  },
];

const stats = [
  { value: "25+", label: "Universities Partnered" },
  { value: "10,000+", label: "Students Empowered" },
  { value: "50,000+", label: "Verified Achievements" },
  { value: "99.9%", label: "Platform Uptime" },
];

const AboutPage = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const headingWords = ["Edunexi", "शिक्षा संगम"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex(
        (prevIndex) => (prevIndex + 1) % headingWords.length
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen w-full bg-black text-white relative overflow-hidden">
      <Navbar />
      <BubbleBackground />
      <div className="relative z-10 pt-28 pb-16">
        {/* Hero Section */}
        <section className="pt-16 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                About{" "}
                <AnimatePresence mode="wait">
                  <motion.span className="bg-gradient-to-r from-[#E5E5E5] to-[#60A5FA] bg-clip-text text-transparent inline-block">
                    {"Edunexi"}
                  </motion.span>
                </AnimatePresence>
              </h1>
              <p className="text-2xl text-gray-300 max-w-3xl mx-auto">
                We're redefining student success by showcasing every achievement,
                skill, and milestone in one unified, verified platform.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-black/30 p-8 rounded-2xl border border-[#8B5CF6]/20 backdrop-blur-xl"
              >
                <h2 className="text-4xl font-bold text-white mb-6 relative inline-block group pb-2">
                  Our Mission
                  <span className="absolute bottom-0 left-0 w-0 h-1 bg-[#8B5CF6] group-hover:w-full transition-all duration-300"></span>
                </h2>
                <p className="text-xl text-gray-300">
                  To empower students with a comprehensive, verified digital
                  portfolio that moves beyond traditional transcripts. We bridge
                  the gap between academic accomplishments and real-world
                  opportunities.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-black/30 p-8 rounded-2xl border border-[#8B5CF6]/20 backdrop-blur-xl"
              >
                <h2 className="text-4xl font-bold text-white mb-6 relative inline-block group pb-2">
                  Our Vision
                  <span className="absolute bottom-0 left-0 w-0 h-1 bg-[#8B5CF6] group-hover:w-full transition-all duration-300"></span>
                </h2>
                <p className="text-xl text-gray-300">
                  To become the global standard for academic and extracurricular
                  achievement verification, creating a world where every
                  student's full potential is recognized, celebrated, and valued.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 relative overflow-hidden bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.15)_0%,rgba(139,92,246,0)_70%)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-white mb-12 relative inline-block group pb-2">
              Our Impact in Numbers
              <span className="absolute bottom-0 left-0 w-0 h-1 bg-[#8B5CF6] group-hover:w-full transition-all duration-300"></span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-5xl font-bold text-[#8B5CF6] mb-2">
                    {stat.value}
                  </div>
                  <div className="text-xl text-gray-300">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 relative overflow-hidden bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.15)_0%,rgba(139,92,246,0)_70%)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-bold text-white text-center mb-12 relative inline-block group pb-2"
            >
              Our Founding Team
              <span className="absolute bottom-0 left-0 w-0 h-1 bg-[#8B5CF6] group-hover:w-full transition-all duration-300"></span>
            </motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-black/30 p-6 rounded-2xl border border-[#8B5CF6]/20 backdrop-blur-xl text-center flex flex-col items-center"
                >
                  <div className="w-32 h-32 mb-4 rounded-full overflow-hidden border-2 border-[#8B5CF6]/50">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{member.name}</h3>
                  <div className="text-xl font-extrabold mb-4 bg-gradient-to-r from-[#8B5CF6] to-[#60A5FA] bg-clip-text text-transparent">
                    {member.role}
                  </div>
                  <p className="text-lg text-gray-300 mb-4 flex-grow">{member.bio}</p>
                  <div className="flex space-x-4 mt-auto">
                    <Link
                      href={member.socials.linkedin}
                      target="_blank"
                      className="text-gray-400 hover:text-[#8B5CF6] transition-colors"
                    >
                      <Linkedin />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
