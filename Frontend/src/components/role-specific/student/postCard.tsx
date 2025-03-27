"use client"

import { Input } from "@/components/ui/input"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Heart, MessageCircle, Share2, Repeat2, MoreHorizontal, Trash2, Edit, Send } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface Media {
  type: "image" | "video"
  url: string
}

interface Comment {
  id: string
  author: string
  authorImage: string
  content: string
  createdAt: string
}

interface Post {
  id: string
  author: string
  authorImage: string
  content: string
  category: string
  createdAt: string
  likes: number
  comments: Comment[]
  media?: Media[]
}

interface PostCardProps {
  post: Post
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>
}

export default function PostCard({ post, setPosts }: PostCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [showComments, setShowComments] = useState(false)
  const [commentText, setCommentText] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [editedContent, setEditedContent] = useState(post.content)
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false)
  const [postData, setPostData] = useState(post)

  const handleLike = () => {
    setIsLiked(!isLiked)
    setPostData((prev) => ({
      ...prev,
      likes: isLiked ? prev.likes - 1 : prev.likes + 1,
    }))
  }

  const handleComment = () => {
    if (!commentText.trim()) return

    const newComment = {
      id: Date.now().toString(),
      author: "Current User",
      authorImage: "/placeholder.svg?height=40&width=40",
      content: commentText,
      createdAt: new Date().toISOString(),
    }

    setPostData((prev) => ({
      ...prev,
      comments: [newComment, ...prev.comments],
    }))

    setCommentText("")
  }

  const handleShare = () => {
    setIsShareDialogOpen(true)
  }

  const handleRepost = () => {
    // In a real app, you would implement actual reposting
    alert("Post has been reposted!")
  }

  const handleDelete = () => {
    setPosts((prev) => prev.filter((p) => p.id !== post.id))
  }

  const handleUpdate = () => {
    if (!editedContent.trim()) return

    setPostData((prev) => ({
      ...prev,
      content: editedContent,
    }))

    setIsEditing(false)
  }

  const handleDeleteComment = (commentId: string) => {
    setPostData((prev) => ({
      ...prev,
      comments: prev.comments.filter((comment) => comment.id !== commentId),
    }))
  }

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "technology":
        return "bg-blue-500"
      case "jobs":
        return "bg-green-500"
      case "internships":
        return "bg-purple-500"
      case "projects":
        return "bg-amber-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="overflow-hidden border-border hover:border-blue-500 dark:hover:border-blue-400 transition-colors">
        <CardHeader className="flex flex-row items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Avatar>
              <AvatarImage src={postData.authorImage} alt={postData.author} />
              <AvatarFallback>{postData.author.charAt(0)}</AvatarFallback>
            </Avatar>
          </motion.div>
          <div className="flex flex-col">
            <div className="font-semibold text-foreground">{postData.author}</div>
            <div className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(postData.createdAt), { addSuffix: true })}
            </div>
          </div>
          <Badge className={`ml-auto ${getCategoryColor(postData.category)} text-white shadow-sm`}>{postData.category}</Badge>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-blue-100 dark:hover:bg-blue-900">
                <MoreHorizontal className="h-4 w-4 text-blue-500 dark:text-blue-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-background/80 dark:bg-background/90 backdrop-blur-sm">
              <DropdownMenuItem onClick={() => setIsEditing(true)}>
                <Edit className="h-4 w-4 mr-2 text-blue-500 dark:text-blue-400" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDelete}>
                <Trash2 className="h-4 w-4 mr-2 text-red-500 dark:text-red-400" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>

        <CardContent className="p-4 pt-0">
          {isEditing ? (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-2"
            >
              <Textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className="min-h-[100px] border-input focus:border-blue-500 dark:focus:border-blue-400"
              />
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button onClick={handleUpdate} className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700">
                  Save
                </Button>
              </div>
            </motion.div>
          ) : (
            <div className="space-y-4">
              <div 
                className="prose prose-sm dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: postData.content }}
              />

              {postData.media && postData.media.length > 0 && (
                <div className={`grid gap-2 mt-4 ${postData.media.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                  {postData.media.map((file, index) => (
                    <div key={index} className="relative rounded-lg overflow-hidden bg-muted">
                      {file.type === "image" ? (
                        <img
                          src={file.url}
                          alt={`Post media ${index + 1}`}
                          className="w-full h-48 object-cover"
                        />
                      ) : (
                        <video
                          src={file.url}
                          className="w-full h-48 object-cover"
                          controls
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </CardContent>

        <CardFooter className="flex flex-col p-0">
          <div className="flex items-center justify-between p-4 border-t border-border">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="ghost" size="sm" className="flex items-center gap-1 text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300" onClick={handleLike}>
                <Heart className={`h-4 w-4 ${isLiked ? "fill-red-500 text-red-500 dark:fill-red-400 dark:text-red-400" : ""}`} />
                <span>{postData.likes}</span>
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-1 text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
                onClick={() => setShowComments(!showComments)}
              >
                <MessageCircle className="h-4 w-4" />
                <span>{postData.comments.length}</span>
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="ghost" size="sm" className="flex items-center gap-1 text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300" onClick={handleRepost}>
                <Repeat2 className="h-4 w-4" />
                <span>Repost</span>
              </Button>
            </motion.div>

            <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
              <DialogTrigger asChild>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="ghost" size="sm" className="flex items-center gap-1 text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300" onClick={handleShare}>
                    <Share2 className="h-4 w-4" />
                    <span>Share</span>
                  </Button>
                </motion.div>
              </DialogTrigger>
              <DialogContent className="bg-background/90 dark:bg-background/95 backdrop-blur-sm">
                <DialogHeader>
                  <DialogTitle className="text-foreground">Share this post</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="flex justify-around">
                    <Button variant="outline" className="flex flex-col items-center gap-2 hover:bg-blue-50 dark:hover:bg-blue-950/50">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-blue-500 dark:text-blue-400"
                      >
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                      </svg>
                      Facebook
                    </Button>
                    <Button variant="outline" className="flex flex-col items-center gap-2 hover:bg-blue-50 dark:hover:bg-blue-950/50">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-blue-400 dark:text-blue-300"
                      >
                        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                      </svg>
                      Twitter
                    </Button>
                    <Button variant="outline" className="flex flex-col items-center gap-2 hover:bg-blue-50 dark:hover:bg-blue-950/50">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-blue-600 dark:text-blue-500"
                      >
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                        <rect width="4" height="12" x="2" y="9"></rect>
                        <circle cx="4" cy="4" r="2"></circle>
                      </svg>
                      LinkedIn
                    </Button>
                  </div>
                  <div className="relative">
                    <Input value={`https://techconnect.com/posts/${postData.id}`} readOnly className="border-input" />
                    <Button
                      className="absolute right-0 top-0 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white"
                      variant="ghost"
                      onClick={() => {
                        alert("Link copied to clipboard!")
                      }}
                    >
                      Copy
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {showComments && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="p-4 border-t border-border space-y-4 w-full bg-blue-50/50 dark:bg-blue-950/20"
            >
              <div className="flex items-center gap-2 w-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Current User" />
                  <AvatarFallback>CU</AvatarFallback>
                </Avatar>
                <div className="flex-1 flex gap-2">
                  <Textarea
                    placeholder="Write a comment..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="min-h-[40px] resize-none w-full border-input focus:border-blue-500 dark:focus:border-blue-400"
                  />
                  <Button size="icon" onClick={handleComment} className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700">
                    <Send className="h-4 w-4 text-white" />
                  </Button>
                </div>
              </div>

              <div className="space-y-3 w-full">
                {postData.comments.map((comment) => (
                  <motion.div 
                    key={comment.id} 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex gap-2 w-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={comment.authorImage} alt={comment.author} />
                      <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 bg-card p-3 rounded-md w-full shadow-sm border border-border">
                      <div className="flex justify-between items-start">
                        <div className="font-medium text-sm text-foreground">{comment.author}</div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 hover:bg-red-100 dark:hover:bg-red-900/50"
                          onClick={() => handleDeleteComment(comment.id)}
                        >
                          <Trash2 className="h-3 w-3 text-red-500 dark:text-red-400" />
                        </Button>
                      </div>
                      <p className="text-sm mt-1 text-foreground">{comment.content}</p>
                      <div className="text-xs text-muted-foreground mt-2">
                        {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  )
}

