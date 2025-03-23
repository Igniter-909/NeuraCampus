

'use client'
import React, { useState } from 'react'

// Mock data structure
const studentData = {
  name: "Sakshi Choudhary",
  email: "sakshi.choudhary@email.com",
  todaysClasses: [
    {
      id: 1,
      subject: "Mathematics I",
      time: "09:30 am",
      status: "present",
      faculty: "Dr. Smith",
      room: "Room 101",
      attendance: "85%"
    },
    {
      id: 2,
      subject: "Physics",
      time: "10:45 am",
      status: "present",
      faculty: "Dr. Johnson",
      room: "Room 102",
      attendance: "90%"
    },
    {
      id: 3,
      subject: "Biology",
      time: "11:45 am",
      status: "absent",
      faculty: "Dr. Williams",
      room: "Lab 201",
      attendance: "75%"
    },
    {
      id: 4,
      subject: "Geography",
      time: "12:30 pm",
      status: "present",
      faculty: "Prof. Davis",
      room: "Room 103",
      attendance: "92%"
    },
    {
      id: 5,
      subject: "Chemistry",
      time: "02:15 pm",
      status: "present",
      faculty: "Dr. Brown",
      room: "Lab 202",
      attendance: "88%"
    },
    {
      id: 6,
      subject: "History",
      time: "03:00 pm",
      status: "cancelled",
      faculty: "Prof. Wilson",
      room: "Room 104",
      attendance: "82%"
    }
  ]
}

function AttendancePage() {
  const [activeTab, setActiveTab] = useState('classes')

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Main Container */}
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-blue-100">
                <img 
                  src="/default-avatar.png" 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{studentData.name}</h1>
                <p className="text-gray-500">{studentData.email}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <button className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                Download Report
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Mark Attendance
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-8 border-b">
            <button 
              className={`py-3 px-4 -mb-px ${
                activeTab === 'classes' 
                  ? 'border-b-2 border-blue-600 text-blue-600 font-medium' 
                  : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('classes')}
            >
              Today's Classes
            </button>
            <button 
              className={`py-3 px-4 -mb-px ${
                activeTab === 'report' 
                  ? 'border-b-2 border-blue-600 text-blue-600 font-medium' 
                  : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('report')}
            >
              Attendance Report
            </button>
          </div>
        </div>

        {/* Main Content */}
        {activeTab === 'classes' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {studentData.todaysClasses.map((class_) => (
              <div key={class_.id} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold text-lg">
                    {class_.subject[0]}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-lg">{class_.subject}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        class_.status === 'present' ? 'bg-green-100 text-green-700' :
                        class_.status === 'absent' ? 'bg-red-100 text-red-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {class_.status}
                      </span>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <span>🕒</span>
                        <span>{class_.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>👤</span>
                        <span>{class_.faculty}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>📍</span>
                        <span>{class_.room}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>📊</span>
                        <span>Attendance: {class_.attendance}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                Attendance Overview Chart
              </div>
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                Monthly Attendance Graph
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AttendancePage
