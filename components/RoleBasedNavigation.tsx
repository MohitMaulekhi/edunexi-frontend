"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
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
  HelpCircle,
  ChevronLeft,
  Home,
} from "lucide-react";
import Image from "next/image";
import { getRoleDisplayName } from "@/lib/role-utils";

export function RoleBasedNavigation() {
  const { user, logout, isStudent, isUniversityAdmin } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    // Toggle CSS class on body element
    if (isCollapsed) {
      document.body.classList.add("sidebar-collapsed");
    } else {
      document.body.classList.remove("sidebar-collapsed");
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove("sidebar-collapsed");
    };
  }, [isCollapsed]);

  if (!user) return null;

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const studentNavItems = [
    {
      href: "/student",
      label: "Dashboard",
      icon: BarChart3,
      description: "Overview of your progress",
    },
    {
      href: "/student/achievements",
      label: "Achievements",
      icon: Award,
      description: "Manage your accomplishments",
      badge: "3 pending",
    },
    {
      href: "/student/community-service",
      label: "Community Service",
      icon: Heart,
      description: "Log your volunteer work",
    },
    {
      href: "/student/portfolio",
      label: "Portfolio",
      icon: FileText,
      description: "Digital portfolio & CV",
    },
    {
      href: "/student/events",
      label: "Events",
      icon: Calendar,
      description: "Upcoming events & workshops",
    },
    {
      href: "/student/notifications",
      label: "Notifications",
      icon: Bell,
      description: "University announcements",
    },
    {
      href: "/student/profile",
      label: "Profile",
      icon: User,
      description: "Personal information",
    },
  ];

  const universityNavItems = [
    {
      href: "/university",
      label: "Dashboard",
      icon: BarChart3,
      description: "University overview",
    },
    {
      href: "/university/students",
      label: "Students",
      icon: Users,
      description: "Manage student accounts",
    },
    {
      href: "/university/approvals",
      label: "Approvals",
      icon: Award,
      description: "Achievement approvals",
      badge: "12 pending",
    },
    {
      href: "/university/events",
      label: "Events",
      icon: Calendar,
      description: "Manage university events",
    },
    {
      href: "/university/notifications",
      label: "Notifications",
      icon: Bell,
      description: "Send announcements",
    },
  ];

  const quickActions = isStudent()
    ? [
        {
          href: "/student/achievements/new",
          label: "Add Achievement",
          icon: Plus,
          variant: "default" as const,
        },
      ]
    : [
        {
          href: "/university/students/create",
          label: "Add Student",
          icon: Plus,
          variant: "default" as const,
        },
        {
          href: "/university/events/create",
          label: "Create Event",
          icon: Calendar,
          variant: "outline" as const,
        },
      ];

  const navItems = isStudent()
    ? studentNavItems
    : isUniversityAdmin()
    ? universityNavItems
    : [];

  const getUserInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const isActiveRoute = (href: string) => {
    if (href === "/student" || href === "/university") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="bg-black/80 backdrop-blur-md border-gray-700 text-white hover:bg-gray-800"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-80 font-poppins bg-[#000000] border-gray-700 p-0"
          >
            <div className="flex flex-col h-full">
              {/* Mobile Header */}
              <SheetHeader className="border-b border-gray-700/50 p-6">
                <SheetTitle className="flex items-center space-x-3 text-left">
                  <div className="relative">
                    <Image
                      src="/logo.svg"
                      alt="EduNexi Logo"
                      width={28}
                      height={28}
                    />
                    <div className="absolute -top-1 -right-1 h-3 w-3 bg-blue-400 rounded-full animate-pulse" />
                  </div>
                  <span className="font-bold text-xl text-white">EduNexi</span>
                </SheetTitle>
                <SheetDescription className="text-gray-400 text-left">
                  Navigate your {isStudent() ? "student" : "university"} portal
                </SheetDescription>
              </SheetHeader>

              {/* Mobile Content - Same as your existing mobile menu */}
              <div className="flex-1 overflow-y-auto p-6">
                {/* User Info */}
                <div className="mb-6 p-4 bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-gray-700 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12 ring-2 ring-blue-400/30">
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-semibold">
                        {getUserInitials(user.username)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-semibold text-white">
                        {user.username}
                      </p>
                      <p className="text-sm text-gray-300">{user.email}</p>
                      <Badge
                        variant="secondary"
                        className="text-xs mt-2 bg-blue-500/20 text-blue-300 border-blue-400/30"
                      >
                        {getRoleDisplayName(user.role.type as any)}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Navigation Items */}
                <div className="space-y-2 mb-6">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = isActiveRoute(item.href);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <div
                          className={`
                          flex items-center space-x-3 p-3 rounded-lg transition-all duration-200
                          ${
                            isActive
                              ? "bg-blue-600/20 border border-blue-400/30 text-white"
                              : "hover:bg-gray-800/50 text-gray-300 hover:text-white"
                          }
                        `}
                        >
                          <Icon className="h-5 w-5" />
                          <span className="font-medium">{item.label}</span>
                          {item.badge && (
                            <Badge
                              variant="destructive"
                              className="text-xs ml-auto"
                            >
                              {item.badge}
                            </Badge>
                          )}
                        </div>
                      </Link>
                    );
                  })}
                </div>

                {/* Quick Actions */}
                <div className="space-y-2 mb-6">
                  <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">
                    Quick Actions
                  </h4>
                  {quickActions.map((action) => {
                    const Icon = action.icon;
                    return (
                      <Link
                        key={action.href}
                        href={action.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Button
                          variant="outline"
                          className="w-full justify-start bg-green-500/10 border-green-400/30 text-green-300 hover:bg-green-500/20"
                        >
                          <Icon className="h-4 w-4 mr-3" />
                          {action.label}
                        </Button>
                      </Link>
                    );
                  })}
                </div>

                {/* Logout */}
                <Button
                  variant="outline"
                  className="w-full justify-start bg-red-500/10 border-red-400/30 text-red-300 hover:bg-red-500/20"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleLogout();
                  }}
                >
                  <LogOut className="h-4 w-4 mr-3" />
                  Logout
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <div
        className={`font-poppins
        hidden lg:flex flex-col fixed left-0 top-0 h-full bg-black/95 backdrop-blur-md border-r border-gray-700 z-40 transition-all duration-300
        ${isCollapsed ? "w-16" : "w-64"}
      `}
      >
        {/* Logo Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          {!isCollapsed && (
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <Image
                  src="/logo.svg"
                  alt="EduNexi Logo"
                  width={32}
                  height={32}
                  className="transition-all duration-300 group-hover:rotate-12"
                />
                <div className="absolute -top-1 -right-1 h-3 w-3 bg-primary rounded-full animate-pulse" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  EduNexi
                </span>
                <span className="text-xs text-gray-400 -mt-1">
                  Smart Learning Platform
                </span>
              </div>
            </Link>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`text-gray-400 bg-gray-700 border rounded-full hover:text-white hover:bg-gray-800`}
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* User Info */}
        {!isCollapsed && (
          <div className="p-4 border-b border-gray-700">
            <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-lg border border-gray-700">
              <Avatar className="h-10 w-10 ring-2 ring-blue-400/30">
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-semibold">
                  {getUserInitials(user.username)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-white text-sm truncate">
                  {user.username}
                </p>
                <Badge
                  variant="secondary"
                  className="text-xs bg-blue-500/20 text-blue-300 border-blue-400/30 mt-1"
                >
                  {getRoleDisplayName(user.role.type as any)}
                </Badge>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = isActiveRoute(item.href);
            return (
              <Link key={item.href} href={item.href}>
                <div
                  className={`
                  group flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 hover:scale-105
                  ${
                    isActive
                      ? "bg-blue-600/20 border border-blue-400/30 text-white shadow-lg"
                      : "hover:bg-gray-800/50 text-gray-300 hover:text-white"
                  }
                  ${isCollapsed ? "justify-center" : ""}
                `}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  {!isCollapsed && (
                    <>
                      <div className="flex-1">
                        <span className="font-medium">{item.label}</span>
                        {item.description && (
                          <p className="text-xs text-gray-400 mt-0.5">
                            {item.description}
                          </p>
                        )}
                      </div>
                      {item.badge && (
                        <Badge variant="destructive" className="text-xs">
                          {item.badge}
                        </Badge>
                      )}
                    </>
                  )}
                </div>
              </Link>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="p-4 border-t border-gray-700 space-y-2">
          {!isCollapsed && (
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
              Quick Actions
            </h4>
          )}
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link key={action.href} href={action.href}>
                <Button
                  variant="outline"
                  size={isCollapsed ? "sm" : "default"}
                  className={`
                    bg-green-500/10 border-green-400/30 text-green-300 hover:bg-green-500/20 transition-all duration-200 hover:scale-105
                    ${isCollapsed ? "w-full p-2" : "w-full justify-start"}
                  `}
                >
                  <Icon className={`h-4 w-4 ${isCollapsed ? "" : "mr-3"}`} />
                  {!isCollapsed && action.label}
                </Button>
              </Link>
            );
          })}
        </div>

        {/* Logout */}
        <div className="p-4 border-t border-gray-700">
          <Button
            variant="outline"
            size={isCollapsed ? "sm" : "default"}
            className={`
              bg-red-500/10 border-red-400/30 text-red-300 hover:bg-red-500/20 transition-all duration-200 hover:scale-105
              ${isCollapsed ? "w-full p-2" : "w-full justify-start"}
            `}
            onClick={handleLogout}
          >
            <LogOut className={`h-4 w-4 ${isCollapsed ? "" : "mr-3"}`} />
            {!isCollapsed && "Logout"}
          </Button>
        </div>
      </div>
    </>
  );
}

export default RoleBasedNavigation;
