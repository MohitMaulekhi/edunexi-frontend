"use client"

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { useTheme } from 'next-themes'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function DesignPlaygroundPremium() {
  const colorVars = [
    'background', 'foreground', 'primary', 'secondary',
    'muted', 'accent', 'destructive', 'border', 'input',
  ]

  const { theme, setTheme } = useTheme()

  return (
    <main className="min-h-screen p-10 bg-gradient-to-tr from-gray-900 via-purple-900 to-pink-900 dark:from-gray-900 dark:via-black dark:to-purple-900 transition-colors duration-700 font-inter text-white">
      
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-center mb-12">
        <div className="flex items-center gap-4 mb-4 md:mb-0">
          <Image src="/logo.png" alt="Edunexi Logo" width={60} height={60} className="rounded-full" />
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Design Playground
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-lg font-medium text-gray-200">Dark Mode</span>
          <Switch
            checked={theme === 'dark'}
            onCheckedChange={(val) => setTheme(val ? 'dark' : 'light')}
          />
        </div>
      </header>

      {/* Colors Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6 text-gradient bg-clip-text text-transparent from-pink-400 to-purple-400">
          Colors (CSS Variables)
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
          {colorVars.map((v) => (
            <motion.div
              key={v}
              className="rounded-2xl overflow-hidden backdrop-blur-sm bg-white/10 dark:bg-white/5 shadow-xl cursor-pointer border border-white/20 hover:scale-105 transition-transform duration-200"
            >
              <div
                style={{ backgroundColor: `var(--color-${v})` }}
                className="h-32 w-full"
              />
              <div className="p-4">
                <div className="font-semibold text-white">{`--color-${v}`}</div>
                <div className="text-sm text-gray-300">{`var(--color-${v})`}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Form Elements */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6 text-gradient bg-clip-text text-transparent from-blue-400 to-indigo-400">
          Form Elements
        </h2>
        <div className="max-w-lg space-y-6">
          <Input
            placeholder="Email"
            className="rounded-xl shadow-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:text-white dark:border-gray-700 px-5 py-4 text-lg"
          />
          <Input
            placeholder="Password"
            type="password"
            className="rounded-xl shadow-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:text-white dark:border-gray-700 px-5 py-4 text-lg"
          />
          <div className="flex gap-4">
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 shadow-xl rounded-xl text-lg font-semibold transition-transform transform hover:scale-105">
              Primary
            </Button>
            <Button variant="outline" className="border-gray-400 dark:border-gray-600 hover:bg-white/10 text-white rounded-xl text-lg font-medium">
              Outline
            </Button>
            <Button variant="ghost" className="text-white hover:bg-white/10 rounded-xl text-lg font-medium">
              Ghost
            </Button>
          </div>
        </div>
      </section>

      {/* Typography & Spacing */}
      <section>
        <h2 className="text-2xl font-bold mb-6 text-gradient bg-clip-text text-transparent from-yellow-400 to-orange-400">
          Typography & Spacing
        </h2>
        <div className="space-y-4">
          <p className="text-lg text-gray-200">
            Body / base font and spacing are driven by CSS variables in <code className="bg-gray-800 px-1 py-0.5 rounded text-white">app/globals.css</code>.
          </p>
          <p className="text-xl font-medium">This is a sample paragraph to inspect font-size, line-height, and color.</p>
          <h3 className="text-2xl font-bold">Headline / Section title example</h3>
          <p className="text-base text-gray-300">Additional sample text to show spacing and typography in dark/light mode.</p>
        </div>
      </section>
    </main>
  )
}
