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
    <nav className="sticky top-0 z-50 bg-black/70 backdrop-blur-md border-b border-gray-700">
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
              <SheetContent side="right" className="w-80 font-poppins">
                <SheetHeader>
                  <SheetTitle className="flex items-center space-x-3">
                    <div className="relative">
                      <GraduationCap className="h-6 w-6 text-blue-400" />
                      <div className="absolute -top-1 -right-1 h-2 w-2 bg-blue-400 rounded-full animate-pulse" />
                    </div>
                    <span>EduNexi</span>
                  </SheetTitle>
                  <SheetDescription>
                    Navigate your {isStudent() ? "student" : "university"} portal
                  </SheetDescription>
                </SheetHeader>
                
                <div className="flex-1 overflow-y-auto px-6 pb-6">
                  <div className="space-y-8 mt-6">
                    {/* User Info */}
                    <div className="relative p-4 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl border border-gray-700/50 backdrop-blur-sm">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-indigo-500/5 to-purple-500/5 rounded-xl" />
                      <div className="relative flex items-center space-x-4">
                        <Avatar className="h-12 w-12 ring-2 ring-blue-400/30">
                          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-semibold">
                            {getUserInitials(user.username)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-white truncate">{user.username}</p>
                          <p className="text-sm text-gray-300 truncate">{user.email}</p>
                          <Badge 
                            variant="secondary" 
                            className="text-xs mt-2 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 text-blue-300 border-blue-400/30"
                          >
                            {getRoleDisplayName(user.role.type as any)}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <div className="h-1 w-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full" />
                        <h4 className="font-semibold text-sm text-gray-200 uppercase tracking-wide">Quick Actions</h4>
                      </div>
                      <div className="grid grid-cols-1 gap-3">
                        {quickActions.map((action, index) => {
                          const Icon = action.icon
                          const colors = [
                            'from-green-500 to-emerald-600',
                            'from-blue-500 to-cyan-600',
                            'from-purple-500 to-violet-600',
                            'from-orange-500 to-red-600'
                          ]
                          const bgColors = [
                            'bg-green-500/10 hover:bg-green-500/20 border-green-400/30',
                            'bg-blue-500/10 hover:bg-blue-500/20 border-blue-400/30',
                            'bg-purple-500/10 hover:bg-purple-500/20 border-purple-400/30',
                            'bg-orange-500/10 hover:bg-orange-500/20 border-orange-400/30'
                          ]
                          return (
                            <Link key={action.href} href={action.href} onClick={() => setIsMobileMenuOpen(false)}>
                              <Button 
                                variant="outline"
                                className={`w-full justify-start h-12 ${bgColors[index % bgColors.length]} border transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]`}
                              >
                                <Icon className={`h-5 w-5 mr-3 bg-gradient-to-r ${colors[index % colors.length]} bg-clip-text text-transparent`} />
                                <span className="font-medium text-gray-200">{action.label}</span>
                              </Button>
                            </Link>
                          )
                        })}
                      </div>
                    </div>

                    {/* Navigation Items */}
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <div className="h-1 w-8 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full" />
                        <h4 className="font-semibold text-sm text-gray-200 uppercase tracking-wide">Navigation</h4>
                      </div>
                      <div className="space-y-2">
                        {navItems.map((item, index) => {
                          const Icon = item.icon
                          const isActive = isActiveRoute(item.href)
                          const iconColors = [
                            'text-blue-400',
                            'text-indigo-400', 
                            'text-purple-400',
                            'text-cyan-400',
                            'text-emerald-400'
                          ]
                          const activeGradients = [
                            'from-blue-500/20 to-indigo-500/20',
                            'from-indigo-500/20 to-purple-500/20',
                            'from-purple-500/20 to-pink-500/20',
                            'from-cyan-500/20 to-blue-500/20',
                            'from-emerald-500/20 to-green-500/20'
                          ]
                          return (
                            <Link key={item.href} href={item.href} onClick={() => setIsMobileMenuOpen(false)}>
                              <div className={`
                                group flex items-center space-x-4 p-4 rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]
                                ${isActive 
                                  ? `bg-gradient-to-r ${activeGradients[index % activeGradients.length]} border border-blue-400/30 shadow-lg` 
                                  : "hover:bg-gray-800/50 border border-transparent hover:border-gray-700/50"
                                }
                              `}>
                                <div className={`
                                  p-2 rounded-lg transition-colors
                                  ${isActive ? 'bg-blue-500/20' : 'bg-gray-800/50 group-hover:bg-gray-700/50'}
                                `}>
                                  <Icon className={`h-5 w-5 ${isActive ? 'text-blue-300' : iconColors[index % iconColors.length]}`} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between">
                                    <span className={`font-semibold ${isActive ? "text-white" : "text-gray-200"}`}>
                                      {item.label}
                                    </span>
                                    {item.badge && (
                                      <Badge 
                                        variant={isActive ? "secondary" : "destructive"} 
                                        className={`text-xs ${isActive ? 'bg-blue-500/20 text-blue-300 border-blue-400/30' : ''}`}
                                      >
                                        {item.badge}
                                      </Badge>
                                    )}
                                  </div>
                                  {item.description && (
                                    <p className={`text-xs mt-1 ${isActive ? "text-blue-200/80" : "text-gray-400"}`}>
                                      {item.description}
                                    </p>
                                  )}
                                </div>
                                <ChevronRight className={`h-4 w-4 transition-transform group-hover:translate-x-1 ${isActive ? 'text-blue-300' : 'text-gray-500'}`} />
                              </div>
                            </Link>
                          )
                        })}
                      </div>
                    </div>

                    {/* Additional Options */}
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <div className="h-1 w-8 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full" />
                        <h4 className="font-semibold text-sm text-gray-200 uppercase tracking-wide">Account</h4>
                      </div>
                      <div className="space-y-2">
                        {[
                          { 
                            href: isStudent() ? "/student/profile" : "/university/profile", 
                            icon: User, 
                            label: "Profile",
                            color: "text-purple-400",
                            bgColor: "hover:bg-purple-500/10"
                          },
                          { 
                            href: "/settings", 
                            icon: Settings, 
                            label: "Settings",
                            color: "text-pink-400",
                            bgColor: "hover:bg-pink-500/10"
                          },
                          { 
                            href: "/help", 
                            icon: HelpCircle, 
                            label: "Help & Support",
                            color: "text-cyan-400",
                            bgColor: "hover:bg-cyan-500/10"
                          }
                        ].map((option) => {
                          const Icon = option.icon
                          return (
                            <Link key={option.href} href={option.href} onClick={() => setIsMobileMenuOpen(false)}>
                              <div className={`group flex items-center space-x-4 p-3 rounded-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${option.bgColor} border border-transparent hover:border-gray-700/50`}>
                                <div className="p-2 rounded-lg bg-gray-800/50 group-hover:bg-gray-700/50 transition-colors">
                                  <Icon className={`h-4 w-4 ${option.color}`} />
                                </div>
                                <span className="font-medium text-gray-200">{option.label}</span>
                                <ChevronRight className="h-3 w-3 text-gray-500 transition-transform group-hover:translate-x-1 ml-auto" />
                              </div>
                            </Link>
                          )
                        })}
                      </div>
                    </div>

                    {/* Logout */}
                    <div className="pt-4 border-t border-gray-700/50">
                      <Button 
                        variant="outline" 
                        className="w-full justify-start h-12 bg-red-500/10 hover:bg-red-500/20 border-red-400/30 text-red-300 hover:text-red-200 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                        onClick={() => {
                          setIsMobileMenuOpen(false)
                          handleLogout()
                        }}
                      >
                        <div className="p-2 rounded-lg bg-red-500/20 mr-3">
                          <LogOut className="h-4 w-4" />
                        </div>
                        <span className="font-medium">Logout</span>
                      </Button>
                    </div>
                  </div>
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
