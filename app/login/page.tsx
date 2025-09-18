"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"
import { GraduationCap, Eye, EyeOff, Loader2, X } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { motion } from "framer-motion"
import Image from "next/image"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { login, user, getDefaultRoute } = useAuth()

  useEffect(() => {
    if (user) router.push(getDefaultRoute())
  }, [user, router, getDefaultRoute])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const result = await login(email, password)
      if (result.success) router.push(getDefaultRoute())
      else setError(result.error || "Login failed")
    } catch {
      setError("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black font-inter">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-10"
      >
        {/* Left: Branding / Marketing */}
        <div className="hidden md:flex flex-col justify-center p-12 rounded-3xl bg-gradient-to-br from-purple-900 via-indigo-900 to-black text-white shadow-2xl">
          <div className="flex items-center gap-4 mb-6">
            <Image src="/logo.png" alt="Edunexi Logo" width={60} height={60} />
            <h1 className="text-4xl font-bold tracking-tight">Edunexi</h1>
          </div>
          <p className="text-xl md:text-2xl font-semibold leading-relaxed text-white/90">
            Empowering Students, Unlocking Achievements — One Platform, Infinite Possibilities
          </p>
          <ul className="mt-8 space-y-3 text-sm font-medium text-white/70">
            {[
              "Role-based dashboards",
              "Achievement & portfolio tracking",
              "University-wide notifications"
            ].map((item, i) => (
              <li key={i} className="hover:translate-x-1 transition-transform duration-150">
                • {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Right: Login Form */}
        <Card className="w-full rounded-3xl shadow-2xl border-0 bg-gray-900">
          <CardHeader className="text-center pt-8">
            <CardTitle className="text-3xl font-bold text-white">Sign in</CardTitle>
            <CardDescription className="text-gray-400 mt-1">
              Use your university credentials to access Edunexi
            </CardDescription>
          </CardHeader>
          <CardContent className="px-8 pb-8 pt-4">
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div>
                <Label htmlFor="email" className="font-semibold text-gray-300">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoFocus
                  autoComplete="email"
                  required
                  placeholder="you@university.edu"
                  className="mt-2"
                  aria-invalid={!email && error ? true : undefined}
                />
              </div>

              <div>
                <Label htmlFor="password" className="font-semibold text-gray-300">Password</Label>
                <div className="relative mt-2">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    required
                    placeholder="Enter your password"
                    aria-invalid={!password && error ? true : undefined}
                  />
                  <button
                    type="button"
                    aria-label="Toggle password"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-gray-400">
                  <Checkbox checked={remember} onCheckedChange={(v) => setRemember(Boolean(v))} />
                  Remember me
                </label>
                <Link href="/forgot-password" className="text-sm text-purple-500 hover:underline">
                  Forgot password?
                </Link>
              </div>

              {error && (
                <Alert variant="destructive" className="flex items-start justify-between mt-2">
                  <AlertDescription>{error}</AlertDescription>
                  <button
                    type="button"
                    aria-label="Dismiss error"
                    onClick={() => setError("")}
                    className="ml-4 text-red-400 hover:text-red-300 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </Alert>
              )}

              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={!email || !password}
                loading={loading}
                loadingText="Signing in..."
              >
                Sign In
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-400">
              New here?{' '}
              <Link href="/register" className="text-purple-500 hover:underline font-medium">
                Create an account
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
