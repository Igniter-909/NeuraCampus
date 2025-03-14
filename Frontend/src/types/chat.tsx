export interface User {
    id: string
    name: string
    avatar: string
    status: string
    role: string
    year: string
    department: string
  }
  
  export interface Community {
    id: number
    name: string
    description: string
    lastMessage: string
    time: string
    avatar: string
    unreadCount: number
    isActive: boolean
    members: {
      total: number
      online: number
    }
    admins: string[]
    tags: string[]
  }
  
  export interface Category {
    name: string
    communities: Community[]
  }
  
  export interface ChatMessage {
    id: number
    sender: string
    message: string
    time: string
    avatar: string
    role: string
    isOwn: boolean
    reactions: string[]
    reactionCount: number
  }
  
  export interface ChatData {
    user: User
    categories: Category[]
    generalChats: ChatMessage[]
    recentSearches: string[]
    pinnedMessages: {
      id: string
      content: string
      author: string
      timestamp: string
    }[]
    fileTypes: {
      allowed: string[]
      maxSize: number
    }
  } 