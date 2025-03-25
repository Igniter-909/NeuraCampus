"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion } from "framer-motion"

interface Post {
  author: string
  authorImage: string
  content: string
  category: string
}

interface CreatePostFormProps {
  onCreatePost: (post: Post) => void
}

export default function CreatePostForm({ onCreatePost }: CreatePostFormProps) {
  const [content, setContent] = useState("")
  const [category, setCategory] = useState("technology")
  const [isExpanded, setIsExpanded] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = () => {
    if (!content.trim()) return

    setIsSubmitting(true)

    onCreatePost({
      author: "Current User",
      authorImage: "/placeholder.svg?height=40&width=40",
      content,
      category,
    })

    setContent("")
    setIsExpanded(false)
    setIsSubmitting(false)
  }

  return (
    <Card>
      <CardHeader className="p-4">
        <h2 className="text-lg font-semibold">Create Post</h2>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex gap-3">
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Current User" />
            <AvatarFallback>CU</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Textarea
              placeholder="What's on your mind about tech?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onFocus={() => setIsExpanded(true)}
              className="min-h-[80px] resize-none"
            />
          </div>
        </div>
      </CardContent>

      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <CardFooter className="flex justify-between p-4 pt-0">
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="jobs">Jobs</SelectItem>
                <SelectItem value="internships">Internships</SelectItem>
                <SelectItem value="projects">Projects</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsExpanded(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit} disabled={!content.trim() || isSubmitting}>
                {isSubmitting ? "Posting..." : "Post"}
              </Button>
            </div>
          </CardFooter>
        </motion.div>
      )}
    </Card>
  )
}

