'use client'
import React, { useState } from 'react'
import ChatInterface from '@/components/ui/ChatInterface'

// Move this data to a separate file like src/data/communityData.ts
const communityData = {
  user: {
    id: "u1",
    name: "Alex Morgan",
    avatar: "https://i.pravatar.cc/150?img=32",
    status: "online",
    role: "Student",
    year: "3rd Year",
    department: "Computer Science"
  },
  categories: [
    {
      name: "Academic Communities",
      communities: [
        {
          id: 1,
          name: "Computer Science Hub",
          description: "Discussion forum for CS students",
          lastMessage: "Anyone up for the coding challenge?",
          time: "04:15 am",
          avatar: "https://picsum.photos/200/200?random=1",
          unreadCount: 3,
          isActive: true,
          members: {
            total: 156,
            online: 23
          },
          admins: ["Dr. Smith", "Prof. Johnson"],
          tags: ["Programming", "Algorithms", "Development"]
        },
        {
          id: 2,
          name: "Mathematics Forum",
          description: "Advanced mathematics discussion group",
          lastMessage: "Discussion on Linear Algebra",
          time: "06:41 pm",
          avatar: "https://picsum.photos/200/200?random=2",
          unreadCount: 0,
          isActive: false,
          members: {
            total: 142,
            online: 15
          },
          admins: ["Dr. Williams", "Prof. Davis"],
          tags: ["Calculus", "Linear Algebra", "Statistics"]
        }
      ]
    },
    {
      name: "Study Groups",
      communities: [
        {
          id: 3,
          name: "Project Team Alpha",
          description: "Final year project collaboration",
          lastMessage: "Meeting at 3 PM tomorrow",
          time: "11:30 am",
          avatar: "https://picsum.photos/200/200?random=3",
          unreadCount: 5,
          isActive: false,
          members: {
            total: 8,
            online: 4
          },
          admins: ["Sarah Wilson"],
          tags: ["Project", "Team Work", "Research"]
        },
        {
          id: 4,
          name: "Algorithm Study Group",
          description: "Preparing for competitive programming",
          lastMessage: "Let's solve today's challenge",
          time: "12:45 pm",
          avatar: "https://picsum.photos/200/200?random=4",
          unreadCount: 2,
          isActive: false,
          members: {
            total: 25,
            online: 8
          },
          admins: ["Mike Chen"],
          tags: ["DSA", "Problem Solving", "Competitive"]
        }
      ]
    },
    {
      name: "Department Groups",
      communities: [
        {
          id: 5,
          name: "CS Department Updates",
          description: "Official department announcements",
          lastMessage: "New course registration deadline",
          time: "Yesterday",
          avatar: "https://picsum.photos/200/200?random=5",
          unreadCount: 1,
          isActive: false,
          members: {
            total: 450,
            online: 89
          },
          admins: ["Department Head", "Admin Staff"],
          tags: ["Announcements", "Official", "Updates"]
        }
      ]
    }
  ],
  generalChats: [
    {
      id: 1,
      sender: "Leslie Alexander",
      message: "Has anyone started working on the assignment yet? I'm looking at the requirements and could use some clarification on the third part.",
      time: "10:15 pm",
      avatar: "https://i.pravatar.cc/150?img=33",
      role: "Student",
      isOwn: false,
      reactions: ["👍", "🤔"],
      reactionCount: 2
    },
    {
      id: 2,
      sender: "You",
      message: "Yes, I've completed the first two sections. Would you like to collaborate? We could set up a call to discuss the approach.",
      time: "10:16 pm",
      avatar: "https://i.pravatar.cc/150?img=32",
      role: "Student",
      isOwn: true,
      reactions: ["👍"],
      reactionCount: 1
    },
    {
      id: 3,
      sender: "Marcus Chen",
      message: "I can help with the third section if needed. I've done something similar in my internship last summer.",
      time: "10:17 pm",
      avatar: "https://i.pravatar.cc/150?img=34",
      role: "Student",
      isOwn: false,
      reactions: ["🙌", "👏"],
      reactionCount: 3
    },
    {
      id: 4,
      sender: "Sarah Wilson",
      message: "Great! Let's create a study group for this. I'll set up a Zoom meeting for tomorrow evening if everyone's free?",
      time: "10:18 pm",
      avatar: "https://i.pravatar.cc/150?img=35",
      role: "Student",
      isOwn: false,
      reactions: ["👍", "✅"],
      reactionCount: 4
    },
    {
      id: 5,
      sender: "Prof. Johnson",
      message: "Good initiative, everyone! Remember to check the additional resources I posted in the materials section.",
      time: "10:20 pm",
      avatar: "https://i.pravatar.cc/150?img=36",
      role: "Professor",
      isOwn: false,
      reactions: ["👍", "🙏", "📚"],
      reactionCount: 8
    }
  ],
  recentSearches: [
    "assignment help",
    "project meeting",
    "study group",
    "exam preparation"
  ],
  pinnedMessages: [
    {
      id: "p1",
      content: "Course project submission deadline: December 15th",
      author: "Prof. Johnson",
      timestamp: "2023-12-01"
    },
    {
      id: "p2",
      content: "Weekly team meeting every Thursday at 5 PM",
      author: "Team Lead",
      timestamp: "2023-11-28"
    }
  ],
  fileTypes: {
    allowed: ["pdf", "doc", "docx", "txt", "png", "jpg", "jpeg"],
    maxSize: 10 // MB
  }
}

export default function CommunityPage() {
  const [showSidebar, setShowSidebar] = useState(true);

  const handleCreateGroup = () => {
    console.log('Create group')
  }

  const handleJoinGroup = () => {
    console.log('Join group')
  }

  const handleSettingsClick = () => {
    console.log('Settings clicked')
  }

  const handleSendMessage = (message: string) => {
    console.log('Sending message:', message)
  }

  const handleVoiceCallStart = () => {
    console.log('Starting voice call')
  }

  const handleVoiceCallEnd = () => {
    console.log('Ending voice call')
  }

  const handleVideoCallStart = () => {
    console.log('Starting video call')
  }

  return (
    <div className="h-[calc(100vh-100px)]">
      <ChatInterface 
        data={communityData}
        onCreateGroup={handleCreateGroup}
        onJoinGroup={handleJoinGroup}
        onSettingsClick={handleSettingsClick}
        onSendMessage={handleSendMessage}
        onVoiceCallStart={handleVoiceCallStart}
        onVoiceCallEnd={handleVoiceCallEnd}
        onVideoCallStart={handleVideoCallStart}
        setShowSidebar={setShowSidebar}
      />
    </div>
  )
}

/*
  Data Fetching and Structure for Chat Application

  1. **Data Fetching**:
     - You can fetch the community and chat data from the backend using a REST API.
     - Use the following route to get the data:
       - **GET /api/community**: This endpoint should return the community data, including user information, community details, and chat messages.

  2. **Expected Data Format**:
     - The response from the backend should be in JSON format and structured as follows:
     ```json
     {
       "user": {
         "id": "u1",
         "name": "Alex Morgan",
         "avatar": "https://i.pravatar.cc/150?img=32",
         "status": "online",
         "role": "Student",
         "year": "3rd Year",
         "department": "Computer Science"
       },
       "categories": [
         {
           "name": "Academic Communities",
           "communities": [
             {
               "id": 1,
               "name": "Computer Science Hub",
               "description": "Discussion forum for CS students",
               "lastMessage": "Anyone up for the coding challenge?",
               "time": "04:15 am",
               "avatar": "https://picsum.photos/200/200?random=1",
               "unreadCount": 3,
               "isActive": true,
               "members": {
                 "total": 156,
                 "online": 23
               },
               "admins": ["Dr. Smith", "Prof. Johnson"],
               "tags": ["Programming", "Algorithms", "Development"]
             }
           ]
         }
       ],
       "generalChats": [
         {
           "id": 1,
           "sender": "Leslie Alexander",
           "message": "Has anyone started working on the assignment yet?",
           "time": "10:15 pm",
           "avatar": "https://i.pravatar.cc/150?img=33",
           "role": "Student",
           "isOwn": false,
           "reactions": ["👍", "🤔"],
           "reactionCount": 2
         }
       ]
     }
     ```

  3. **Chat Application Access**:
     - Users can access the chat application to communicate with their peers regarding academic topics, group projects, and other community-related discussions.
     - Recruiters can also use this chat application to contact students. When a recruiter wants to reach out, they can initiate a chat through the application, which will be visible in the general chat section.
     - The application should allow recruiters to send messages directly to students or create group chats for discussions.

  4. **Schema Overview**:
     - **User**: Represents the individual using the chat application.
     - **Community**: Represents a group of users discussing specific topics.
     - **Chat Message**: Represents individual messages exchanged between users.
     - **Recruiter Interaction**: Recruiters can send messages to users, which will appear in the chat interface, allowing for seamless communication.

  Ensure that the backend is set up to handle these requests and that the data is structured as specified for the frontend to function correctly.
*/