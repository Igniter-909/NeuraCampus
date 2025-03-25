"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Filter } from "lucide-react"
import PostCard from "@/components/role-specific/student/postCard"
import CreatePostForm from "@/components/role-specific/student/createPostForm"
import { AnimatePresence, motion } from "framer-motion"
import { dummyPosts } from "@/constants/dummyPosts"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Post {
  author: string
  authorImage: string
  content: string
  category: string
}

export default function FeedPage() {
  const [posts, setPosts] = useState(dummyPosts)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const handleCreatePost = (postData: Post) => {
    const newPost = {
      id: Date.now().toString(),
      ...postData,
      createdAt: new Date().toISOString(),
      likes: 0,
      comments: [],
    }

    setPosts((prev) => [newPost, ...prev])
  }

  const handleSearch = () => {
    if (searchQuery.trim()) {
      const lowercaseQuery = searchQuery.toLowerCase()
      const results = dummyPosts.filter(
        (post) =>
          post.content.toLowerCase().includes(lowercaseQuery) ||
          post.author.toLowerCase().includes(lowercaseQuery) ||
          post.category.toLowerCase().includes(lowercaseQuery),
      )
      setPosts(results)
    } else {
      setPosts(dummyPosts)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  const filterPosts = (category: string) => {
    setActiveTab(category)
    if (category === "all") {
      setPosts(dummyPosts)
      return
    }

    const filteredPosts = dummyPosts.filter((post) => post.category.toLowerCase() === category.toLowerCase())
    setPosts(filteredPosts)
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8 max-w-4xl"
    >
      <div className="flex flex-col space-y-6">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-between"
        >
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">TechConnect</h1>
          <div className="relative w-full max-w-sm">
            <Input
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                handleSearch()
              }}
              className="pr-10 bg-background/50 dark:bg-background/80 backdrop-blur-sm border-input focus:border-blue-500 dark:focus:border-blue-400 transition-colors"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <CreatePostForm onCreatePost={handleCreatePost} />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="flex justify-end"
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2 border-input hover:border-blue-500 dark:hover:border-blue-400 transition-colors">
                <Filter className="h-4 w-4 text-blue-500 dark:text-blue-400" />
                Filter: {activeTab === "all" ? "All Posts" : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-background/80 dark:bg-background/90 backdrop-blur-sm">
              <DropdownMenuItem onClick={() => filterPosts("all")}>All Posts</DropdownMenuItem>
              <DropdownMenuItem onClick={() => filterPosts("technology")}>Technology</DropdownMenuItem>
              <DropdownMenuItem onClick={() => filterPosts("jobs")}>Jobs</DropdownMenuItem>
              <DropdownMenuItem onClick={() => filterPosts("internships")}>Internships</DropdownMenuItem>
              <DropdownMenuItem onClick={() => filterPosts("projects")}>Projects</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </motion.div>

        <AnimatePresence mode="wait">
          {posts.length > 0 ? (
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ staggerChildren: 0.1 }}
            >
              {posts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <PostCard post={post} setPosts={setPosts} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="text-center py-10"
            >
              <p className="text-muted-foreground">No posts found. Create one or try a different search.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

