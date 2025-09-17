import React from 'react'


const dummyAchievements = [
  {
    title: 'Best Paper Award - IEEE Conference 2024',
    description: 'Awarded for presenting the best research paper on AI advancements.',
    category: 'Research Publication',
    date: '2024-08-15',
    points: 120,
  },
  {
    title: 'Gold Medal - National Math Olympiad',
    description: 'Secured 1st place in the National Math Olympiad among 5000+ participants.',
    category: 'Competition/Contest',
    date: '2025-01-10',
    points: 100,
  },
  {
    title: 'Internship at Google',
    description: 'Completed a 2-month internship as a Software Engineering Intern.',
    category: 'Internship/Work Experience',
    date: '2025-06-30',
    points: 80,
  },
]

const page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 py-10">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-blue-800">Student Achievements</h1>
        <div className="grid gap-6">
          {dummyAchievements.map((ach, idx) => (
            <div key={idx} className="border-l-4 border-blue-500 bg-blue-50 p-6 rounded shadow-sm hover:shadow-md transition">
              <h2 className="text-xl font-semibold text-blue-700 mb-1">{ach.title}</h2>
              <p className="text-gray-700 mb-2">{ach.description}</p>
              <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                <span className="bg-blue-100 px-2 py-1 rounded">{ach.category}</span>
                <span className="bg-green-100 px-2 py-1 rounded">Date: {ach.date}</span>
                <span className="bg-yellow-100 px-2 py-1 rounded">Points: {ach.points}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default page
