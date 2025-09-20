"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BubbleBackground from "@/components/ui/BubbleBg";
import StarRing from "@/components/ui/starRing";
import Navbar from "@/components/ui/navbar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { GraduationCap, Users, Award, BarChart3 } from "lucide-react";

const cardBg = "bg-black/60";
const cardShadow = "shadow-lg shadow-[#8B5CF6]/20";

export default function HomePage() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const headingWords = ["Edunexi", "शिक्षा संगम"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % headingWords.length);
    }, 3000); // Change word every 3 seconds

    return () => clearInterval(interval);
  }, [headingWords.length]);

  return (
    <div className="overflow-x-hidden bg-black min-h-screen relative text-white">
      {/* Background layers */}
      <div className="relative w-full h-screen overflow-hidden">
        <BubbleBackground />

        <div className="absolute inset-0 flex items-center justify-center">
          <StarRing />
        </div>

        <Navbar />

        {/* Hero Section */}
        <section className="absolute inset-0 flex flex-col items-center justify-center z-20 px-4">
          
          {/* Animated Heading */}
          <motion.h1 className="text-5xl md:text-7xl font-extrabold tracking-tight drop-shadow-lg font-poppins text-center leading-[1.4] mb-12">
            <AnimatePresence mode="wait">
              <motion.span
                key={headingWords[currentWordIndex]}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
                className="bg-gradient-to-r from-[#E5E5E5] to-[#60A5FA] bg-clip-text text-transparent inline-block"
              >
                {headingWords[currentWordIndex]}
              </motion.span>
            </AnimatePresence>
          </motion.h1>

          {/* Portal Cards */}
          <motion.div
            className="grid md:grid-cols-2 gap-10 w-full max-w-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Student Portal */}
            <motion.div
              className={`${cardBg} rounded-3xl p-6 border border-[#8B5CF6] ${cardShadow} hover:shadow-2xl transition-shadow duration-300`}
              whileHover={{ scale: 1.04 }}
            >
              <CardHeader className="text-center">
                <GraduationCap className="h-12 w-12 text-[#8B5CF6] mx-auto mb-3" />
                <CardTitle className="text-xl md:text-2xl font-extrabold mb-2 text-gray-50 font-poppins tracking-wide">
                  Student Portal
                </CardTitle>
                <CardDescription className="text-base text-gray-300 font-poppins">
                  Access dashboard & manage profile
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center mt-4">
                <Link href="/login?role=student">
                  <Button size="lg" className="w-full bg-[#8B5CF6] text-white hover:bg-[#8B5CF6]/80">
                    Student Login
                  </Button>
                </Link>
              </CardContent>
            </motion.div>

            {/* University Portal */}
            <motion.div
              className={`${cardBg} rounded-3xl p-6 border border-[#8B5CF6] ${cardShadow} hover:shadow-2xl transition-shadow duration-300`}
              whileHover={{ scale: 1.04 }}
            >
              <CardHeader className="text-center">
                <Users className="h-12 w-12 text-[#8B5CF6] mx-auto mb-3" />
                <CardTitle className="text-xl md:text-2xl font-extrabold mb-2 text-gray-50 font-poppins tracking-wide">
                  University Portal
                </CardTitle>
                <CardDescription className="text-base text-gray-300 font-poppins">
                  Manage records & generate reports
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center mt-4">
                <Link href="/login?role=university">
                  <Button variant="outline" size="lg" className="w-full border-[#8B5CF6] text-[#8B5CF6] hover:bg-[#8B5CF6]/10">
                    University Login
                  </Button>
                </Link>
              </CardContent>
            </motion.div>
          </motion.div>
        </section>
      </div>

      {/* Features Section */}
      <section
        id="features"
        className="min-h-screen flex flex-col justify-center items-center px-4 bg-gradient-to-b from-[] to-[#1f023d] relative z-30"
      >
        <div className="max-w-6xl mx-auto text-center mb-16 z-1">
          <motion.h2
            className="text-4xl md:text-5xl font-extrabold text-gray-50 mb-4 font-poppins z-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Features
          </motion.h2>
          <motion.p
            className="text-gray-300 max-w-3xl mx-auto text-lg md:text-xl font-poppins"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Tools to manage, track, and validate student accomplishments seamlessly.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-14">
          {[
            { icon: Award, title: "Achievement Tracking", desc: "Document and validate participation in conferences, certifications, and activities" },
            { icon: BarChart3, title: "Performance Analytics", desc: "Real-time updates on academic performance, attendance, and credit-based activities" },
            { icon: Users, title: "Faculty Approval", desc: "Faculty and admin approval system to maintain credibility of records" }
          ].map((feature, i) => (
            <motion.div
              key={i}
              className="bg-gray-900 border border-[#8B5CF6] rounded-3xl p-8 text-center shadow-xl hover:shadow-2xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
            >
              <feature.icon className="h-12 w-12 text-[#8B5CF6] mx-auto mb-4" />
              <h3 className="text-2xl md:text-3xl font-semibold mb-2 text-gray-50 font-poppins">{feature.title}</h3>
              <p className="text-gray-300 text-lg font-poppins">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}