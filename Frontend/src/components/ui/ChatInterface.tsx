'use client'
import React, { useState, useEffect } from 'react'
import { IoSearchOutline, IoSettingsOutline, IoPaperPlaneOutline, IoAttachOutline, IoEllipsisVerticalOutline, IoAddOutline, IoEnterOutline, IoCallOutline, IoVideocamOutline, IoMicOutline, IoCloseOutline, IoArrowBackOutline, IoPersonOutline, IoCalendarOutline, IoSchoolOutline, IoInformationCircleOutline } from 'react-icons/io5'
import Sidebar from './Sidebar'
import ChatHeader from './ChatHeader'
import ChatMessages from './ChatMessages'
import MessageInput from './MessageInput'
import ProfileDrawer from './ProfileDrawer'
import { CommunityData } from '@/types/chat'

// Enhanced mock data with more realistic content
const communityData: CommunityData = {
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

interface ChatInterfaceProps {
  data: CommunityData;
  onCreateGroup: () => void;
  onJoinGroup: () => void;
  onSettingsClick: () => void;
  onSendMessage: (message: string) => void;
  onVoiceCallStart: () => void;
  onVoiceCallEnd: () => void;
  onVideoCallStart: () => void;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  data,
  onCreateGroup,
  onJoinGroup,
  onSettingsClick,
  onSendMessage,
  onVoiceCallStart,
  onVoiceCallEnd,
  onVideoCallStart,
  setShowSidebar,
}) => {
  const [activeCommunity, setActiveCommunity] = useState(data.categories[0].communities[0])
  const [showSettings, setShowSettings] = useState(false)
  const [isVoiceCallActive, setIsVoiceCallActive] = useState(false)
  const [isRecordingVoice, setIsRecordingVoice] = useState(false)
  const [showSidebar, setShowSidebarState] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [message, setMessage] = useState('')

  // Add useEffect for mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth < 768) {
        setShowSidebar(true) // Start with sidebar on mobile
      }
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleCommunitySelect = (community: any) => {
    setActiveCommunity(community);
    if (isMobile) {
      setShowSidebarState(false); // Close sidebar on mobile
    }
  };

  return (
    <div className="flex h-[calc(100vh-70px)] p-0 bg-gradient-to-br from-blue-50 to-indigo-50 relative">
      <Sidebar 
        data={data} 
        isMobile={isMobile} 
        showSidebar={showSidebar} 
        setActiveCommunity={handleCommunitySelect}
        setShowSidebar={setShowSidebar} 
        setShowSettings={setShowSettings} 
        onCreateGroup={onCreateGroup} 
        onJoinGroup={onJoinGroup} 
      />
      
      <div className={`flex-1 flex flex-col bg-trans ${isMobile && showSidebar ? 'hidden' : ''}`}>
        <ChatHeader 
          activeCommunity={activeCommunity} 
          isMobile={isMobile}
          setShowSidebar={setShowSidebarState}
          setShowProfile={setShowProfile} 
          setIsVoiceCallActive={setIsVoiceCallActive} 
        />
        
        <ChatMessages 
          messages={data.generalChats} 
          activeCommunity={activeCommunity} 
        />
        
        <MessageInput 
          message={message} 
          setMessage={setMessage} 
          isRecordingVoice={isRecordingVoice} 
          setIsRecordingVoice={setIsRecordingVoice} 
          onSendMessage={onSendMessage} 
        />
        
        {showProfile && (
          <ProfileDrawer 
            activeCommunity={activeCommunity} 
            setShowProfile={setShowProfile} 
          />
        )}
        
        {isVoiceCallActive && (
          <div className="bg-blue-50 py-1.5 px-4 flex items-center justify-between border-b">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-blue-700">Voice call active</span>
              <span className="text-xs text-blue-500">12:03</span>
            </div>
            <button 
              className="p-1 hover:bg-blue-100 rounded-lg transition-colors text-blue-700"
              onClick={() => setIsVoiceCallActive(false)}
              title="End call"
            >
              <IoCloseOutline className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ChatInterface;

