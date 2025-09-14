// Global type declarations for the application

declare global {
  interface Window {
    // Add any global window properties here if needed
  }
}

// Extend Next.js types if needed
declare module 'next/auth' {
  interface Session {
    user: import('./types').User
  }
}

// Extend the File interface for file uploads
interface File {
  preview?: string
}

export {}
