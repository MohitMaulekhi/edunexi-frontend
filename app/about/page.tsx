"use client";

import { motion, AnimatePresence } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/ui/navbar';
import BubbleBackground from '@/components/ui/BubbleBg';
import { Github, Linkedin } from 'lucide-react';

const team = [
  {
    name: "Priya Sharma",
    role: "CEO & Founder",
    bio: "An ed-tech visionary with over a decade of experience in bridging the gap between education and industry.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500&q=60",
    socials: { linkedin: "#", github: "#" },
  },
  {
    name: "David Chen",
    role: "CTO & Lead Architect",
    bio: "A full-stack developer specializing in secure, scalable platforms for educational institutions.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=500&q=60",
    socials: { linkedin: "#", github: "#" },
  },
  {
    name: "Maria Garcia",
    role: "Head of University Relations",
    bio: "A former university registrar dedicated to improving student data management and recognition.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=500&q=60",
    socials: { linkedin: "#", github: "#" },
  },
  {
    name: "James Carter",
    role: "Lead UX Designer",
    bio: "Crafting intuitive and accessible experiences that empower users at every step of their journey.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=60",
    socials: { linkedin: "#", github: "#" },
  },
  {
    name: "Emily White",
    role: "Student Success Manager",
    bio: "Passionate about ensuring students and universities get the maximum value from our platform.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=500&q=60",
    socials: { linkedin: "#", github: "#" },
  },
  {
    name: "Ben Wilson",
    role: "Marketing & Outreach",
    bio: "Connecting with institutions worldwide to share the vision and impact of Edunexi.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=60",
    socials: { linkedin: "#", github: "#" },
  }
];

const stats = [
    { value: "25+", label: "Universities Partnered" },
    { value: "10,000+", label: "Students Empowered" },
    { value: "50,000+", label: "Verified Achievements" },
    { value: "99.9%", label: "Platform Uptime" }
];

const AboutPage = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const headingWords = ["Edunexi", "शिक्षा संगम"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % headingWords.length);
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
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        About{' '}
                        <AnimatePresence mode="wait">
                            <motion.span
                                // key={headingWords[currentWordIndex]}
                                // initial={{ opacity: 0, y: 20 }}
                                // animate={{ opacity: 1, y: 0 }}
                                // exit={{ opacity: 0, y: -20 }}
                                // transition={{ duration: 0.6 }}
                                className="bg-gradient-to-r from-[#E5E5E5] to-[#60A5FA] bg-clip-text text-transparent inline-block"
                            >
                                {"Edunexi"}
                            </motion.span>
                        </AnimatePresence>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                    We're redefining student success by showcasing every achievement, skill, and milestone in one unified, verified platform.
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
                        {/* HEADING WITH HOVER ANIMATION */}
                        <h2 className="text-3xl font-bold text-white mb-6 relative inline-block group pb-2">
                            Our Mission
                            <span className="absolute bottom-0 left-0 w-0 h-1 bg-[#8B5CF6] group-hover:w-full transition-all duration-300"></span>
                        </h2>
                        <p className="text-lg text-gray-300">
                            To empower students with a comprehensive, verified digital portfolio that moves beyond traditional transcripts. We bridge the gap between academic accomplishments and real-world opportunities.
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="bg-black/30 p-8 rounded-2xl border border-[#8B5CF6]/20 backdrop-blur-xl"
                    >
                        {/* HEADING WITH HOVER ANIMATION */}
                        <h2 className="text-3xl font-bold text-white mb-6 relative inline-block group pb-2">
                            Our Vision
                            <span className="absolute bottom-0 left-0 w-0 h-1 bg-[#8B5CF6] group-hover:w-full transition-all duration-300"></span>
                        </h2>
                        <p className="text-lg text-gray-300">
                            To become the global standard for academic and extracurricular achievement verification, creating a world where every student's full potential is recognized, celebrated, and valued.
                        </p>
                    </motion.div>
                </div>
                </div>
            </section>

            {/* Stats Section with Radial Gradient */}
            <section className="py-16 relative overflow-hidden bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.15)_0%,rgba(139,92,246,0)_70%)]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    {/* NEW TITLE FOR STATS SECTION WITH HOVER ANIMATION */}
                    <h2 className="text-3xl font-bold text-white mb-12 relative inline-block group pb-2">
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
                            <div className="text-4xl font-bold text-[#8B5CF6] mb-2">{stat.value}</div>
                            <div className="text-gray-300">{stat.label}</div>
                        </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section with Radial Gradient */}
            <section className="py-16 relative overflow-hidden bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.15)_0%,rgba(139,92,246,0)_70%)]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    // HEADING WITH HOVER ANIMATION
                    className="text-3xl font-bold text-white text-center mb-12 relative inline-block group pb-2"
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
                        <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                        <div className="text-[#8B5CF6] mb-4 font-medium">{member.role}</div>
                        <p className="text-gray-300 text-sm mb-4 flex-grow">{member.bio}</p>
                        <div className="flex space-x-4 mt-auto">
                            <Link href={member.socials.linkedin} target="_blank" className="text-gray-400 hover:text-[#8B5CF6] transition-colors"><Linkedin /></Link>
                            <Link href={member.socials.github} target="_blank" className="text-gray-400 hover:text-[#8B5CF6] transition-colors"><Github /></Link>
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