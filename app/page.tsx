"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, Users, Award, BarChart3, Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import DotGrid from "../components/DotGrid"

// Words for dynamic hero heading
const headingWords = ["Edunexi", "शिक्षा संगम"]

// Color palette
const cardBg = "bg-black/70 backdrop-blur-md border border-gray-700"
const cardShadow = "shadow-xl"

export default function HomePage() {
  const { user, loading, getDefaultRoute } = useAuth()
  const router = useRouter()
  const [currentWordIndex, setCurrentWordIndex] = useState(0)

  useEffect(() => {
    if (!loading && user) router.push(getDefaultRoute())
  }, [user, loading, router, getDefaultRoute])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % headingWords.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <Loader2 className="h-12 w-12 animate-spin text-indigo-500" />
      </div>
    )
  }

  return (
    <div className="w-full bg-[#000000] overflow-hidden relative">
      {/* Dot Background */}
      <div className="absolute inset-0 h-[200vh]">
        <DotGrid
          dotSize={5}
          gap={15}
          baseColor="#000000"
          activeColor="#60A5FA"
          proximity={150}
          shockRadius={250}
          shockStrength={5}
          resistance={750}
          returnDuration={1.5}
        />
      </div>

      {/* Hero Section */}
      <div className="h-screen flex flex-col justify-center items-center z-10 px-4">
        <motion.h1 className="text-5xl md:text-7xl font-extrabold tracking-tight drop-shadow-lg font-poppins text-center leading-[1.4]">
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

        <motion.p
          className="mt-6 text-xl md:text-2xl text-gray-300 max-w-3xl text-center font-medium z-1"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Centralized platform for tracking student achievements, managing academic records, and generating verified portfolios.
        </motion.p>

        {/* Portal Section */}
        <motion.div
          className="mt-16 md:mt-20 grid md:grid-cols-2 gap-10 w-full max-w-5xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Student Portal */}
          <motion.div
            className={`${cardBg} rounded-3xl p-8 ${cardShadow} hover:shadow-2xl transition-shadow duration-300`}
            whileHover={{ scale: 1.04 }}
          >
            <CardHeader className="text-center">
              <GraduationCap className="h-14 w-14 text-indigo-500 mx-auto mb-4" />
              <CardTitle className="text-2xl md:text-3xl font-extrabold mb-2 text-gray-50 font-poppins tracking-wide">
                Student Portal
              </CardTitle>
              <CardDescription className="text-gray-300 text-lg md:text-xl font-poppins leading-relaxed">
                Access dashboard, track achievements, manage profile
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center mt-6">
              <Link href="/login?role=student">
                <Button size="lg" className="w-full">
                  Student Login
                </Button>
              </Link>
              <p className="text-sm text-gray-400 mt-3 font-poppins">
                Demo: john.doe@student.edu / student123
              </p>
            </CardContent>
          </motion.div>

          {/* University Portal */}
          <motion.div
            className={`${cardBg} rounded-3xl p-8 ${cardShadow} hover:shadow-2xl transition-shadow duration-300`}
            whileHover={{ scale: 1.04 }}
          >
            <CardHeader className="text-center">
              <Users className="h-14 w-14 text-indigo-500 mx-auto mb-4" />
              <CardTitle className="text-2xl md:text-3xl font-extrabold mb-2 text-gray-50 font-poppins tracking-wide">
                University Portal
              </CardTitle>
              <CardDescription className="text-gray-300 text-lg md:text-xl font-poppins leading-relaxed">
                Manage records, approve achievements, generate reports
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center mt-6">
              <Link href="/login?role=university">
                <Button variant="outline" size="lg" className="w-full">
                  University Login
                </Button>
              </Link>
              <p className="text-sm text-gray-400 mt-3 font-poppins">
                Demo: admin@university.edu / admin123
              </p>
            </CardContent>
          </motion.div>
        </motion.div>
      </div>

      {/* Features Section */}
      <div className="h-screen flex flex-col justify-center items-center z-1 px-4">
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

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-48">
          {[
            { icon: Award, title: "Achievement Tracking", desc: "Document and validate participation in conferences, certifications, and activities" },
            { icon: BarChart3, title: "Performance Analytics", desc: "Real-time updates on academic performance, attendance, and credit-based activities" },
            { icon: Users, title: "Faculty Approval", desc: "Faculty and admin approval system to maintain credibility of records" }
          ].map((feature, i) => (
            <motion.div
              key={i}
              className={`${cardBg} rounded-3xl p-8 text-center shadow-lg hover:shadow-2xl transition-shadow duration-300`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
            >
              <feature.icon className="h-12 w-12 text-indigo-500 mx-auto mb-4" />
              <h3 className="text-2xl md:text-3xl font-semibold mb-2 text-gray-50 font-poppins">{feature.title}</h3>
              <p className="text-gray-300 text-lg font-poppins">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
