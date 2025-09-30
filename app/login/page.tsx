"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, Loader2, X, CheckCircle2, Mail, Lock } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { motion } from "framer-motion"
import CircuitLine from "@/components/ui/circuitline"
import Navbar from "@/components/ui/navbar"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { login, user, getDefaultRoute } = useAuth()

  useEffect(() => {
    if (user) router.push(getDefaultRoute())
  }, [user, router, getDefaultRoute])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    try {
      const result = await login(email, password)
      if (result.success) {
        router.push(getDefaultRoute())
      } else {
        setError(result.error || "Login failed. Please check your credentials.")
      }
    } catch {
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const fillDemoLogin = (type: "student" | "university") => {
    if (type === "student") {
      setEmail("lakshay@nsut.edu")
      setPassword("123456")
    } else {
      setEmail("nsut@gmail.com")
      setPassword("123456")
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-[#170b2c] to-[#220046] text-white px-4 pb-4 pt-24 font-sans">
      <Navbar />
      <CircuitLine />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 rounded-3xl overflow-hidden border border-white/10"
      >
        {/* Left: Branding */}
        <div className="hidden md:flex flex-col justify-center py-4 px-12 bg-black/20 backdrop-blur-xs">
          <div className="flex justify-center items-center mb-10 mt-4">
            <Image src="/logo.png" alt="Edunexi Logo" width={50} height={50} className="rounded-md" />
            <h1 className="ml-4 text-4xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Edunexi
            </h1>
          </div>
          <p className="text-xl font-semibold leading-relaxed text-white/90">
            Empowering Students, Unlocking Achievements — One Platform, Infinite Possibilities
          </p>
          <ul className="mt-8 space-y-4 text-white/80">
            {["Role-based dashboards", "Achievement & portfolio tracking", "University-wide notifications"].map(
              (item, i) => (
                <li key={i} className="flex items-center gap-3 transition-colors">
                  <CheckCircle2 className="h-5 w-5 text-[#8B5CF6]" />
                  <span>{item}</span>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Right: Login Form */}
        <Card className="w-full border-0 bg-[#160d28]/80 backdrop-blur-sm rounded-none md:rounded-l-none rounded-l-3xl shadow-2xl shadow-[#8B5CF6]/20">
          <CardHeader className="text-center pt-8">
            <CardTitle className="text-3xl font-bold text-white">Welcome Back</CardTitle>
            <CardDescription className="text-gray-400">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent className="px-8 pb-8 pt-3">
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div>
                <Label htmlFor="email" className="font-semibold text-gray-300">Email</Label>
                <div className="relative mt-2">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoFocus
                        autoComplete="email"
                        required
                        placeholder="you@university.edu"
                        className="h-14 pl-12 pr-4 text-base rounded-xl border border-white/10 bg-black/20 text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] transition-all duration-200"
                    />
                </div>
              </div>

              <div>
                <Label htmlFor="password" className="font-semibold text-gray-300">Password</Label>
                <div className="relative mt-2">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    required
                    placeholder="Enter your password"
                    className="h-14 pl-12 pr-12 text-base rounded-xl border border-white/10 bg-black/20 text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] transition-all duration-200"
                  />
                  <button
                    type="button"
                    aria-label="Toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Remember me + Demo login info */}
              <div className="flex flex-col space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 text-gray-400 cursor-pointer">
                    <Checkbox id="remember-me" checked={remember} onCheckedChange={(v) => setRemember(Boolean(v))} />
                    <Label htmlFor="remember-me" className="cursor-pointer">Remember me</Label>
                  </label>
                  <Link href="/forgot-password" className="text-[#8B5CF6] hover:brightness-125 transition">
                    Forgot password?
                  </Link>
                </div>

                {/* Two Demo Logins */}
                <p
                  onClick={() => fillDemoLogin("student")}
                  className="text-gray-400 text-base mt-1 cursor-pointer hover:text-white transition-colors"
                  title="Click to auto-fill demo login for Student Portal"
                >
                  Student Portal demo: <span className="font-semibold">lakshay@nsut.edu</span> / <span className="font-semibold">123456</span>
                </p>
                <p
                  onClick={() => fillDemoLogin("university")}
                  className="text-gray-400 text-base mt-1 cursor-pointer hover:text-white transition-colors"
                  title="Click to auto-fill demo login for University Portal"
                >
                  University Portal demo: <span className="font-semibold">nsut@gmail.com</span> / <span className="font-semibold">123456</span>
                </p>

              </div>

              {error && (
                <Alert variant="destructive" className="flex items-start justify-between bg-red-900/50 border-red-500/50 text-white">
                  <AlertDescription>{error}</AlertDescription>
                  <button type="button" onClick={() => setError("")}><X className="h-4 w-4" /></button>
                </Alert>
              )}
              
              <Button
                type="submit"
                className="w-full py-3 h-14 text-base font-semibold text-white rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] hover:shadow-lg hover:shadow-[#8B5CF6]/40 hover:brightness-110 transition-all duration-300 disabled:opacity-50"
                disabled={isLoading || !email || !password}
              >
                {isLoading ? (
                  <span className="inline-flex items-center justify-center">
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" /> Signing in...
                  </span>
                ) : "Sign In"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
