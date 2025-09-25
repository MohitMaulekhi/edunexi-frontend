import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import Footer from "@/components/ui/footer";
import { AuthProvider } from "@/contexts/AuthContext";
import ConditionalNavigation from "@/components/ConditionalNavigation";
import RoleBasedNavigation from "@/components/RoleBasedNavigation";
import PageTransitions from "@/components/ui/page-transitions";
import "./globals.css";

export const metadata: Metadata = {
  title: "Student Achievement Platform",
  description: "University student management and achievement tracking system",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <AuthProvider>
          <ConditionalNavigation />
          <div className="main-content">
            <main className="flex-1">
              <PageTransitions transitionType="fade" duration={300}>
                {children}
              </PageTransitions>
            </main>
            <Footer />
          </div>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}
