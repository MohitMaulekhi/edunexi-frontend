import React from 'react'


const dummyProfile = {
  name: 'Aarav Sharma',
  email: 'aarav.sharma@student.edu',
  roll: '2025CS101',
  branch: 'Computer Science',
  year: '3rd Year',
  avatar: '/placeholder-user.jpg',
  bio: 'Passionate about AI, open source, and building impactful tech solutions. Loves hackathons and cricket.'
}

const page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 py-10">
      <div className="max-w-xl mx-auto bg-white rounded-lg shadow-lg p-8 flex flex-col items-center">
        <img src={dummyProfile.avatar} alt="Avatar" className="w-28 h-28 rounded-full border-4 border-orange-300 mb-4 shadow" />
        <h1 className="text-3xl font-bold mb-2 text-orange-800">{dummyProfile.name}</h1>
        <p className="text-gray-600 mb-1">{dummyProfile.email}</p>
        <p className="text-gray-500 mb-1">Roll No: <span className="font-medium">{dummyProfile.roll}</span></p>
        <p className="text-gray-500 mb-1">Branch: <span className="font-medium">{dummyProfile.branch}</span></p>
        <p className="text-gray-500 mb-4">Year: <span className="font-medium">{dummyProfile.year}</span></p>
        <div className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded w-full text-center">
          <span className="text-orange-700">{dummyProfile.bio}</span>
        </div>
      </div>
    </div>
  )
}

export default page
