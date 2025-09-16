import React from 'react'


const dummyPortfolio = [
  {
    title: 'AI Chatbot for Campus Helpdesk',
    description: 'Developed a chatbot using Python and NLP to automate student queries and support.',
    tech: ['Python', 'TensorFlow', 'React'],
    link: 'https://github.com/example/ai-chatbot',
    year: 2025,
  },
  {
    title: 'Personal Portfolio Website',
    description: 'Designed and built a personal website to showcase projects and achievements.',
    tech: ['Next.js', 'Tailwind CSS'],
    link: 'https://student-portfolio.com',
    year: 2024,
  },
  {
    title: 'Smart Attendance System',
    description: 'Created a facial recognition-based attendance system for classrooms.',
    tech: ['OpenCV', 'Flask', 'SQLite'],
    link: '',
    year: 2023,
  },
]

const page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 py-10">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-purple-800">Student Portfolio</h1>
        <div className="grid gap-6">
          {dummyPortfolio.map((item, idx) => (
            <div key={idx} className="border-l-4 border-purple-500 bg-purple-50 p-6 rounded shadow-sm hover:shadow-md transition">
              <h2 className="text-xl font-semibold text-purple-700 mb-1">{item.title} <span className="text-xs text-gray-400">({item.year})</span></h2>
              <p className="text-gray-700 mb-2">{item.description}</p>
              <div className="flex flex-wrap gap-2 text-sm text-gray-500 mb-2">
                {item.tech.map((tech, i) => (
                  <span key={i} className="bg-purple-100 px-2 py-1 rounded">{tech}</span>
                ))}
              </div>
              {item.link && (
                <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-sm">View Project</a>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default page
