import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import { AuthProvider } from '@/contexts/AuthContext'
import RoleBasedNavigation from '@/components/RoleBasedNavigation'
import PageTransitions from '@/components/ui/page-transitions'
import './globals.css'

export const metadata: Metadata = {
  title: 'Student Achievement Platform',
  description: 'University student management and achievement tracking system',
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <AuthProvider>
          <RoleBasedNavigation />
          <PageTransitions transitionType="fade" duration={300}>
            {children}
          </PageTransitions>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
