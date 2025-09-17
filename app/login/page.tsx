"use client"

import type React from "react"

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

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { login, user, getDefaultRoute } = useAuth()

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      router.push(getDefaultRoute())
    }
  }, [user, router, getDefaultRoute])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const result = await login(email, password)

      if (result.success) {
        // Redirect to role-based route after successful login
        router.push(getDefaultRoute())
      } else {
        setError(result.error || "Login failed")
      }
    } catch {
      setError("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="w-full max-w-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Left: marketing / welcome */}
          <div className="hidden md:block p-8 rounded-lg bg-gradient-to-br from-indigo-600 to-indigo-500 text-white shadow-lg">
            <div className="flex items-center gap-3">
              <GraduationCap className="h-10 w-10" />
              <h3 className="text-2xl font-semibold">Student Achievement Platform</h3>
            </div>
            <p className="mt-4 text-slate-100/90">Manage students, track achievements and events — all in one place.</p>
            <ul className="mt-6 space-y-2 text-sm">
              <li>• Role-based dashboards</li>
              <li>• Achievement & portfolio tracking</li>
              <li>• University-wide notifications</li>
            </ul>
          </div>

          {/* Right: login form */}
          <Card className="w-full">
            <CardHeader>
              <div className="text-center">
                <CardTitle className="text-2xl">Sign in</CardTitle>
                <CardDescription>Use your university credentials to sign in</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoFocus
                    autoComplete="email"
                    required
                    placeholder="you@university.edu"
                  />
                  <p className="mt-1 text-xs text-slate-500">Use your university email address</p>
                </div>

                <div>
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="current-password"
                      required
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      aria-label="Toggle password"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-1 top-1/2 -translate-y-1/2 p-1 rounded"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2">
                    <Checkbox checked={remember} onCheckedChange={(v) => setRemember(Boolean(v))} />
                    <span className="text-sm">Remember me</span>
                  </label>
                  <Link href="/forgot-password" className="text-sm text-primary underline">
                    Forgot password?
                  </Link>
                </div>

                {error && (
                  <Alert variant="destructive" className="flex items-start justify-between">
                    <div>
                      <AlertDescription>{error}</AlertDescription>
                    </div>
                    <button
                      type="button"
                      aria-label="Dismiss error"
                      onClick={() => setError("")}
                      className="ml-4 inline-flex items-center justify-center p-1 rounded"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </Alert>
                )}

                <Button type="submit" className="w-full" disabled={loading || !email || !password}>
                  {loading ? (
                    <span className="inline-flex items-center">
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Signing in...
                    </span>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>

              <div className="mt-4 text-center text-sm">
                <span className="text-muted-foreground">New here?</span>{' '}
                <Link href="/register" className="text-primary underline">Create an account</Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
