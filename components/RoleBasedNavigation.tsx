"use client"

import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { 
  GraduationCap, 
  User, 
  LogOut, 
  Settings,
  Award,
  Users,
  Bell,
  Calendar,
  FileText,
  BarChart3,
  Menu,
  ChevronRight,
  Plus,
  Search,
  Home,
  HelpCircle,
  BookOpen
} from "lucide-react"
import { getRoleDisplayName } from "@/lib/role-utils"

export function RoleBasedNavigation() {
  const { user, logout, isStudent, isUniversityAdmin } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  if (!user) return null

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  const studentNavItems = [
    { 
      href: "/student", 
      label: "Dashboard", 
      icon: BarChart3,
      description: "Overview of your progress"
    },
    { 
      href: "/student/achievements", 
      label: "Achievements", 
      icon: Award,
      description: "Manage your accomplishments",
      badge: "3 pending"
    },
    { 
      href: "/student/portfolio", 
      label: "Portfolio", 
      icon: FileText,
      description: "Digital portfolio & CV"
    },
    { 
      href: "/student/events", 
      label: "Events", 
      icon: Calendar,
      description: "Upcoming events & workshops"
    },
    { 
      href: "/student/profile", 
      label: "Profile", 
      icon: User,
      description: "Personal information"
    },
  ]

  const universityNavItems = [
    { 
      href: "/university", 
      label: "Dashboard", 
      icon: BarChart3,
      description: "University overview"
    },
    { 
      href: "/university/students", 
      label: "Students", 
      icon: Users,
      description: "Manage student accounts"
    },
    { 
      href: "/university/approvals", 
      label: "Approvals", 
      icon: Award,
      description: "Achievement approvals",
      badge: "12 pending"
    },
    { 
      href: "/university/events", 
      label: "Events", 
      icon: Calendar,
      description: "Manage university events"
    },
    { 
      href: "/university/notifications", 
      label: "Notifications", 
      icon: Bell,
      description: "Send announcements"
    },
  ]

  const quickActions = isStudent() ? [
    { 
      href: "/student/achievements/new", 
      label: "Add Achievement", 
      icon: Plus,
      variant: "default" as const
    },
  ] : [
    { 
      href: "/university/students/create", 
      label: "Add Student", 
      icon: Plus,
      variant: "default" as const
    },
    { 
      href: "/university/events/create", 
      label: "Create Event", 
      icon: Calendar,
      variant: "outline" as const
    },
  ]

  const navItems = isStudent() ? studentNavItems : isUniversityAdmin() ? universityNavItems : []

  const getUserInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const isActiveRoute = (href: string) => {
    if (href === "/student" || href === "/university") {
      return pathname === href
    }
    return pathname.startsWith(href)
  }

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="relative">
              <GraduationCap className="h-8 w-8 text-primary" />
              <div className="absolute -top-1 -right-1 h-3 w-3 bg-primary rounded-full animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                EduNexi
              </span>
              <span className="text-xs text-muted-foreground -mt-1">
                Smart Learning Platform
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = isActiveRoute(item.href)
              return (
                <Link key={item.href} href={item.href}>
                  <Button 
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    className={`
                      flex items-center space-x-2 relative
                      ${isActive ? "shadow-md" : "hover:bg-muted/50"}
                      transition-all duration-200
                    `}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                    {item.badge && (
                      <Badge variant="destructive" className="h-5 text-xs ml-1">
                        {item.badge}
                      </Badge>
                    )}
                  </Button>
                </Link>
              )
            })}
          </div>

          {/* Quick Actions & User Menu */}
          <div className="flex items-center space-x-2">
            {/* Quick Actions */}
            <div className="hidden md:flex items-center space-x-1">
              {quickActions.map((action) => {
                const Icon = action.icon
                return (
                  <Link key={action.href} href={action.href}>
                    <Button 
                      variant={action.variant}
                      size="sm"
                      className="flex items-center space-x-2"
                    >
                      <Icon className="h-4 w-4" />
                      <span className="hidden lg:inline">{action.label}</span>
                    </Button>
                  </Link>
                )
              })}
            </div>

            {/* Mobile Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="sm">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <SheetHeader>
                  <SheetTitle className="flex items-center space-x-2">
                    <GraduationCap className="h-5 w-5 text-primary" />
                    <span>EduNexi</span>
                  </SheetTitle>
                  <SheetDescription>
                    Navigate your {isStudent() ? "student" : "university"} portal
                  </SheetDescription>
                </SheetHeader>
                
                <div className="mt-6 space-y-6">
                  {/* User Info */}
                  <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {getUserInitials(user.username)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{user.username}</p>
                      <p className="text-sm text-muted-foreground truncate">{user.email}</p>
                      <Badge variant="secondary" className="text-xs mt-1">
                        {getRoleDisplayName(user.role.type as any)}
                      </Badge>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm text-muted-foreground">Quick Actions</h4>
                    <div className="grid grid-cols-1 gap-2">
                      {quickActions.map((action) => {
                        const Icon = action.icon
                        return (
                          <Link key={action.href} href={action.href} onClick={() => setIsMobileMenuOpen(false)}>
                            <Button 
                              variant="outline"
                              className="w-full justify-start"
                            >
                              <Icon className="h-4 w-4 mr-2" />
                              {action.label}
                            </Button>
                          </Link>
                        )
                      })}
                    </div>
                  </div>

                  {/* Navigation Items */}
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm text-muted-foreground">Navigation</h4>
                    <div className="space-y-1">
                      {navItems.map((item) => {
                        const Icon = item.icon
                        const isActive = isActiveRoute(item.href)
                        return (
                          <Link key={item.href} href={item.href} onClick={() => setIsMobileMenuOpen(false)}>
                            <div className={`
                              flex items-center space-x-3 p-3 rounded-lg transition-colors
                              ${isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted/50"}
                            `}>
                              <Icon className="h-5 w-5" />
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <span className="font-medium">{item.label}</span>
                                  {item.badge && (
                                    <Badge variant={isActive ? "secondary" : "destructive"} className="text-xs">
                                      {item.badge}
                                    </Badge>
                                  )}
                                </div>
                                {item.description && (
                                  <p className={`text-xs mt-1 ${isActive ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                                    {item.description}
                                  </p>
                                )}
                              </div>
                              <ChevronRight className="h-4 w-4" />
                            </div>
                          </Link>
                        )
                      })}
                    </div>
                  </div>

                  {/* Additional Options */}
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm text-muted-foreground">Account</h4>
                    <div className="space-y-1">
                      <Link href={isStudent() ? "/student/profile" : "/university/profile"} onClick={() => setIsMobileMenuOpen(false)}>
                        <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                          <User className="h-5 w-5" />
                          <span>Profile</span>
                        </div>
                      </Link>
                      <Link href="/settings" onClick={() => setIsMobileMenuOpen(false)}>
                        <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                          <Settings className="h-5 w-5" />
                          <span>Settings</span>
                        </div>
                      </Link>
                      <Link href="/help" onClick={() => setIsMobileMenuOpen(false)}>
                        <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                          <HelpCircle className="h-5 w-5" />
                          <span>Help & Support</span>
                        </div>
                      </Link>
                    </div>
                  </div>

                  {/* Logout */}
                  <Button 
                    variant="outline" 
                    className="w-full justify-start text-destructive hover:text-destructive"
                    onClick={() => {
                      setIsMobileMenuOpen(false)
                      handleLogout()
                    }}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              </SheetContent>
            </Sheet>

            {/* Desktop User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="hidden lg:flex">
                <Button variant="ghost" className="flex items-center space-x-2 px-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                      {getUserInitials(user.username)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-left">
                    <div className="text-sm font-medium">{user.username}</div>
                    <Badge variant="secondary" className="text-xs">
                      {getRoleDisplayName(user.role.type as any)}
                    </Badge>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64">
                <DropdownMenuLabel>
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {getUserInitials(user.username)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{user.username}</p>
                      <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                      {user.university && (
                        <p className="text-xs text-muted-foreground truncate">{user.university.name}</p>
                      )}
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                
                <DropdownMenuItem asChild>
                  <Link href={isStudent() ? "/student/profile" : "/university/profile"}>
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                
                <DropdownMenuItem asChild>
                  <Link href="/settings">
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link href="/help">
                    <HelpCircle className="h-4 w-4 mr-2" />
                    Help & Support
                  </Link>
                </DropdownMenuItem>
                
                <DropdownMenuSeparator />
                
                <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default RoleBasedNavigation
