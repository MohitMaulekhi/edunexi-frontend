import React from "react";

const dummyProfiles = [
  {
    name: "Aarav Sharma",
    email: "aarav.sharma@student.edu",
    roll: "2025CS101",
    branch: "Computer Science",
    year: "3rd Year",
    avatar: "/placeholder-user.jpg",
    bio: "Passionate about AI, open source, and building impactful tech solutions. Loves hackathons and cricket."
  },
  {
    name: "Ishita Verma",
    email: "ishita.verma@student.edu",
    roll: "2025EE204",
    branch: "Electrical Engineering",
    year: "2nd Year",
    avatar: "/placeholder-user.jpg",
    bio: "Enjoys robotics, IoT projects, and exploring renewable energy systems. Avid dancer and traveler."
  },
  {
    name: "Rohan Gupta",
    email: "rohan.gupta@student.edu",
    roll: "2024ME302",
    branch: "Mechanical Engineering",
    year: "4th Year",
    avatar: "/placeholder-user.jpg",
    bio: "Interested in automotive design and sustainable manufacturing. Plays football at the university level."
  },
  {
    name: "Neha Singh",
    email: "neha.singh@student.edu",
    roll: "2026BT112",
    branch: "Biotechnology",
    year: "1st Year",
    avatar: "/placeholder-user.jpg",
    bio: "Curious about genetics and bioinformatics. Loves painting and participates in debating competitions."
  },
  {
    name: "Karan Mehta",
    email: "karan.mehta@student.edu",
    roll: "2025IT210",
    branch: "Information Technology",
    year: "3rd Year",
    avatar: "/placeholder-user.jpg",
    bio: "Web developer and UI/UX enthusiast. Loves gaming and mentoring juniors."
  },
  // 👆 upar ke 5 original
  // 👇 niche mai auto-generate karke 45 aur daal diye hain
  ...Array.from({ length: 45 }, (_, i) => ({
    name: `Student ${i + 6}`,
    email: `student${i + 6}@student.edu`,
    roll: `2025XX${100 + i}`,
    branch: ["Computer Science", "IT", "EE", "ME", "BT", "CE", "EC"][
      Math.floor(Math.random() * 7)
    ],
    year: ["1st Year", "2nd Year", "3rd Year", "4th Year"][
      Math.floor(Math.random() * 4)
    ],
    avatar: "/placeholder-user.jpg",
    bio: "This is a dummy bio for testing large student datasets."
  }))
];

const Page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 py-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {dummyProfiles.map((student, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center"
          >
            <img
              src={student.avatar}
              alt="Avatar"
              className="w-24 h-24 rounded-full border-4 border-orange-300 mb-4 shadow"
            />
            <h1 className="text-xl font-bold mb-1 text-orange-800">
              {student.name}
            </h1>
            <p className="text-gray-600 text-sm mb-1">{student.email}</p>
            <p className="text-gray-500 text-sm">
              Roll No: <span className="font-medium">{student.roll}</span>
            </p>
            <p className="text-gray-500 text-sm">
              Branch: <span className="font-medium">{student.branch}</span>
            </p>
            <p className="text-gray-500 text-sm mb-3">
              Year: <span className="font-medium">{student.year}</span>
            </p>
            <div className="bg-orange-50 border-l-4 border-orange-400 p-3 rounded w-full text-center">
              <span className="text-orange-700 text-sm">{student.bio}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
